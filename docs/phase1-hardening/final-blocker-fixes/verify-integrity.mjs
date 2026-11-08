import assert from 'node:assert/strict';
import {readFileSync,readdirSync,writeFileSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {resolve,relative} from 'node:path';
import {load} from 'cheerio';
import sharp from 'sharp';
import {beforePhase1} from '../../../scripts/phase1-preservation.mjs';
const dir='docs/phase1-hardening/final-blocker-fixes/evidence/';
const hash=b=>createHash('sha256').update(b).digest('hex');
const show=file=>{const r=spawnSync('git',['show','HEAD:'+file],{maxBuffer:20*1024*1024});assert.equal(r.status,0,r.stderr.toString());return r.stdout;};
const tracked=spawnSync('git',['ls-files','-z'],{encoding:'utf8'}).stdout.split('\0').filter(Boolean);
const protectedPaths=tracked.filter(p=>p.startsWith('src/data/products/')||p.startsWith('assets/')||['src/config/site.ts','src/lib/release-policy.ts','src/lib/affiliate.ts','src/lib/imported-media-policy.mjs','src/data/media/imported-manifest.json','package-lock.json','.github/workflows/ci.yml','.github/workflows/deploy.yml'].includes(p));
const protectedRows=protectedPaths.map(file=>{const actual=readFileSync(file),baseline=show(file);assert.ok(actual.equals(baseline),'Protected original changed: '+file);return{file,sha256:hash(actual)};});
const changes=JSON.parse(readFileSync('docs/phase1-hardening/evidence/source-changes.json','utf8'));
const projectionRows=Object.keys(changes).map(file=>{const projected=beforePhase1(file,readFileSync(file)),baseline=Buffer.from(show(file).toString().replace(/\r\n/g,'\n'));return{file,matchesHEAD:projected.equals(baseline),projectedSha256:hash(projected),baselineSha256:hash(baseline)};});
const media=JSON.parse(readFileSync('src/data/media/responsive-imported-manifest.json','utf8')).assets;
const measured=[];for(const asset of media){assert.ok(readFileSync(asset.source.file).equals(show(asset.source.file)),'Original artwork modified');for(const v of asset.variants){const b=readFileSync(v.file),metadata=await sharp(b).metadata();assert.equal(b.length,v.bytes);assert.equal(hash(b),v.sha256);assert.equal(metadata.width,v.width);assert.equal(metadata.height,v.height);}measured.push({id:asset.id,productId:asset.productId,original:asset.source.bytes,bytes480:asset.variants[0].bytes,bytes960:asset.variants[1].bytes,originalSha256:asset.source.sha256});}
assert.equal(measured.length,13);
const baselineRoot=resolve('.tools/phase1/baseline-dist');const currentRoot=resolve('dist');
const baselineHtml=readdirSync(baselineRoot,{recursive:true}).map(String).filter(p=>p.endsWith('.html'));
let productPages=0,affiliateControls=0;const preservedPages=[];
for(const file of baselineHtml){const b=load(readFileSync(resolve(baselineRoot,file),'utf8')),a=load(readFileSync(resolve(currentRoot,file),'utf8'));const buying=$=>$('[data-affiliate-click]').map((_,el)=>({href:$(el).attr('href'),rel:$(el).attr('rel'),target:$(el).attr('target'),data:Object.fromEntries(Object.entries(el.attribs).filter(([k])=>k.startsWith('data-')))})).get();assert.deepEqual(buying(a),buying(b),'Affiliate controls changed: '+file);affiliateControls+=buying(a).length;const held=$=>$('[data-product] [aria-disabled=true], [data-product-id] [aria-disabled=true], [data-product-purchase] [aria-disabled=true]').map((_,e)=>({html:$(e).toString()})).get();assert.deepEqual(held(a),held(b),'Held controls changed: '+file);assert.equal(a('meta[name=robots]').attr('content'),b('meta[name=robots]').attr('content'),'Robots changed: '+file);if(/(?:^|[/\\])gear[/\\][^/\\]+[/\\]index\.html$/.test(file)){assert.equal(a('meta[name=robots]').attr('content'),'noindex, nofollow');productPages++;}preservedPages.push(file);}
const seoFiles=readdirSync(currentRoot).filter(f=>f.startsWith('sitemap')||f==='robots.txt');for(const file of seoFiles)assert.ok(readFileSync(resolve(currentRoot,file)).equals(readFileSync(resolve(baselineRoot,file))),'Sitemap/robots changed: '+file);
assert.equal(productPages,104);
const products=readdirSync('src/data/products').filter(f=>f.endsWith('.json')&&!f.startsWith('template')).map(f=>({id:f.replace('.json',''),data:JSON.parse(readFileSync('src/data/products/'+f,'utf8'))}));
const holds=products.filter(p=>p.data.research?.affiliateReview?.decision==='hold').map(p=>({id:p.id,asin:p.data.links.amazonCa.asin,url:p.data.links.amazonCa.url}));assert.equal(products.length,52);assert.equal(holds.length,5);
const record={protectedFiles:protectedRows.length,protectedRows,sourceProjectionFiles:Object.keys(changes).length,sourceProjectionMatchesHEAD:projectionRows.every(r=>r.matchesHEAD),projectionRows,media:measured,totals:{original:measured.reduce((n,r)=>n+r.original,0),bytes480:measured.reduce((n,r)=>n+r.bytes480,0),bytes960:measured.reduce((n,r)=>n+r.bytes960,0)},preservedBaselineHtmlPages:preservedPages.length,productLanguagePages:productPages,affiliateControls,holds,unchangedSeoFiles:seoFiles,remainingSyntheticProducts:products.filter(p=>p.id.startsWith('qa-fixture')).map(p=>p.id)};
writeFileSync(dir+'independent-integrity.json',JSON.stringify(record,null,2));console.log(JSON.stringify({...record,protectedRows:undefined,projectionRows:projectionRows.filter(r=>!r.matchesHEAD),media:undefined,holds:holds.map(h=>h.id)}));process.exitCode=record.sourceProjectionMatchesHEAD?0:1;
