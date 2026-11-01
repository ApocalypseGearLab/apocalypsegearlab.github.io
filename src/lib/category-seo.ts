/** Reviewed catalogue guide: original selection guidance, sector navigation and
 * documented profile directory. This is page editorial readiness, not approval
 * of any individual product, retailer offer or Amazon account. */
export const CATALOGUE_EDITORIAL_READY = true;

export function categoryPageCanBeIndexed(editorialReady: boolean, preview = false): boolean {
  return editorialReady && !preview;
}
