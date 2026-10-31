import {test,expect} from './fixtures';
import AxeBuilder from '@axe-core/playwright';
import {mkdirSync} from 'node:fs';
import {PHASE5} from '../catalogue-fixture';

for(const [id,[asin,category,active]]of Object.entries(PHASE5))test(`${id} renders its own finished artwork, substantive profile and correct sector from 320 to 1920px`,async({page,request,context})=>{
  test.setTimeout(60_000);mkdirSync('.tools/qa/phase5',{recursive:true});
  const sector=category==='fixed-blade-knives'?'outbreak':'fallout';
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
  await context.addInitScript(()=>{(window as any).__phase5CLS=0;new PerformanceObserver(list=>{for(const e of list.getEntries() as any[])if(!e.hadRecentInput)(window as any).__phase5CLS+=e.value;}).observe({type:'layout-shift',buffered:true});});
  for(const width of [320,375,768,1024,1440,1920]){
    await page.setViewportSize({width,height:900});await page.goto(`/gear/${id}/`);
    await expect(page.locator('h1')).toHaveCount(1);await expect(page.locator('h1')).not.toHaveText('');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href',`https://apocalypsegearlab.github.io/gear/${id}/`);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content','noindex, nofollow');
    const image=page.locator('.product-artwork--detail img');await image.evaluate((img:HTMLImageElement)=>img.decode());
    await expect(image).toHaveAttribute('srcset',/480w, .*960w, .*1254w/);
    await expect(image).toHaveAttribute('width','1254');await expect(image).toHaveAttribute('height','1254');
    expect(await image.evaluate((img:HTMLImageElement)=>getComputedStyle(img).objectFit)).toBe('contain');
    expect((await request.get((await image.getAttribute('src'))!)).status()).toBe(200);
    await expect(page.locator('.product-artwork--detail figcaption')).toContainText('Concept illustration, not a product photograph.');
    await expect(page.locator('[data-product-purchase] a[data-affiliate-click]')).toHaveCount(active?1:0);
    if(active)await expect(page.locator('[data-product-purchase] a[data-affiliate-click]')).toHaveAttribute('href',`https://www.amazon.ca/dp/${asin}?tag=apocalypsegear-20`);
    else await expect(page.locator(`a[href*="${asin}"]`)).toHaveCount(0); // A source citation cannot bypass an offer hold.
    await expect(page.locator('h2',{hasText:'Documented specifications'})).toHaveCount(1);
    const text=await page.locator('main').innerText();expect(text).toContain('Not physically tested by us');
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations).toEqual([]);
    expect(await page.evaluate(()=>(window as any).__phase5CLS)).toBe(0);
    if(width===375||width===1440){
      for(const img of await page.locator('main img').all()){await img.scrollIntoViewIfNeeded();await img.evaluate((img:HTMLImageElement)=>img.decode());}
      await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:`.tools/qa/phase5/${id}-profile-${width}.png`,fullPage:true});
      for(const route of ['/gear/',`/${sector}/`]){
        await page.goto(route);const card=page.locator(`article.card[data-product-id="${id}"]`);
        await card.scrollIntoViewIfNeeded();await card.locator('img').evaluate((img:HTMLImageElement)=>img.decode());
        await expect(card).toHaveAttribute('data-universe',sector);
        await expect(card.locator('img')).toHaveAttribute('loading','lazy');
        await expect(card.locator('a[data-affiliate-click]')).toHaveCount(active?1:0);
        if(route!== '/gear/')await card.screenshot({path:`.tools/qa/phase5/${id}-card-${width}.png`,style:'header{visibility:hidden!important}'});
      }
      await page.goto(`/${sector}/`);await expect(page.locator('#planning-checklist').locator('..').locator(`a[href="/gear/${id}/"]`)).toHaveCount(1);
    }
  }
  await page.goto(`/${sector==='outbreak'?'fallout':'outbreak'}/`);await expect(page.locator(`article.card[data-product-id="${id}"]`)).toHaveCount(0);
  expect(errors).toEqual([]);
});

test('four permitted Phase 5 links keep exact ASINs, new tabs and one affiliate event per mouse or keyboard action',async({page,context})=>{
  test.setTimeout(60_000);
  await context.route('https://www.amazon.ca/**',route=>route.fulfill({body:'Isolated retailer simulation'}));
  for(const [id,[asin,category,active]]of Object.entries(PHASE5)){
    const url=`https://www.amazon.ca/dp/${asin}?tag=apocalypsegear-20`;
    for(const path of ['/gear/',category==='fixed-blade-knives'?'/outbreak/':'/fallout/',`/gear/${id}/`]){
      await page.goto(path);
      const region=path===`/gear/${id}/`?page.locator('[data-product-purchase]'):page.locator(`article.card[data-product-id="${id}"]`);
      const link=region.locator('a[data-affiliate-click]');
      if(!active){await expect(link).toHaveCount(0);continue;}
      await expect(link).toHaveAttribute('href',url);await expect(link).toHaveAttribute('rel','sponsored nofollow noopener');await expect(link).toHaveAttribute('target','_blank');
      await expect(region).toContainText('As an Amazon Associate I earn from qualifying purchases.');
      for(const method of ['mouse','keyboard']){
        const before=await page.evaluate(()=>((window as any).dataLayer??[]).filter((r:any)=>r[1]==='affiliate_click').length);
        const popup=context.waitForEvent('page');if(method==='mouse')await link.click();else{await link.focus();await page.keyboard.press('Enter');}
        const opened=await popup;await expect(opened).toHaveURL(url);expect(await opened.evaluate(()=>window.opener)).toBe(null);await opened.close();
        const events=await page.evaluate(()=>((window as any).dataLayer??[]).filter((r:any)=>r[1]==='affiliate_click').map((r:any)=>r[2]));
        expect(events).toHaveLength(before+1);expect(events.at(-1)).toEqual({product_id:id,asin,merchant:'amazon-ca',marketplace:'ca',destination_url:url,page_location:'http://127.0.0.1:4321'+path,send_to:'G-YFJJ5N9RBX',transport_type:'beacon'});
      }
    }
  }
});
