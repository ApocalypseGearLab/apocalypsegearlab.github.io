import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { productSchema } from '../src/lib/product-schema';
import { productStructuredData } from '../src/lib/product-seo';
import { categoryUniverse } from '../src/config/taxonomy';
import { getMerchantLinks, canadianAffiliateIssues } from '../src/lib/affiliate';
import type { Product } from '../src/lib/products';

import { OUTBREAK, PHASE43_FALLOUT, PHASE46_FILTERS } from './catalogue-fixture';
import { productCaution } from '../src/lib/release-policy';
import { productCaution as filterCaution, COMPATIBLE_3M_FILTERS } from '../src/lib/respirator-filters';
const expected = {
  ...OUTBREAK,
  ...PHASE46_FILTERS,
  ...PHASE43_FALLOUT,
  'jackery-explorer-1000-v2': ['B0D7PPG25F', 'power-stations'],
  'ecoflow-river-2-pro': ['B0BVLPGS79', 'power-stations'],
  'jackery-explorer-300': ['B082TMBYR6', 'power-stations'],
  'midland-er310': ['B015QIC1PW', 'weather-radios'],
  'fenix-cl26r-pro': ['B0CGKWX5YT', 'lighting'],
  'jackery-solarsaga-100w-air': ['B0FX8P4JST', 'solar'],
  'kidde-c3010-co-alarm': ['B00FHW7PBS', 'home-outage-planning'],
  'iniu-p62-20000mah-65w': ['B0DB888L9F', 'battery-banks'],
  'fenix-hm50r-v2-headlamp': ['B0H6R34CBL', 'lighting'],
  'sawyer-squeeze-sp129-water-filter': ['B00B1OSU4W', 'water'],
  'reliance-aqua-tainer-7-gallon': ['B001QC31G6', 'water'],
  'nanuk-904-first-aid-kit': ['B0G3XYHL33', 'first-aid'],
  'leatherman-wave-plus-multitool': ['B079MJBP21', 'tools'],
  'sol-emergency-bivvy': ['B08NC9BLQ5', 'shelter'],
} as const;
const rawProducts = new Map(readdirSync('src/data/products').filter((file) => file.endsWith('.json')).map((file) => [file.replace(/\.json$/, ''), JSON.parse(readFileSync(`src/data/products/${file}`, 'utf8'))]));
const site = new URL('https://apocalypsegearlab.github.io');

for (const [id, [asin]] of Object.entries(PHASE46_FILTERS)) test(`${id} keeps exact identity, distinct respiratory limits and an unverified-quantity hold`, () => {
  const data = productSchema.parse(rawProducts.get(id));
  const product = {id, data} as Product;
  const evidence = JSON.parse(readFileSync('docs/qa/phase4-6/evidence.json','utf8')).products.find((p:any) => p.slug === id);
  assert.equal(data.links.amazonCa.asin, asin);
  assert.equal(data.links.amazonCa.url, `https://www.amazon.ca/dp/${asin}?tag=apocalypsegear-20`);
  assert.equal(data.modelNumber, id.split('-')[1]);
  assert.equal(evidence.independentlyVerifiedQuantity, null);
  assert.equal(data.research!.affiliateReview!.decision, 'hold');
  assert.match(data.research!.affiliateReview!.reason, /model\/quantity check/);
  assert.equal(getMerchantLinks(product,true)[0]!.href, null);
  assert.equal(data.research!.listingEvidence, undefined);
  assert.ok(data.sources.every(source=>!source.url.includes('amazon.ca')),'An unread held retailer URL is not a verified public source or an alternate buying link');
  assert.equal(data.research!.listingVerified, false);
  assert.equal(data.research!.publicationApproved, false);
  assert.equal(data.reviewStatus,'draft');
  assert.equal(data.visibility,'informational');
  assert.equal(data.testing,'not-tested');
  assert.equal(data.lastVerified,null);
  assert.equal(productStructuredData(product,site),undefined);
  assert.equal(productSchema.safeParse({...data,reviewStatus:'published'}).success,false);
  const changed=structuredClone(product);
  Object.assign(changed.data.research!,{listingVerified:true,safetyStatus:'cleared',publicationApproved:true,publicationBlockers:[]});
  assert.equal(getMerchantLinks(changed,true)[0]!.href,null,'Unrelated flags must not bypass the package/model hold');
  const safety=data.research!.safetyNotes.join(' ');
  assert.match(safety,/two matching/);
  assert.match(safety,/supply no oxygen/);
  assert.match(safety,/oxygen-deficient, unknown.*IDLH/);
  assert.match(safety,/fit testing/);
  assert.match(safety,/No universal protection against radiation, biological agents or chemical weapons/);
  assert.ok(data.relatedProducts.includes('3m-6800-full-facepiece-respirator'));
  assert.equal(COMPATIBLE_3M_FILTERS.filter(f=>f.id===id).length,1);
  assert.match(filterCaution(product)!,new RegExp(data.modelNumber==='2097'?'nuisance-level':'P100'));
  if(data.modelNumber==='2097') {
    assert.match(data.specs.find(s=>s.label==='Protection scope')!.value,/not protection against hazardous gas\/vapor/);
    assert.match(data.summary,/five-pair.*quantity verification/);
  } else assert.doesNotMatch(filterCaution(product)!,/No protection against gases, vapours/);
});

