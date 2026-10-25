import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync, readdirSync } from 'node:fs';
import { productSchema } from '../src/lib/product-schema';
import { productStructuredData } from '../src/lib/product-seo';
import { categoryUniverse } from '../src/config/taxonomy';
import { getMerchantLinks } from '../src/lib/affiliate';
import type { Product } from '../src/lib/products';

const expected = {
  'jackery-explorer-1000-v2': ['B0D7PPG25F', 'power-stations'],
  'ecoflow-river-2-pro': ['B0BVLPGS79', 'power-stations'],
  'jackery-explorer-300': ['B082TMBYR6', 'power-stations'],
  'midland-er310': ['B015QIC1PW', 'weather-radios'],
  'fenix-cl26r-pro': ['B0CGKWX5YT', 'lighting'],
  'jackery-solarsaga-100w-air': ['B0FX8P4JST', 'solar'],
  'kidde-c3010-co-alarm': ['B00FHW7PBS', 'home-outage-planning'],
  'iniu-p62-20000mah-65w': ['B0DB888L9F', 'battery-banks'],
} as const;
const rawProducts = new Map(readdirSync('src/data/products').filter((file) => file.endsWith('.json')).map((file) => [file.replace(/\.json$/, ''), JSON.parse(readFileSync(`src/data/products/${file}`, 'utf8'))]));
const site = new URL('https://apocalypsegearlab.github.io');

test('eight selected records have exact ASIN, URL, category and unpublished state', () => {
  for (const [slug, [asin, category]] of Object.entries(expected)) {
    const raw = rawProducts.get(slug);
    assert.ok(raw, slug);
    const data = productSchema.parse(raw);
    assert.equal(data.links.amazonCa.asin, asin);
    assert.equal(data.links.amazonCa.url, `https://www.amazon.ca/dp/${asin}?tag=apocalypsegear-20`);
    assert.equal(new URL(data.links.amazonCa.url!).searchParams.getAll('tag').length, 1);
    assert.equal(data.category, category);
    assert.equal(categoryUniverse(data.category), 'blackout');
    assert.equal(data.testing, 'not-tested');
    assert.equal(data.reviewStatus, 'draft');
    assert.equal(data.lastVerified, null);
    assert.equal(data.research?.publicationApproved, false);
    assert.equal(data.research?.listingVerified, false);
    assert.ok(data.sources.length >= 2);
    assert.ok(data.research?.confirmed.length);
    assert.ok(data.research?.publicationBlockers.length);
    assert.ok(data.description.length > 150);
    assert.ok(data.specs.length >= 5);
    assert.equal(data.image, null);
    for (const key of ['price', 'rating', 'aggregateRating', 'stock', 'discount']) assert.ok(!(key in raw));
    const product = { id: slug, data } as Product;
    assert.ok(getMerchantLinks(product).every((link) => link.href === null));
    assert.equal(getMerchantLinks(product, true)[0]?.href, data.links.amazonCa.url);
  }
});

test('slugs, ASINs and related records are unique and refer to existing products', () => {
  const asins = new Set<string>();
  for (const [slug, raw] of rawProducts) {
    assert.match(slug, /^[a-z0-9-]+$/);
    const data = productSchema.parse(raw);
    if (data.links.amazonCa.asin) {
      assert.ok(!asins.has(data.links.amazonCa.asin));
      asins.add(data.links.amazonCa.asin);
    }
    assert.ok(!JSON.stringify(raw).includes('kitchengearla-20'));
    assert.ok(!JSON.stringify(raw).includes('B0CZ9LH53B'));
    assert.notEqual(data.brand, 'Anker');
    assert.equal(new Set(data.relatedProducts).size, data.relatedProducts.length);
    for (const related of data.relatedProducts) {
      assert.notEqual(related, slug);
      assert.ok(rawProducts.has(related), `${slug} -> ${related}`);
    }
  }
  assert.equal(asins.size, 8);
});

test('Kidde and INIU remain blocked and cannot be published by changing only editorial status', () => {
  for (const slug of ['kidde-c3010-co-alarm', 'iniu-p62-20000mah-65w']) {
    const raw = rawProducts.get(slug);
    assert.equal(raw.research.safetyStatus, 'blocked');
    assert.equal(productSchema.safeParse({ ...raw, reviewStatus: 'published' }).success, false);
  }
});

test('all researched drafts require listing verification, safety clearance and owner approval', () => {
  const raw = structuredClone(rawProducts.get('jackery-explorer-1000-v2'));
  raw.reviewStatus = 'published';
  assert.equal(productSchema.safeParse(raw).success, false);
  raw.research = { ...raw.research, publicationApproved: true, listingVerified: true, safetyStatus: 'cleared', publicationBlockers: [] };
  assert.equal(productSchema.safeParse(raw).success, true);
  for (const override of [{ publicationApproved: false }, { listingVerified: false }, { safetyStatus: 'pending' }, { publicationBlockers: ['Unresolved issue'] }]) {
    assert.equal(productSchema.safeParse({ ...raw, research: { ...raw.research, ...override } }).success, false);
  }
});

test('schema rejects missing evidence, duplicate sources and incorrect ASIN mappings', () => {
  const raw = structuredClone(rawProducts.get('jackery-explorer-1000-v2'));
  assert.equal(productSchema.safeParse({ ...raw, sources: [] }).success, false);
  assert.equal(productSchema.safeParse({ ...raw, sources: [...raw.sources, raw.sources[0]] }).success, false);
  const links = { ...raw.links, amazonCa: { ...raw.links.amazonCa, asin: 'B000000001' } };
  assert.equal(productSchema.safeParse({ ...raw, links }).success, false);
});

test('no Product, Review, Offer or AggregateRating data is emitted for drafts', () => {
  for (const slug of Object.keys(expected)) {
    assert.equal(productStructuredData({ id: slug, data: productSchema.parse(rawProducts.get(slug)) } as Product, site), undefined);
  }
});

test('approved Product structured data contains identity only, without invented commercial or review data', () => {
  const raw = structuredClone(rawProducts.get('jackery-explorer-1000-v2'));
  raw.reviewStatus = 'published';
  raw.research = { ...raw.research, publicationApproved: true, listingVerified: true, safetyStatus: 'cleared', publicationBlockers: [] };
  const data = productStructuredData({ id: 'jackery-explorer-1000-v2', data: productSchema.parse(raw) } as Product, site)!;
  assert.equal(data['@type'], 'Product');
  assert.equal(data.url, `${site.origin}/gear/jackery-explorer-1000-v2/`);
  assert.equal(data.model, 'JE-1000D');
  for (const key of ['offers', 'review', 'aggregateRating', 'image', 'award']) assert.ok(!(key in data));
});
