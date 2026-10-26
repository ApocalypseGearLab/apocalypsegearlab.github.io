import assert from 'node:assert/strict';
import sharp from 'sharp';
import { readFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const manifest = JSON.parse(await readFile('src/data/media/manifest.json', 'utf8'));
const sources = JSON.parse(await readFile('scripts/image-sources.json', 'utf8'));
const review = JSON.parse(await readFile('src/data/media/review.json', 'utf8'));
assert.equal(review.rightsStatus, 'pending-owner-confirmation');
assert.equal(review.assets.hero.rightsStatus, 'confirmed-by-owner');
assert.equal(review.assets.hero.confirmedAt, '2026-10-25');
assert.ok(review.assets.hero.provenance.includes('without reproducing a third-party photograph'));
assert.deepEqual(Object.entries(review.assets).filter(([, value]) => value.accuracyStatus === 'rejected').map(([id]) => id), ['jackery-explorer-300']);
const expected = ['ecoflow-river-2-pro', 'fenix-cl26r-pro', 'iniu-p62-20000mah-65w', 'jackery-explorer-1000-v2', 'jackery-explorer-300', 'jackery-solarsaga-100w-air', 'kidde-c3010-co-alarm', 'midland-er310'];
assert.deepEqual(manifest.assets.filter((asset) => asset.id !== 'hero').map((asset) => asset.id).sort(), expected);
assert.equal(manifest.assets.filter((asset) => asset.id === 'hero').length, 1);
assert.equal(new Set(manifest.assets.map((asset) => asset.original.sha256)).size, 9);
const paths = new Set();
for (const asset of manifest.assets) {
  const source = sources.find((source) => source.id === asset.id);
  assert.ok(source);
  for (const key of ['source', 'basename', 'alt', 'identityNote']) assert.equal(asset[key], source[key]);
  assert.match(asset.alt, /^AI-assisted illustration of /);
  assert.equal(asset.kind, 'ai-assisted-illustration');
  assert.equal(asset.rightsStatus, asset.id === 'hero' ? 'confirmed-by-owner' : 'pending-owner-confirmation');
  assert.equal(asset.modelVerified, false);
  if (asset.id !== 'hero') {
    const product = JSON.parse(await readFile(`src/data/products/${asset.id}.json`, 'utf8'));
    assert.equal(product.reviewStatus, 'draft');
    assert.equal(product.research.listingVerified, false);
    assert.equal(product.research.publicationApproved, false);
    assert.notEqual(product.research.safetyStatus, 'cleared');
    assert.deepEqual(asset.variants.map((variant) => variant.width), [480, 960]);
  } else assert.deepEqual(asset.variants.map((variant) => variant.width), [768, 1280, 1672]);
  for (const variant of asset.variants) {
    const rejected = review.assets[asset.id]?.accuracyStatus === 'rejected';
    if (rejected) {
      assert.equal(variant.src, null);
      assert.match(variant.file, /^assets\/rejected\/blackout\/[a-z0-9-]+-\d+\.webp$/);
    } else {
      assert.match(variant.src, /^\/images\/[a-z0-9-]+-\d+\.webp$/);
      assert.equal(variant.file, `public${variant.src}`);
      assert.ok(!paths.has(variant.src)); paths.add(variant.src);
    }
    const bytes = await readFile(variant.file);
    const metadata = await sharp(bytes).metadata();
    assert.equal(metadata.format, 'webp');
    assert.equal(metadata.width, variant.width); assert.equal(metadata.height, variant.height);
    assert.equal(bytes.length, variant.bytes);
    assert.equal(createHash('sha256').update(bytes).digest('hex'), variant.sha256);
    assert.ok(!metadata.exif && !metadata.xmp && !metadata.icc);
    assert.ok(variant.width <= asset.original.width && variant.height <= asset.original.height);
    assert.ok(bytes.length < asset.original.bytes);
    assert.equal(variant.quality, 83);
    if (asset.id !== 'hero') { assert.equal(variant.width, variant.height); assert.ok(bytes.length < 250_000); }
    // Decode pixels too: a correct header alone does not establish a valid asset.
    await sharp(bytes).raw().toBuffer();
  }
}
assert.deepEqual((await readdir('public/images')).sort(), [...paths].map((path) => path.slice('/images/'.length)).sort());
assert.equal(paths.size, 17);
assert.equal((await readdir('assets/rejected/blackout')).length, 2);
console.log(`Verified 9 source mappings, 17 WebP source assets and 2 rejected files; dimensions, hashes, metadata, rights and draft controls passed. Delivery permissions are checked against dist by test:site.`);
