import manifest from '../data/media/imported-manifest.json';
import { canPublishImportedAsset } from './imported-media-policy.mjs';
import whiteout from '../data/media/whiteout-manifest.json';
export const importedMedia = [...manifest.assets, ...whiteout.assets];
export function importedArtwork(slug: string) {
  return importedMedia.find((asset) => asset.productId === slug);
}
export { canPublishImportedAsset };
