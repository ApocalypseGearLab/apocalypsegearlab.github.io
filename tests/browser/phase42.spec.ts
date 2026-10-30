import {test,expect,blockAnalytics} from './fixtures';
import {OUTBREAK} from '../catalogue-fixture';

test('OUTBREAK has twelve green inventory cards with eight active links, compact disclosures and small readable concept captions',async({page,request,browser})=>{
  await page.goto('/outbreak/');
  await expect(page.locator('article.card')).toHaveCount(12);
  await expect(page.locator('article.card img')).toHaveCount(11);
  await expect(page.locator('article.card a[data-affiliate-click]')).toHaveCount(8);
  for(const id of Object.keys(OUTBREAK)) {
    const card=page.locator(`article.card[data-product-id="${id}"]`);
    expect(await card.evaluate(el=>getComputedStyle(el).getPropertyValue('--accent').trim())).toBe('#b6f566');
    await expect(card.getByRole('link',{name:/View on Amazon.ca/})).toHaveCount(1);
    await expect(card.getByRole('complementary',{name:'Affiliate disclosure'})).toContainText('As an Amazon Associate I earn from qualifying purchases.');
    expect(await card.locator('figcaption').evaluate(el=>parseFloat(getComputedStyle(el).fontSize))).toBe(10.5);
    expect(await card.locator('figcaption').evaluate(el=>getComputedStyle(el).borderStyle)).toBe('none');
  }
  expect(await page.locator('main').innerText()).not.toContain('Some links on this page may be affiliate links.');
  expect(await page.locator('main').innerText()).not.toContain('Voir sur Amazon.ca');
  for(const width of [375,1440]) {
    // A fresh cache/viewport tests initial source selection, rather than the
    // browser's legitimate reuse of a larger image after a viewport shrinks.
    const context=await browser.newContext({viewport:{width,height:900}});
    await blockAnalytics(context);
    const capture=await context.newPage();
    try { for(const id of Object.keys(OUTBREAK)) {
      await capture.goto(`http://127.0.0.1:4321/gear/${id}/`);
      const image=capture.locator('.product-artwork--detail img');
      await image.evaluate((img:HTMLImageElement)=>img.decode());
      await expect(image).toHaveAttribute('srcset',/480w, .*960w, .*1254w/);
      const current=await image.evaluate((img:HTMLImageElement)=>img.currentSrc);
      expect(current).toMatch(width===375?/-480\.webp$/ : /-960\.webp$/);
      expect((await request.get(current)).status()).toBe(200);
      await expect(capture.locator('[data-product-purchase] a[data-affiliate-click]')).toHaveAccessibleName(/View on Amazon.ca/);
      for(const disclosure of await capture.locator('.affiliate-note').all()) {
        expect(await disclosure.evaluate(el=>el.getBoundingClientRect().height)).toBeLessThan(110);
        expect(await disclosure.evaluate(el=>getComputedStyle(el).borderStyle)).toBe('none');
      }
    }} finally { await context.close(); }
  }
});
