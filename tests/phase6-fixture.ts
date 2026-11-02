/** Authorized UI/editorial changes supersede historical component snapshots.
 * phase6.test.ts freezes all products/media and commercial/tracking policy. */
export const PHASE6_INTEGRATION_FILES = new Set([
  // Phase 6.1 replaces the old header; dynamic destinations and behavior are
  // covered by phase61.test.ts and browser/navigation.spec.ts.
  'src/components/Header.astro',
  // Official favicon declarations supersede the old layout hash. Phase 6.1's
  // byte comparison reverses only those three exact declarations.
  'src/layouts/BaseLayout.astro',
  'src/components/UniverseHub.astro', 'src/components/ProductCatalogue.astro',
  'src/components/ProductCard.astro', 'src/components/ProductProfile.astro',
  'src/components/Footer.astro', 'src/styles/global.css', 'src/config/site.ts',
  'src/lib/category-seo.ts', 'src/pages/index.astro', 'scripts/verify-site.mjs', 'scripts/verify-products.mjs',
]);
