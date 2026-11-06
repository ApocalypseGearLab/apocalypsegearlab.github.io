import { test, expect } from '../browser/fixtures';

const routes = [
  ['/', '#mission'],
  ['/blackout/', '#sector-guide'],
  ['/fallout/', '#sector-guide'],
  ['/outbreak/', '#sector-guide'],
  ['/whiteout/', '#sector-guide'],
  ['/gear/3m-2097-p100-particulate-filters/', '#buy'],
] as const;

const menu = (page: import('@playwright/test').Page) => page.locator('[data-language-selector]');

for (const [path, fragment] of routes) test(`touch switches ${path} in both directions without losing its location`, async ({ page }) => {
  const errors: string[] = [];
  const navigations: string[] = [];
  const positions: number[] = [];
  await page.exposeBinding('__recordLanguagePosition', (_, value: number) => positions.push(value));
  await page.addInitScript(() => document.addEventListener('click', event => {
    if (event.target instanceof Element && event.target.closest('[data-language-option]')) {
      (window as unknown as { __recordLanguagePosition: (value: number) => void }).__recordLanguagePosition(scrollY);
    }
  }, true));
  page.on('pageerror', error => errors.push(error.message));
  page.on('request', request => { if (request.isNavigationRequest()) navigations.push(new URL(request.url()).pathname); });
  const suffix = '?source=iphone&campaign=language-review' + fragment;
  await page.goto(path + suffix);
  await page.evaluate(() => document.fonts.ready);
  // Record the actual activation position: WebKit can finish its initial hash
  // scroll between load and the first tap, independently of the language switch.
  await page.evaluate(() => window.scrollTo({ top: 500, behavior: 'instant' }));
  await menu(page).locator('summary').tap();
  await menu(page).locator('[data-language-option=fr]').tap();
  await expect(page).toHaveURL('/fr' + path + suffix);
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr-CA');
  expect(await page.evaluate(() => localStorage.getItem('agl-language'))).toBe('fr');
  await expect.poll(async () => Math.abs(await page.evaluate(() => scrollY) - positions[0]!)).toBeLessThan(2);
  await menu(page).locator('summary').tap();
  await menu(page).locator('[data-language-option=en]').tap();
  await expect(page).toHaveURL(path + suffix);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en-CA');
  expect(await page.evaluate(() => localStorage.getItem('agl-language'))).toBe('en');
  await expect.poll(async () => Math.abs(await page.evaluate(() => scrollY) - positions[1]!)).toBeLessThan(2);
  await page.reload();
  await expect(page).toHaveURL(path + suffix);
  expect(navigations).toEqual([path, '/fr' + path, path, path]);
  expect(errors).toEqual([]);
});

test('catalogue touch switching retains search, sector, category, query and anchor', async ({ page }) => {
  await page.goto('/gear/?source=iphone#category-power-stations');
  await page.getByRole('searchbox').fill('EcoFlow');
  await page.locator('[data-catalogue-controls] select[name=sector]').selectOption('blackout');
  await page.locator('[data-catalogue-controls] select[name=category]').selectOption('power-stations');
  const before = await page.locator('[data-catalogue-entry]:visible').count();
  for (const language of ['fr','en']) {
    await menu(page).locator('summary').tap();
    await menu(page).locator(`[data-language-option=${language}]`).tap();
    await expect(page.locator('html')).toHaveAttribute('lang', language === 'fr' ? 'fr-CA' : 'en-CA');
    const url = new URL(page.url());
    expect(url.pathname).toBe(language === 'fr' ? '/fr/gear/' : '/gear/');
    expect(Object.fromEntries(url.searchParams)).toEqual({ source:'iphone', q:'EcoFlow', sector:'blackout', category:'power-stations' });
    expect(url.hash).toBe('#category-power-stations');
    await expect(page.getByRole('searchbox')).toHaveValue('EcoFlow');
    await expect(page.locator('[data-catalogue-entry]:visible')).toHaveCount(before);
  }
});

