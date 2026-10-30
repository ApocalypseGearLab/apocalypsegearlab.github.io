// Read-only public HTTP audit; --live deliberately sends a small debug QA visit
// to the owner's GA4 stream. Never include this live option in regression CI.
import assert from 'node:assert/strict';
import {mkdirSync,writeFileSync,readFileSync,existsSync} from 'node:fs';
import {resolve,sep,extname,dirname} from 'node:path';
import {load} from 'cheerio';
import {chromium} from '@playwright/test';

const arg=(name,fallback)=>process.argv.find(value=>value.startsWith(name+'='))?.slice(name.length+1)??fallback;
const base=arg('--base','https://apocalypsegearlab.github.io').replace(/\/$/,'');
const output=arg('--out','.tools/qa/google-audit.json');
const live=process.argv.includes('--live');
const smoke=process.argv.includes('--affiliate-smoke');
const renderDist=process.argv.includes('--render-dist');
assert.ok(!smoke||live,'Affiliate network smoke requires explicit --live');
const paths=['/','/gear/','/blackout/','/fallout/','/outbreak/','/sitemap.xml','/sitemap-index.xml','/sitemap-0.xml','/robots.txt'];
const resources=await Promise.all(paths.map(async path=>{
  try {
    const response=await fetch(base+path,{signal:AbortSignal.timeout(30000)});
    const bytes=new Uint8Array(await response.arrayBuffer());
    const body=new TextDecoder('utf-8',{fatal:true}).decode(bytes);
    const $=load(body,{xmlMode:path.endsWith('.xml')});
    return {path,status:response.status,redirected:response.redirected,url:response.url,
      contentType:response.headers.get('content-type'),xRobotsTag:response.headers.get('x-robots-tag'),
      csp:response.headers.get('content-security-policy'),utf8:true,bytes:bytes.length,
      canonical:$('link[rel=canonical]').attr('href'),robots:$('meta[name=robots]').attr('content'),
      verification:$('meta[name=google-site-verification]').attr('content'),
      gaLoaders:$('script[src*="googletagmanager.com/gtag/js"]').length,
      locs:$('loc').map((_,e)=>$(e).text()).get(),...(path==='/robots.txt'?{body}:{})};
  }catch(error){return{path,error:error.message};}
}));
const browser=await chromium.launch();
const context=await browser.newContext();
if(renderDist){
  const root=resolve('dist');
  // Test the candidate production HTML at the real first-party origin without
  // publishing it. Only this owned site is intercepted; Google stays unmocked.
  await context.route(base+'/**',async route=>{
    const path=decodeURIComponent(new URL(route.request().url()).pathname);
    const file=resolve(root,'.'+path,path.endsWith('/')?'index.html':'');
    if(!file.startsWith(root+sep)||!existsSync(file))return route.fulfill({status:404,body:'Missing local build asset'});
    const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.webp':'image/webp','.svg':'image/svg+xml','.xml':'application/xml','.txt':'text/plain; charset=utf-8'};
    await route.fulfill({status:200,contentType:types[extname(file)]??'application/octet-stream',body:readFileSync(file)});
  });
}
if(!live) await context.route(/^https:\/\/([^/]+\.)?(google-analytics\.com|googletagmanager\.com)\//,route=>route.abort());
if(live) await context.addInitScript(()=>{
  window.dataLayer=[];
  window.gtag=function(){
    // Scoped to this QA browser. No debug flag is shipped to real visitors.
    if(arguments[0]==='config') arguments[2]={...arguments[2],debug_mode:true};
    // gtag's command queue uses Arguments objects, not GTM-style arrays.
    window.dataLayer.push(arguments);
  };
});
// Retailer is always locally simulated, including during live Google checks.
await context.route('https://www.amazon.ca/**',route=>route.fulfill({status:200,contentType:'text/html',body:'<!doctype html><title>Isolated retailer simulation</title>'}));
const page=await context.newPage();
const network=[],errors=[],runtime=[],xml=[];
const requests=new WeakMap();
const decode=request=>{
  const url=new URL(request.url());
  const body=request.postData();
  return (body?body.split('\n'):['']).map(line=>{
    const params=new URLSearchParams(url.search);
    for(const [key,value] of new URLSearchParams(line)) params.set(key,value);
    const safe={};
    for(const key of ['tid','en','dl','ep.product_id','ep.asin','ep.merchant','ep.marketplace','ep.destination_url','ep.page_location','_dbg']) if(params.has(key)) safe[key]=params.get(key);
    return safe;
  });
};
page.on('request',request=>{
  if(!/google-analytics\.com|googletagmanager\.com/.test(new URL(request.url()).hostname)) return;
  const url=new URL(request.url());
  const row={host:url.hostname,path:url.pathname,method:request.method(),events:decode(request)};
  network.push(row);requests.set(request,row);
});
page.on('response',response=>{const row=requests.get(response.request());if(row)row.status=response.status();});
page.on('requestfailed',request=>{const row=requests.get(request);if(row)row.error=request.failure()?.errorText;});
page.on('pageerror',error=>errors.push(error.message));
const waitForEvent=async(name,location)=>{
  if(!live)return;
  await page.waitForFunction(()=>typeof window.gtag==='function');
  const deadline=Date.now()+15000;
  while(Date.now()<deadline){
    if(network.some(row=>row.status===204&&row.events.some(event=>event.en===name&&(!location||event.dl===location))))return;
    await page.waitForTimeout(250);
  }
};
for(const path of ['/','/gear/midland-er310/','/gear/fenix-cl26r-pro/']){
  await page.goto(base+path,{waitUntil:'networkidle'});
  await waitForEvent('page_view',base+path);
  runtime.push(await page.evaluate(()=>({path:location.pathname,gtag:typeof window.gtag,
    configCount:(window.dataLayer??[]).filter(row=>row&&row[0]==='config').length,
    loaderCount:document.querySelectorAll('script[src*="googletagmanager.com/gtag/js"]').length})));
  if(smoke&&path==='/gear/midland-er310/'){
    const popup=context.waitForEvent('page');
    await page.locator('[data-product-purchase] a[data-affiliate-click]').click();
    await (await popup).close();
    await waitForEvent('affiliate_click');
    // Allow Google's optional automatic outbound event to flush as well.
    await page.waitForTimeout(2500);
  }
}
for(const path of ['/sitemap.xml','/sitemap-index.xml','/sitemap-0.xml']){
  const response=await fetch(base+path);const text=await response.text();
  xml.push(await page.evaluate(({path,text})=>{
    const doc=new DOMParser().parseFromString(text,'application/xml');
    return{path,parseError:!!doc.querySelector('parsererror'),root:doc.documentElement.localName,
      namespace:doc.documentElement.namespaceURI,encoding:doc.xmlEncoding,
      locations:[...doc.querySelectorAll('loc')].map(e=>e.textContent)};
  },{path,text}));
}
const child=resources.find(row=>row.path==='/sitemap-0.xml');
const submitted=await Promise.all((child?.locs??[]).map(async url=>{
  const location=new URL(url);const response=await fetch(base+location.pathname,{redirect:'manual'});
  const $=load(await response.text());
  return{url,status:response.status,canonical:$('link[rel=canonical]').attr('href'),robots:$('meta[name=robots]').attr('content')??null};
}));
const bot=await Promise.all(['/robots.txt','/sitemap-index.xml','/sitemap-0.xml'].map(async path=>{
  const response=await fetch(base+path,{headers:{'user-agent':'Googlebot'}});
  return{path,status:response.status,note:'User-agent simulation, not a request from Google infrastructure'};
}));
await context.close();await browser.close();
const result={checkedAt:new Date().toISOString(),base,liveGoogleTraffic:live,affiliateSmoke:smoke,
  renderedSource:renderDist?'Candidate dist served by first-party Playwright interception; no deployment':'Server HTTP response',
  note:'HTTP delivery and GA endpoint responses do not prove visibility in private GA4 or Search Console reports. Request IDs, cookies and client IDs are deliberately omitted.',
  resources,submitted,bot,xml,runtime,network,jsErrors:errors};
mkdirSync(dirname(output),{recursive:true});
writeFileSync(output,JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({output,resources:resources.map(row=>({path:row.path,status:row.status,error:row.error})),runtime,
  network,jsErrors:errors},null,2));
assert.ok(resources.every(row=>row.status===200&&!row.redirected),'Some required HTTP resources failed');
assert.ok(xml.every(row=>!row.parseError&&row.namespace==='http://www.sitemaps.org/schemas/sitemap/0.9'),'Invalid XML');
assert.ok(submitted.every(row=>row.status===200&&!row.robots?.includes('noindex')&&row.canonical===row.url),'Invalid indexable URL');
assert.equal(errors.length,0,'Browser JavaScript errors');
if(live){
  assert.ok(runtime.every(row=>row.configCount===1&&row.loaderCount===1),'Google integration duplicated');
  for(const row of runtime)assert.ok(network.some(request=>request.status===204&&request.events.some(event=>event.en==='page_view'&&event.dl===base+row.path)),'Missing delivered page_view: '+row.path);
  if(smoke){
    assert.equal(network.flatMap(row=>row.events.filter(event=>event.en==='affiliate_click'&&row.status===204)).length,1,'Expected one delivered affiliate_click');
    assert.equal(network.flatMap(row=>row.events.filter(event=>event.en==='click')).length,0,'Automatic outbound click would double-count the affiliate action; disable it in stream settings');
  }
}
