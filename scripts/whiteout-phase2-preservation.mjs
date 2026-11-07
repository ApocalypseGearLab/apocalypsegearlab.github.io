import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
const changes = JSON.parse(readFileSync(new URL('../docs/qa/whiteout-phase2/source-changes.json', import.meta.url), 'utf8'));
const cardCleanup = JSON.parse(readFileSync(new URL('../docs/qa/whiteout-card-cleanup/source-changes.json', import.meta.url), 'utf8'));
const globalCardLabels = JSON.parse(readFileSync(new URL('../docs/qa/global-card-labels/source-changes.json', import.meta.url), 'utf8'));
/** Reverse only reviewed Phase 2 hunks before older frozen baseline checks.
 * Unrelated edits outside a hunk survive projection; edits inside it fail closed. */
export function beforeWhiteoutPhase2(file, bytes) {
  for (const reviewed of [globalCardLabels, cardCleanup]) if (reviewed[file]) {
    let source = bytes.toString('utf8').replace(/\r\n/g, '\n');
    for (const change of [...reviewed[file]].reverse()) {
      assert.equal(source.split(change.after).length - 1, 1, 'Exactly one reviewed product-card hunk: ' + file);
      source = source.replace(change.after, change.before);
    }
    bytes = Buffer.from(source, 'utf8');
  }
  if (!changes[file]) return bytes;
  let source = bytes.toString('latin1').replace(/\r\n/g, '\n');
  for (const change of [...changes[file]].reverse()) {
    const after = Buffer.from(change.after).toString('latin1');
    assert.equal(source.split(after).length - 1, 1, 'Exactly one reviewed WHITEOUT Phase 2 hunk: ' + file);
    source = source.replace(after, Buffer.from(change.before).toString('latin1'));
  }
  return Buffer.from(source, 'latin1');
}
export const WHITEOUT_PHASE2_IDS = [
  'outdoor-research-alti-ii-gore-tex-mitts', 'hestra-army-leather-heli-ski-gloves',
  'oakley-flight-deck-m-goggles', 'smartwool-nts-250-balaclava',
  'smartwool-thermal-merino-reversible-cuffed-beanie',
];
export function imagesBeforeWhiteoutPhase2(path, images) {
  if (!['/gear/', '/whiteout/', '/gear/therm-a-rest-neoair-xtherm-nxt-review/'].includes(path)) return images;
  const added = new Set(WHITEOUT_PHASE2_IDS.flatMap(id => [480, 960, 1254].map(width => `/images/whiteout/${id}-whiteout${width === 1254 ? '' : '-' + width}.webp`)));
  return images.filter(image => !added.has(image.src ?? ''));
}
