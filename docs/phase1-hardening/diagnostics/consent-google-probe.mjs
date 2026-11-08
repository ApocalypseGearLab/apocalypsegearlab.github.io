import {chromium} from 'playwright';
import {createServer} from 'node:http';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
const dir=resolve('dist');
const server=createServer(async(req,res)=>{try{const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);const target=resolve(dir,'.'+pathname+(pathname.endsWith('/')?'index.html':''));if(!target.startsWith(dir+sep)){res.writeHead(403).end();return;}const b=await readFile(target);res.writeHead(200,{'Content-Type':({'.html':'text/html','.css':'text/css','.js':'text/javascript','.webp':'image/webp','.xml':'application/xml'})[extname(target)]??'application/octet-stream'});res.end(b);}catch{res.writeHead(404).end();}});
await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;

import assert from 'node:assert/strict';
let browser;const attempts=[];const errors=[];
try{
 browser=await chromium.launch();const context=await browser.newContext();
 await context.route('**/*',async r=>{const u=new URL(r.request().url());if(u.origin===origin)return r.continue();
 const allowed=u.hostname==='www.googletagmanager.com'&&r.request().resourceType()==='script';
 attempts.push({host:u.hostname,path:u.pathname,type:r.request().resourceType(),allowed,measurementId:u.searchParams.get('tid')??u.searchParams.get('id'),event:u.searchParams.get('en')});
 return allowed?r.continue():r.abort('blockedbyclient');});
 const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
 await page.goto(origin+'/gear/midland-er310/');await page.waitForTimeout(700);assert.equal(attempts.length,0);
 const beforeCookies=await context.cookies();assert.equal(beforeCookies.filter(c=>/^_ga/.test(c.name)).length,0);
 await page.locator('[data-analytics-choice=granted]').click();await page.waitForTimeout(4000);
 const grantedCookies=(await context.cookies()).map(c=>({name:c.name,path:c.path,expires:c.expires,sameSite:c.sameSite,secure:c.secure,remainingDays:(c.expires-Date.now()/1000)/86400}));
 const loader=await page.locator('[data-analytics-loader]').count();
 await page.evaluate(()=>document.querySelector('[data-product-purchase] a[data-affiliate-click]').dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true})));
 await page.waitForTimeout(1500);
 const grantRequests=attempts.slice();const navigation=page.waitForEvent('load');await page.locator('[data-analytics-choice=denied]').click();await navigation;await page.waitForTimeout(700);
 const afterRequests=attempts.slice(grantRequests.length);const afterCookies=(await context.cookies()).filter(c=>/^_ga/.test(c.name));
 assert.equal(await page.locator('[data-analytics-loader]').count(),0);assert.equal(afterRequests.length,0);assert.equal(afterCookies.length,0);
 const evidence={note:'Fresh synthetic localhost context. Actual Google gtag scripts allowed only after UI opt-in. Every nonlocal request except the exact Google script host is blocked, including all collection/fallback endpoints and retailer navigation. Requests here mean attempted, not delivered or visible in GA4. Cookie values and session IDs omitted.',before:{externalRequests:0,gaCookies:0},granted:{loader,requests:grantRequests,cookies:grantedCookies},withdrawn:{externalRequests:afterRequests.length,gaCookies:afterCookies.length},errors};
 await writeFile('docs/phase1-hardening/evidence/consent-google-runtime.json',JSON.stringify(evidence,null,2));console.log(JSON.stringify(evidence));await context.close();
}catch(e){console.error(e);process.exitCode=1;}finally{await browser?.close();server.close();}
