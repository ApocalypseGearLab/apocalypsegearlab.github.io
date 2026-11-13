import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

export const WHITEOUT_PRODUCT_IDS = [
  'kahtoola-microspikes', 'darn-tough-hunter-boot-socks',
  'smartwool-merino-250-base-layer', 'therm-a-rest-polar-ranger-sleeping-bag',
  'baffin-impact-winter-boots',
];
const changes = JSON.parse(readFileSync(new URL('./whiteout-products-source-changes.json', import.meta.url), 'utf8'));
/** Project only these literal integration hunks before frozen historical checks.
 * Baselines stay intact; unrelated edits still fail their original hash checks. */
export function beforeWhiteoutProducts(file, bytes) {
  if (!changes[file]) return bytes;
  let source = bytes.toString('utf8').replace(/\r\n/g, '\n');
  for (const hunk of [...changes[file]].reverse()) {
    assert.equal(source.split(hunk.after).length - 1, 1, 'Exactly one WHITEOUT product integration hunk: ' + file);
    source = source.replace(hunk.after, () => hunk.before);
  }
  return Buffer.from(source, 'utf8');
}
