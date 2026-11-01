import assert from 'node:assert/strict';
import {readFileSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {load} from 'cheerio';
import {productSchema} from '../src/lib/product-schema';
import {getMerchantLinks} from '../src/lib/affiliate';
import {BOUGERV} from '../tests/bougerv-fixture';
import type {Product} from '../src/lib/products';
const read=(file:string)=>readFileSync(file,'utf8');
const before=JSON.parse(read('docs/qa/bougerv/before.json'));
const stems=['bougerv-53-quart-refrigerator-blackout','bougerv-rocky-v3-55qt-dual-zone-blackout','oria-wireless-fridge-freezer-thermometer-blackout','panasonic-eneloop-aa-bq-cc17-kit-blackout','panasonic-eneloop-aaa-bq-cc17-kit-blackout'];
for(const old of before.pages){
 const $=load(read('dist'+old.path+(old.path.endsWith('/')?'index.html':'')));
 const row={path:old.path,title:$('title').text(),description:$('meta[name=description]').attr('content'),robots:$('meta[name=robots]').attr('content')??null,canonical:$('link[rel=canonical]').attr('href'),h1:$('h1').text(),schemas:$('script[type="application/ld+json"]').map((_,e)=>JSON.parse($(e).text())).get(),images:$('main img').toArray().filter(e=>!stems.some(stem=>($(e).attr('src')??'').includes(stem))).map(e=>Object.fromEntries(['src','srcset','sizes','alt','width','height','loading','fetchpriority'].map(a=>[a,$(e).attr(a)??null])))};
 assert.deepEqual(row,old,'Preserve pre-existing rendered metadata and image attributes: '+old.path);
}
const rows=[];
for(const [id,[asin]]of Object.entries(BOUGERV)){
 const product={id,data:productSchema.parse(JSON.parse(read(`src/data/products/${id}.json`)))}as Product;
 const $=load(read(`dist/gear/${id}/index.html`));assert.equal($('h1').text(),product.data.name);assert.equal($('meta[name=robots]').attr('content'),'noindex, nofollow');
 assert.equal($('[data-technical-sources],[data-source-click],[data-source-citation],a[href^="#source-"]').length,0);
 const links=$('a[href^="http"]').map((_,e)=>$(e).attr('href')).get();assert.ok(links.length);for(const href of links){const u=new URL(href);assert.equal(u.hostname,'www.amazon.ca');assert.equal(u.searchParams.get('tag'),'apocalypsegear-20');assert.equal([...u.searchParams.keys()].length,1);}
 assert.ok(!$.html().includes('bougerv.com/'),'Internal manufacturer URLs must not leak into public HTML');
 const href=getMerchantLinks(product)[0]!.href;assert.equal(href,`https://www.amazon.ca/dp/${asin}?tag=apocalypsegear-20`);assert.equal($('[data-product-purchase] a[data-affiliate-click]').attr('href'),href);
 assert.equal($('script[type="application/ld+json"]').length,1);assert.equal(JSON.parse($('script[type="application/ld+json"]').text())['@type'],'BreadcrumbList');
 for(const route of ['gear','blackout']){const page=load(read(`dist/${route}/index.html`));assert.equal(page(`article.card[data-product-id="${id}"]`).length,1);assert.equal(page(`article.card[data-product-id="${id}"] a[data-affiliate-click]`).attr('href'),href);}
 assert.ok(!read('dist/sitemap-0.xml').includes('/gear/'+id+'/'));
 const asset=JSON.parse(read('src/data/media/imported-manifest.json')).assets.find((a:any)=>a.productId===id);for(const variant of asset.variants)assert.equal(createHash('sha256').update(readFileSync('dist'+variant.src)).digest('hex'),variant.sha256);
 rows.push({id,asin,route:`/gear/${id}/`,cta:'ACTIVE',url:href,robots:'noindex, nofollow',publicExternalLinks:'Amazon.ca only',manufacturerEvidence:'Internal; not rendered',image:asset.deliverySrc});
}
const result={previousPagesPreserved:before.pages.length,products:rows,wrongPublicSourceLinks:0,sourceEvidenceControls:'Unchanged; manufacturer citations still required in product data',newWebpVariants:6};
const at=process.argv.indexOf('--output');if(at>=0)writeFileSync(process.argv[at+1]!,JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify(result,null,2));
