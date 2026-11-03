import {beforeFourUniverses} from '../scripts/four-universes-preservation.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { beforeBrandIntegration } from './branding-fixture';
import { BRAND } from '../src/config/branding';
import { schemasBeforeBrandLogo } from '../scripts/branding-preservation';

const hash = (bytes: Buffer | string) => createHash('sha256').update(bytes).digest('hex');
const manifest = JSON.parse(readFileSync('assets/brand/manifest.json', 'utf8'));
const approved = '066aec2bf0a97d6823ed6794f02d3312e14597822af2529296c7cf1fb2563ff8';

test('historical rendered-schema checks permit exactly one approved logo while retaining all previous fields', () => {
  const organization = { '@type': 'Organization', logo: 'https://apocalypsegearlab.github.io/brand/brand-logo-512.webp', name: 'Original name', url: 'https://apocalypsegearlab.github.io/', extra: 'retained' };
  const website = { '@type': 'WebSite', name: 'Original site' };
  assert.deepEqual(schemasBeforeBrandLogo('/',[organization,website]),[{ '@type': 'Organization', name: organization.name, url: organization.url, extra: organization.extra },website]);
  assert.throws(()=>schemasBeforeBrandLogo('/',[{...organization,logo:'https://other.example/image.png'},website]));
  assert.throws(()=>schemasBeforeBrandLogo('/',[organization,organization,website]));
  assert.deepEqual(schemasBeforeBrandLogo('/gear/',[website]),[website]);
});

test('the official emblem master stays exactly as supplied and every recorded asset has consistent bytes and geometry', async () => {
  assert.equal(manifest.sourceSha256, approved);
  assert.equal(hash(readFileSync('assets/brand/brand-logo-master.png')), approved);
  assert.equal(manifest.assets.length, 8);
  for (const asset of manifest.assets) {
    const bytes = readFileSync(asset.file);
    assert.equal(bytes.length, asset.bytes);
    assert.equal(hash(bytes), asset.sha256, asset.file);
    const metadata = await sharp(bytes).metadata();
    assert.equal(metadata.width, asset.width); assert.equal(metadata.height, asset.height);
    assert.equal(metadata.width, metadata.height); assert.equal(metadata.hasAlpha, false);
    if (asset.url) assert.equal(asset.file, `public${asset.url}`);
  }
  assert.equal(manifest.assets[0].width, 1254);
  for (const path of [BRAND.logo, BRAND.schemaLogo, ...BRAND.srcset.split(', ').map(candidate => candidate.split(' ')[0])]) assert.ok(manifest.assets.some((asset: {url: string}) => asset.url === path));
});

test('every derivative preserves the complete source canvas and resampled colours without masks or geometry edits', async () => {
  for (const asset of manifest.assets.filter((asset: {url: string}) => asset.url)) {
    const expected = await sharp('assets/brand/brand-logo-master.png').resize(asset.width, asset.height, { kernel: 'lanczos3' }).raw().toBuffer();
    const actual = await sharp(asset.file).raw().toBuffer();
    assert.equal(actual.length, expected.length);
    // A one-level allowance covers cross-platform SIMD rounding only. Lossless
    // encoding must not introduce palette/chroma loss, crops or background edits.
    assert.ok(actual.every((value, index) => Math.abs(value - expected[index]!) <= 1), asset.file);
  }
});

test('historical source normalization permits only the exact authorized icon/schema edits', () => {
  const baseline = JSON.parse(readFileSync('docs/qa/phase6-1/preservation.json','utf8'));
  for (const file of ['src/layouts/BaseLayout.astro','src/pages/index.astro']) {
    const bytes = Buffer.from(readFileSync(file).toString('latin1').replace(/\r\n/g,'\n'),'latin1');
    const row = baseline.files.find((row: {file: string}) => row.file === file);
    assert.equal(hash(beforeBrandIntegration(file,beforeFourUniverses(file,bytes))),row.sha256);
    assert.notEqual(hash(beforeBrandIntegration(file,Buffer.concat([bytes,Buffer.from('\n<!-- unrelated edit -->')]))),row.sha256);
  }
  const layout=readFileSync('src/layouts/BaseLayout.astro').toString('latin1').replace(/\r\n/g,'\n');
  assert.throws(()=>beforeBrandIntegration('src/layouts/BaseLayout.astro',Buffer.from(layout.replace('favicon-32.png','other.png'),'latin1')));
});

test('branding preserves the merged mega-menu implementation and shared catalogue behavior', () => {
  const baseline = JSON.parse(readFileSync('docs/qa/branding/preservation.json','utf8'));
  assert.equal(baseline.baseCommit,'00af8b6dc543619981a4646331f08688933d4c9e');
  const source=readFileSync('src/components/Header.astro','utf8').replace(/\r\n/g,'\n');
  assert.equal(hash(source.split('<script>')[1]!.split('</script>')[0]!),baseline.navigationScriptSha256);
  for (const row of baseline.files) assert.equal(hash(beforeFourUniverses(row.file,readFileSync(row.file))),row.sha256,row.file);
});