test('menu supports tap, outside tap, Escape, focus departure and keyboard activation', async ({ page }) => {
  await page.goto('/');
  const selector = menu(page), summary = selector.locator('summary');
  await summary.tap();
  await expect(selector).toHaveAttribute('open');
  await summary.tap();
  await expect(selector).not.toHaveAttribute('open');
  await summary.tap();
  await page.locator('.brand').tap();
  await expect(selector).not.toHaveAttribute('open');
  await summary.focus();
  await page.keyboard.press('ArrowDown');
  await expect(selector.locator('[data-language-option=en]')).toBeFocused();
  await page.keyboard.press('End');
  await expect(selector.locator('[data-language-option=fr]')).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(summary).toBeFocused();
  await expect(selector).not.toHaveAttribute('open');
  await page.keyboard.press('ArrowDown');
  await page.locator('.brand').focus();
  await expect(selector).not.toHaveAttribute('open');
  await summary.focus();
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('End');
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL('/fr/');
  await selector.locator('summary').click();
  await selector.locator('[data-language-option=en]').click();
  await expect(page).toHaveURL('/');
});

test('tapping an option’s flag works while interacting with mobile navigation', async ({ page }) => {
  await page.goto('/outbreak/');
  await page.locator('.nav-toggle').tap();
  await menu(page).locator('summary').tap();
  await menu(page).locator('[data-language-option=fr] svg').tap();
  await expect(page).toHaveURL('/fr/outbreak/');
  await menu(page).locator('summary').tap();
  await menu(page).locator('[data-language-option=en] svg').tap();
  await expect(page).toHaveURL('/outbreak/');
});

test('saved preferences follow entry links but never replace an explicit language choice', async ({ page }) => {
  await page.goto('/fr/');
  await page.evaluate(() => localStorage.setItem('agl-language','en'));
  await page.reload();
  await expect(page).toHaveURL('/fr/');
  await menu(page).locator('summary').tap();
  await menu(page).locator('[data-language-option=fr]').tap();
  await page.goto('/whiteout/?source=iphone#sector-guide');
  await expect(page).toHaveURL('/fr/whiteout/?source=iphone#sector-guide');
  await menu(page).locator('summary').tap();
  await menu(page).locator('[data-language-option=en]').tap();
  await expect(page).toHaveURL('/whiteout/?source=iphone#sector-guide');
  await page.reload();
  await expect(page).toHaveURL('/whiteout/?source=iphone#sector-guide');
});

test('unavailable browser storage leaves native touch navigation working', async ({ page }) => {
  await page.addInitScript(() => {
    for (const name of ['localStorage','sessionStorage']) Object.defineProperty(window,name,{get(){throw new DOMException('Blocked','SecurityError');}});
  });
  await page.goto('/blackout/?source=iphone#sector-guide');
  for (const language of ['fr','en']) {
    await menu(page).locator('summary').tap();
    await menu(page).locator(`[data-language-option=${language}]`).tap();
    await expect(page).toHaveURL(`${language === 'fr' ? '/fr' : ''}/blackout/?source=iphone#sector-guide`);
  }
});

test('a read-only saved French preference cannot override an explicit English selection', async ({ page }) => {
  await page.goto('/fr/blackout/');
  await page.evaluate(() => localStorage.setItem('agl-language','fr'));
  await page.addInitScript(() => {
    const setItem = Storage.prototype.setItem;
    Storage.prototype.setItem = function(key,value) {
      if (this === localStorage) throw new DOMException('Read-only local storage','QuotaExceededError');
      return setItem.call(this,key,value);
    };
  });
  await page.reload();
  await menu(page).locator('summary').tap();
  await menu(page).locator('[data-language-option=en]').tap();
  await expect(page).toHaveURL('/blackout/');
  await expect(page.locator('html')).toHaveAttribute('lang','en-CA');
  expect(await page.evaluate(() => sessionStorage.getItem('agl-language'))).toBe('en');
  await page.reload();
  await expect(page).toHaveURL('/blackout/');
  await expect(page.locator('html')).toHaveAttribute('lang','en-CA');
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled:false });
  for (const path of ['/', '/gear/3m-2097-p100-particulate-filters/']) test(`native details and links round-trip ${path}`, async ({page}) => {
    await page.goto(path);
    await menu(page).locator('summary').tap();
    await expect(menu(page)).toHaveAttribute('open');
    await menu(page).locator('summary').tap();
    await expect(menu(page)).not.toHaveAttribute('open');
    await menu(page).locator('summary').tap();
    await menu(page).locator('[data-language-option=fr]').tap();
    await expect(page).toHaveURL('/fr' + path);
    await expect(page.locator('html')).toHaveAttribute('lang','fr-CA');
    await menu(page).locator('summary').tap();
    await menu(page).locator('[data-language-option=en]').tap();
    await expect(page).toHaveURL(path);
  });
});
