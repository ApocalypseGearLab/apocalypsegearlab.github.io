import { test, expect } from '@playwright/test';
import { mkdirSync, writeFileSync } from 'node:fs';

const widths = [320, 375, 768, 1024, 1440, 1920];
test('hero reserves space, selects responsive sources and supports reduced motion', async ({ page }) => {
  await page.addInitScript(() => {
    (window as any).imageLayoutShifts = 0;
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as any) if (!entry.hadRecentInput) (window as any).imageLayoutShifts += entry.value;
    }).observe({ type: 'layout-shift', buffered: true });
  });
  const requests: string[] = [];
  page.on('request', (request) => { if (request.resourceType() === 'image') requests.push(request.url()); });
  await page.route('**/images/*.webp', async (route) => {
    // Confirm the hero's box exists before any image pixels arrive.
    expect(await page.locator('.hero-image').evaluate((img) => img.getBoundingClientRect().height)).toBeGreaterThan(100);
    await route.continue();
  });
  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto('/');
  const hero = page.locator('.hero-image');
  await expect(hero).toHaveAttribute('fetchpriority', 'high');
  await expect(hero).toHaveAttribute('loading', 'eager');
  await expect(hero).toHaveAttribute('alt', /AI-assisted illustration.*underground survival bunker/);
  await hero.evaluate((img: HTMLImageElement) => img.decode());
  expect(requests.filter((src) => src.includes('survival-bunker-hero'))).toHaveLength(1);
  expect(await page.evaluate(() => (window as any).imageLayoutShifts)).toBeLessThan(0.01);
  const observations = [];
  mkdirSync('.tools/qa/phase-3', { recursive: true });
  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    await hero.evaluate((img: HTMLImageElement) => img.decode());
    const observation = await hero.evaluate((img: HTMLImageElement) => {
      const rect = img.getBoundingClientRect();
      return { viewport: innerWidth, width: rect.width, height: rect.height, src: img.currentSrc, fit: getComputedStyle(img).objectFit };
    });
    expect(observation.width / observation.height).toBeCloseTo(1672 / 941, 2);
    expect(observation.fit).toBe('contain');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    observations.push(observation);
    await page.screenshot({ path: `.tools/qa/phase-3/home-${width}.png`, fullPage: true });
  }
  writeFileSync('.tools/qa/phase-3/responsive-sources.json', JSON.stringify(observations, null, 2));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  expect(await page.locator('.console li').first().evaluate((li) => getComputedStyle(li).animationName)).toBe('none');
  const cta = page.getByRole('link', { name: 'Choose a sector' });
  await cta.focus();
  expect(await cta.evaluate((link) => getComputedStyle(link).outlineStyle)).toBe('solid');
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#sectors$/);
});

test('BLACKOUT artwork stays complete in cards and nested draft pages', async ({ page }) => {
  mkdirSync('.tools/qa/phase-3', { recursive: true });
  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('http://127.0.0.1:4322/blackout/');
    // Exclude Astro's development UI from site screenshots, without changing site content.
    await page.addStyleTag({ content: 'astro-dev-toolbar { display: none !important; }' });
    const images = page.locator('.product-artwork img');
    await expect(images).toHaveCount(8);
    const sources: string[] = [];
    for (const img of await images.all()) {
      await img.scrollIntoViewIfNeeded();
      await img.evaluate((element: HTMLImageElement) => element.decode());
      const actual = await img.evaluate((element: HTMLImageElement) => {
        const box = element.getBoundingClientRect();
        return { width: box.width, height: box.height, fit: getComputedStyle(element).objectFit, src: element.currentSrc, alt: element.alt };
      });
      expect(actual.width).toBeCloseTo(actual.height, 1);
      expect(actual.fit).toBe('contain');
      expect(actual.alt).toMatch(/^AI-assisted illustration/);
      sources.push(actual.src);
    }
    expect(new Set(sources).size).toBe(8);
    await page.locator('article.card a').first().focus();
    expect(await page.locator('article.card a').first().evaluate((link) => getComputedStyle(link).outlineStyle)).toBe('solid');
    await page.locator('article.card a').first().evaluate((link: HTMLElement) => link.blur());
    await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
    await page.screenshot({ path: `.tools/qa/phase-3/blackout-${width}.png`, fullPage: true });
  }
  await page.goto('http://127.0.0.1:4322/gear/fenix-cl26r-pro/');
  await expect(page.locator('.product-artwork--detail')).toHaveCount(1);
  await expect(page.locator('.product-artwork--detail figcaption')).toContainText('not identified as an exact CL26R Pro depiction');
  const detail = page.locator('.product-artwork--detail img');
  await detail.evaluate((img: HTMLImageElement) => img.decode());
  expect(await detail.evaluate((img: HTMLImageElement) => img.currentSrc)).toMatch(/fenix-lantern-blackout-960\.webp$/);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
  await page.screenshot({ path: '.tools/qa/phase-3/detail-1920.png', fullPage: true });
});
