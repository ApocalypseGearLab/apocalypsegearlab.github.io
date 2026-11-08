import {test,expect} from './fixtures';
import AxeBuilder from '@axe-core/playwright';
import type {Page} from '@playwright/test';

const card=(page:Page)=>page.locator('[data-analytics-consent]');
const open=async(page:Page)=>{
 if(!await card(page).isVisible())await page.locator('[data-analytics-open]').click();
 await expect(card(page)).toBeVisible();
};
const requests=(page:Page)=>page.locator('[data-analytics-loader]');
const visibleControlsFit=async(page:Page)=>{
 const controls=await card(page).locator('button:visible').evaluateAll(elements=>elements.map(element=>{
  const box=element.getBoundingClientRect();
  return {width:box.width,height:box.height,left:box.left,right:box.right,top:box.top,bottom:box.bottom,
   hit:element.contains(document.elementFromPoint(box.x+box.width/2,box.y+box.height/2)),viewportWidth:innerWidth,viewportHeight:innerHeight};
 }));
 expect(controls.length).toBeGreaterThan(0);
 for(const control of controls){expect(control.width).toBeGreaterThanOrEqual(44);expect(control.height).toBeGreaterThanOrEqual(44);expect(control.left).toBeGreaterThanOrEqual(0);expect(control.right).toBeLessThanOrEqual(control.viewportWidth);expect(control.top).toBeGreaterThanOrEqual(0);expect(control.bottom).toBeLessThanOrEqual(control.viewportHeight);expect(control.hit).toBe(true);}
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
};

for(const width of [320,375,390,768,1440])test.describe('fixed card at '+width+'px',()=>{
 test.use({viewport:{width,height:900},isMobile:width<600,hasTouch:width<600,deviceScaleFactor:1,reducedMotion:'reduce'});
 for(const language of ['en','fr'] as const)test(language+': fixed on scroll with reachable summary/options controls',async({page},testInfo)=>{
  await page.goto(language==='fr'?'/fr/':'/');
  await expect(page.locator('[data-analytics-choice="granted"]')).toBeEnabled();await expect(card(page)).toBeVisible();
  await expect(card(page)).toHaveCSS('position','fixed');await expect(card(page)).toHaveCSS('z-index','80');
  expect(await card(page).evaluate(element=>element.parentElement===document.body)).toBe(true);
  await expect(card(page).locator('h2')).toHaveText(language==='fr'?'Votre confidentialité compte':'Your privacy matters');
  await expect(card(page).locator('.consent-intro')).toHaveText(language==='fr'?'Nous utilisons des cookies analytiques facultatifs pour comprendre les visites et améliorer ApocalypseGearLab. Vous pouvez naviguer et utiliser les liens Amazon sans accepter.':'We use optional analytics cookies to understand visits and improve ApocalypseGearLab. You can browse and use Amazon links without accepting.');
  const accept=page.locator('[data-analytics-choice="granted"]'),decline=page.locator('[data-analytics-choice="denied"]');
  await expect(accept).toHaveText(language==='fr'?'Accepter':'Accept');await expect(decline).toHaveText(language==='fr'?'Refuser':'Decline');
  const before=(await card(page).boundingBox())!;
  const edge=width<600?12:24;expect(before.x).toBeCloseTo(edge,0);expect(900-before.y-before.height).toBeCloseTo(edge,0);
  if(width>=600)expect(before.width).toBe(448);else expect(width-before.x-before.width).toBeCloseTo(edge,0);
  expect(before.height).toBeLessThan(450);
  expect((await accept.boundingBox())!.width).toBeCloseTo((await decline.boundingBox())!.width,0);
  await visibleControlsFit(page);await expect(requests(page)).toHaveCount(0);
  if(width===375||width===1440)await page.screenshot({path:testInfo.outputPath('consent-'+language+'-'+width+'.png'),scale:'css'});
  await page.evaluate(()=>window.scrollTo({top:document.documentElement.scrollHeight,behavior:'instant'}));
  await expect.poll(()=>page.evaluate(()=>scrollY)).toBeGreaterThan(200);
  const after=(await card(page).boundingBox())!;expect(after.x).toBeCloseTo(before.x,0);expect(after.y).toBeCloseTo(before.y,0);
  await expect(card(page)).toBeVisible();await visibleControlsFit(page);
  await page.locator('[data-analytics-options]').click();await expect(page.locator('[data-analytics-toggle]')).not.toBeChecked();
  await expect(page.locator('[data-analytics-options-panel] .consent-category')).toHaveCount(2);
  await expect(page.locator('.consent-always')).toHaveText(language==='fr'?'Toujours actif':'Always active');
  await expect(page.locator('[data-analytics-save]')).toHaveText(language==='fr'?'Enregistrer les préférences':'Save preferences');
  await visibleControlsFit(page);
  // Footer navigation can be brought above the card without granting analytics.
  const policy=page.locator('footer a[href="'+(language==='fr'?'/fr':'')+'/privacy/"]');await expect(policy).toHaveCount(1);
  await policy.click();await expect(page).toHaveURL(new RegExp((language==='fr'?'/fr':'')+'/privacy/$'));
  await expect(card(page)).toBeVisible();await expect(requests(page)).toHaveCount(0);
 });
});

