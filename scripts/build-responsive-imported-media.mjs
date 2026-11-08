import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import sharp from 'sharp';
import { canPublishImportedAsset } from '../src/lib/imported-media-policy.mjs';
const source=JSON.parse(await readFile('src/data/media/imported-manifest.json','utf8'));
// The reviewed audit identified these existing single-candidate illustrations.
const ids=[
  "ecoflow-river-2-pro-power-station-blackout",
  "fenix-hm50r-v2-headlamp-blackout",
  "fenix-cl26r-pro-camping-lantern-blackout",
  "jackery-explorer-1000-v2-power-station-blackout",
  "kidde-c3010-carbon-monoxide-alarm-blackout",
  "leatherman-wave-plus-multitool-fallout",
  "iniu-p62-20000mah-power-bank-blackout",
  "jackery-solarsaga-100w-air-solar-panel-blackout",
  "midland-er310-emergency-radio-blackout",
  "nanuk-904-first-aid-kit-fallout",
  "sawyer-squeeze-sp129-water-filter-fallout",
  "reliance-aqua-tainer-7-gallon-water-container-fallout",
  "sol-emergency-bivvy-survival-shelter-fallout"
];
const check=process.argv.includes('--check');
const hash=b=>createHash('sha256').update(b).digest('hex');
const deliver=async(file,bytes)=>{if(check){assert.deepEqual(await readFile(file),bytes,'Reproducible responsive media: '+file);return;}try{const existing=await readFile(file);assert.deepEqual(existing,bytes,'Refusing to overwrite unrelated media: '+file);}catch(error){if(error.code!=='ENOENT')throw error;await writeFile(file,bytes,{flag:'wx'});}};
const selected=ids.map(id=>{const asset=source.assets.find(a=>a.id===id);assert.ok(asset&&canPublishImportedAsset(asset),id+': existing rights/accuracy approval required');assert.ok(!asset.variants,id+': scope must remain the13 audited single-candidate images');return asset;});
assert.equal(new Set(ids).size,13);
const assets=[];
for(const asset of selected){
 const id=asset.id;
 const original=await readFile(asset.file),info=await sharp(original).metadata();assert.equal(hash(original),asset.sha256);assert.equal(original.length,asset.bytes);assert.equal(info.width,1254);assert.equal(info.height,1254);
 const variants=[];
 for(const width of [480,960]){const file=asset.file.replace(/\.webp$/,'-'+width+'.webp');const src=asset.deliverySrc.replace(/\.webp$/,'-'+width+'.webp');const data=await sharp(original).resize({width,height:width,fit:'inside',withoutEnlargement:true}).webp({quality:83,effort:6}).toBuffer();await deliver(file,data);variants.push({file,src,width,height:width,bytes:data.length,sha256:hash(data)});}
 variants.push({file:asset.file,src:asset.deliverySrc,width:asset.width,height:asset.height,bytes:asset.bytes,sha256:asset.sha256});
 assets.push({id,productId:asset.productId,source:{file:asset.file,sha256:asset.sha256,bytes:asset.bytes,width:asset.width,height:asset.height},encoding:{format:'webp',quality:83,effort:6,crop:false,recolor:false},variants});
}
const manifest=Buffer.from(JSON.stringify({version:1,scope:'Responsive derivatives of13 existing owner-approved imported illustrations; original artwork and all identity/rights records remain authoritative and unchanged.',assets},null,2)+'\n');
const target='src/data/media/responsive-imported-manifest.json';if(check)assert.deepEqual(await readFile(target),manifest);else await writeFile(target,manifest);
console.log(JSON.stringify({mode:check?'verified':'built',assets:assets.length,newVariants:assets.length*2,originalBytes:assets.reduce((n,a)=>n+a.source.bytes,0),bytes480:assets.reduce((n,a)=>n+a.variants[0].bytes,0),bytes960:assets.reduce((n,a)=>n+a.variants[1].bytes,0)},null,2));