test('Phase 4.6 appends only three media records and preserves every previous product, image, policy and affiliate decision', () => {
  const baseline=JSON.parse(readFileSync('docs/qa/phase4-6/preservation.json','utf8'));
  assert.equal(baseline.baseCommit,'f027d539fd2b4621fc55ec4b103dcdc63245d0ee');
  assert.equal(baseline.products.length,27,'All 26 prior products and template');
  for(const p of baseline.products) assert.equal(createHash('sha256').update(JSON.stringify(JSON.parse(readFileSync(p.file,'utf8')))).digest('hex'),p.sha256Canonical,p.file);
  for(const p of baseline.files) {
    const bytes=readFileSync(p.file),content=p.normaliseNewlines?bytes.toString('utf8').replace(/\r\n/g,'\n'):bytes;
    assert.equal(createHash('sha256').update(content).digest('hex'),p.sha256,p.file);
  }
  const manifest=JSON.parse(readFileSync('src/data/media/imported-manifest.json','utf8'));
  assert.equal(manifest.assets.length,29);
  assert.deepEqual(manifest.assets.slice(0,26),baseline.importedAssets);
  for(const id of Object.keys(PHASE46_FILTERS)) {
    const asset=manifest.assets.find((a:any)=>a.productId===id);
    assert.equal(asset.mappingCsv,'assets/media/phase4-6-image-manifest.csv');
    assert.deepEqual(asset.variants.map((v:any)=>v.width),[480,960,1254]);
    assert.equal(asset.encoding.crop,false);assert.equal(asset.encoding.recolor,false);
    assert.match(asset.reviewNote,/synthetic|Synthetic|Generated/);
  }
});

test('Phase 4.4 nine independent commercial decisions retain exact Canadian ASINs and their evidence limits', () => {
  const decisions={
    'fnirsi-gc-01-geiger-counter':['B0BHH9X1WG',true],
    'readywise-84-servings-emergency-food-bucket':['B00TX5J74S',true],
    'sos-3600-calorie-emergency-food-rations':['B00W20PIHQ',true],
    'nanuk-904-first-aid-kit':['B0G3XYHL33',false],
    'ecoflow-river-2-pro':['B0BVLPGS79',false],
    'jackery-explorer-300':['B082TMBYR6',false],
    'midland-er310':['B015QIC1PW',true],
    'kidde-c3010-co-alarm':['B00FHW7PBS',false],
    'iniu-p62-20000mah-65w':['B0DB888L9F',false],
  } as const;
  for(const [id,[asin,active]]of Object.entries(decisions)){
    const data=productSchema.parse(rawProducts.get(id));
    assert.equal(data.links.amazonCa.asin,asin);
    assert.equal(getMerchantLinks({id,data} as Product,true)[0]!.href,active?`https://www.amazon.ca/dp/${asin}?tag=apocalypsegear-20`:null);
    assert.equal(data.research!.affiliateReview!.decision,active?'link-permitted':'hold');
    assert.equal(data.research!.listingVerified,false);
    assert.equal(data.lastVerified,null);
    assert.equal(data.reviewStatus,'draft');
    assert.match(data.research!.affiliateReview!.reason,/Canadian|public|Kidde|NANUK/);
  }
  const gc=rawProducts.get('fnirsi-gc-01-geiger-counter');
  assert.match(gc.research.confirmed.map((f:any)=>f.text).join(' '),/older.*Amazon.ca.*B0BHH9X1WG.*GC-01/);
  assert.match(gc.research.identityNotes,/five months old/);
  assert.match(rawProducts.get('midland-er310').research.affiliateReview.reason,/capacity conflict alone is not/);
  assert.match(rawProducts.get('nanuk-904-first-aid-kit').research.affiliateReview.reason,/FSA03.*B0G3XYHL33.*not matched/);
  assert.match(rawProducts.get('ecoflow-river-2-pro').research.affiliateReview.reason,/B0D2HX1ZS9.*EFR620.*EFR617/);
});

