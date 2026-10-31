import test from 'node:test';
import assert from 'node:assert/strict';
import{readFileSync}from'node:fs';
import{createHash}from'node:crypto';
import{isCanadianPurchaseLink,getMerchantLinks}from'../src/lib/affiliate';
import{affiliateClickParameters,sourceClickParameters}from'../src/lib/affiliate-analytics';
import type{Product}from'../src/lib/products';
import{CONVERSION_INTEGRATION_FILES}from'./conversion-fixture';

test('conversion changes preserve all product data, release/SEO/account policy, Google configuration, artwork and home/navigation',()=>{
 const baseline=JSON.parse(readFileSync('docs/qa/phase5-2/baseline.json','utf8'));
 assert.equal(baseline.baseCommit,'bbf591cdcf8188374a5e979826bf64e948fda3e2');assert.equal(baseline.capturedBeforeImplementation,true);
 for(const row of baseline.files){if(row.file===`src/pages/images/blackout/[file].webp.ts`)continue; // Phase 5.3 responsive route; production validation checks every old and new variant byte.
if(row.file==='src/data/media/imported-manifest.json')continue; // Phase 5.3 append-only manifest covered by phase53.test.ts.
assert.ok(!CONVERSION_INTEGRATION_FILES.has(row.file));const b=readFileSync(row.file);assert.equal(createHash('sha256').update(row.normaliseNewlines?b.toString('utf8').replace(/\r\n/g,'\n'):b).digest('hex'),row.sha256,row.file);}
 assert.deepEqual(new Set(baseline.allowedIntegrationFiles),new Set([...CONVERSION_INTEGRATION_FILES].filter(f=>f.startsWith('src/'))));
});

test('the purchase display guard accepts only canonical Canadian affiliate destinations, never documentary/US/partner controls',()=>{
 const valid={key:'amazon-ca',marketplace:'ca' as const,merchant:'Amazon.ca',label:'View on Amazon.ca',href:'https://www.amazon.ca/dp/B09214DLJ6?tag=apocalypsegear-20'};
 assert.equal(isCanadianPurchaseLink(valid),true);
 for(const href of [null,'https://www.morakniv.com/en/products/garberg-survival-kit-c','https://www.walmart.ca/','https://www.amazon.com/dp/B09214DLJ6?tag=apocalypsegear-20',valid.href.replace('apocalypsegear-20','other-20'),valid.href+'&tag=apocalypsegear-20',valid.href.replace('www.amazon.ca','amazon.ca.evil.example'),valid.href+'#fragment'])assert.equal(isCanadianPurchaseLink({...valid,href}),false);
 assert.equal(isCanadianPurchaseLink({...valid,key:'partner-example'}),false);assert.equal(isCanadianPurchaseLink({...valid,marketplace:'us'}),false);
 const held={id:'kidde-c3010-co-alarm',data:JSON.parse(readFileSync('src/data/products/kidde-c3010-co-alarm.json','utf8'))}as Product;
 assert.equal(isCanadianPurchaseLink(getMerchantLinks(held)[0]!),false);
});

test('affiliate placement and canonical product name enrich the existing event without page query data',()=>{
 const result=affiliateClickParameters({href:'https://www.amazon.ca/dp/B09214DLJ6?tag=apocalypsegear-20',productId:'morakniv-garberg-blackblade-carbon-survival-kit',productName:'Morakniv Garberg',placement:'profile-summary',merchant:'amazon-ca',marketplace:'ca'},'https://apocalypsegearlab.github.io/gear/?email=private#private');
 assert.equal(result?.cta_placement,'profile-summary');assert.equal(result?.product_name,'Morakniv Garberg');assert.equal(result?.page_location,'https://apocalypsegearlab.github.io/gear/');
 const invalid=affiliateClickParameters({href:'https://www.amazon.ca/dp/B09214DLJ6?tag=apocalypsegear-20',productId:'morakniv',placement:'untrusted-placement',merchant:'amazon-ca',marketplace:'ca'},'https://apocalypsegearlab.github.io/');assert.ok(invalid);assert.equal(invalid.cta_placement,undefined);
});

test('source reference events are distinct, constrained and exclude destination/page query strings and fragments',()=>{
 const source={href:'https://www.morakniv.com/en/products/garberg-survival-kit-c?email=private#private',productId:'morakniv-garberg-blackblade-carbon-survival-kit',sourceId:'manufacturer',sourceKind:'manufacturer'};
 const params=sourceClickParameters(source,'https://apocalypsegearlab.github.io/gear/?email=private#private');
 assert.deepEqual(params,{product_id:source.productId,source_id:'manufacturer',source_kind:'manufacturer',destination_url:'https://www.morakniv.com/en/products/garberg-survival-kit-c',page_location:'https://apocalypsegearlab.github.io/gear/'});
 assert.equal(affiliateClickParameters({...source,merchant:'manufacturer',marketplace:'other'},'https://apocalypsegearlab.github.io/'),undefined);
 for(const override of [{href:'http://example.com/'},{href:'javascript:alert(1)'},{href:'https://user:pass@example.com/'},{href:'https://apocalypsegearlab.github.io/gear/'},{sourceKind:'purchase'},{sourceId:''},{productId:'private@example.com'}])assert.equal(sourceClickParameters({...source,...override},'https://apocalypsegearlab.github.io/'),undefined);
});
