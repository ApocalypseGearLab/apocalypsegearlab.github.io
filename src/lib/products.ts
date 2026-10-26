import { getCollection, type CollectionEntry } from 'astro:content';
import { categoryUniverse, type UniverseId } from '../config/taxonomy';
import { isPublicProduct, mandatoryHold } from './release-policy';

export type Product = CollectionEntry<'products'>;

/** Production shows only published products. Dev also shows drafts/templates. */
export function isVisible(product: Product): boolean {
  // Public informational profiles are independent from approved commercial recommendations.
  // Do not expose templates or the three products with unresolved safety/identity holds.
  return import.meta.env.DEV || isPublicProduct(product) || (product.data.reviewStatus !== 'template' && !mandatoryHold(product));
}

export async function getVisibleProducts(): Promise<Product[]> {
  const all = await getCollection('products');
  return all.filter(isVisible).sort((a, b) => a.data.name.localeCompare(b.data.name));
}

export async function getProductsByUniverse(universe: UniverseId): Promise<Product[]> {
  const visible = await getVisibleProducts();
  return visible.filter((p) => categoryUniverse(p.data.category) === universe);
}
