import { affiliateFixtureFingerprint } from './fixture-fingerprint.mjs';
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, unlinkSync, mkdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { load } from 'cheerio';
import { resolve } from 'node:path';

// Temporary fixtures exercise production product routes without publishing
// invented reviews. Exclusive creation and finally-cleanup protect user data.
const created = [];
const siteConfigPath = 'src/config/site.ts';
const siteConfig = readFileSync(siteConfigPath, 'utf8');
const fixtures = [
  ['blackout', 'power-stations'], ['fallout', 'water'], ['outbreak', 'inventory-management'],
];
const build = () => {
  const { bin } = JSON.parse(readFileSync('node_modules/astro/package.json', 'utf8'));
  const result = spawnSync(process.execPath, [resolve('node_modules/astro', bin.astro), 'build'], { stdio: 'inherit' });
  assert.equal(result.status, 0, 'Fixture build failed');
};

try {
  const template = JSON.parse(readFileSync('src/data/products/template-product.json', 'utf8'));
  for (const [universe, category] of fixtures) {
    const slug = `qa-fixture-${universe}`;
    const file = `src/data/products/${slug}.json`;
    writeFileSync(file, JSON.stringify({
      ...template, category, name: `QA fixture ${universe}`, brand: 'QA only',
      summary: 'Temporary test fixture. This is not a real product recommendation.',
      reviewStatus: 'published', lastVerified: '2026-10-24',
      sources: [{ id: 'qa-source', title: 'Synthetic QA source, not real product evidence', url: 'https://example.com/qa-only', kind: 'manufacturer' }],
      research: { checkedAt: '2026-10-25', identityNotes: 'Synthetic QA fixture only.', listingVerified: true, safetyStatus: 'cleared', publicationApproved: true, publicationBlockers: [], confirmed: [{ text: 'Fixture statement, not a product claim.', sourceIds: ['qa-source'] }], unverifiedClaims: [], safetyNotes: [] },
      specs: [{ label: 'QA specification', value: 'Fixture value', source: 'https://example.com/qa-only' }],
      pros: ['QA advantage'], cons: ['QA limitation'], useCases: ['QA scenario'],
    }), { flag: 'wx' });
    created.push(file);
  }
  build();
  const catalogue = load(readFileSync('dist/gear/index.html', 'utf8'));
  assert.equal(catalogue('meta[name="robots"]').length, 0, 'A populated catalogue must be indexable');
  for (const [universe] of fixtures) {
    const slug = `qa-fixture-${universe}`;
    const product = load(readFileSync(`dist/gear/${slug}/index.html`, 'utf8'));
    assert.equal(product('h1').text(), `QA fixture ${universe}`);
    assert.equal(product('meta[name="robots"]').length, 0);
    assert.ok(product('body').text().includes('Fixture value'));
    assert.ok(product('body').text().includes('Not physically tested by us'));
    assert.equal(product('a[data-affiliate-click]').length, 0);
    assert.equal(product('[aria-disabled="true"]').length, 0);
    assert.ok(product('body').text().includes('Retailer links are not available for this profile.'));
    assert.equal(product('.product-artwork--detail .neutral-media').length, 1, 'Unlicensed or missing artwork needs a neutral visual');
    assert.equal(product('.product-artwork--detail img').length, 0);
    assert.equal(product('[aria-label="Research status"]').length, 0, 'Internal approval workflow stays out of public profiles');
    assert.ok(!/AI-assisted|ChatGPT|Codex|Synthetic QA fixture only/.test(product('body').text()));
    assert.equal(catalogue(`a[href="/gear/${slug}/"]`).length, 1);
    const hub = load(readFileSync(`dist/${universe}/index.html`, 'utf8'));
    assert.equal(hub(`article.card a[href="/gear/${slug}/"]`).length, 1);
    for (const [other] of fixtures.filter(([id]) => id !== universe)) {
      assert.equal(hub(`a[href="/gear/qa-fixture-${other}/"]`).length, 0);
    }
    assert.ok(readFileSync('dist/sitemap-0.xml', 'utf8').includes(`/gear/${slug}/`));
  }
  console.log('Verified three published product fixtures, universe filtering, populated catalogue indexing, specifications and pending affiliate links.');
  // Exercise the actual active/pending Astro components using a SYNTHETIC ASIN.
  // No Amazon request or click is made. Actual editorial products remain drafts.
  const fixturePath = 'src/data/products/qa-fixture-blackout.json';
  const fixture = JSON.parse(readFileSync(fixturePath, 'utf8'));
  const affiliateUrl = 'https://www.amazon.ca/dp/B000000001?tag=apocalypsegear-20';
  fixture.links.amazonCa = { asin: 'B000000001', url: affiliateUrl };
  // The same public informational draft may link after product checks, while staying noindex.
  fixture.reviewStatus='draft'; fixture.visibility='informational';
  fixture.research.listingEvidence={url:'https://www.amazon.ca/dp/B000000001',checkedAt:'2026-10-26',method:'live-page',matchedAsin:'B000000001',matchedModel:fixture.name,notes:'Synthetic QA evidence only; no real listing verification.'};
  writeFileSync(fixturePath, JSON.stringify(fixture));
  mkdirSync('.tools/qa/phase4', { recursive: true });
  for (const enrolled of [false, true]) {
    writeFileSync(siteConfigPath, siteConfig.replace(/AMAZON_CA_LINKING_ENABLED = (true|false)/, 'AMAZON_CA_LINKING_ENABLED = ' + enrolled));
    build();
    const html = readFileSync('dist/gear/qa-fixture-blackout/index.html', 'utf8');
    const $ = load(html);
    assert.equal($('a[data-affiliate-click]').length, enrolled ? 1 : 0);
    assert.equal($('meta[name="robots"]').attr('content'),'noindex, nofollow');
    const cards = load(readFileSync('dist/gear/index.html', 'utf8'));
    const fixtureCard = cards('article.card').filter((_, el) => cards(el).find('a[href="/gear/qa-fixture-blackout/"]').length > 0);
    assert.ok(fixtureCard.text().includes('Information only'));
    assert.ok(!fixtureCard.text().includes('Verification pending'), 'A verified informational profile must not claim verification is pending');
    assert.ok(!readFileSync('dist/sitemap-0.xml','utf8').includes('/gear/qa-fixture-blackout/'));
    assert.ok(!$('script[type="application/ld+json"]').toArray().some(el=>JSON.parse($(el).text())['@type']==='Product'));
    if(enrolled) assert.ok(!$('body').text().includes('Buying links are not active.'));
    assert.equal($('[aria-disabled="true"]').length, enrolled ? 0 : 1);
    if (enrolled) {
      const button = $('a[data-affiliate-click]');
      assert.equal(button.attr('href'), affiliateUrl);
      assert.equal(button.attr('target'), '_blank');
      assert.equal(button.attr('rel'), 'sponsored nofollow noopener');
      assert.match(button.text(), /View on Amazon.ca/);
      assert.ok($('[aria-label="Affiliate disclosure"]').text().includes('As an Amazon Associate I earn from qualifying purchases.'));
      for (const name of ['kidde-c3010-co-alarm','iniu-p62-20000mah-65w','jackery-explorer-300']) {
        const real = load(readFileSync('dist/gear/' + name + '/index.html', 'utf8'));
        assert.equal(real('[data-product-purchase] a[data-affiliate-click]').length, 0, name + ': account status cannot enable unapproved products');
      }
    }
    // Browser QA consumes real rendered component markup, with no external navigation.
    writeFileSync('.tools/qa/phase4/affiliate-' + (enrolled ? 'active' : 'pending') + '-fixture.html', '<!doctype html><html lang="en"><head><title>Affiliate component QA</title></head><body><main><h1>Affiliate component QA</h1>' + $('#buy').parent().html() + '</main></body></html>');
  }
  console.log('Verified actual active and pending affiliate rendering, exact ASIN/tag, disclosure, safe new-tab attributes and retained real-product holds.');

} finally {
  writeFileSync(siteConfigPath, siteConfig);
  for (const file of created) unlinkSync(file);
  // Always restore the distributable to actual editorial data.
  build();
}

writeFileSync('.tools/qa/phase4/affiliate-fixture-source.txt', affiliateFixtureFingerprint());
