import { productMedia } from './media';
import { canDisplayProductArtwork } from './media-policy';
import { importedArtwork, canPublishImportedAsset } from './imported-media';

/** Match ProductImage's existing rights-gated selection for social cards and schema.
 * Reviewed illustrations remain illustrations; selection does not authenticate
 * a manufacturer photograph, retail variant, or commercial recommendation. */
export function productArtwork(slug: string, editorialArtwork = false) {
  const supplied = importedArtwork(slug);
  const asset = supplied ? {
    alt: supplied.alt.replace('AI-assisted illustration', 'Concept illustration'),
    identityNote: supplied.reviewNote,
    variants: ('variants' in supplied && supplied.variants) || [
      { src: supplied.deliverySrc, width: supplied.width, height: supplied.height },
    ],
  } : productMedia(slug);
  const display = supplied ? canPublishImportedAsset(supplied) : canDisplayProductArtwork(slug, editorialArtwork);
  return { supplied, asset, display };
}

export function productSocialImage(slug: string) {
  const { asset, display } = productArtwork(slug);
  const primary = display ? asset?.variants.at(-1) : undefined;
  return primary?.src && asset ? {
    src: primary.src, width: primary.width, height: primary.height,
    alt: asset.alt.replace('AI-assisted illustration', 'Concept illustration'),
  } : undefined;
}
