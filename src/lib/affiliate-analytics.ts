import { GA4_MEASUREMENT_ID } from '../config/analytics';

export type CtaPlacement = 'catalogue-card' | 'collection-card' | 'profile-summary' | 'related-card' | 'compatible-filter';
const placements: CtaPlacement[] = ['catalogue-card','collection-card','profile-summary','related-card','compatible-filter'];
interface AffiliateMetadata {
  href: string;
  productId?: string | undefined;
  merchant?: string | undefined;
  marketplace?: string | undefined;
  productName?: string | undefined;
  placement?: string | undefined;
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
      ...(link.productName ? {product_name:link.productName.slice(0,100)} : {}),
      ...(placements.includes(link.placement as CtaPlacement) ? {cta_placement:link.placement} : {}),
    };
  } catch { return undefined; }
}

/** Documentary references are a separate event, never an affiliate conversion. */
export function sourceClickParameters(link: {href:string;productId?:string|undefined;sourceId?:string|undefined;sourceKind?:string|undefined}, pageLocation:string) {
  try {
    const url=new URL(link.href),page=new URL(pageLocation);
    if(url.protocol!=='https:'||url.username||url.password||url.port||url.origin===page.origin
      ||!link.productId||!/^[a-z0-9-]+$/.test(link.productId)
      ||!link.sourceId||!/^[a-z0-9-]+$/.test(link.sourceId)
      ||!['manufacturer','retailer','official-safety','official-recall','reference'].includes(link.sourceKind??''))return undefined;
    return {product_id:link.productId,source_id:link.sourceId,source_kind:link.sourceKind,
      destination_url:url.origin+url.pathname,page_location:page.origin+page.pathname};
  }catch{return undefined;}
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
    const anchor = target?.closest<HTMLAnchorElement>('a[href]');
    if (!anchor || anchor.closest('[aria-disabled="true"], [disabled]')) return;
    const affiliate=anchor.hasAttribute('data-affiliate-click');
    if(affiliate&&anchor.target!=='_blank')return;
    const params = affiliate ? affiliateClickParameters({href: anchor.href, productId: anchor.dataset.product,
      productName:anchor.dataset.productName,placement:anchor.dataset.ctaPlacement,
      merchant: anchor.dataset.merchant, marketplace: anchor.dataset.marketplace}, doc.location.href)
      : anchor.hasAttribute('data-source-click') ? sourceClickParameters({href:anchor.href,productId:anchor.dataset.product,
        sourceId:anchor.dataset.sourceId,sourceKind:anchor.dataset.sourceKind},doc.location.href) : undefined;
    if (!params) return;
    try {
      doc.defaultView?.gtag?.('event', affiliate ? 'affiliate_click' : 'source_reference_click', {...params, send_to: GA4_MEASUREMENT_ID, transport_type: 'beacon'});
    } catch {
      // Analytics is optional: never cancel, defer or recreate native navigation.
    }
  };
  doc.addEventListener('click', track);
  doc.addEventListener('auxclick', track);
}
