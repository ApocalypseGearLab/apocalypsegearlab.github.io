import {test,expect} from '@playwright/test';
import {readFileSync,mkdirSync,writeFileSync} from 'node:fs';

const decisions={
  'fnirsi-gc-01-geiger-counter':['B0BHH9X1WG',true],
  'readywise-84-servings-emergency-food-bucket':['B00TX5J74S',true],
  'sos-3600-calorie-emergency-food-rations':['B00W20PIHQ',true],
  'nanuk-904-first-aid-kit':['B0G3XYHL33',false],
  'ecoflow-river-2-pro':['B0BVLPGS79',false],
  'jackery-explorer-300':['B082TMBYR6',false],
  'midland-er310':['B015QIC1PW',true],
  'kidde-c3010-co-alarm':['B00FHW7PBS',false],
  'iniu-p62-20000mah-65w':['B0DB888L9F',false],
} as const;

for(const width of [320,375,768,1024,1440,1920])test(`Phase 4.4 compact pending cards, exact decisions and readable controls at ${width}px`,async({page})=>{
  test.setTimeout(60_000);
  await page.setViewportSize({width,height:900});await page.goto('/gear/');
  await expect(page.locator('article.card')).toHaveCount(29);
  await expect(page.locator('article.card a[data-affiliate-click]')).toHaveCount(21);
  await expect(page.locator('article.card [data-amazon-pending]')).toHaveCount(8);
  await expect(page.locator('article.card [aria-disabled]')).toHaveCount(0);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  for(const [id,[asin,active]] of Object.entries(decisions)){
    const card=page.locator(`article.card[data-product-id="${id}"]`),buy=card.locator('.card-purchase');
    await expect(card).toHaveCount(1);
    if(active){
      const a=buy.locator('a[data-affiliate-click]');await expect(a).toHaveAttribute('href',`https://www.amazon.ca/dp/${asin}?tag=apocalypsegear-20`);
      await expect(a).toHaveAttribute('target','_blank');await expect(a).toHaveAttribute('rel','sponsored nofollow noopener');
      await expect(buy.locator('[aria-label="Affiliate disclosure"]')).toContainText('As an Amazon Associate I earn from qualifying purchases.');
    }else{
      await expect(buy.locator('[data-amazon-pending]')).toHaveText('Amazon link pending verification');
      const details=buy.getByRole('link',{name:/Details about/});await expect(details).toHaveAttribute('href',`/gear/${id}/`);
      await expect(buy.locator('a[href*="amazon.ca"]')).toHaveCount(0);
      const p=JSON.parse(readFileSync(`src/data/products/${id}.json`,'utf8'));
      expect(await card.innerText()).not.toContain(p.research.affiliateReview.reason);
      expect(await buy.innerText()).not.toMatch(/3,690|15,180|109\/110|B0D2HX1ZS9|certification file/);
      expect(await buy.evaluate(el=>el.getBoundingClientRect().height)).toBeLessThan(115);
      expect(await buy.locator('[data-amazon-pending]').evaluate((el:HTMLElement)=>el.tabIndex)).toBe(-1);
    }
    if(width===375||width===1440){
      mkdirSync('.tools/qa/phase4-4/cards',{recursive:true});
      const img=card.locator('img');if(await img.count()){await img.scrollIntoViewIfNeeded();await img.evaluate((el:HTMLImageElement)=>el.decode());}
      await card.screenshot({path:`.tools/qa/phase4-4/cards/${id}-${width}.png`,style:'header { visibility: hidden !important; }'});
      if(id==='ecoflow-river-2-pro')writeFileSync(`.tools/qa/phase4-4/compare-position-${width}.json`,JSON.stringify(await card.evaluate(el=>({top:el.getBoundingClientRect().top+scrollY,left:el.getBoundingClientRect().left,width:el.getBoundingClientRect().width,height:el.getBoundingClientRect().height}))));
    }
  }
});

test('pending Details links work with the keyboard and keep complete hold explanations on the profiles',async({page})=>{
  test.setTimeout(60_000);await page.setViewportSize({width:375,height:900});
  for(const [id,[,active]]of Object.entries(decisions))if(!active){
    await page.goto('/gear/');const card=page.locator(`article.card[data-product-id="${id}"]`),details=card.locator('[data-pending-details]');
    await details.focus();await expect(details).toBeFocused();await page.keyboard.press('Enter');
    await expect(page).toHaveURL(new RegExp(`/gear/${id}/$`));
    const p=JSON.parse(readFileSync(`src/data/products/${id}.json`,'utf8'));
    await expect(page.locator('h1')).toHaveText(p.name);
    await expect(page.locator('[data-product-purchase]')).toContainText(p.research.affiliateReview.reason);
    await expect(page.locator('[data-product-purchase] a[data-affiliate-click]')).toHaveCount(0);
  }
});
