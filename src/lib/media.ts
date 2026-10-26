import manifest from '../data/media/manifest.json';

export type MediaAsset = (typeof manifest.assets)[number];
// Intended editorial associations, not certification of the depicted model.
export const heroMedia = manifest.assets.find((asset) => asset.id === 'hero')!;
export function productMedia(slug: string): MediaAsset | undefined {
  return manifest.assets.find((asset) => asset.id !== 'hero' && asset.id === slug);
}
export function mediaUrl(src: string | null): string {
  if (!src) throw new Error('Rejected artwork has no public image URL');
  return `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${src.replace(/^\//, '')}`;
}
export function mediaSrcset(asset: { variants: readonly { src: string | null; width: number }[] }): string {
  return asset.variants.filter((variant) => variant.src).map((variant) => `${mediaUrl(variant.src!)} ${variant.width}w`).join(', ');
}
