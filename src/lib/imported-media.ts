import manifest from '../data/media/imported-manifest.json';
import { canPublishImportedAsset } from './imported-media-policy.mjs';
import whiteout from '../data/media/whiteout-manifest.json';
import whiteoutPhase2 from '../data/media/whiteout-phase2-manifest.json';
export const importedMedia = [...manifest.assets, ...whiteout.assets, ...whiteoutPhase2.assets];
export function importedArtwork(slug: string) {
  return importedMedia.find((asset) => asset.productId === slug);
}
export { canPublishImportedAsset };
