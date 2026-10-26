import type { Product } from './products';

export const RELEASE_HOLDS: Record<string, string> = {
  'kidde-c3010-co-alarm': 'Canadian model and certification evidence are incomplete.',
  'iniu-p62-20000mah-65w': 'Exact-model safety verification is incomplete.',
  'jackery-explorer-300': 'Regional model identity, capacity and voltage must be matched to the Canadian listing.',
};
const HELD_ASINS: Record<string, string> = {
  B00FHW7PBS: RELEASE_HOLDS['kidde-c3010-co-alarm']!,
  B0DB888L9F: RELEASE_HOLDS['iniu-p62-20000mah-65w']!,
  B082TMBYR6: RELEASE_HOLDS['jackery-explorer-300']!,
};
export function mandatoryHold(product: Product): string | undefined {
  return RELEASE_HOLDS[product.id] ?? HELD_ASINS[product.data.links.amazonCa.asin ?? ''];
}

/** Commercial approval is separate from informational visibility and image rights. */
export function publicationIssues(product: Product): string[] {
  const issues: string[] = [];
  const hold = mandatoryHold(product);
  if (hold) issues.push(hold);
  const research = product.data.research;
  if (!research) return [...issues, 'Documented research and approval are required.'];
  if (!research.listingVerified) issues.push('Canadian listing identity has not been verified.');
  if (research.safetyStatus !== 'cleared') issues.push('Safety review has not been completed.');
  if (!research.publicationApproved) issues.push('Editorial publication approval is pending.');
  if (research.affiliateReview?.decision === 'hold') issues.push(research.affiliateReview.reason);
  issues.push(...research.publicationBlockers);
  return [...new Set(issues)];
}

export function isCommerciallyApproved(product: Product): boolean {
  return product.data.reviewStatus === 'published' && publicationIssues(product).length === 0;
}

/** An explicit editorial choice, independent of all commercial/safety holds. */
export function isInformationalProduct(product: Product): boolean {
  return product.data.visibility === 'informational' && product.data.reviewStatus !== 'template';
}

export function isPubliclyVisible(product: Product): boolean {
  return isInformationalProduct(product) || isCommerciallyApproved(product);
}

export function productCaution(product: Product): string | undefined {
  const asin = product.data.links.amazonCa.asin;
  if (product.id === 'kidde-c3010-co-alarm' || asin === 'B00FHW7PBS') return 'Canadian certification unconfirmed. The US C3010 designation does not establish C3010-CA equivalence. Do not select this listing for a Canadian installation without the actual certification label and Canadian instructions.';
  if (product.id === 'iniu-p62-20000mah-65w' || asin === 'B0DB888L9F') return 'Safety verification incomplete. The exact P62 revision, cable configuration and Canadian safety evidence remain unverified. This profile does not establish the safety of the listed unit or recommend its purchase.';
  if (product.id === 'jackery-explorer-300' || asin === 'B082TMBYR6') return 'Explorer 300 revision unresolved. The retrieved retailer page describes a 292 Wh LiFePO4 version, while this profile documents the original NCM model. Battery chemistry, capacity and regional voltage must be matched before purchase. Do not assume SolarSaga 100 Air compatibility.';
  return undefined;
}