test('all 26 product identities and the 17 unaudited records are preserved against main', () => {
  const baseline=JSON.parse(readFileSync('docs/qa/phase4-4/preservation.json','utf8'));
  assert.equal(baseline.baseCommit,'e3f65a79895fc66215d42bdd1cbd29372a648c7d');
  assert.equal(baseline.products.length,26);
  assert.equal(baseline.products.filter((p:any)=>p.audited).length,9);
  for(const p of baseline.products){
    const current=rawProducts.get(p.id);assert.ok(current,p.id);
    // Phase 4.5 explicitly corrects only ReadyWise's full name and recorded model.
    const readywiseIdentity:Record<string,string>={name:'ReadyWise 84 Servings Gluten-Free Emergency Food Supply Bucket',modelNumber:'WGF01-184'};
    for(const [key,value]of Object.entries(p.protected))assert.deepEqual(current[key]??null,p.id==='readywise-84-servings-emergency-food-bucket'?(readywiseIdentity[key]??value):value,`${p.id}: protected ${key}`);
    if(!p.audited)assert.equal(createHash('sha256').update(JSON.stringify(current)).digest('hex'),p.sha256Canonical,p.id);
  }
});

test('media, bunker, affiliate configuration, taxonomy and mandatory safety controls remain unchanged', () => {
  const baseline=JSON.parse(readFileSync('docs/qa/phase4-4/preservation.json','utf8'));
  for(const p of baseline.unchangedFiles){
    if(p.file==='src/data/media/imported-manifest.json') continue; // Intentional append; old entries are independently protected below.
    const raw=readFileSync(p.file),content=p.normaliseNewlines?raw.toString('utf8').replace(/\r\n/g,'\n'):raw;
    assert.equal(createHash('sha256').update(content).digest('hex'),p.sha256,p.file);
  }
});

test('Midland owner-transcribed ER310-MFN identity permits only the recorded link without a battery or verification guarantee', () => {
  const data=productSchema.parse(rawProducts.get('midland-er310'));
  const evidence=JSON.parse(readFileSync('docs/qa/midland-er310/evidence.json','utf8'));
  assert.equal(evidence.ownerEvidence.method,'owner-transcription');
  assert.equal(evidence.ownerEvidence.manufacturerPartNumber,'ER310');
  assert.equal(evidence.ownerEvidence.listingModel,'ER310-MFN');
  assert.equal(evidence.ownerEvidence.colour,'red/black');
  assert.match(data.research!.identityNotes,/not.*inspected screenshot/);
  assert.match(data.research!.affiliateReview!.reason,/ER310-MFN.*ER310 family.*rather than ER310PRO/);
  assert.equal(data.research!.listingVerified,false);
  assert.equal(data.research!.listingEvidence,undefined);
  assert.equal(data.research!.publicationApproved,false);
  assert.equal(data.research!.safetyStatus,'pending');
  assert.equal(data.reviewStatus,'draft');
  assert.equal(data.lastVerified,null);
  assert.equal(productSchema.safeParse({...data,reviewStatus:'published'}).success,false,'Link permission does not approve editorial publication');
  assert.equal(getMerchantLinks({id:'midland-er310',data} as Product,true)[0]!.href,'https://www.amazon.ca/dp/B015QIC1PW?tag=apocalypsegear-20');
  assert.equal(getMerchantLinks({id:'midland-er310',data} as Product,false)[0]!.href,null);
  assert.ok(!data.specs.some(spec=>/\b(?:2600|3500|2,600|3,500)\b|\bmAh\b|\bhours\b/i.test(spec.value)),'No battery capacity or runtime is guaranteed');
  assert.match(data.research!.safetyNotes.join(' '),/Canadian weather-alert coverage/);
});

