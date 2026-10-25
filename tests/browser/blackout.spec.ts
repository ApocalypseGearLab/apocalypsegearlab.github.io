import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFileSync, readdirSync, mkdirSync } from 'node:fs';

const drafts = readdirSync('src/data/products').filter((name) => name.endsWith('.json')).map((file) => ({
  slug: file.replace(/\.json$/, ''), data: JSON.parse(readFileSync(`src/data/products/${file}`, 'utf8')),
})).filter(({ data }) => data.reviewStatus === 'draft');

for (const { slug, data } of drafts) {
  test(`${slug} draft preview, evidence, mobile layout and production exclusion`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(`http://127.0.0.1:4322/gear/${slug}/`);
    await expect(page.locator('h1')).toHaveText(data.name);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://apocalypsegearlab.github.io/gear/${slug}/`);
    await expect(page.getByRole('link', { disabled: true })).toHaveCount(2);
    await expect(page.locator('a[data-affiliate-click]')).toHaveCount(0);
    await expect(page.getByText('Awaiting Associates approval', { exact: true })).toHaveCount(2);
    await expect(page.getByRole('region', { name: `${data.name} specifications`, exact: true })).toBeVisible();
    const jsonLd = await page.locator('script[type="application/ld+json"]').allTextContents();
    const schemas = jsonLd.map((text) => JSON.parse(text));
    expect(schemas.map((schema) => schema['@type'])).toEqual(['BreadcrumbList']);
    expect(schemas[0].itemListElement.map((item: { position: number }) => item.position)).toEqual([1, 2, 3]);
    expect(schemas[0].itemListElement[2].item).toBe(`https://apocalypsegearlab.github.io/gear/${slug}/`);
    expect(await page.locator('a[href^="#source-"]').evaluateAll((links) => links.every((link) => document.getElementById(link.getAttribute('href')!.slice(1))))).toBe(true);
    for (const width of [320, 375, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
      if (slug === 'jackery-explorer-1000-v2' && (width === 320 || width === 1440)) {
        mkdirSync('.tools/qa/phase-2', { recursive: true });
        await page.screenshot({ path: `.tools/qa/phase-2/product-${width}.png`, fullPage: true });
      }
    }
    expect(errors).toEqual([]);
    const response = await page.goto(`http://127.0.0.1:4321/gear/${slug}/`);
    expect(response?.status()).toBe(404);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Page not found');
  });
}

test('the two catalogues expose drafts only in development', async ({ page }) => {
  for (const route of ['/blackout/', '/gear/']) {
    await page.goto(`http://127.0.0.1:4322${route}`);
    for (const { slug } of drafts) await expect(page.locator(`a[href="/gear/${slug}/"]`)).toHaveCount(1);
    for (const width of [320, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
    }
    if (route === '/gear/') {
      await expect(page.locator('article.card h2')).toHaveCount(drafts.length + 1);
      mkdirSync('.tools/qa/phase-2', { recursive: true });
      await page.screenshot({ path: '.tools/qa/phase-2/catalogue-1440.png', fullPage: true });
    }
    await page.goto(`http://127.0.0.1:4321${route}`);
    for (const { slug, data } of drafts) {
      await expect(page.locator(`a[href="/gear/${slug}/"]`)).toHaveCount(0);
      await expect(page.getByText(data.name, { exact: true })).toHaveCount(0);
    }
  }
});
