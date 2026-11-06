import { test, expect } from './fixtures';
import AxeBuilder from '@axe-core/playwright';
import { mkdirSync } from 'node:fs';

const profiles = [
  '3m-2097-p100-particulate-filters',
  'therm-a-rest-neoair-xtherm-nxt-review',
  'kidde-c3010-co-alarm',
  'bougerv-53-quart-portable-refrigerator-freezer',
];

for (const locale of ['en', 'fr']) for (const width of [320, 375, 768]) {
  test(`${locale} product specifications remain readable at ${width}px`, async ({ page }) => {
    test.setTimeout(60_000);
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    for (const slug of profiles) {
      await page.goto(`${locale === 'fr' ? '/fr' : ''}/gear/${slug}/`);
      await page.evaluate(() => document.fonts.ready);
      const region = page.locator('.table-wrap');
      await expect(region.getByRole('table')).toHaveCount(1);
      const rows = region.getByRole('row');
      expect(await rows.count()).toBeGreaterThan(0);
      const measurements = await rows.evaluateAll(rows => rows.map(row => {
        const label = row.querySelector('th')!;
        const value = row.querySelector('td')!;
        const labelBox = label.getBoundingClientRect();
        const valueBox = value.getBoundingClientRect();
        const tableBox = row.closest('table')!.getBoundingClientRect();
        const words = Array.from(label.firstChild!.textContent!.matchAll(/[\p{L}\p{N}]+/gu));
        const brokenWords = words.filter(word => {
          const range = document.createRange();
          range.setStart(label.firstChild!, word.index!);
          range.setEnd(label.firstChild!, word.index! + word[0].length);
          return new Set(Array.from(range.getClientRects(), rect => Math.round(rect.y))).size > 1;
        }).map(word => word[0]);
        return { label: label.textContent, labelBox: labelBox.toJSON(), valueBox: valueBox.toJSON(), tableWidth: tableBox.width, brokenWords,
          labelFits: label.scrollWidth <= label.clientWidth + 1,
          valueFits: value.scrollWidth <= value.clientWidth + 1 };
      }));
      for (const row of measurements) {
        const context = `${locale}/${slug} at ${width}px: ${row.label}`;
        expect(row.brokenWords, context).toEqual([]);
        expect(row.labelFits && row.valueFits, context).toBe(true);
        if (width < 576) {
          expect(row.labelBox.width, context).toBeGreaterThanOrEqual(row.tableWidth - 2);
          expect(row.valueBox.width, context).toBeGreaterThanOrEqual(row.tableWidth - 2);
          expect(row.valueBox.y, context).toBeGreaterThanOrEqual(row.labelBox.y + row.labelBox.height - 1);
        } else {
          expect(row.labelBox.width, context).toBeGreaterThanOrEqual(row.tableWidth * 0.28);
          expect(Math.abs(row.labelBox.y - row.valueBox.y), context).toBeLessThanOrEqual(1);
        }
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), slug).toBe(true);
      await expect(region.getByRole('rowheader')).toHaveCount(measurements.length);
      await expect(region.getByRole('cell')).toHaveCount(measurements.length);
      if (slug === profiles[0]) {
        expect((await new AxeBuilder({ page }).include('.table-wrap').withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
        mkdirSync('docs/qa/bilingual/mobile-specifications', { recursive: true });
        await region.screenshot({ path: `docs/qa/bilingual/mobile-specifications/2097-${locale}-${width}.png`, style: 'header { visibility: hidden !important; }' });
      }
    }
  });
}
