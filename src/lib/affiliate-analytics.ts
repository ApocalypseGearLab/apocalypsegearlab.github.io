import { GA4_MEASUREMENT_ID } from '../config/analytics';

interface AffiliateMetadata {
  href: string;
  productId?: string | undefined;
  merchant?: string | undefined;
  marketplace?: string | undefined;
}

/** Only the already-active Canadian anchors qualify. This grants no link permission. */
export function affiliateClickParameters(link: AffiliateMetadata, pageLocation: string) {
  try {
    const url = new URL(link.href);
    const match = /^\/dp\/([A-Z0-9]{10})$/.exec(url.pathname);
    if (!match || !['amazon.ca', 'www.amazon.ca'].includes(url.hostname)
      || url.protocol !== 'https:' || url.username || url.password || url.port || url.hash
      || url.searchParams.get('tag') !== 'apocalypsegear-20' || [...url.searchParams].length !== 1
      || !link.productId || !/^[a-z0-9-]+$/.test(link.productId)
      || link.merchant !== 'amazon-ca' || link.marketplace !== 'ca') return undefined;
    const page = new URL(pageLocation);
    return {
      product_id: link.productId, asin: match[1]!, merchant: link.merchant,
      marketplace: link.marketplace, destination_url: url.href,
      // Do not forward arbitrary query strings or fragments to Analytics.
      page_location: page.origin + page.pathname,
    };
  } catch { return undefined; }
}

type Gtag = (...args: unknown[]) => void;
declare global { interface Window { gtag?: Gtag } }
const installed = new WeakSet<Document>();

export function installAffiliateAnalytics(doc: Document = document) {
  if (installed.has(doc)) return;
  installed.add(doc);
  const track = (event: MouseEvent) => {
    if (event.defaultPrevented || (event.type === 'click' ? event.button !== 0 : event.button !== 1)) return;
    const target = event.target instanceof Element ? event.target : null;
    const anchor = target?.closest<HTMLAnchorElement>('a[data-affiliate-click][href]');
    if (!anchor || anchor.closest('[aria-disabled="true"], [disabled]') || anchor.target !== '_blank') return;
    const params = affiliateClickParameters({href: anchor.href, productId: anchor.dataset.product,
      merchant: anchor.dataset.merchant, marketplace: anchor.dataset.marketplace}, doc.location.href);
    if (!params) return;
    try {
      doc.defaultView?.gtag?.('event', 'affiliate_click', {...params, send_to: GA4_MEASUREMENT_ID, transport_type: 'beacon'});
    } catch {
      // Analytics is optional: never cancel, defer or recreate native navigation.
    }
  };
  doc.addEventListener('click', track);
  doc.addEventListener('auxclick', track);
}
