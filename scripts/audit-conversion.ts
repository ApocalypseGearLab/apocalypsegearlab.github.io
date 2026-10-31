import assert from 'node:assert/strict';
import {readFileSync,readdirSync,writeFileSync,mkdirSync} from 'node:fs';
import {resolve,sep} from 'node:path';
import {load} from 'cheerio';
import {productSchema} from '../src/lib/product-schema';
import {getMerchantLinks,isCanadianPurchaseLink} from '../src/lib/affiliate';
import {isPubliclyVisible} from '../src/lib/release-policy';
import {categoryUniverse} from '../src/config/taxonomy';
import type {Product} from '../src/lib/products';

const root=resolve('dist');
const products=readdirSync('src/data/products').filter(f=>f.endsWith('.json')).map(f=>({id:f.replace(/\.json$/,''),data:productSchema.parse(JSON.parse(readFileSync('src/data/products/'+f,'utf8')))} as Product)).filter(isPubliclyVisible);
const baseline=JSON.parse(readFileSync('docs/qa/phase5-2/baseline.json','utf8'));
const before=JSON.parse(readFileSync('docs/qa/phase5-2/inventory-before.json','utf8'));
const pages=readdirSync(root,{recursive:true}).map(String).filter(f=>f.endsWith('.html'));
const productRows=products.map(p=>({id:p.id,name:p.data.name,asin:p.data.links.amazonCa.asin,url:p.data.links.amazonCa.url,universe:categoryUniverse(p.data.category),active:Boolean(getMerchantLinks(p)[0]?.href),decision:p.data.research?.affiliateReview?.decision,blocker:getMerchantLinks(p)[0]?.href?null:getMerchantLinks(p)[0]?.unavailableReason,offerVerified:p.data.research?.listingVerified??false,sourceCount:p.data.sources.length,placements:[] as string[]}));
const commercialLinks:Record<string,unknown>[]=[],references:Record<string,unknown>[]=[];
let profiles=0;
for(const file of pages){
 const path='/'+file.split(sep).join('/').replace(/index\.html$/,''),$=load(readFileSync(resolve(root,file),'utf8'));
 const previous=baseline.pages.find((p:{path:string})=>p.path===path);
 if(previous){
  const meta={path,title:$('title').text(),description:$('meta[name="description"]').attr('content'),canonical:$('link[rel="canonical"]').attr('href'),robots:$('meta[name="robots"]').attr('content')??null,h1:$('h1').text(),jsonLd:$('script[type="application/ld+json"]').map((_,e)=>JSON.parse($(e).text())).get(),images:$('main img').toArray().map(e=>Object.fromEntries(['src','srcset','sizes','alt','width','height','loading','fetchpriority'].map(a=>[a,$(e).attr(a)??null]))),header:$('body > header a').map((_,e)=>({href:$(e).attr('href'),text:$(e).text().trim()})).get(),footer:$('body > footer a').map((_,e)=>({href:$(e).attr('href'),text:$(e).text().trim()})).get(),externalReferences:[...new Set($('main a[href^="https://"]').not('[data-affiliate-click]').map((_,e)=>$(e).attr('href')).get())].sort()};
  assert.deepEqual(meta,previous,'Preserve rendered metadata, image attributes, navigation and documentary URL set: '+path);
 }
 // Inspect every external button, not just anchors already labelled for tracking.
 $('a.btn[href^="http"], a[data-affiliate-click]').each((_,e)=>{
  const a=$(e),id=a.attr('data-product'),p=products.find(p=>p.id===id),row=productRows.find(p=>p.id===id);
  assert.ok(p&&row,'Every purchase control must identify a visible source product');
  const approved=getMerchantLinks(p)[0]!;assert.ok(approved.href,'Held product cannot link in any placement: '+id);
  assert.equal(a.attr('href'),approved.href);assert.ok(isCanadianPurchaseLink(approved));
  assert.equal(a.attr('rel'),'sponsored nofollow noopener');assert.equal(a.attr('target'),'_blank');
  assert.equal(a.attr('data-merchant'),'amazon-ca');assert.equal(a.attr('data-marketplace'),'ca');
  assert.equal(a.attr('data-product-name'),p.data.name);
  const placement=a.attr('data-cta-placement');
  const expected=a.closest('[data-product-purchase]').length?'profile-summary':a.closest('[aria-labelledby="compatible-3m-filters"]').length?'compatible-filter':path==='/gear/'?'catalogue-card':/^\/(blackout|fallout|outbreak)\/$/.test(path)?'collection-card':'related-card';
  assert.equal(placement,expected);assert.equal(a.clone().children().remove().end().text().trim(),'View on Amazon.ca');
  assert.ok(a.closest('.card-purchase,[data-product-purchase]').find('[aria-label="Affiliate disclosure"]').length);
  row.placements.push(path+'#'+placement);
  commercialLinks.push({sourcePage:path,productId:id,asin:row.asin,destination:a.attr('href'),affiliateTag:new URL(approved.href).searchParams.get('tag'),ctaText:'View on Amazon.ca',commercialStatus:row.decision,offerVerified:row.offerVerified,placement,tracking:'affiliate_click',target:a.attr('target'),rel:a.attr('rel')});
 });
 $('article.card[data-product-id]').each((_,e)=>{const card=$(e),row=productRows.find(p=>p.id===card.attr('data-product-id'));assert.ok(row);assert.equal(card.find('a[data-affiliate-click]').length,row.active?1:0);assert.equal(card.find('[data-amazon-pending]').length,row.active?0:1);});
 const id=/^\/gear\/([^/]+)\/$/.exec(path)?.[1],p=products.find(p=>p.id===id);
 if(!p)continue;profiles++;
 const row=productRows.find(row=>row.id===id)!,buy=$('[data-product-purchase]'),sources=$('[data-technical-sources]');
 assert.equal(buy.length,1);assert.equal(buy.find('a[data-affiliate-click]').length,row.active?1:0);
 assert.equal(buy.find('[aria-disabled="true"]').length,row.active?0:1);
 assert.equal(buy.find('a[href^="https://"]').not('[data-affiliate-click]').length,0,'Sources cannot sit beside the main CTA');
 assert.equal(sources.length,p.data.sources.length?1:0);
 if(sources.length){assert.ok(sources.is($('main > article').children().last()),'References belong at the bottom');assert.equal(sources.find('.btn,[data-affiliate-click]').length,0);}
 const html=$('main').html()??'';
 assert.ok(html.indexOf('data-product-purchase')<html.indexOf('product-artwork--detail'),'Primary control before product artwork');
 assert.equal($('main a[href^="https://"]').not('[data-affiliate-click]').not('[data-source-click]').length,0,'All profile documentary links are ordinary links in the source section');
 for(const source of p.data.sources){const a=sources.find('a[data-source-click]').filter((_,e)=>$(e).attr('data-source-id')===source.id);assert.equal(a.length,1,source.id);assert.equal(a.attr('href'),source.url);assert.equal(a.attr('data-source-kind'),source.kind);assert.equal(a.attr('data-product'),id);assert.ok(!a.hasClass('btn'));references.push({sourcePage:path,productId:id,sourceId:source.id,kind:source.kind,destination:source.url,tracking:'source_reference_click',classification:before.sourceBindings.find((s:{productId:string;id:string})=>s.productId===id&&s.id===source.id)?.classification??'review-new-source'});}
 for(const [index,spec]of p.data.specs.entries()){
  const cell=$('.table-wrap tbody tr').eq(index).find('td').first();assert.ok(cell.text().includes(spec.value),'Keep specification: '+id+'/'+spec.label);
  if(spec.source?.startsWith('https://')){const citation=cell.find('a[data-source-citation]');assert.equal(citation.length,1);const anchor=citation.attr('href')!.slice(1);assert.equal(sources.find('li').filter((_,e)=>$(e).attr('id')===anchor).find('a').attr('href'),spec.source);}
 }
 for(const note of p.data.research?.safetyNotes??[]){const rendered=note.replace('Do not publish or recommend','Do not recommend').replace('before approval','before purchase or use').replace('a pre-publication check','a check before purchase or use');assert.ok($('main').text().includes(rendered),'Preserve safety note: '+id);}
}
assert.equal(profiles,products.length,'Every visible product has a profile');
for(const p of baseline.pages)assert.ok(pages.some(f=>'/'+f.split(sep).join('/').replace(/index\.html$/,'')===p.path),'Existing page removed: '+p.path);
assert.equal(readFileSync('dist/sitemap-0.xml','utf8'),baseline.sitemap);assert.equal(readFileSync('dist/robots.txt','utf8'),baseline.robots);
const result={products:products.length,productPages:profiles,htmlPages:pages.length,recordedCanadianUrls:products.length,authorized:productRows.filter(p=>p.active).length,blocked:productRows.filter(p=>!p.active).length,commercialCtaInstances:commercialLinks.length,nonAmazonPurchaseCtas:0,incorrectTags:0,manufacturerPurchaseCtasRemoved:0,documentaryReferenceInstances:references.length,manufacturerReferenceInstances:references.filter(r=>r.kind==='manufacturer').length,uniqueManufacturerUrls:new Set(references.filter(r=>r.kind==='manufacturer').map(r=>r.destination)).size,editorialUrlSetsPreserved:true,seoAndMediaAttributesPreserved:true,productRows,commercialLinks,references};
const output=process.argv.indexOf('--output');if(output>=0){const target=process.argv[output+1];assert.ok(target);mkdirSync(resolve(target,'..'),{recursive:true});writeFileSync(target,JSON.stringify(result,null,2)+'\n');}
console.log(JSON.stringify({...result,productRows:undefined,commercialLinks:undefined,references:undefined},null,2));
