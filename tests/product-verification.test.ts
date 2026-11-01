import {BOUGERV_INTEGRATION_FILES} from './bougerv-fixture';
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {AMAZON_CA_ACCOUNT_DECLARATION,AMAZON_CA_FINAL_APPROVAL_CONFIRMED,AMAZON_CA_LINKING_ENABLED} from '../src/config/site';
import {productSchema} from '../src/lib/product-schema';
import {productVerification,productVerificationAudit} from '../src/lib/product-verification';
import {getMerchantLinks} from '../src/lib/affiliate';
import {publicationIssues,isCommerciallyApproved} from '../src/lib/release-policy';
import {productStructuredData} from '../src/lib/product-seo';
import {ACCOUNT_STATUS_FILES,ACCOUNT_EVIDENCE_FILES,EVIDENCE_NORMALISED_IDS} from './account-status-fixture';
import type {Product} from '../src/lib/products';
const read=(file:string)=>JSON.parse(readFileSync(file,'utf8'));
const products=readdirSync('src/data/products').filter(f=>f.endsWith('.json')&&!f.startsWith('template')).map(f=>({id:f.replace(/\.json$/,''),data:productSchema.parse(read('src/data/products/'+f))} as Product));

test('owner approval is recorded with scope and provenance, never promoted to independent Amazon confirmation',()=>{
 assert.equal(AMAZON_CA_ACCOUNT_DECLARATION.approval,'approved');assert.equal(AMAZON_CA_ACCOUNT_DECLARATION.registration,'registered');
 assert.equal(AMAZON_CA_ACCOUNT_DECLARATION.source,'owner-declaration');assert.equal(AMAZON_CA_ACCOUNT_DECLARATION.recordedOn,'2026-10-31');
 assert.equal(AMAZON_CA_ACCOUNT_DECLARATION.marketplace,'ca');assert.equal(AMAZON_CA_ACCOUNT_DECLARATION.trackingId,'apocalypsegear-20');
 assert.equal(AMAZON_CA_ACCOUNT_DECLARATION.site,'https://apocalypsegearlab.github.io');
 assert.equal(AMAZON_CA_ACCOUNT_DECLARATION.independentlyConfirmed,false);assert.equal(AMAZON_CA_FINAL_APPROVAL_CONFIRMED,false);assert.equal(AMAZON_CA_LINKING_ENABLED,true);
});

test('account and status changes preserve all products, release/SEO/tracking rules, home, navigation and images except three evidence additions',()=>{
 const before=read('docs/qa/account-status/before.json');assert.equal(before.baseCommit,'5efd034d6ab5bb38182bef808e93cd199500d480');assert.equal(before.capturedBeforeImplementation,true);
 for(const row of before.files){if(BOUGERV_INTEGRATION_FILES.has(row.file))continue;
  if(ACCOUNT_STATUS_FILES.has(row.file)||ACCOUNT_EVIDENCE_FILES.has(row.file))continue;
  const b=readFileSync(row.file);assert.equal(createHash('sha256').update(row.normaliseNewlines?b.toString('utf8').replace(/\r\n/g,'\n'):b).digest('hex'),row.sha256,row.file);
 }
 assert.deepEqual(before.products.map((p:any)=>p.id),EVIDENCE_NORMALISED_IDS);
 for(const {id,data:old}of before.products){
  const current=read('src/data/products/'+id+'.json'),e=current.research.listingEvidence;
  assert.equal(old.research.listingEvidence,undefined);assert.equal(e.method,'owner-document');assert.equal(e.checkedAt,'2026-10-31');
  assert.equal(e.url,'https://www.amazon.ca/dp/'+current.links.amazonCa.asin);assert.equal(e.matchedAsin,current.links.amazonCa.asin);assert.equal(e.matchedModel,current.modelNumber);
  assert.match(e.notes,/Existing owner/);assert.match(e.notes,/not.*independently|No independent/);
  delete current.research.listingEvidence;assert.deepEqual(current,old,id+': only listingEvidence may change');
 }
});

