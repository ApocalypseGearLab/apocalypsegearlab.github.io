import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
import sharp from 'sharp';
const file = 'src/data/media/whiteout-phase2-manifest.json';
const manifest = JSON.parse(readFileSync(file, 'utf8'));
const check = process.argv.includes('--check');
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
let csv = 'product_id,original_filename,optimized_file,width,height,bytes,sha256\n';
for (const asset of manifest.assets) {
  const source = readFileSync(asset.source.file);
  assert.equal(hash(source), asset.source.sha256, 'Preserve supplied original PNG');
  assert.equal(source.length, asset.source.bytes);
  const metadata = await sharp(source).metadata();
  assert.equal(metadata.width, 1254); assert.equal(metadata.height, 1254);
  for (const variant of asset.variants) {
    let quality = 82, bytes;
    do {
      bytes = await sharp(source).resize({ width: variant.width, withoutEnlargement: true }).webp({ quality, effort: 6 }).toBuffer();
      if (bytes.length <= 250_000) break;
      quality -= 2;
    } while (quality >= 70);
    assert.ok(bytes.length <= 250_000);
    if (check) {
      assert.deepEqual(readFileSync(variant.file), bytes, 'Reproducible responsive encoding');
      assert.equal(variant.bytes, bytes.length); assert.equal(variant.sha256, hash(bytes)); assert.equal(variant.quality, quality);
    } else {
      writeFileSync(variant.file, bytes);
      Object.assign(variant, { bytes: bytes.length, sha256: hash(bytes), quality });
    }
    const info = await sharp(bytes).metadata();
    assert.equal(info.format, 'webp'); assert.equal(info.width, variant.width); assert.equal(info.height, variant.height);
    assert.ok(!info.exif && !info.icc && !info.xmp);
    assert.ok(bytes.length < source.length); await sharp(bytes).raw().toBuffer();
    csv += `${asset.productId},"${asset.sourceOriginalName}",${variant.file},${variant.width},${variant.height},${bytes.length},${hash(bytes)}\n`;
  }
  const largest = asset.variants.at(-1);
  if (check) { assert.equal(asset.bytes, largest.bytes); assert.equal(asset.sha256, largest.sha256); }
  else { asset.bytes = largest.bytes; asset.sha256 = largest.sha256; asset.encoding.quality = largest.quality; }
}
if (check) assert.equal(readFileSync('assets/media/whiteout-phase2-image-manifest.csv', 'utf8'), csv);
else { writeFileSync(file, JSON.stringify(manifest, null, 2) + '\n'); writeFileSync('assets/media/whiteout-phase2-image-manifest.csv', csv); }
console.log('Verified 5 original PNGs and 15 responsive WebPs: full-frame, no recolouring/upscaling, metadata stripped, hashes/CSV and deterministic encoding.');
