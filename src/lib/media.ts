import manifest from '../data/media/manifest.json';

export type MediaAsset = (typeof manifest.assets)[number];
// Intended editorial associations, not certification of the depicted model.
export const heroMedia = manifest.assets.find((asset) => asset.id === 'hero')!;
export function productMedia(slug: string): MediaAsset | undefined {
  return manifest.assets.find((asset) => asset.id !== 'hero' && asset.id === slug);
}
export function mediaUrl(src: string): string {
  return `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${src.replace(/^\//, '')}`;
}
export function mediaSrcset(asset: MediaAsset): string {
  return asset.variants.map((variant) => `${mediaUrl(variant.src)} ${variant.width}w`).join(', ');
}
