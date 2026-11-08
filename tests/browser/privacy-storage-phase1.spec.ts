import {test,expect} from './fixtures';

const key='agl-analytics-consent';
type Restriction='throw'|'silent'|'unavailable';
// Runs both in the current document and before site code on reload/navigation.
function restrictStorage(mode:Restriction) {
 if(mode==='unavailable') {
  for(const name of ['localStorage','sessionStorage'])Object.defineProperty(window,name,{configurable:true,get(){throw new Error('Storage unavailable');}});
  return;
 }
 const persistent=window.localStorage;
 Object.defineProperty(window,'localStorage',{configurable:true,value:{
  getItem:(name:string)=>persistent.getItem(name),
  setItem:()=>{if(mode==='throw')throw new Error('Read-only storage');},
  removeItem:()=>{if(mode==='throw')throw new Error('Read-only storage');},
 }});
 Object.defineProperty(window,'sessionStorage',{configurable:true,get(){throw new Error('Session storage unavailable');}});
}
const choose=async(page:any,value:'granted'|'denied')=>{
 await page.locator('[data-analytics-consent]').evaluate((panel:HTMLDetailsElement)=>panel.open=true);
 await page.locator('[data-analytics-choice="'+value+'"]').click();
};
const commands=(page:any)=>page.evaluate(()=>((window as any).dataLayer??[]).map((row:any)=>Array.from(row)));
const ready=async(page:any)=>expect(page.locator('[data-analytics-choice="granted"]')).toBeEnabled();
const off=async(page:any)=>{
 await ready(page);
 await expect(page.locator('[data-analytics-loader]')).toHaveCount(0);
 expect(await commands(page)).toEqual([]);
 expect(await page.evaluate(()=>(window as any)['ga-disable-G-YFJJ5N9RBX'])).toBe(true);
};

for(const language of ['en','fr'] as const) {
 const prefix=language==='fr'?'/fr':'';
 for(const mode of ['throw','silent'] as const)for(const timing of ['before-load','after-grant'] as const) {
  test(language+': withdrawal stays off with '+mode+' read-only local storage, no session storage, restricted '+timing,async({page,context},testInfo)=>{
   const google:string[]=[];
   page.on('request',request=>{if(/google|doubleclick/.test(new URL(request.url()).hostname))google.push(request.url());});
   await context.route('https://www.amazon.ca/**',route=>route.fulfill({body:'Isolated retailer'}));
   if(timing==='before-load') {
    // Seed exactly once: subsequent reloads retain the same stale, readable grant.
    await page.addInitScript({content: "if(!localStorage.getItem('agl-analytics-consent'))localStorage.setItem('agl-analytics-consent',JSON.stringify({version:1,choice:'granted',updatedAt:Date.now()}));\n("+restrictStorage.toString()+") ("+JSON.stringify(mode)+");"});
   }
   await page.goto(prefix+'/privacy/');await ready(page);
   if(timing==='before-load') {
    await off(page);expect(google).toEqual([]);
    await choose(page,'denied');await off(page);
    await page.reload();await off(page);expect(google).toEqual([]);
   }
   await choose(page,'granted');
   await expect(page.locator('[data-analytics-loader]')).toHaveCount(1);
   expect((await commands(page)).filter((row:any)=>row[0]==='config')).toHaveLength(1);
   if(timing==='after-grant') {
    await page.addInitScript(restrictStorage,mode);
    await page.evaluate(restrictStorage,mode);
   }
   await page.evaluate(()=>{document.cookie='_ga=synthetic;path=/';document.cookie='_ga_YFJJ5N9RBX=synthetic;path=/';});
   google.length=0;
   await Promise.all([page.waitForEvent('load'),choose(page,'denied')]);
   await off(page);expect(google).toEqual([]);
   expect((await context.cookies()).filter(cookie=>/^_ga/.test(cookie.name))).toEqual([]);
   expect(await page.evaluate(key=>JSON.parse(localStorage.getItem(key)!).choice,key)).toBe('granted');
   // An explicit reload and subsequent first-party navigation must not revive that grant.
   await page.reload();await off(page);expect(google).toEqual([]);
   await page.goto(prefix+'/gear/midland-er310/');await off(page);
   const purchase=page.locator('[data-product-purchase] a[data-affiliate-click]');
   const popupPromise=context.waitForEvent('page');await purchase.click();const popup=await popupPromise;
   await expect(popup).toHaveURL('https://www.amazon.ca/dp/B015QIC1PW?tag=apocalypsegear-20');
   expect(await popup.evaluate(()=>window.opener===null)).toBe(true);await popup.close();
   await page.locator('footer a[href="'+prefix+'/privacy/"]').first().click();
   await expect(page).toHaveURL(new RegExp(prefix+'/privacy/$'));await off(page);expect(google).toEqual([]);
   await testInfo.attach('restricted-storage-result',{body:JSON.stringify({language,mode,timing,staleGrantReadable:true,requestsAfterWithdrawal:google.length,nativeAffiliateAndNavigation:true}),contentType:'application/json'});
  });
 }
 test(language+': wholly unavailable storage permits only a current explicit grant and survives withdrawal/reload',async({page})=>{
  await page.addInitScript(restrictStorage,'unavailable' as Restriction);await page.goto(prefix+'/privacy/');await off(page);
  await choose(page,'denied');await off(page);await page.reload();await off(page);
  await choose(page,'granted');await expect(page.locator('[data-analytics-loader]')).toHaveCount(1);
  await Promise.all([page.waitForEvent('load'),choose(page,'denied')]);await off(page);
  await page.reload();await off(page);await page.goto(prefix+'/gear/');await off(page);
 });
 test(language+': session denial overrides an older read-only persistent grant',async({page})=>{
  await page.goto(prefix+'/privacy/');await ready(page);await choose(page,'granted');
  const persistentOnly=()=>{
   const persistent=window.localStorage;
   Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem:(name:string)=>persistent.getItem(name),setItem:()=>{throw new Error('Read-only');},removeItem:()=>{throw new Error('Read-only');}}});
  };
  await page.addInitScript(persistentOnly);await page.evaluate(persistentOnly);
  await Promise.all([page.waitForEvent('load'),choose(page,'denied')]);await off(page);
  expect(await page.evaluate(key=>JSON.parse(sessionStorage.getItem(key)!).choice,key)).toBe('denied');
  await page.reload();await off(page);await page.goto(prefix+'/gear/');await off(page);
 });
}
