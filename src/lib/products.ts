import { getCollection, type CollectionEntry } from 'astro:content';
import { categoryUniverse, type UniverseId } from '../config/taxonomy';
import { isPubliclyVisible } from './release-policy';

export type Product = CollectionEntry<'products'>;

/** Production shows approved products and explicitly selected reference profiles. */
export function isVisible(product: Product): boolean {
  return import.meta.env.DEV || isPubliclyVisible(product);
}

export async function getVisibleProducts(): Promise<Product[]> {
  const all = await getCollection('products');
  return all.filter(isVisible).sort((a, b) => a.data.name.localeCompare(b.data.name));
}

export async function getProductsByUniverse(universe: UniverseId): Promise<Product[]> {
  const visible = await getVisibleProducts();
  return visible.filter((p) => categoryUniverse(p.data.category) === universe);
}
