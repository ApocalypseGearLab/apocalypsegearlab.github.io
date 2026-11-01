import { PHASE6_INTEGRATION_FILES } from './phase6-fixture';
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {PHASE55,PHASE55_INTEGRATION_FILES} from './phase55-fixture';
import {productSchema} from '../src/lib/product-schema';
import {getMerchantLinks,canadianAffiliateIssues} from '../src/lib/affiliate';
import {productVerification} from '../src/lib/product-verification';
import {isCommerciallyApproved} from '../src/lib/release-policy';
import {productStructuredData} from '../src/lib/product-seo';
import {importedMedia,importedArtwork,canPublishImportedAsset} from '../src/lib/imported-media';
import type {Product} from '../src/lib/products';
const read=(file:string)=>JSON.parse(readFileSync(file,'utf8'));
const hash=(value:string|Buffer)=>createHash('sha256').update(value).digest('hex');

test('Phase 5.5 preserves all 38 existing product records, media bytes, affiliate/GA4/SEO policy and home',()=>{
 const before=read('docs/qa/phase5-5/before.json');assert.equal(before.baseCommit,'996b1d3bd574933e3ce7a384cb4bba7ee45c9ce5');assert.equal(before.capturedBeforeImplementation,true);
 for(const row of before.files){if(PHASE6_INTEGRATION_FILES.has(row.file))continue;if(PHASE55_INTEGRATION_FILES.has(row.file))continue;const bytes=readFileSync(row.file);assert.equal(hash(row.normaliseNewlines?bytes.toString('utf8').replace(/\r\n/g,'\n'):bytes),row.sha256,row.file);}
 assert.equal(before.previousAssets.length,38);assert.deepEqual(importedMedia.slice(0,38),before.previousAssets);assert.equal(importedMedia.length,41);
});

for(const [id,[asin,category]]of Object.entries(PHASE55))test(`${id} uses its recorded Canadian link without inventing manufacturer, listing or publication approval`,()=>{
 const raw=read(`src/data/products/${id}.json`),p={id,data:productSchema.parse(raw)}as Product,r=p.data.research!;
 assert.equal(p.data.category,category);assert.equal(p.data.outboundPolicy,'amazon-only');assert.equal(p.data.links.amazonCa.asin,asin);assert.equal(p.data.links.amazonCa.url,`https://www.amazon.ca/dp/${asin}?tag=apocalypsegear-20`);
 assert.equal(r.listingEvidence!.method,'owner-document');assert.equal(r.listingEvidence!.matchedModel,p.data.modelNumber??p.data.name);assert.equal(r.listingVerified,false);assert.match(r.listingEvidence!.notes,/neither separate reference capture was attached/);
 assert.deepEqual(canadianAffiliateIssues(p),[]);assert.equal(getMerchantLinks(p)[0]!.href,p.data.links.amazonCa.url);assert.equal(getMerchantLinks(p,false)[0]!.href,null);
 assert.equal(p.data.reviewStatus,'draft');assert.equal(p.data.visibility,'informational');assert.equal(p.data.testing,'not-tested');assert.equal(p.data.lastVerified,null);assert.equal(r.safetyStatus,'pending');assert.equal(r.publicationApproved,false);
 assert.equal(isCommerciallyApproved(p),false);assert.equal(productStructuredData(p,new URL('https://apocalypsegearlab.github.io')),undefined);assert.equal(productSchema.safeParse({...raw,reviewStatus:'published'}).success,false);
 for(const mutation of ['hold','wrong-model','blocked']as const){const copy=structuredClone(p);if(mutation==='hold')copy.data.research!.affiliateReview!.decision='hold';if(mutation==='wrong-model')copy.data.research!.listingEvidence!.matchedModel='Other';if(mutation==='blocked')copy.data.research!.safetyStatus='blocked';assert.equal(getMerchantLinks(copy)[0]!.href,null);}
 const asset=importedArtwork(id)!;assert.equal(canPublishImportedAsset(asset),true);assert.ok(asset.source?.file);assert.equal(hash(readFileSync(asset.source.file)),asset.source.sha256);assert.deepEqual(asset.variants!.map(v=>v.width),[480,960,1254]);
 for(const v of asset.variants!){assert.equal(hash(readFileSync(v.file)),v.sha256);assert.ok(v.bytes<250_000);}assert.equal(asset.encoding!.crop,false);assert.equal(asset.encoding!.recolor,false);assert.ok('captionNote'in asset&&asset.captionNote);
});

test('ORIA owner-reported features cannot acquire verified-manufacturer status or bypass editorial release',()=>{
 const id=Object.keys(PHASE55)[0]!,raw=read(`src/data/products/${id}.json`),p={id,data:productSchema.parse(raw)}as Product;
 assert.equal(p.data.modelNumber,null);assert.equal(p.data.specsStatus,'owner-reported');assert.equal(productVerification(p).modelDocumented,false);assert.equal(productVerification(p).evidenceLabel,'Documentation incomplete');
 assert.ok(p.data.specs.every(s=>s.value.startsWith('Owner-reported:')));assert.equal(p.data.sources.some(s=>s.kind==='manufacturer'),false);
 assert.equal(productSchema.safeParse({...raw,specsStatus:'manufacturer-documented'}).success,false);
 const forged=structuredClone(raw);Object.assign(forged.research,{listingVerified:true,safetyStatus:'cleared',publicationApproved:true,publicationBlockers:[]});forged.reviewStatus='published';assert.equal(productSchema.safeParse(forged).success,false);
 assert.match(p.data.research!.safetyNotes.join(' '),/1.2 V NiMH compatibility/);assert.deepEqual(p.data.relatedProducts,['bougerv-53-quart-portable-refrigerator-freezer','bougerv-rocky-v3-55qt-dual-zone-portable-car-cooler']);
});

test('Panasonic kits retain four-cell quantities, separate AA/AAA identities and conditional capacity/charge/cycle conventions',()=>{
 for(const [id,[asin]]of Object.entries(PHASE55).slice(1)){
  const p=productSchema.parse(read(`src/data/products/${id}.json`));assert.equal(p.specsStatus,'manufacturer-documented');assert.equal(p.sources.some(s=>s.kind==='manufacturer'),true);assert.equal(productVerification({id,data:p}as Product).modelDocumented,true);
  assert.match(p.specs.find(s=>s.label==='Kit')!.value,/Four standard white.*one BQ-CC17/);assert.match(p.specs.find(s=>s.label==='Cycles')!.value,/2100.*2011.*600.*2017/);assert.match(p.specs.find(s=>s.label==='AC input')!.value,/Not a USB or solar/);
  const a=importedArtwork(id)!;assert.ok('captionNote'in a);assert.match(a.captionNote,/four.*cells and one charger; extra cells are illustrative/);assert.equal(p.links.amazonCa.asin,asin);
  if(id.includes('-aaa-')){assert.equal(p.modelNumber,'K-KJ17M3A4BA');assert.match(p.specs.find(s=>s.label==='Capacity')!.value,/800.*750.*850.*not confirmed/);assert.match(a.captionNote,/850 mAh artwork label is unverified/);assert.match(p.description,/duplicate charger/);}else assert.equal(p.modelNumber,'K-KJ17MCA4BA');
 }
});
