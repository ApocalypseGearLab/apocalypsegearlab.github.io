import type { Product } from './products';
import { AMAZON_ASSOCIATE_ENROLLED } from '../config/site';
import { isCommerciallyApproved, mandatoryHold } from './release-policy';

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
  if (!link.asin) return true;
  if (!isTrustedUrl(link.url, ['amazon.ca'])) return false;
  const url = new URL(link.url);
  return url.pathname === `/dp/${link.asin}` && url.searchParams.get('tag') === 'apocalypsegear-20' && [...url.searchParams.keys()].length === 1 && !url.hash;
}

type Enrollment = boolean | { ca: boolean; us: boolean };
export function getMerchantLinks(product: Product, amazonEnrolled: Enrollment = { ca: AMAZON_ASSOCIATE_ENROLLED, us: false }): MerchantLink[] {
  const { links } = product.data;
  const canLink = isCommerciallyApproved(product);
  // Canadian permission never grants participation in the US marketplace.
  const caEnrolled = typeof amazonEnrolled === 'boolean' ? amazonEnrolled : amazonEnrolled.ca;
  const usEnrolled = typeof amazonEnrolled === 'boolean' ? false : amazonEnrolled.us;
  const unavailableReason = mandatoryHold(product) ? 'Product safety or identity review pending' : !caEnrolled ? 'Affiliate eligibility unconfirmed' : !canLink ? 'Listing and safety verification pending' : 'Verified retailer URL unavailable';
  const result: MerchantLink[] = [
    {
      key: 'amazon-ca',
      merchant: 'Amazon.ca',
      marketplace: 'ca',
      unavailableReason,
      label: 'Voir sur Amazon.ca',
      href: caEnrolled && canLink && matchesCanadianListing(links.amazonCa) && isTrustedUrl(links.amazonCa.url, ['amazon.ca', 'amzn.to']) ? links.amazonCa.url : null,
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
