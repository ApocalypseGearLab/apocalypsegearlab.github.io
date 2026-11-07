import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {PHASE7,beforePhase7Integration} from '../scripts/phase7-preservation.mjs';
import {CATEGORIES,categoryUniverse} from '../src/config/taxonomy';
import {populatedCategories} from '../src/lib/category-navigation';
import {productSchema} from '../src/lib/product-schema';
import {getMerchantLinks} from '../src/lib/affiliate';
import {isCommerciallyApproved} from '../src/lib/release-policy';
import {productStructuredData} from '../src/lib/product-seo';
import {productVerification} from '../src/lib/product-verification';
import {importedMedia,importedArtwork} from '../src/lib/imported-media';
import type {Product} from '../src/lib/products';
const read=(file:string)=>JSON.parse(readFileSync(file,'utf8'));
const hash=(bytes:Buffer)=>createHash('sha256').update(bytes).digest('hex');

test('Phase 7 preserves all 41 earlier records, every old media byte, logo, navigation and release/tracking source',()=>{
 const baseline=read('docs/qa/phase7/before.json');
 assert.equal(baseline.baseCommit,'a63234aee67e6a82937f545db75698cd253f042a');
 assert.equal(baseline.capturedBeforeImplementation,true);assert.equal(baseline.files.length,243);
 assert.equal(baseline.files.filter((r:any)=>r.file.startsWith('src/data/products/')&&!r.file.includes('template')).length,41);
 for(const row of baseline.files){
  const bytes=readFileSync(row.file);
  const canonical=row.normaliseNewlines?Buffer.from(bytes.toString('latin1').replace(/\r\n/g,'\n'),'latin1'):bytes;
  assert.equal(hash(beforePhase7Integration(row.file,canonical)),row.sha256,row.file);
 }
 assert.deepEqual(importedMedia.slice(0,41),baseline.manifest.assets);
 assert.deepEqual({...read('src/data/media/imported-manifest.json'),assets:importedMedia.slice(0,41)},baseline.manifest);
 assert.equal(importedMedia.length,52);assert.equal(CATEGORIES.length,44);
});

test('Phase 7 append projection still rejects old content changes and unrelated source edits',()=>{
 for(const file of ['src/data/media/imported-manifest.json','src/config/taxonomy.ts']){
  const bytes=Buffer.from(readFileSync(file,'utf8').replace(/\r\n/g,'\n'));
  const projected=beforePhase7Integration(file,bytes);
  const modified=Buffer.from(bytes);modified[0]=modified[0]!^1;
  if(file.endsWith('.json'))assert.throws(()=>beforePhase7Integration(file,modified));
  else assert.throws(()=>beforePhase7Integration(file,modified),'Mutating an authorized source hunk must also fail');
  assert.notEqual(hash(projected),hash(Buffer.concat([projected,Buffer.from('unrelated')])));
 }
 const file='src/data/media/imported-manifest.json';
 const modified=read(file);modified.assets[0].alt+=' changed old artwork';
 assert.notEqual(hash(beforePhase7Integration(file,Buffer.from(JSON.stringify(modified,null,2)+'\n'))),read('docs/qa/phase7/before.json').files.find((r:any)=>r.file===file).sha256);
});