test('S.O.S. two-pack link permission retains rounded nutrition, dated shelf life and all other product records', () => {
  const data=productSchema.parse(rawProducts.get('sos-3600-calorie-emergency-food-rations'));
  const evidence=JSON.parse(readFileSync('docs/qa/sos-two-pack/evidence.json','utf8'));
  assert.equal(evidence.ownerEvidence.method,'owner-transcription');
  assert.equal(evidence.ownerEvidence.titleQuantity,'2 PK');
  assert.equal(evidence.ownerEvidence.aboutQuantity,'2 Pack');
  assert.equal(evidence.ownerEvidence.numberOfItems,2);
  assert.deepEqual(evidence.ownerEvidence.unitCount,{value:1512,unit:'gram'});
  assert.deepEqual(evidence.ownerEvidence.label,{servingsPerPacket:9,servingGrams:84,caloriesPerServing:410});
  assert.equal(9*84*2,1512,'Only a nominal label-mass consistency check, not a weighing');
  assert.equal(data.research!.listingVerified,false);
  assert.equal(data.research!.listingEvidence,undefined);
  assert.equal(data.research!.publicationApproved,false);
  assert.equal(data.research!.safetyStatus,'pending');
  assert.equal(data.reviewStatus,'draft');
  assert.equal(data.lastVerified,null);
  const product={id:'sos-3600-calorie-emergency-food-rations',data} as Product;
  assert.equal(getMerchantLinks(product,true)[0]!.href,'https://www.amazon.ca/dp/B00W20PIHQ?tag=apocalypsegear-20');
  assert.equal(getMerchantLinks(product,false)[0]!.href,null);
  assert.equal(productSchema.safeParse({...data,reviewStatus:'published'}).success,false);
  assert.equal(productStructuredData(product,site),undefined);
  const publicText=JSON.stringify([data.summary,data.description,data.specs,data.cons,data.research!.confirmed,data.research!.safetyNotes,data.editorial]);
  assert.doesNotMatch(publicText,/\b7[,\s]?200\b|\b7[,\s]?380\b/,'No exact lot-energy total is promoted');
  assert.match(data.specs.find(s=>s.label==='Portions')!.value,/nine.*84 g/);
  assert.match(data.specs.find(s=>s.label==='Energy inconsistency')!.value,/410.*Rounded/);
  assert.match(data.research!.safetyNotes.join(' '),/from manufacture\/packaging, not purchase/);
  assert.match(data.research!.safetyNotes.join(' '),/wheat, coconut and soy/);
});

