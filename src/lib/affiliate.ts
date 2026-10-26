import type { Product } from './products';
import { AMAZON_ASSOCIATE_ENROLLED } from '../config/site';
import { isCommerciallyApproved } from './release-policy';

export type Marketplace = 'ca' | 'us' | 'other';

export interface MerchantLink {
  key: string;
  merchant: string;
  marketplace: Marketplace;
  label: string;
  /** null = placeholder, no verified affiliate URL yet. */
  href: string | null;
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

type Enrollment = boolean | { ca: boolean; us: boolean };
export function getMerchantLinks(product: Product, amazonEnrolled: Enrollment = { ca: AMAZON_ASSOCIATE_ENROLLED, us: false }): MerchantLink[] {
  const { links } = product.data;
  const canLink = isCommerciallyApproved(product);
  // Canadian permission never grants participation in the US marketplace.
  const caEnrolled = typeof amazonEnrolled === 'boolean' ? amazonEnrolled : amazonEnrolled.ca;
  const usEnrolled = typeof amazonEnrolled === 'boolean' ? false : amazonEnrolled.us;
  const result: MerchantLink[] = [
    {
      key: 'amazon-ca',
      merchant: 'Amazon.ca',
      marketplace: 'ca',
      label: 'Voir sur Amazon.ca',
      href: caEnrolled && canLink && isTrustedUrl(links.amazonCa.url, ['amazon.ca', 'amzn.to']) ? links.amazonCa.url : null,
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
  return result;
}

export const AFFILIATE_REL = 'sponsored nofollow noopener';
