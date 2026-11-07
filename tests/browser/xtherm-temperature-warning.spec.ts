import { test, expect } from './fixtures';
import { mkdirSync, readFileSync } from 'node:fs';

const id = 'therm-a-rest-neoair-xtherm-nxt-review';
const product = JSON.parse(readFileSync(`src/data/products/${id}.json`, 'utf8'));
const french = JSON.parse(readFileSync('src/i18n/fr-whiteout.json', 'utf8'));
const url = 'https://www.amazon.ca/dp/B0CS54SN91?tag=apocalypsegear-20';

for (const width of [320, 375, 390, 1440]) for (const lang of ['en', 'fr']) {
  test(`XTherm retained temperature warning before the native purchase link ${lang} ${width}px`, async ({ page, context }) => {
    await page.setViewportSize({ width, height: 1000 });
    const prefix = lang === 'fr' ? '/fr' : '';
    const note = lang === 'fr' ? french[product.research.purchaseDestination.selectionNote] : product.research.purchaseDestination.selectionNote;
    await page.goto(`${prefix}/gear/${id}/#buy`);
    const purchase = page.locator('[data-product-purchase]');
    await expect(purchase.locator('[data-purchase-destination=product-page]')).toHaveText(new RegExp(lang === 'fr' ? 'ne pas utiliser sous −20 °C' : 'Do not use below −20 °C'));
    await expect(purchase).toContainText(note);
    const button = purchase.locator('a[data-affiliate-click]');
    await expect(button).toHaveAttribute('href', url);
    await expect(button).toHaveAttribute('rel', 'sponsored nofollow noopener');
    expect(await purchase.evaluate(node => {
      const note = node.querySelector('[data-purchase-destination]')!, link = node.querySelector('a[data-affiliate-click]')!;
      return Boolean(note.compareDocumentPosition(link) & Node.DOCUMENT_POSITION_FOLLOWING) && note.getBoundingClientRect().bottom <= link.getBoundingClientRect().top;
    })).toBe(true);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await expect(page.locator('meta[name=robots]')).toHaveAttribute('content', 'noindex, nofollow');
    if (width === 375 || width === 1440) {
      // Capture the settled original page before opening the simulated retailer
      // window, so popup focus/compositing does not affect the visual evidence.
      mkdirSync('docs/qa/xtherm-temperature-review/screenshots', { recursive: true });
      await page.locator('.brand__emblem').evaluate((image: HTMLImageElement) => image.decode());
      await page.bringToFront();
      await page.evaluate(async () => {
        await document.fonts.ready;
        window.scrollTo(0, document.querySelector('[data-product-purchase]')!.getBoundingClientRect().top + scrollY - 120);
        await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      });
      await page.screenshot({ path: `docs/qa/xtherm-temperature-review/screenshots/purchase-${lang}-${width}.png` });
    }
    await context.route('https://www.amazon.ca/**', route => route.fulfill({ body: 'Local retailer simulation' }));
    const popup = context.waitForEvent('page');
    await button.click();
    const opened = await popup; await expect(opened).toHaveURL(url); await opened.close();
    const events = await page.evaluate(() => ((window as unknown as { dataLayer: unknown[][] }).dataLayer ?? []).map(e => Array.from(e)).filter(e => e[1] === 'affiliate_click'));
    expect(events).toHaveLength(1);
    expect(events[0]![2]).toMatchObject({ product_id: id, asin: 'B0CS54SN91', destination_url: url });
    for (const route of ['/gear/', '/whiteout/']) {
      await page.goto(prefix + route);
      const card = page.locator(`article[data-product-id=${id}]`);
      await expect(card.locator('[data-card-caution]')).toContainText(lang === 'fr' ? 'ne pas utiliser sous −20 °C' : 'Do not use below −20 °C');
      expect(await card.evaluate(node => node.querySelector('[data-card-caution]')!.getBoundingClientRect().bottom <= node.querySelector('a[data-affiliate-click]')!.getBoundingClientRect().top)).toBe(true);
      await expect(card.locator('a[data-affiliate-click]')).toHaveAttribute('href', url);
    }
  });
}

for (const lang of ['en', 'fr']) test(`XTherm warning and link work without JavaScript ${lang}`, async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 375, height: 1000 } });
  const page = await context.newPage();
  await page.goto(`http://127.0.0.1:4321${lang === 'fr' ? '/fr' : ''}/gear/${id}/#buy`);
  const purchase = page.locator('[data-product-purchase]');
  await expect(purchase).toContainText(lang === 'fr' ? 'ne pas utiliser sous −20 °C' : 'Do not use below −20 °C');
  await expect(purchase.locator('a[data-affiliate-click]')).toHaveAttribute('href', url);
  await context.close();
});
