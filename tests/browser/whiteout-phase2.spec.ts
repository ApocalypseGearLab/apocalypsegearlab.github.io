import { test, expect } from './fixtures';
import { mkdirSync, readFileSync } from 'node:fs';
import AxeBuilder from '@axe-core/playwright';
import { WHITEOUT_PHASE2_IDS } from '../../scripts/whiteout-phase2-preservation.mjs';
const ids = [...WHITEOUT_PHASE2_IDS, 'therm-a-rest-neoair-xtherm-nxt-review'];
for (const language of ['en', 'fr'] as const) test(`WHITEOUT documented destinations, exact URLs and retained safety restriction ${language}`, async ({ page, context }) => {
  test.setTimeout(60_000);
  await context.route('https://www.amazon.ca/**', route => route.fulfill({body:'Isolated Amazon destination'}));
  const prefix = language === 'fr' ? '/fr' : '';
  for (const id of ids) {
    const product = JSON.parse(readFileSync(`src/data/products/${id}.json`, 'utf8'));
    const active = true;
    await page.goto(`${prefix}/whiteout/#gear`);
    const card = page.locator(`article[data-product-id="${id}"]`);
    await expect(card.locator('a[data-affiliate-click]')).toHaveCount(active ? 1 : 0);
    await card.locator(active ? '.profile-details' : '[data-pending-details]').focus();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(`${prefix}/gear/${id}/`);
    const purchase=page.locator('[data-product-purchase]');
    const note=product.research.purchaseDestination.selectionNote;
    const localized=language==='fr'?JSON.parse(readFileSync('src/i18n/fr-whiteout.json','utf8'))[note]:note;
    expect(localized).toBeTruthy();
    await expect(purchase).toContainText(localized);
    await expect(purchase.locator('[data-purchase-destination]')).toHaveAttribute('data-purchase-destination',product.research.purchaseDestination.scope);
    await expect(purchase.locator('[aria-disabled=true]')).toHaveCount(active ? 0 : 1);
    const link=purchase.locator('a[data-affiliate-click]');
    await expect(link).toHaveCount(active ? 1 : 0);
    if(active){
      await expect(link).toHaveAttribute('href',product.links.amazonCa.url);
      await expect(link).toHaveAttribute('rel','sponsored nofollow noopener');
      await expect(link).toHaveAttribute('data-marketplace','ca');
      const popup=context.waitForEvent('page');
      await link.focus(); await page.keyboard.press('Enter');
      const opened=await popup; await expect(opened).toHaveURL(product.links.amazonCa.url);await opened.close();
      const events=await page.evaluate(()=>((window as unknown as {dataLayer:unknown[][]}).dataLayer??[]).map(e=>Array.from(e)).filter(e=>e[1]==='affiliate_click'));
      expect(events).toHaveLength(1);
      expect(events[0]![2]).toMatchObject({product_id:id,asin:product.links.amazonCa.asin,destination_url:product.links.amazonCa.url,marketplace:'ca'});
    }else{
      const reason=product.research.affiliateReview.reason;
      await expect(purchase).toContainText(language==='fr'?JSON.parse(readFileSync('src/i18n/fr-whiteout.json','utf8'))[reason]:reason);
    }
    await expect(page.locator('meta[name=robots]')).toHaveAttribute('content','noindex, nofollow');
  }
});
for (const width of [320, 375, 768, 1440]) for (const language of ['en', 'fr']) test(`WHITEOUT Phase 2 profiles, imagery and specifications ${language} ${width}px`, async ({ page }) => {
  await page.setViewportSize({ width, height: 900 });
  const prefix = language === 'fr' ? '/fr' : '';
  const errors: string[] = []; page.on('pageerror', error => errors.push(error.message));
  for (const id of ids) {
    await page.goto(`${prefix}/gear/${id}/`);
    await expect(page.locator('html')).toHaveAttribute('lang', language + '-CA');
    await expect(page.locator('[data-product-purchase] [aria-disabled=true]')).toHaveCount(0);
    await expect(page.locator('[data-product-purchase] a[data-affiliate-click]')).toHaveCount(1);
    const image = page.locator('.product-artwork--detail img');
    await image.evaluate((node: HTMLImageElement) => node.decode());
    expect(await image.evaluate((node: HTMLImageElement) => node.naturalWidth)).toBeGreaterThan(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    expect(await page.locator('.product-specifications tr').evaluateAll((rows, width) => rows.every(row => {
      const label = row.querySelector('th')!.getBoundingClientRect(), value = row.querySelector('td')!.getBoundingClientRect();
      return width < 576 ? value.top >= label.bottom - 1 && label.width > width * 0.65 : value.left >= label.right - 1;
    }), width)).toBe(true);
    if ([375, 1440].includes(width)) {
      mkdirSync('docs/qa/whiteout-phase2/screenshots', { recursive: true });
      await image.scrollIntoViewIfNeeded();
      await page.screenshot({ path: `docs/qa/whiteout-phase2/screenshots/${id}-${language}-${width}-artwork.png` });
      await page.locator('.product-specifications').scrollIntoViewIfNeeded();
      await page.screenshot({ path: `docs/qa/whiteout-phase2/screenshots/${id}-${language}-${width}-specs.png` });
    }
  }
  await page.goto(`${prefix}/whiteout/#gear`);
  await expect(page.locator('article.card')).toHaveCount(11);
  expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
  if ([375, 1440].includes(width)) {
    for (const image of await page.locator('article.card img').all()) {
      await image.scrollIntoViewIfNeeded();
      await image.evaluate((node: HTMLImageElement) => node.decode());
    }
    await page.screenshot({ path: `docs/qa/whiteout-phase2/screenshots/whiteout-${language}-${width}.png`, fullPage: true });
  }
  expect(errors).toEqual([]);
});
test('WHITEOUT new category filters retain state while switching languages', async ({ page }) => {
  await page.goto('/gear/?sector=whiteout&category=winter-gloves-mitts#category-winter-gloves-mitts');
  await expect(page.locator('[data-catalogue-entry]:visible')).toHaveCount(2);
  await page.locator('[data-language-selector] summary').click();
  await page.locator('[data-language-option=fr]').click();
  await expect(page).toHaveURL('/fr/gear/?sector=whiteout&category=winter-gloves-mitts#category-winter-gloves-mitts');
  await expect(page.locator('[data-catalogue-entry]:visible')).toHaveCount(2);
});

// Tracking assertions explicitly exercise the permitted state; default-off is tested separately.
test.use({ analyticsPermission: true });
