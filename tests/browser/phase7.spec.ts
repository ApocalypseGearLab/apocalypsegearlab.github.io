import {test,expect,blockAnalytics} from './fixtures';
import AxeBuilder from '@axe-core/playwright';
import {mkdirSync,readFileSync} from 'node:fs';
import {PHASE7} from '../../scripts/phase7-preservation.mjs';
const directory='docs/qa/phase7/screenshots';
const read=(f:string)=>JSON.parse(readFileSync(f,'utf8'));
const manifest=read('src/data/media/imported-manifest.json');

for(const width of [375,1440])for(const [id,[asin,,sector]]of Object.entries(PHASE7))test(`Phase 7 ${id} has accessible content, intact illustration and recorded-link tracking at ${width}px`,async({page,context})=>{
 test.setTimeout(60_000);await blockAnalytics(context);
 const events:any[]=[];await page.exposeFunction('phase7Event',(args:any[])=>events.push(args));
 await page.addInitScript(()=>{
  (window as any).__phase7CLS=0;
  new PerformanceObserver(list=>{for(const entry of list.getEntries() as any[])if(!entry.hadRecentInput)(window as any).__phase7CLS+=entry.value;}).observe({type:'layout-shift',buffered:true});
  (window as any).gtag=(...args:any[])=>(window as any).phase7Event(args);
 });
 await context.route('https://www.amazon.ca/**',route=>route.fulfill({status:200,contentType:'text/html',body:'<!doctype html><title>Local retailer simulation</title>'}));
 await page.setViewportSize({width,height:1000});await page.goto(`/gear/${id}/`);
 const product=read(`src/data/products/${id}.json`),asset=manifest.assets.find((a:any)=>a.productId===id);
 await expect(page.locator('h1')).toHaveText(product.name);
 await expect(page.locator('main > article[data-universe]')).toHaveAttribute('data-universe',sector);
 await expect(page.locator('meta[name=robots]')).toHaveAttribute('content','noindex, nofollow');
 await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href',`https://apocalypsegearlab.github.io/gear/${id}/`);
 const schemas=await page.locator('script[type="application/ld+json"]').allTextContents();
 expect(schemas.map(s=>JSON.parse(s)['@type'])).toEqual(['BreadcrumbList']);
 await expect(page.locator('.verification-summary [data-editorial-status]')).toHaveAttribute('data-editorial-status','incomplete');
 await expect(page.locator('.verification-summary [data-listing-status]')).toHaveAttribute('data-listing-status','owner-documented');
 await expect(page.locator('main')).toContainText('Not physically tested by us');
 for(const heading of ['Overview','Documented specifications','Advantages','Limitations','Potential uses and conditions','What to check before buying','Safety and compatibility notes','Related equipment profiles'])await expect(page.getByRole('heading',{name:heading,exact:true})).toBeVisible();
 for(const related of product.relatedProducts)await expect(page.locator(`section[aria-labelledby="related"] article[data-product-id="${related}"] .profile-details`)).toHaveAttribute('href',`/gear/${related}/`);
 const image=page.locator('.product-artwork--detail img');await image.scrollIntoViewIfNeeded();await image.evaluate((node:HTMLImageElement)=>node.decode());
 await expect(image).toHaveAttribute('src',asset.deliverySrc);await expect(image).toHaveAttribute('alt',asset.alt);
 const geometry=await image.evaluate((node:HTMLImageElement)=>({width:node.clientWidth,height:node.clientHeight,fit:getComputedStyle(node).objectFit,natural:node.naturalWidth,src:node.currentSrc}));
 expect(geometry.width).toBe(geometry.height);expect(geometry.fit).toBe('contain');
 // With width-descriptor srcsets Chromium reports density-corrected naturalWidth.
 expect(asset.variants.map((v:any)=>v.src)).toContain(new URL(geometry.src).pathname);
 expect(geometry.natural).toBeGreaterThanOrEqual(geometry.width-1);
 await expect(page.locator('.product-artwork--detail [data-artwork-caveat]')).toHaveText(asset.captionNote);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 expect(await page.evaluate(()=>(window as any).__phase7CLS)).toBe(0);
 expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations).toEqual([]);
 const button=page.locator('[data-product-purchase] a[data-affiliate-click]');
 await expect(button).toHaveAttribute('href',`https://www.amazon.ca/dp/${asin}?tag=apocalypsegear-20`);
 await expect(button).toHaveAttribute('rel','sponsored nofollow noopener');await expect(button).toHaveAttribute('data-cta-placement','profile-summary');
 await expect(page.locator('[data-product-purchase]')).toContainText('As an Amazon Associate I earn from qualifying purchases.');
 const popupPromise=context.waitForEvent('page');await button.click();const popup=await popupPromise;await expect(popup).toHaveURL(product.links.amazonCa.url);expect(await popup.evaluate(()=>window.opener===null)).toBe(true);await popup.close();
 await expect.poll(()=>events.filter(e=>e[0]==='event'&&e[1]==='affiliate_click').length).toBe(1);
 const event=events.find(e=>e[0]==='event'&&e[1]==='affiliate_click')[2];expect(event.product_id).toBe(id);expect(event.asin).toBe(asin);expect(event.marketplace).toBe('ca');expect(event.destination_url).toBe(product.links.amazonCa.url);
 if((width===1440&&id==='vortex-diamondback-hd-10x42-review')||(width===375&&id==='gq-gmc-600-pro-review')){
  for(const image of await page.locator('main img').all()){await image.scrollIntoViewIfNeeded();await image.evaluate((node:HTMLImageElement)=>node.decode());}
  await page.evaluate(()=>{scrollTo({top:0,behavior:'instant'});return new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));});
  mkdirSync(directory,{recursive:true});await page.screenshot({path:`${directory}/${id}-${width}.png`,fullPage:true});
 }
});

