import type { Product } from './products';
import { AMAZON_CA_LINKING_ENABLED } from '../config/site';
import { isCommerciallyApproved, isPubliclyVisible, publicationIssues, mandatoryHold } from './release-policy';

export type Marketplace = 'ca' | 'us' | 'other';

export interface MerchantLink {
  key: string;
  merchant: string;
  marketplace: Marketplace;
  label: string;
  /** null = placeholder, no verified affiliate URL yet. */
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
  return url.pathname === `/dp/${link.asin}` && url.searchParams.get('tag') === 'apocalypsegear-20' && [...url.searchParams.keys()].length === 1 && !url.hash;
}

/** Listing evidence is independent of final account review, image rights and SEO indexing. */
export function canadianAffiliateIssues(product: Product): string[] {
  const issues = publicationIssues(product);
  if (!isPubliclyVisible(product)) issues.push('The profile is not publicly visible.');
  const link = product.data.links.amazonCa;
  if (!matchesCanadianListing(link)) issues.push('The exact Canadian ASIN URL and tracking tag are required.');
  const evidence = product.data.research?.listingEvidence;
  if (!evidence) issues.push('Evidence matching the Canadian listing to the model is missing.');
  else {
    const expected = `https://www.amazon.ca/dp/${link.asin}`;
    const expectedModel = product.data.modelNumber ?? product.data.name;
    if (evidence.url !== expected || evidence.matchedAsin !== link.asin || evidence.matchedModel !== expectedModel || !['live-page', 'owner-document'].includes(evidence.method) || !evidence.notes.trim() || !/^\d{4}-\d{2}-\d{2}$/.test(evidence.checkedAt)) {
      issues.push('The documented Canadian listing evidence does not match this profile.');
    }
  }
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
  const unavailableReason = mandatoryHold(product) ? 'Product safety or identity review pending' : !caEnrolled ? 'Affiliate eligibility unconfirmed' : caIssues.length ? 'Listing and safety verification pending' : 'Verified retailer URL unavailable';
  const result: MerchantLink[] = [
    {
      key: 'amazon-ca',
      merchant: 'Amazon.ca',
      marketplace: 'ca',
      unavailableReason,
      label: 'Voir sur Amazon.ca',
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
