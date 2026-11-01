/** Reviewed catalogue guide: original selection guidance, sector navigation and
 * documented profile directory. This is page editorial readiness, not approval
 * of any individual product, retailer offer or Amazon account. */
export const CATALOGUE_EDITORIAL_READY = true;
/** Each guide is reviewed independently; this grants no product approval. */
export const HUB_EDITORIAL_READY = { blackout: true, fallout: true, outbreak: true } as const;

export function categoryPageCanBeIndexed(editorialReady: boolean, preview = false): boolean {
  return editorialReady && !preview;
}
