import { test, expect } from './fixtures';
import AxeBuilder from '@axe-core/playwright';
import { readdirSync, mkdirSync } from 'node:fs';
import { sep } from 'node:path';

const routes = readdirSync('dist', { recursive: true }).map(String).filter(file => file.endsWith('.html')).map(file => '/' + file.split(sep).join('/').replace(/index\.html$/, ''));
for (const width of [375, 1440]) test('all bilingual routes render without overflow at ' + width + 'px', async ({ page }) => {
  test.setTimeout(240_000);
  await page.setViewportSize({ width, height: 900 });
  for (const route of routes) {
    const response = await page.goto(route);
    expect(route === '/404.html' ? [200, 404] : [200], route).toContain(response?.status());
    const french = route.startsWith('/fr/');
    await expect(page.locator('html')).toHaveAttribute('lang', french ? 'fr-CA' : 'en-CA');
    await expect(page.locator('h1')).toHaveCount(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), route).toBe(true);
    const selector = page.locator('[data-language-selector]');
    await selector.locator('summary').click();
    await expect(selector.locator('a')).toHaveCount(2);
    const bounds = await selector.locator('nav').boundingBox();
    expect(bounds!.x, route).toBeGreaterThanOrEqual(0);
    expect(bounds!.x + bounds!.width, route).toBeLessThanOrEqual(width);
    await page.keyboard.press('Escape');
    await expect(selector).not.toHaveAttribute('open');
  }
});

test('language switch preserves page, fragment, filters, scroll and preference', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/gear/?source=review#category-power-stations');
  await page.locator('[data-catalogue-controls]').waitFor({ state: 'visible' });
  await page.getByRole('searchbox').fill('EcoFlow');
  const before = await page.locator('[data-catalogue-entry]:visible').count();
  await page.evaluate(() => window.scrollTo(0, 600));
  const y = await page.evaluate(() => scrollY);
  await page.locator('[data-language-selector] summary').click();
  await page.locator('[data-language-option="fr"]').click();
  await expect(page).toHaveURL(/\/fr\/gear\/\?source=review.*#category-power-stations$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr-CA');
  await expect(page.getByRole('searchbox')).toHaveValue('EcoFlow');
  await expect(page.locator('[data-catalogue-entry]:visible')).toHaveCount(before);
  await expect(page.locator('[data-catalogue-count]')).toContainText('Recherche : EcoFlow');
  expect(await page.evaluate(() => localStorage.getItem('agl-language'))).toBe('fr');
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(y);
  await page.goto('/blackout/#sector-guide');
  await expect(page).toHaveURL(/\/fr\/blackout\/#sector-guide$/);
  await page.locator('[data-language-selector] summary').click();
  await page.locator('[data-language-option="en"]').click();
  await expect(page).toHaveURL(/\/blackout\/#sector-guide$/);
  expect(await page.evaluate(() => localStorage.getItem('agl-language'))).toBe('en');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en-CA');
});

test('French filter zero state and reset stay French', async ({ page }) => {
  await page.goto('/fr/gear/');
  await page.getByRole('searchbox').fill('zzzz-no-equipment');
  await expect(page.locator('[data-catalogue-count]')).toContainText('0 fiches');
  await expect(page.locator('[data-catalogue-empty]')).toBeVisible();
  await page.locator('button[type=reset]').click();
  await expect(page.getByRole('searchbox')).toHaveValue('');
  await expect(page.locator('[data-catalogue-count]')).not.toContainText('matching equipment');
  await expect(page.locator('[data-catalogue-empty]')).toBeHidden();
});

for (const width of [320, 768, 1440]) test('French selector and navigation are keyboard accessible at ' + width, async ({ page }) => {
  await page.setViewportSize({ width, height: 900 });
  await page.goto('/fr/outbreak/');
  const selector = page.locator('[data-language-selector]');
  await selector.locator('summary').focus();
  await page.keyboard.press('ArrowDown');
  await expect(selector.locator('[data-language-option="en"]')).toBeFocused();
  await page.keyboard.press('End');
  await expect(selector.locator('[data-language-option="fr"]')).toBeFocused();
  expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
  await page.keyboard.press('Escape');
  await expect(selector.locator('summary')).toBeFocused();
  if (width < 1024) await page.locator('.nav-toggle').click();
  else await page.locator('.gear-trigger > a').hover();
  expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('static French pages and native selector work with JavaScript disabled', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4321/fr/fallout/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr-CA');
  await expect(page.locator('[data-sector-guide]')).toContainText('eau');
  await page.locator('[data-language-selector] summary').click();
  await page.locator('[data-language-option="en"]').click();
  await expect(page).toHaveURL('http://127.0.0.1:4321/fallout/');
  await context.close();
});

test('blocked localStorage does not prevent explicit switching', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', { get() { throw new DOMException('Blocked', 'SecurityError'); } });
    Object.defineProperty(window, 'sessionStorage', { get() { throw new DOMException('Blocked', 'SecurityError'); } });
  });
  await page.goto('/whiteout/#gear');
  await page.locator('[data-language-selector] summary').click();
  await page.locator('[data-language-option="fr"]').click();
  await expect(page).toHaveURL(/\/fr\/whiteout\/#gear$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr-CA');
});

for (const width of [375, 1440]) test('review screenshots at ' + width, async ({ page }) => {
  test.setTimeout(60_000);
  mkdirSync('docs/qa/bilingual/screenshots', { recursive: true });
  await page.setViewportSize({ width, height: 900 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const [name, route] of [['home-en', '/'], ['home-fr', '/fr/'], ['blackout-fr', '/fr/blackout/'], ['product-fr', '/fr/gear/3m-2097-p100-particulate-filters/']]) {
    await page.goto(route!);
    await page.locator('img[loading=eager]').evaluateAll(async nodes => { await Promise.all(nodes.map(node => (node as HTMLImageElement).decode())); });
    await page.screenshot({ path: 'docs/qa/bilingual/screenshots/' + name + '-' + width + '.png' });
  }
  await page.goto('/fr/outbreak/');
  await page.locator('[data-language-selector] summary').click();
  await page.screenshot({ path: 'docs/qa/bilingual/screenshots/language-menu-fr-' + width + '.png' });
});

test('French affiliate clicks queue the existing event once with the original destination and identity', async ({ page, context }) => {
  await context.route('https://www.amazon.ca/**', route => route.fulfill({ status: 200, contentType: 'text/html', body: '<title>Local retailer simulation</title>' }));
  await page.goto('/fr/gear/midland-er310/?source=private#buy');
  const popup = context.waitForEvent('page');
  await page.locator('[data-product-purchase] a[data-affiliate-click]').click();
  const opened = await popup;
  await expect(opened).toHaveURL('https://www.amazon.ca/dp/B015QIC1PW?tag=apocalypsegear-20');
  await opened.close();
  const commands = await page.evaluate(() => ((window as unknown as {dataLayer: unknown[][]}).dataLayer ?? []).map(row => Array.from(row)));
  expect(commands.filter(row => row[0] === 'config')).toHaveLength(1);
  const events = commands.filter(row => row[0] === 'event' && row[1] === 'affiliate_click');
  expect(events).toHaveLength(1);
  expect(events[0]![2]).toMatchObject({ product_name: 'Midland ER310 emergency radio', product_id: 'midland-er310', asin: 'B015QIC1PW', destination_url: 'https://www.amazon.ca/dp/B015QIC1PW?tag=apocalypsegear-20', page_location: 'http://127.0.0.1:4321/fr/gear/midland-er310/' });
});
