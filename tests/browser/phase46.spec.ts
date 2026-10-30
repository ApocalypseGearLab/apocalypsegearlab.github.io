import {test,expect} from '@playwright/test';
import {mkdirSync} from 'node:fs';

const filters=[
  ['3m-60921-organic-vapor-p100-cartridges','60921','B07571LR2K'],
  ['3m-60926-multi-gas-vapor-p100-cartridges','60926','B009POHLRC'],
  ['3m-2097-p100-particulate-filters','2097','B07FMJPFTY'],
] as const;

for(const [slug,model,asin] of filters)test(`3M ${model} artwork and profile retain package hold and link back to 6800`,async({page,request})=>{
  mkdirSync('.tools/qa/phase4-6',{recursive:true});
  for(const width of [375,1440]) {
    await page.setViewportSize({width,height:900});await page.goto(`/gear/${slug}/`);
    await expect(page.locator('h1')).toContainText(`3M ${model}`);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content','noindex, nofollow');
    const image=page.locator('.product-artwork--detail img');
    await image.evaluate((img:HTMLImageElement)=>img.decode());
    await expect(image).toHaveAttribute('srcset',/480w, .*960w, .*1254w/);
    const current=await image.evaluate((img:HTMLImageElement)=>img.currentSrc);
    expect(current).toMatch(new RegExp(`3m-${model}-outbreak-${width===375?480:960}\\.webp$`));
    expect((await request.get(current)).status()).toBe(200);
    await expect(page.locator('[data-product-purchase] a[data-affiliate-click]')).toHaveCount(0);
    await expect(page.locator('[data-product-purchase]')).toContainText(asin);
    await expect(page.locator('[data-product-purchase]')).toContainText('model/quantity check');
    await expect(page.locator('[data-product-purchase]')).toContainText('As an Amazon Associate');
    await expect(page.locator('.product-caution')).toContainText('supply no oxygen');
    await expect(page.locator('#related').locator('..').locator('a[href="/gear/3m-6800-full-facepiece-respirator/"]')).toHaveCount(1);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    await image.screenshot({path:`.tools/qa/phase4-6/image-${model}-${width}.png`});
    await page.goto('/outbreak/');
    const card=page.locator(`article.card[data-product-id="${slug}"]`);
    await expect(card.locator('[data-amazon-pending]')).toBeVisible();
    await expect(card.locator('a[data-affiliate-click]')).toHaveCount(0);
    await card.locator('img').evaluate((img:HTMLImageElement)=>img.decode());
    await card.screenshot({path:`.tools/qa/phase4-6/card-${model}-${width}.png`,style:'header{visibility:hidden!important}'});
  }
});

test('6800 compares three compatible components with explicit hazard limits and reciprocal navigation',async({page})=>{
  for(const width of [320,375,768,1024,1440,1920]) {
    await page.setViewportSize({width,height:900});await page.goto('/gear/3m-6800-full-facepiece-respirator/');
    const section=page.getByRole('region',{name:'Compatible 3M Filters & Cartridges',exact:true});
    await expect(section.locator('article.card')).toHaveCount(3);
    await expect(section.locator('a[data-affiliate-click]')).toHaveCount(0);
    await expect(section).toContainText('compatibility does not establish suitability');
    await expect(section).toContainText('nuisance-level');
    for(const [slug] of filters)await expect(section.locator(`article.card[data-product-id="${slug}"] a[data-pending-details]`)).toHaveAttribute('href',`/gear/${slug}/`);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    if(width===375||width===1440) {
      for(const image of await section.locator('img').all()){await image.scrollIntoViewIfNeeded();await image.evaluate((img:HTMLImageElement)=>img.decode());}
      mkdirSync('.tools/qa/phase4-6',{recursive:true});
      await section.screenshot({path:`.tools/qa/phase4-6/compatible-${width}.png`,style:'header{visibility:hidden!important}'});
    }
  }
  await page.getByRole('region',{name:'Compatible 3M Filters & Cartridges',exact:true}).locator(`article.card[data-product-id="${filters[0][0]}"] a[data-pending-details]`).click();
  await expect(page).toHaveURL(new RegExp(`/gear/${filters[0][0]}/$`));
});
