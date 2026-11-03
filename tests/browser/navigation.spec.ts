import { test, expect } from './fixtures';
import AxeBuilder from '@axe-core/playwright';
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { productSchema } from '../../src/lib/product-schema';
import { populatedCategories } from '../../src/lib/category-navigation';
import type { Product } from '../../src/lib/products';

const categories = populatedCategories(readdirSync('src/data/products').filter(file => file.endsWith('.json')).map(file => ({
  id: file.slice(0, -5), data: productSchema.parse(JSON.parse(readFileSync(`src/data/products/${file}`, 'utf8'))),
} as Product)));
const screenshotDirectory = 'docs/qa/phase6-1/screenshots';

test('desktop hover bridge, outside click, keyboard disclosure, Escape and focus leave', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  const panel = page.locator('#gear-menu');
  const gear = page.locator('.gear-trigger > a');
  const toggle = page.getByRole('button', { name: 'Browse equipment categories', exact: true });
  const before = await page.locator('main').boundingBox();
  await gear.hover(); await expect(panel).toBeVisible();
  const start = await gear.boundingBox(); const end = await panel.boundingBox();
  await page.mouse.move(start!.x + start!.width / 2, start!.y + start!.height - 1);
  await page.mouse.move(start!.x + start!.width / 2, end!.y + 10, { steps: 12 });
  await panel.locator('.category-link').last().hover();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  expect((await page.locator('main').boundingBox())!.y).toBe(before!.y);
  await page.mouse.move(1400, 950);
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await gear.focus(); await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('ArrowDown'); await expect(panel.locator('a').first()).toBeFocused();
  await page.keyboard.press('Escape'); await expect(toggle).toBeFocused();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await page.keyboard.press('Enter'); await expect(panel.locator('a').first()).toBeFocused();
  await page.locator('.primary-links a[href="/outbreak/"]').focus();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await gear.hover(); await expect(panel).toBeVisible();
  await page.mouse.click(1400, 950); await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await gear.click(); await expect(page).toHaveURL(/\/gear\/$/);
});

for (const width of [320, 375, 768, 1024, 1440, 1920]) {
  test(`open navigation has no overflow or axe violations at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 }); await page.goto('/');
    const mobile = width < 1024;
    if (mobile) {
      await page.getByRole('button', { name: 'Menu', exact: true }).click();
      for (const sector of ['BLACKOUT', 'FALLOUT', 'OUTBREAK', 'WHITEOUT']) {
        const button = page.getByRole('button', { name: `Expand ${sector} categories` });
        await button.click(); await expect(button).toHaveAttribute('aria-expanded', 'true');
      }
      await page.getByRole('button', { name: 'Expand guides', exact: true }).click();
    } else await page.locator('.gear-trigger > a').hover();
    const panel = page.locator('#gear-menu'); await expect(panel).toBeVisible();
    await expect(panel.locator('.category-link')).toHaveCount(categories.length);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    const bounds = await panel.boundingBox(); expect(bounds!.x).toBeGreaterThanOrEqual(0); expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width);
    expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
    if (mobile) {
      const targets = await page.locator('.nav-toggle, .sector-toggle, .sector-home, .category-link').evaluateAll(nodes => nodes.map(node => node.getBoundingClientRect()).every(rect => rect.height >= 44));
      expect(targets).toBe(true);
      expect(await page.locator('#site-nav').evaluate(node => node.scrollHeight > node.clientHeight)).toBe(true);
    }
  });
}

test('mobile drawer manages focus, collapse, outside clicks, scroll restoration and breakpoint changes', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 }); await page.goto('/');
  const toggle = page.getByRole('button', { name: 'Menu', exact: true });
  await toggle.focus(); await page.keyboard.press('Enter');
  await expect(page.locator('.primary-links a[href="/"]')).toBeFocused();
  const sector = page.getByRole('button', { name: 'Expand BLACKOUT categories' });
  await sector.focus(); await page.keyboard.press('Enter');
  await expect(page.locator('#menu-blackout')).toBeVisible();
  await page.keyboard.press('Enter'); await expect(page.locator('#menu-blackout')).toBeHidden();
  await page.keyboard.press('Escape'); await expect(toggle).toBeFocused();
  expect(await page.locator('body').evaluate(node => node.style.overflow)).toBe('');
  await toggle.click(); await page.mouse.click(310, 550);
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  expect(await page.locator('body').evaluate(node => node.style.overflow)).toBe('');
  await toggle.click(); await page.getByRole('button', { name: 'Expand guides', exact: true }).click();
  await page.locator('#menu-guides a').last().focus(); await page.keyboard.press('Tab');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await toggle.click(); await page.locator('main').focus();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await toggle.click(); await page.locator('.brand').click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await toggle.click(); await page.setViewportSize({ width: 1440, height: 900 });
  expect(await page.locator('body').evaluate(node => node.style.overflow)).toBe('');
  await page.setViewportSize({ width: 375, height: 812 });
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await toggle.click(); await page.getByRole('button', { name: 'Expand OUTBREAK categories' }).click();
  await page.locator('#menu-outbreak .category-link[data-category="fixed-blade-knives"]').click();
  await expect(page.getByLabel('Equipment category', { exact: true })).toHaveValue('fixed-blade-knives');
  await expect(page.locator('[data-catalogue-entry]:visible')).toHaveCount(categories.find(category => category.id === 'fixed-blade-knives')!.count);
  expect(await page.locator('body').evaluate(node => node.style.overflow)).toBe('');
});

test('every category matches the source and resolves to a working initial and same-page filter', async ({ page, request }) => {
  test.setTimeout(90_000);
  await page.goto('/gear/');
  const rendered = await page.locator('header .category-link').evaluateAll(links => links.map(link => ({ id: (link as HTMLElement).dataset.category, href: link.getAttribute('href'), label: link.firstElementChild!.textContent })));
  expect(rendered).toEqual(categories.map(({ id, href, label }) => ({ id, href, label })));
  for (const category of categories) {
    await page.goto(category.href);
    await expect(page.getByLabel('Equipment category', { exact: true })).toHaveValue(category.id);
    await expect(page.locator('[data-catalogue-entry]:visible')).toHaveCount(category.count);
    await expect(page.locator(`#category-${category.id}`)).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://apocalypsegearlab.github.io/gear/');
  }
  await page.getByRole('searchbox').fill('no matching product');
  await page.getByRole('button', { name: 'Clear filters' }).click();
  await page.locator('.gear-trigger > a').hover();
  const first = categories[0]!;
  await page.locator(`header .category-link[data-category="${first.id}"]`).click();
  await expect(page.getByLabel('Equipment category', { exact: true })).toHaveValue(first.id);
  await expect(page.locator('[data-catalogue-entry]:visible')).toHaveCount(first.count);
  await page.getByRole('button', { name: 'Clear filters' }).click(); await expect(page.locator('[data-catalogue-entry]:visible')).toHaveCount(47);
  const xml = await (await request.get('/sitemap-0.xml')).text(); expect((xml.match(/<loc>/g) ?? []).length).toBe(8); expect(xml).not.toContain('#category-');
});

