import { test, expect } from '../browser/fixtures';

test('repeated single-tap language choices survive read-only preferences without a second tap', async ({ page }) => {
  test.setTimeout(60_000);
  await page.addInitScript(() => {
    const set = Storage.prototype.setItem;
    Storage.prototype.setItem = function(key, value) {
      if (this === localStorage) throw new DOMException('Read-only preference storage', 'QuotaExceededError');
      return set.call(this, key, value);
    };
  });
  for (let round = 0; round < 5; round++) {
    const suffix = `?source=tap-regression&round=${round}#sector-guide`;
    await page.goto('/fr/blackout/' + suffix);
    for (const language of ['en', 'fr']) {
      await page.locator('[data-language-selector] summary').tap();
      await expect(page.locator('[data-language-selector]')).toHaveAttribute('open');
      await page.locator(`[data-language-option=${language}]`).tap();
      await expect(page).toHaveURL(`${language === 'fr' ? '/fr' : ''}/blackout/${suffix}`);
      await expect(page.locator('html')).toHaveAttribute('lang', language + '-CA');
      expect(await page.evaluate(() => sessionStorage.getItem('agl-language'))).toBe(language);
    }
  }
});
