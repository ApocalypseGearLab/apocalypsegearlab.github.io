import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync, writeFileSync } from 'node:fs';
import { resolve, sep } from 'node:path';
import { createHash } from 'node:crypto';
import { load } from 'cheerio';
import { beforeWhiteoutPhase2 } from './whiteout-phase2-preservation.mjs';

const read = file => readFileSync(file, 'utf8');
const site = 'https://apocalypsegearlab.github.io';
const root = resolve('dist');
const files = readdirSync(root, { recursive: true }).map(String).filter(file => file.endsWith('.html'));
const pathFor = file => '/' + file.split(sep).join('/').replace(/index\.html$/, '');
const fileFor = pathname => resolve(root, '.' + pathname, pathname.endsWith('/') ? 'index.html' : '');
const english = files.filter(file => !file.split(sep).join('/').startsWith('fr/'));
const toFrench = path => path === '/404.html' ? '/fr/404/' : '/fr' + path;
const normalize = value => value.replace(/\s+/gu, ' ').trim();
const dictionary = Object.assign({}, ...['a', 'b', 'c', 'extra', 'fixtures', 'whiteout', 'privacy'].map(part => JSON.parse(read('src/i18n/fr-' + part + '.json'))));
const unchanged = new Set([
  ...['a', 'b', 'c', 'whiteout'].flatMap(part => JSON.parse(read('src/i18n/allow-' + part + '.json'))),
  'Options', // Owner-specified consent label is identical in English and French.
]);
const indexed = new Set();
let affiliateControls = 0, references = 0, checkedTextNodes = 0;
for (const row of JSON.parse(read('docs/qa/bilingual/protected-files.json'))) assert.equal(createHash('sha256').update(beforeWhiteoutPhase2(row.file, readFileSync(row.file))).digest('hex'), row.sha256, 'Protected source changed outside reviewed Phase 2 hunks: ' + row.file);
assert.equal(files.length, english.length * 2, 'One French page for every existing English page');
for (const file of english) {
  const pathname = pathFor(file), frenchPath = toFrench(pathname);
  assert.ok(existsSync(fileFor(frenchPath)), 'Missing French route: ' + frenchPath);
  const en = load(read(resolve(root, file))), fr = load(read(fileFor(frenchPath)));
  for (const [page, route, language] of [[en, pathname, 'en-CA'], [fr, frenchPath, 'fr-CA']]) {
    assert.equal(page('html').attr('lang'), language, route);
    assert.equal(page('h1').length, 1, route);
    assert.equal(page('link[rel=canonical]').attr('href'), site + route);
    assert.equal(page('meta[property="og:url"]').attr('content'), site + route);
    assert.equal(page('meta[property="og:locale"]').attr('content'), language.replace('-', '_'));
    assert.equal(page('link[hreflang="en-CA"]').attr('href'), site + pathname);
    assert.equal(page('link[hreflang="fr-CA"]').attr('href'), site + frenchPath);
    assert.equal(page('link[hreflang="x-default"]').attr('href'), site + pathname);
    assert.equal(page('[data-language-selector]').length, 1);
    assert.equal(page('[data-language-option="en"]').attr('href'), pathname);
    assert.equal(page('[data-language-option="fr"]').attr('href'), frenchPath);
    assert.equal(page('[data-language-option][aria-current]').length, 1);
    assert.equal(page('meta[name="google-site-verification"]').attr('content'), 'L1PfzJJwmxprbyNPTX3LpNLl86Ic-ivCj_JlSzI0Iwk');
    assert.equal(page('script[src*="googletagmanager.com/gtag/js"]').length, 0, 'Google must not load before opt-in');
    assert.equal(page('[data-analytics-consent]').length,1);
    assert.equal(page('footer a[href="'+(language==='fr-CA'?'/fr/privacy/':'/privacy/')+'"]').length,2);
    if (!page('meta[name=robots]').attr('content')?.includes('noindex') && route !== '/404.html') indexed.add(site + route);
  }
  assert.equal(fr('meta[name=robots]').attr('content'), en('meta[name=robots]').attr('content'), pathname);
  const assets = page => page('img').toArray().map(node => Object.fromEntries(['src', 'srcset', 'sizes', 'width', 'height', 'loading', 'fetchpriority'].map(attr => [attr, page(node).attr(attr)])));
  assert.deepEqual(assets(fr), assets(en), 'Image delivery changed: ' + pathname);
  const affiliate = page => page('a[data-affiliate-click]').toArray().map(node => Object.fromEntries(Object.entries(node.attribs).filter(([attr]) => attr === 'href' || attr === 'rel' || attr === 'target' || attr.startsWith('data-'))));
  assert.deepEqual(affiliate(fr), affiliate(en), 'Affiliate URL, ASIN, tag or tracking changed: ' + pathname);
  affiliateControls += affiliate(fr).length;
  assert.equal(fr('[aria-disabled=true]').length, en('[aria-disabled=true]').length, 'Held buying controls: ' + pathname);
  const sources = page => page('[data-source-click]').toArray().map(node => Object.fromEntries(Object.entries(node.attribs).filter(([key]) => key === 'href' || key.startsWith('data-'))));
  assert.deepEqual(sources(fr), sources(en), 'Source destinations or tracking changed: ' + pathname);
  references += sources(fr).length;
  const inlineScripts = page => page('script').not('[type="application/ld+json"]').map((_, node) => page(node).text()).get();
  assert.deepEqual(inlineScripts(fr), inlineScripts(en), 'Analytics/interaction scripts changed between languages: ' + pathname);
  const numbers = text => (text.replace(/\b\d{1,3}(?:,\d{3})+\b/g, value => value.replaceAll(',', '')).replace(/(\d)[\u202f\u00a0 ](?=\d{3}\b)/g, '$1').match(/\d+(?:[.,]\d+)*/g) ?? []).sort();
  en('.table-wrap tbody tr').each((i, node) => {
    const translated = fr('.table-wrap tbody tr').eq(i);
    assert.deepEqual(numbers(translated.find('td').text()), numbers(en(node).find('td').text()), 'Specification numbers changed: ' + pathname + '/' + i);
  });
  fr('a[href]').not('[data-language-option]').each((_, node) => {
    const href = fr(node).attr('href'), target = new URL(href, site + frenchPath);
    if (target.origin !== site || href.startsWith('#')) return;
    if (target.pathname.endsWith('/')) assert.ok(target.pathname.startsWith('/fr/'), 'Unlocalized internal navigation: ' + href);
  });
  // Every source phrase with visitor-facing letters must be translated or
  // explicitly classified as a brand/model/technical literal by editorial QA.
  en('*').not('script,style').contents().each((_, node) => {
    if (node.type !== 'text' || ['script', 'style'].includes(node.parent?.name) || en(node).parents('[data-language-option], [data-i18n-ignore]').length) return;
    const text = normalize(node.data);
    if (!/[a-zA-Z]/.test(text)) return;
    assert.ok(dictionary[text], 'Missing source translation: ' + text);
    if (dictionary[text] === text) assert.ok(unchanged.has(text), 'Unreviewed English text retained: ' + text);
    checkedTextNodes++;
  });
  fr('script[type="application/ld+json"]').each((_, node) => {
    const schema = JSON.parse(fr(node).text());
    const visit = value => {
      if (Array.isArray(value)) return value.forEach(visit);
      if (!value || typeof value !== 'object') return;
      if (['WebSite', 'WebPage', 'CollectionPage', 'Product'].includes(value['@type'])) assert.equal(value.inLanguage, 'fr-CA');
      for (const [key, child] of Object.entries(value)) {
        if (typeof child === 'string' && ['url', '@id', 'item'].includes(key) && value['@type'] !== 'Organization') {
          const url = new URL(child, site);
          if (url.origin === site && url.pathname.endsWith('/')) assert.ok(url.pathname.startsWith('/fr/'), 'Unlocalized schema URL: ' + child);
        } else visit(child);
      }
    };
    visit(schema);
  });
}
const xml = load(read('dist/sitemap-index.xml'), { xmlMode: true });
const sitemapFiles = xml('sitemap > loc').map((_, node) => new URL(xml(node).text()).pathname).get();
assert.deepEqual(sitemapFiles, ['/sitemap-en-0.xml', '/sitemap-fr-0.xml']);
const found = new Set();
for (const file of sitemapFiles) {
  const map = load(read(fileFor(file)), { xmlMode: true });
  map('url').each((_, node) => {
    const location = map(node).find('loc').text();
    assert.ok(!found.has(location), 'Duplicate sitemap URL'); found.add(location);
    const enPath = new URL(location).pathname.replace(/^\/fr(?=\/)/, '') || '/';
    const links = map(node).find('[hreflang]');
    assert.equal(links.length, 3);
    for (const [language, path] of [['en-CA', enPath], ['fr-CA', '/fr' + enPath], ['x-default', enPath]]) assert.equal(links.filter((_, link) => map(link).attr('hreflang') === language).attr('href'), site + path);
  });
}
assert.deepEqual([...found].sort(), [...indexed].sort(), 'Sitemaps contain exactly the indexable pages in both languages');
assert.equal(read('dist/sitemap.xml'), read('dist/sitemap-index.xml'));
assert.equal(read('dist/sitemap-0.xml'), read('dist/sitemap-en-0.xml'));
const result = { englishPages: english.length, frenchPages: english.length, totalPages: files.length, translatedPhrases: Object.keys(dictionary).length, checkedTextNodes, frenchAffiliateControls: affiliateControls, frenchSourceReferences: references, indexableUrls: indexed.size, protectedFiles: JSON.parse(read('docs/qa/bilingual/protected-files.json')).length };
if (process.argv.includes('--report')) writeFileSync('docs/qa/bilingual/results.json', JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify(result, null, 2));
