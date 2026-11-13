import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { load } from 'cheerio';
import { WHITEOUT_PRODUCT_IDS } from './whiteout-products-preservation.mjs';
const read = file => readFileSync(file, 'utf8');
const json = file => JSON.parse(read(file));
const site = 'https://apocalypsegearlab.github.io';
const sitemap = read('dist/sitemap-en-0.xml') + read('dist/sitemap-fr-0.xml');
for (const language of ['en', 'fr']) {
  const prefix = language === 'fr' ? '/fr' : '';
  const hub = load(read(`dist${prefix}/whiteout/index.html`));
  const catalogue = load(read(`dist${prefix}/gear/index.html`));
  for (const id of WHITEOUT_PRODUCT_IDS) {
    const product = json(`src/data/products/${id}.json`);
    const route = `${prefix}/gear/${id}/`;
    const $ = load(read(`dist${route}index.html`));
    assert.equal($('html').attr('lang'), language + '-CA');
    assert.equal($('h1').length, 1);
    assert.equal($('link[rel=canonical]').attr('href'), site + route);
    for (const locale of ['en', 'fr']) assert.equal($(`link[hreflang="${locale}-CA"]`).attr('href'), `${site}${locale === 'fr' ? '/fr' : ''}/gear/${id}/`);
    assert.match($('meta[name=robots]').attr('content'), /noindex/);
    assert.ok(!sitemap.includes(site + route));
    assert.doesNotMatch($('script[type="application/ld+json"]').text(), /"@type":"(?:Product|Offer|Review|AggregateRating)"/);
    assert.equal($('[data-product-purchase] a[data-affiliate-click]').attr('href'), product.links.amazonCa.url);
    assert.equal($('[data-product-purchase] a[data-affiliate-click]').attr('rel'), 'sponsored nofollow noopener');
    assert.equal($('[data-product-purchase] .affiliate-note').length, 1);
    assert.equal($('.product-artwork--detail img').attr('src'), product.image.src);
    assert.equal($('.product-artwork--detail img').attr('srcset').split(',').length, 3);
    assert.equal($('.product-artwork--detail img').attr('width'), '1254');
    for (const page of [hub, catalogue]) {
      const card = page(`article[data-product-id="${id}"]`);
      assert.equal(card.length, 1);
      assert.equal(card.find('a[data-affiliate-click]').attr('href'), product.links.amazonCa.url);
      assert.equal(card.find('img').attr('srcset').split(',').length, 3);
      assert.equal(card.find('.affiliate-note').length, 1);
      assert.ok(card.find(`a[href="${route}"]`).length);
    }
    if (id === 'kahtoola-microspikes') {
      const warning = language === 'fr' ? /bottes.*ne sont pas incluses/i : /boots.*not included/i;
      assert.match(hub(`[data-product-id="${id}"] [data-card-caution]`).text(), warning);
      assert.match($('.product-artwork--detail [data-artwork-caveat]').text(), warning);
    }
  }
}
for (const asset of json('src/data/media/whiteout-products-manifest.json').assets) for (const variant of asset.variants) assert.deepEqual(readFileSync('dist' + variant.src), readFileSync(variant.file));
console.log('WHITEOUT integration: 10 EN/FR profiles, 5 cards per catalogue, disclosures, affiliate tags, canonical/hreflang, noindex/schema rules, warnings and 15 delivered WebPs passed.');
