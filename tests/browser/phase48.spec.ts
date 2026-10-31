import {test,expect} from './fixtures';
import {mkdirSync} from 'node:fs';

const id='3m-2091-p100-particulate-filters';
const url='https://www.amazon.ca/dp/B001D1JCK4?tag=apocalypsegear-20';
const scope='section[aria-labelledby="compatible-3m-filters"]';

test('2091 documented-pair link works in all four placements on phone and desktop without duplicate tracking',async({page,context})=>{
  test.setTimeout(60_000);
  mkdirSync('.tools/qa/phase4-8',{recursive:true});
  await context.route('https://www.amazon.ca/**',route=>route.fulfill({body:'Isolated retailer simulation; no Amazon traffic'}));
  for(const width of [375,1440]){
    await page.setViewportSize({width,height:900});
    for(const path of ['/gear/','/outbreak/',`/gear/${id}/`,'/gear/3m-6800-full-facepiece-respirator/']){
      await page.goto(path);
      const isProfile=path===`/gear/${id}/`;
      const region=isProfile?page.locator('[data-product-purchase]'):page.locator(`${path.includes('6800')?scope+' ':''}article.card[data-product-id="${id}"]`);
      const link=region.locator('a[data-affiliate-click]');
      await expect(link).toHaveAttribute('href',url);
      await expect(link).toHaveAttribute('target','_blank');
      await expect(link).toHaveAttribute('rel','sponsored nofollow noopener');
      await expect(link).toHaveAccessibleName(/affiliate link, opens in a new tab/);
      await expect(region).toContainText('As an Amazon Associate I earn from qualifying purchases.');
      const openedPromise=context.waitForEvent('page');await link.click();const opened=await openedPromise;
      await expect(opened).toHaveURL(url);expect(await opened.evaluate(()=>window.opener)).toBe(null);await opened.close();
      const events=await page.evaluate(()=>((window as any).dataLayer??[]).filter((r:any)=>r[0]==='event'&&r[1]==='affiliate_click').map((r:any)=>Array.from(r)));
      expect(events).toEqual([['event','affiliate_click',{
        product_name:await link.getAttribute('data-product-name'),cta_placement:await link.getAttribute('data-cta-placement'),product_id:id,asin:'B001D1JCK4',merchant:'amazon-ca',marketplace:'ca',destination_url:url,
        page_location:'http://127.0.0.1:4321'+path,send_to:'G-YFJJ5N9RBX',transport_type:'beacon',
      }]]);
      expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
      if(isProfile){
        // Decode all lazy related artwork before taking a full-page QA image.
        for(const image of await page.locator('main img').all()){await image.scrollIntoViewIfNeeded();await image.evaluate((img:HTMLImageElement)=>img.decode());}
        await page.evaluate(()=>scrollTo(0,0));
        await page.screenshot({path:`.tools/qa/phase4-8/profile-2091-${width}.png`,fullPage:true});
      }else{
        const capture=path.includes('6800')?page.locator(scope):region;
        for(const image of await capture.locator('img').all()){await image.scrollIntoViewIfNeeded();await image.evaluate((img:HTMLImageElement)=>img.decode());}
        await capture.screenshot({path:`.tools/qa/phase4-8/${path.includes('6800')?'compatible':'card-'+path.split('/')[1]}-${width}.png`,style:'header{visibility:hidden!important}'});
      }
    }
  }
});

test('2091 retains informational SEO, product cautions and no permanent historical offer data',async({page})=>{
  await page.goto(`/gear/${id}/`);
  await expect(page.locator('h1')).toHaveText('3M 2091 P100 Particulate Filters');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href',`https://apocalypsegearlab.github.io/gear/${id}/`);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content','noindex, nofollow');
  const text=await page.locator('main').innerText();
  expect(text).toContain('one pair (two filters)');expect(text).toContain('not a gas/vapor cartridge');
  expect(text).toContain('supply no oxygen');expect(text).toContain('fit testing');
  expect(text).not.toMatch(/15[.,]75|ENmobile|FBA_51131070009|quantity remains unverified/);
  const structured=await page.locator('script[type="application/ld+json"]').allTextContents();
  expect(structured.join(' ')).not.toMatch(/"@type"\s*:\s*"(?:Product|Offer|AggregateRating)"/);
  await expect(page.locator('.product-artwork--detail figcaption')).toContainText('Concept illustration, not a product photograph.');
});
