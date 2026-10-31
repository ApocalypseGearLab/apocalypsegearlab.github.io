// These deliberate shared-renderer/tracking changes are covered by the Phase 5.2
// baseline, rendered-SEO comparison and global conversion tests. Historical
// snapshots still protect every product, policy/configuration and media asset.
export const CONVERSION_INTEGRATION_FILES = new Set([
  'src/components/ProductProfile.astro',
  'src/components/ProductCard.astro',
  'src/components/AffiliateButton.astro',
  'src/components/ProductCatalogue.astro',
  'src/components/UniverseHub.astro',
  'src/lib/affiliate.ts',
  'src/lib/affiliate-analytics.ts',
  '.github/workflows/ci.yml',
]);