for(const [id,[asin,category,sector,stem]]of Object.entries(PHASE7))test(`${id} keeps exact identity, documented specs, owner evidence and unapproved release state`,()=>{
 const p={id,data:productSchema.parse(read(`src/data/products/${id}.json`))} as Product,r=p.data.research!,asset=importedArtwork(id)!;
 assert.equal(p.data.category,category);assert.equal(categoryUniverse(p.data.category),sector);
 assert.equal(p.data.links.amazonCa.asin,asin);assert.equal(p.data.links.amazonCa.url,`https://www.amazon.ca/dp/${asin}?tag=apocalypsegear-20`);
 assert.equal(p.data.links.amazonCom.url,null);assert.deepEqual(p.data.links.partners,[]);
 assert.equal(p.data.reviewStatus,'draft');assert.equal(p.data.visibility,'informational');assert.equal(p.data.testing,'not-tested');assert.equal(p.data.lastVerified,null);
 assert.equal(r.listingVerified,false);assert.equal(r.safetyStatus,'pending');assert.equal(r.publicationApproved,false);assert.ok(r.publicationBlockers.length);
 assert.equal(r.listingEvidence!.method,'owner-document');assert.equal(r.listingEvidence!.matchedModel,p.data.modelNumber);assert.match(r.listingEvidence!.notes,/inaccessible/);
 assert.equal(productVerification(p).modelDocumented,true);assert.equal(productVerification(p).listingStatus,'owner-documented');
 assert.equal(getMerchantLinks(p)[0]!.href,p.data.links.amazonCa.url);assert.equal(getMerchantLinks(p,false)[0]!.href,null);
 assert.equal(isCommerciallyApproved(p),false);assert.equal(productStructuredData(p,new URL('https://apocalypsegearlab.github.io')),undefined);assert.equal(productSchema.safeParse({...p.data,reviewStatus:'published'}).success,false);
 assert.ok(p.data.specs.length>=6&&p.data.pros.length>=3&&p.data.cons.length>=3&&p.data.useCases.length>=3&&p.data.editorial!.purchaseChecks.length>=4&&r.safetyNotes.length>=3);
 for(const spec of p.data.specs)assert.ok(p.data.sources.some(s=>s.kind==='manufacturer'&&s.url===spec.source));
 assert.ok(p.data.relatedProducts.length>=2);assert.equal(asset.id,stem);assert.equal(asset.mappingCsv,'assets/media/phase7-image-manifest.csv');
 const input=read('docs/qa/phase7/owner-inputs.json').find((r:any)=>r.filename===asset.source.filename);
 assert.equal(hash(readFileSync(asset.source.file!)),input.sha256);assert.equal(asset.source.sha256,input.sha256);
 assert.equal(asset.source.width,1254);assert.equal(asset.source.height,1254);assert.deepEqual(asset.variants!.map(v=>v.width),[480,960,1254]);assert.equal(asset.encoding!.recolor,false);assert.equal(asset.encoding!.crop,false);
 for(const change of ['hold','wrong-model','safety-blocked']){const copy=structuredClone(p);if(change==='hold')copy.data.research!.affiliateReview!.decision='hold';if(change==='wrong-model')copy.data.research!.listingEvidence!.matchedModel='Other model';if(change==='safety-blocked')copy.data.research!.safetyStatus='blocked';assert.equal(getMerchantLinks(copy)[0]!.href,null);}
});

test('new equipment remains discoverable through shared categories while model-specific caveats stay explicit',()=>{
 const products=readdirSync('src/data/products').filter(f=>f.endsWith('.json')).map(f=>({id:f.slice(0,-5),data:productSchema.parse(read('src/data/products/'+f))} as Product));
 assert.equal(populatedCategories(products).length,32);
 for(const [,category]of Object.values(PHASE7))assert.ok(populatedCategories(products).some(c=>c.id===category));
 const content=(id:string)=>JSON.stringify(read('src/data/products/'+id+'.json'));
 assert.match(content('vortex-diamondback-hd-10x42-review'),/DB-215-OBL/);
 assert.match(content('garrett-pro-pointer-at-review'),/not a radiation detector/);
 assert.match(importedArtwork('garrett-pro-pointer-at-review')!.captionNote!,/orange artwork retained/);
 assert.match(content('gq-gmc-600-pro-review'),/no physical radiation protection/);assert.match(content('gq-gmc-600-pro-review'),/H\*10/);
 assert.match(content('fenix-pd36r-pro-review'),/not constant 2,800 lm/);
 assert.match(content('motorola-talkabout-t802-review'),/ISED RSS-210/);assert.match(content('motorola-talkabout-t802-review'),/467\.5625/);
});
