import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { productSchema } from '../src/lib/product-schema';
import { getMerchantLinks, canadianAffiliateIssues } from '../src/lib/affiliate';
import { isPubliclyVisible, isCommerciallyApproved } from '../src/lib/release-policy';
import { productStructuredData } from '../src/lib/product-seo';
import { categoryUniverse } from '../src/config/taxonomy';
import { WHITEOUT_PRODUCT_IDS } from '../scripts/whiteout-products-preservation.mjs';
import type { Product } from '../src/lib/products';
const read = (file: string) => JSON.parse(readFileSync(file, 'utf8'));
const load = (id: string) => ({ id, data: productSchema.parse(read(`src/data/products/${id}.json`)) }) as Product;

test('five WHITEOUT products have unique Canadian destinations and live product-page evidence', () => {
  const asins = ['B00RXX8RCA', 'B096M49HRL', 'B08BDLV9BY', 'B0GQLMDT26', 'B001E5CRW4'];
  for (const [i, id] of WHITEOUT_PRODUCT_IDS.entries()) {
    const p = load(id), r = p.data.research!;
    assert.equal(p.data.links.amazonCa.asin, asins[i]);
    assert.equal(categoryUniverse(p.data.category), 'whiteout');
    assert.equal(isPubliclyVisible(p), true);
    assert.equal(r.purchaseDestination!.method, 'live-page');
    assert.equal(r.purchaseDestination!.scope, 'product-page');
    assert.equal(r.listingVerified, false, 'No exact selected-variant authentication is implied');
    assert.equal(r.publicationApproved, false); assert.equal(p.data.testing, 'not-tested');
    assert.equal(isCommerciallyApproved(p), false);
    assert.equal(productStructuredData(p, new URL('https://apocalypsegearlab.github.io')), undefined);
    assert.deepEqual(canadianAffiliateIssues(p), []);
    assert.equal(getMerchantLinks(p)[0]!.href, `https://www.amazon.ca/dp/${asins[i]}?tag=apocalypsegear-20`);
    const matches = readdirSync('src/data/products').filter(f => read(`src/data/products/${f}`).links?.amazonCa?.asin === asins[i]);
    assert.deepEqual(matches, [id + '.json']);
    for (const field of ['price', 'rating', 'aggregateRating', 'stock', 'temperature']) assert.equal(Object.hasOwn(p.data, field), false);
  }
});

test('new destinations retain evidence, safety, explicit hold and account gates', () => {
  for (const id of WHITEOUT_PRODUCT_IDS) {
    const p = load(id);
    for (const fault of ['hold', 'safety', 'asin', 'tag', 'source', 'destination'] as const) {
      const broken = structuredClone(p), r = broken.data.research!;
      if (fault === 'hold') r.affiliateReview!.decision = 'hold';
      if (fault === 'safety') r.safetyStatus = 'blocked';
      if (fault === 'asin') r.purchaseDestination!.asin = 'B000000001';
      if (fault === 'tag') broken.data.links.amazonCa.url = broken.data.links.amazonCa.url!.replace('apocalypsegear-20', 'wrong-20');
      if (fault === 'source') r.purchaseDestination!.sourceIds = ['amazon-live-page'];
      if (fault === 'destination') delete r.purchaseDestination;
      // The legacy review alone must also be removed in the missing-evidence case.
      if (fault === 'destination') delete r.affiliateReview;
      assert.equal(getMerchantLinks(broken)[0]!.href, null, `${id}: ${fault}`);
    }
    assert.equal(getMerchantLinks(p, false)[0]!.href, null);
  }
});

test('MICROspikes inclusion warning appears in card, profile and image caveat', () => {
  const p = load('kahtoola-microspikes');
  const copy = read('src/data/whiteout-card-copy.json')['kahtoola-microspikes'];
  const asset = read('src/data/media/whiteout-products-manifest.json').assets.find((a: {productId: string}) => a.productId === p.id);
  for (const text of [copy.caution, p.data.research!.safetyNotes[0], asset.captionNote]) assert.match(text, /boots.*not included/i);
});
