import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { localizedPath, languageOf } from '../src/i18n/routes';
import { translate, localizeHtml, french } from '../src/i18n/translate';
import { beforeBilingualIntegration } from '../scripts/bilingual-preservation.mjs';

const site = new URL('https://apocalypsegearlab.github.io');
test('English URLs round-trip through static French routes, including the Pages 404', () => {
  for (const route of ['/', '/blackout/', '/fallout/', '/outbreak/', '/whiteout/', '/gear/', '/gear/ecoflow-river-2-pro/', '/how-we-research/', '/affiliate-disclosure/', '/404.html']) {
    const french = localizedPath(route, 'fr');
    assert.equal(languageOf(french), 'fr');
    assert.equal(localizedPath(french, 'en'), route);
    assert.equal(localizedPath(french, 'fr'), french);
  }
  assert.equal(languageOf('/freeze/'), 'en');
});

test('new visitor text fails closed while generated counts and dates remain localizable', () => {
  assert.throws(() => translate('An untranslated new safety warning.'), /Missing fr-CA translation/);
  assert.throws(() => localizeHtml('<html><body><p>Untranslated warning A</p><p>Untranslated warning B</p></body></html>', site), /translations \(2\)/);
  assert.equal(translate('51 profiles'), '51 fiches');
  assert.equal(translate('Sources checked 2027-01-31'), 'Sources vérifiées le 2027-01-31');
});

test('localization preserves affiliate destinations and executable analytics while translating accessible text', () => {
  const href = 'https://www.amazon.ca/dp/B015QIC1PW?tag=apocalypsegear-20';
  const html = '<html><body><a href="' + href + '" data-affiliate-click data-product-name="Midland ER310 emergency radio" aria-label="View on Amazon.ca">View on Amazon.ca</a><script>window.example = "Never translate executable text";</script></body></html>';
  const fr = localizeHtml(html, site);
  assert.ok(fr.includes(href));
  assert.ok(fr.includes('data-product-name="Midland ER310 emergency radio"'));
  assert.ok(fr.includes('window.example = "Never translate executable text";'));
  assert.ok(!fr.includes('>View on Amazon.ca<'));
});

test('only reviewed source hunks are projected before historical checks', () => {
  const hash = (value: Buffer | string) => createHash('sha256').update(value).digest('hex');
  const changes = JSON.parse(readFileSync('docs/qa/bilingual/source-changes.json', 'utf8'));
  for (const file of Object.keys(changes)) {
    const bytes = readFileSync(file);
    assert.notEqual(hash(beforeBilingualIntegration(file, bytes)), hash(beforeBilingualIntegration(file, Buffer.concat([bytes, Buffer.from('\nUNRELATED EDIT')]))));
  }
});

test('every translated phrase preserves all numeric specifications and warning quantities', () => {
  const numbers = (text: string) => (text.replace(/\b\d{1,3}(?:,\d{3})+\b/g, value => value.replaceAll(',', '')).replace(/(\d)[\u202f\u00a0 ](?=\d{3}\b)/g, '$1').match(/\d+(?:[.,]\d+)*/g) ?? []).sort();
  for (const [source, translated] of Object.entries(french)) assert.deepEqual(numbers(translated), numbers(source), source);
});
