import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const changes = JSON.parse(readFileSync(new URL('../docs/qa/oracle/source-changes.json', import.meta.url), 'utf8'));
/** Reverse only the exact metadata integration hunks before historical checks.
 * Baselines are retained; unrelated edits still fail their pinned hashes. */
export function beforeOracleIntegration(file, bytes) {
  if (!changes[file]) return bytes;
  let source = bytes.toString('latin1').replace(/\r\n/g, '\n');
  for (const change of [...changes[file]].reverse()) {
    const after = Buffer.from(change.after).toString('latin1');
    assert.equal(source.split(after).length - 1, 1, 'Exactly one ORACLE metadata hunk: ' + file);
    source = source.replace(after, Buffer.from(change.before).toString('latin1'));
  }
  return Buffer.from(source, 'latin1');
}
