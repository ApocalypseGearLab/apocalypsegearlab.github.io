import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { productSchema } from '../src/lib/product-schema';
import { publicationIssues, isPublicProduct, RELEASE_HOLDS } from '../src/lib/release-policy';
import { getMerchantLinks } from '../src/lib/affiliate';
import { productStructuredData } from '../src/lib/product-seo';
import type { Product } from '../src/lib/products';

const read = (id: string) => ({ id, data: productSchema.parse(JSON.parse(readFileSync(`src/data/products/${id}.json`, 'utf8'))) } as Product);
test('mandatory holds survive accidental status and approval flag changes', () => {
  for (const id of Object.keys(RELEASE_HOLDS)) {
    const product = read(id);
    const simulated = { ...product, data: { ...product.data, reviewStatus: 'published', research: { ...product.data.research!, listingVerified: true, publicationApproved: true, safetyStatus: 'cleared', publicationBlockers: [] } } } as Product;
    assert.equal(isPublicProduct(simulated), false);
    assert.ok(publicationIssues(simulated).length);
    assert.equal(productStructuredData(simulated, new URL('https://apocalypsegearlab.github.io')), undefined);
    assert.ok(getMerchantLinks(simulated, true).every((link) => link.href === null));
    assert.equal(isPublicProduct({ ...simulated, id: 'renamed-entry' }), false, 'Renaming a held product cannot evade the ASIN hold');
  }
});
test('published specifications cannot lose their included manufacturer evidence', () => {
  const product = read('fenix-cl26r-pro');
  const approved = { ...product.data, reviewStatus: 'published', research: { ...product.data.research!, listingVerified: true, publicationApproved: true, safetyStatus: 'cleared', publicationBlockers: [] } };
  assert.equal(productSchema.safeParse(approved).success, true);
  assert.equal(productSchema.safeParse({ ...approved, specs: [{ label: 'Output', value: 'Invented value' }] }).success, false);
});
test('removing the research object cannot bypass the published schema guard', () => {
  const product = read('fenix-cl26r-pro');
  assert.equal(productSchema.safeParse({ ...product.data, reviewStatus: 'published', research: undefined }).success, false);
});
test('documented candidate remains private and non-commercial until every existing approval is obtained', () => {
  const product = read('jackery-explorer-1000-v2');
  assert.ok(publicationIssues(product).length);
  assert.equal(isPublicProduct(product), false);
  assert.ok(getMerchantLinks(product, true).every((link) => link.href === null));
  const simulated = { ...product, data: { ...product.data, reviewStatus: 'published', research: { ...product.data.research!, listingVerified: true, publicationApproved: true, safetyStatus: 'cleared', publicationBlockers: [] } } } as Product;
  assert.equal(isPublicProduct(simulated), true);
  assert.equal(getMerchantLinks(simulated, false)[0]?.href, null);
  assert.equal(getMerchantLinks(simulated, true)[0]?.href, product.data.links.amazonCa.url);
});
