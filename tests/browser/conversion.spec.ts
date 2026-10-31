import {test,expect} from './fixtures';
import AxeBuilder from '@axe-core/playwright';
import {readFileSync,readdirSync,mkdirSync} from 'node:fs';
import {getMerchantLinks} from '../../src/lib/affiliate';
import {isPubliclyVisible} from '../../src/lib/release-policy';
import type {Product} from '../../src/lib/products';

const products=readdirSync('src/data/products').filter(f=>f.endsWith('.json')).map(f=>({id:f.replace(/\.json$/,''),data:JSON.parse(readFileSync('src/data/products/'+f,'utf8'))} as Product)).filter(isPubliclyVisible);
const events=async(page:import('@playwright/test').Page)=>page.evaluate(()=>((window as any).dataLayer??[]).filter((r:any)=>r[0]==='event').map((r:any)=>Array.from(r)));

test('every current product keeps its decision, prominent canonical purchase control and accessible bottom references',async({page,context})=>{
 test.setTimeout(120_000);
 await context.route('https://www.amazon.ca/**',route=>route.fulfill({body:'Isolated Amazon destination'}));
 for(const p of products){
  await page.goto(`/gear/${p.id}/`);
  const own=page.locator('[data-product-purchase]'),sources=page.locator('[data-technical-sources]'),link=own.locator('a[data-affiliate-click]');
  const approved=getMerchantLinks(p)[0]!;
  await expect(own).toHaveCount(1);await expect(link).toHaveCount(approved.href?1:0);
  await expect(sources.getByRole('heading')).toHaveText('Technical Sources & References');
  await expect(sources.locator('a.btn,[data-affiliate-click]')).toHaveCount(0);
  expect(await sources.evaluate(e=>e===e.parentElement!.lastElementChild)).toBe(true);
  expect(await own.evaluate(e=>Boolean(e.compareDocumentPosition(document.querySelector('.product-artwork--detail')!)&Node.DOCUMENT_POSITION_FOLLOWING))).toBe(true);
  for(const source of p.data.sources)await expect(sources.locator(`[data-source-id="${source.id}"]`)).toHaveAttribute('href',source.url);
  await expect(page.locator('.spec-source a[href^="https:"]')).toHaveCount(0);
  if(!approved.href){await expect(own.locator('[aria-disabled=true]')).toHaveCount(1);continue;}
  await expect(link).toHaveAttribute('href',approved.href);await expect(link).toHaveAttribute('data-cta-placement','profile-summary');
  await expect(own).toContainText('As an Amazon Associate I earn from qualifying purchases.');
  const popup=context.waitForEvent('page');await link.click();const opened=await popup;
  await expect(opened).toHaveURL(approved.href);expect(await opened.evaluate(()=>window.opener)).toBe(null);await opened.close();
  await page.waitForTimeout(150);
  const queued=await events(page);expect(queued).toHaveLength(1);
  expect(queued[0]).toEqual(['event','affiliate_click',{product_id:p.id,product_name:p.data.name.slice(0,100),asin:p.data.links.amazonCa.asin,merchant:'amazon-ca',marketplace:'ca',destination_url:approved.href,cta_placement:'profile-summary',page_location:`http://127.0.0.1:4321/gear/${p.id}/`,send_to:'G-YFJJ5N9RBX',transport_type:'beacon'}]);
 }
});

