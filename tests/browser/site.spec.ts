import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdirSync } from 'node:fs';

const routes = ['/', '/blackout/', '/fallout/', '/outbreak/', '/gear/', '/affiliate-disclosure/', '/404.html'];
for (const route of routes) {
  test(`${route === '/' ? 'homepage' : route} accessibility and responsive layout`, async ({ page }) => {
    if (route === '/gear/') test.setTimeout(60_000); // Six axe audits of the full 30-card catalogue.
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(route);
    for (const width of [320, 375, 768, 1024, 1440, 1920]) {
      await page.setViewportSize({ width, height: 900 });
      await expect(page.locator('h1')).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
      if (route === '/' && (width === 320 || width === 1440)) {
        expect(await page.locator('.console li > span:first-child').evaluateAll((labels) => labels.every((label) => {
          const range = document.createRange();
          range.selectNodeContents(label);
          return range.getClientRects().length === 1;
        }))).toBe(true);
        mkdirSync('.tools/qa', { recursive: true });
        await page.screenshot({ path: `.tools/qa/home-${width}.png`, fullPage: true });
      }
    }
    expect(errors).toEqual([]);
  });
}

test('mobile menu supports keyboard, Escape and sector navigation', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  const toggle = page.getByRole('button', { name: 'Menu' });
  await toggle.focus();
  await page.keyboard.press('Enter');
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(toggle).toBeFocused();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await toggle.click();
  await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Blackout' }).click();
  await expect(page).toHaveURL(/\/blackout\/$/);
  await toggle.click();
  await expect(page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Blackout' })).toHaveAttribute('aria-current', 'page');
});

test('navigation and skip link work without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 320, height: 812 } });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4321/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main')).toBeFocused();
  await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Outbreak' }).click();
  await expect(page).toHaveURL(/\/outbreak\/$/);
  await expect(page.getByText('Equipment profiles are factual references. Any fictional scenarios are labelled separately.', { exact: true })).toBeVisible();
  await context.close();
});

test('product template is previewable only in development, with pending affiliate links', async ({ page }) => {
  await page.goto('http://127.0.0.1:4322/gear/');
  await page.getByRole('heading', { name: 'Template product (replace or delete)' }).getByRole('link').click();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
  await expect(page.getByText('Not physically tested by us', { exact: true })).toBeVisible();
  await expect(page.getByRole('link', { disabled: true })).toHaveCount(0);
  expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
  const response = await page.goto('http://127.0.0.1:4321/gear/template-product/');
  expect(response?.status()).toBe(404);
});
