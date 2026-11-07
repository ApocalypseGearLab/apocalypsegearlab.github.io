import { beforePhase7Integration } from '../scripts/phase7-preservation.mjs';
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

const textCheckoutFile = 'assets/media/image-manifest.csv';
function preservationHash(bytes: Buffer, normaliseNewlines = false): string {
  // Latin-1 is a one-to-one byte mapping: remove only CR in CRLF pairs,
  // without accepting encoding changes or modifying any other byte.
  const canonical = normaliseNewlines ? Buffer.from(bytes.toString('latin1').replace(/\r\n/g, '\n'), 'latin1') : bytes;
  return createHash('sha256').update(canonical).digest('hex');
}

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
  assert.equal(baseline.baseCommit, '520d61a3b48d67ca01623eebcf4784275097dc56');
  for (const row of baseline.preservedFiles) {
    assert.equal(Boolean(row.normaliseNewlines), row.file === textCheckoutFile, `Unexpected normalization policy: ${row.file}`);
    assert.equal(preservationHash(beforePhase7Integration(row.file, readFileSync(row.file)), row.normaliseNewlines), row.sha256, row.file);
  }
});

test('preservation accepts the documented CSV checkout endings but rejects content and binary changes', () => {
  const baseline = JSON.parse(readFileSync('docs/qa/phase6/baseline.json', 'utf8'));
  const manifest = baseline.preservedFiles.find((row: { file: string }) => row.file === textCheckoutFile);
  const lf = Buffer.from(readFileSync(textCheckoutFile).toString('latin1').replace(/\r\n/g, '\n'), 'latin1');
  const crlf = Buffer.from(lf.toString('latin1').replace(/\n/g, '\r\n'), 'latin1');
  assert.equal(manifest.sha256, '784a154a629b42416b8e9657612ee453867f30cf4d99d84017432c94c2ddfaab');
  assert.equal(preservationHash(lf, true), manifest.sha256);
  assert.equal(preservationHash(crlf, true), manifest.sha256);
  assert.notEqual(preservationHash(lf), preservationHash(crlf));
  const changedManifest = Buffer.from(lf);
  changedManifest[0] = changedManifest[0]! ^ 1;
  assert.notEqual(preservationHash(changedManifest, true), manifest.sha256, 'A real CSV edit must still fail');
  assert.notEqual(preservationHash(Buffer.concat([Buffer.from([0xef, 0xbb, 0xbf]), lf]), true), manifest.sha256, 'An encoding/BOM change must still fail');
  const imageBytes = Buffer.from([0x52, 0x49, 0x46, 0x46, 0x0d, 0x0a, 0xff]);
  const changedImage = Buffer.from([0x52, 0x49, 0x46, 0x46, 0x0a, 0xff]);
  assert.notEqual(preservationHash(imageBytes), preservationHash(changedImage), 'Media bytes must never be normalized');
});

test('hub readiness is independent; no draft earns indexability through an available affiliate link', () => {
  for (const ready of Object.values(HUB_EDITORIAL_READY)) {
    assert.equal(categoryPageCanBeIndexed(ready), true);
    assert.equal(categoryPageCanBeIndexed(ready, true), false);
  }
  const products = readdirSync('src/data/products').filter(f => f.endsWith('.json')).map(f => ({ id: f.slice(0, -5), data: productSchema.parse(JSON.parse(readFileSync('src/data/products/' + f, 'utf8'))) } as Product));
  assert.equal(products.filter(isCommerciallyApproved).length, 0);
  assert.equal(products.filter(p => getMerchantLinks(p).some(l => l.href)).length, 47);
  for (const product of products) assert.match(planningContext(product.data.category).href, /^\/(blackout|fallout|outbreak|whiteout)\/#/);
});
