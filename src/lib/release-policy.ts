import type { Product } from './products';

export const RELEASE_HOLDS: Record<string, string> = {
  'kidde-c3010-co-alarm': 'Canadian model and certification evidence are incomplete.',
  'iniu-p62-20000mah-65w': 'Exact-model safety verification is incomplete.',
  'jackery-explorer-300': 'Accurate replacement artwork and regional model verification are required.',
};
const HELD_ASINS: Record<string, string> = {
  B00FHW7PBS: RELEASE_HOLDS['kidde-c3010-co-alarm']!,
  B0DB888L9F: RELEASE_HOLDS['iniu-p62-20000mah-65w']!,
  B082TMBYR6: RELEASE_HOLDS['jackery-explorer-300']!,
};
export function mandatoryHold(product: Product): string | undefined {
  return RELEASE_HOLDS[product.id] ?? HELD_ASINS[product.data.links.amazonCa.asin ?? ''];
}

/** Editorial eligibility is separate from image rights and Associates enrollment. */
export function publicationIssues(product: Product): string[] {
  const issues: string[] = [];
  const hold = mandatoryHold(product);
  if (hold) issues.push(hold);
  const research = product.data.research;
  if (!research) return [...issues, 'Documented research and approval are required.'];
  if (!research.listingVerified) issues.push('Canadian listing identity has not been verified.');
  if (research.safetyStatus !== 'cleared') issues.push('Safety review has not been completed.');
  if (!research.publicationApproved) issues.push('Editorial publication approval is pending.');
  issues.push(...research.publicationBlockers);
  return [...new Set(issues)];
}

export function isPublicProduct(product: Product): boolean {
  return product.data.reviewStatus === 'published' && publicationIssues(product).length === 0;
}
