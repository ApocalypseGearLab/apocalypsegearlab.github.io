import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {productSchema} from '../src/lib/product-schema';
import {getMerchantLinks,canadianAffiliateIssues} from '../src/lib/affiliate';
import {productStructuredData} from '../src/lib/product-seo';
import type {Product} from '../src/lib/products';

const read=(f:string)=>JSON.parse(readFileSync(f,'utf8'));
const id='3m-2091-p100-particulate-filters';
const raw=read(`src/data/products/${id}.json`);
const baseline=read('docs/qa/phase4-8/preservation.json');

test('Phase 4.8 preserves every other product, all artwork, policies and 2091 technical precautions',()=>{
  assert.equal(baseline.baseCommit,'0fb4c38f91b3990e68289bb2a31675bf92b692a4');
  for(const row of baseline.files){if(['src/config/taxonomy.ts','src/components/UniverseHub.astro','src/data/media/imported-manifest.json','scripts/verify-images.mjs'].includes(row.file)) continue; // Phase 5 preservation tests cover additive integration.

    const bytes=readFileSync(row.file);
    const content=row.normaliseNewlines?bytes.toString('utf8').replace(/\r\n/g,'\n'):bytes;
    assert.equal(createHash('sha256').update(content).digest('hex'),row.sha256,row.file);
  }
  for(const key of ['name','brand','modelNumber','category','specs','pros','useCases','relatedProducts','image','links','testing','reviewStatus','visibility','lastVerified'])assert.deepEqual(raw[key],baseline.product[key],key);
  assert.deepEqual(raw.research.safetyNotes,baseline.product.research.safetyNotes);
  for(const key of ['listingVerified','safetyStatus','publicationApproved'])assert.equal(raw.research[key],baseline.product.research[key],key);
  assert.deepEqual(raw.sources.slice(0,baseline.product.sources.length),baseline.product.sources);
  assert.deepEqual(raw.research.confirmed.slice(0,baseline.product.research.confirmed.length),baseline.product.research.confirmed);
});

test('2091 owner-document resolves the pair hold without authenticating units or granting editorial approval',()=>{
  const data=productSchema.parse(raw),product={id,data} as Product;
  const evidence=read('docs/qa/phase4-8/commercial-evidence.json');
  assert.equal(evidence.captureDate,null);
  assert.equal(evidence.advertisedCount,2);assert.equal(evidence.advertisedPairs,1);
  assert.equal(evidence.reportedModel,'2091/07000');assert.equal(data.modelNumber,'2091');
  assert.equal(data.links.amazonCa.asin,'B001D1JCK4');
  assert.equal(data.links.amazonCa.url,'https://www.amazon.ca/dp/B001D1JCK4?tag=apocalypsegear-20');
  assert.equal(data.research!.affiliateReview!.decision,'link-permitted');
  assert.equal(data.research!.listingEvidence!.method,'owner-document');
  assert.equal(data.research!.listingEvidence!.matchedModel,'2091');
  assert.equal(data.research!.listingEvidence!.matchedAsin,'B001D1JCK4');
  assert.equal(data.research!.listingEvidence!.checkedAt,'2026-10-31');
  assert.match(data.research!.listingEvidence!.notes,/2091\/07000.*2 Count/);
  assert.match(data.research!.listingEvidence!.notes,/2\/Bag/);
  assert.match(data.research!.listingEvidence!.notes,/capture file was not attached/);
  assert.match(data.summary,/one pair \(two filters\)/);
  assert.match(data.summary,/no documented nuisance-level organic-vapor relief/);
  assert.doesNotMatch(data.summary+' '+data.description,/quantity remains unverified|sale-pack quantity could not/);
  assert.equal(data.research!.listingVerified,false);assert.equal(data.research!.safetyStatus,'pending');
  assert.equal(data.research!.publicationApproved,false);assert.equal(data.testing,'not-tested');
  assert.equal(data.reviewStatus,'draft');assert.equal(data.lastVerified,null);
  assert.equal(productSchema.safeParse({...data,reviewStatus:'published'}).success,false);
  assert.equal(productStructuredData(product,new URL('https://apocalypsegearlab.github.io')),undefined);
  assert.deepEqual(canadianAffiliateIssues(product),[]);
  assert.equal(getMerchantLinks(product)[0]!.href,data.links.amazonCa.url);
  assert.equal(getMerchantLinks(product,false)[0]!.href,null);
  for(const mutation of ['hold','safety-blocked','wrong-model','wrong-asin'] as const){
    const candidate=structuredClone(product);
    if(mutation==='hold')candidate.data.research!.affiliateReview!.decision='hold';
    if(mutation==='safety-blocked')candidate.data.research!.safetyStatus='blocked';
    if(mutation==='wrong-model')candidate.data.research!.listingEvidence!.matchedModel='2097';
    if(mutation==='wrong-asin')candidate.data.research!.listingEvidence!.matchedAsin='B07FMJPFTY';
    assert.equal(getMerchantLinks(candidate)[0]!.href,null,mutation);
  }
});
