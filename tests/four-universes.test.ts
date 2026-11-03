import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {beforeFourUniverses} from '../scripts/four-universes-preservation.mjs';
import {UNIVERSE_IDS,categoryUniverse} from '../src/config/taxonomy';
import {productSchema} from '../src/lib/product-schema';
import {getMerchantLinks} from '../src/lib/affiliate';
import {productStructuredData} from '../src/lib/product-seo';
import type {Product} from '../src/lib/products';
const hash=(b:Buffer)=>createHash('sha256').update(b).digest('hex');
test('four-universe integration preserves every earlier product, media, brand and tracking byte with exact source projections',()=>{
 assert.equal(hash(readFileSync('docs/qa/four-universes/source-changes.json')),'f546b7c938bb91b91d9b1f2d8eb2df61d90620f07159674f1d1103fac64d1e48','Only the reviewed exact source hunks may be projected');
 const before=JSON.parse(readFileSync('docs/qa/four-universes/before.json','utf8'));
 assert.equal(before.baseCommit,'0cde9ab7cf4cf7aae1d39eff7c989cdb7a212145');
 assert.equal(before.files.filter((r:any)=>r.file.startsWith('src/data/products/')&&!r.file.includes('template')).length,46);
 for(const row of before.files){let bytes=readFileSync(row.file);if(row.normaliseNewlines)bytes=Buffer.from(bytes.toString('latin1').replace(/\r\n/g,'\n'),'latin1');assert.equal(hash(beforeFourUniverses(row.file,bytes)),row.sha256,row.file);}
 for(const file of ['src/config/taxonomy.ts','src/components/Header.astro','src/layouts/BaseLayout.astro']){
  const original=readFileSync(file);const modified=Buffer.concat([original,Buffer.from('\nUNRELATED CHANGE')]);
  assert.notEqual(hash(beforeFourUniverses(file,modified)),hash(beforeFourUniverses(file,original)));
 }
 const binary=Buffer.from([137,80,13,10,255]);assert.deepEqual(beforeFourUniverses('test.webp',binary),binary);
});
test('WHITEOUT identity, held ASIN and no commercial schema survive integration',()=>{
 assert.deepEqual(UNIVERSE_IDS,['blackout','fallout','outbreak','whiteout']);
 assert.equal(categoryUniverse('winter-sleep-systems'),'whiteout');
 const data=productSchema.parse(JSON.parse(readFileSync('src/data/products/therm-a-rest-neoair-xtherm-nxt-review.json','utf8')));
 const p={id:'therm-a-rest-neoair-xtherm-nxt-review',data}as Product;
 assert.equal(data.links.amazonCa.asin,'B0CS4P19QQ');assert.equal(data.links.amazonCa.url,'https://www.amazon.ca/dp/B0CS4P19QQ?tag=apocalypsegear-20');
 assert.equal(data.research?.affiliateReview?.decision,'hold');assert.equal(data.research?.listingVerified,false);assert.equal(data.research?.publicationApproved,false);
 assert.equal(getMerchantLinks(p)[0]!.href,null);assert.equal(productStructuredData(p,new URL('https://apocalypsegearlab.github.io')),undefined);
 for(const spec of data.specs)assert.equal(spec.source,'https://cascadedesigns.com/products/neoair-xtherm-nxt-sleeping-pad');
});
