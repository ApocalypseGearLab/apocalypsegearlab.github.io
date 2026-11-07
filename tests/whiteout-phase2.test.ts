import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { productSchema } from '../src/lib/product-schema';
import { getMerchantLinks, canadianAffiliateIssues } from '../src/lib/affiliate';
import { auditCanadianCatalogue } from '../src/lib/affiliate-audit';
import { productStructuredData } from '../src/lib/product-seo';
import { isPubliclyVisible, isCommerciallyApproved } from '../src/lib/release-policy';
import { categoryUniverse } from '../src/config/taxonomy';
import { beforeWhiteoutPhase2, WHITEOUT_PHASE2_IDS } from '../scripts/whiteout-phase2-preservation.mjs';
import type { Product } from '../src/lib/products';
const read = (file: string) => JSON.parse(readFileSync(file, 'utf8'));
const hash = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');
const load = (id: string) => ({ id, data: productSchema.parse(read(`src/data/products/${id}.json`)) }) as Product;
const xId = 'therm-a-rest-neoair-xtherm-nxt-review';
test('the additive WHITEOUT dictionary preserves every pre-existing French translation', () => {
  const existing = Object.assign({}, ...['a', 'b', 'c', 'extra', 'fixtures'].map(part => read(`src/i18n/fr-${part}.json`)));
  for (const [english, french] of Object.entries(read('src/i18n/fr-whiteout.json'))) {
    if (existing[english]) assert.equal(french, existing[english], english);
  }
});
test('Phase 2 adds exactly five products and preserves every original protected byte outside reviewed hunks', () => {
  assert.equal(hash(readFileSync('docs/qa/whiteout-phase2/before.json')), '24b97dbac6c2a31cb8718b2be2ad4b6a4d70361864aa71669483a260e8d1a096');
  assert.equal(hash(readFileSync('docs/qa/whiteout-phase2/source-changes.json')), '528ffee18636982a823fd0d3a26cf8f8f049de820ae2620b17b6c2beb875d881');
  const before = read('docs/qa/whiteout-phase2/before.json');
  assert.equal(before.baseCommit, '658bbef6c748f4a2ece7555458275e246d9ef600');
  const oldIds = before.files.filter((r: {file:string}) => r.file.startsWith('src/data/products/')).map((r:{file:string}) => r.file.split('/').at(-1));
  assert.deepEqual(readdirSync('src/data/products').filter(file => !oldIds.includes(file)).sort(), WHITEOUT_PHASE2_IDS.map(id => id + '.json').sort());
  for (const row of before.files) assert.equal(hash(beforeWhiteoutPhase2(row.file, readFileSync(row.file))), row.sha256, row.file);
  for (const file of ['src/config/taxonomy.ts', `src/data/products/${xId}.json`]) {
    const bytes = readFileSync(file);
    assert.notEqual(hash(beforeWhiteoutPhase2(file, Buffer.concat([bytes, Buffer.from('\nUNRELATED EDIT')]))), hash(beforeWhiteoutPhase2(file, bytes)));
  }
});
test('six WHITEOUT profiles preserve identity and SEO while six documented destinations activate with retained safety restrictions', () => {
  const asins = ['B0B67C7N9M', 'B00F1F08TM', 'B012Y896ZA', 'B002VGHX1A', 'B0DK9VRQF2', 'B0CS54SN91'];
  [...WHITEOUT_PHASE2_IDS, xId].forEach((id, index) => {
    const p = load(id);
    assert.equal(categoryUniverse(p.data.category), 'whiteout'); assert.equal(isPubliclyVisible(p), true);
    assert.equal(p.data.links.amazonCa.url, `https://www.amazon.ca/dp/${asins[index]}?tag=apocalypsegear-20`);
    assert.equal(p.data.links.amazonCa.asin, asins[index]); assert.equal(p.data.testing, 'not-tested');
    assert.equal(p.data.research?.listingVerified, false); assert.equal(p.data.research?.listingEvidence, undefined);
    assert.equal(p.data.research?.affiliateReview?.decision, 'link-permitted'); assert.equal(p.data.research?.publicationApproved, false);
    assert.equal(isCommerciallyApproved(p), false); assert.equal(getMerchantLinks(p)[0]?.href, p.data.links.amazonCa.url);
    assert.deepEqual(canadianAffiliateIssues(p), []);
    assert.equal(productStructuredData(p, new URL('https://apocalypsegearlab.github.io')), undefined);
  });
});
test('variant discrepancies, manufacturer-backed Regular Wide data and cold-weather warnings are retained', () => {
  const x = load(xId).data;
  assert.equal(x.modelNumber, '14016'); assert.ok(x.specs.some(s => s.value.includes('540 g')));
  assert.ok(x.specs.some(s => s.value.includes('183 × 64 × 7.6 cm')));
  assert.ok(x.specs.some(s => s.value.includes('Pump sack, stuff sack')));
  assert.ok(x.research?.safetyNotes.some(s => s.includes('−20 °C')));
  assert.ok(x.research?.unverifiedClaims.some(s => s.includes('653 kg')));
  assert.ok(!x.specs.some(s => s.value.includes('653')));
  assert.equal(x.image?.src, '/images/whiteout/therm-a-rest-neoair-xtherm-nxt-whiteout.webp');
  assert.ok(load(WHITEOUT_PHASE2_IDS[2]!).data.specs.some(s => s.value.includes('13%')));
  assert.ok(load(WHITEOUT_PHASE2_IDS[3]!).data.research!.safetyNotes.some(s => s.includes('not waterproof')));
});

