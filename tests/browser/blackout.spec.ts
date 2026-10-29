import { test, expect } from '@playwright/test';
import { getMerchantLinks } from '../../src/lib/affiliate';
import { categoryUniverse } from '../../src/config/taxonomy';
import type { Product } from '../../src/lib/products';
import AxeBuilder from '@axe-core/playwright';
import { readFileSync, readdirSync, mkdirSync } from 'node:fs';

const heldSlugs = new Set(['jackery-explorer-300', 'kidde-c3010-co-alarm', 'iniu-p62-20000mah-65w']);
const drafts = readdirSync('src/data/products').filter((name) => name.endsWith('.json')).map((file) => ({
  slug: file.replace(/\.json$/, ''), data: JSON.parse(readFileSync(`src/data/products/${file}`, 'utf8')),
})).filter(({ data }) => data.reviewStatus === 'draft');

for (const { slug, data } of drafts) {
  const merchant = getMerchantLinks({id:slug,data} as Product)[0]!;
  const active = Boolean(merchant.href);
  test(`${slug} draft evidence, mobile layout and safe informational publication`, async ({ page }) => {
    const purchase = page.locator('[data-product-purchase]');
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(`/gear/${slug}/`);
    await expect(page.locator('h1')).toHaveText(data.name);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://apocalypsegearlab.github.io/gear/${slug}/`);
    await expect(purchase.getByRole('link', { disabled: true, name: /View on Amazon.ca/ })).toHaveCount(active ? 0 : 1);
    await expect(purchase.locator('a[data-affiliate-click]')).toHaveCount(active ? 1 : 0);
    if (active) {
      const button = purchase.locator('a[data-affiliate-click]');
      await expect(button).toHaveAttribute('href', data.links.amazonCa.url);
      await expect(button).toHaveAttribute('target', '_blank');
      await expect(button).toHaveAttribute('rel', 'sponsored nofollow noopener');
      await expect(purchase.getByRole('complementary', { name: 'Affiliate disclosure' })).toContainText('As an Amazon Associate I earn from qualifying purchases.');
      await expect(page.getByText('The retailer link uses the recorded ASIN.', {exact:false})).toBeVisible();
      expect(await page.locator('main').innerText()).not.toContain('The linked Canadian model has documented listing and safety checks.');
    } else {
      await expect(purchase.getByRole('link', { disabled: true, name: /View on Amazon.ca/ })).toContainText(merchant.unavailableReason!);
      await expect(page.getByText('Amazon.ca links are pending confirmation of the Canadian listing and affiliate eligibility. No price, availability or seller is confirmed.')).toBeVisible();
    }
    await expect(page.locator('[aria-label="Research status"]')).toHaveCount(0);
    await expect(page.locator('#publication')).toHaveCount(0);
    if(heldSlugs.has(slug)) await expect(page.getByRole('complementary', { name: 'Important product limitation' })).toBeVisible();
    expect(await page.locator('body').innerText()).not.toMatch(/ChatGPT|Codex|AI-assisted|Related research drafts|Before this can be published|Owner-selected|held in draft/);
    await expect(page.getByRole('region', { name: `${data.name} specifications`, exact: true })).toBeVisible();
    const jsonLd = await page.locator('script[type="application/ld+json"]').allTextContents();
    const schemas = jsonLd.map((text) => JSON.parse(text));
    expect(schemas.map((schema) => schema['@type'])).toEqual(['BreadcrumbList']);
    expect(schemas[0].itemListElement.map((item: { position: number }) => item.position)).toEqual([1, 2, 3]);
    expect(schemas[0].itemListElement[2].item).toBe(`https://apocalypsegearlab.github.io/gear/${slug}/`);
    expect(await page.locator('a[href^="#source-"]').evaluateAll((links) => links.every((link) => document.getElementById(link.getAttribute('href')!.slice(1))))).toBe(true);
    for (const width of [320, 375, 768, 1024, 1440, 1920]) {
      await page.setViewportSize({ width, height: 900 });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
      if (width === 375 || width === 1440) {
        mkdirSync('.tools/qa/phase4-1', { recursive: true });
        for (const image of await page.locator('main img').all()) {
          await image.scrollIntoViewIfNeeded();
          await image.evaluate((img:HTMLImageElement)=>img.decode());
        }
        await page.evaluate(() => scrollTo({top:0,behavior:'instant'}));
        await page.screenshot({ path: `.tools/qa/phase4-1/${slug}-${width}.png`, fullPage: true });
      }
    }
    expect(errors).toEqual([]);
    const response = await page.goto(`http://127.0.0.1:4321/gear/${slug}/`);
    expect(response?.status()).toBe(200);
    {
      await expect(page.locator('h1')).toHaveText(data.name);
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
      await expect(purchase.locator('a[data-affiliate-click]')).toHaveCount(active?1:0);
    }
  });
}

