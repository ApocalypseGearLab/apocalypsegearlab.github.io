import { test, expect } from '@playwright/test';
import { readFileSync, readdirSync } from 'node:fs';
import { getMerchantLinks } from '../../src/lib/affiliate';
import type { Product } from '../../src/lib/products';

const products = readdirSync('src/data/products').filter(file => file.endsWith('.json') && !file.startsWith('template')).map(file => ({id:file.replace(/\.json$/, ''), data:JSON.parse(readFileSync('src/data/products/' + file, 'utf8'))} as Product));
const permittedUrls = new Set(products.map(p => getMerchantLinks(p)[0]?.href).filter(Boolean));

test('recorded product buttons work on catalogues and profiles in isolated new tabs without Amazon traffic', async ({page, context}) => {
  // 63 isolated new tabs and 26 profiles are checked sequentially; this is
  // functional QA, not a 30-second performance budget for the entire catalogue.
  test.setTimeout(90_000);
  const intercepted: string[] = [];
  await context.route('https://www.amazon.ca/**', async route => {
    const url = route.request().url();
    expect(permittedUrls.has(url)).toBe(true);
    intercepted.push(url);
    await route.fulfill({status:200,contentType:'text/html',body:'<!doctype html><html lang="en"><title>Local retailer simulation</title><h1>Local retailer simulation</h1></html>'});
  });
  const checkNewTab = async (button: ReturnType<typeof page.locator>) => {
    const url = await button.getAttribute('href');
    await expect(button).toHaveAttribute('target', '_blank');
    await expect(button).toHaveAttribute('rel', 'sponsored nofollow noopener');
    await expect(button).toHaveAccessibleName(/affiliate link, opens in a new tab/);
    const popupPromise = context.waitForEvent('page');
    await button.click();
    const popup = await popupPromise;
    await expect(popup).toHaveURL(url!);
    await expect(popup.getByRole('heading', {name:'Local retailer simulation'})).toBeVisible();
    expect(await popup.evaluate(() => window.opener === null)).toBe(true);
    await popup.close();
  };
  for (const path of ['/gear/', '/blackout/', '/fallout/', '/outbreak/']) {
    await page.goto(path);
    for (const button of await page.locator('a[data-affiliate-click]').all()) await checkNewTab(button);
  }
  for (const product of products) {
    await page.goto('/gear/' + product.id + '/');
    const own = page.locator('[data-product-purchase]');
    if (getMerchantLinks(product)[0]?.href) await checkNewTab(own.locator('a[data-affiliate-click]'));
    else {
      await expect(own.locator('a[href*="amazon.ca"]')).toHaveCount(0);
      await expect(own.getByRole('link', {disabled:true})).not.toHaveAttribute('href');
    }
    // Related cards apply the same product-level decision as the catalogue.
    for (const card of await page.locator('article.card[data-product-id]').all()) {
      const id = await card.getAttribute('data-product-id');
      const related = products.find(p => p.id === id)!;
      await expect(card.locator('a[data-affiliate-click]')).toHaveCount(getMerchantLinks(related)[0]?.href ? 1 : 0);
    }
  }
  expect(intercepted).toHaveLength(63); // 21 catalogue + 21 sector + 21 individual buttons
  expect(new Set(intercepted)).toEqual(permittedUrls);
});
