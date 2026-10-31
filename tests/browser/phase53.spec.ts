import {test,expect} from './fixtures';
import AxeBuilder from '@axe-core/playwright';
import {mkdirSync,writeFileSync} from 'node:fs';
import {PHASE53} from '../catalogue-fixture';

const ids=Object.keys(PHASE53);
for(const [id,[asin]]of Object.entries(PHASE53))test(`${id} complete BLACKOUT artwork, power checklist and profile at six viewport widths`,async({page,request})=>{
 test.setTimeout(90_000);mkdirSync('.tools/qa/phase5-3',{recursive:true});
 const records:any[]=[];const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));
 await page.addInitScript(()=>{(window as any).__powerCLS=0;new PerformanceObserver(list=>{for(const e of list.getEntries() as any[])if(!e.hadRecentInput)(window as any).__powerCLS+=e.value;}).observe({type:'layout-shift',buffered:true});});
 for(const width of [320,375,768,1024,1440,1920]){
  await page.setViewportSize({width,height:900});await page.goto(`/gear/${id}/`);
  await expect(page.locator('h1')).toHaveCount(1);await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content','noindex, nofollow');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href',`https://apocalypsegearlab.github.io/gear/${id}/`);
  const schema=await page.locator('script[type="application/ld+json"]').allTextContents();expect(schema.map(s=>JSON.parse(s)['@type'])).toEqual(['BreadcrumbList']);
  const art=page.locator('.product-artwork--detail img');await art.evaluate((img:HTMLImageElement)=>img.decode());
  await expect(art).toHaveAttribute('width','1254');await expect(art).toHaveAttribute('height','1254');await expect(art).toHaveAttribute('srcset',/480w, .*960w, .*1254w/);
  expect(await art.evaluate(img=>getComputedStyle(img).objectFit)).toBe('contain');
  for(const entry of (await art.getAttribute('srcset'))!.split(','))expect((await request.get(entry.trim().split(' ')[0]!)).status()).toBe(200);
  await expect(page.locator('.product-artwork--detail figcaption')).toContainText('Concept illustration, not a product photograph.');
  await expect(page.locator('[data-product-purchase] a[data-affiliate-click]')).toHaveAttribute('href',`https://www.amazon.ca/dp/${asin}?tag=apocalypsegear-20`);
  await expect(page.locator('[data-technical-sources]')).toContainText('Technical Sources & References');
  expect(await page.locator('main').innerText()).toContain('Not physically tested by us');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  const violations=(await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations;expect(violations).toEqual([]);
  records.push({width,violations:violations.length,cls:await page.evaluate(()=>(window as any).__powerCLS),image:await art.evaluate((img:HTMLImageElement)=>({src:img.currentSrc,width:img.naturalWidth,height:img.naturalHeight}))});
  if(width===375||width===1440){
   for(const img of await page.locator('main img').all()){await img.scrollIntoViewIfNeeded();await img.evaluate((img:HTMLImageElement)=>img.decode());}
   await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:`.tools/qa/phase5-3/${id}-profile-${width}.png`,fullPage:true});
   for(const route of ['/gear/','/blackout/']){
    await page.goto(route);const card=page.locator(`article.card[data-product-id="${id}"]`);await card.scrollIntoViewIfNeeded();await card.locator('img').evaluate((img:HTMLImageElement)=>img.decode());
    await expect(card).toHaveAttribute('data-universe','blackout');await expect(card.locator('img')).toHaveAttribute('loading','lazy');
    await expect(card.locator('[data-affiliate-click]')).toHaveAttribute('href',`https://www.amazon.ca/dp/${asin}?tag=apocalypsegear-20`);
    await card.screenshot({path:`.tools/qa/phase5-3/${id}-${route==='/gear/'?'catalogue':'blackout'}-card-${width}.png`,style:'header{visibility:hidden!important}'});
   }
   await expect(page.locator('#planning-checklist').locator('..').locator(`a[href="/gear/${id}/"]`)).toHaveCount(1);
  }
 }
 expect(errors).toEqual([]);writeFileSync(`.tools/qa/phase5-3/${id}-responsive.json`,JSON.stringify({id,records,errors},null,2)+'\n');
});

test('both power-station links fire exactly one affiliate event per mouse/keyboard action in all four placements',async({page,context})=>{
 test.setTimeout(90_000);await context.route('https://www.amazon.ca/**',route=>route.fulfill({body:'Isolated QA destination, not a live Amazon listing'}));
 const results:any[]=[];
 for(const [id,[asin]]of Object.entries(PHASE53)){
  const related=ids.find(other=>other!==id)!;
  for(const [path,placement]of [['/gear/','catalogue-card'],['/blackout/','collection-card'],[`/gear/${id}/`,'profile-summary'],[`/gear/${related}/`,'related-card']]){
   await page.goto(path!);const region=placement==='profile-summary'?page.locator('[data-product-purchase]'):page.locator(`article.card[data-product-id="${id}"]`);const link=region.locator('a[data-affiliate-click]');
   await expect(link).toHaveCount(1);await expect(link).toHaveAttribute('target','_blank');await expect(link).toHaveAttribute('rel','sponsored nofollow noopener');await expect(link).toHaveAttribute('data-cta-placement',placement!);
   await expect(region).toContainText('As an Amazon Associate I earn from qualifying purchases.');
   const url=`https://www.amazon.ca/dp/${asin}?tag=apocalypsegear-20`;
   for(const method of ['mouse','keyboard']){
    const before=await page.evaluate(()=>((window as any).dataLayer??[]).filter((r:any)=>r[1]==='affiliate_click').length);
    const popup=context.waitForEvent('page');if(method==='mouse')await link.click();else{await link.focus();await page.keyboard.press('Enter');}
    const opened=await popup;await expect(opened).toHaveURL(url);expect(await opened.evaluate(()=>window.opener)).toBe(null);await opened.close();
    const events=await page.evaluate(()=>((window as any).dataLayer??[]).filter((r:any)=>r[1]==='affiliate_click').map((r:any)=>r[2]));expect(events).toHaveLength(before+1);
    expect(events.at(-1)).toEqual({product_name:await link.getAttribute('data-product-name'),cta_placement:placement,product_id:id,asin,merchant:'amazon-ca',marketplace:'ca',destination_url:url,page_location:'http://127.0.0.1:4321'+path,send_to:'G-YFJJ5N9RBX',transport_type:'beacon'});
    results.push({id,asin,path,placement,method,eventsAdded:events.length-before,destination:url});
   }
  }
 }
 mkdirSync('.tools/qa/phase5-3',{recursive:true});writeFileSync('.tools/qa/phase5-3/affiliate-events.json',JSON.stringify({simulation:true,realConversions:false,results},null,2)+'\n');
});
