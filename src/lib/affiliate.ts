import type { Product } from './products';
import { AMAZON_CA_LINKING_ENABLED } from '../config/site';
import { isCommerciallyApproved, isPubliclyVisible, publicationIssues, mandatoryHold } from './release-policy';

export type Marketplace = 'ca' | 'us' | 'other';

export interface MerchantLink {
  key: string;
  merchant: string;
  marketplace: Marketplace;
  label: string;
  /** null = linking is unavailable or held; a URL does not imply listing verification. */
  href: string | null;
  unavailableReason?: string;
}

function isTrustedUrl(url: string | null, allowedHosts?: string[]): url is string {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:' || parsed.username || parsed.password) return false;
    if (!allowedHosts) return true;
    return allowedHosts.some((h) => parsed.hostname === h || parsed.hostname.endsWith(`.${h}`));
  } catch {
    return false;
  }
}

function matchesCanadianListing(link: Product['data']['links']['amazonCa']): boolean {
  if (!link.asin) return false;
  if (!isTrustedUrl(link.url, ['amazon.ca'])) return false;
  const url = new URL(link.url);
  return ['amazon.ca', 'www.amazon.ca'].includes(url.hostname) && /^[A-Z0-9]{10}$/.test(link.asin) && url.port === '' && url.pathname === `/dp/${link.asin}` && url.searchParams.get('tag') === 'apocalypsegear-20' && [...url.searchParams.keys()].length === 1 && !url.hash;
}

/** Display guard for purchase controls; documentary source links use ordinary anchors. */
export function isCanadianPurchaseLink(link: MerchantLink): boolean {
  if (link.key !== 'amazon-ca' || link.marketplace !== 'ca' || !link.href) return false;
  try {
    const asin = /^\/dp\/([A-Z0-9]{10})$/.exec(new URL(link.href).pathname)?.[1] ?? null;
    return matchesCanadianListing({url:link.href,asin});
  } catch { return false; }
}

function hasMatchingCanadianEvidence(product: Product): boolean {
  const link = product.data.links.amazonCa;
  const evidence = product.data.research?.listingEvidence;
  return Boolean(evidence && evidence.url === `https://www.amazon.ca/dp/${link.asin}`
    && evidence.matchedAsin === link.asin
    && evidence.matchedModel === (product.data.modelNumber ?? product.data.name)
    && ['live-page', 'owner-document'].includes(evidence.method)
    && evidence.notes.trim() && /^\d{4}-\d{2}-\d{2}$/.test(evidence.checkedAt));
}

/** Recorded-link permission is separate from listing verification and SEO publication. */
export function canadianAffiliateIssues(product: Product): string[] {
  const issues: string[] = [];
  const hold = mandatoryHold(product);
  if (hold) issues.push(hold);
  if (!isPubliclyVisible(product)) issues.push('The profile is not publicly visible.');
  const link = product.data.links.amazonCa;
  if (!matchesCanadianListing(link)) issues.push('The exact Canadian ASIN URL and tracking tag are required.');
  const research = product.data.research;
  const review = research?.affiliateReview;
  if (research?.safetyStatus === 'blocked') issues.push('Product safety review is blocked.');
  if (review) {
    if (review.asin !== link.asin || !review.reason.trim() || !/^\d{4}-\d{2}-\d{2}$/.test(review.checkedAt) || !review.sourceIds.length || review.sourceIds.some(id => !product.data.sources.some(source => source.id === id))) issues.push('The affiliate review does not match this product.');
    if (review.decision === 'hold') issues.push(review.reason);
  } else {
    // Unreviewed/new records do not acquire permission just by having a URL.
    issues.push(...publicationIssues(product));
    if (!research?.listingEvidence) issues.push('Evidence matching the Canadian listing to the model is missing.');
  }
  if ((research?.listingEvidence || research?.listingVerified) && !hasMatchingCanadianEvidence(product)) issues.push('The documented Canadian listing evidence does not match this profile.');
  return [...new Set(issues)];
}

type MarketplacePermission = boolean | { ca: boolean; us: boolean };
export function getMerchantLinks(product: Product, amazonPermission: MarketplacePermission = { ca: AMAZON_CA_LINKING_ENABLED, us: false }): MerchantLink[] {
  const { links } = product.data;
  const canLink = isCommerciallyApproved(product);
  const caIssues = canadianAffiliateIssues(product);
  // Canadian permission never grants participation in the US marketplace.
  const caEnrolled = typeof amazonPermission === 'boolean' ? amazonPermission : amazonPermission.ca;
  const usEnrolled = typeof amazonPermission === 'boolean' ? false : amazonPermission.us;
  const unavailableReason = mandatoryHold(product)
    ?? (!caEnrolled ? 'Affiliate eligibility unconfirmed'
    : !matchesCanadianListing(links.amazonCa) ? 'Canadian retailer URL not verified'
    : product.data.research?.affiliateReview ? caIssues[0] ?? 'Retailer link unavailable'
    : !product.data.research?.listingVerified || !hasMatchingCanadianEvidence(product) ? 'Canadian listing identity not verified'
    : product.data.research.safetyStatus !== 'cleared' ? 'Product safety review incomplete'
    : caIssues.length ? 'Product verification incomplete'
    : 'Verified retailer URL unavailable');
  const result: MerchantLink[] = [
    {
      key: 'amazon-ca',
      merchant: 'Amazon.ca',
      marketplace: 'ca',
      unavailableReason,
      label: 'View on Amazon.ca',
      href: caEnrolled && caIssues.length === 0 ? links.amazonCa.url : null,
    },
    {
      key: 'amazon-com',
      merchant: 'Amazon.com',
      marketplace: 'us',
      label: 'View on Amazon.com',
      href: usEnrolled && canLink && isTrustedUrl(links.amazonCom.url, ['amazon.com', 'amzn.to']) ? links.amazonCom.url : null,
    },
  ];
  for (const partner of links.partners) {
    result.push({
      key: `partner-${partner.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      merchant: partner.name,
      marketplace: 'other',
      label: `View at ${partner.name}`,
      href: canLink && isTrustedUrl(partner.url) ? partner.url : null,
    });
  }
  for (const link of result) if (link.href) delete link.unavailableReason;
  return result;
}

export const AFFILIATE_REL = 'sponsored nofollow noopener';
