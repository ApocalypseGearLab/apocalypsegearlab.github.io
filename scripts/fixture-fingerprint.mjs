import { createHash } from 'node:crypto';
import { readFileSync, readdirSync } from 'node:fs';

export function affiliateFixtureFingerprint() {
  const hash = createHash('sha256');
  const paths = ['package.json', 'astro.config.mjs', ...['src', 'scripts'].flatMap(root => readdirSync(root, { recursive: true }).filter(name => /\.(astro|ts|mjs|json|css)$/.test(name)).map(name => `${root}/${name}`))].sort();
  for (const path of paths) hash.update(path).update(readFileSync(path));
  return hash.digest('hex');
}
