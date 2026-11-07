import { beforePhase7Integration } from '../scripts/phase7-preservation.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { CATEGORIES, categoryLabel, categoryUniverse } from '../src/config/taxonomy';
import { populatedCategories, categoryAnchor, categoryDestination } from '../src/lib/category-navigation';
import { productSchema } from '../src/lib/product-schema';
import { isPubliclyVisible, isCommerciallyApproved } from '../src/lib/release-policy';
import type { Product } from '../src/lib/products';
import { beforeBrandIntegration } from './branding-fixture';

const products = readdirSync('src/data/products').filter(file => file.endsWith('.json')).map(file => ({
  id: file.slice(0, -5), data: productSchema.parse(JSON.parse(readFileSync(`src/data/products/${file}`, 'utf8'))),
} as Product));

test('navigation categories exactly match public products, canonical labels, sectors and stable destinations', () => {
  const visible = products.filter(isPubliclyVisible);
  const categories = populatedCategories(products);
  assert.equal(visible.length, 52);
  assert.equal(new Set(categories.map(c => c.id)).size, categories.length);
  assert.deepEqual(new Set(categories.map(c => c.id)), new Set(visible.map(p => p.data.category)));
  for (const category of categories) {
    assert.equal(category.label, categoryLabel(category.id));
    assert.equal(category.universe, categoryUniverse(category.id));
    assert.equal(category.count, visible.filter(p => p.data.category === category.id).length);
    assert.equal(category.href, `/gear/#${categoryAnchor(category.id)}`);
    assert.equal(category.href, categoryDestination(category.id));
  }
  assert.deepEqual(populatedCategories([]), []);
});

test('an established empty category appears automatically only for an explicitly public product', () => {
  const empty = CATEGORIES.find(c => !populatedCategories(products).some(populated => populated.id === c.id))!;
  const draft = structuredClone(products.find(p => isPubliclyVisible(p))!);
  draft.id = 'navigation-fixture'; draft.data.category = empty.id;
  draft.data.visibility = 'internal'; draft.data.reviewStatus = 'draft';
  assert.equal(isCommerciallyApproved(draft), false);
  assert.equal(populatedCategories([...products, draft]).some(c => c.id === empty.id), false);
  draft.data.visibility = 'informational';
  assert.equal(populatedCategories([...products, draft]).find(c => c.id === empty.id)?.count, 1);
  assert.equal(isCommerciallyApproved(draft), false, 'Navigation cannot grant commercial approval');
  draft.data.reviewStatus = 'template';
  assert.equal(populatedCategories([...products, draft]).some(c => c.id === empty.id), false);
});

test('Phase 6.1 preserves merged Phase 6 editorial, product presentation, taxonomy and SEO source', () => {
  const baseline = JSON.parse(readFileSync('docs/qa/phase6-1/preservation.json', 'utf8'));
  assert.equal(baseline.baseCommit, '967d8f83087a03f6554df8a43fb373439cb9e671');
  assert.equal(baseline.files.length, 16);
  for (const row of baseline.files) {
    const canonical = Buffer.from(readFileSync(row.file).toString('latin1').replace(/\r\n/g, '\n'), 'latin1');
    assert.equal(createHash('sha256').update(beforeBrandIntegration(row.file, beforePhase7Integration(row.file, canonical))).digest('hex'), row.sha256, row.file);
  }
});
