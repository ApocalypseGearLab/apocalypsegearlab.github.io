import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve, relative, sep } from 'node:path';
import { load } from 'cheerio';

const root = resolve('dist');
assert.ok(existsSync(root), 'Run npm run build first');
const site = 'https://apocalypsegearlab.github.io';
const files = readdirSync(root, { recursive: true }).filter((name) => name.endsWith('.html'));
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
}

const sitemapIndex = load(readFileSync(resolve(root, 'sitemap-index.xml'), 'utf8'), { xmlMode: true });
assert.equal(readFileSync(resolve(root, 'sitemap.xml'), 'utf8'), readFileSync(resolve(root, 'sitemap-index.xml'), 'utf8'), 'Preserve the original sitemap.xml URL');
const home = documents.get(resolve(root, 'index.html'));
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
  assert.equal(existsSync(fileFor(`/gear/${slug}/`)), product.reviewStatus === 'published', `Publication status mismatch: ${slug}`);
}
console.log(`Verified ${files.length} HTML pages, ${linkCount} internal references, ${urls.size} sitemap URLs, robots.txt, JSON-LD and product publication filtering.`);
