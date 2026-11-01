export const PHASE55 = {
  'oria-wireless-refrigerator-freezer-thermometer':['B07B9QF64N','temperature-monitoring',true],
  'panasonic-eneloop-aa-rechargeable-battery-charger-kit':['B00JHKSMJU','rechargeable-batteries',true],
  'panasonic-eneloop-aaa-rechargeable-battery-charger-kit':['B010U57MSW','rechargeable-batteries',true],
} as const;
// Existing products and media are frozen by the Phase 5.5 main baseline.
export const PHASE55_INTEGRATION_FILES = new Set([
 'src/config/taxonomy.ts','src/lib/product-schema.ts',
 'src/components/ProductProfile.astro','src/components/ProductImage.astro',
 'src/components/UniverseHub.astro','src/data/media/imported-manifest.json',
 'scripts/verify-images.mjs','scripts/audit-conversion.ts','scripts/verify-bougerv.ts',
]);
