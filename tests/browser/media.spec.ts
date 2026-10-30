import { test, expect } from './fixtures';
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { canPublishImportedAsset } from '../../src/lib/imported-media-policy.mjs';
const importedMedia = JSON.parse(readFileSync('src/data/media/imported-manifest.json','utf8')).assets;

const widths = [320, 375, 768, 1024, 1440, 1920];

test('supplied SEO WebPs are delivered unchanged only for the twenty reviewed product mappings', async ({ request, page }) => {
  for(const asset of importedMedia){
    const response=await request.get(asset.deliverySrc);
    expect(response.status()).toBe(canPublishImportedAsset(asset)?200:404);
    if(canPublishImportedAsset(asset)){
      expect(createHash('sha256').update(await response.body()).digest('hex')).toBe(asset.sha256);
      await page.goto(`/gear/${asset.productId}/`);
      const image=page.locator('.product-artwork--detail img');
      await expect(image).toHaveAttribute('src',asset.deliverySrc);
      await expect(image).toHaveAttribute('alt',asset.alt);
      await image.evaluate((img:HTMLImageElement)=>img.decode());
      await expect(image).toHaveAttribute('width','1254');
      await expect(image).toHaveAttribute('height','1254');
      // naturalWidth is density-corrected when a w-descriptor srcset is used.
      expect(await image.evaluate((img:HTMLImageElement)=>img.naturalWidth>0&&img.naturalWidth===img.naturalHeight)).toBe(true);
    }
  }
});
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
  await expect(hero).toHaveAttribute('alt', /Concept illustration.*underground survival bunker/);
  await hero.evaluate((img: HTMLImageElement) => img.decode());
  expect(await hero.evaluate((img: HTMLImageElement) => img.currentSrc)).toMatch(/hero-768\.webp$/);
  expect(requests.filter((src) => src.includes('survival-bunker-hero'))).toHaveLength(1);
  expect(await page.evaluate(() => (window as any).imageLayoutShifts)).toBeLessThan(0.01);
  const observations = [];
  mkdirSync('.tools/qa/phase-3', { recursive: true });
  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    // Resizing can replace currentSrc while decode() is pending. Wait for a
    // successfully decoded, unchanged source; a genuinely broken image still fails.
    await expect.poll(() => hero.evaluate(async (img: HTMLImageElement) => {
      const source = img.currentSrc;
      try { await img.decode(); } catch { return false; }
      return img.complete && img.naturalWidth > 0 && img.currentSrc === source;
    }), { timeout: 5_000, message: 'The selected responsive hero source must finish decoding' }).toBe(true);
    const observation = await hero.evaluate((img: HTMLImageElement) => {
      const rect = img.getBoundingClientRect();
      return { viewport: innerWidth, width: rect.width, height: rect.height, src: img.currentSrc, fit: getComputedStyle(img).objectFit };
    });
    expect(observation.width / observation.height).toBeCloseTo(1672 / 941, 2);
    expect(observation.fit).toBe('contain');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Choose a sector' })).toBeVisible();
    if (width < 960) {
      const imageBox = await hero.boundingBox();
      const textBox = await page.locator('.hero-copy-panel').boundingBox();
      expect(textBox!.y).toBeGreaterThanOrEqual(imageBox!.y + imageBox!.height);
    }
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
    // Inspect the actual production build, independent of development HMR reloads.
    await page.goto('/blackout/');
    const images = page.locator('.product-artwork img');
    await expect(images).toHaveCount(8);
    const rejected = page.locator('article.card').filter({ has: page.locator('a[href="/gear/jackery-explorer-300/"]') });
    await expect(rejected.locator('img')).toHaveCount(0);
    await expect(rejected.locator('.neutral-media')).toHaveCount(1);
    expect(await rejected.locator('.neutral-media').evaluate((element) => {
      const box = element.getBoundingClientRect(); return Math.abs(box.width - box.height);
    })).toBeLessThan(1);
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
      expect(actual.alt).toMatch(/^Concept illustration/);
      sources.push(actual.src);
    }
    expect(new Set(sources).size).toBe(8);
    await page.locator('article.card a').first().focus();
    expect(await page.locator('article.card a').first().evaluate((link) => getComputedStyle(link).outlineStyle)).toBe('solid');
    await page.locator('article.card a').first().evaluate((link: HTMLElement) => link.blur());
    await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
    await page.screenshot({ path: `.tools/qa/phase-3/blackout-${width}.png`, fullPage: true });
  }
  await page.goto('/gear/fenix-cl26r-pro/');
  await expect(page.locator('.product-artwork--detail')).toHaveCount(1);
  await expect(page.locator('.product-artwork--detail figcaption')).toContainText('Illustrated labels are not specifications');
  const detail = page.locator('.product-artwork--detail img');
  await detail.evaluate((img: HTMLImageElement) => img.decode());
  expect(await detail.evaluate((img: HTMLImageElement) => img.currentSrc)).toMatch(/fenix-cl26r-pro-camping-lantern-blackout\.webp$/);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
  await page.screenshot({ path: '.tools/qa/phase-3/detail-1920.png', fullPage: true });
});

test('rejected artwork has no image URL, download or static production asset', async ({ page, request }) => {
  const downloads: string[] = [];
  page.on('request', (req) => { if (req.resourceType() === 'image') downloads.push(req.url()); });
  await page.goto('http://127.0.0.1:4322/gear/jackery-explorer-300/');
  const artwork = page.locator('.product-artwork--detail');
  await expect(artwork.locator('img')).toHaveCount(0);
  await expect(artwork).toContainText('USB-C 100 W');
  await expect(artwork).toContainText('Unsuitable for commercial publication');
  expect(downloads.some((url) => url.includes('jackery-explorer-300-blackout'))).toBe(false);
  for (const width of [480, 960]) {
    expect((await request.get(`/images/jackery-explorer-300-blackout-${width}.webp`)).status()).toBe(404);
  }
  await page.screenshot({ path: '.tools/qa/phase-3/rejected-300.png', fullPage: true, animations: 'disabled' });
});

test('reviewed illustrations disclose their limits without displaying withdrawn objections', async ({ page }) => {
  for (const slug of ['fenix-cl26r-pro', 'jackery-explorer-1000-v2']) {
    await page.goto(`http://127.0.0.1:4322/gear/${slug}/`);
    const figure = page.locator('.product-artwork--detail');
    await expect(figure).toHaveAttribute('data-artwork-status', 'reviewed-illustration');
    await expect(figure.locator('figcaption')).toContainText('Concept illustration, not a product photograph');
    await expect(figure.locator('figcaption')).toContainText('Illustrated labels are not specifications');
    await expect(figure.locator('figcaption')).not.toContainText('earlier');
    await figure.locator('img').evaluate((img: HTMLImageElement) => img.decode());
    for (const width of [375, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await figure.screenshot({ path: `.tools/qa/phase-3/${slug}-${width}.png`, animations: 'disabled' });
    }
  }
  await page.goto('http://127.0.0.1:4322/gear/jackery-explorer-300/');
  await page.locator('.product-artwork--detail').screenshot({ path: '.tools/qa/phase-3/withheld-300.png', animations: 'disabled' });
});
