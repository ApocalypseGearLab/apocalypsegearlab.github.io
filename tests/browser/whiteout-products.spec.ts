import { test, expect } from './fixtures';
import { readFileSync, mkdirSync } from 'node:fs';
import { WHITEOUT_PRODUCT_IDS } from '../../scripts/whiteout-products-preservation.mjs';
const products = Object.fromEntries(WHITEOUT_PRODUCT_IDS.map(id => [id, JSON.parse(readFileSync(`src/data/products/${id}.json`, 'utf8'))]));

for (const width of [320, 375, 768, 1440]) for (const language of ['en', 'fr']) {
  test(`approved WHITEOUT products render and navigate ${language} ${width}px`, async ({ page, context }) => {
    test.setTimeout(60_000);
    const prefix = language === 'fr' ? '/fr' : '';
    await page.setViewportSize({ width, height: 1000 });
    await context.route('https://www.amazon.ca/**', route => route.fulfill({ body: 'Retailer navigation simulation, not listing evidence.' }));
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(`${prefix}/whiteout/`);
    await expect(page.locator('article.card')).toHaveCount(11);
    for (const id of WHITEOUT_PRODUCT_IDS) {
      const card = page.locator(`article[data-product-id="${id}"]`);
      const image = card.locator('img');
      await image.scrollIntoViewIfNeeded();
      await image.evaluate((node: HTMLImageElement) => node.decode());
      expect(await image.evaluate((node: HTMLImageElement) => node.naturalWidth)).toBeGreaterThan(0);
      await expect(image).toHaveAttribute('srcset', /480w,.*960w,.*1254w/);
      await expect(card.locator('.profile-details')).toHaveAttribute('href', `${prefix}/gear/${id}/`);
      const button = card.locator('a[data-affiliate-click]');
      await expect(button).toHaveAttribute('href', products[id].links.amazonCa.url);
      await expect(button).toHaveAttribute('rel', 'sponsored nofollow noopener');
      await expect(card.locator('.affiliate-note')).toContainText(language === 'fr' ? 'En tant que partenaire Amazon' : 'As an Amazon Associate');
      const popup = context.waitForEvent('page');
      await button.click();
      const opened = await popup;
      await expect(opened).toHaveURL(products[id].links.amazonCa.url);
      await opened.close();
    }
    const micro = page.locator('[data-product-id="kahtoola-microspikes"]');
    await expect(micro.locator('[data-card-caution]')).toContainText(language === 'fr' ? 'ne sont pas incluses' : 'not included');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    if ([375, 1440].includes(width)) {
      mkdirSync('.tools/whiteout-products', { recursive: true });
      await micro.scrollIntoViewIfNeeded();
      await page.screenshot({ path: `.tools/whiteout-products/${language}-${width}.png` });
    }
    for (const id of WHITEOUT_PRODUCT_IDS) {
      await page.goto(`${prefix}/gear/${id}/`);
      await page.locator('.product-artwork--detail img').evaluate((node: HTMLImageElement) => node.decode());
      await expect(page.locator('[data-product-purchase] a[data-affiliate-click]')).toHaveAttribute('href', products[id].links.amazonCa.url);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
    expect(errors).toEqual([]);
  });
}
