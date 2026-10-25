import type { Product } from './products';
import { AMAZON_ASSOCIATE_ENROLLED } from '../config/site';

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

export function getMerchantLinks(product: Product, amazonEnrolled = AMAZON_ASSOCIATE_ENROLLED): MerchantLink[] {
  const { links } = product.data;
  const result: MerchantLink[] = [
    {
      key: 'amazon-ca',
      merchant: 'Amazon.ca',
      marketplace: 'ca',
      label: 'View on Amazon.ca',
      href: amazonEnrolled && isTrustedUrl(links.amazonCa.url, ['amazon.ca', 'amzn.to']) ? links.amazonCa.url : null,
    },
    {
      key: 'amazon-com',
      merchant: 'Amazon.com',
      marketplace: 'us',
      label: 'View on Amazon.com',
      href: amazonEnrolled && isTrustedUrl(links.amazonCom.url, ['amazon.com', 'amzn.to']) ? links.amazonCom.url : null,
    },
  ];
  for (const partner of links.partners) {
    result.push({
      key: `partner-${partner.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      merchant: partner.name,
      marketplace: 'other',
      label: `View at ${partner.name}`,
      href: isTrustedUrl(partner.url) ? partner.url : null,
    });
  }
  return result;
}

export const AFFILIATE_REL = 'sponsored nofollow noopener';
