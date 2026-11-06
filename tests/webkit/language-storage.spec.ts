import { test, expect } from '../browser/fixtures';

test('persistent preference still works in a fresh session and when session storage is blocked', async ({ page }) => {
  await page.goto('/fr/');
  await page.evaluate(() => {
    localStorage.setItem('agl-language','fr');
    sessionStorage.clear();
  });
  await page.goto('/blackout/?source=persistent#sector-guide');
  await expect(page).toHaveURL('/fr/blackout/?source=persistent#sector-guide');
  await page.addInitScript(() => {
    Object.defineProperty(window,'sessionStorage',{ get(){ throw new DOMException('Blocked','SecurityError'); } });
  });
  await page.goto('/whiteout/?source=persistent#sector-guide');
  await expect(page).toHaveURL('/fr/whiteout/?source=persistent#sector-guide');
  await page.locator('[data-language-selector] summary').tap();
  await page.locator('[data-language-option=en]').tap();
  await expect(page).toHaveURL('/whiteout/?source=persistent#sector-guide');
  expect(await page.evaluate(() => localStorage.getItem('agl-language'))).toBe('en');
  await page.reload();
  await expect(page).toHaveURL('/whiteout/?source=persistent#sector-guide');
});
