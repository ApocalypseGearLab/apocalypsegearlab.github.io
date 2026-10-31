import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {productSchema} from '../src/lib/product-schema';
import {getMerchantLinks,canadianAffiliateIssues} from '../src/lib/affiliate';
import {isCommerciallyApproved} from '../src/lib/release-policy';
import {productStructuredData} from '../src/lib/product-seo';
import {importedMedia,importedArtwork,canPublishImportedAsset} from '../src/lib/imported-media';
import {PHASE53} from './catalogue-fixture';
import type {Product} from '../src/lib/products';
const read=(file:string)=>JSON.parse(readFileSync(file,'utf8'));
const hash=(b:string|Buffer)=>createHash('sha256').update(b).digest('hex');

test('Phase 5.3 preserves all 34 earlier products, artwork, release/Google/SEO policy and shared conversion renderers',()=>{
 const baseline=read('docs/qa/phase5-3/preservation.json');
 assert.equal(baseline.baseCommit,'1137975d895aa5ce34b3a5a78abd91f6da08f74d');assert.equal(baseline.capturedBeforeImplementation,true);
 assert.deepEqual(baseline.allowedIntegrationFiles,['src/data/media/imported-manifest.json','src/components/UniverseHub.astro']);
 for(const row of baseline.files){if(row.file===`src/pages/images/blackout/[file].webp.ts`)continue; // Phase 5.3 responsive route; production validation checks every old and new variant byte.
const b=readFileSync(row.file);assert.equal(hash(row.normaliseNewlines?b.toString('utf8').replace(/\r\n/g,'\n'):b),row.sha256,row.file);}
 assert.deepEqual(importedMedia.slice(0,34),baseline.previousAssets);
 assert.equal(importedMedia.length,36);assert.equal(importedMedia.filter(canPublishImportedAsset).length,35);
});

for(const [id,[asin,category]]of Object.entries(PHASE53))test(`${id} permits only its documented recorded link, preserving independent SEO and safety controls`,()=>{
 const p={id,data:productSchema.parse(read(`src/data/products/${id}.json`))}as Product;
 const r=p.data.research!,e=r.listingEvidence!;
 assert.equal(p.data.category,category);assert.equal(p.data.links.amazonCa.asin,asin);
 assert.equal(e.matchedAsin,asin);assert.equal(e.matchedModel,p.data.modelNumber);assert.equal(e.method,'owner-document');
 assert.match(e.notes,/No original Amazon capture|no original Amazon capture/);
 assert.equal(r.affiliateReview!.decision,'link-permitted');assert.equal(r.listingVerified,false);
 assert.equal(getMerchantLinks(p)[0]!.href,`https://www.amazon.ca/dp/${asin}?tag=apocalypsegear-20`);assert.deepEqual(canadianAffiliateIssues(p),[]);
 assert.equal(p.data.reviewStatus,'draft');assert.equal(p.data.visibility,'informational');assert.equal(p.data.testing,'not-tested');
 assert.equal(r.safetyStatus,'pending');assert.equal(r.publicationApproved,false);assert.equal(p.data.lastVerified,null);
 assert.equal(isCommerciallyApproved(p),false);assert.equal(productStructuredData(p,new URL('https://apocalypsegearlab.github.io')),undefined);
 assert.equal(productSchema.safeParse({...p.data,reviewStatus:'published'}).success,false);
 for(const mutation of ['hold','wrong-asin','wrong-model','wrong-tag','blocked','linking-off']){
  const copy=structuredClone(p);
  if(mutation==='hold')copy.data.research!.affiliateReview!.decision='hold';
  if(mutation==='wrong-asin')copy.data.research!.listingEvidence!.matchedAsin='B000000001';
  if(mutation==='wrong-model')copy.data.research!.listingEvidence!.matchedModel='Other station';
  if(mutation==='wrong-tag')copy.data.links.amazonCa.url=`https://www.amazon.ca/dp/${asin}?tag=other-20`;
  if(mutation==='blocked')copy.data.research!.safetyStatus='blocked';
  assert.equal(getMerchantLinks(copy,mutation!=='linking-off')[0]!.href,null,mutation);
 }
 const asset=importedArtwork(id)!;assert.ok(canPublishImportedAsset(asset));
 assert.deepEqual(asset.variants!.map(v=>v.width),[480,960,1254]);assert.equal(asset.encoding!.crop,false);assert.equal(asset.encoding!.recolor,false);
 assert.ok(asset.source?.file);assert.equal(hash(readFileSync(asset.source.file)),asset.source.sha256);assert.ok(asset.provenance);assert.match(asset.provenance.scope,/not independent/);
 for(const v of asset.variants!)assert.equal(hash(readFileSync(v.file)),v.sha256);
});

test('BLUETTI advertised title and manufacturer bundle never establish exact retailer panel/cables; DELTA 2 does not acquire a solar panel',()=>{
 const b=read('src/data/products/bluetti-elite-100-v2-solar-generator-kit.json');
 assert.match(b.research.listingEvidence.notes,/title is from an Amazon.ca result/);
 assert.match(b.summary,/Confirm the panel model and connecting cables/);
 assert.match(b.research.unverifiedClaims.join(' '),/not independently verified package contents/);
 assert.match(b.specs.find((s:any)=>s.label.startsWith('USB')).value,/140 W.*100 W/);
 const d=read('src/data/products/ecoflow-delta-2-portable-power-station.json');
 assert.match(d.summary,/Solar panels and extra batteries are not established/);
 assert.match(d.editorial.purchaseChecks.join(' '),/not DELTA 2 Max/);
});
