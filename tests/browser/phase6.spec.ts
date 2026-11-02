import { test, expect } from './fixtures';
import AxeBuilder from '@axe-core/playwright';
import { mkdirSync, writeFileSync } from 'node:fs';
import sharp from 'sharp';

test('catalogue search, combined filters, empty state, reset and keyboard controls', async ({ page }) => {
  await page.addInitScript(() => {
    (window as any).__catalogueCLS = 0;
    new PerformanceObserver(list => { for (const entry of list.getEntries() as any[]) if (!entry.hadRecentInput) (window as any).__catalogueCLS += entry.value; }).observe({ type: 'layout-shift', buffered: true });
  });
  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto('/gear/');
  const visible = page.locator('[data-catalogue-entry]:visible');
  const search = page.getByRole('searchbox');
  await expect(visible).toHaveCount(46);
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  expect(await page.evaluate(() => (window as any).__catalogueCLS)).toBe(0);
  await search.fill('ecoflow');
  await expect(visible).toHaveCount(2);
  await expect(page.getByRole('status')).toContainText('2 matching');
  await page.getByLabel('Sector', { exact: true }).selectOption('fallout');
  await expect(visible).toHaveCount(0);
  await expect(page.locator('[data-catalogue-empty]')).toBeVisible();
  await page.getByRole('button', { name: 'Clear filters' }).focus();
  await page.keyboard.press('Enter');
  await expect(visible).toHaveCount(46);
  await expect(search).toHaveValue('');
  await page.getByLabel('Equipment category', { exact: true }).selectOption('rechargeable-batteries');
  await expect(visible).toHaveCount(2);
  await search.fill('aaa');
  await expect(visible).toHaveCount(1);
  await expect(visible).toContainText('Panasonic');
  await expect(page.getByRole('status')).toContainText('1 matching equipment profile · All sectors');
  await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href', 'https://apocalypsegearlab.github.io/gear/');
  await page.getByRole('button', { name: 'Clear filters' }).click();
  await search.fill('[.*]');
  await expect(visible).toHaveCount(0);
  await page.getByText('Browse equipment categories', { exact: true }).click();
  await page.getByRole('navigation', { name: 'Equipment categories' }).getByRole('link', { name: 'Rain shells', exact: true }).click();
  await expect(visible).toHaveCount(1);
  await expect(search).toHaveValue('');
  await expect(page.getByLabel('Equipment category', { exact: true })).toHaveValue('rainwear');
  await page.getByRole('button', { name: 'Clear filters' }).click();
  await expect(visible).toHaveCount(46);
  const delay = await page.evaluate(() => {
    const input = document.querySelector<HTMLInputElement>('#gear-query')!;
    const start = performance.now();
    for (let i = 0; i < 30; i++) { input.value = i % 2 ? 'ecoflow' : ''; input.dispatchEvent(new Event('input', { bubbles: true })); }
    return (performance.now() - start) / 30;
  });
  mkdirSync('.tools/qa/phase6', { recursive: true });
  writeFileSync('docs/qa/phase6/filter-performance.json', JSON.stringify({ meanSynchronousFilterMs: delay, note: 'Local DOM processing measurement, not field INP' }, null, 2) + '\n');
  expect(delay).toBeLessThan(100);
});

test('catalogue and all hub guides keep working without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 320, height: 900 } });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4321/gear/');
  await expect(page.locator('article.card')).toHaveCount(46);
  await expect(page.locator('[data-catalogue-controls]')).toBeHidden();
  await page.getByText('Browse equipment categories', { exact: true }).click();
  await page.getByRole('navigation', { name: 'Equipment categories' }).getByRole('link', { name: 'Emergency power stations', exact: true }).click();
  await expect(page).toHaveURL(/#category-power-stations$/);
  await page.locator('[data-product-id="ecoflow-delta-2-portable-power-station"] .profile-details').click();
  await expect(page.locator('h1')).toContainText('DELTA 2');
  await page.locator('.planning-context a').first().click();
  await expect(page).toHaveURL(/blackout\/#planning-4$/);
  await expect(page.locator('[data-runtime-example]')).toContainText('80%');
  for (const sector of ['blackout', 'fallout', 'outbreak']) {
    await page.goto('http://127.0.0.1:4321/' + sector + '/');
    await expect(page.locator('[data-sector-guide] h3')).toHaveCount(sector === 'blackout' ? 8 : 7);
    await expect(page.getByRole('navigation', { name: 'In this preparedness guide' })).toBeVisible();
  }
  await context.close();
});

const captures = [
  ['home', '/'], ['catalogue', '/gear/'], ['blackout', '/blackout/'], ['fallout', '/fallout/'], ['outbreak', '/outbreak/'],
  ['methodology', '/how-we-research/'], ['power-profile', '/gear/ecoflow-delta-2-portable-power-station/'],
  ['fridge-profile', '/gear/bougerv-53-quart-portable-refrigerator-freezer/'], ['respirator-profile', '/gear/3m-6800-full-facepiece-respirator/'],
] as const;
for (const [name, path] of captures) test(`Phase 6 ${name}: accessibility, six widths and review screenshots`, async ({ page }) => {
  test.setTimeout(120_000);
  mkdirSync('docs/qa/phase6/screenshots', { recursive: true });
  const rows = [];
  await page.goto(path);
  for (const width of [320, 375, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await expect(page.locator('h1')).toHaveCount(1);
    expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
    rows.push({ path, width, axeViolations: 0, horizontalOverflow: false });
    if (width === 375 || width === 1440) {
      await page.evaluate(async () => { await Promise.all([...document.images].map(async image => { image.loading = 'eager'; await image.decode().catch(() => {}); })); });
      const capture = await page.screenshot({ fullPage: name !== 'catalogue' });
      const dimensions = await sharp(capture).metadata();
      // WebP cannot exceed 16,383px in either dimension. Keep original text
      // size and split long mobile hubs into lossless-geometry review panels.
      for (let top = 0, part = 1; top < dimensions.height!; top += 12_000, part++) {
        await sharp(capture).extract({ left: 0, top, width: dimensions.width!, height: Math.min(12_000, dimensions.height! - top) }).webp({ quality: 75 }).toFile(`docs/qa/phase6/screenshots/${name}-${width}${part > 1 ? `-part${part}` : ''}.webp`);
      }
      if (name === 'catalogue') {
        await page.getByRole('searchbox').fill('ecoflow');
        await page.locator('[data-catalogue-controls]').scrollIntoViewIfNeeded();
        await sharp(await page.screenshot()).webp({ quality: 75 }).toFile(`docs/qa/phase6/screenshots/catalogue-filtered-${width}.webp`);
        await page.getByRole('button', { name: 'Clear filters' }).click();
        await page.evaluate(() => scrollTo(0, 0));
      }
    }
  }
  writeFileSync(`docs/qa/phase6/${name}-responsive.json`, JSON.stringify(rows, null, 2) + '\n');
});
