import { readdirSync, readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve, sep } from 'node:path';
import { load } from 'cheerio';
import { translate, normalize } from '../src/i18n/translate';

const phrases = new Map<string, Set<string>>();
const add = (text: string, route: string) => {
  const key = normalize(text);
  if (!/[a-zA-Z]/.test(key)) return;
  if (!phrases.has(key)) phrases.set(key, new Set());
  phrases.get(key)!.add(route);
};
const schemaText = (value: unknown, route: string): void => {
  if (Array.isArray(value)) return value.forEach(item => schemaText(item, route));
  if (!value || typeof value !== 'object') return;
  const record = value as Record<string, unknown>;
  for (const [key, child] of Object.entries(record)) {
    if (typeof child === 'string' && ['name', 'description', 'headline', 'text'].includes(key) && record['@type'] !== 'Brand') add(child, route);
    else schemaText(child, route);
  }
};
for (const file of readdirSync('dist', { recursive: true }).map(String).filter(file => file.endsWith('.html') && !file.split(sep).join('/').startsWith('fr/'))) {
  const route = '/' + file.split(sep).join('/').replace(/index\.html$/, '');
  const $ = load(readFileSync(resolve('dist', file), 'utf8'));
  $('*').not('script,style').contents().each((_, node) => {
    if (node.type === 'text' && !['script', 'style'].includes((node.parent as {name?: string})?.name ?? '') && !$(node).parents('[data-language-option], [data-i18n-ignore]').length) add(node.data, route);
  });
  $('*').each((_, node) => { for (const attr of ['alt', 'title', 'aria-label', 'placeholder']) add($(node).attr(attr) ?? '', route); });
  $('meta[name=description],meta[property="og:title"],meta[property="og:description"],meta[property="og:image:alt"],meta[name="twitter:title"],meta[name="twitter:description"],meta[name="twitter:image:alt"]').each((_, node) => add($(node).attr('content') ?? '', route));
  $('script[type="application/ld+json"]').each((_, node) => schemaText(JSON.parse($(node).text()), route));
}
const inventory = [...phrases].map(([en, pages]) => {
  let fr: string | null = null;
  try { fr = translate(en); } catch { /* List all missing entries together. */ }
  return { en, fr, pages: [...pages] };
});
mkdirSync('tmp', { recursive: true });
writeFileSync('tmp/i18n-inventory.json', JSON.stringify(inventory, null, 2) + '\n');
writeFileSync('tmp/i18n-missing.json', JSON.stringify(Object.fromEntries(inventory.filter(row => !row.fr).map(row => [row.en, ''])), null, 2) + '\n');
console.log(JSON.stringify({ phrases: inventory.length, missing: inventory.filter(row => !row.fr).length, inventory: 'tmp/i18n-inventory.json', missingFile: 'tmp/i18n-missing.json' }));
