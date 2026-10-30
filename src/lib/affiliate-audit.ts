import type { Product } from './products';
import { getMerchantLinks, canadianAffiliateIssues } from './affiliate';
import { publicationIssues, mandatoryHold } from './release-policy';

/** Independent diagnostic of the recorded URL, never approval of an offer. */
export function inspectCanadianUrl(link: { url: string | null; asin: string | null }): string[] {
  const issues: string[] = [];
  if (!link.asin || !/^[A-Z0-9]{10}$/.test(link.asin)) issues.push('Missing or malformed ASIN');
  if (!link.url) return [...issues, 'Missing URL'];
  let url: URL;
  try { url = new URL(link.url); } catch { return [...issues, 'Malformed URL']; }
  if (url.protocol !== 'https:') issues.push('HTTPS required');
  if (!['amazon.ca', 'www.amazon.ca'].includes(url.hostname)) issues.push('Expected Amazon.ca domain');
  if (url.username || url.password || url.port) issues.push('Credentials or non-default port are not allowed');
  if (url.pathname !== `/dp/${link.asin}`) issues.push('URL path does not match recorded ASIN');
  if (url.searchParams.getAll('tag').length !== 1 || url.searchParams.get('tag') !== 'apocalypsegear-20') issues.push('Expected one apocalypsegear-20 tag');
  if ([...url.searchParams.keys()].some(key => key !== 'tag') || url.hash) issues.push('Extra parameters or fragment are not allowed');
  return issues;
}

export function auditCanadianCatalogue(products: Product[]) {
  const rows = products.filter(p => p.data.reviewStatus !== 'template').map(product => {
    const link = product.data.links.amazonCa;
    const technicalIssues = inspectCanadianUrl(link);
    const evidence = product.data.research?.listingEvidence;
    const offerVerified = Boolean(product.data.research?.listingVerified && evidence
      && evidence.url === `https://www.amazon.ca/dp/${link.asin}`
      && evidence.matchedAsin === link.asin && evidence.matchedModel === (product.data.modelNumber ?? product.data.name));
    const merchant = getMerchantLinks(product)[0]!;
    const blockDocumented = Boolean(mandatoryHold(product) || (product.data.research?.affiliateReview?.decision === 'hold' && product.data.research.affiliateReview.reason.trim()));
    return {
      slug: product.id, product: product.data.name, model: product.data.modelNumber,
      asin: link.asin, url: link.url, urlValid: technicalIssues.length === 0,
      technicalIssues, duplicateAsinWith: [] as string[], duplicateUrlWith: [] as string[],
      offerVerified, offerEvidenceMethod: evidence?.method ?? null,
      affiliateDecision: product.data.research?.affiliateReview?.decision ?? 'unreviewed',
      buttonActive: Boolean(merchant.href), blocker: merchant.href ? null : merchant.unavailableReason ?? 'Undocumented block',
      blockDocumented: merchant.href ? null : blockDocumented,
      commercialIssues: canadianAffiliateIssues(product), editorialIssues: publicationIssues(product),
      editorialStatus: product.data.reviewStatus, safetyStatus: product.data.research?.safetyStatus ?? null,
      correction: technicalIssues.length ? 'Correct the recorded URL against documented identity; do not infer a replacement offer' : product.id === '3m-2091-p100-particulate-filters' ? 'Added missing distinct 2091 profile; 2097 record and artwork preserved; sale-pack verification still pending' : 'No malformed URL found; preserve existing decision',
    };
  });
  for (const row of rows) {
    row.duplicateAsinWith = rows.filter(other => other.slug !== row.slug && row.asin && other.asin === row.asin).map(other => other.slug);
    row.duplicateUrlWith = rows.filter(other => other.slug !== row.slug && row.url && other.url === row.url).map(other => other.slug);
  }
  return {
    scope: 'Recorded URL syntax, catalogue uniqueness and current rendering permission; independent offer verification is separate',
    products: rows.length, active: rows.filter(r => r.buttonActive).length, blocked: rows.filter(r => !r.buttonActive).length,
    invalidUrls: rows.filter(r => !r.urlValid).length, duplicateAsins: rows.filter(r => r.duplicateAsinWith.length).length,
    duplicateUrls: rows.filter(r => r.duplicateUrlWith.length).length, offersVerified: rows.filter(r => r.offerVerified).length,
    undocumentedBlocks: rows.filter(r => !r.buttonActive && !r.blockDocumented).length,
    rows,
  };
}
