import {test,expect} from './fixtures';
import AxeBuilder from '@axe-core/playwright';
import {readFileSync,readdirSync,mkdirSync,writeFileSync} from 'node:fs';
import {productVerification} from '../../src/lib/product-verification';
import {categoryUniverse} from '../../src/config/taxonomy';
import type {Product} from '../../src/lib/products';
const products=readdirSync('src/data/products').filter(f=>f.endsWith('.json')&&!f.startsWith('template')).map(f=>({id:f.replace(/\.json$/,''),data:JSON.parse(readFileSync('src/data/products/'+f,'utf8'))} as Product));

test('all cards and profiles distinguish documentation, listing evidence, editorial review and link availability',async({page})=>{
 test.setTimeout(120_000);
 for(const route of ['/gear/','/blackout/','/fallout/','/outbreak/']){
  await page.goto(route);expect(await page.locator('main').innerText()).not.toContain('Information only · Verification pending');
  const expected=products.filter(p=>route==='/gear/'||route==='/'+categoryUniverse(p.data.category)+'/');
  for(const p of expected){
   const status=productVerification(p),card=page.locator(`article.card[data-product-id="${p.id}"]`);
   await expect(card.locator('[data-product-review]')).toContainText(status.profileLabel);
   await expect(card.locator('[data-editorial-status]')).toHaveAttribute('data-editorial-status',status.editorialApproved?'model-reviewed':'incomplete');
   await expect(card.locator('[data-listing-status]')).toHaveAttribute('data-listing-status',status.listingStatus);
   await expect(card.locator('[data-listing-status]')).toHaveText(status.listingLabel);
   await expect(card.locator('[data-link-status]')).toHaveAttribute('data-link-status',status.linkActive?'active':'held');
  }
 }
 for(const p of products){
  const status=productVerification(p);await page.goto(`/gear/${p.id}/`);
  const summary=page.locator('.verification-summary');
  await expect(summary).toContainText(status.listingLabel);await expect(summary).toContainText(status.editorialLabel);
  await expect(summary.locator('[data-link-status]')).toHaveAttribute('data-link-status',status.linkActive?'active':'held');
  await expect(page.locator('meta[name=robots]')).toHaveAttribute('content','noindex, nofollow');
  if(status.listingStatus==='owner-documented')await expect(summary).toContainText('not an independent inspection');
 }
});

test('account disclosure and distinct product states remain readable, accessible and responsive',async({page})=>{
 test.setTimeout(120_000);mkdirSync('.tools/qa/account-status',{recursive:true});const rows:any[]=[];
 for(const width of [320,375,768,1024,1440,1920]){
  await page.setViewportSize({width,height:1000});await page.goto('/gear/');
  await expect(page.locator('article.card a[data-affiliate-click]')).toHaveCount(36);
  await expect(page.locator('article.card [data-amazon-pending]')).toHaveCount(5);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  const violations=(await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations;expect(violations).toEqual([]);rows.push({path:'/gear/',width,axeViolations:0});
  if(width===375||width===1440){
   await page.screenshot({path:`.tools/qa/account-status/catalogue-${width}.png`});
   for(const id of ['midland-er310','kidde-c3010-co-alarm','leatherman-wave-plus-multitool']){
    const card=page.locator(`article.card[data-product-id="${id}"]`);const img=card.locator('img');if(await img.count()){await img.scrollIntoViewIfNeeded();await img.evaluate((img:HTMLImageElement)=>img.decode());}
    await card.screenshot({path:`.tools/qa/account-status/${id}-card-${width}.png`,style:'header{visibility:hidden!important}'});
   }
   await page.goto('/gear/midland-er310/');await page.locator('.verification-summary').screenshot({path:`.tools/qa/account-status/profile-status-${width}.png`});
  }
  await page.goto('/affiliate-disclosure/');await expect(page.locator('[data-account-declaration]')).toContainText('owner declaration, not independent confirmation from Amazon');
  await expect(page.locator('[data-account-declaration]')).toContainText('registered and approved');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations).toEqual([]);rows.push({path:'/affiliate-disclosure/',width,axeViolations:0});
  if(width===375||width===1440)await page.screenshot({path:`.tools/qa/account-status/disclosure-${width}.png`,fullPage:true});
 }
 writeFileSync('.tools/qa/account-status/responsive.json',JSON.stringify({rows},null,2)+'\n');
});
