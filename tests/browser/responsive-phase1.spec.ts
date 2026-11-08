import {test,expect} from './fixtures';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const assets=JSON.parse(readFileSync('src/data/media/responsive-imported-manifest.json','utf8')).assets;
test('all 26 new derivatives deliver exact approved bytes and original images remain available',async({request})=>{
 for(const asset of assets)for(const variant of asset.variants){const response=await request.get(variant.src);expect(response.status()).toBe(200);expect(createHash('sha256').update(await response.body()).digest('hex')).toBe(variant.sha256);}
});
for(const [width,dpr] of [[390,1],[390,2],[1440,1],[1440,2]] as const)test('all 13 responsive cards select candidates at '+width+' DPR '+dpr,async({browser,baseURL},testInfo)=>{
 const context=await browser.newContext({viewport:{width,height:900},deviceScaleFactor:dpr});await context.route(/^https:\/\//,r=>r.abort());const page=await context.newPage();await page.goto(baseURL+'/gear/');
 const observations=[];
 for(const asset of assets){const img=page.locator('article[data-product-id="'+asset.productId+'"] img');await img.scrollIntoViewIfNeeded();await expect.poll(()=>img.evaluate(async(img:HTMLImageElement)=>{const src=img.currentSrc;try{await img.decode();}catch{return false;}return img.complete&&img.naturalWidth>0&&img.currentSrc===src;}),{timeout:5000,message:"Responsive candidate must finish decoding after source selection"}).toBe(true);const v=await img.evaluate((img:HTMLImageElement)=>({src:img.currentSrc,width:img.clientWidth,height:img.clientHeight,fit:getComputedStyle(img).objectFit,alt:img.alt,srcset:img.srcset}));expect(asset.variants.map((v:any)=>v.src)).toContain(new URL(v.src).pathname);expect(v.width).toBe(v.height);expect(v.fit).toBe('contain');expect(v.alt).toBeTruthy();expect(v.srcset.split(',')).toHaveLength(3);observations.push({id:asset.id,...v});}
 await testInfo.attach('currentSrc.json',{body:JSON.stringify({width,dpr,observations},null,2),contentType:'application/json'});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await context.close();
});
