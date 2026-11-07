import { test, expect } from './fixtures';
import AxeBuilder from '@axe-core/playwright';
import { readFileSync } from 'node:fs';

const copy: Record<string, { summary: string; caution?: string }> = JSON.parse(readFileSync('src/data/whiteout-card-copy.json', 'utf8'));
const french: Record<string, string> = JSON.parse(readFileSync('src/i18n/fr-whiteout.json', 'utf8'));
const products = Object.fromEntries(Object.keys(copy).map(id => [id, JSON.parse(readFileSync(`src/data/products/${id}.json`, 'utf8'))]));

for (const width of [320, 375, 768, 1440]) for (const lang of ['en', 'fr']) {
  test(`WHITEOUT compact cards retain disclosures, variants, safety and tracked purchases ${lang} ${width}px`, async ({ page, context }) => {
    test.setTimeout(60_000);
    await page.setViewportSize({ width, height: 1000 });
    const prefix = lang === 'fr' ? '/fr' : '';
    const t = (value: string): string => {
      const translated = lang === 'fr' ? french[value] : value;
      expect(translated, `Translation for ${value}`).toBeTruthy();
      return translated!;
    };
    await context.route('https://www.amazon.ca/**', route => route.fulfill({ body: 'Local retailer simulation; no live offer verification' }));
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    for (const route of ['/whiteout/', '/gear/?sector=whiteout']) {
      await page.goto(prefix + route);
      const cards = page.locator('article.card:visible');
      await expect(cards).toHaveCount(6);
      for (const [id, content] of Object.entries(copy)) {
        const card = page.locator(`article[data-product-id="${id}"]`);
        const product = products[id];
        await expect(card.locator('figcaption')).toHaveText(lang === 'fr' ? 'Illustration conceptuelle, et non photographie du produit.' : 'Conceptual illustration, not a product photograph.');
        await expect(card.locator('figcaption > span')).toHaveCount(1);
        await expect(card.locator('[data-artwork-caveat], [data-product-review], [data-listing-status], [data-purchase-destination]')).toHaveCount(0);
        await expect(card.locator(':scope > p').filter({ hasText: t(content.summary) })).toHaveCount(1);
        await expect(card.locator('.card-caution')).toHaveCount(content.caution ? 1 : 0);
        if (content.caution) await expect(card.locator('[data-card-caution]')).toHaveText(t(content.caution));
        await expect(card.locator('.profile-details')).toHaveAttribute('href', `${prefix}/gear/${id}/`);
        await expect(card.locator('[data-link-status=active]')).toHaveCount(1);
        await expect(card.locator(`.card-purchase a[href="${prefix}/affiliate-disclosure/"]`)).toHaveCount(1);
        await expect(card.locator('.card-purchase')).toContainText(lang === 'fr' ? 'En tant que partenaire Amazon' : 'As an Amazon Associate');
        const button = card.locator('a[data-affiliate-click]');
        await expect(button).toHaveAttribute('href', product.links.amazonCa.url);
        await expect(button).toHaveAttribute('rel', 'sponsored nofollow noopener');
        await expect(button).toHaveAttribute('data-marketplace', 'ca');
        const order = await card.evaluate(node => {
          const figure=node.querySelector('figure')!, label=node.querySelector(':scope > .label')!, brand=node.querySelector('.brand')!, title=node.querySelector('h3')!, details=node.querySelector('.profile-details')!, purchase=node.querySelector('.card-purchase')!, button=node.querySelector('a[data-affiliate-click]')!;
          const precedes=(a:Element,b:Element)=>Boolean(a.compareDocumentPosition(b)&Node.DOCUMENT_POSITION_FOLLOWING);
          const warning=node.querySelector('[data-card-caution]');
          return [precedes(figure,label),precedes(label,brand),precedes(brand,title),precedes(title,details),precedes(details,purchase),!warning||(precedes(warning,details)&&warning.getBoundingClientRect().bottom<=button.getBoundingClientRect().top)];
        });
        expect(order.every(Boolean)).toBe(true);
      }
      const beanie = page.locator('[data-product-id=smartwool-thermal-merino-reversible-cuffed-beanie]');
      await expect(beanie).toContainText(lang === 'fr' ? 'Vison chiné / taille unique' : 'Mink Heather / One Size');
      await expect(beanie).not.toContainText(/\bBlack\b|\bnoir\b/i);
      const xtherm=page.locator('[data-product-id=therm-a-rest-neoair-xtherm-nxt-review]');
      await expect(xtherm.locator('[data-card-caution]')).toContainText(lang === 'fr' ? 'ne pas utiliser sous −20 °C' : 'Do not use below −20 °C');
      // Controls share the same baseline in each grid row, despite differing copy lengths.
      expect(await cards.evaluateAll(nodes => {
        const rows = new Map<number, number[]>();
        for (const node of nodes) {
          const top = Math.round(node.getBoundingClientRect().top);
          rows.set(top, [...(rows.get(top) ?? []), node.querySelector('a[data-affiliate-click]')!.getBoundingClientRect().bottom]);
        }
        return [...rows.values()].every(bottoms => Math.max(...bottoms) - Math.min(...bottoms) <= 1);
      })).toBe(true);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      if (route === '/whiteout/') {
        expect((await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations).toEqual([]);
        // Every real eligible card opens its unchanged destination and emits exactly one GA4 event.
        for (const id of Object.keys(copy)) {
          const button = page.locator(`article[data-product-id="${id}"] a[data-affiliate-click]`);
          const opened = context.waitForEvent('page');
          await button.focus(); await page.keyboard.press('Enter');
          const popup = await opened; await expect(popup).toHaveURL(products[id].links.amazonCa.url); await popup.close();
        }
        const events = await page.evaluate(() => ((window as unknown as {dataLayer: unknown[][]}).dataLayer ?? []).map(event => Array.from(event)).filter(event => event[1] === 'affiliate_click').map(event => event[2]));
        expect(events).toHaveLength(6);
        for (const id of Object.keys(copy)) expect(events).toContainEqual(expect.objectContaining({ product_id:id, asin:products[id].links.amazonCa.asin, destination_url:products[id].links.amazonCa.url, marketplace:'ca' }));
      }
    }
    if (width === 375) for (const id of Object.keys(copy)) {
      await page.goto(`${prefix}/gear/${id}/`);
      const product = products[id];
      await expect(page.locator('[data-product-purchase] [data-purchase-destination]')).toContainText(t(product.research.purchaseDestination.selectionNote));
      await expect(page.locator('[data-product-review]')).not.toHaveCount(0);
      await expect(page.locator('meta[name=robots]')).toHaveAttribute('content','noindex, nofollow');
      await expect(page.locator('.product-specifications tbody tr')).toHaveCount(product.specs.length);
      await expect(page.locator('[data-product-purchase] a[data-affiliate-click]')).toHaveAttribute('href',product.links.amazonCa.url);
      if (id !== 'therm-a-rest-neoair-xtherm-nxt-review') await expect(page.locator('.product-artwork--detail [data-artwork-caveat]')).toHaveCount(1);
    }
    expect(errors).toEqual([]);
  });
}

for (const lang of ['en','fr']) test(`WHITEOUT concise cards preserve native links and warning without JavaScript ${lang}`, async ({ browser, baseURL }) => {
  const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:375,height:1000}});
  const page=await context.newPage();
  await page.goto(`${baseURL}${lang==='fr'?'/fr':''}/whiteout/`);
  for(const id of Object.keys(copy)) await expect(page.locator(`article[data-product-id="${id}"] a[data-affiliate-click]`)).toHaveAttribute('href',products[id].links.amazonCa.url);
  await expect(page.locator('[data-product-id=therm-a-rest-neoair-xtherm-nxt-review] [data-card-caution]')).toContainText(lang==='fr'?'ne pas utiliser sous −20 °C':'Do not use below −20 °C');
  await context.close();
});
