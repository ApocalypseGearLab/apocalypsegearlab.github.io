import {test,expect} from './fixtures';
import AxeBuilder from '@axe-core/playwright';
import {readFileSync,mkdirSync,writeFileSync} from 'node:fs';
import {BOUGERV} from '../bougerv-fixture';
const ids=Object.keys(BOUGERV);
const rows:any[]=[];
for(const [id,[asin]]of Object.entries(BOUGERV))test(`${id} is visible, Amazon-only, noindex and accessible at six widths with the correct artwork`,async({page,request})=>{
 test.setTimeout(90_000);mkdirSync('.tools/qa/bougerv',{recursive:true});
 const product=JSON.parse(readFileSync(`src/data/products/${id}.json`,'utf8'));
 const manifest=JSON.parse(readFileSync('src/data/media/imported-manifest.json','utf8')).assets.find((a:any)=>a.productId===id);
 for(const variant of manifest.variants){const response=await request.get(variant.src);expect(response.status()).toBe(200);expect((await response.body()).length).toBe(variant.bytes);}
 const response=await page.goto(`/gear/${id}/`);expect(response?.status()).toBe(200);
 await expect(page.locator('h1')).toHaveText(product.name);await expect(page.locator('meta[name=robots]')).toHaveAttribute('content','noindex, nofollow');
 await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href',`https://apocalypsegearlab.github.io/gear/${id}/`);
 await expect(page.locator('[data-technical-sources],[data-source-click],[data-source-citation],a[href^="#source-"]')).toHaveCount(0);
 const outbound=await page.locator('main a[href^="https://"]').evaluateAll(links=>links.map(a=>a.getAttribute('href')!));
 expect(outbound.length).toBeGreaterThan(0);for(const href of outbound){const url=new URL(href);expect(url.hostname).toBe('www.amazon.ca');expect(url.searchParams.get('tag')).toBe('apocalypsegear-20');}
 expect(await page.locator('main').innerText()).not.toMatch(/https?:\/\/|official website|Technical Sources & References/);
 expect((await page.locator('script[type="application/ld+json"]').allTextContents()).join('')).not.toMatch(/"@type"\s*:\s*"(?:Product|Offer|AggregateOffer)"/);
 const buy=page.locator('[data-product-purchase]'),link=buy.locator('a[data-affiliate-click]');
 await expect(link).toHaveAttribute('href',`https://www.amazon.ca/dp/${asin}?tag=apocalypsegear-20`);await expect(link).toHaveAttribute('target','_blank');await expect(link).toHaveAttribute('rel','sponsored nofollow noopener');
 await expect(buy).toContainText('As an Amazon Associate I earn from qualifying purchases.');
 await expect(page.locator('.verification-summary')).toContainText('Listing documented by owner');
 if(id===ids[0])await expect(page.locator('.table-wrap')).toContainText('68°F');else await expect(page.locator('.table-wrap')).toContainText('inclusion are not established');
 for(const width of [320,375,768,1024,1440,1920]){
  await page.setViewportSize({width,height:1000});const image=page.locator('.product-artwork--detail img');await image.scrollIntoViewIfNeeded();await image.evaluate((img:HTMLImageElement)=>img.decode());
  await expect(image).toHaveAttribute('src',manifest.deliverySrc);await expect(image).toHaveAttribute('srcset',manifest.variants.map((v:any)=>`${v.src} ${v.width}w`).join(', '));
  expect(await image.evaluate(img=>getComputedStyle(img).objectFit)).toBe('contain');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations).toEqual([]);rows.push({id,width,axeViolations:0});
  if(width===375||width===1440){await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:`.tools/qa/bougerv/${id}-profile-${width}.png`,fullPage:true});}
 }
 for(const route of ['/gear/','/blackout/'])for(const width of [375,1440]){
  await page.setViewportSize({width,height:1000});await page.goto(route);const card=page.locator(`article.card[data-product-id="${id}"]`);
  await expect(card.locator('a[data-affiliate-click]')).toHaveAttribute('href',product.links.amazonCa.url);await expect(card.locator('[data-listing-status]')).toHaveText('Listing documented by owner');
  const img=card.locator('img');await img.scrollIntoViewIfNeeded();await img.evaluate((img:HTMLImageElement)=>img.decode());
  await card.screenshot({path:`.tools/qa/bougerv/${id}-${route==='/gear/'?'catalogue':'blackout'}-${width}.png`,style:'header{visibility:hidden!important}'});
 }
 await page.goto('/blackout/');await expect(page.locator('#refrigeration-plan')).toHaveText('Portable refrigeration checklist');
 writeFileSync(`.tools/qa/bougerv/${id}-responsive.json`,JSON.stringify(rows.filter(row=>row.id===id),null,2)+'\n');
});

test('both BougeRV affiliate controls open safely with exactly one GA4 event per action in all four placements',async({page,context})=>{
 test.setTimeout(90_000);const requests:string[]=[];
 await context.route('https://www.amazon.ca/**',route=>{requests.push(route.request().url());return route.fulfill({body:'Isolated Amazon destination'});});
 for(const [id,[asin]]of Object.entries(BOUGERV))for(const method of ['mouse','keyboard']){
  const related=ids.find(value=>value!==id)!;
  const placements=[['/gear/','catalogue-card'],['/blackout/','collection-card'],[`/gear/${id}/`,'profile-summary'],[`/gear/${related}/`,'related-card']] as const;
  for(const [path,placement]of placements){
   await page.goto(path);const link=page.locator(`a[data-affiliate-click][data-product="${id}"][data-cta-placement="${placement}"]`);await expect(link).toHaveCount(1);
   const popup=context.waitForEvent('page');if(method==='mouse')await link.click();else{await link.focus();await page.keyboard.press('Enter');}
   const opened=await popup;await expect(opened).toHaveURL(`https://www.amazon.ca/dp/${asin}?tag=apocalypsegear-20`);expect(await opened.evaluate(()=>window.opener)).toBe(null);await opened.close();
   const events=()=>page.evaluate(()=>((window as any).dataLayer??[]).filter((row:any)=>row[0]==='event').map((row:any)=>Array.from(row)));
   await expect.poll(async()=> (await events()).length).toBe(1);const event=(await events())[0];expect(event[1]).toBe('affiliate_click');expect((event[2]as any).asin).toBe(asin);expect((event[2]as any).cta_placement).toBe(placement);
  }
 }
 expect(requests).toHaveLength(16);
});