test('ReadyWise inspected yogurt label reconciles 84 servings and 15420 declared kcal without changing other commercial decisions', () => {
  const id='readywise-84-servings-emergency-food-bucket',data=productSchema.parse(rawProducts.get(id));
  const evidence=JSON.parse(readFileSync('docs/qa/phase4-5/evidence.json','utf8'));
  assert.equal(data.name,'ReadyWise 84 Servings Gluten-Free Emergency Food Supply Bucket');
  assert.equal(data.modelNumber,'WGF01-184');
  assert.equal(evidence.identity.upc,'851238005318');
  assert.equal(evidence.identity.gtin,`00${evidence.identity.upc}`);
  const digits=[...evidence.identity.upc].map(Number);
  assert.equal(digits.reduce((n,d,i)=>n+d*(i%2===0?3:1),0)%10,0,'UPC check digit validates syntax, not product authenticity');
  assert.equal(evidence.labelEvidence.method,'direct-visual-inspection');
  assert.equal(evidence.labelEvidence.conversationImageInspected,true);
  assert.equal(evidence.labelEvidence.manufacturerImageIndependentlyDownloadedAndInspected,true);
  assert.deepEqual(evidence.recipes.map((r:any)=>[r.pouches,r.servingsPerPouch,r.servings,r.kcalPerServing,r.kcalSubtotal]),[[4,6,24,270,6480],[3,6,18,160,2880],[3,6,18,190,3420],[3,8,24,110,2640]]);
  assert.equal(24+18+18+24,84);
  assert.equal(6480+2880+3420+2640,15420);
  assert.equal(evidence.recipes.reduce((n:number,r:any)=>n+r.servings,0),84);
  assert.equal(evidence.recipes.reduce((n:number,r:any)=>n+r.servings*r.kcalPerServing,0),15420);
  assert.equal(evidence.recipes.reduce((n:number,r:any)=>n+r.pouches,0),13);
  assert.equal(evidence.recipes.reduce((n:number,r:any)=>n+r.pouches*r.waterCupsPerPouch,0),63);
  assert.equal(evidence.legacyReference.calculationWithListedBucketCounts,15180);
  assert.equal(evidence.legacyReference.kcalPerServing,100);
  assert.match(data.specs.find(s=>s.label==='Declared energy')!.value,/15,420.*rounded/);
  assert.match(data.specs.find(s=>s.label==='Creamy Yogurt Style Dessert')!.value,/110 kcal/);
  assert.ok(!data.specs.some(s=>/15,180/.test(s.value)),'Pudding totals cannot override yogurt-version specifications');
  assert.match(data.research!.safetyNotes.join(' '),/soy.*milk/i);
  assert.match(data.research!.safetyNotes.join(' '),/wheat, egg and tree nuts/);
  assert.match(data.research!.safetyNotes.join(' '),/conditional manufacturer maximum/);
  assert.equal(data.research!.affiliateReview!.decision,'link-permitted');
  const product={id,data} as Product;
  assert.equal(getMerchantLinks(product,true)[0]!.href,'https://www.amazon.ca/dp/B00TX5J74S?tag=apocalypsegear-20');
  assert.equal(getMerchantLinks(product,false)[0]!.href,null);
  assert.equal(data.research!.listingVerified,false);
  assert.equal(data.research!.listingEvidence,undefined);
  assert.equal(data.research!.publicationApproved,false);
  assert.equal(data.research!.safetyStatus,'pending');
  assert.equal(data.reviewStatus,'draft');
  assert.equal(data.lastVerified,null);
  assert.equal(productSchema.safeParse({...data,reviewStatus:'published'}).success,false);
  assert.equal(productStructuredData(product,site),undefined);
  // Current preservation covers every other product, including Midland and S.O.S.;
  // previous reports remain immutable snapshots of their respective deliveries.
  const baseline=JSON.parse(readFileSync('docs/qa/phase4-5/preservation.json','utf8'));
  assert.equal(baseline.baseCommit,'3d13b171558115a67413ddb6a046865913abe51a');
  assert.equal(baseline.unchangedProducts.length,26);
  for(const entry of baseline.unchangedProducts){
    const current=JSON.parse(readFileSync(entry.file,'utf8'));
    assert.equal(createHash('sha256').update(JSON.stringify(current)).digest('hex'),entry.sha256Canonical,entry.file);
  }
});

test('retailer identity evidence cannot replace manufacturer technical evidence or editorial publication approval', () => {
  const gc=structuredClone(rawProducts.get('fnirsi-gc-01-geiger-counter'));
  const source=gc.sources.find((s:any)=>s.kind==='retailer');assert.ok(source);
  gc.specs[0].source=source.url;
  assert.equal(productSchema.safeParse(gc).success,false);
  gc.specs[0].source=gc.sources.find((s:any)=>s.kind==='manufacturer').url;
  gc.reviewStatus='published';
  assert.equal(productSchema.safeParse(gc).success,false,'Recorded retailer-link permission is not approval to publish an indexed product review');
});

