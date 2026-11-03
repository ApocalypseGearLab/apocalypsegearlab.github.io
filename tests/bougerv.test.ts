import {beforeFourUniverses} from '../scripts/four-universes-preservation.mjs';
import { PHASE6_INTEGRATION_FILES } from './phase6-fixture';
import {PHASE55_INTEGRATION_FILES} from './phase55-fixture';
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {productSchema} from '../src/lib/product-schema';
import {getMerchantLinks,canadianAffiliateIssues} from '../src/lib/affiliate';
import {isCommerciallyApproved} from '../src/lib/release-policy';
import {productStructuredData} from '../src/lib/product-seo';
import {importedMedia,importedArtwork,canPublishImportedAsset} from '../src/lib/imported-media';
import {categoryUniverse,CATEGORIES} from '../src/config/taxonomy';
import {BOUGERV,BOUGERV_INTEGRATION_FILES} from './bougerv-fixture';
import type {Product} from '../src/lib/products';
const read=(file:string)=>JSON.parse(readFileSync(file,'utf8'));
const hash=(value:string|Buffer)=>createHash('sha256').update(value).digest('hex');

test('BougeRV additions preserve all 36 existing JSON records, prior media, account, release/SEO rules, GA4 and home',()=>{
 const before=read('docs/qa/bougerv/before.json');assert.equal(before.baseCommit,'ee3ec72652713f2d89d647c1a83be1b570aaceda');assert.equal(before.capturedBeforeImplementation,true);
 for(const row of before.files){if(PHASE6_INTEGRATION_FILES.has(row.file))continue;if(PHASE55_INTEGRATION_FILES.has(row.file))continue;
  if(BOUGERV_INTEGRATION_FILES.has(row.file))continue;
  const b=beforeFourUniverses(row.file,readFileSync(row.file));assert.equal(hash(row.normaliseNewlines?b.toString('utf8').replace(/\r\n/g,'\n'):b),row.sha256,row.file);
 }
 assert.equal(before.previousAssets.length,36);assert.deepEqual(importedMedia.slice(0,36),before.previousAssets);
 assert.equal(importedMedia.length,47);assert.equal(importedMedia.filter(canPublishImportedAsset).length,46);
 assert.equal(CATEGORIES.find(c=>c.id==='portable-refrigeration')!.id,'portable-refrigeration');assert.equal(categoryUniverse('portable-refrigeration'),'blackout');
});

for(const [id,[asin]]of Object.entries(BOUGERV))test(`${id} has only recorded Canadian linking permission with full editorial and safety safeguards`,()=>{
 const raw=read(`src/data/products/${id}.json`),p={id,data:productSchema.parse(raw)}as Product,r=p.data.research!;
 assert.equal(p.data.category,'portable-refrigeration');assert.equal(p.data.outboundPolicy,'amazon-only');
 assert.equal(p.data.links.amazonCa.asin,asin);assert.equal(p.data.links.amazonCa.url,`https://www.amazon.ca/dp/${asin}?tag=apocalypsegear-20`);
 assert.equal(r.listingEvidence!.method,'owner-document');assert.equal(r.listingEvidence!.matchedModel,p.data.modelNumber);assert.equal(r.listingEvidence!.matchedAsin,asin);
 assert.match(r.listingEvidence!.notes,/not an attached Amazon listing capture/);assert.match(r.listingEvidence!.notes,/could not be independently recorded/);
 assert.equal(r.listingVerified,false);assert.equal(r.safetyStatus,'pending');assert.equal(r.publicationApproved,false);assert.equal(p.data.testing,'not-tested');assert.equal(p.data.reviewStatus,'draft');assert.equal(p.data.visibility,'informational');
 assert.equal(isCommerciallyApproved(p),false);assert.equal(productStructuredData(p,new URL('https://apocalypsegearlab.github.io')),undefined);assert.equal(productSchema.safeParse({...raw,reviewStatus:'published'}).success,false);
 assert.deepEqual(canadianAffiliateIssues(p),[]);assert.equal(getMerchantLinks(p)[0]!.href,p.data.links.amazonCa.url);assert.equal(getMerchantLinks(p,false)[0]!.href,null);
 for(const change of ['hold','wrong-model','blocked']as const){const copy=structuredClone(p);if(change==='hold')copy.data.research!.affiliateReview!.decision='hold';if(change==='wrong-model')copy.data.research!.listingEvidence!.matchedModel='Different fridge';if(change==='blocked')copy.data.research!.safetyStatus='blocked';assert.equal(getMerchantLinks(copy)[0]!.href,null);}
 const bad=structuredClone(raw);bad.specs[0].source=bad.sources.find((s:any)=>s.kind==='retailer').url;assert.equal(productSchema.safeParse(bad).success,false,'Amazon-only presentation does not relax technical evidence requirements');
 assert.equal(p.data.sources.some(s=>s.kind==='manufacturer'),true);assert.equal(p.data.specs.every(spec=>p.data.sources.some(s=>s.kind==='manufacturer'&&s.url===spec.source)),true);
 const asset=importedArtwork(id)!;assert.equal(canPublishImportedAsset(asset),true);assert.ok(asset.source?.file);assert.equal(asset.source.file.endsWith('.png'),true);assert.equal(hash(readFileSync(asset.source.file)),asset.source.sha256);
 assert.deepEqual(asset.variants!.map(v=>v.width),[480,960,1254]);assert.equal(asset.encoding!.crop,false);assert.equal(asset.encoding!.recolor,false);
 for(const variant of asset.variants!){assert.equal(hash(readFileSync(variant.file)),variant.sha256);assert.ok(variant.bytes<250_000);}
 const e=read('docs/qa/bougerv/evidence.json').products.find((row:any)=>row.id===id);assert.equal(e.exactVisibleAmazonListingTitle,null);assert.equal(e.selectedAmazonVariant,null);assert.equal(e.liveAmazonInspection,false);
});

test('BougeRV reference policy defaults to visible documentary links for existing products and cannot invent a single range or included battery',()=>{
 const a=read('src/data/products/bougerv-53-quart-portable-refrigerator-freezer.json'),b=read('src/data/products/bougerv-rocky-v3-55qt-dual-zone-portable-car-cooler.json');
 assert.match(a.specs.find((s:any)=>s.label==='Setpoint').value,/50°F.*68°F/);
 assert.match(a.cons.join(' '),/disagree/);assert.match(a.specs.find((s:any)=>s.label==='Controls').value,/do not infer two independently/);
 assert.match(b.specs.find((s:any)=>s.label==='Battery').value,/inclusion are not established/);
 assert.match(b.summary,/not promised/);assert.match(b.research.safetyNotes.join(' '),/separate thermometer/);
 const old=productSchema.parse(read('src/data/products/midland-er310.json'));assert.equal(old.outboundPolicy,'documentary-references');
 const invalid={...a,outboundPolicy:'hide-anything'};assert.equal(productSchema.safeParse(invalid).success,false);
});
