import { beforeBilingualIntegration } from './bilingual-preservation.mjs';
import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
import { imagesBeforeWhiteoutPhase2 } from './whiteout-phase2-preservation.mjs';
const changes=JSON.parse(readFileSync(new URL('../docs/qa/four-universes/source-changes.json',import.meta.url),'utf8'));
/** Reverse only reviewed, exact source hunks; preserve all other bytes. */
export function beforeFourUniverses(file, bytes) {
 bytes = beforeBilingualIntegration(file, bytes);
 if(!changes[file]) return bytes;
 let source=bytes.toString('latin1').replace(/\r\n/g,'\n');
 for(const change of [...(changes[file]??[])].reverse()){
  const after=Buffer.from(change.after).toString('latin1');
  assert.equal(source.split(after).length-1,1,'Exactly one authorized source hunk: '+file);
  source=source.replace(after,Buffer.from(change.before).toString('latin1'));
 }
 return Buffer.from(source,'latin1');
}
export function imagesBeforeFourUniverses(path,images){
 images = imagesBeforeWhiteoutPhase2(path, images);
 const added=new Set(['/images/whiteout/therm-a-rest-neoair-xtherm-nxt-whiteout.webp','/images/whiteout/therm-a-rest-neoair-xtherm-nxt-whiteout-640.webp']);
 const sectors=['blackout','fallout','outbreak','whiteout'];
 const scenes=new Set(path==='/'?sectors.map(id=>`/images/universes/${id}-survival-hero-768.webp`):sectors.filter(id=>path===`/${id}/`).map(id=>`/images/universes/${id}-survival-hero-1280.webp`));
 return images.filter(img=>!scenes.has(img.src??'')&&!(path==='/gear/'&&added.has(img.src??'')));
}
export function schemasBeforeFourUniverses(path,schemas){
 return schemas.filter(schema=>!(['/blackout/','/fallout/','/outbreak/'].includes(path)&&schema['@type']==='CollectionPage'));
}
