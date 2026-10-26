// @ts-check
/** @param {{productId?: string | null, usage?: string, rightsStatus?: string, accuracyStatus?: string}} asset */
export function canPublishImportedAsset(asset) {
  return Boolean(asset.productId) && asset.usage === 'current-product'
    && asset.rightsStatus === 'confirmed-by-owner'
    && asset.accuracyStatus === 'reviewed-illustration';
}
