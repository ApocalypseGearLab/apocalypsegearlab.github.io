import { test, expect } from './fixtures';
import AxeBuilder from '@axe-core/playwright';
import { mkdirSync, readFileSync, readdirSync } from 'node:fs';
import { load } from 'cheerio';
import { productSchema } from '../../src/lib/product-schema';
import { isPubliclyVisible, mandatoryHold } from '../../src/lib/release-policy';
import type { Product } from '../../src/lib/products';

test('all 54 eligible French pages and their exact social image URLs respond over HTTP', async ({ request }) => {
  const products = readdirSync('src/data/products').filter(file => file.endsWith('.json')).map(file => ({ id: file.slice(0, -5), data: productSchema.parse(JSON.parse(readFileSync(`src/data/products/${file}`, 'utf8'))) } as Product)).filter(p => isPubliclyVisible(p) && !mandatoryHold(p));
  expect(products).toHaveLength(54);
  for (const product of products) {
    const path = `/fr/gear/${product.id}/`;
    const response = await request.get(path);
    expect(response.status(), product.id).toBe(200);
    expect(response.headers()['content-type']).toMatch(/text\/html/);
    const html = load(await response.text());
    expect(html('link[rel="canonical"]').attr('href')).toBe('https://apocalypsegearlab.github.io' + path);
    const image = new URL(html('meta[property="og:image"]').attr('content')!);
    expect(image.origin).toBe('https://apocalypsegearlab.github.io');
    expect(image.pathname).toBe(html('.product-artwork--detail img').attr('src'));
    const asset = await request.get(image.pathname);
    expect(asset.status(), image.pathname).toBe(200);
    expect(asset.headers()['content-type']).toMatch(/image\/webp/);
    expect(await asset.body()).toEqual(readFileSync('dist' + image.pathname));
  }
});

for (const [universe, id] of [
  ['blackout', 'midland-er310'], ['fallout', 'nanuk-904-first-aid-kit'],
  ['outbreak', '3m-2091-p100-particulate-filters'],
  ['whiteout', 'therm-a-rest-neoair-xtherm-nxt-review'],
]) {
  test(`${universe}: French primary image, responsive layout and accessibility`, async ({ page }) => {
    await page.goto(`/fr/gear/${id}/`);
    const primary = page.locator('.product-artwork--detail img');
    await expect(primary).toHaveCount(1);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', 'https://apocalypsegearlab.github.io' + await primary.getAttribute('src'));
    for (const width of [375, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await primary.scrollIntoViewIfNeeded();
      await expect(primary).toBeVisible();
      expect(await primary.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
      mkdirSync('.tools/qa/oracle', { recursive: true });
      await page.screenshot({ path: `.tools/qa/oracle/${universe}-${width}.png`, fullPage: true });
    }
  });
}
