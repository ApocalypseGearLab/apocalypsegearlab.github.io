import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import sharp from 'sharp';
import {load} from 'cheerio';
const read=file=>JSON.parse(readFileSync(file,'utf8'));
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
const sourcesOnly=process.argv.includes('--sources-only');
const evidence=read('docs/qa/four-universes/assets.json');
assert.equal(evidence.heroes.length,16);
assert.equal(evidence.productVariants.length,3);
for(const row of [...evidence.heroes,...evidence.productVariants]){
 const bytes=readFileSync(row.file),info=await sharp(bytes).metadata();
 assert.equal(hash(bytes),row.sha256,row.file);assert.equal(bytes.length,row.bytes);
 assert.equal(info.format,'webp');await sharp(bytes).raw().toBuffer();
 const width=row.file.includes('-og.')?1200:row.width??Number(row.file.match(/hero-(\d+)/)[1]);
 assert.equal(info.width,width);assert.equal(info.height,row.file.includes('-og.')?630:row.height??width*9/16);
 const delivered=row.src?'dist'+row.src:row.file.replace(/^public/,'dist');
 if(!sourcesOnly)assert.deepEqual(readFileSync(delivered),bytes,'Preserve supplied optimized WebP delivery: '+row.file);
}
if(sourcesOnly){console.log('Verified all 19 supplied WebPs, pinned hashes, dimensions and decode without re-encoding.');process.exit(0);}
for(const id of ['blackout','fallout','outbreak','whiteout']){
 const $=load(readFileSync(`dist/${id}/index.html`,'utf8'));
 assert.equal($('h1').length,1);assert.equal($('h1').text().toLowerCase(),id);
 assert.equal($('meta[name=robots]').length,0);
 const url=`https://apocalypsegearlab.github.io/${id}/`;
 assert.equal($('link[rel=canonical]').attr('href'),url);assert.equal($('meta[property="og:url"]').attr('content'),url);
 assert.equal($('meta[property="og:image"]').attr('content'),`https://apocalypsegearlab.github.io/images/universes/${id}-survival-og.webp`);
 assert.equal($('meta[property="og:image:width"]').attr('content'),'1200');assert.equal($('meta[property="og:image:height"]').attr('content'),'630');
 assert.equal($('meta[name="twitter:card"]').attr('content'),'summary_large_image');
 assert.equal($('meta[name="twitter:image"]').attr('content'),$('meta[property="og:image"]').attr('content'));
 assert.equal($('meta[name="twitter:title"]').attr('content'),$('title').text());
 assert.equal($('meta[name="twitter:description"]').attr('content'),$('meta[name=description]').attr('content'));
 assert.equal($('meta[property="og:title"]').attr('content'),$('title').text());
 assert.equal($('meta[property="og:description"]').attr('content'),$('meta[name=description]').attr('content'));
 assert.equal($('meta[name="twitter:image:alt"]').attr('content'),$('meta[property="og:image:alt"]').attr('content'));
 const hero=$('.universe-hero img');assert.equal(hero.length,1);assert.equal(hero.attr('loading'),'eager');assert.equal(hero.attr('fetchpriority'),'high');
 assert.equal(hero.attr('srcset'),[768,1280,1600].map(w=>`/images/universes/${id}-survival-hero-${w}.webp ${w}w`).join(', '));
 const schemas=$('script[type="application/ld+json"]').map((_,el)=>JSON.parse($(el).text())).get();
 assert.equal(schemas.filter(s=>s['@type']==='CollectionPage').length,1);assert.equal(schemas.filter(s=>s['@type']==='BreadcrumbList').length,1);
 assert.equal(schemas.find(s=>s['@type']==='CollectionPage').url,url);
 assert.ok(readFileSync('dist/sitemap-0.xml','utf8').includes(url));
}
const $=load(readFileSync('dist/gear/therm-a-rest-neoair-xtherm-nxt-review/index.html','utf8'));
assert.equal($('a[href*="B0CS4P19QQ"]').length,0,'Unverified ASIN must never become a rendered link');
assert.equal($('[data-product-purchase] a[data-affiliate-click]').length,0);
assert.equal($('[data-product-purchase] [aria-disabled=true]').length,1);
assert.equal($('.product-artwork--detail img').attr('src'),'/images/whiteout/therm-a-rest-neoair-xtherm-nxt-whiteout.webp');
assert.ok($('meta[name=robots]').attr('content').includes('noindex'));
assert.ok($('main').text().includes('7.3'));assert.ok($('figcaption').text().includes('not an official manufacturer photograph'));
assert.ok($('a[href="https://cascadedesigns.com/products/neoair-xtherm-nxt-sleeping-pad"]').length);
assert.doesNotMatch($('script[type="application/ld+json"]').text(),/"@type":"(?:Offer|Product|Review|AggregateRating)"/);
console.log('Verified four indexable cinematic universe pages, 19 exact supplied WebPs, complete OG/Twitter metadata, collection schemas and held Therm-a-Rest ASIN.');
