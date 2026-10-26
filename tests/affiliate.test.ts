import assert from 'node:assert/strict';
import test from 'node:test';
import { AFFILIATE_REL, getMerchantLinks } from '../src/lib/affiliate';
import type { Product } from '../src/lib/products';

function product(ca: string | null, us: string | null = null, partner: string | null = null): Product {
  return { id: 'qa-approved', data: { reviewStatus: 'published', research: { listingVerified: true, publicationApproved: true, safetyStatus: 'cleared', publicationBlockers: [] }, links: {
    amazonCa: { url: ca, asin: null }, amazonCom: { url: us, asin: null },
    partners: partner ? [{ name: 'Partner', url: partner }] : [],
  } } } as unknown as Product;
}

test('Amazon links remain pending before Associates enrollment', () => {
  assert.equal(getMerchantLinks(product('https://www.amazon.ca/dp/B000000001'))[0]?.href, null);
});

test('verified HTTPS Amazon links keep their affiliate tags', () => {
  const url = 'https://www.amazon.ca/dp/B000000001?tag=example-20';
  assert.equal(getMerchantLinks(product(url), true)[0]?.href, url);
});

test('each Amazon marketplace uses its own domain', () => {
  const links = getMerchantLinks(product('https://amazon.com/dp/B000000001', 'https://amazon.ca/dp/B000000001'), true);
  assert.ok(links.every((link) => link.href === null));
});

test('Amazon short links are supported for both marketplaces', () => {
  assert.ok(getMerchantLinks(product('https://amzn.to/example', 'https://amzn.to/example'), true).every((link) => link.href));
});

test('unsafe protocols, credentials and lookalike Amazon hosts are rejected', () => {
  for (const url of ['http://amazon.ca/a', 'javascript:alert(1)', 'https://amazon.ca.evil.example/a', 'https://evilamazon.ca/a', 'https://amazon.ca@evil.example/a', 'https://user:password@amazon.ca/a', 'not a URL']) {
    assert.equal(getMerchantLinks(product(url), true)[0]?.href, null, url);
  }
});

test('null links stay pending and partner links require credential-free HTTPS', () => {
  assert.ok(getMerchantLinks(product(null), true).every((link) => link.href === null));
  assert.equal(getMerchantLinks(product(null, null, 'http://example.com'), true)[2]?.href, null);
  assert.equal(getMerchantLinks(product(null, null, 'https://user@example.com'), true)[2]?.href, null);
  assert.equal(getMerchantLinks(product(null, null, 'https://example.com'), true)[2]?.href, 'https://example.com');
});

test('affiliate relations disclose sponsorship and isolate the new tab', () => {
  for (const rel of ['sponsored', 'nofollow', 'noopener']) assert.ok(AFFILIATE_REL.split(' ').includes(rel));
});