test('documentary mouse and keyboard navigation emits one source event and no affiliate conversion',async({page,context})=>{
 test.setTimeout(60_000);
 const captured:unknown[][]=[];
 await context.exposeBinding('captureSourceEvent',(_source,args:unknown[])=>captured.push(args));
 await context.route(/^https:\/\//,route=>/googletagmanager|google-analytics/.test(new URL(route.request().url()).hostname)?route.abort():route.fulfill({body:'<!doctype html><title>Isolated documentary destination</title>'}));
 const cases=[
  ['morakniv-garberg-blackblade-carbon-survival-kit','manufacturer'],
  ['morakniv-garberg-blackblade-carbon-survival-kit','retailer'],
  ['morakniv-garberg-blackblade-carbon-survival-kit','official-safety'],
  ['kidde-c3010-co-alarm','official-recall'],
 ];
 for(const [id,kind]of cases)for(const method of ['mouse','keyboard']){
  await page.goto(`/gear/${id}/?private=not-for-analytics#sources`);
  const source=page.locator(`[data-technical-sources] a[data-source-kind="${kind}"]`).first();
  const href=(await source.getAttribute('href'))!,sourceId=await source.getAttribute('data-source-id');
  await expect(source).not.toHaveAttribute('data-affiliate-click');await expect(source).not.toHaveAttribute('target','_blank');
  captured.length=0;
  await page.evaluate(()=>{window.gtag=(...args:unknown[])=>{void (window as any).captureSourceEvent(args);};});
  if(method==='mouse')await source.click();else{await source.focus();await page.keyboard.press('Enter');}
  await expect(page).toHaveURL(href);await expect.poll(()=>captured.length).toBe(1);
  expect(captured[0]).toEqual(['event','source_reference_click',{product_id:id,source_id:sourceId,source_kind:kind,destination_url:new URL(href).origin+new URL(href).pathname,page_location:`http://127.0.0.1:4321/gear/${id}/`,send_to:'G-YFJJ5N9RBX',transport_type:'beacon'}]);
 }
});

test('all three HUD identities keep readable CTAs, safety notices and bottom references at six viewport widths',async({page})=>{
 test.setTimeout(120_000);mkdirSync('.tools/qa/phase5-2',{recursive:true});
 const examples=['fenix-cl26r-pro','readywise-84-servings-emergency-food-bucket','3m-6800-full-facepiece-respirator'];
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.addInitScript(()=>{(window as any).__conversionCLS=0;new PerformanceObserver(list=>{for(const entry of list.getEntries() as any[])if(!entry.hadRecentInput)(window as any).__conversionCLS+=entry.value;}).observe({type:'layout-shift',buffered:true});});
 for(const id of examples)for(const width of [320,375,768,1024,1440,1920]){
  await page.setViewportSize({width,height:900});await page.goto(`/gear/${id}/`);
  const own=page.locator('[data-product-purchase]'),cta=own.locator('a[data-affiliate-click]'),sources=page.locator('[data-technical-sources]');
  await cta.scrollIntoViewIfNeeded();await expect(cta).toBeVisible();
  const box=(await cta.boundingBox())!;expect(box.height).toBeGreaterThanOrEqual(44);expect(box.width).toBeGreaterThanOrEqual(44);
  await cta.focus();expect(await cta.evaluate(e=>parseFloat(getComputedStyle(e).outlineWidth))).toBeGreaterThanOrEqual(2);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content','noindex, nofollow');
  if(id==='3m-6800-full-facepiece-respirator'){
   await expect(page.locator('.product-caution')).toContainText('supplies no oxygen');
   expect(await page.locator('.product-caution').evaluate(e=>Boolean(e.compareDocumentPosition(document.querySelector('[data-product-purchase]')!)&Node.DOCUMENT_POSITION_FOLLOWING))).toBe(true);
  }
  expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations).toEqual([]);
  await page.locator('.product-artwork--detail img').evaluate((img:HTMLImageElement)=>img.decode());
  expect(await page.evaluate(()=>(window as any).__conversionCLS)).toBe(0);
  if(width===375||width===1440){
   await own.screenshot({path:`.tools/qa/phase5-2/${id}-cta-${width}.png`,style:'header{visibility:hidden!important}'});
   await sources.screenshot({path:`.tools/qa/phase5-2/${id}-sources-${width}.png`,style:'header{visibility:hidden!important}'});
   for(const img of await page.locator('main img').all()){await img.scrollIntoViewIfNeeded();await img.evaluate((img:HTMLImageElement)=>img.decode());}
   await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:`.tools/qa/phase5-2/${id}-profile-${width}.png`,fullPage:true});
  }
 }
 for(const width of [375,1440]){
  await page.setViewportSize({width,height:900});await page.goto('/gear/kidde-c3010-co-alarm/');
  await expect(page.locator('[data-product-purchase] a[data-affiliate-click]')).toHaveCount(0);
  await page.locator('[data-product-purchase]').screenshot({path:`.tools/qa/phase5-2/kidde-held-${width}.png`,style:'header{visibility:hidden!important}'});
 }
 expect(errors).toEqual([]);
});