test('XTherm retailer permission retains the explicit cold limit without granting safety or publication approval', () => {
  const p = load(xId), r = p.data.research!;
  assert.equal(r.purchaseDestination!.scope, 'product-page');
  assert.equal(r.purchaseDestination!.method, 'owner-document');
  assert.match(r.purchaseDestination!.selectionNote, /Do not use below −20 °C/);
  assert.ok(r.safetyNotes.includes(r.purchaseDestination!.selectionNote.split(' The owner confirms')[0]!));
  assert.match(r.purchaseDestination!.selectionNote, /including at or above −20 °C/);
  assert.equal(r.safetyStatus, 'pending');
  assert.equal(r.publicationApproved, false);
  assert.match(r.publicationBlockers.join(' '), /Written Therm-a-Rest guidance.*14016/);
  assert.equal(r.listingVerified, false);
  assert.equal(p.data.lastVerified, null);
  assert.equal(getMerchantLinks(p)[0]!.href, 'https://www.amazon.ca/dp/B0CS54SN91?tag=apocalypsegear-20');
  for (const field of ['affiliateReview', 'purchaseDestination'] as const) {
    const held = structuredClone(p);
    if (field === 'affiliateReview') held.data.research!.affiliateReview!.decision = 'hold';
    else held.data.research!.purchaseDestination!.safetyDecision = 'hold';
    assert.equal(getMerchantLinks(held)[0]!.href, null, 'An explicit hold must still disable the link');
  }
});

test('each WHITEOUT destination can activate after a documented review without publishing the profile', () => {
  for (const id of [...WHITEOUT_PHASE2_IDS, xId]) {
    const original = load(id);
    const candidate = structuredClone(original);
    // In-memory eligibility simulation only: this does not authenticate the real
    // offer, change its colour/size, clear its safety review or save any approval.
    candidate.data.research!.affiliateReview = {
      ...candidate.data.research!.affiliateReview!, decision: 'link-permitted',
      reason: 'SYNTHETIC regression approval only; not evidence for the real offer.',
    };
    candidate.data.research!.purchaseDestination!.safetyDecision = 'link-permitted';
    candidate.data.research!.listingEvidence = {
      url: `https://www.amazon.ca/dp/${candidate.data.links.amazonCa.asin}`,
      checkedAt: '2026-11-06', method: 'owner-document',
      matchedAsin: candidate.data.links.amazonCa.asin!,
      matchedModel: candidate.data.modelNumber!,
      notes: 'SYNTHETIC matching evidence only; never written to production data.',
    };
    assert.equal(productSchema.safeParse(candidate.data).success, true, id);
    assert.deepEqual(canadianAffiliateIssues(candidate), [], id);
    assert.equal(getMerchantLinks(candidate, true)[0]!.href, original.data.links.amazonCa.url, id);
    assert.equal(getMerchantLinks(candidate, false)[0]!.href, null, id);
    assert.equal(candidate.data.reviewStatus, 'draft');
    assert.equal(candidate.data.research!.publicationApproved, false);
    assert.equal(isCommerciallyApproved(candidate), false);
    assert.equal(productStructuredData(candidate, new URL('https://apocalypsegearlab.github.io')), undefined);
    assert.equal(getMerchantLinks(load(id), true)[0]!.href, getMerchantLinks(original, true)[0]!.href, 'A simulation must never change the real decision');
  }
});

