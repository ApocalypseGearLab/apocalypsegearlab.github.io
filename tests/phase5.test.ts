import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {productSchema} from '../src/lib/product-schema';
import {getMerchantLinks,canadianAffiliateIssues} from '../src/lib/affiliate';
import {productStructuredData} from '../src/lib/product-seo';
import {CATEGORIES,categoryUniverse} from '../src/config/taxonomy';
import {importedMedia,importedArtwork,canPublishImportedAsset} from '../src/lib/imported-media';
import {PHASE5} from './catalogue-fixture';
import type {Product} from '../src/lib/products';

const read=(f:string)=>JSON.parse(readFileSync(f,'utf8'));
const baseline=read('docs/qa/phase5/preservation.json');
const hash=(bytes:string|Buffer)=>createHash('sha256').update(bytes).digest('hex');

test('Phase 5 preserves all existing products, policy, tracking and media while appending two categories and four mappings',()=>{
  assert.equal(baseline.baseCommit,'a090b5dbe277f34f83b209e7e140e3f409a34801');
  for(const row of baseline.files){const b=readFileSync(row.file);assert.equal(hash(row.normaliseNewlines?b.toString('utf8').replace(/\r\n/g,'\n'):b),row.sha256,row.file);}
  assert.deepEqual(importedMedia.slice(0,30),baseline.previousAssets);
  assert.equal(importedMedia.length,34);
  const categories=[...baseline.categoriesSource.matchAll(/\{ id: '([^']+)', label: '([^']+)', universe: '([^']+)' \}/g)].map((m:any)=>({id:m[1],label:m[2],universe:m[3]}));
  assert.deepEqual(CATEGORIES.slice(0,categories.length),categories);
  assert.deepEqual(CATEGORIES.slice(categories.length).map(c=>c.id),['fixed-blade-knives','hygiene-sanitation']);
});

for(const [id,[asin,category,active]]of Object.entries(PHASE5))test(`${id} preserves exact Canadian identity and its documented product-level decision`,()=>{
  const data=productSchema.parse(read(`src/data/products/${id}.json`)),p={id,data} as Product;
  assert.equal(data.links.amazonCa.asin,asin);assert.equal(data.links.amazonCa.url,`https://www.amazon.ca/dp/${asin}?tag=apocalypsegear-20`);
  assert.equal(data.category,category);assert.equal(categoryUniverse(data.category),category==='fixed-blade-knives'?'outbreak':'fallout');
  assert.equal(data.research!.affiliateReview!.decision,active?'link-permitted':'hold');
  assert.equal(data.research!.listingEvidence!.matchedAsin,asin);assert.equal(data.research!.listingEvidence!.matchedModel,data.modelNumber);
  assert.equal(data.research!.listingEvidence!.method,'owner-document');assert.match(data.research!.listingEvidence!.notes,/written Phase 5.0 product brief, not an attached Amazon screenshot/);
  assert.equal(getMerchantLinks(p)[0]!.href,active?data.links.amazonCa.url:null);
  assert.equal(getMerchantLinks(p,false)[0]!.href,null);
  if(active)assert.deepEqual(canadianAffiliateIssues(p),[]);else assert.match(getMerchantLinks(p)[0]!.unavailableReason!,/selected.*B09214DLJ6|selected Amazon package/);
  assert.equal(data.testing,'not-tested');assert.equal(data.reviewStatus,'draft');assert.equal(data.visibility,'informational');
  assert.equal(data.research!.listingVerified,false);assert.equal(data.research!.safetyStatus,'pending');assert.equal(data.research!.publicationApproved,false);assert.equal(data.lastVerified,null);
  assert.equal(productStructuredData(p,new URL('https://apocalypsegearlab.github.io')),undefined);
  assert.equal(productSchema.safeParse({...data,reviewStatus:'published'}).success,false);
  assert.ok(data.specs.length>=5&&data.pros.length>=2&&data.cons.length>=3&&data.useCases.length>=2);
  if(category==='fixed-blade-knives'){assert.match(data.research!.safetyNotes.join(' '),/self-defence carry is not automatically lawful/);assert.match(data.research!.safetyNotes.join(' '),/children/);}
  for(const change of ['hold','wrong-model','safety-blocked'] as const){const copy=structuredClone(p);if(change==='hold')copy.data.research!.affiliateReview!.decision='hold';if(change==='wrong-model')copy.data.research!.listingEvidence!.matchedModel='Different variant';if(change==='safety-blocked')copy.data.research!.safetyStatus='blocked';assert.equal(getMerchantLinks(copy)[0]!.href,null);}
});

test('four supplied originals map to unique three-size WebPs without changing old artwork or using pictures as package proof',()=>{
  const reviews=read('docs/qa/phase5/media-review.json').assets;
  assert.equal(reviews.length,4);
  for(const [id]of Object.entries(PHASE5)){
    const asset=importedArtwork(id)!,record=reviews.find((r:any)=>r.productId===id);
    assert.ok(canPublishImportedAsset(asset));assert.equal(asset.mappingCsv,'assets/media/phase5-image-manifest.csv');
    assert.equal(hash(readFileSync(record.source)),record.sourceSha256);
    assert.deepEqual(asset.variants!.map(v=>v.width),[480,960,1254]);
    assert.equal(asset.encoding!.crop,false);assert.equal(asset.encoding!.recolor,false);
    assert.match(asset.alt,/^Concept illustration/);assert.match(asset.provenance.scope,/not independent/);
    assert.ok(record.fullSizeReductionPercent>80);
  }
  assert.equal(new Set(importedMedia.map(a=>a.productId)).size,34);
  assert.equal(importedMedia.filter(canPublishImportedAsset).length,33);
});

test('Royale physical roll count and Garberg offer uncertainty remain explicit instead of becoming invented commercial facts',()=>{
  const royale=read('src/data/products/royale-velour-plush-thick-toilet-paper.json');
  assert.match(royale.summary,/12 physical rolls/);assert.match(royale.summary,/not 24 physical rolls/);
  assert.match(royale.cons.join(' '),/No cheapest-price ranking/);
  assert.match(royale.description,/does not independently establish certification/);
  const mora=read('src/data/products/morakniv-garberg-blackblade-carbon-survival-kit.json');
  assert.match(mora.research.affiliateReview.reason,/High price.*not proof of unavailability/);
  assert.match(mora.specs.at(-1).value,/confirm the selected retailer package/);
  for(const id of Object.keys(PHASE5))for(const field of ['price','stock','rating','discount','aggregateRating'])assert.equal(field in read(`src/data/products/${id}.json`),false);
});
