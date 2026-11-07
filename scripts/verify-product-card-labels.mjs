import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { load } from 'cheerio';

const normalize = text => text.replace(/\s+/gu, ' ').trim();
const forbidden = ['Information only · Manufacturer sources cited', 'Listing not independently verified', 'À titre informatif · Sources du fabricant citées', 'Offre non vérifiée indépendamment'];
const files = readdirSync('dist', { recursive:true }).map(String).filter(file => file.endsWith('.html'));
const universes = new Set(), languages = new Set();
let cards = 0, warnings = 0;
for (const file of files) {
  const $ = load(readFileSync('dist/'+file, 'utf8'));
  const lang = $('html').attr('lang');
  $('article.card[data-product-id]').each((_, node) => {
    cards++; languages.add(lang); universes.add($(node).attr('data-universe'));
    const text = normalize($(node).text());
    for (const label of forbidden) assert.ok(!text.includes(label), `${file}: ${$(node).attr('data-product-id')}: ${label}`);
    $(node).find('[data-product-review]').each((_, review) => assert.ok($(review).children().length && normalize($(review).text()), 'No empty verification wrapper: '+file));
    if ($(node).attr('data-product-id') === 'therm-a-rest-neoair-xtherm-nxt-review') {
      const warning = $(node).find('[data-card-caution]');
      assert.match(warning.text(), lang === 'fr-CA' ? /ne pas utiliser sous −20 °C/ : /Do not use below −20 °C/);
      assert.ok($.html(node).indexOf('data-card-caution') < $.html(node).indexOf('data-affiliate-click'));
      assert.equal($(node).find('a[data-affiliate-click]').attr('href'), 'https://www.amazon.ca/dp/B0CS54SN91?tag=apocalypsegear-20');
      warnings++;
    }
  });
}
for (const prefix of ['', '/fr']) {
  const $=load(readFileSync(`dist${prefix}/gear/index.html`, 'utf8'));
  assert.equal($('article.card[data-product-id]').length, 52, 'Complete bilingual catalogue');
}
assert.deepEqual([...universes].sort(), ['blackout','fallout','outbreak','whiteout']);
assert.deepEqual([...languages].sort(), ['en-CA','fr-CA']);
assert.ok(warnings >= 4);
console.log(JSON.stringify({pages:files.length,cardInstances:cards,languages:[...languages].sort(),universes:[...universes].sort(),forbiddenLabels:0,emptyVerificationWrappers:0,retainedXThermWarnings:warnings},null,2));
