import {test,expect,blockAnalytics} from './fixtures';
import {PHASE43_FALLOUT} from '../catalogue-fixture';
import {readFileSync} from 'node:fs';

test('Phase 4.3 supplied images have correct initial mobile/desktop sources and render in related cards',async({browser,request})=>{
  for(const width of [375,1440]) {
    const context=await browser.newContext({viewport:{width,height:900}}),page=await context.newPage();
    await blockAnalytics(context);
    try {
      for(const id of [...Object.keys(PHASE43_FALLOUT),'3m-6800-full-facepiece-respirator']) {
        await page.goto(`http://127.0.0.1:4321/gear/${id}/`);
        const img=page.locator('.product-artwork--detail img');
        await img.evaluate((el:HTMLImageElement)=>el.decode());
        await expect(img).toHaveAttribute('srcset',/480w, .*960w, .*1254w/);
        expect(await img.evaluate((el:HTMLImageElement)=>el.currentSrc)).toMatch(width===375?/-480\.webp$/:/-960\.webp$/);
        await expect(img).toHaveAttribute('alt',/^Concept illustration of /);
        await expect(page.locator('.product-artwork--detail figcaption')).toContainText('Illustrated labels are not specifications');
        const data=JSON.parse(readFileSync(`src/data/products/${id}.json`,'utf8'));
        for(const related of data.relatedProducts) {
          const card=page.locator(`article.card[data-product-id="${related}"]`);
          await expect(card).toBeVisible();
          const image=card.locator('img');
          await image.scrollIntoViewIfNeeded();
          await image.evaluate((el:HTMLImageElement)=>el.decode());
          expect((await request.get((await image.getAttribute('src'))!)).status()).toBe(200);
        }
      }
    } finally {await context.close();}
  }
});
