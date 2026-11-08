import manifest from '../data/media/imported-manifest.json';
import { canPublishImportedAsset } from './imported-media-policy.mjs';
import whiteout from '../data/media/whiteout-manifest.json';
import whiteoutPhase2 from '../data/media/whiteout-phase2-manifest.json';
import responsive from '../data/media/responsive-imported-manifest.json';
// Original identity/provenance records stay byte-identical; delivery adds derivatives only.
export const importedMedia = [...manifest.assets, ...whiteout.assets, ...whiteoutPhase2.assets];
export const deliveredMedia = importedMedia.map(asset => {
  const derivatives = responsive.assets.find(entry => entry.id === asset.id);
  return derivatives ? { ...asset, variants: derivatives.variants } : asset;
});
export function importedArtwork(slug: string) {
  return deliveredMedia.find((asset) => asset.productId === slug);
}
export { canPublishImportedAsset };
