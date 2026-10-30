import {test,expect} from './fixtures';
import {mkdirSync} from 'node:fs';
import AxeBuilder from '@axe-core/playwright';
import {PHASE46_FILTERS,FILTER_2091} from '../catalogue-fixture';

const id2091=Object.keys(FILTER_2091)[0]!;
const scope='section[aria-labelledby="compatible-3m-filters"]';
test('the three documented 3M CTAs work in every placement and emit exactly one affiliate event per action',async({page,context})=>{
  test.setTimeout(60_000);
  await context.route('https://www.amazon.ca/**',route=>route.fulfill({body:'Retailer simulation, no Amazon traffic'}));
  for(const path of ['/gear/','/outbreak/','/gear/3m-6800-full-facepiece-respirator/']){
    await page.goto(path);
    for(const [id,[asin]]of Object.entries(PHASE46_FILTERS)){
      const card=page.locator(`${path.includes('6800')?scope+' ':''}article.card[data-product-id="${id}"]`);
      const link=card.locator('a[data-affiliate-click]');
      await expect(link).toHaveAttribute('href',`https://www.amazon.ca/dp/${asin}?tag=apocalypsegear-20`);
      await expect(link).toHaveAttribute('target','_blank');await expect(link).toHaveAttribute('rel','sponsored nofollow noopener');
      await expect(card.getByRole('complementary',{name:'Affiliate disclosure'})).toContainText('As an Amazon Associate I earn from qualifying purchases.');
      const count=await page.evaluate(()=>((window as any).dataLayer??[]).filter((r:any)=>r[1]==='affiliate_click').length);
      const popup=context.waitForEvent('page');await link.click();const opened=await popup;
      await expect(opened).toHaveURL(`https://www.amazon.ca/dp/${asin}?tag=apocalypsegear-20`);expect(await opened.evaluate(()=>window.opener)).toBe(null);await opened.close();
      const events=await page.evaluate(()=>((window as any).dataLayer??[]).filter((r:any)=>r[1]==='affiliate_click').map((r:any)=>r[2]));
      expect(events).toHaveLength(count+1);
      expect(events.at(-1)).toMatchObject({product_id:id,asin,merchant:'amazon-ca',marketplace:'ca',destination_url:`https://www.amazon.ca/dp/${asin}?tag=apocalypsegear-20`,page_location:'http://127.0.0.1:4321'+path});
    }
    const held=page.locator(`${path.includes('6800')?scope+' ':''}article.card[data-product-id="${id2091}"]`);
    await expect(held.locator('img')).toHaveAttribute('src',/3m-2091-outbreak-480.webp$/);
    await expect(held.locator('a[data-affiliate-click]')).toHaveCount(0);
  }
  for(const [id,[asin]]of Object.entries(PHASE46_FILTERS)){
    await page.goto('/gear/'+id+'/');const own=page.locator('[data-product-purchase] a[data-affiliate-click]');
    const popup=context.waitForEvent('page');await own.click();const opened=await popup;await expect(opened).toHaveURL(`https://www.amazon.ca/dp/${asin}?tag=apocalypsegear-20`);await opened.close();
    expect(await page.evaluate(()=>((window as any).dataLayer??[]).filter((r:any)=>r[1]==='affiliate_click').length)).toBe(1);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content','noindex, nofollow');
  }
});

test('2091 preserves its full HUD, responsive sources, accessibility and commercial hold at 320–1920px',async({page,request,context})=>{
  test.setTimeout(60_000);mkdirSync('.tools/qa/phase4-7',{recursive:true});
  await context.addInitScript(()=>{
    (window as any).__phase47CLS=0;
    new PerformanceObserver(list=>{
      for(const entry of list.getEntries() as any[])if(!entry.hadRecentInput)(window as any).__phase47CLS+=entry.value;
    }).observe({type:'layout-shift',buffered:true});
  });
  for(const width of [320,375,768,1024,1440,1920]){
    await page.setViewportSize({width,height:900});await page.goto('/gear/'+id2091+'/');
    const image=page.locator('.product-artwork--detail img');await image.evaluate((img:HTMLImageElement)=>img.decode());
    await expect(image).toHaveAttribute('alt','Concept illustration of two pink 3M 2091 P100 particulate filters in a green tactical HUD frame');
    await expect(image).toHaveAttribute('srcset',/3m-2091-outbreak-480.webp 480w, .*960.webp 960w, .*outbreak.webp 1254w/);
    await expect(image).toHaveAttribute('width','1254');await expect(image).toHaveAttribute('height','1254');await expect(image).toHaveAttribute('loading','eager');
    expect(await image.evaluate((img:HTMLImageElement)=>getComputedStyle(img).objectFit)).toBe('contain');
    const current=await image.evaluate((img:HTMLImageElement)=>img.currentSrc);
    expect(current).toMatch(width<=375?/-480\.webp$/:/-960\.webp$/);
    expect(await image.evaluate((img:HTMLImageElement)=>img.getBoundingClientRect().width/img.getBoundingClientRect().height)).toBeCloseTo(1,3);
    expect((await request.get((await image.getAttribute('src'))!)).status()).toBe(200);
    await expect(page.locator('.product-artwork--detail figcaption')).toContainText('Concept illustration, not a product photograph.');
    await expect(page.locator('[data-product-purchase] a[data-affiliate-click]')).toHaveCount(0);
    await expect(page.locator('[data-product-purchase]')).toContainText('sale-pack quantity');
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations).toEqual([]);
    expect(await page.evaluate(()=>(window as any).__phase47CLS)).toBe(0);
    if(width===375||width===1440){
      await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:`.tools/qa/phase4-7/profile-2091-${width}.png`,fullPage:true});
      await image.screenshot({path:`.tools/qa/phase4-7/image-2091-${width}.png`});
      await page.goto('/gear/3m-6800-full-facepiece-respirator/');const section=page.locator(scope);
      for(const img of await section.locator('img').all()){await img.scrollIntoViewIfNeeded();await img.evaluate((img:HTMLImageElement)=>img.decode());}
      await section.screenshot({path:`.tools/qa/phase4-7/compatible-${width}.png`,style:'header{visibility:hidden!important}'});
    }
  }
  expect((await request.get('/images/outbreak/originals/3m-2091-outbreak.png')).status()).toBe(404);
});
