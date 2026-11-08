import {chromium,webkit} from 'playwright';
import {createServer} from 'node:http';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
const dir=resolve('dist');
const server=createServer(async(req,res)=>{try{const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);const target=resolve(dir,'.'+pathname+(pathname.endsWith('/')?'index.html':''));if(!target.startsWith(dir+sep)){res.writeHead(403).end();return;}const b=await readFile(target);res.writeHead(200,{'Content-Type':({'.html':'text/html','.css':'text/css','.js':'text/javascript','.webp':'image/webp','.xml':'application/xml'})[extname(target)]??'application/octet-stream'});res.end(b);}catch{res.writeHead(404).end();}});
await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;

let browser;const results=[];
try{for(const engine of ['chromium','webkit']){browser=await ({chromium,webkit})[engine].launch();for(const language of ['en','fr'])for(const mode of ['normal','local-read-only','local-read-only-session-unavailable']){
 const context=await browser.newContext({storageState:{cookies:[],origins:[{origin,localStorage:[{name:'agl-analytics-consent',value:JSON.stringify({version:1,choice:'granted',updatedAt:Date.now()})}]}]}});
 await context.route('https://**/*',r=>r.abort());
 await context.addInitScript(mode=>{
  if(mode==='normal')return;
  const originalSet=Storage.prototype.setItem;
  Storage.prototype.setItem=function(key,value){if(this===window.localStorage)throw new DOMException('Read-only persistent storage','QuotaExceededError');return originalSet.call(this,key,value);};
  if(mode.includes('session-unavailable'))Object.defineProperty(window,'sessionStorage',{get(){throw new DOMException('Session storage unavailable','SecurityError');}});
 },mode);
 const page=await context.newPage();await page.goto(origin+(language==='fr'?'/fr/privacy/':'/privacy/'));await page.waitForFunction(()=>document.querySelector('[data-analytics-choice=granted]')?.disabled===false);
 const before=await page.locator('[data-analytics-loader]').count();await page.locator('[data-analytics-consent]').evaluate(e=>e.open=true);
 const reloaded=page.waitForEvent('load');await page.locator('[data-analytics-choice=denied]').click();await reloaded;await page.waitForFunction(()=>document.querySelector('[data-analytics-choice=granted]')?.disabled===false);
 const observed=await page.evaluate(()=>({loaders:document.querySelectorAll('[data-analytics-loader]').length,status:document.querySelector('[data-analytics-status]').textContent,persisted:JSON.parse(localStorage.getItem('agl-analytics-consent')).choice}));
 results.push({engine,language,mode,beforeLoaders:before,expectedAfterLoaders:0,observed,passed:observed.loaders===0});await context.close();
}
await browser.close();browser=undefined;}
}catch(e){results.push({error:e.message});}finally{await browser?.close();server.close();await writeFile('docs/phase1-hardening/release-readiness/evidence/withdrawal-storage-edge.json',JSON.stringify({note:'Synthetic browser storage restrictions; all external requests blocked; saved grant seeded as a remembered legitimate prior choice. No application code modified.',results},null,2));console.log(JSON.stringify(results));process.exitCode=results.some(r=>!r.passed)?1:0;}
