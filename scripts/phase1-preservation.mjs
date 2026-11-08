import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const changes=JSON.parse(readFileSync(new URL('../docs/phase1-hardening/evidence/source-changes.json',import.meta.url),'utf8'));
const responsive=JSON.parse(readFileSync(new URL('../src/data/media/responsive-imported-manifest.json',import.meta.url),'utf8'));
/** Undo only the reviewed Phase1 privacy/media hunks before historical contracts.
 * Every original product, safety/publication policy and asset hash remains protected. */
export function beforePhase1(file,bytes){
 if(!changes[file])return bytes;
 return Buffer.from(restoreReviewedHunks(bytes.toString('utf8').replace(/\r\n/g,'\n'),changes[file],file),'utf8');
}
/** Restore reviewed text literally, including JavaScript replacement metacharacters. */
export function restoreReviewedHunks(source,hunks,file){
 for(const change of [...hunks].reverse()){
  assert.equal(source.split(change.after).length-1,1,'Exactly one reviewed Phase1 hunk: '+file);
  source=source.replace(change.after,()=>change.before);
 }
 return source;
}
/** Normalize only exact approved responsive candidate changes in historical snapshots. */
export function imagesBeforePhase1(images){
 return images.map(image=>{
  const entry=responsive.assets.find(asset=>asset.variants.some(v=>v.src===image.src));
  if(!entry)return image;
  const original=entry.variants.at(-1);
  const value={...image,src:original.src};
  if(Object.hasOwn(image,'srcset')){
   assert.equal(image.srcset,entry.variants.map(v=>v.src+' '+v.width+'w').join(', '),'Only reviewed srcset additions may be projected');
   value.srcset=original.src+' '+original.width+'w';
  }
  return value;
 });
}
