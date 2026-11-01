import { readFileSync, writeFileSync, mkdirSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import sharp from 'sharp';

const master = 'assets/brand/brand-logo-master.png';
const expected = '066aec2bf0a97d6823ed6794f02d3312e14597822af2529296c7cf1fb2563ff8';
const hash = file => createHash('sha256').update(readFileSync(file)).digest('hex');
if (hash(master) !== expected) throw new Error('The approved source emblem must remain byte-for-byte intact.');
mkdirSync('public/brand', { recursive: true });
const rows = [];
const record = async (file, url) => {
  const { width, height, hasAlpha } = await sharp(file).metadata();
  rows.push({ file, url, width, height, bytes: statSync(file).size, sha256: hash(file), hasAlpha });
};
await record(master, null);
// Resize the complete square canvas. No trimming, masks, recolouring, sharpening
// or background removal: black interior detail and every luminous edge survive.
for (const size of [512, 256, 128, 64]) {
  const file = `public/brand/brand-logo-${size}.webp`;
  await sharp(master).resize(size, size, { kernel: 'lanczos3' }).webp({ lossless: true, effort: 6 }).toFile(file);
  await record(file, `/brand/brand-logo-${size}.webp`);
}
for (const [size, name] of [[32, 'favicon-32.png'], [16, 'favicon-16.png'], [180, 'apple-touch-icon.png']]) {
  const file = `public/${name}`;
  await sharp(master).resize(size, size, { kernel: 'lanczos3' }).png({ compressionLevel: 9 }).toFile(file);
  await record(file, `/${name}`);
}
writeFileSync('assets/brand/manifest.json', JSON.stringify({
  sourceSha256: expected,
  source: 'User-supplied official ApocalypseGearLab emblem',
  preparation: 'Preserved opaque original. Whole-canvas Lanczos3 resizing; lossless WebP/PNG. No crop, geometry edits, colour-keying or invented vector.',
  transparency: 'Retained original black background to preserve internal shadows, negative spaces and fine glowing edges.',
  assets: rows,
}, null, 2) + '\n');
console.log(JSON.stringify(rows, null, 2));
