import {test,expect} from './fixtures';
import {mkdirSync} from 'node:fs';

test('ReadyWise yogurt-version profile states declared nutrition and keeps the exact Canadian CTA at mobile and desktop sizes',async({page})=>{
  const id='readywise-84-servings-emergency-food-bucket';
  for(const width of [375,1440]){
    await page.setViewportSize({width,height:900});await page.goto(`/gear/${id}/`);
    await expect(page.locator('h1')).toHaveText('ReadyWise 84 Servings Gluten-Free Emergency Food Supply Bucket');
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content','noindex, nofollow');
    const specs=page.getByRole('region',{name:'ReadyWise 84 Servings Gluten-Free Emergency Food Supply Bucket specifications',exact:true});
    await expect(specs).toContainText('13 pouches');await expect(specs).toContainText('84 servings are not 84 complete meals');
    await expect(specs).toContainText('15,420');await expect(specs).toContainText('110 kcal');
    expect(await specs.innerText()).not.toContain('15,180');
    await expect(page.locator('main')).toContainText('shared equipment processing milk, soy, wheat, egg and tree nuts');
    const purchase=page.locator('[data-product-purchase]'),button=purchase.locator('a[data-affiliate-click]');
    await expect(button).toHaveAttribute('href','https://www.amazon.ca/dp/B00TX5J74S?tag=apocalypsegear-20');
    await expect(button).toHaveAttribute('target','_blank');await expect(button).toHaveAttribute('rel','sponsored nofollow noopener');
    await expect(purchase.locator('[aria-disabled]')).toHaveCount(0);
    await expect(purchase).toContainText('As an Amazon Associate I earn from qualifying purchases.');
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    mkdirSync('.tools/qa/phase4-5',{recursive:true});
    await purchase.screenshot({path:`.tools/qa/phase4-5/purchase-${width}.png`,style:'header {visibility:hidden!important}'});
  }
});
