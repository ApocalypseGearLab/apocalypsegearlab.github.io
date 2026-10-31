import {CONVERSION_INTEGRATION_FILES} from './conversion-fixture';
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {productSchema} from '../src/lib/product-schema';
import {getMerchantLinks,canadianAffiliateIssues} from '../src/lib/affiliate';
import {productStructuredData} from '../src/lib/product-seo';
import {productCaution} from '../src/lib/respirator-filters';
import {importedMedia,importedArtwork,canPublishImportedAsset} from '../src/lib/imported-media';
import type {Product} from '../src/lib/products';
import {PHASE46_FILTERS} from './catalogue-fixture';

const hash=(bytes: string | Buffer)=>createHash('sha256').update(bytes).digest('hex');
const read=(file:string)=>JSON.parse(readFileSync(file,'utf8'));
const baseline=read('docs/qa/phase4-7/preservation.json');

test('Phase 4.7 changes only three commercial records and appends only the 2091 media mapping',()=>{
  assert.equal(baseline.baseCommit,'59ba20b83c5d895ad132f97d01b18465c467edbc');
  assert.deepEqual([...baseline.modifiedProductIds].sort(),Object.keys(PHASE46_FILTERS).sort());
  assert.equal(baseline.products.length,31);
  for(const row of baseline.products){
    const current=read(row.file);
    if(row.id==='3m-2091-p100-particulate-filters') continue; // Phase 4.8 preservation tests cover this record.
    if(!baseline.modifiedProductIds.includes(row.id))assert.equal(hash(JSON.stringify(current)),row.sha256Canonical,row.file);
    else for(const key of ['name','brand','modelNumber','category','specs','pros','useCases','relatedProducts','image','links','testing','reviewStatus','visibility','lastVerified'])assert.deepEqual(current[key],row.data[key],`${row.id}: ${key}`);
    if(row.data){
      assert.deepEqual(current.research.safetyNotes,row.data.research.safetyNotes,'Do not weaken respiratory cautions');
      assert.deepEqual(current.sources.slice(0,row.data.sources.length),row.data.sources,'Preserve the manufacturer sources');
      assert.deepEqual(current.research.confirmed.slice(0,row.data.research.confirmed.length),row.data.research.confirmed,'Preserve the documented manufacturer facts');
    }
  }
  for(const row of baseline.files){if(CONVERSION_INTEGRATION_FILES.has(row.file))continue;if(['src/config/taxonomy.ts','src/components/UniverseHub.astro','src/data/media/imported-manifest.json','scripts/verify-images.mjs'].includes(row.file)) continue; // Phase 5 preservation tests cover additive integration.
const bytes=readFileSync(row.file);assert.equal(hash(row.normaliseNewlines?bytes.toString('utf8').replace(/\r\n/g,'\n'):bytes),row.sha256,row.file);}
  assert.deepEqual(importedMedia.slice(0,29),baseline.importedAssets);
  assert.equal(importedMedia.length,34);
});

for(const [id,[asin]]of Object.entries(PHASE46_FILTERS))test(`${id} permits the owner-documented pack while preserving editorial and respiratory safeguards`,()=>{
  const data=productSchema.parse(read('src/data/products/'+id+'.json'));const product={id,data} as Product;
  assert.equal(data.links.amazonCa.asin,asin);
  assert.equal(data.links.amazonCa.url,`https://www.amazon.ca/dp/${asin}?tag=apocalypsegear-20`);
  assert.equal(data.modelNumber,id.split('-')[1]);
  assert.equal(data.research!.affiliateReview!.decision,'link-permitted');
  assert.equal(data.research!.listingEvidence!.method,'owner-document');
  assert.equal(data.research!.listingEvidence!.matchedAsin,asin);
  assert.equal(data.research!.listingEvidence!.matchedModel,data.modelNumber);
  assert.equal(data.research!.listingVerified,false);
  assert.equal(data.research!.safetyStatus,'pending');
  assert.equal(data.research!.publicationApproved,false);
  assert.equal(data.reviewStatus,'draft');assert.equal(data.visibility,'informational');
  assert.equal(data.testing,'not-tested');assert.equal(data.lastVerified,null);
  assert.equal(productStructuredData(product,new URL('https://apocalypsegearlab.github.io')),undefined);
  assert.equal(productSchema.safeParse({...data,reviewStatus:'published'}).success,false);
  assert.deepEqual(canadianAffiliateIssues(product),[]);
  assert.equal(getMerchantLinks(product)[0]!.href,data.links.amazonCa.url);
  assert.ok(data.research!.affiliateReview!.sourceIds.includes('owner-canadian-listing'));
  assert.match(data.research!.listingEvidence!.notes,/five pairs|one pair/);
  assert.match(data.research!.identityNotes,/original capture files were not attached/);
  const safety=data.research!.safetyNotes.join(' ');
  for(const expression of [/two matching/,/supply no oxygen/,/oxygen-deficient, unknown.*IDLH/,/fit testing/,/No universal protection against radiation/])assert.match(safety,expression);
  assert.match(productCaution(product)!,/nuisance-level|P100/);
  if(data.modelNumber==='2097')assert.match(data.specs.find(s=>s.label==='Protection scope')!.value,/not protection against hazardous gas\/vapor/);
  if(data.modelNumber==='60926')assert.match(data.research!.listingEvidence!.notes,/Unit Count 1.*2 Count/);
  const held=structuredClone(product);held.data.research!.affiliateReview!.decision='hold';
  assert.equal(getMerchantLinks(held)[0]!.href,null,'An explicit hold still wins');
  const blocked=structuredClone(product);blocked.data.research!.safetyStatus='blocked';
  assert.equal(getMerchantLinks(blocked)[0]!.href,null,'Safety blocks still win');
});

test('2091 preserves its supplied original and artwork independently of the documented Phase 4.8 link decision',()=>{
  const asset=importedArtwork('3m-2091-p100-particulate-filters')!;
  assert.equal(asset.id,'3m-2091-outbreak');assert.equal(canPublishImportedAsset(asset),true);
  assert.equal(asset.alt,'Concept illustration of two pink 3M 2091 P100 particulate filters in a green tactical HUD frame');
  assert.deepEqual(asset.variants!.map(v=>v.width),[480,960,1254]);
  assert.equal(asset.encoding!.crop,false);assert.equal(asset.encoding!.recolor,false);
  const source=read('docs/qa/phase4-7/artwork-review.json').source;
  assert.equal(source.sha256,'19a993ca0bc131ab7f5f611ce1c9ed20a9f92b2b6ad55d33c5666a1f006c7567');
  assert.equal(hash(readFileSync(source.file)),source.sha256);
  assert.notEqual(asset.file,importedArtwork('3m-2097-p100-particulate-filters')!.file);
  const id='3m-2091-p100-particulate-filters',data=productSchema.parse(read('src/data/products/'+id+'.json'));
  assert.equal(data.links.amazonCa.asin,'B001D1JCK4');assert.equal(getMerchantLinks({id,data} as Product)[0]!.href,data.links.amazonCa.url);
  assert.match(data.research!.affiliateReview!.reason,/two filters \(one pair\)/);
  assert.match(data.summary,/no documented nuisance-level organic-vapor relief/);
});
