import manifest from '../data/media/imported-manifest.json';
import { canPublishImportedAsset } from './imported-media-policy.mjs';
export const importedMedia = manifest.assets;
export function importedArtwork(slug: string) {
  return importedMedia.find((asset) => asset.productId === slug);
}
export { canPublishImportedAsset };