test('WHITEOUT permission cannot override mismatched evidence, a retained hold, blocked safety or the affiliate tag', () => {
  for (const id of [...WHITEOUT_PHASE2_IDS, xId]) {
    const original = load(id);
    for (const fault of ['hold', 'safety', 'review-asin', 'evidence-model', 'evidence-asin', 'tag'] as const) {
      const candidate = structuredClone(original);
      candidate.data.research!.affiliateReview!.decision = 'link-permitted';
      candidate.data.research!.listingEvidence = {
        url: `https://www.amazon.ca/dp/${candidate.data.links.amazonCa.asin}`,
        checkedAt: '2026-11-06', method: 'owner-document',
        matchedAsin: candidate.data.links.amazonCa.asin!, matchedModel: candidate.data.modelNumber!,
        notes: 'SYNTHETIC conflicting test evidence; not a real verification.',
      };
      if (fault === 'hold') candidate.data.research!.affiliateReview!.decision = 'hold';
      if (fault === 'safety') candidate.data.research!.safetyStatus = 'blocked';
      if (fault === 'review-asin') candidate.data.research!.affiliateReview!.asin = 'B000000001';
      if (fault === 'evidence-model') candidate.data.research!.listingEvidence!.matchedModel = 'Wrong variant';
      if (fault === 'evidence-asin') candidate.data.research!.listingEvidence!.matchedAsin = 'B000000001';
      if (fault === 'tag') candidate.data.links.amazonCa.url = candidate.data.links.amazonCa.url!.replace('apocalypsegear-20', 'wrong-20');
      assert.ok(canadianAffiliateIssues(candidate).length, `${id}: ${fault}`);
      assert.equal(getMerchantLinks(candidate, true)[0]!.href, null, `${id}: ${fault}`);
    }
  }
});

test('future eligible products activate automatically from scoped evidence without an affiliate whitelist or publication approval', () => {
  const future = structuredClone(load(WHITEOUT_PHASE2_IDS[0]!));
  future.id = 'future-eligible-product';
  future.data.name = 'Future synthetic product';
  future.data.links.amazonCa = {asin:'B000000001',url:'https://www.amazon.ca/dp/B000000001?tag=apocalypsegear-20'};
  const destination = future.data.research!.purchaseDestination!;
  Object.assign(destination,{asin:'B000000001',url:'https://www.amazon.ca/dp/B000000001',matchedProduct:future.data.name});
  future.data.sources.find(s=>s.kind==='retailer')!.url=destination.url;
  delete future.data.research!.affiliateReview;
  assert.equal(productSchema.safeParse(future.data).success,true);
  assert.deepEqual(canadianAffiliateIssues(future),[]);
  assert.equal(getMerchantLinks(future)[0]!.href,future.data.links.amazonCa.url);
  assert.equal(getMerchantLinks(future)[0]!.destinationScope,'product-page');
  assert.equal(future.data.research!.listingVerified,false);
  assert.equal(isCommerciallyApproved(future),false);
  assert.equal(productStructuredData(future,new URL('https://apocalypsegearlab.github.io')),undefined);
  for(const fault of ['missing-evidence','wrong-product','wrong-source-url','missing-manufacturer','wrong-asin','safety','link-safety','explicit-hold','wrong-tag','exact-without-model','internal','mandatory-hold'] as const){
    const p=structuredClone(future), d=p.data.research!.purchaseDestination!;
    if(fault==='missing-evidence')p.data.research!.purchaseDestination=undefined;
    if(fault==='wrong-product')d.matchedProduct='Different product';
    if(fault==='wrong-source-url')p.data.sources.find(s=>s.kind==='retailer')!.url='https://www.amazon.ca/dp/B000000002';
    if(fault==='missing-manufacturer')d.sourceIds=['owner-amazon-screenshot'];
    if(fault==='wrong-asin')d.asin='B000000002';
    if(fault==='safety')p.data.research!.safetyStatus='blocked';
    if(fault==='link-safety')d.safetyDecision='hold';
    if(fault==='explicit-hold')p.data.research!.affiliateReview={decision:'hold',asin:'B000000001',checkedAt:'2026-11-06',sourceIds:d.sourceIds,reason:'Synthetic retained hold'};
    if(fault==='wrong-tag')p.data.links.amazonCa.url=p.data.links.amazonCa.url!.replace('apocalypsegear-20','wrong-20');
    if(fault==='exact-without-model')d.scope='exact-variant';
    if(fault==='internal')p.data.visibility='internal';
    if(fault==='mandatory-hold')p.id='kidde-c3010-co-alarm';
    assert.equal(getMerchantLinks(p)[0]!.href,null,fault);
    assert.ok(canadianAffiliateIssues(p).length,fault);
    if(fault==='link-safety')assert.equal(auditCanadianCatalogue([p]).undocumentedBlocks,0,'A scoped safety hold is documented even without a legacy review');
  }
  assert.equal(getMerchantLinks(future,false)[0]!.href,null,'Account-level disabling still applies');
});
