import type { Product } from './products';
import { isCommerciallyApproved } from './release-policy';

export function productStructuredData(product: Product, site: URL): Record<string, unknown> | undefined {
  const { data } = product;
  if (!isCommerciallyApproved(product)) return undefined;
  return {
    '@context': 'https://schema.org', '@type': 'Product',
    name: data.name, description: data.summary,
    brand: { '@type': 'Brand', name: data.brand },
    ...(data.modelNumber ? { model: data.modelNumber } : {}),
    url: new URL(`/gear/${product.id}/`, site).href,
    ...(data.links.amazonCa.asin ? { identifier: { '@type': 'PropertyValue', propertyID: 'ASIN', value: data.links.amazonCa.asin } } : {}),
  };
}
