import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve, relative, sep } from 'node:path';
import { load } from 'cheerio';
import { spawnSync } from 'node:child_process';
import { canPublishImportedAsset } from '../src/lib/imported-media-policy.mjs';

const policy = spawnSync(process.execPath, [resolve('node_modules/tsx/dist/cli.mjs'), 'scripts/release-check.ts'], {encoding:'utf8'});
assert.equal(policy.status,0,policy.stderr);
const commercialState = new Map(JSON.parse(policy.stdout).products.map(row=>[row.slug,row]));
const root = resolve('dist');
assert.ok(existsSync(root), 'Run npm run build first');
const site = 'https://apocalypsegearlab.github.io';
const taxonomy = readFileSync('src/config/taxonomy.ts', 'utf8');
const universeFor = (category) => {
  const match = [...taxonomy.matchAll(/id: '([^']+)', label: '[^']+', universe: '([^']+)'/g)].find((entry) => entry[1] === category);
  assert.ok(match, `Unknown category: ${category}`);
  return match[2];
};
const suppliedMedia = JSON.parse(readFileSync('src/data/media/imported-manifest.json', 'utf8')).assets;
const files = readdirSync(root, { recursive: true }).filter((name) => name.endsWith('.html'));
const textArtifacts = readdirSync(root, { recursive: true }).filter((name) => /\.(html|xml|txt|json|js|css)$/.test(name)).map((name) => ({ name, text: readFileSync(resolve(root, name), 'utf8') }));
const documents = new Map();
const titles = new Set();
const indexable = new Set();
let linkCount = 0;
const fileFor = (pathname) => resolve(root, `.${decodeURIComponent(pathname)}`, pathname.endsWith('/') ? 'index.html' : '');

for (const file of files) {
  const pathname = `/${file.split(sep).join('/')}`.replace(/index\.html$/, '');
  const html = readFileSync(resolve(root, file), 'utf8');
  const $ = load(html);
  documents.set(resolve(root, file), $);
  assert.equal($('html').attr('lang'), 'en', file);
  assert.equal($('h1').length, 1, file);
  assert.equal($('main#main').length, 1, file);
  assert.equal($('title').length, 1, file);
  assert.ok($('title').text().trim(), file);
  assert.ok(!titles.has($('title').text()), `Duplicate title: ${file}`);
  titles.add($('title').text());
  assert.ok($('meta[name="description"]').attr('content')?.trim(), file);
  assert.ok($('meta[name="viewport"]').attr('content'), file);
  assert.equal($('link[rel="canonical"]').attr('href'), new URL(pathname, site).href, file);
  assert.equal($('meta[property="og:url"]').attr('content'), new URL(pathname, site).href, file);
  assert.ok(!html.includes('template-product'), `Template leaked into production: ${file}`);
  $('script[type="application/ld+json"]').each((_, script) => JSON.parse($(script).text()));
  if (!$('meta[name="robots"]').attr('content')?.includes('noindex')) indexable.add(new URL(pathname, site).href);
}

