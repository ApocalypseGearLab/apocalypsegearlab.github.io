import assert from 'node:assert/strict';
import {readFileSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import sharp from 'sharp';

// Uses the established imported-manifest delivery paths and three-size encoding.
// Rebuild only these five assets from preserved, hash-pinned owner PNG masters.
const config=JSON.parse(readFileSync('assets/media/phase7-sources.json','utf8'));
const file='src/data/media/imported-manifest.json';
const manifest=JSON.parse(readFileSync(file,'utf8'));
const before=JSON.parse(readFileSync('docs/qa/phase7/before.json','utf8')).manifest;
const check=process.argv.includes('--check');
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
const ids=new Set(config.assets.map(a=>a.productId));
assert.equal(ids.size,5);
assert.deepEqual({...manifest,assets:manifest.assets.filter(a=>!ids.has(a.productId))},before,'All earlier manifest entries and provenance must be unchanged');
const entries=[],rows=['product_id,asin,source,output,width,height,sha256'];
const deliver=(target,bytes)=>{if(check)assert.deepEqual(readFileSync(target),bytes,'Reproducible encoding: '+target);else writeFileSync(target,bytes);};
for(const definition of config.assets){
 const bytes=readFileSync(definition.master),info=await sharp(bytes).metadata();
 assert.equal(hash(bytes),definition.sourceSha256,'Owner master changed');
 assert.equal(info.format,'png');assert.equal(info.width,1254);assert.equal(info.height,1254);
 const product=JSON.parse(readFileSync(`src/data/products/${definition.productId}.json`,'utf8'));
 const variants=[];
 for(const width of [480,960,1254]){
  const name=definition.id+(width===1254?'':'-'+width)+'.webp';
  const target=`assets/media/${definition.category}/${name}`;
  const data=await sharp(bytes).resize(width,width,{fit:'inside',withoutEnlargement:true}).webp({quality:85,effort:6}).toBuffer();
  deliver(target,data);
  variants.push({file:target,src:`/images/${definition.category}/${name}`,width,height:width,bytes:data.length,sha256:hash(data)});
  rows.push([definition.productId,product.links.amazonCa.asin,definition.sourceOriginalName,target.replace('assets/media/',''),width,width,hash(data)].join(','));
 }
 const full=variants.at(-1);
 entries.push({id:definition.id,category:definition.category,productId:definition.productId,usage:'current-product',sourceOriginalName:definition.sourceOriginalName,file:full.file,deliverySrc:full.src,width:1254,height:1254,bytes:full.bytes,sha256:full.sha256,variants,alt:product.image.alt,captionNote:definition.captionNote,rightsStatus:'confirmed-by-owner',accuracyStatus:'reviewed-illustration',reviewNote:definition.reviewNote,references:definition.references,reviewedAt:config.confirmedAt,provenance:{source:'Owner Phase 7 work order explicitly approves and directs integration of these five supplied illustrations.',scope:config.scope,confirmedAt:config.confirmedAt},source:{filename:definition.sourceOriginalName,file:definition.master,bytes:bytes.length,width:info.width,height:info.height,sha256:hash(bytes)},encoding:config.encoding,mappingCsv:'assets/media/phase7-image-manifest.csv'});
}
deliver('assets/media/phase7-image-manifest.csv',Buffer.from(rows.join('\n')+'\n'));
deliver(file,Buffer.from(JSON.stringify({...before,assets:[...before.assets,...entries]},null,2)+'\n'));
console.log(`${check?'Verified':'Built'} 15 deterministic WebPs from five unchanged PNG masters; all 41 previous manifest entries preserved.`);
