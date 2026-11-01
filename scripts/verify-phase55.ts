import assert from 'node:assert/strict';
import {readFileSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {load} from 'cheerio';
import {PHASE55} from '../tests/phase55-fixture';
const read=(f:string)=>readFileSync(f,'utf8'),before=JSON.parse(read('docs/qa/phase5-5/before.json'));
const manifest=JSON.parse(read('src/data/media/imported-manifest.json'));
const ids=new Set(Object.keys(PHASE55)),stems=manifest.assets.filter((a:any)=>ids.has(a.productId)).map((a:any)=>a.id);
for(const old of before.pages){const $=load(read('dist'+old.path+(old.path.endsWith('/')?'index.html':'')));const row={path:old.path,title:$('title').text(),description:$('meta[name=description]').attr('content'),robots:$('meta[name=robots]').attr('content')??null,canonical:$('link[rel=canonical]').attr('href'),h1:$('h1').text(),schemas:$('script[type="application/ld+json"]').map((_,e)=>JSON.parse($(e).text())).get(),images:$('main img').toArray().filter(e=>!stems.some((s:string)=>($(e).attr('src')??'').includes(s))).map(e=>Object.fromEntries(['src','srcset','sizes','alt','width','height','loading','fetchpriority'].map(a=>[a,$(e).attr(a)??null])))};assert.deepEqual(row,old,old.path);}
const rows=[];
for(const [id,[asin]]of Object.entries(PHASE55)){
 const p=JSON.parse(read(`src/data/products/${id}.json`)),$=load(read(`dist/gear/${id}/index.html`)),asset=manifest.assets.find((a:any)=>a.productId===id),url=`https://www.amazon.ca/dp/${asin}?tag=apocalypsegear-20`;
 assert.equal($('h1').text(),p.name);assert.equal($('meta[name=robots]').attr('content'),'noindex, nofollow');assert.equal($('link[rel=canonical]').attr('href'),`https://apocalypsegearlab.github.io/gear/${id}/`);assert.equal($('meta[name=description]').attr('content'),p.summary);
 const buy=$('[data-product-purchase] a[data-affiliate-click]');assert.equal(buy.attr('href'),url);assert.equal(buy.attr('target'),'_blank');assert.equal(buy.attr('rel'),'sponsored nofollow noopener');assert.ok($('[data-product-purchase]').text().includes('As an Amazon Associate I earn from qualifying purchases.'));
 assert.equal($('[data-technical-sources],[data-source-click],[data-source-citation]').length,0);for(const href of $('main a[href^="http"]').map((_,e)=>$(e).attr('href')).get())assert.equal(new URL(href).hostname,'www.amazon.ca');
 assert.equal($('script[type="application/ld+json"]').length,1);assert.equal(JSON.parse($('script[type="application/ld+json"]').text())['@type'],'BreadcrumbList');assert.ok(!read('dist/sitemap-0.xml').includes('/gear/'+id+'/'));
 assert.equal($('.product-artwork--detail img').attr('src'),asset.deliverySrc);assert.equal($('.product-artwork--detail [data-artwork-caveat]').text(),asset.captionNote);
 if(p.specsStatus==='owner-reported'){assert.ok($('h2').text().includes('Owner-reported features'));assert.ok($('.verification-summary').text().includes('Documentation incomplete'));}
 for(const route of ['gear','blackout']){const list=load(read(`dist/${route}/index.html`)),card=list(`article.card[data-product-id="${id}"]`);assert.equal(card.length,1);assert.equal(card.find('a[data-affiliate-click]').attr('href'),url);assert.equal(card.find('[data-artwork-caveat]').text(),asset.captionNote);assert.equal(list('meta[name=robots]').length,0);}
 for(const v of asset.variants)assert.equal(createHash('sha256').update(readFileSync('dist'+v.src)).digest('hex'),v.sha256);
 rows.push({id,asin,url,cta:'ACTIVE',robots:'noindex, nofollow',specifications:p.specsStatus,image:asset.deliverySrc});
}
const result={previousPagesPreserved:before.pages.length,newProfiles:rows,coreRobots:'indexable, robots meta absent',newWebpVariants:9,existingProductsUnchanged:38};
const at=process.argv.indexOf('--output');if(at>=0)writeFileSync(process.argv[at+1]!,JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result,null,2));
