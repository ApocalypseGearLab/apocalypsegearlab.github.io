import assert from 'node:assert/strict';
import sharp from 'sharp';
import { readFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { canPublishImportedAsset } from '../src/lib/imported-media-policy.mjs';

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
    // Media permissions must not freeze independent product approval states.
    assert.match(product.links.amazonCa.asin, /^[A-Z0-9]{10}$/);
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
console.log(`Verified 9 source mappings, 17 WebP source assets and 2 rejected files; dimensions, hashes, metadata, rights and source mapping controls passed. Delivery permissions are checked against dist by test:site.`);

const supplied=JSON.parse(await readFile('src/data/media/imported-manifest.json','utf8'));
assert.equal(supplied.provenance.status,'confirmed-by-owner');
assert.equal(supplied.assets.length,34);
assert.equal(supplied.assets.filter(asset=>asset.productId).length,34);
assert.equal(supplied.assets.filter(canPublishImportedAsset).length,33);
assert.equal(supplied.assets.filter(asset=>asset.category==='fallout').length,10);
assert.equal(supplied.assets.filter(asset=>asset.category==='blackout').length,9);
assert.equal(supplied.assets.filter(asset=>asset.category==='outbreak').length,15);
assert.equal(new Set(supplied.assets.map(asset=>asset.sha256)).size,34);
assert.equal(new Set(supplied.assets.filter(asset=>asset.productId).map(asset=>asset.productId)).size,34);
const productIds = (await readdir('src/data/products')).filter(file => file.endsWith('.json') && file !== 'template-product.json').map(file => file.replace(/\.json$/, ''));
assert.equal(productIds.length,34);
assert.deepEqual(productIds.filter(id=>!supplied.assets.some(asset=>asset.productId===id)),[],'Every product maps to its distinct artwork record; Explorer 300 remains rejected');
const csv=await readFile(supplied.csv,'utf8');
for(const asset of supplied.assets){
  assert.match(asset.file,/^assets\/media\/(blackout|fallout|outbreak)\/[a-z0-9-]+\.webp$/);
  assert.equal(asset.deliverySrc,asset.file.replace('assets/media/','/images/'));
  const mappingCsv=asset.mappingCsv ? await readFile(asset.mappingCsv,'utf8') : asset.replacement ? await readFile(asset.replacement.reviewCsv,'utf8') : csv;
  assert.ok(mappingCsv.includes(asset.file.replace('assets/media/','')));
  if(asset.replacement){
    const previous=asset.replacement.previous;
    const archived=await readFile(previous.file);
    assert.equal(archived.length,previous.bytes);
    assert.equal(createHash('sha256').update(archived).digest('hex'),previous.sha256);
    assert.equal(asset.replacement.provenance.status,'confirmed-by-owner');
    assert.equal(asset.replacement.encoding.resize,false);
    assert.equal(asset.replacement.encoding.recolor,false);
    assert.ok(asset.bytes<asset.replacement.source.bytes);
  }
  assert.equal(asset.rightsStatus,'confirmed-by-owner');
  if(asset.productId) assert.ok(productIds.includes(asset.productId));
  const bytes=await readFile(asset.file),metadata=await sharp(bytes).metadata();
  assert.equal(bytes.length,asset.bytes);
  assert.equal(createHash('sha256').update(bytes).digest('hex'),asset.sha256);
  assert.equal(metadata.format,'webp');
  assert.equal(metadata.width,1254);assert.equal(metadata.height,1254);
  await sharp(bytes).raw().toBuffer();
  if(asset.variants) {
    if (asset.source.file) {
      const original = await readFile(asset.source.file);
      const info = await sharp(original).metadata();
      assert.equal(original.length,asset.source.bytes);
      assert.equal(createHash('sha256').update(original).digest('hex'),asset.source.sha256);
      assert.equal(info.format,'png');assert.equal(info.width,asset.source.width);assert.equal(info.height,asset.source.height);
    }
    assert.equal(asset.provenance.confirmedAt,asset.mappingCsv==='assets/media/phase5-image-manifest.csv'?'2026-10-31':['assets/media/phase4-6-image-manifest.csv','assets/media/phase4-7-image-manifest.csv'].includes(asset.mappingCsv)?'2026-10-29':asset.mappingCsv==='assets/media/phase4-3-image-manifest.csv'?'2026-10-28':'2026-10-27');
    assert.equal(asset.encoding.recolor,false);
    assert.equal(asset.encoding.crop,false);
    assert.deepEqual(asset.variants.map(variant=>variant.width),[480,960,1254]);
    for(const variant of asset.variants) {
      const data=await readFile(variant.file), info=await sharp(data).metadata();
      assert.equal(info.format,'webp');
      assert.equal(info.width,variant.width);assert.equal(info.height,variant.height);
      assert.equal(data.length,variant.bytes);
      assert.equal(createHash('sha256').update(data).digest('hex'),variant.sha256);
      assert.ok(data.length<asset.source.bytes);
      assert.ok(!info.exif && !info.xmp && !info.icc);
      assert.ok(mappingCsv.includes(variant.file.replace('assets/media/','')));
      await sharp(data).raw().toBuffer();
    }
  }
  if(asset.productId==='jackery-explorer-300')assert.equal(asset.accuracyStatus,'rejected');
}
console.log('Verified all 34 product mappings, CSV associations, hash-verified bytes, 33 approved illustrations and 1 rejected asset, all mapped to distinct products.');

// Superseded sources are retained for traceability, never selected as fallbacks.
assert.equal(supplied.assets.filter(asset=>asset.replacement).length,3);
assert.deepEqual(supplied.assets.filter(asset=>!canPublishImportedAsset(asset)).map(asset=>asset.productId),['jackery-explorer-300']);
const preservation=JSON.parse(await readFile('docs/qa/phase4-1/media-preservation.json','utf8'));
assert.equal(preservation.unchangedProductIllustrations.length,11);
assert.equal(preservation.unchangedBunkerVariants.length,3);
for(const preserved of [...preservation.unchangedProductIllustrations,...preservation.unchangedBunkerVariants]) {
  assert.equal(createHash('sha256').update(await readFile(preserved.file)).digest('hex'),preserved.sha256,`Unexpected recompression: ${preserved.file}`);
}
console.log('Confirmed byte-for-byte preservation of the other 11 product illustrations and all 3 bunker variants against the Phase 4.1 baseline.');
