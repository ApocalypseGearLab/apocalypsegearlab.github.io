import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {productSchema} from '../src/lib/product-schema';
import {canadianAffiliateIssues,getMerchantLinks} from '../src/lib/affiliate';
import {isCommerciallyApproved} from '../src/lib/release-policy';
import {productStructuredData} from '../src/lib/product-seo';
import type {Product} from '../src/lib/products';

const id='morakniv-garberg-blackblade-carbon-survival-kit';
const baseline=JSON.parse(readFileSync('docs/qa/morakniv-affiliate/preservation.json','utf8'));
const current=JSON.parse(readFileSync(`src/data/products/${id}.json`,'utf8'));

test('Morakniv fix preserves other products, policy, tracking, SEO code and all original media',()=>{
  assert.equal(baseline.baseCommit,'44325ec7be0882282b2ba7df249ab8dd0ec7ecf4');
  for(const row of baseline.files){
    const bytes=readFileSync(row.file);
    const input=row.normaliseNewlines?bytes.toString('utf8').replace(/\r\n/g,'\n'):bytes;
    assert.equal(createHash('sha256').update(input).digest('hex'),row.sha256,row.file);
  }
  const allowed=new Set(['summary','sources','merchant','research']);
  for(const key of Object.keys(baseline.previousProduct))if(!allowed.has(key))assert.deepEqual(current[key],baseline.previousProduct[key],key);
  for(const key of Object.keys(baseline.previousProduct.research))if(!['identityNotes','confirmed','affiliateReview','listingEvidence'].includes(key))assert.deepEqual(current.research[key],baseline.previousProduct.research[key],key);
  assert.deepEqual(current.sources.filter((s:{id:string})=>s.id!=='owner-reference'),baseline.previousProduct.sources);
  assert.deepEqual(current.research.confirmed.slice(0,-1),baseline.previousProduct.research.confirmed);
  const previousEvidence={...baseline.previousProduct.research.listingEvidence};delete previousEvidence.notes;
  const evidence={...current.research.listingEvidence};delete evidence.notes;
  assert.deepEqual(evidence,previousEvidence);
});

test('Morakniv owner-model reference permits only the recorded Canadian link and leaves offer verification and SEO separate',()=>{
  const p={id,data:productSchema.parse(current)} as Product;
  assert.equal(p.data.links.amazonCa.asin,'B09214DLJ6');
  assert.equal(getMerchantLinks(p)[0]!.href,'https://www.amazon.ca/dp/B09214DLJ6?tag=apocalypsegear-20');
  assert.deepEqual(canadianAffiliateIssues(p),[]);
  assert.equal(getMerchantLinks(p,false)[0]!.href,null);
  assert.equal(p.data.research!.listingEvidence!.method,'owner-document');
  assert.match(p.data.research!.listingEvidence!.notes,/13915/);
  assert.match(p.data.research!.listingEvidence!.notes,/not a supplied Amazon capture/);
  assert.match(p.data.research!.listingEvidence!.notes,/do not independently establish the current Amazon.ca seller, selected variant or package contents/);
  assert.equal(p.data.research!.listingVerified,false);
  assert.equal(p.data.reviewStatus,'draft');
  assert.equal(isCommerciallyApproved(p),false);
  assert.equal(productStructuredData(p,new URL('https://apocalypsegearlab.github.io')),undefined);
  assert.match(p.data.specs.at(-1)!.label,/not verified Amazon contents/);
  assert.match(p.data.cons.join(' '),/contents.*remain unverified/);
  for(const mutation of ['hold','wrong-asin','wrong-model','wrong-tag','safety-blocked'] as const){
    const copy=structuredClone(p);
    if(mutation==='hold')copy.data.research!.affiliateReview!.decision='hold';
    if(mutation==='wrong-asin')copy.data.research!.listingEvidence!.matchedAsin='B000000001';
    if(mutation==='wrong-model')copy.data.research!.listingEvidence!.matchedModel='Garberg stainless steel';
    if(mutation==='wrong-tag')copy.data.links.amazonCa.url='https://www.amazon.ca/dp/B09214DLJ6?tag=wrong-20';
    if(mutation==='safety-blocked')copy.data.research!.safetyStatus='blocked';
    assert.equal(getMerchantLinks(copy)[0]!.href,null,mutation);
  }
});
