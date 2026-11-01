// Explicit additions; existing 36 product decisions and every old media byte
// are protected by the BougeRV main baseline and preservation regression test.
export const BOUGERV = {
  'bougerv-53-quart-portable-refrigerator-freezer': ['B0869NCSNH', 'portable-refrigeration', true],
  'bougerv-rocky-v3-55qt-dual-zone-portable-car-cooler': ['B0GHMS5Y9Y', 'portable-refrigeration', true],
} as const;
export const BOUGERV_INTEGRATION_FILES = new Set([
  'src/config/taxonomy.ts',
  'src/lib/product-schema.ts',
  'src/components/ProductProfile.astro',
  'src/components/UniverseHub.astro',
  'src/data/media/imported-manifest.json',
  'scripts/verify-images.mjs',
  'scripts/audit-conversion.ts',
]);