test.describe('preference decisions and access',()=>{
 test.use({viewport:{width:375,height:844},reducedMotion:'reduce'});
 test('options are pending until Save; saved grant and withdrawal survive EN/FR navigation',async({page,context})=>{
  await page.goto('/');await expect(card(page)).toBeVisible();await page.locator('[data-analytics-options]').click();
  const toggle=page.locator('[data-analytics-toggle]');await expect(toggle).not.toBeChecked();await toggle.check();await expect(requests(page)).toHaveCount(0);
  await page.locator('[data-analytics-back]').click();await expect(card(page)).toBeVisible();await expect(requests(page)).toHaveCount(0);
  await page.locator('[data-analytics-options]').click();await expect(toggle).not.toBeChecked();
  await page.locator('[data-analytics-save]').click();await expect(card(page)).toBeHidden();await expect(requests(page)).toHaveCount(0);
  expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('agl-analytics-consent')!).choice)).toBe('denied');
  await open(page);await page.locator('[data-analytics-options]').click();await toggle.check();await page.locator('[data-analytics-save]').click();
  await expect(card(page)).toBeHidden();await expect(requests(page)).toHaveCount(1);
  await page.goto('/fr/gear/');await expect(page.locator('[data-analytics-open]')).toBeEnabled();await expect(card(page)).toBeHidden();await expect(requests(page)).toHaveCount(1);
  await open(page);await page.locator('[data-analytics-options]').click();await expect(toggle).toBeChecked();await toggle.uncheck();
  await page.evaluate(()=>{document.cookie='_ga=synthetic;path=/';document.cookie='_ga_YFJJ5N9RBX=synthetic;path=/';});
  await Promise.all([page.waitForEvent('load'),page.locator('[data-analytics-save]').click()]);
  await expect(page.locator('[data-analytics-open]')).toBeEnabled();await expect(card(page)).toBeHidden();await expect(requests(page)).toHaveCount(0);
  expect((await context.cookies()).filter(cookie=>/^_ga/.test(cookie.name))).toEqual([]);
  expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('agl-analytics-consent')!).choice)).toBe('denied');
 });
 test('a pending choice remains visible after native navigation and Escape cannot dismiss it',async({page})=>{
  await page.goto('/');await expect(card(page)).toBeVisible();await page.locator('[data-analytics-options]').click();
  await page.keyboard.press('Escape');await expect(card(page)).toBeVisible();await expect(page.locator('[data-analytics-options]')).toBeFocused();
  await page.keyboard.press('Escape');await expect(card(page)).toBeVisible();
  await page.locator('header .brand').click();await expect(card(page)).toBeVisible();
  expect(await page.evaluate(()=>localStorage.getItem('agl-analytics-consent'))).toBe(null);await expect(requests(page)).toHaveCount(0);
 });
 for(const language of ['en','fr'] as const)test(language+': keyboard, focus and WCAG checks in both card views',async({page})=>{
  await page.goto(language==='fr'?'/fr/':'/');await expect(card(page)).toBeVisible();
  const options=page.locator('[data-analytics-options]');await options.focus();await expect(options).toHaveCSS('outline-style','solid');await expect(options).toHaveCSS('outline-width','3px');
  expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations).toEqual([]);
  await page.keyboard.press('Enter');const toggle=page.locator('[data-analytics-toggle]');await expect(toggle).toBeFocused();
  expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations).toEqual([]);
  await page.keyboard.press('Tab');await expect(page.locator('[data-analytics-save]')).toBeFocused();await page.keyboard.press('Enter');
  await expect(card(page)).toBeHidden();await expect(page.locator('main')).toBeFocused();
  const opener=page.locator('[data-analytics-open]');await opener.focus();await page.keyboard.press('Enter');await expect(page.locator('[data-analytics-choice="granted"]')).toBeFocused();
  await page.keyboard.press('Tab');await expect(page.locator('[data-analytics-choice="denied"]')).toBeFocused();await page.keyboard.press('Enter');await expect(opener).toBeFocused();
 });
 test('short landscape options scroll internally while decision buttons remain reachable',async({page},testInfo)=>{
  await page.setViewportSize({width:390,height:320});await page.goto('/fr/');await expect(card(page)).toBeVisible();await page.locator('[data-analytics-options]').click();
  await visibleControlsFit(page);
  expect(await page.locator('.consent-content').evaluate(element=>element.scrollHeight>element.clientHeight)).toBe(true);
  await page.locator('[data-analytics-toggle]').check();await visibleControlsFit(page);await expect(requests(page)).toHaveCount(0);
  await page.screenshot({path:testInfo.outputPath('consent-fr-landscape.png'),scale:'css'});
 });
});
