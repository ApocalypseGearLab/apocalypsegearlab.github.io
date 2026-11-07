import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { load } from 'cheerio';
import { WHITEOUT_PHASE2_IDS, beforeWhiteoutPhase2 } from './whiteout-phase2-preservation.mjs';
const read = file => readFileSync(file, 'utf8');
const json = file => JSON.parse(read(file));
const site = 'https://apocalypsegearlab.github.io';
const ids = [...WHITEOUT_PHASE2_IDS, 'therm-a-rest-neoair-xtherm-nxt-review'];
const sitemap = read('dist/sitemap-en-0.xml') + read('dist/sitemap-fr-0.xml');
for (const id of ids) {
  const product = json(`src/data/products/${id}.json`);
  for (const language of ['en', 'fr']) {
    const route = `${language === 'fr' ? '/fr' : ''}/gear/${id}/`;
    const $ = load(read(`dist${route}index.html`));
    assert.equal($('html').attr('lang'), language + '-CA');
    assert.equal($('link[rel=canonical]').attr('href'), site + route);
    assert.equal($('link[hreflang="en-CA"]').attr('href'), `${site}/gear/${id}/`);
    assert.equal($('link[hreflang="fr-CA"]').attr('href'), `${site}/fr/gear/${id}/`);
    assert.equal($('h1').length, 1); assert.match($('meta[name=robots]').attr('content'), /noindex/);
    assert.ok(!sitemap.includes(site + route));
    const active = true;
    assert.equal($('[data-product-purchase] [aria-disabled=true]').length, active ? 0 : 1);
    assert.equal($('[data-product-purchase] a[data-affiliate-click]').length, active ? 1 : 0);
    if (active) assert.equal($('[data-product-purchase] a[data-affiliate-click]').attr('href'), product.links.amazonCa.url);
    if (!active) assert.equal($(`a[href*="${product.links.amazonCa.asin}"]`).length, 0, 'Held candidate is not an active outbound link');
    assert.equal($('[data-link-status]').attr('data-link-status'), active ? 'active' : 'held');
    const image = $('.product-artwork--detail img');
    assert.equal(image.attr('src'), product.image.src); assert.ok(image.attr('alt').length > 30);
    assert.equal(image.attr('width'), '1254'); assert.equal(image.attr('height'), '1254');
    assert.equal(image.attr('loading'), 'eager'); assert.equal(image.attr('srcset').split(',').length, 3);
    assert.equal($('.product-specifications tbody tr').length, product.specs.length);
    assert.doesNotMatch($('script[type="application/ld+json"]').text(), /"@type":"(?:Product|Offer|Review|AggregateRating)"/);
    const hub = load(read(`dist${language === 'fr' ? '/fr' : ''}/whiteout/index.html`));
    assert.ok(hub(`a[href="${route}"]`).length, 'Localized WHITEOUT card/link');
    const catalogue = load(read(`dist${language === 'fr' ? '/fr' : ''}/gear/index.html`));
    assert.equal(catalogue(`[data-catalogue-entry][data-sector=whiteout] a[href="${route}"]`).length > 0, true);
  }
}
for (const row of json('docs/qa/whiteout-phase2/before.json').files) {
  assert.equal(createHash('sha256').update(beforeWhiteoutPhase2(row.file, readFileSync(row.file))).digest('hex'), row.sha256, row.file);
}
const media = json('src/data/media/whiteout-phase2-manifest.json');
for (const asset of media.assets) for (const variant of asset.variants) {
  assert.deepEqual(readFileSync('dist' + variant.src), readFileSync(variant.file));
}
console.log('WHITEOUT Phase 2: exactly 6 EN/FR profiles, 5 new records, 15 delivered WebPs, localized cards/links, canonical/hreflang, noindex/sitemap holds, six documented purchase links and retained XTherm temperature warning and protected-source preservation passed.');