test('Phase 4.3 preserves food arithmetic, exact variants and facepiece assembly limits', () => {
  const get = (id:string) => productSchema.parse(rawProducts.get(id));
  const gc=get('fnirsi-gc-01-geiger-counter');
  assert.equal(gc.research?.affiliateReview?.decision,'link-permitted');
  assert.match(gc.research!.affiliateReview!.reason,/older crawl/);
  assert.ok(gc.sources.some(s=>s.id==='gc01-ca-snapshot' && s.kind==='retailer'));
  assert.ok(!gc.specs.some(s=>/1,000|10,000|1000|10000/.test(s.value)), 'No uncertain numerical upper range is promoted');
  const rw=get('readywise-84-servings-emergency-food-bucket');
  assert.equal(rw.research?.affiliateReview?.decision,'link-permitted');
  assert.match(rw.research!.affiliateReview!.reason,/15,420.*separate 100-kcal pudding.*15,180/);
  assert.match(rw.research!.safetyNotes.join(' '),/soy.*milk/);
  const sos=get('sos-3600-calorie-emergency-food-rations');
  assert.equal(sos.research?.affiliateReview?.decision,'link-permitted');
  assert.match(sos.research!.affiliateReview!.reason,/2 PK.*2 Pack.*Number of Items 2/);
  assert.match(sos.research!.affiliateReview!.reason,/3600 Calorie.*3,690/);
  const datrex=get('datrex-dx2400f-emergency-food-ration');
  assert.match(datrex.specs.find(s=>s.label==='Energy per packet')!.value,/whole packet/);
  assert.match(datrex.specs.find(s=>s.label==='Individual bars')!.value,/12.*200 kcal/);
  const mask=get('3m-6800-full-facepiece-respirator');
  assert.equal(mask.modelNumber,'6800');
  assert.match(mask.specs[0]!.value,/Medium/);
  assert.match(mask.cons.join(' '),/not confirmed as included/);
  const caution=productCaution({id:'3m-6800-full-facepiece-respirator',data:mask} as Product)!;
  assert.match(caution,/alone does not filter air/);
  assert.match(caution,/supplies no oxygen/);
  assert.doesNotMatch(caution,/No protection against gases/,'Do not apply the N95-only caution to a configurable full facepiece');
});

test('remaining product holds cannot be bypassed by setting unrelated editorial approval flags', () => {
  for(const id of ['nanuk-904-first-aid-kit','ecoflow-river-2-pro','jackery-explorer-300','kidde-c3010-co-alarm','iniu-p62-20000mah-65w']) {
    const data=productSchema.parse(rawProducts.get(id));
    assert.equal(data.research!.affiliateReview!.decision,'hold');
    data.research={...data.research!,listingVerified:true,safetyStatus:'cleared',publicationApproved:true,publicationBlockers:[]};
    assert.equal(getMerchantLinks({id,data} as Product,true)[0]!.href,null);
    assert.equal(productSchema.safeParse({...data,reviewStatus:'published'}).success,false);
  }
});

test('twenty-nine registered links retain exact identities and obey product-level evidence decisions', () => {
  for (const [slug, [asin, category]] of Object.entries(expected)) {
    const raw = rawProducts.get(slug);
    assert.ok(raw, slug);
    const data = productSchema.parse(raw);
    assert.equal(data.links.amazonCa.asin, asin);
    assert.equal(data.links.amazonCa.url, `https://www.amazon.ca/dp/${asin}?tag=apocalypsegear-20`);
    assert.equal(new URL(data.links.amazonCa.url!).searchParams.getAll('tag').length, 1);
    assert.equal(data.category, category);
    assert.equal(categoryUniverse(data.category), slug in OUTBREAK || slug in PHASE46_FILTERS ? 'outbreak' : ['water','first-aid','tools','shelter','food-storage','food-rations','radiation-detection'].includes(category) ? 'fallout' : 'blackout');
    assert.equal(data.testing, 'not-tested');
    assert.equal(data.reviewStatus, 'draft');
    assert.equal(data.visibility, 'informational');
    assert.ok(data.sources.length >= 2);
    assert.ok(data.research?.confirmed.length);
    assert.ok(data.description.length > 150);
    assert.ok(data.specs.length >= 5);
    if(slug in OUTBREAK || slug in PHASE43_FALLOUT || slug in PHASE46_FILTERS) assert.ok(data.image?.src?.startsWith('/images/'+categoryUniverse(data.category)+'/')); else assert.equal(data.image, null);
    for (const key of ['price', 'rating', 'aggregateRating', 'stock', 'discount']) assert.ok(!(key in raw));
    const product = { id: slug, data } as Product;
    const eligible = canadianAffiliateIssues(product).length === 0;
    assert.equal(getMerchantLinks(product, true)[0]?.href, eligible ? data.links.amazonCa.url : null);
    assert.equal(data.research?.listingVerified, false, 'Link activation must not invent listing verification');
    assert.equal(data.research?.listingEvidence, undefined);
    if (eligible) assert.equal(data.research?.affiliateReview?.decision, 'link-permitted');
  }
});

