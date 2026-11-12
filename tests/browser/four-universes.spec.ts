import {test,expect} from './fixtures';
import AxeBuilder from '@axe-core/playwright';
import {mkdirSync,writeFileSync} from 'node:fs';
for(const id of ['blackout','fallout','outbreak','whiteout'])for(const width of [375,1440])test(`${id} cinematic hero and collection at ${width}px`,async({page})=>{
 await page.setViewportSize({width,height:900});
 await page.addInitScript(()=>{(window as any).sceneCLS=0;new PerformanceObserver(list=>{for(const entry of list.getEntries())if(!(entry as any).hadRecentInput)(window as any).sceneCLS+=(entry as any).value;}).observe({type:'layout-shift',buffered:true});});
 await page.goto(`/${id}/`);const hero=page.locator('.universe-hero img');await hero.evaluate((el:HTMLImageElement)=>el.decode());
 await expect(page.locator('h1')).toHaveText(new RegExp(id,'i'));await expect(hero).toHaveAttribute('fetchpriority','high');
 expect(await hero.evaluate((el:HTMLImageElement)=>el.currentSrc)).toMatch(new RegExp(`${id}-survival-hero-(768|1280|1600)\\.webp$`));
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations).toEqual([]);
 expect(await page.evaluate(()=>(window as any).sceneCLS)).toBeLessThan(.05);
 mkdirSync('docs/qa/four-universes/screenshots',{recursive:true});
 writeFileSync(`docs/qa/four-universes/${id}-${width}.json`,JSON.stringify({route:`/${id}/`,width,currentSrc:await hero.evaluate((el:HTMLImageElement)=>new URL(el.currentSrc).pathname),cls:await page.evaluate(()=>(window as any).sceneCLS),axeViolations:0},null,2)+'\n');
 await page.screenshot({path:`docs/qa/four-universes/screenshots/${id}-${width}.png`});
});
test('WHITEOUT category filters and documented product page retain the temperature restriction',async({page})=>{
 await page.goto('/gear/#category-winter-sleep-systems');
 const sleepLinks=page.locator('[data-catalogue-entry]:visible h3 a');
 expect(await sleepLinks.evaluateAll(links=>links.map(link=>link.getAttribute('href')).sort())).toEqual([
  '/gear/therm-a-rest-neoair-xtherm-nxt-review/', '/gear/therm-a-rest-polar-ranger-sleeping-bag/',
 ]);
 await sleepLinks.filter({hasText:'NeoAir XTherm NXT'}).click();await expect(page).toHaveURL(/therm-a-rest-neoair-xtherm-nxt-review/);
 await page.waitForLoadState('load');
 await expect(page.locator('a[href*="B0CS4P19QQ"]')).toHaveCount(0);await expect(page.locator('[data-product-purchase] [aria-disabled=true]')).toHaveCount(0);
 await expect(page.locator('[data-product-purchase] a[data-affiliate-click]')).toHaveAttribute('href','https://www.amazon.ca/dp/B0CS54SN91?tag=apocalypsegear-20');
 await expect(page.locator('[data-product-purchase] [data-purchase-destination=product-page]')).toContainText('Do not use below −20 °C');
 for(const width of [320,375,768,1024,1440,1920]){await page.setViewportSize({width,height:900});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);}
 expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations).toEqual([]);
 for(const width of [375,1440]){
  await page.setViewportSize({width,height:900});
  for(const image of await page.locator('main img').all()){
   await image.scrollIntoViewIfNeeded();
   await image.evaluate((el:HTMLImageElement)=>el.decode());
  }
  await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
  await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
  await page.screenshot({path:`docs/qa/four-universes/screenshots/thermarest-${width}.png`,fullPage:true});
 }
});
