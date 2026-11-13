import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
import sharp from 'sharp';

const path = 'src/data/media/whiteout-products-manifest.json';
const manifest = JSON.parse(readFileSync(path, 'utf8'));
const check = process.argv.includes('--check');
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
let csv = 'product_id,original_filename,optimized_file,width,height,bytes,sha256\n';
for (const asset of manifest.assets) {
  const source = readFileSync(asset.source.file);
  assert.equal(hash(source), asset.source.sha256, 'Preserve owner PNG');
  assert.equal(source.length, asset.source.bytes);
  const original = await sharp(source).metadata();
  assert.equal(original.width, asset.source.width);
  assert.equal(original.height, asset.source.height);
  for (const variant of asset.variants) {
    let quality = 82, bytes;
    do {
      bytes = await sharp(source).resize({ width: variant.width, withoutEnlargement: true }).webp({ quality, effort: 6 }).toBuffer();
      if (bytes.length <= 250_000) break;
      quality -= 2;
    } while (quality >= 70);
    assert.ok(bytes.length <= 250_000 && bytes.length < source.length);
    if (check) {
      assert.deepEqual(readFileSync(variant.file), bytes);
      assert.equal(variant.bytes, bytes.length);
      assert.equal(variant.sha256, hash(bytes));
      assert.equal(variant.quality, quality);
    } else {
      mkdirSync('assets/media/whiteout', { recursive: true });
      writeFileSync(variant.file, bytes);
      Object.assign(variant, { bytes: bytes.length, sha256: hash(bytes), quality });
    }
    const info = await sharp(bytes).metadata();
    assert.equal(info.format, 'webp');
    assert.equal(info.width, variant.width); assert.equal(info.height, variant.height);
    assert.ok(!info.exif && !info.icc && !info.xmp);
    await sharp(bytes).raw().toBuffer();
    csv += `${asset.productId},"${asset.sourceOriginalName}",${variant.file},${variant.width},${variant.height},${bytes.length},${hash(bytes)}\n`;
  }
  const largest = asset.variants.at(-1);
  if (check) { assert.equal(asset.bytes, largest.bytes); assert.equal(asset.sha256, largest.sha256); }
  else { asset.bytes = largest.bytes; asset.sha256 = largest.sha256; }
}
if (check) assert.equal(readFileSync('assets/media/whiteout-products-image-manifest.csv', 'utf8'), csv);
else {
  writeFileSync(path, JSON.stringify(manifest, null, 2) + '\n');
  writeFileSync('assets/media/whiteout-products-image-manifest.csv', csv);
}
console.log('WHITEOUT: 5 preserved PNG originals and 15 full-frame responsive WebPs verified.');