test('slugs, ASINs and related records are unique and refer to existing products', () => {
  const asins = new Set<string>();
  for (const [slug, raw] of rawProducts) {
    assert.match(slug, /^[a-z0-9-]+$/);
    const data = productSchema.parse(raw);
    if (data.links.amazonCa.asin) {
      assert.ok(!asins.has(data.links.amazonCa.asin));
      asins.add(data.links.amazonCa.asin);
    }
    assert.ok(!JSON.stringify(raw).includes('kitchengearla-20'));
    assert.ok(!JSON.stringify(raw).includes('B0CZ9LH53B'));
    assert.notEqual(data.brand, 'Anker');
    assert.equal(new Set(data.relatedProducts).size, data.relatedProducts.length);
    for (const related of data.relatedProducts) {
      assert.notEqual(related, slug);
      assert.ok(rawProducts.has(related), `${slug} -> ${related}`);
    }
  }
  assert.equal(asins.size, 29);
});

test('Kidde and INIU remain blocked and cannot be published by changing only editorial status', () => {
  for (const slug of ['kidde-c3010-co-alarm', 'iniu-p62-20000mah-65w']) {
    const raw = rawProducts.get(slug);
    assert.equal(raw.research.safetyStatus, 'blocked');
    assert.equal(productSchema.safeParse({ ...raw, reviewStatus: 'published' }).success, false);
  }
});

test('editorial publication requires listing verification and safety clearance', () => {
  const raw = structuredClone(rawProducts.get('jackery-explorer-1000-v2'));
  raw.reviewStatus = 'published';
  assert.equal(productSchema.safeParse(raw).success, false);
  raw.research = { ...raw.research, publicationApproved: true, listingVerified: true, safetyStatus: 'cleared', publicationBlockers: [] };
  assert.equal(productSchema.safeParse(raw).success, true);
  for (const override of [{ publicationApproved: false }, { listingVerified: false }, { safetyStatus: 'pending' }, { publicationBlockers: ['Unresolved issue'] }]) {
    assert.equal(productSchema.safeParse({ ...raw, research: { ...raw.research, ...override } }).success, false);
  }
});

test('schema rejects missing evidence, duplicate sources and incorrect ASIN mappings', () => {
  const raw = structuredClone(rawProducts.get('jackery-explorer-1000-v2'));
  assert.equal(productSchema.safeParse({ ...raw, sources: [] }).success, false);
  assert.equal(productSchema.safeParse({ ...raw, sources: [...raw.sources, raw.sources[0]] }).success, false);
  const links = { ...raw.links, amazonCa: { ...raw.links.amazonCa, asin: 'B000000001' } };
  assert.equal(productSchema.safeParse({ ...raw, links }).success, false);
});

test('no Product, Review, Offer or AggregateRating data is emitted for drafts', () => {
  for (const slug of Object.keys(expected)) {
    assert.equal(productStructuredData({ id: slug, data: productSchema.parse(rawProducts.get(slug)) } as Product, site), undefined);
  }
});

test('approved Product structured data contains identity only, without invented commercial or review data', () => {
  const raw = structuredClone(rawProducts.get('jackery-explorer-1000-v2'));
  raw.reviewStatus = 'published';
  raw.research = { ...raw.research, publicationApproved: true, listingVerified: true, safetyStatus: 'cleared', publicationBlockers: [] };
  const data = productStructuredData({ id: 'jackery-explorer-1000-v2', data: productSchema.parse(raw) } as Product, site)!;
  assert.equal(data['@type'], 'Product');
  assert.equal(data.url, `${site.origin}/gear/jackery-explorer-1000-v2/`);
  assert.equal(data.model, 'JE-1000D');
  for (const key of ['offers', 'review', 'aggregateRating', 'image', 'award']) assert.ok(!(key in data));
});