for (const width of [320, 1440]) test(`all category destinations remain native and usable without JavaScript at ${width}px`, async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width, height: 900 } });
  const page = await context.newPage();
  try {
    await page.goto('http://127.0.0.1:4321/');
    await expect(page.locator('header .category-link')).toHaveCount(categories.length);
    await page.locator('header .category-link').first().click();
    await expect(page).toHaveURL(/\/gear\/#category-/);
    await expect(page.locator('[data-catalogue-entry]')).toHaveCount(47);
    for (const category of categories) await expect(page.locator(`#category-${category.id}`)).toHaveCount(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  } finally { await context.close(); }
});

test('capture desktop discovery and mobile accordion states with reduced motion', async ({ page }) => {
  mkdirSync(screenshotDirectory, { recursive: true }); await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 1440, height: 1100 }); await page.goto('/');
  await page.locator('.gear-trigger > a').hover();
  await page.screenshot({ path: `${screenshotDirectory}/desktop-open.png` });
  for (const sector of ['blackout', 'fallout', 'outbreak', 'whiteout']) {
    await page.locator(`.menu-column[data-sector="${sector}"] .category-link`).first().hover();
    await page.screenshot({ path: `${screenshotDirectory}/desktop-${sector}-hover.png` });
  }
  await page.setViewportSize({ width: 375, height: 900 });
  await page.getByRole('button', { name: 'Menu', exact: true }).click();
  await page.screenshot({ path: `${screenshotDirectory}/mobile-drawer.png` });
  for (const sector of ['blackout', 'fallout', 'outbreak', 'whiteout']) {
    const button = page.getByRole('button', { name: `Expand ${sector.toUpperCase()} categories` });
    await button.click(); await button.scrollIntoViewIfNeeded();
    await page.screenshot({ path: `${screenshotDirectory}/mobile-${sector}-expanded.png` });
    await button.click();
  }
  writeFileSync('docs/qa/phase6-1/navigation.json', JSON.stringify({ categories, widths: [320, 375, 768, 1024, 1440, 1920], screenshotDirectory, note: 'Source-derived categories; all initial hash filters and no-JS HTML targets validated by the browser suite.' }, null, 2) + '\n');
});
