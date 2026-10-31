import {test,expect} from './fixtures';
import AxeBuilder from '@axe-core/playwright';
import {mkdirSync} from 'node:fs';

const id='morakniv-garberg-blackblade-carbon-survival-kit';
const asin='B09214DLJ6';
const url=`https://www.amazon.ca/dp/${asin}?tag=apocalypsegear-20`;

test('Morakniv recorded link works in all four placements with one GA4 event per action and unchanged noindex',async({page,context})=>{
  test.setTimeout(90_000);
  mkdirSync('.tools/qa/morakniv-affiliate',{recursive:true});
  await context.route('https://www.amazon.ca/**',route=>route.fulfill({body:'Isolated Amazon destination; not a live listing verification'}));
  const placements=[
    {name:'catalogue',path:'/gear/',detail:false},
    {name:'outbreak',path:'/outbreak/',detail:false},
    {name:'profile',path:`/gear/${id}/`,detail:true},
    {name:'related-gerber',path:'/gear/gerber-strongarm-fixed-blade-knife/',detail:false},
    {name:'related-esee',path:'/gear/esee-4-fixed-blade-knife/',detail:false},
  ];
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
  for(const width of [375,1440])for(const placement of placements){
    await page.setViewportSize({width,height:900});await page.goto(placement.path);
    const region=placement.detail?page.locator('[data-product-purchase]'):page.locator(`article.card[data-product-id="${id}"]`);
    const link=region.locator('a[data-affiliate-click]');
    await expect(link).toHaveCount(1);await expect(link).toHaveAttribute('href',url);
    await expect(link).toHaveAttribute('rel','sponsored nofollow noopener');await expect(link).toHaveAttribute('target','_blank');
    await expect(link).toHaveAccessibleName(/affiliate link, opens in a new tab/);
    await expect(region).toContainText('As an Amazon Associate I earn from qualifying purchases.');
    await expect(region.locator('[data-amazon-pending]')).toHaveCount(0);
    if(placement.detail){
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content','noindex, nofollow');
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href',`https://apocalypsegearlab.github.io/gear/${id}/`);
      await expect(page.locator('main')).toContainText('The current listing, seller and package have not been independently verified.');
      await expect(page.locator('main')).not.toContainText('before its buying link can be enabled');
      const schemas=await page.locator('script[type="application/ld+json"]').allTextContents();
      expect(schemas.join(' ')).not.toMatch(/"@type":"(?:Product|Offer|AggregateRating)"/);
    }
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations).toEqual([]);
    for(const method of ['mouse','keyboard']){
      const count=await page.evaluate(()=>((window as any).dataLayer??[]).filter((r:any)=>r[1]==='affiliate_click').length);
      const popup=context.waitForEvent('page');
      if(method==='mouse')await link.click();else{await link.focus();await page.keyboard.press('Enter');}
      const opened=await popup;await expect(opened).toHaveURL(url);expect(await opened.evaluate(()=>window.opener)).toBe(null);await opened.close();
      // Allow delayed duplicate handlers to run as well as synchronous handlers.
      await page.waitForTimeout(250);
      const events=await page.evaluate(()=>((window as any).dataLayer??[]).filter((r:any)=>r[1]==='affiliate_click').map((r:any)=>r[2]));
      expect(events).toHaveLength(count+1);
      expect(events.at(-1)).toEqual({product_name:await link.getAttribute('data-product-name'),cta_placement:await link.getAttribute('data-cta-placement'),product_id:id,asin,merchant:'amazon-ca',marketplace:'ca',destination_url:url,page_location:'http://127.0.0.1:4321'+placement.path,send_to:'G-YFJJ5N9RBX',transport_type:'beacon'});
    }
    if(placement.detail){
      for(const img of await page.locator('main img').all()){await img.scrollIntoViewIfNeeded();await img.evaluate((img:HTMLImageElement)=>img.decode());}
      await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:`.tools/qa/morakniv-affiliate/${placement.name}-${width}.png`,fullPage:true});
    }else{
      await region.scrollIntoViewIfNeeded();await region.locator('img').evaluate((img:HTMLImageElement)=>img.decode());
      await region.screenshot({path:`.tools/qa/morakniv-affiliate/${placement.name}-${width}.png`,style:'header{visibility:hidden!important}'});
    }
  }
  expect(errors).toEqual([]);
});
