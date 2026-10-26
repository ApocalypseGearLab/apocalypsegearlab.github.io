import { existsSync, readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { affiliateFixtureFingerprint } from './fixture-fingerprint.mjs';

const root = '.tools/qa/phase4/affiliate-';
const stamp = root + 'fixture-source.txt';
const current = affiliateFixtureFingerprint();
if (!['active-fixture.html','pending-fixture.html','fixture-source.txt'].every(name => existsSync(root + name)) || readFileSync(stamp,'utf8') !== current) {
  console.log('Preparing current Astro affiliate component fixtures; production configuration is restored afterwards.');
  const result = spawnSync(process.execPath, ['scripts/verify-products.mjs'], { stdio: 'inherit' });
  if (result.status !== 0) process.exit(result.status ?? 1);
}
