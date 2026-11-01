import {test,expect} from './fixtures';
import AxeBuilder from '@axe-core/playwright';
import {readFileSync,mkdirSync,writeFileSync} from 'node:fs';
import {PHASE55} from '../phase55-fixture';
for(const [id,[asin]]of Object.entries(PHASE55))test(`${id} is visible, responsive, accessible and accurately captioned at six widths`,async({page,request})=>{
 test.setTimeout(120_000);mkdirSync('.tools/qa/phase5-5',{recursive:true});const rows:any[]=[];
 const p=JSON.parse(readFileSync(`src/data/products/${id}.json`,'utf8')),asset=JSON.parse(readFileSync('src/data/media/imported-manifest.json','utf8')).assets.find((a:any)=>a.productId===id);
 for(const v of asset.variants){const r=await request.get(v.src);expect(r.status()).toBe(200);expect((await r.body()).length).toBe(v.bytes);}
 const response=await page.goto(`/gear/${id}/`);expect(response?.status()).toBe(200);await expect(page.locator('h1')).toHaveText(p.name);
 await expect(page.locator('meta[name=robots]')).toHaveAttribute('content','noindex, nofollow');await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href',`https://apocalypsegearlab.github.io/gear/${id}/`);
 await expect(page.locator('[data-technical-sources],[data-source-click],[data-source-citation]')).toHaveCount(0);
 if(p.specsStatus==='owner-reported'){await expect(page.locator('h2').filter({hasText:'Owner-reported features'})).toHaveCount(1);await expect(page.locator('.verification-summary')).toContainText('Documentation incomplete');}
 const detail=page.locator('.product-artwork--detail');await expect(detail.locator('[data-artwork-caveat]')).toHaveText(asset.captionNote);
 if(id.includes('panasonic'))await expect(detail).toContainText('four');if(id.includes('-aaa-'))await expect(detail).toContainText('850 mAh artwork label is unverified');
 const buy=page.locator('[data-product-purchase]');await expect(buy.locator('a[data-affiliate-click]')).toHaveAttribute('href',`https://www.amazon.ca/dp/${asin}?tag=apocalypsegear-20`);await expect(buy).toContainText('As an Amazon Associate I earn from qualifying purchases.');
 for(const width of [320,375,768,1024,1440,1920]){
  await page.setViewportSize({width,height:1000});const img=detail.locator('img');await img.scrollIntoViewIfNeeded();await img.evaluate((img:HTMLImageElement)=>img.decode());
  await expect(img).toHaveAttribute('src',asset.deliverySrc);await expect(img).toHaveAttribute('srcset',asset.variants.map((v:any)=>`${v.src} ${v.width}w`).join(', '));expect(await img.evaluate(img=>getComputedStyle(img).objectFit)).toBe('contain');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);const box=await img.boundingBox();expect(Math.abs(box!.width-box!.height)).toBeLessThan(1);
  expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations).toEqual([]);rows.push({id,width,axeViolations:0,overflow:false,squareImage:true});
  if(width===375||width===1440){await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:`.tools/qa/phase5-5/${id}-profile-${width}.png`,fullPage:true});}
 }
 for(const route of ['/gear/','/blackout/'])for(const width of [375,1440]){
  await page.setViewportSize({width,height:1000});await page.goto(route);const card=page.locator(`article.card[data-product-id="${id}"]`);await expect(card).toHaveCount(1);await expect(card.locator('a[data-affiliate-click]')).toHaveAttribute('href',p.links.amazonCa.url);await expect(card.locator('[data-artwork-caveat]')).toHaveText(asset.captionNote);
  const img=card.locator('img');await img.scrollIntoViewIfNeeded();await img.evaluate((img:HTMLImageElement)=>img.decode());await card.screenshot({path:`.tools/qa/phase5-5/${id}-${route==='/gear/'?'catalogue':'blackout'}-${width}.png`,style:'header{visibility:hidden!important}'});
 }
 await page.goto('/blackout/');await expect(page.locator('#battery-plan')).toHaveText('Battery and charger compatibility');
 if(p.specsStatus==='owner-reported'){await page.goto(`/gear/${id}/`);for(const related of p.relatedProducts)await expect(page.locator(`article.card[data-product-id="${related}"]`)).toHaveCount(1);}
 writeFileSync(`.tools/qa/phase5-5/${id}-responsive.json`,JSON.stringify(rows,null,2)+'\n');
});

test('Phase 5.5 Amazon CTAs open safely and emit exactly one affiliate_click per mouse or keyboard action in every applicable placement',async({page,context})=>{
 test.setTimeout(120_000);const requests:string[]=[];await context.route('https://www.amazon.ca/**',route=>{requests.push(route.request().url());return route.fulfill({body:'Isolated destination'});});
 for(const [id,[asin]]of Object.entries(PHASE55)){
  const p=JSON.parse(readFileSync(`src/data/products/${id}.json`,'utf8'));
  const places:[string,string][]=[['/gear/','catalogue-card'],['/blackout/','collection-card'],[`/gear/${id}/`,'profile-summary']];
  // AA and AAA reference each other. No existing product is changed solely to
  // manufacture a fourth placement for ORIA.
  if(id.includes('panasonic'))places.push([`/gear/${p.relatedProducts[0]}/`,'related-card']);
  for(const [route,placement]of places)for(const method of ['mouse','keyboard']){
   await page.goto(route);const link=page.locator(`a[data-affiliate-click][data-product="${id}"][data-cta-placement="${placement}"]`);await expect(link).toHaveCount(1);await expect(link).toHaveAttribute('target','_blank');await expect(link).toHaveAttribute('rel','sponsored nofollow noopener');
   const popup=context.waitForEvent('page');if(method==='mouse')await link.click();else{await link.focus();expect(await link.evaluate(e=>getComputedStyle(e).outlineStyle)).not.toBe('none');await page.keyboard.press('Enter');}
   const opened=await popup;await expect(opened).toHaveURL(`https://www.amazon.ca/dp/${asin}?tag=apocalypsegear-20`);expect(await opened.evaluate(()=>window.opener)).toBe(null);await opened.close();
   const events=()=>page.evaluate(()=>((window as any).dataLayer??[]).filter((r:any)=>r[0]==='event').map((r:any)=>Array.from(r)));
   await expect.poll(async()=>(await events()).length).toBe(1);const event=(await events())[0];expect(event[1]).toBe('affiliate_click');expect((event[2]as any).asin).toBe(asin);expect((event[2]as any).cta_placement).toBe(placement);
  }
 }
 expect(requests).toHaveLength(22);
});
