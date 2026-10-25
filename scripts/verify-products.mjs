import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, unlinkSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { load } from 'cheerio';
import { resolve } from 'node:path';

// Temporary fixtures exercise production product routes without publishing
// invented reviews. Exclusive creation and finally-cleanup protect user data.
const created = [];
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
    assert.equal(hub(`a[href="/gear/${slug}/"]`).length, 1);
    for (const [other] of fixtures.filter(([id]) => id !== universe)) {
      assert.equal(hub(`a[href="/gear/qa-fixture-${other}/"]`).length, 0);
    }
    assert.ok(readFileSync('dist/sitemap-0.xml', 'utf8').includes(`/gear/${slug}/`));
  }
  console.log('Verified three published product fixtures, universe filtering, populated catalogue indexing, specifications and pending affiliate links.');
} finally {
  for (const file of created) unlinkSync(file);
  // Always restore the distributable to actual editorial data.
  build();
}
