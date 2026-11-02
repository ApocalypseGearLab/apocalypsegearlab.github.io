import { test, expect, blockAnalytics } from './fixtures';
import AxeBuilder from '@axe-core/playwright';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

const manifest=JSON.parse(readFileSync('assets/brand/manifest.json','utf8'));
const screenshots='docs/qa/branding/screenshots';
const routes=['/','/gear/','/blackout/','/fallout/','/outbreak/','/how-we-research/','/gear/ecoflow-river-2-pro/','/404.html'];

for(const width of [320,375,768,1024,1440,1920]) test(`official header is crisp, stable and accessible at ${width}px`,async({page})=>{
  test.setTimeout(60_000);mkdirSync(screenshots,{recursive:true});
  await page.setViewportSize({width,height:900});
  await page.addInitScript(()=>{
    (window as any).__brandCLS=0;
    new PerformanceObserver(list=>{for(const entry of list.getEntries() as any[])if(!entry.hadRecentInput)(window as any).__brandCLS+=entry.value;}).observe({type:'layout-shift',buffered:true});
  });
  const mobile=width<1024;
  for(const route of routes){
    await page.goto(route);
    const image=page.locator('body > header .brand__emblem');await expect(image).toHaveCount(1);
    await image.evaluate((node:HTMLImageElement)=>node.decode());
    await expect(image).toHaveAttribute('alt','');await expect(image).toHaveAttribute('aria-hidden','true');
    const dimensions=await image.evaluate((node:HTMLImageElement)=>({width:node.clientWidth,height:node.clientHeight,naturalWidth:node.naturalWidth,currentSrc:node.currentSrc}));
    expect(dimensions.width).toBe(mobile?38:48);expect(dimensions.height).toBe(dimensions.width);
    expect(dimensions.naturalWidth).toBeGreaterThanOrEqual(dimensions.width);
    expect(dimensions.currentSrc).toMatch(/\/brand\/brand-logo-(64|128|256)\.webp$/);
    expect((await page.locator('.site-header').boundingBox())!.height).toBe(mobile?65:114);
    const brand=await page.locator('body > header .brand').boundingBox();
    if(mobile){const toggle=await page.getByRole('button',{name:'Menu',exact:true}).boundingBox();expect(brand!.x+brand!.width).toBeLessThanOrEqual(toggle!.x);}
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
  await page.goto('/');await page.locator('.brand__emblem').evaluate((node:HTMLImageElement)=>node.decode());
  await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
  expect(await page.evaluate(()=>(window as any).__brandCLS)).toBe(0);
  if(width===375||width===1440){
    await page.locator('.site-header').screenshot({path:`${screenshots}/header-after-${width}.png`});
    await page.screenshot({path:`${screenshots}/page-after-${width}.png`});
  }
  if(mobile)await page.getByRole('button',{name:'Menu',exact:true}).click();
  else await page.locator('.gear-trigger > a').hover();
  expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations).toEqual([]);
  if(width===375||width===1440)await page.screenshot({path:`${screenshots}/navigation-after-${width}.png`});
  writeFileSync(`docs/qa/branding/responsive-${width}.json`,JSON.stringify({width,routes,logoCSSPixels:mobile?38:48,headerHeight:mobile?65:114,cls:0,axeViolations:0,horizontalOverflow:false},null,2)+'\n');
});

test('official favicons, touch icon and Organization logo resolve with exact asset bytes and no schema duplicates',async({page,request})=>{
  for(const asset of manifest.assets.filter((asset:{url:string})=>asset.url)){
    const response=await request.get(asset.url);expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toMatch(asset.url.endsWith('.webp')?/image\/webp/:/image\/png/);
    expect(createHash('sha256').update(await response.body()).digest('hex')).toBe(asset.sha256);
  }
  await page.goto('/');
  await expect(page.locator('link[rel="icon"][sizes="32x32"]')).toHaveAttribute('href','/favicon-32.png');
  await expect(page.locator('link[rel="icon"][sizes="16x16"]')).toHaveAttribute('href','/favicon-16.png');
  await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveAttribute('href','/apple-touch-icon.png');
  const schemas=(await page.locator('script[type="application/ld+json"]').allTextContents()).map(text=>JSON.parse(text));
  expect(schemas.filter(schema=>schema['@type']==='Organization')).toHaveLength(1);
  expect(schemas.filter(schema=>schema['@type']==='WebSite')).toHaveLength(1);
  expect(schemas.find(schema=>schema['@type']==='Organization').logo).toBe('https://apocalypsegearlab.github.io/brand/brand-logo-512.webp');
  await expect(page.locator('meta[property="og:image"]')).toHaveCount(0);
  await page.goto('/gear/3m-2091-p100-particulate-filters/');
  await expect(page.locator('meta[property="og:image"]')).toHaveCount(0); // Preserve the existing absence of a fallback, including on profiles.
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content','noindex, nofollow');
});

test('brand link has one accessible name, visible keyboard focus and native no-JavaScript home navigation',async({browser,page})=>{
  await page.goto('/gear/');
  const brand=page.getByRole('link',{name:'ApocalypseGearLab home',exact:true});
  await page.keyboard.press('Tab');await page.keyboard.press('Tab');await expect(brand).toBeFocused();
  expect(await brand.evaluate(node=>getComputedStyle(node).outlineStyle)).toBe('solid');
  await page.keyboard.press('Enter');await expect(page).toHaveURL('http://127.0.0.1:4321/');
  const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:320,height:812}});
  try{const native=await context.newPage();await native.goto('http://127.0.0.1:4321/blackout/');await native.getByRole('link',{name:'ApocalypseGearLab home',exact:true}).click();await expect(native).toHaveURL('http://127.0.0.1:4321/');await expect(native.locator('.brand__emblem')).toBeVisible();}finally{await context.close();}
});

test('responsive emblem selects sufficient pixels on 2x and 3x displays without downloading the master',async({browser})=>{
  mkdirSync(screenshots,{recursive:true});
  for(const [width,density] of [[375,2],[375,3],[1440,2],[1440,3]] as const){
    const context=await browser.newContext({viewport:{width,height:900},deviceScaleFactor:density});
    try{
      await blockAnalytics(context);const page=await context.newPage();await page.goto('http://127.0.0.1:4321/');
      const image=page.locator('body > header .brand__emblem');await image.evaluate((node:HTMLImageElement)=>node.decode());
      const current=await image.evaluate((node:HTMLImageElement)=>({src:node.currentSrc,css:node.clientWidth}));
      const pixels=Number(current.src.match(/brand-logo-(\d+)\.webp$/)![1]);
      expect(pixels).toBeGreaterThanOrEqual(current.css*density);expect(pixels).toBeLessThanOrEqual(256);
      if(width===375&&density===2)await page.locator('.site-header').screenshot({path:`${screenshots}/header-after-375-2x.png`});
    }finally{await context.close();}
  }
});