for (const route of ['/blackout/', '/fallout/', '/outbreak/', '/gear/']) {
  test(`${route} exposes the registered profiles in its correct sector`, async ({ page }) => {
    // The full catalogue decodes 25 pictures and runs six axe audits plus
    // screenshots. Bound that deliberate workload separately from one profile.
    test.setTimeout(60_000);
    const sector = route === '/gear/' ? null : route.slice(1,-1);
    const selected = drafts.filter(({data}) => !sector || categoryUniverse(data.category) === sector);
    const images = route === '/blackout/' ? 8 : route === '/fallout/' ? 9 : route === '/outbreak/' ? 8 : 25;
    await page.goto(route);
    await expect(page.locator('article.card')).toHaveCount(selected.length);
    await expect(page.locator('.neutral-media')).toHaveCount(selected.length-images);
    await expect(page.locator('article.card img')).toHaveCount(images);
    for (const image of await page.locator('article.card img').all()) {
      await image.scrollIntoViewIfNeeded();
      await image.evaluate((img: HTMLImageElement)=>img.decode());
    }
    for (const { slug } of selected) await expect(page.locator(`a[href="/gear/${slug}/"]`)).toHaveCount(1);
    for (const {slug, data} of selected) {
      const card = page.locator(`article.card[data-product-id="${slug}"]`);
      const merchant = getMerchantLinks({id:slug,data} as Product)[0]!;
      await expect(card.locator('a[data-affiliate-click]')).toHaveCount(merchant.href ? 1 : 0);
      await expect(card.getByRole('link', {disabled:true, name:/View on Amazon.ca/})).toHaveCount(merchant.href ? 0 : 1);
      if (merchant.href) {
        await expect(card.locator('a[data-affiliate-click]')).toHaveAttribute('href', merchant.href);
        await expect(card.getByRole('complementary', {name:'Affiliate disclosure'})).toContainText('As an Amazon Associate I earn from qualifying purchases.');
      }
    }
    for (const width of [320, 375, 768, 1024, 1440, 1920]) {
      await page.setViewportSize({ width, height: 900 });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
      if ([375,1440].includes(width)) {
        mkdirSync('.tools/qa/phase4-1', {recursive:true});
        await page.evaluate(() => scrollTo({top:0,behavior:'instant'}));
        await page.screenshot({path:`.tools/qa/phase4-1/${route === '/gear/' ? 'catalogue' : sector}-${width}.png`,fullPage:true});
      }
    }
    if (route === '/gear/') {
      await expect(page.locator('article.card h2')).toHaveCount(drafts.length);
      mkdirSync('.tools/qa/phase-2', { recursive: true });
      await page.screenshot({ path: '.tools/qa/phase-2/catalogue-1440.png', fullPage: true });
    }
    await page.goto(`http://127.0.0.1:4321${route}`);
    for (const { slug } of selected) {
      await expect(page.locator(`a[href="/gear/${slug}/"]`)).toHaveCount(1);
    }
  });
}
