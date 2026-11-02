import {test,expect} from './fixtures';
import AxeBuilder from '@axe-core/playwright';
import {mkdirSync,writeFileSync} from 'node:fs';

const core=['/','/gear/','/blackout/','/fallout/','/outbreak/'];
test('all five core pages are indexable with self canonicals and sitemap entries while unapproved profiles remain restricted',async({page,request})=>{
 const xml=await (await request.get('/sitemap-0.xml')).text();
 for(const path of core){
  const response=await page.goto(path);expect(response?.status()).toBe(200);
  expect(response?.headers()['x-robots-tag']??'').not.toMatch(/noindex|none/i);
  await expect(page.locator('meta[name="robots"], meta[name="googlebot"]')).toHaveCount(0);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href','https://apocalypsegearlab.github.io'+path);
  expect(xml).toContain('<loc>https://apocalypsegearlab.github.io'+path+'</loc>');
  await expect(page.locator('h1')).toHaveCount(1);
  for(const destination of core)await expect(page.locator(`body > header .primary-links a[href="${destination}"]`)).toHaveCount(1);
  expect((await page.locator('script[type="application/ld+json"]').allTextContents()).join('')).not.toMatch(/"@type"\s*:\s*"(?:Product|Offer|AggregateOffer)"/);
 }
 for(const id of ['morakniv-garberg-blackblade-carbon-survival-kit','kidde-c3010-co-alarm']){
  await page.goto(`/gear/${id}/`);await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content','noindex, nofollow');
  expect(xml).not.toContain('/gear/'+id+'/');
 }
 await page.goto('http://127.0.0.1:4322/review/gear/');await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content','noindex, nofollow');
 await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href','https://apocalypsegearlab.github.io/gear/');
});

test('catalogue guide, sector links and unchanged cards remain accessible from 320 to 1920px',async({page})=>{
 test.setTimeout(90_000);mkdirSync('.tools/qa/core-indexation',{recursive:true});const records:any[]=[];
 for(const width of [320,375,768,1024,1440,1920]){
  await page.setViewportSize({width,height:1000});await page.goto('/gear/');
  await expect(page.locator('[data-editorial-guide]')).toContainText('not a hands-on test');
  await expect(page.locator('article.card')).toHaveCount(46);await expect(page.locator('article.card a[data-affiliate-click]')).toHaveCount(41);
  const nav=page.getByRole('navigation',{name:'Equipment sectors'});for(const sector of ['blackout','fallout','outbreak'])await expect(nav.locator(`a[href="/${sector}/"]`)).toHaveCount(1);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  const violations=(await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations;expect(violations).toEqual([]);records.push({width,axeViolations:violations.length});
  if(width===375||width===1440)await page.screenshot({path:`.tools/qa/core-indexation/catalogue-${width}.png`});
 }
 await page.setViewportSize({width:375,height:1000});await page.goto('/gear/');const first=page.getByRole('navigation',{name:'Equipment sectors'}).locator('a[href="/blackout/"]');await first.focus();await page.keyboard.press('Enter');await expect(page).toHaveURL(/\/blackout\/$/);
 writeFileSync('.tools/qa/core-indexation/responsive.json',JSON.stringify({records,keyboardSectorNavigation:true},null,2)+'\n');
});
