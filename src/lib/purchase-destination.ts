import type { Product } from './products';

/** Eligibility for documented product pages, without granting SEO publication,
 * independent verification, or permission to override a safety/explicit hold. */
export function purchaseDestinationIssues(product: Product): string[] {
  const destination = product.data.research?.purchaseDestination;
  if (!destination) return ['Documented purchase-destination evidence is missing.'];
  const { data } = product;
  const issues: string[] = [];
  if (destination.asin !== data.links.amazonCa.asin || destination.url !== `https://www.amazon.ca/dp/${data.links.amazonCa.asin}`
    || destination.matchedProduct !== data.name || !['owner-document', 'live-page'].includes(destination.method)
    || !/^\d{4}-\d{2}-\d{2}$/.test(destination.checkedAt) || !destination.selectionNote.trim()) {
    issues.push('The purchase-destination evidence does not match this Canadian product page.');
  }
  if (!['product-page', 'exact-variant'].includes(destination.scope)
    || (destination.scope === 'exact-variant' && destination.matchedModel !== (data.modelNumber ?? data.name))) {
    issues.push('The documented destination scope or exact model does not match this profile.');
  }
  if (!destination.sourceIds.length || destination.sourceIds.some(id => !data.sources.some(s => s.id === id))
    || !destination.sourceIds.some(id => data.sources.some(s => s.id === id && s.kind === 'retailer' && s.url === destination.url))
    || !destination.sourceIds.some(id => data.sources.some(s => s.id === id && s.kind === 'manufacturer'))) {
    issues.push('Included retailer and manufacturer evidence is required for automatic activation.');
  }
  if (destination.safetyDecision !== 'link-permitted' || !destination.safetyReason.trim()) {
    issues.push(destination.safetyReason || 'Purchase-destination safety review remains on hold.');
  }
  return issues;
}