test('Canadian ASIN links reject foreign tags, duplicate tags and extra tracking', () => {
  const raw = structuredClone(rawProducts.get('nanuk-904-first-aid-kit'));
  for (const query of ['tag=wrong-20', 'tag=apocalypsegear-20&tag=apocalypsegear-20', 'tag=apocalypsegear-20&ref=extra']) {
    const links = { ...raw.links, amazonCa: { ...raw.links.amazonCa, url: 'https://www.amazon.ca/dp/B0G3XYHL33?' + query } };
    assert.equal(productSchema.safeParse({ ...raw, links }).success, false);
  }
});

test('OUTBREAK preserves particulate, PPE, clothing-variant and satellite limits without fictional safety promises', () => {
  const safety=(id:string)=>rawProducts.get(id).research.safetyNotes.join(' ');
  assert.match(safety('3m-aura-9205-n95-respirator'), /gases, vapours, oxygen deficiency/);
  assert.match(safety('3m-aura-9205-n95-respirator'), /fit testing/);
  assert.ok(rawProducts.get('3m-aura-9205-n95-respirator').sources.some((s:any)=>s.id==='3m-counterfeit'));
  assert.match(safety('mechanix-m-pact-work-gloves'), /puncture, needle, bite/);
  assert.match(safety('garmin-gpsmap-67i-satellite-gps'), /active subscription/);
  assert.match(rawProducts.get('marmot-precip-rain-jacket').summary,/generation/);
  assert.match(rawProducts.get('merrell-moab-3-mid-waterproof-boots').summary,/size-specific ASIN/);
  for(const id of Object.keys(OUTBREAK)) {
    const p=productSchema.parse(rawProducts.get(id));
    assert.equal(p.research?.listingVerified,false);
    assert.equal(p.lastVerified,null);
    assert.equal(p.testing,'not-tested');
    assert.equal(p.reviewStatus,'draft');
    assert.equal(productStructuredData({id,data:p} as Product,site),undefined);
  }
});

test('Catalogue has nine BLACKOUT, nine FALLOUT and eleven OUTBREAK profiles with substantive original content', () => {
  const products = [...rawProducts].filter(([,raw]) => raw.visibility === 'informational');
  assert.equal(products.length, 29);
  const universes = products.map(([,raw]) => categoryUniverse(productSchema.parse(raw).category));
  assert.equal(universes.filter(id => id === 'blackout').length, 9);
  assert.equal(universes.filter(id => id === 'fallout').length, 9);
  assert.equal(universes.filter(id => id === 'outbreak').length, 11);
  assert.equal(new Set(products.map(([,raw]) => raw.summary)).size, 29);
  assert.equal(new Set(products.map(([,raw]) => raw.description)).size, 29);
  for (const id of ['fenix-hm50r-v2-headlamp','sawyer-squeeze-sp129-water-filter','reliance-aqua-tainer-7-gallon','nanuk-904-first-aid-kit','leatherman-wave-plus-multitool','sol-emergency-bivvy']) {
    const raw = rawProducts.get(id);
    assert.ok(raw.editorial.purchaseChecks.length >= 3, id);
    assert.ok(raw.pros.length >= 2 && raw.cons.length >= 3 && raw.useCases.length >= 2, id);
    assert.ok(raw.research.safetyNotes.length >= 3, id);
  }
  assert.match(rawProducts.get('sawyer-squeeze-sp129-water-filter').research.safetyNotes.join(' '), /viruses.*chemicals.*radioactive/);
  assert.match(rawProducts.get('nanuk-904-first-aid-kit').specs.map((s:any)=>s.value).join(' '), /109.*108.*110/);
  assert.match(rawProducts.get('sol-emergency-bivvy').research.safetyNotes.join(' '), /temperature rating/);
});
