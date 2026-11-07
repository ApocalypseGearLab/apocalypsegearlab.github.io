import { load } from 'cheerio';
import a from './fr-a.json';
import b from './fr-b.json';
import c from './fr-c.json';
import extra from './fr-extra.json';
import fixtures from './fr-fixtures.json';
import whiteout from './fr-whiteout.json';
import { localizedPath } from './routes';

export const french: Record<string, string> = { ...a, ...b, ...c, ...extra, ...fixtures, ...whiteout };
export const normalize = (text: string) => text.replace(/\s+/gu, ' ').trim();
/** Fail closed: new English content cannot silently ship on a French page. */
export function translate(text: string, strict = true): string {
  const key = normalize(text);
  if (!/[a-zA-Z]/.test(key)) return text;
  let value = french[key];
  let match: RegExpExecArray | null;
  if (!value && (match = /^(\d+) profiles$/.exec(key))) value = match[1] + (match[1] === '1' ? ' fiche' : ' fiches');
  if (!value && (match = /^(\d+) categories · Documented profiles, practical limits$/.exec(key))) value = match[1] + ' catégories · Fiches documentées, limites pratiques';
  if (!value && (match = /^(\d+) matching equipment profiles · All sectors · All categories$/.exec(key))) value = match[1] + ' fiches d’équipement correspondantes · Tous les secteurs · Toutes les catégories';
  if (!value && (match = /^(Sources checked|Last verified) (\d{4}-\d{2}-\d{2})$/.exec(key))) value = (match[1] === 'Sources checked' ? 'Sources vérifiées le ' : 'Dernière vérification le ') + match[2];
  if (!value && /^Source \d+$/.test(key)) value = key;
  if (!value && key.endsWith('.') && french[key.slice(0, -1)]) value = french[key.slice(0, -1)] + '.';
  if (!value) {
    const sentences = key.split(/(?<=\.) +/);
    if (sentences.length > 1) {
      try { value = sentences.map(sentence => translate(sentence, true)).join(' '); } catch { /* Report the complete missing phrase below. */ }
    }
  }
  if (!value) {
    if (strict) throw new Error('Missing fr-CA translation: ' + JSON.stringify(key));
    return text;
  }
  return (text.match(/^\s*/u)?.[0] ?? '') + value + (text.match(/\s*$/u)?.[0] ?? '');
}

/** Translate rendered content, never commerce records, IDs, specifications' URLs,
 * executable scripts, styles or affiliate tracking attributes. The same renderer
 * serves all product visibility/safety/merchant gates in both languages. */
export function localizeHtml(html: string, site: URL, strict = true): string {
  const missing = new Set<string>();
  const t = (text: string) => {
    try { return translate(text, strict); }
    catch { missing.add(normalize(text)); return text; }
  };
  const $ = load(html);
  const localUrl = (value: string) => {
    if (!value || value.startsWith('#')) return value;
    const url = new URL(value, site);
    if (url.origin !== site.origin) return value;
    // Only page URLs are localized. Asset paths and downloads stay byte-identical.
    if (!url.pathname.endsWith('/') && url.pathname !== '/404.html') return value;
    url.pathname = localizedPath(url.pathname, 'fr');
    return value.startsWith('/') ? url.pathname + url.search + url.hash : url.href;
  };
  $('*').not('script,style').contents().each((_, node) => {
    if (node.type !== 'text' || ['script', 'style'].includes(node.parent?.type ?? '') || ['script', 'style'].includes((node.parent as {name?: string})?.name ?? '')) return;
    if ($(node).parents('[data-language-option], [data-i18n-ignore]').length) return;
    node.data = t(node.data);
  });
  $('*').each((_, node) => {
    for (const attr of ['alt', 'title', 'aria-label', 'placeholder']) {
      const value = $(node).attr(attr);
      if (value) $(node).attr(attr, t(value));
    }
  });
  $('meta[name="description"],meta[property="og:title"],meta[property="og:description"],meta[property="og:image:alt"],meta[name="twitter:title"],meta[name="twitter:description"],meta[name="twitter:image:alt"]').each((_, node) => {
    $(node).attr('content', t($(node).attr('content') ?? ''));
  });
  $('a[href]').not('[data-language-option]').each((_, node) => {
    $(node).attr('href', localUrl($(node).attr('href')!));
  });
  $('[data-catalogue-entry][data-name]').each((_, node) => {
    $(node).attr('data-name', t($(node).attr('data-name')!));
  });
  const localizedSchema = (value: unknown): unknown => {
    if (Array.isArray(value)) return value.map(localizedSchema);
    if (!value || typeof value !== 'object') return value;
    const record = value as Record<string, unknown>;
    const translated: Record<string, unknown> = {};
    for (const [key, child] of Object.entries(record)) {
      if (typeof child === 'string' && ['name', 'description', 'headline', 'text'].includes(key) && record['@type'] !== 'Brand') translated[key] = t(child);
      else if (typeof child === 'string' && ['url', '@id', 'item'].includes(key) && record['@type'] !== 'Organization') translated[key] = localUrl(child);
      else translated[key] = localizedSchema(child);
    }
    if (['WebSite', 'WebPage', 'CollectionPage', 'Product'].includes(String(record['@type']))) translated.inLanguage = 'fr-CA';
    return translated;
  };
  $('script[type="application/ld+json"]').each((_, node) => {
    $(node).text(JSON.stringify(localizedSchema(JSON.parse($(node).text()))).replace(/</g, '\\u003c'));
  });
  if (missing.size) throw new Error('Missing fr-CA translations (' + missing.size + '):\n' + JSON.stringify([...missing], null, 2));
  return $.html();
}
