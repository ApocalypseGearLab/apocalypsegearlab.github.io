import { CATEGORIES, UNIVERSE_IDS, type CategoryId } from '../config/taxonomy';
import type { Product } from './products';
import { isPubliclyVisible } from './release-policy';

/** Stable HTML targets, useful without the catalogue's enhancement too. */
export const categoryAnchor = (id: CategoryId) => `category-${id}`;
export const categoryDestination = (id: CategoryId) => `/gear/#${categoryAnchor(id)}`;

/** Reuse the schema taxonomy and public visibility policy; never infer approval. */
export function populatedCategories(products: Product[]) {
  const counts = new Map<CategoryId, number>();
  for (const product of products.filter(isPubliclyVisible)) {
    counts.set(product.data.category, (counts.get(product.data.category) ?? 0) + 1);
  }
  return UNIVERSE_IDS.flatMap(id => CATEGORIES.filter(category => category.universe === id && counts.has(category.id))).map(category => ({
    ...category, count: counts.get(category.id)!, href: categoryDestination(category.id),
  }));
}
