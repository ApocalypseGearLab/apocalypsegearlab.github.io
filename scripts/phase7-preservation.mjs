import assert from 'node:assert/strict';

/** @satisfies {Record<string, [string,string,string,string]>} */
export const PHASE7 = {
 'vortex-diamondback-hd-10x42-review':['B0GQCTM4DH','optics-observation','outbreak','vortex-diamondback-hd-10x42-outbreak'],
 'garrett-pro-pointer-at-review':['B00TADH9HA','metal-detection','fallout','garrett-pro-pointer-at-fallout'],
 'gq-gmc-600-pro-review':['B0FHGKCT8D','radiation-detection','fallout','gq-gmc-600-pro-fallout'],
 'fenix-pd36r-pro-review':['B0H7DDGK7V','lighting','blackout','fenix-pd36r-pro-blackout'],
 'motorola-talkabout-t802-review':['B0CVCK57CR','backup-comms','blackout','motorola-talkabout-t802-blackout'],
};

/** Undo exactly the append operation, retaining all earlier source bytes.
 * No baseline is refreshed; changes to any old manifest entry still fail. */
export function beforePhase7Integration(file, bytes) {
 let source=bytes.toString('latin1');
 if(file==='src/data/media/imported-manifest.json'){
  const manifest=JSON.parse(source);
  assert.equal(manifest.assets.length,46);
  assert.deepEqual(manifest.assets.slice(41).map(a=>a.productId),Object.keys(PHASE7));
  // Parse strings as UTF-8 for the append block, then compare their actual bytes.
  // Latin-1 keeps all bytes of the original prefix, including non-ASCII text.
  const utf8=JSON.parse(bytes.toString('utf8'));
  const tail=',\n'+utf8.assets.slice(41).map(a=>JSON.stringify(a,null,2).split('\n').map(line=>'    '+line).join('\n')).join(',\n')+'\n  ]\n}\n';
  const encoded=Buffer.from(tail).toString('latin1');
  assert.ok(source.endsWith(encoded),'Manifest must contain only the exact appended suffix');
  source=source.slice(0,-encoded.length)+'\n  ]\n}\n';
 }
 if(file==='src/config/taxonomy.ts'){
  for(const line of ["  { id: 'optics-observation', label: 'Optics & observation', universe: 'outbreak' },\n","  { id: 'metal-detection', label: 'Exploration & metal detection', universe: 'fallout' },\n"]){
   assert.equal(source.split(line).length-1,1,'Exactly one approved category addition');
   source=source.replace(line,'');
  }
 }
 return Buffer.from(source,'latin1');
}

/** Historical collection snapshots retain every previous image attribute/order.
 * Only exact new URLs, in their catalogue or assigned sector, may be projected. */
export function imagesBeforePhase7(path, images) {
 const allowed=new Set(Object.values(PHASE7).filter(([, , sector])=>path==='/gear/'||path===`/${sector}/`).flatMap(([, , sector, stem])=>[480,960,1254].map(width=>`/images/${sector}/${stem}${width===1254?'':'-'+width}.webp`)));
 return images.filter(img=>!allowed.has(img.src??''));
}
