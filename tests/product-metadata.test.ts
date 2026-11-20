import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { productArtwork, productSocialImage } from '../src/lib/product-artwork';
import { productStructuredData } from '../src/lib/product-seo';
import { productSchema } from '../src/lib/product-schema';
import { isPubliclyVisible, mandatoryHold } from '../src/lib/release-policy';
import { imageUrl } from '../scripts/verify-product-metadata';
import { localizeHtml, translate } from '../src/i18n/translate';
import type { Product } from '../src/lib/products';
import { createHash } from 'node:crypto';
import { beforeOracleIntegration } from '../scripts/oracle-preservation.mjs';
import { spawnSync } from 'node:child_process';
import { categoryUniverse } from '../src/config/taxonomy';
import { WHITEOUT_PHASE2_IDS } from '../scripts/whiteout-phase2-preservation.mjs';
import { WHITEOUT_PRODUCT_IDS } from '../scripts/whiteout-products-preservation.mjs';

const site = new URL('https://apocalypsegearlab.github.io');
const products = readdirSync('src/data/products').filter(file => file.endsWith('.json')).map(file => ({ id: file.slice(0, -5), data: productSchema.parse(JSON.parse(readFileSync(`src/data/products/${file}`, 'utf8'))) } as Product));

test('the reconciled catalogue retains 57 products, 54 eligible profiles and all ten WHITEOUT additions', () => {
  const visible = products.filter(isPubliclyVisible);
  const eligible = visible.filter(p => !mandatoryHold(p));
  assert.equal(visible.length, 57);
  assert.equal(eligible.length, 54);
  assert.deepEqual(visible.filter(p => mandatoryHold(p)).map(p => p.id).sort(), ['iniu-p62-20000mah-65w', 'jackery-explorer-300', 'kidde-c3010-co-alarm']);
  assert.deepEqual(Object.fromEntries(['blackout', 'fallout', 'outbreak', 'whiteout'].map(universe => [universe, eligible.filter(p => categoryUniverse(p.data.category) === universe).length])), { blackout: 15, fallout: 12, outbreak: 16, whiteout: 11 });
  for (const id of [...WHITEOUT_PHASE2_IDS, ...WHITEOUT_PRODUCT_IDS]) assert.ok(eligible.some(p => p.id === id && categoryUniverse(p.data.category) === 'whiteout'), id);
});

test('historical projections permit only the exact image metadata changes', () => {
  const hash = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');
  const changes = readFileSync('docs/qa/oracle/source-changes.json');
  assert.equal(hash(changes), 'eb6a28e8606d63a7e461476dcbff80475888549b183739ebc900c5d1b9f22f39');
  for (const file of Object.keys(JSON.parse(changes.toString()))) {
    const original = readFileSync(file);
    assert.notEqual(hash(beforeOracleIntegration(file, Buffer.concat([original, Buffer.from('\nUNRELATED EDIT')]))), hash(beforeOracleIntegration(file, original)));
  }
});

test('all eligible products select their page illustration with honest French alt text', () => {
  for (const product of products.filter(p => isPubliclyVisible(p) && !mandatoryHold(p))) {
    const image = productSocialImage(product.id);
    assert.ok(image, product.id);
    const { asset, display, supplied } = productArtwork(product.id);
    assert.ok(display);
    assert.equal(image.src, asset?.variants.at(-1)?.src);
    assert.equal(supplied?.rightsStatus, 'confirmed-by-owner');
    assert.equal(supplied?.accuracyStatus, 'reviewed-illustration');
    assert.match(translate(image.alt), /illustration/i);
    assert.ok(image.width > 0 && image.height > 0);
  }
});

test('rejected, missing and preview-only images never become social images', () => {
  assert.equal(productSocialImage('jackery-explorer-300'), undefined);
  assert.equal(productSocialImage('not-a-real-product'), undefined);
  assert.equal(productSocialImage('template-product'), undefined);
});

test('Product schema shares the image only after independent publication approval', () => {
  const product = structuredClone(products.find(p => p.id === 'fenix-cl26r-pro')!);
  assert.equal(productStructuredData(product, site), undefined);
  product.data.reviewStatus = 'published';
  Object.assign(product.data.research!, { listingVerified: true, publicationApproved: true, safetyStatus: 'cleared', publicationBlockers: [] });
  const schema = productStructuredData(product, site)!;
  const image = new URL(productSocialImage(product.id)!.src, site).href;
  assert.equal(schema.image, image);
  const html = localizeHtml(`<html><body><script type="application/ld+json">${JSON.stringify(schema)}</script></body></html>`, site);
  assert.ok(html.includes(image));
  assert.ok(html.includes('/fr/gear/fenix-cl26r-pro/'));
  for (const held of products.filter(p => mandatoryHold(p))) assert.equal(productStructuredData(held, site), undefined);
});

test('validator rejects insecure and off-site image destinations', () => {
  for (const value of ['http://apocalypsegearlab.github.io/image.webp', 'https://example.org/image.webp', 'https://user:pass@apocalypsegearlab.github.io/image.webp', '/image.webp?token=x', '/image.webp#fragment', 'data:image/png;base64,AAAA']) assert.throws(() => imageUrl(value, site));
  assert.equal(imageUrl('/images/blackout/midland-er310-blackout.webp', site).protocol, 'https:');
});

test('source-only mode cannot be combined with a claimed production audit', () => {
  const result = spawnSync(process.execPath, ['node_modules/tsx/dist/cli.mjs', 'scripts/verify-product-metadata.ts', '--source-only', '--production'], { encoding: 'utf8', windowsHide: true });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Choose one audit mode/);
});
