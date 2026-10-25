import review from '../data/media/review.json';

type Review = { accuracyStatus: string; caption?: string; note: string; references: string[] };
export function assetReview(slug: string): Review | undefined {
  return (review.assets as Record<string, Review>)[slug];
}
export function canDisplayProductArtwork(slug: string, development: boolean): boolean {
  // Review is independent of product approval. Pending reference-photo permissions
  // must never become commercial approval merely by publishing a product record.
  if (assetReview(slug)?.accuracyStatus === 'rejected') return false;
  return development || (review.rightsStatus === 'confirmed-by-owner' && assetReview(slug)?.accuracyStatus === 'reviewed-illustration');
}
