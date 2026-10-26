import assert from 'node:assert/strict';
import test from 'node:test';
import { AFFILIATE_REL, getMerchantLinks } from '../src/lib/affiliate';
import type { Product } from '../src/lib/products';

function product(ca: string | null, us: string | null = null, partner: string | null = null): Product {
  return { id: 'qa-approved', data: { reviewStatus: 'published', research: { listingVerified: true, publicationApproved: true, safetyStatus: 'cleared', publicationBlockers: [], listingEvidence: {url:'https://www.amazon.ca/dp/B000000001', checkedAt:'2026-10-26', method:'live-page', matchedAsin:'B000000001', matchedModel:'QA approved', notes:'Synthetic QA listing evidence, not a real listing.'} }, name:'QA approved', links: {
    amazonCa: { url: ca, asin: 'B000000001' }, amazonCom: { url: us, asin: null },
    partners: partner ? [{ name: 'Partner', url: partner }] : [],
  } } } as unknown as Product;
}

test('Amazon links remain pending before Associates enrollment', () => {
  assert.equal(getMerchantLinks(product('https://www.amazon.ca/dp/B000000001?tag=apocalypsegear-20'), false)[0]?.href, null);
});

test('verified HTTPS Amazon links keep their affiliate tags', () => {
  const url = 'https://www.amazon.ca/dp/B000000001?tag=apocalypsegear-20';
  assert.equal(getMerchantLinks(product(url), true)[0]?.href, url);
});

test('each Amazon marketplace uses its own domain', () => {
  const links = getMerchantLinks(product('https://amazon.com/dp/B000000001', 'https://amazon.ca/dp/B000000001'), true);
  assert.ok(links.every((link) => link.href === null));
});

test('Canadian short links cannot bypass exact ASIN and tracking checks', () => {
  const links=getMerchantLinks(product('https://amzn.to/example', 'https://amzn.to/example'), {ca:true,us:true});
  assert.equal(links[0]?.href,null);
  assert.ok(links[1]?.href);
});

test('Canadian enrollment alone never activates Amazon.com links', () => {
  const links=getMerchantLinks(product('https://www.amazon.ca/dp/B000000001?tag=apocalypsegear-20','https://www.amazon.com/dp/B000000001'),true);
  assert.ok(links[0]?.href);
  assert.equal(links[1]?.href,null);
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


test('commercially approved ASIN links still require the exact Canadian model path and tag', () => {
  const url = 'https://www.amazon.ca/dp/B000000001?tag=apocalypsegear-20';
  const approved = product(url);
  approved.data.links.amazonCa.asin = 'B000000001';
  assert.equal(getMerchantLinks(approved, true)[0]?.href, url);
  for (const invalid of [url.replace('B000000001','B000000002'),url.replace('apocalypsegear-20','wrong-20'),url+'&tag=wrong-20',url+'&ref=extra']) {
    const changed = structuredClone(approved); changed.data.links.amazonCa.url = invalid;
    assert.equal(getMerchantLinks(changed,true)[0]?.href,null);
  }
});


test('initial-period linking permits a verified informational draft without final account approval', () => {
  const candidate=product('https://www.amazon.ca/dp/B000000001?tag=apocalypsegear-20');
  candidate.data.reviewStatus='draft'; candidate.data.visibility='informational';
  assert.ok(getMerchantLinks(candidate)[0]?.href);
  assert.equal(getMerchantLinks(candidate,false)[0]?.href,null);
  candidate.data.research!.listingEvidence=undefined;
  assert.equal(getMerchantLinks(candidate,true)[0]?.href,null,'Tag recognition is not model verification');
});

test('a flag alone, mismatched listing evidence or missing ASIN cannot activate a Canadian link', () => {
  for (const mutation of ['missing-asin','wrong-model','wrong-asin','wrong-url','unverified'] as const) {
    const candidate=product('https://www.amazon.ca/dp/B000000001?tag=apocalypsegear-20');
    if(mutation==='missing-asin') candidate.data.links.amazonCa.asin=null;
    if(mutation==='wrong-model') candidate.data.research!.listingEvidence!.matchedModel='Different model';
    if(mutation==='wrong-asin') candidate.data.research!.listingEvidence!.matchedAsin='B000000002';
    if(mutation==='wrong-url') candidate.data.research!.listingEvidence!.url='https://www.amazon.com/dp/B000000001';
    if(mutation==='unverified') candidate.data.research!.listingVerified=false;
    assert.equal(getMerchantLinks(candidate,true)[0]?.href,null,mutation);
  }
});