test('all 38 products have independently assessed dimensions; the account declaration grants no product publication or new links',()=>{
 const statuses=products.map(productVerification);
 assert.equal(statuses.length,38);assert.equal(statuses.filter(s=>s.modelDocumented).length,38);
 assert.equal(statuses.filter(s=>s.listingStatus==='owner-documented').length,15);
 assert.equal(statuses.filter(s=>s.listingStatus==='independently-verified').length,0);
 assert.equal(statuses.filter(s=>s.linkActive).length,33);assert.equal(statuses.filter(s=>s.safetyStatus==='cleared').length,4);
 assert.equal(statuses.filter(s=>s.safetyStatus==='blocked').length,2);assert.equal(statuses.filter(s=>s.editorialApproved).length,4);assert.equal(statuses.filter(s=>s.fullyApproved).length,0);
 for(const product of products){
  assert.equal(isCommerciallyApproved(product),false);assert.ok(publicationIssues(product).length);
  assert.equal(productStructuredData(product,new URL('https://apocalypsegearlab.github.io')),undefined);
  assert.equal(productSchema.safeParse({...product.data,reviewStatus:'published'}).success,false);
  const row=productVerificationAudit(product);assert.ok(row.identity.outstanding.length);assert.ok(row.editorial.outstanding.length);
  assert.equal(row.technical.unresolvedClaims.length,product.data.research!.unverifiedClaims.length);
  assert.equal(getMerchantLinks(product,false)[0]!.href,null,'Operational disable still works');
  if(row.linkActive){assert.deepEqual(row.commercial.outstanding,[]);assert.equal(row.commercial.blocker,null);}
  else{assert.ok(row.commercial.outstanding.length);assert.ok(row.commercial.blocker);}
 }
 assert.deepEqual(products.filter(p=>!productVerification(p).linkActive).map(p=>p.id).sort(),['ecoflow-river-2-pro','iniu-p62-20000mah-65w','jackery-explorer-300','kidde-c3010-co-alarm','nanuk-904-first-aid-kit'].sort());
});

test('missing, mismatched or partial evidence cannot acquire a complete-documentation or independent-listing label',()=>{
 const p=structuredClone(products.find(p=>p.id==='midland-er310')!);
 assert.equal(productVerification(p).listingStatus,'owner-documented');
 p.data.research!.listingVerified=true;
 assert.equal(productVerification(p).listingStatus,'owner-documented','An independent-verification flag cannot turn owner evidence into a live inspection');
 p.data.research!.listingEvidence!.method='live-page';assert.equal(productVerification(p).listingStatus,'independently-verified');
 p.data.research!.listingEvidence!.method='owner-document';
 p.data.research!.listingEvidence!.matchedAsin='B000000001';p.data.research!.listingVerified=true;
 assert.equal(productVerification(p).listingStatus,'not-independently-verified');assert.equal(productVerification(p).linkActive,false);
 p.data.specs[0]!.source='https://example.com/unsubstantiated';assert.equal(productVerification(p).modelDocumented,false);
 delete p.data.research;assert.equal(productVerification(p).manufacturerFacts,0);assert.equal(productVerification(p).modelDocumented,false);
});

test('even fabricated product publication flags cannot override the three ASIN-based mandatory holds',()=>{
 for(const id of ['kidde-c3010-co-alarm','iniu-p62-20000mah-65w','jackery-explorer-300']){
  const p=structuredClone(products.find(p=>p.id===id)!);p.id='renamed-'+id;
  p.data.reviewStatus='published';Object.assign(p.data.research!,{listingVerified:true,safetyStatus:'cleared',publicationApproved:true,publicationBlockers:[],affiliateReview:{...p.data.research!.affiliateReview!,decision:'link-permitted'}});
  p.data.research!.listingEvidence={url:'https://www.amazon.ca/dp/'+p.data.links.amazonCa.asin,checkedAt:'2026-10-31',method:'live-page',matchedAsin:p.data.links.amazonCa.asin!,matchedModel:p.data.modelNumber!,notes:'Synthetic regression fixture only.'};
  assert.equal(productVerification(p).linkActive,false);assert.equal(productVerification(p).fullyApproved,false);
 }
});
