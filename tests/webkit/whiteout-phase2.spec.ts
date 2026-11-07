import { test, expect } from '../browser/fixtures';
import { mkdirSync } from 'node:fs';
import { WHITEOUT_PHASE2_IDS } from '../../scripts/whiteout-phase2-preservation.mjs';
for (const id of [...WHITEOUT_PHASE2_IDS, 'therm-a-rest-neoair-xtherm-nxt-review']) test(`WHITEOUT ${id}: native touch round-trip, image and mobile specs`, async ({ page }, testInfo) => {
  await page.addInitScript(() => {
    const rows: unknown[] = [];
    (window as unknown as { languageTapDiagnostics: unknown[] }).languageTapDiagnostics = rows;
    for (const name of ['pointerdown', 'pointerup', 'touchstart', 'touchend', 'mouseover', 'mousemove', 'mousedown', 'mouseup', 'click', 'focusin', 'toggle']) document.addEventListener(name, event => {
      const target = event.target as Element;
      if (!target.closest?.('[data-language-selector]')) return;
      rows.push({ event: name, time: performance.now(), target: target.tagName, language: target.closest('[data-language-option]')?.getAttribute('data-language-option'), scrollY, fonts: document.fonts.status });
    }, true);
    document.fonts.addEventListener('loadingdone', () => rows.push({ event: 'fonts-loaded', time: performance.now(), scrollY }));
    window.addEventListener('load', () => rows.push({ event: 'load', time: performance.now(), scrollY }));
  });
  await page.goto(`/gear/${id}/?source=whiteout-review#buy`);
  for (const language of ['fr', 'en']) {
    await page.locator('[data-language-selector] summary').tap();
    await page.locator(`[data-language-option=${language}]`).tap();
    try {
      await expect(page).toHaveURL(`${language === 'fr' ? '/fr' : ''}/gear/${id}/?source=whiteout-review#buy`);
    } catch (error) {
      await testInfo.attach('language-tap-diagnostics', { body: JSON.stringify(await page.evaluate(() => (window as unknown as { languageTapDiagnostics: unknown[] }).languageTapDiagnostics), null, 2), contentType: 'application/json' });
      throw error;
    }
    await expect(page.locator('html')).toHaveAttribute('lang', language + '-CA');
    await page.locator('.product-artwork--detail img').evaluate((image: HTMLImageElement) => image.decode());
    await expect(page.locator('[data-product-purchase] [aria-disabled=true]')).toHaveCount(0);
    await expect(page.locator('[data-product-purchase] a[data-affiliate-click]')).toHaveCount(1);
    if (id === 'therm-a-rest-neoair-xtherm-nxt-review') {
      const purchase = page.locator('[data-product-purchase]');
      await expect(purchase.locator('[data-purchase-destination=product-page]')).toContainText(language === 'fr' ? 'ne pas utiliser sous −20 °C' : 'Do not use below −20 °C');
      const button = purchase.locator('a[data-affiliate-click]');
      const url = 'https://www.amazon.ca/dp/B0CS54SN91?tag=apocalypsegear-20';
      await expect(button).toHaveAttribute('href', url);
      await page.context().route('https://www.amazon.ca/**', route => route.fulfill({ body: 'Local retailer simulation' }));
      const popup = page.context().waitForEvent('page');
      await button.tap();
      const opened = await popup; await expect(opened).toHaveURL(url); await opened.close();
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.locator('.product-specifications').scrollIntoViewIfNeeded();
    expect(await page.locator('.product-specifications tr').evaluateAll(rows => rows.every(row => row.querySelector('td')!.getBoundingClientRect().top >= row.querySelector('th')!.getBoundingClientRect().bottom - 1))).toBe(true);
    if (testInfo.project.name.endsWith('375')) {
      mkdirSync('docs/qa/whiteout-phase2/screenshots', { recursive: true });
      await page.screenshot({ path: `docs/qa/whiteout-phase2/screenshots/${id}-${language}-webkit-375-specs.png` });
    }
  }
});
