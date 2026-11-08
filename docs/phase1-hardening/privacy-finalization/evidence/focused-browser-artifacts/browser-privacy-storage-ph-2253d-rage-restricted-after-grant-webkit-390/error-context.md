# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: browser\privacy-storage-phase1.spec.ts >> en: withdrawal stays off with silent read-only local storage, no session storage, restricted after-grant
- Location: .tools\privacy-finalization\tests\browser\privacy-storage-phase1.spec.ts:35:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('[data-analytics-choice="granted"]')
    - locator resolved to <button class="btn" type="button" aria-pressed="false" data-astro-cid-fg2vtww3="" data-analytics-choice="granted">Allow analytics</button>
  - attempting click action
    - waiting for element to be visible, enabled and stable

```

# Test source

```ts
  1  | import {test,expect} from './fixtures';
  2  | 
  3  | const key='agl-analytics-consent';
  4  | type Restriction='throw'|'silent'|'unavailable';
  5  | // Runs both in the current document and before site code on reload/navigation.
  6  | function restrictStorage(mode:Restriction) {
  7  |  if(mode==='unavailable') {
  8  |   for(const name of ['localStorage','sessionStorage'])Object.defineProperty(window,name,{configurable:true,get(){throw new Error('Storage unavailable');}});
  9  |   return;
  10 |  }
  11 |  const persistent=window.localStorage;
  12 |  Object.defineProperty(window,'localStorage',{configurable:true,value:{
  13 |   getItem:(name:string)=>persistent.getItem(name),
  14 |   setItem:()=>{if(mode==='throw')throw new Error('Read-only storage');},
  15 |   removeItem:()=>{if(mode==='throw')throw new Error('Read-only storage');},
  16 |  }});
  17 |  Object.defineProperty(window,'sessionStorage',{configurable:true,get(){throw new Error('Session storage unavailable');}});
  18 | }
  19 | const choose=async(page:any,value:'granted'|'denied')=>{
  20 |  await page.locator('[data-analytics-consent]').evaluate((panel:HTMLDetailsElement)=>panel.open=true);
> 21 |  await page.locator('[data-analytics-choice="'+value+'"]').click();
     |                                                            ^ Error: locator.click: Test timeout of 30000ms exceeded.
  22 | };
  23 | const commands=(page:any)=>page.evaluate(()=>((window as any).dataLayer??[]).map((row:any)=>Array.from(row)));
  24 | const ready=async(page:any)=>expect(page.locator('[data-analytics-choice="granted"]')).toBeEnabled();
  25 | const off=async(page:any)=>{
  26 |  await ready(page);
  27 |  await expect(page.locator('[data-analytics-loader]')).toHaveCount(0);
  28 |  expect(await commands(page)).toEqual([]);
  29 |  expect(await page.evaluate(()=>(window as any)['ga-disable-G-YFJJ5N9RBX'])).toBe(true);
  30 | };
  31 | 
  32 | for(const language of ['en','fr'] as const) {
  33 |  const prefix=language==='fr'?'/fr':'';
  34 |  for(const mode of ['throw','silent'] as const)for(const timing of ['before-load','after-grant'] as const) {
  35 |   test(language+': withdrawal stays off with '+mode+' read-only local storage, no session storage, restricted '+timing,async({page,context},testInfo)=>{
  36 |    const google:string[]=[];
  37 |    page.on('request',request=>{if(/google|doubleclick/.test(new URL(request.url()).hostname))google.push(request.url());});
  38 |    await context.route('https://www.amazon.ca/**',route=>route.fulfill({body:'Isolated retailer'}));
  39 |    if(timing==='before-load') {
  40 |     // Seed exactly once: subsequent reloads retain the same stale, readable grant.
  41 |     await page.addInitScript({content: "if(!localStorage.getItem('agl-analytics-consent'))localStorage.setItem('agl-analytics-consent',JSON.stringify({version:1,choice:'granted',updatedAt:Date.now()}));\n("+restrictStorage.toString()+") ("+JSON.stringify(mode)+");"});
  42 |    }
  43 |    await page.goto(prefix+'/privacy/');await ready(page);
  44 |    if(timing==='before-load') {
  45 |     await off(page);expect(google).toEqual([]);
  46 |     await choose(page,'denied');await off(page);
  47 |     await page.reload();await off(page);expect(google).toEqual([]);
  48 |    }
  49 |    await choose(page,'granted');
  50 |    await expect(page.locator('[data-analytics-loader]')).toHaveCount(1);
  51 |    expect((await commands(page)).filter((row:any)=>row[0]==='config')).toHaveLength(1);
  52 |    if(timing==='after-grant') {
  53 |     await page.addInitScript(restrictStorage,mode);
  54 |     await page.evaluate(restrictStorage,mode);
  55 |    }
  56 |    await page.evaluate(()=>{document.cookie='_ga=synthetic;path=/';document.cookie='_ga_YFJJ5N9RBX=synthetic;path=/';});
  57 |    google.length=0;
  58 |    await Promise.all([page.waitForEvent('load'),choose(page,'denied')]);
  59 |    await off(page);expect(google).toEqual([]);
  60 |    expect((await context.cookies()).filter(cookie=>/^_ga/.test(cookie.name))).toEqual([]);
  61 |    expect(await page.evaluate(key=>JSON.parse(localStorage.getItem(key)!).choice,key)).toBe('granted');
  62 |    // An explicit reload and subsequent first-party navigation must not revive that grant.
  63 |    await page.reload();await off(page);expect(google).toEqual([]);
  64 |    await page.goto(prefix+'/gear/midland-er310/');await off(page);
  65 |    const purchase=page.locator('[data-product-purchase] a[data-affiliate-click]');
  66 |    const popupPromise=context.waitForEvent('page');await purchase.click();const popup=await popupPromise;
  67 |    await expect(popup).toHaveURL('https://www.amazon.ca/dp/B015QIC1PW?tag=apocalypsegear-20');
  68 |    expect(await popup.evaluate(()=>window.opener===null)).toBe(true);await popup.close();
  69 |    await page.locator('footer a[href="'+prefix+'/privacy/"]').first().click();
  70 |    await expect(page).toHaveURL(new RegExp(prefix+'/privacy/$'));await off(page);expect(google).toEqual([]);
  71 |    await testInfo.attach('restricted-storage-result',{body:JSON.stringify({language,mode,timing,staleGrantReadable:true,requestsAfterWithdrawal:google.length,nativeAffiliateAndNavigation:true}),contentType:'application/json'});
  72 |   });
  73 |  }
  74 |  test(language+': wholly unavailable storage permits only a current explicit grant and survives withdrawal/reload',async({page})=>{
  75 |   await page.addInitScript(restrictStorage,'unavailable' as Restriction);await page.goto(prefix+'/privacy/');await off(page);
  76 |   await choose(page,'denied');await off(page);await page.reload();await off(page);
  77 |   await choose(page,'granted');await expect(page.locator('[data-analytics-loader]')).toHaveCount(1);
  78 |   await Promise.all([page.waitForEvent('load'),choose(page,'denied')]);await off(page);
  79 |   await page.reload();await off(page);await page.goto(prefix+'/gear/');await off(page);
  80 |  });
  81 |  test(language+': session denial overrides an older read-only persistent grant',async({page})=>{
  82 |   await page.goto(prefix+'/privacy/');await ready(page);await choose(page,'granted');
  83 |   const persistentOnly=()=>{
  84 |    const persistent=window.localStorage;
  85 |    Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem:(name:string)=>persistent.getItem(name),setItem:()=>{throw new Error('Read-only');},removeItem:()=>{throw new Error('Read-only');}}});
  86 |   };
  87 |   await page.addInitScript(persistentOnly);await page.evaluate(persistentOnly);
  88 |   await Promise.all([page.waitForEvent('load'),choose(page,'denied')]);await off(page);
  89 |   expect(await page.evaluate(key=>JSON.parse(sessionStorage.getItem(key)!).choice,key)).toBe('denied');
  90 |   await page.reload();await off(page);await page.goto(prefix+'/gear/');await off(page);
  91 |  });
  92 | }
  93 | 
```