for (const [file, $] of documents) {
  $('a[data-affiliate-click]').each((_, element) => {
    const link = $(element);
    const state = commercialState.get(link.attr('data-product'));
    assert.ok(state?.amazonCaActive, 'A held product cannot link from any card or profile');
    assert.equal(link.attr('href'), state.url);
    assert.equal(link.attr('target'), '_blank');
    assert.equal(link.attr('rel'), 'sponsored nofollow noopener');
    assert.ok(link.closest('.card-purchase, [data-product-purchase]').find('[aria-label="Affiliate disclosure"]').text().includes('As an Amazon Associate I earn from qualifying purchases.'), 'Disclosure required next to each active button');
  });
  $('article.card[data-product-id]').each((_, element) => {
    const card = $(element), state = commercialState.get(card.attr('data-product-id'));
    if (!state) return;
    assert.equal(card.find('a[data-affiliate-click]').length, state.amazonCaActive ? 1 : 0);
    assert.equal(card.find('[aria-disabled="true"]').length, state.amazonCaActive ? 0 : 1);
  });
  const pathname = `/${relative(root, file).split(sep).join('/')}`.replace(/index\.html$/, '');
  $('[href], [src]').each((_, element) => {
    const value = $(element).attr('href') ?? $(element).attr('src');
    if (!value || /^(data:|mailto:|tel:)/.test(value)) return;
    const url = new URL(value, new URL(pathname, site));
    assert.ok(['https:', 'http:'].includes(url.protocol), `Unsafe URL: ${value}`);
    if (url.origin !== site) {
      if ($(element).is('a[target="_blank"]')) assert.ok($(element).attr('rel')?.includes('noopener'), value);
      return;
    }
    const target = fileFor(url.pathname);
    assert.ok(target.startsWith(root + sep), `Path escaped dist: ${value}`);
    assert.ok(existsSync(target), `Broken link in ${pathname}: ${value}`);
    if (url.hash && target.endsWith('.html')) {
      const targetDocument = documents.get(target);
      const id = decodeURIComponent(url.hash.slice(1));
      assert.ok(targetDocument?.('[id]').toArray().some((node) => targetDocument(node).attr('id') === id), `Missing fragment: ${value}`);
    }
    linkCount++;
  });
  $('img[srcset]').each((_, image) => {
    assert.ok(Number($(image).attr('width')) > 0 && Number($(image).attr('height')) > 0, 'Image needs intrinsic dimensions');
    assert.ok($(image).attr('alt')?.trim(), 'Useful image needs alt text');
    assert.ok($(image).attr('sizes'), 'Responsive image needs sizes');
    for (const candidate of $(image).attr('srcset').split(',')) {
      const [src, width] = candidate.trim().split(/\s+/);
      assert.match(width, /^\d+w$/);
      const url = new URL(src, new URL(pathname, site));
      assert.equal(url.origin, site);
      assert.ok(existsSync(fileFor(url.pathname)), `Broken srcset image: ${src}`);
    }
  });
}

