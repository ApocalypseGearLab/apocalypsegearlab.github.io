import sharp from 'sharp';
import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve, join, dirname } from 'node:path';

// Originals stay with the owner. Example: npm run images:build -- "C:/Users/1995/Downloads"
const sourceDirectory = process.argv[2];
if (!sourceDirectory) throw new Error('Supply the directory containing the nine original PNG files.');
const sources = JSON.parse(await readFile(new URL('./image-sources.json', import.meta.url), 'utf8'));
const review = JSON.parse(await readFile('src/data/media/review.json', 'utf8'));
const manifestPath = resolve('src/data/media/manifest.json');
const sha256 = (bytes) => createHash('sha256').update(bytes).digest('hex');
const pending = [];
const hashes = new Set();

// Validate every input and output before writing anything. Never overwrite unrelated files.
let previous = [];
try { previous = JSON.parse(await readFile(manifestPath, 'utf8')).assets; }
catch (error) { if (error.code !== 'ENOENT') throw error; }
const owned = new Set(previous.flatMap((asset) => asset.variants.map((variant) => variant.file ?? `public${variant.src}`)));
for (const source of sources) {
  const bytes = await readFile(join(resolve(sourceDirectory), source.source));
  const metadata = await sharp(bytes).metadata();
  if (metadata.format !== 'png' || !metadata.width || !metadata.height || (metadata.pages ?? 1) !== 1) throw new Error(`Invalid original: ${source.source}`);
  const digest = sha256(bytes);
  if (hashes.has(digest)) throw new Error(`Duplicate original: ${source.source}`);
  hashes.add(digest);
  const isHero = source.id === 'hero';
  const oriented = await sharp(bytes).autoOrient().toBuffer();
  const upright = await sharp(oriented).metadata();
  const widths = isHero ? [...new Set([768, 1280, Math.min(1920, upright.width)])].filter((width) => width <= upright.width).sort((a, b) => a - b) : [480, 960];
  if (!isHero && Math.min(upright.width, upright.height) < 960) throw new Error(`Product source is too small: ${source.source}`);
  const asset = {
    ...source,
    kind: 'ai-assisted-illustration',
    rightsStatus: isHero ? review.assets.hero?.rightsStatus ?? 'pending-owner-confirmation' : 'pending-owner-confirmation',
    modelVerified: false,
    original: { width: metadata.width, height: metadata.height, format: metadata.format, hasAlpha: metadata.hasAlpha, bytes: bytes.length, sha256: digest },
    variants: [],
  };
  for (const width of widths) {
    const rejected = review.assets[source.id]?.accuracyStatus === 'rejected';
    const filename = `${source.basename}-${width}.webp`;
    const src = rejected ? null : `/images/${filename}`;
    const file = rejected ? `assets/rejected/blackout/${filename}` : `public${src}`;
    const output = resolve(file);
    try {
      await access(output);
      if (!owned.has(file)) throw new Error(`Refusing to overwrite an untracked image: ${output}`);
    } catch (error) { if (error.code !== 'ENOENT') throw error; }
    const { data, info } = await sharp(oriented)
      .toColourspace('srgb')
      .resize({ width, ...(isHero ? {} : { height: width, fit: 'contain', background: '#080807' }), withoutEnlargement: true })
      .webp({ quality: 83, effort: 6 })
      .toBuffer({ resolveWithObject: true });
    asset.variants.push({ src, file, width: info.width, height: info.height, bytes: data.length, sha256: sha256(data), quality: 83 });
    pending.push({ output, data });
  }
  pending.push({ asset });
}
await mkdir(resolve('src/data/media'), { recursive: true });
for (const item of pending) if (item.output) { await mkdir(dirname(item.output), { recursive: true }); await writeFile(item.output, item.data); }
const assets = pending.filter((item) => item.asset).map((item) => item.asset);
await writeFile(manifestPath, `${JSON.stringify({ version: 1, encoder: { sharp: sharp.versions.sharp, webp: sharp.versions.webp }, assets }, null, 2)}\n`);
for (const asset of assets) console.log(`${asset.id}: ${asset.original.width}x${asset.original.height}, ${asset.original.bytes} B -> ${asset.variants.map((v) => `${v.width}x${v.height} ${v.bytes} B`).join(', ')}`);