for(const width of [320,375,768,1024,1440,1920])test(`Phase 7 cards and category navigation remain discoverable at ${width}px`,async({page})=>{
 await page.setViewportSize({width,height:1000});await page.goto('/gear/');
 const visible=page.locator('[data-catalogue-entry]:visible');await expect(visible).toHaveCount(46);
 for(const [id,[,category,sector]]of Object.entries(PHASE7)){
  const product=read(`src/data/products/${id}.json`);
  await page.getByRole('searchbox').fill(product.brand);
  await page.getByLabel('Sector',{exact:true}).selectOption(sector);
  await page.getByLabel('Equipment category',{exact:true}).selectOption(category);
  await expect(visible.locator(`article[data-product-id="${id}"]`)).toHaveCount(1);
  await expect(page.locator(`[data-catalogue-entry][data-product-id="${id}"] .profile-details, [data-catalogue-entry] article[data-product-id="${id}"] .profile-details`)).toHaveAttribute('href',`/gear/${id}/`);
  await page.getByRole('button',{name:'Clear filters'}).click();
 }
 for(const id of ['vortex-diamondback-hd-10x42-review','garrett-pro-pointer-at-review','motorola-talkabout-t802-review']){
  const [,category,sector]=PHASE7[id as keyof typeof PHASE7];
  if(width<1024){await page.getByRole('button',{name:'Menu',exact:true}).click();await page.getByRole('button',{name:`Expand ${sector!.toUpperCase()} categories`}).click();}
  else await page.locator('.gear-trigger > a').hover();
  await page.locator(`body > header .category-link[data-category="${category}"]`).click();
  await expect(page).toHaveURL(new RegExp(`#category-${category}$`));
  await expect(page.locator(`[data-catalogue-entry] article[data-product-id="${id}"]`)).toBeVisible();
  await page.getByRole('button',{name:'Clear filters'}).click();
 }
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 if(width===375||width===1440){mkdirSync(directory,{recursive:true});await page.screenshot({path:`${directory}/catalogue-${width}.png`});}
});
