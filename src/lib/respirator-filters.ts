import type { Product } from './products';
import { productCaution as existingProductCaution } from './release-policy';

// These are component comparisons, never a hazard-selection or approval engine.
export const COMPATIBLE_3M_FILTERS = [
  { id: '3m-60921-organic-vapor-p100-cartridges', model: '60921', scope: 'Certain organic vapors plus P100 particulates; not a multi-gas cartridge.' },
  { id: '3m-60926-multi-gas-vapor-p100-cartridges', model: '60926', scope: 'Specified gases and vapors plus P100 particulates; not universal chemical protection.' },
  { id: '3m-2097-p100-particulate-filters', model: '2097', scope: 'P100 particulates with nuisance-level organic-vapor relief; not a replacement for hazardous gas/vapor cartridges.' },
  { id: '3m-2091-p100-particulate-filters', model: '2091', scope: 'P100 particulates only; no nuisance-level organic-vapor relief or hazardous gas/vapor protection is specified.' },
] as const;

export function productCaution(product: Product): string | undefined {
  const filter = COMPATIBLE_3M_FILTERS.find(({ id }) => id === product.id);
  if (!filter) return existingProductCaution(product);
  return `${filter.scope} Use two matching components in a manufacturer-approved assembly selected for an assessed hazard. Fit testing, training and a tight seal are essential. These components supply no oxygen; do not use in oxygen-deficient, unknown or immediately dangerous to life or health atmospheres. No universal radiation, biological-agent or chemical-weapon protection is established.`;
}
