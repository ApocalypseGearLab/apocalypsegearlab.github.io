import { readFile, readdir, mkdir, writeFile } from 'node:fs/promises';
import { resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { load } from 'cheerio';
import sharp from 'sharp';
import { productSchema } from '../src/lib/product-schema';
import type { Product } from '../src/lib/products';
import { isPubliclyVisible, isCommerciallyApproved, mandatoryHold } from '../src/lib/release-policy';
import { categoryUniverse, UNIVERSE_IDS } from '../src/config/taxonomy';
import { productArtwork, productSocialImage } from '../src/lib/product-artwork';
import { translate } from '../src/i18n/translate';

const site = new URL('https://apocalypsegearlab.github.io');
const args = new Set(process.argv.slice(2));
const sourceOnly = args.has('--source-only');
const production = args.has('--production');
const productionAssets = args.has('--production-assets');
const requireOfficial = args.has('--require-official');
const root = resolve('dist');

export function imageUrl(value: string, page: URL): URL {
  const url = new URL(value, page);
  if (url.protocol !== 'https:' || url.origin !== site.origin || url.username || url.password || url.search || url.hash) {
    throw new Error('Image must be a credential-free, same-origin HTTPS asset URL without query or fragment');
  }
  return url;
}

async function publicBytes(url: URL): Promise<{ bytes: Buffer; mime: string }> {
  let current = url;
  for (let redirects = 0; redirects <= 3; redirects++) {
    const response = await fetch(current, { redirect: 'manual', signal: AbortSignal.timeout(15000) });
    if ([301, 302, 303, 307, 308].includes(response.status)) {
      current = imageUrl(response.headers.get('location') ?? '', current);
      continue;
    }
    if (!response.ok) throw new Error(`${current.href}: HTTP ${response.status}`);
    return { bytes: Buffer.from(await response.arrayBuffer()), mime: response.headers.get('content-type')?.split(';')[0] ?? '' };
  }
  throw new Error('Too many redirects');
}

async function decoded(bytes: Buffer, width: number, height: number) {
  const image = sharp(bytes, { failOn: 'warning' });
  const metadata = await image.metadata();
  if (metadata.format !== 'webp' || metadata.width !== width || metadata.height !== height) throw new Error('Image format/dimensions disagree with manifest');
  await image.raw().toBuffer();
}

export async function audit() {
  const supported = new Set(['--source-only', '--production', '--production-assets', '--require-official']);
  for (const arg of args) if (!supported.has(arg)) throw new Error(`Unknown audit option: ${arg}`);
  if ([sourceOnly, production, productionAssets].filter(Boolean).length > 1) throw new Error('Choose one audit mode: source-only, production, production-assets, or built (default)');
  const files = (await readdir('src/data/products', { recursive: true })).filter(file => file.endsWith('.json')).sort();
  const identities = new Map<string, string>();
  const totals = Object.fromEntries(UNIVERSE_IDS.map(id => [id, { products: 0, public: 0, suspended: 0, eligible: 0, sourceImages: 0, metadataPassed: 0, officialVerified: 0 }]));
  const rows: Record<string, any>[] = [];
  const errors: string[] = [];
  const invalidFiles: string[] = [];
  let templates = 0;
  for (const file of files) {
    let raw;
    let product: Product;
    try {
      raw = JSON.parse(await readFile(`src/data/products/${file}`, 'utf8'));
      product = { id: file.replaceAll('\\', '/').replace(/\.json$/, ''), data: productSchema.parse(raw) } as Product;
    } catch (error) {
      invalidFiles.push(file);
      errors.push(`${file}: invalid product JSON/schema: ${(error as Error).message}`);
      continue;
    }
    if (product.data.reviewStatus === 'template') { templates++; continue; }
    const universe = categoryUniverse(product.data.category);
    const visible = isPubliclyVisible(product);
    const hold = mandatoryHold(product);
    const eligible = visible && !hold;
    const social = productSocialImage(product.id);
    const { supplied } = productArtwork(product.id);
    const row: Record<string, any> = {
      id: product.id, universe, public: visible, commerciallyApproved: isCommerciallyApproved(product),
      suspended: Boolean(hold), suspensionReason: hold ?? null, eligible,
      sourceImageField: raw.image?.src ?? null,
      frenchUrl: new URL(`/fr/gear/${product.id}/`, site).href,
      selectedImage: social ? new URL(social.src, site).href : null,
      width: social?.width ?? null, height: social?.height ?? null,
      rights: supplied?.rightsStatus ?? null, accuracy: supplied?.accuracyStatus ?? null,
      officialPhotoVerified: false,
      references: supplied?.references ?? [], reviewNote: supplied?.reviewNote ?? null,
      sourcePassed: false, htmlPassed: null, errors: [] as string[],
    };
    rows.push(row);
    const count = totals[universe]!;
    count.products++; if (visible) count.public++; if (hold) count.suspended++; if (eligible) count.eligible++;
    for (const identity of [product.data.links.amazonCa.asin && `asin:${product.data.links.amazonCa.asin}`, `model:${product.data.brand.trim().toLowerCase()}:${(product.data.modelNumber ?? product.data.name).trim().toLowerCase()}`].filter(Boolean) as string[]) {
      const previous = identities.get(identity);
      if (previous) errors.push(`Duplicate identity ${identity}: ${previous}, ${product.id}`);
      identities.set(identity, product.id);
    }
    if (!visible) continue;
    try {
      if (!social) {
        if (eligible) throw new Error('No rights/accuracy-approved image');
        row.exemption = 'Suspended; rejected artwork must not be published';
        continue;
      }
      if (!supplied) throw new Error('Selected image has no imported provenance record');
      if (supplied.category !== universe) throw new Error('Image universe differs from product taxonomy');
      if (raw.image?.src && raw.image.src !== social.src) throw new Error('Product JSON and selected image disagree');
      const bytes = await readFile(supplied.file);
      if (bytes.length !== supplied.bytes || createHash('sha256').update(bytes).digest('hex') !== supplied.sha256) throw new Error('Image hash/size differs from provenance manifest');
      await decoded(bytes, social.width, social.height);
      row.bytes = bytes.length;
      row.sourcePassed = true;
      if (eligible) count.sourceImages++;
      // Current manifests explicitly attest illustrations only. Never promote
      // reviewed-illustration to an authenticated official photograph.
      if (requireOfficial && eligible) row.errors.push('Official exact-model photograph and reuse rights remain unverified');
      if (productionAssets) {
        const url = imageUrl(row.selectedImage, site);
        const delivery = await publicBytes(url);
        row.delivery = { url: url.href, mime: delivery.mime, bytes: delivery.bytes.length };
        if (delivery.mime !== 'image/webp') throw new Error('Wrong public asset MIME');
        if (createHash('sha256').update(delivery.bytes).digest('hex') !== supplied.sha256) throw new Error('Public asset differs from approved source');
        await decoded(delivery.bytes, social.width, social.height);
        row.assetPublicPassed = true;
        errors.push(...row.errors.map((message: string) => `${product.id}: ${message}`));
        continue;
      }
      if (sourceOnly) {
        errors.push(...row.errors.map((message: string) => `${product.id}: ${message}`));
        continue;
      }
      const page = new URL(row.frenchUrl);
      const htmlResponse = production ? await publicBytes(page) : null;
      if (htmlResponse && htmlResponse.mime !== 'text/html') throw new Error(`Wrong page MIME: ${htmlResponse.mime}`);
      const html = htmlResponse?.bytes.toString('utf8') ?? await readFile(resolve(root, `.${page.pathname}`, 'index.html'), 'utf8');
      const $ = load(html);
      const check = (ok: unknown, message: string) => { if (!ok) row.errors.push(message); };
      const meta = (key: string) => $(`meta[property="${key}"],meta[name="${key}"]`).attr('content');
      row.observed = { title: $('title').text(), canonical: $('link[rel="canonical"]').attr('href'), ogImage: meta('og:image') ?? null, width: meta('og:image:width') ?? null, height: meta('og:image:height') ?? null, imageAlt: meta('og:image:alt') ?? null };
      check($('html').attr('lang') === 'fr-CA', 'Wrong HTML language');
      check($('title').text() === translate(`${product.data.name}: specs, uses & limitations | ApocalypseGearLab`), 'Incorrect French title');
      check(meta('description') === translate(product.data.summary), 'Incorrect French description');
      check($('link[rel="canonical"]').length === 1 && $('link[rel="canonical"]').attr('href') === page.href, 'Canonical is not self-referencing');
      for (const [lang, path] of [['fr-CA', page.pathname], ['en-CA', `/gear/${product.id}/`], ['x-default', `/gear/${product.id}/`]] as const) {
        check($(`link[hreflang="${lang}"]`).attr('href') === new URL(path, site).href, `Invalid ${lang} hreflang`);
      }
      for (const [key, expected] of Object.entries({ 'og:title': $('title').text(), 'og:description': meta('description'), 'og:type': 'article', 'og:url': page.href, 'og:locale': 'fr_CA', 'og:image:width': String(social.width), 'og:image:height': String(social.height), 'og:image:alt': translate(social.alt), 'og:image:type': 'image/webp', 'twitter:card': 'summary_large_image', 'twitter:title': $('title').text(), 'twitter:description': meta('description'), 'twitter:image:alt': translate(social.alt) })) {
        check(meta(key) === expected, `Missing/inconsistent ${key}`);
      }
      check($('meta[property="og:image"]').length === 1, 'Expected exactly one ORACLE-readable og:image');
      const og = meta('og:image') ?? '';
      check(og.startsWith('https://'), 'og:image is not absolute HTTPS');
      if (!og) throw new Error('No og:image URL supplied; image request skipped');
      const url = imageUrl(og, page);
      check(url.href === row.selectedImage && meta('twitter:image') === url.href, 'Social image differs from selected primary image');
      const primary = $('.product-artwork--detail img');
      check(primary.length === 1 && new URL(primary.attr('src') ?? '', site).href === url.href, 'Page and social image differ');
      check(primary.attr('alt') === translate(social.alt), 'Primary image alt differs');
      check(primary.attr('width') === String(social.width) && primary.attr('height') === String(social.height) && primary.attr('loading') === 'eager', 'Primary dimensions/loading invalid');
      check(/illustration/i.test(meta('og:image:alt') ?? '') && /illustration/i.test($('.product-artwork--detail figcaption').text()), 'Concept illustration disclosure missing');
      const imagePath = resolve(root, '.' + decodeURIComponent(url.pathname));
      check(imagePath.startsWith(root + sep), 'Image escapes build directory');
      const delivery = production ? await publicBytes(url) : { bytes: await readFile(imagePath), mime: 'image/webp' };
      row.delivery = { url: url.href, mime: delivery.mime, bytes: delivery.bytes.length };
      check(delivery.mime === 'image/webp', `Wrong image MIME: ${delivery.mime}`);
      check(createHash('sha256').update(delivery.bytes).digest('hex') === supplied.sha256, 'Delivered image differs from approved source');
      await decoded(delivery.bytes, social.width, social.height);
      const schemas = $('script[type="application/ld+json"]').toArray().map(el => JSON.parse($(el).text()));
      const breadcrumb = schemas.find(item => item['@type'] === 'BreadcrumbList');
      check(breadcrumb?.itemListElement?.at(-1)?.item === page.href, 'Breadcrumb URL is not French/self-referencing');
      const schema = schemas.find(item => item['@type'] === 'Product');
      if (row.commerciallyApproved) {
        check(schema?.image === url.href && schema?.url === page.href && schema?.inLanguage === 'fr-CA' && schema?.description === meta('description'), 'Product structured data disagrees with page');
      } else {
        check(!schema, 'Informational profile must not acquire approved Product schema');
        check(meta('robots')?.includes('noindex'), 'Informational profile lost noindex');
      }
      if (hold) check($('[data-product-purchase] a[data-affiliate-click]').length === 0, 'Suspended product has an active affiliate link');
      // Reciprocal English HTML is checked locally; production fetches are limited
      // to the requested French pages and their actual social image responses.
      if (!production) {
        const catalogue = load(await readFile(resolve(root, 'fr/gear/index.html'), 'utf8'));
        const card = catalogue(`article[data-product-id="${product.id}"]`);
        check(card.length === 1 && card.find(`a[href="${page.pathname}"]`).length > 0, 'French catalogue entry missing or duplicated');
        const en = load(await readFile(resolve(root, `gear/${product.id}/index.html`), 'utf8'));
        check(en('link[hreflang="fr-CA"]').attr('href') === page.href, 'English hreflang is not reciprocal');
        const sitemap = await readFile(resolve(root, 'sitemap-fr-0.xml'), 'utf8');
        check(sitemap.includes(`<loc>${page.href}</loc>`) === row.commerciallyApproved, 'Sitemap disagrees with publication/noindex status');
      }
      row.htmlPassed = row.errors.length === 0;
      if (eligible && row.htmlPassed) count.metadataPassed++;
    } catch (error) {
      row.errors.push((error as Error).message);
      if (!sourceOnly) row.htmlPassed = false;
    }
    if (row.errors.length) errors.push(...row.errors.map((message: string) => `${product.id}: ${message}`));
  }
  const report = { generatedAt: new Date().toISOString(), mode: productionAssets ? 'production-assets' : production ? 'production' : sourceOnly ? 'source' : 'built', requireOfficial, jsonFiles: files.length, invalidFiles, products: rows.length, templates, public: rows.filter(row => row.public).length, suspended: rows.filter(row => row.suspended).length, eligible: rows.filter(row => row.eligible).length, eligibleWithoutJsonImage: rows.filter(row => row.eligible && !row.sourceImageField).map(row => row.id), universes: totals, errors, productsAudit: rows };
  await mkdir('docs/qa/oracle', { recursive: true });
  const destination = `docs/qa/oracle/${report.mode}${requireOfficial ? '-official' : ''}.json`;
  await writeFile(destination, JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify({ ...report, productsAudit: undefined, errors: errors.slice(0, 10), report: destination }, null, 2));
  if (errors.length) process.exitCode = 1;
  return report;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await audit();
