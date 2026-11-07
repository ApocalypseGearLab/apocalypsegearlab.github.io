import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import { beforeWhiteoutPhase2 } from './whiteout-phase2-preservation.mjs';
const changes = JSON.parse(readFileSync(new URL('../docs/qa/bilingual/source-changes.json', import.meta.url), 'utf8'));
/** Historical projections reverse only the exact bilingual integration hunks.
 * Appending or editing unrelated content still fails the pinned older baselines. */
export function beforeBilingualIntegration(file, bytes) {
  bytes = beforeWhiteoutPhase2(file, bytes);
  if (!changes[file]) return bytes;
  let source = bytes.toString('latin1').replace(/\r\n/g, '\n');
  for (const change of [...changes[file]].reverse()) {
    const after = Buffer.from(change.after).toString('latin1');
    assert.equal(source.split(after).length - 1, 1, 'Exactly one bilingual integration hunk: ' + file);
    source = source.replace(after, Buffer.from(change.before).toString('latin1'));
  }
  return Buffer.from(source, 'latin1');
}