const sitemapIndex = load(readFileSync(resolve(root, 'sitemap-index.xml'), 'utf8'), { xmlMode: true });
assert.equal(readFileSync(resolve(root, 'sitemap.xml'), 'utf8'), readFileSync(resolve(root, 'sitemap-index.xml'), 'utf8'), 'Preserve the original sitemap.xml URL');
const home = documents.get(resolve(root, 'index.html'));
const mediaReview = JSON.parse(readFileSync('src/data/media/review.json', 'utf8'));
const heroAllowed = mediaReview.assets.hero?.rightsStatus === 'confirmed-by-owner';
const mediaManifest = JSON.parse(readFileSync('src/data/media/manifest.json', 'utf8'));
for(const asset of suppliedMedia) {
  const permitted = canPublishImportedAsset(asset);
  assert.equal(existsSync(fileFor(asset.deliverySrc)),permitted,`Supplied image delivery mismatch: ${asset.id}`);
  if(permitted) assert.deepEqual(readFileSync(fileFor(asset.deliverySrc)),readFileSync(asset.file),'Supplied WebP must not be recompressed');
  for(const variant of asset.variants ?? []) {
    assert.equal(existsSync(fileFor(variant.src)),permitted,'Responsive variant permission mismatch');
    if(permitted) assert.deepEqual(readFileSync(fileFor(variant.src)),readFileSync(variant.file),'Responsive WebP delivery bytes changed');
  }
}
const supersededAqua='/images/fallout/reliance-aqua-tainer-7-gallon-water-container-fallout.webp';
assert.ok(!existsSync(fileFor(supersededAqua)), 'The superseded Aqua-Tainer illustration must not be delivered');
for(const artifact of textArtifacts) assert.ok(!artifact.text.includes(supersededAqua), 'Superseded artwork URL leaked into production');
for (const asset of mediaManifest.assets) {
  const permitted = asset.id === 'hero' ? heroAllowed : mediaReview.rightsStatus === 'confirmed-by-owner' && mediaReview.assets[asset.id]?.accuracyStatus === 'reviewed-illustration';
  for (const variant of asset.variants) if (variant.src) assert.equal(existsSync(fileFor(variant.src)), permitted, `Artwork delivery permission mismatch: ${variant.src}`);
}
assert.equal(home('img[fetchpriority="high"]').length, heroAllowed ? 1 : 0, 'Only rights-cleared hero artwork can render publicly');
if (heroAllowed) assert.equal(home('img[fetchpriority="high"]').attr('loading'), 'eager');
else assert.equal(home('.hero-scene--neutral').length, 1, 'Use the neutral hero until rights are confirmed');
assert.equal(home('link[rel="preload"][as="image"]').length, 0, 'No competing image preloads');
assert.equal(home('#scenarios').length, 1, 'Preserve the original scenarios anchor');
assert.equal(home('#mission').length, 1, 'Preserve the original mission anchor');
const urls = new Set();
for (const node of sitemapIndex('sitemap > loc').toArray()) {
  const url = new URL(sitemapIndex(node).text());
  assert.equal(url.origin, site);
  const sitemap = load(readFileSync(fileFor(url.pathname), 'utf8'), { xmlMode: true });
  sitemap('url > loc').each((_, loc) => urls.add(sitemap(loc).text()));
}
assert.deepEqual([...urls].sort(), [...indexable].sort(), 'Sitemap must contain exactly the indexable HTML pages');
assert.ok(readFileSync(resolve(root, 'robots.txt'), 'utf8').includes(`Sitemap: ${site}/sitemap-index.xml`));
for (const route of ['/', '/blackout/', '/fallout/', '/outbreak/', '/gear/', '/affiliate-disclosure/', '/404.html']) {
  assert.ok(existsSync(fileFor(route)), `Missing route: ${route}`);
}
for (const file of readdirSync('src/data/products', { recursive: true }).filter((name) => name.endsWith('.json'))) {
  const product = JSON.parse(readFileSync(resolve('src/data/products', file), 'utf8'));
  const slug = file.split(sep).join('/').replace(/\.json$/, '');
  const visible = product.reviewStatus === 'published' || (product.visibility === 'informational' && product.reviewStatus !== 'template');
  assert.equal(existsSync(fileFor(`/gear/${slug}/`)), visible, `Informational visibility mismatch: ${slug}`);
  if (product.reviewStatus !== 'published') {
    const asin = product.links?.amazonCa?.asin;
    const affiliateEligible=commercialState.get(slug)?.amazonCaActive===true;
    if (asin && !affiliateEligible) for (const [htmlFile, document] of documents) assert.equal(document(`a[href*="${asin}"]`).length, 0, `Held ASIN linked from ${htmlFile}`);
    assert.ok(![...urls].some((url) => new URL(url).pathname === `/gear/${slug}/`), `Unapproved profile in sitemap: ${slug}`);
    if (!visible) for (const [htmlFile, document] of documents) {
      assert.ok(!document('a').toArray().some((node) => document(node).attr('href') === `/gear/${slug}/`), `Held draft linked from ${htmlFile}`);
      assert.ok(!document('body').text().includes(product.name), `Held draft name leaked into ${htmlFile}`);
    }
    if (visible) {
      const document = documents.get(fileFor(`/gear/${slug}/`));
      assert.ok(document('meta[name="robots"]').attr('content')?.includes('noindex'), `Unapproved profile must be noindex: ${slug}`);
      assert.equal(document('[data-product-purchase] a[data-affiliate-click]').length, affiliateEligible ? 1 : 0, `Per-product affiliate decision: ${slug}`);
      const artwork = suppliedMedia.find(asset => asset.productId === slug);
      assert.equal(document('.product-artwork--detail img').length, artwork && canPublishImportedAsset(artwork) ? 1 : 0, `Approved image mapping: ${slug}`);
      if(artwork && canPublishImportedAsset(artwork)) assert.equal(document('.product-artwork--detail img').attr('src'),artwork.deliverySrc);
      assert.equal(document('[data-product-purchase] [aria-disabled="true"]').length, affiliateEligible ? 0 : 1, `Prepare one disabled Amazon.ca button: ${slug}`);
      assert.ok(!/Before this can be published|Related research drafts|Owner approval|Owner-selected|Not public\./i.test(document('body').text()), `Internal workflow in profile: ${slug}`);
      for (const route of ['/gear/', `/${universeFor(product.category)}/`]) assert.equal(documents.get(fileFor(route))(`article.card a[href="/gear/${slug}/"]`).length, 1, `Missing informational card in ${route}: ${slug}`);
    }
  }
}
console.log(`Verified ${files.length} HTML pages, ${linkCount} internal references, ${urls.size} sitemap URLs, robots.txt, JSON-LD and product publication filtering.`);
