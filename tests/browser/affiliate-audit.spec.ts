import {test,expect} from '@playwright/test';
import {mkdirSync} from 'node:fs';

const id='3m-2091-p100-particulate-filters';
test('2091 has its own neutral green profile and held Canadian ASIN without reusing the 2097 image',async({page})=>{
  mkdirSync('.tools/qa/affiliate-audit',{recursive:true});
  for(const width of [375,1440]) {
    await page.setViewportSize({width,height:900});
    for(const route of ['/gear/','/outbreak/']) {
      await page.goto(route);
      const card=page.locator(`article.card[data-product-id="${id}"]`);
      await expect(card.locator('img')).toHaveCount(0);
      await expect(card.locator('.neutral-media')).toHaveCount(1);
      expect(await card.locator('figure').evaluate(el=>getComputedStyle(el).getPropertyValue('--media-accent').trim())).toBe('182 245 102');
      await expect(card.locator('[data-amazon-pending]')).toBeVisible();
      await expect(card.locator('a[data-affiliate-click]')).toHaveCount(0);
      if(route==='/outbreak/')await card.screenshot({path:`.tools/qa/affiliate-audit/card-2091-${width}.png`,style:'header{visibility:hidden!important}'});
      const other=page.locator('article.card[data-product-id="3m-2097-p100-particulate-filters"]');
      await expect(other.locator('img')).toHaveCount(1);await expect(other.locator('h3,h2')).toContainText('2097');
    }
    await page.goto(`/gear/${id}/`);
    await expect(page.locator('h1')).toHaveText('3M 2091 P100 Particulate Filters');
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content','noindex, nofollow');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href',`https://apocalypsegearlab.github.io/gear/${id}/`);
    await expect(page.locator('.product-artwork--detail img')).toHaveCount(0);
    await expect(page.locator('[data-product-purchase]')).toContainText('B001D1JCK4');
    await expect(page.locator('[data-product-purchase]')).toContainText('sale-pack quantity');
    await expect(page.locator('[data-product-purchase] a[data-affiliate-click]')).toHaveCount(0);
    await expect(page.locator('a[href*="B001D1JCK4"]')).toHaveCount(0);
    await expect(page.locator('main')).toContainText('no documented nuisance-level organic-vapor relief');
    await expect(page.locator('main')).toContainText('supply no oxygen');
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    const related=page.getByRole('region',{name:'Related equipment profiles',exact:true});
    await expect(related.locator('article.card[data-product-id="3m-2097-p100-particulate-filters"]')).toHaveCount(1);
    await related.locator('article.card[data-product-id="3m-6800-full-facepiece-respirator"] h3 a').click();
    await expect(page).toHaveURL(/\/gear\/3m-6800-full-facepiece-respirator\/$/);
  }
});

test('6800 keeps four distinct compatible filters with model-specific holds and working internal navigation',async({page})=>{
  mkdirSync('.tools/qa/affiliate-audit',{recursive:true});
  for(const width of [320,375,768,1024,1440,1920]) {
    await page.setViewportSize({width,height:900});await page.goto('/gear/3m-6800-full-facepiece-respirator/');
    const section=page.getByRole('region',{name:'Compatible 3M Filters & Cartridges',exact:true});
    await expect(section.locator('article.card')).toHaveCount(4);
    await expect(section.locator('a[data-affiliate-click]')).toHaveCount(0);
    await expect(section.locator('[data-amazon-pending]')).toHaveCount(4);
    await expect(section).toContainText('2091');await expect(section).toContainText('2097');
    await expect(section.locator(`article.card[data-product-id="${id}"] img`)).toHaveCount(0);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    if(width===375||width===1440) {
      for(const image of await section.locator('img').all()){await image.scrollIntoViewIfNeeded();await image.evaluate((el:HTMLImageElement)=>el.decode());}
      await section.screenshot({path:`.tools/qa/affiliate-audit/compatible-${width}.png`,style:'header{visibility:hidden!important}'});
    }
  }
  await page.getByRole('region',{name:'Compatible 3M Filters & Cartridges',exact:true}).locator(`article.card[data-product-id="${id}"] a[data-pending-details]`).click();
  await expect(page).toHaveURL(new RegExp(`/gear/${id}/$`));
});
