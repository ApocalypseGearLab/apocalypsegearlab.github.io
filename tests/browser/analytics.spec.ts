import {test, expect} from './fixtures';
import {readFileSync} from 'node:fs';

const commands = async (page: import('@playwright/test').Page) => page.evaluate(() =>
  ((window as unknown as {dataLayer: unknown[][]}).dataLayer ?? []).map(entry => Array.from(entry)));

test('one Google loader, one config and preserved verification on document navigation', async ({page}) => {
  for (const path of ['/', '/gear/', '/gear/midland-er310/', '/gear/fenix-cl26r-pro/']) {
    await page.goto(path);
    await expect(page.locator('script[src*="googletagmanager.com/gtag/js"]')).toHaveCount(1);
    await expect(page.locator('meta[name="google-site-verification"]')).toHaveAttribute('content','L1PfzJJwmxprbyNPTX3LpNLl86Ic-ivCj_JlSzI0Iwk');
    const config = (await commands(page)).filter(row => row[0] === 'config');
    expect(config).toHaveLength(1);
    expect(config[0]![1]).toBe('G-YFJJ5N9RBX');
    expect((await commands(page)).filter(row => row[1] === 'page_view')).toHaveLength(0); // automatic only
  }
});

test('active affiliate mouse and keyboard clicks each queue one event and keep native new tabs', async ({page,context}) => {
  await context.route('https://www.amazon.ca/**',route=>route.fulfill({status:200,contentType:'text/html',body:'<title>Isolated retailer</title>'}));
  await page.goto('/gear/midland-er310/');
  const link=page.locator('[data-product-purchase] a[data-affiliate-click]');
  await expect(link).toBeVisible(); // bundled handler must have loaded
  for (const method of ['mouse','keyboard'] as const) {
    const popup=context.waitForEvent('page');
    if(method==='mouse') await link.click();
    else { await link.focus(); await page.keyboard.press('Enter'); }
    const opened=await popup;
    await expect(opened).toHaveURL('https://www.amazon.ca/dp/B015QIC1PW?tag=apocalypsegear-20');
    expect(await opened.evaluate(()=>window.opener)).toBe(null);
    await opened.close();
  }
  const events=(await commands(page)).filter(row=>row[0]==='event');
  expect(events).toHaveLength(2);
  for(const row of events) expect(row).toEqual(['event','affiliate_click',{
    product_name:'Midland ER310 emergency radio',cta_placement:'profile-summary',product_id:'midland-er310',asin:'B015QIC1PW',merchant:'amazon-ca',marketplace:'ca',
    destination_url:'https://www.amazon.ca/dp/B015QIC1PW?tag=apocalypsegear-20',
    page_location:'http://127.0.0.1:4321/gear/midland-er310/',send_to:'G-YFJJ5N9RBX',transport_type:'beacon',
  }]);
});

test('blocked and prevented clicks emit nothing; Analytics exceptions cannot break navigation', async ({page,context}) => {
  await page.goto('/gear/kidde-c3010-co-alarm/');
  // Playwright correctly refuses normal interaction with an aria-disabled control.
  await page.locator('[data-product-purchase] [aria-disabled=true]').click({force:true});
  expect((await commands(page)).filter(row=>row[0]==='event')).toHaveLength(0);
  await page.goto('/gear/midland-er310/');
  const link=page.locator('[data-product-purchase] a[data-affiliate-click]');
  await link.evaluate(el=>{el.addEventListener('click',e=>e.preventDefault(),{once:true});});
  await link.click();
  expect((await commands(page)).filter(row=>row[0]==='event')).toHaveLength(0);
  await page.evaluate(()=>{window.gtag=()=>{throw new Error('Simulated blocked analytics');};});
  await context.route('https://www.amazon.ca/**',route=>route.fulfill({body:'Retailer simulation'}));
  const popup=context.waitForEvent('page');
  await link.click();
  const opened=await popup;
  await expect(opened).toHaveURL(/amazon\.ca\/dp\/B015QIC1PW\?tag=apocalypsegear-20/);
  await opened.close();
});

test('XML parses strictly, has unique absolute locations and excludes noindex pages', async ({page,request}) => {
  await page.goto('/');
  const parse=async(path:string,root:string)=>{
    const response=await request.get(path);
    expect(response.status()).toBe(200);
    const text=await response.text();
    return page.evaluate(({text,root})=>{
      const doc=new DOMParser().parseFromString(text,'application/xml');
      if(doc.querySelector('parsererror') || doc.documentElement.localName!==root
        || doc.documentElement.namespaceURI!=='http://www.sitemaps.org/schemas/sitemap/0.9') throw new Error('Invalid sitemap XML');
      return [...doc.querySelectorAll('loc')].map(e=>e.textContent!);
    },{text,root});
  };
  expect(await parse('/sitemap-index.xml','sitemapindex')).toEqual(['https://apocalypsegearlab.github.io/sitemap-0.xml']);
  expect(await parse('/sitemap.xml','sitemapindex')).toEqual(['https://apocalypsegearlab.github.io/sitemap-0.xml']);
  const urls=await parse('/sitemap-0.xml','urlset');
  expect(new Set(urls).size).toBe(urls.length);
  expect(urls).toHaveLength(5);
  for(const url of urls){
    const location=new URL(url);
    expect(location.origin).toBe('https://apocalypsegearlab.github.io');
    expect(location.hash+location.search).toBe('');
    const response=await request.get(location.pathname,{maxRedirects:0});
    expect(response.status()).toBe(200);
    expect(await response.text()).not.toMatch(/name="robots" content="[^"]*noindex/);
  }
  expect(readFileSync('dist/sitemap.xml','utf8')).toBe(readFileSync('dist/sitemap-index.xml','utf8'));
});
