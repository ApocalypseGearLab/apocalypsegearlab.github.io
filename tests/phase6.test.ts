import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { filterCatalogue } from '../src/lib/catalogue-search';
import { HUB_EDITORIAL_READY, categoryPageCanBeIndexed } from '../src/lib/category-seo';
import { planningContext } from '../src/lib/planning-context';
import { productSchema } from '../src/lib/product-schema';
import { isCommerciallyApproved } from '../src/lib/release-policy';
import { getMerchantLinks } from '../src/lib/affiliate';
import type { Product } from '../src/lib/products';

test('search combines literal name/brand tokens, sector and category with reset and empty states', () => {
  const rows = [
    { name: 'DELTA 2', brand: 'EcoFlow', sector: 'blackout', category: 'power-stations' },
    { name: 'Réserve AA', brand: 'Panasonic', sector: 'blackout', category: 'rechargeable-batteries' },
    { name: 'Kit', brand: 'Test', sector: 'fallout', category: 'first-aid' },
  ];
  assert.deepEqual(filterCatalogue(rows, { query: '  ECOFLOW  delta ', sector: 'blackout', category: 'power-stations' }), [true, false, false]);
  assert.deepEqual(filterCatalogue(rows, { query: 'reserve', sector: '', category: '' }), [false, true, false]);
  assert.deepEqual(filterCatalogue(rows, { query: '[.*]', sector: '', category: '' }), [false, false, false]);
  assert.deepEqual(filterCatalogue(rows, { query: '', sector: 'outbreak', category: 'first-aid' }), [false, false, false]);
  assert.deepEqual(filterCatalogue(rows, { query: '', sector: '', category: '' }), [true, true, true]);
});

test('Phase 6 preserves all product records, media, affiliate and tracking implementation bytes', () => {
  const baseline = JSON.parse(readFileSync('docs/qa/phase6/baseline.json', 'utf8'));
  for (const row of baseline.preservedFiles) assert.equal(createHash('sha256').update(readFileSync(row.file)).digest('hex'), row.sha256, row.file);
});

test('hub readiness is independent; no draft earns indexability through an available affiliate link', () => {
  for (const ready of Object.values(HUB_EDITORIAL_READY)) {
    assert.equal(categoryPageCanBeIndexed(ready), true);
    assert.equal(categoryPageCanBeIndexed(ready, true), false);
  }
  const products = readdirSync('src/data/products').filter(f => f.endsWith('.json')).map(f => ({ id: f.slice(0, -5), data: productSchema.parse(JSON.parse(readFileSync('src/data/products/' + f, 'utf8'))) } as Product));
  assert.equal(products.filter(isCommerciallyApproved).length, 0);
  assert.equal(products.filter(p => getMerchantLinks(p).some(l => l.href)).length, 36);
  for (const product of products) assert.match(planningContext(product.data.category).href, /^\/(blackout|fallout|outbreak)\/#/);
});
