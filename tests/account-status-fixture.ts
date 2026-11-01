// Narrow supersession of historical source snapshots. The new before.json
// baseline and product-verification.test.ts protect every other byte/field;
// historical QA artifacts are never regenerated.
export const ACCOUNT_STATUS_FILES = new Set([
  'src/config/site.ts',
  'src/lib/affiliate.ts',
  'src/lib/affiliate-audit.ts',
  'src/components/AffiliateButton.astro',
  'src/components/ProductCard.astro',
  'src/components/ProductProfile.astro',
  'src/pages/affiliate-disclosure.astro',
  'scripts/release-check.ts',
]);
export const EVIDENCE_NORMALISED_IDS = ['midland-er310', 'sos-3600-calorie-emergency-food-rations', 'readywise-84-servings-emergency-food-bucket'];
export const ACCOUNT_EVIDENCE_FILES = new Set(EVIDENCE_NORMALISED_IDS.map(id=>'src/data/products/'+id+'.json'));
export const accountStatusFileChanged = (file:string) => ACCOUNT_STATUS_FILES.has(file) || ACCOUNT_EVIDENCE_FILES.has(file);
/** Compare old product snapshots without the newly normalised evidence field. */
export function historicalProductJSON(file:string, data:any) {
  const copy=structuredClone(data);
  if(ACCOUNT_EVIDENCE_FILES.has(file))delete copy.research.listingEvidence;
  return JSON.stringify(copy);
}
