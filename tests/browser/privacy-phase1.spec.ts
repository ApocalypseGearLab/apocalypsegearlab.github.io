import {test,expect} from './fixtures';
import AxeBuilder from '@axe-core/playwright';
const key='agl-analytics-consent';
const rows=(page:any)=>page.evaluate(()=>((window as any).dataLayer??[]).map((r:any)=>Array.from(r)));
const open=async(page:any)=>{if(!await page.locator('[data-analytics-consent]').isVisible())await page.locator('[data-analytics-open]').click();};
const grant=async(page:any)=>{await open(page);await page.locator('[data-analytics-choice="granted"]').click();};
const deny=async(page:any)=>{await open(page);await page.locator('[data-analytics-choice="denied"]').click();};

test('default and rejection send no Google requests; native affiliate navigation works independently',async({page,context})=>{
 const google:string[]=[];page.on('request',r=>{if(/google|doubleclick/.test(new URL(r.url()).hostname))google.push(r.url());});
 await context.route('https://www.amazon.ca/**',r=>r.fulfill({body:'Isolated retailer'}));
 await page.goto('/gear/midland-er310/?private=query#private');
 await expect(page.locator('[data-analytics-choice="granted"]')).toBeEnabled();
 await expect(page.locator('[data-analytics-loader]')).toHaveCount(0);
 expect(google).toEqual([]);expect(await rows(page)).toEqual([]);
 const link=page.locator('[data-product-purchase] a[data-affiliate-click]');
 for(const rejected of [false,true]){
  if(rejected)await deny(page);
  const opened=context.waitForEvent('page');await link.click();const popup=await opened;
  await expect(popup).toHaveURL('https://www.amazon.ca/dp/B015QIC1PW?tag=apocalypsegear-20');
  expect(await popup.evaluate(()=>window.opener===null)).toBe(true);await popup.close();
  expect(await rows(page)).toEqual([]);expect(google).toEqual([]);
 }
 expect((await context.cookies()).filter(c=>/^_ga/.test(c.name))).toEqual([]);
 await page.reload();await expect(page.locator('[data-analytics-status]')).toHaveText('Optional analytics is off.');
 await expect(page.locator('[data-analytics-loader]')).toHaveCount(0);
});

test('explicit grant queues one config, persists across EN/FR, and withdrawal removes cookies and unloads analytics',async({page,context})=>{
 await page.goto('/?private=query#secret');await grant(page);
 await expect(page.locator('[data-analytics-loader]')).toHaveCount(1);
 await grant(page);await expect(page.locator('[data-analytics-loader]')).toHaveCount(1);
 const commands=await rows(page),configs=commands.filter((r:any)=>r[0]==='config');expect(configs).toHaveLength(1);
 expect(configs[0][1]).toBe('G-YFJJ5N9RBX');expect(configs[0][2]).toMatchObject({cookie_expires:15552000,cookie_update:false,allow_google_signals:false,allow_ad_personalization_signals:false});
 expect(configs[0][2].page_location).not.toContain('?');expect(configs[0][2].page_location).not.toContain('#');
 expect(commands.filter((r:any)=>r[0]==='consent').map((r:any)=>r[2].ad_storage)).toEqual(['denied','denied']);
 await page.goto('/fr/privacy/');await expect(page.locator('[data-analytics-loader]')).toHaveCount(1);
 await expect(page.locator('[data-analytics-status]')).toContainText('activée');
 await page.evaluate(()=>{document.cookie='_ga=synthetic;path=/';document.cookie='_ga_YFJJ5N9RBX=synthetic;path=/';});
 const navigation=page.waitForEvent('load');await deny(page);await navigation;
 await expect(page.locator('[data-analytics-loader]')).toHaveCount(0);
 expect(await rows(page)).toEqual([]);expect((await context.cookies()).filter(c=>/^_ga/.test(c.name))).toEqual([]);
 await page.goto('/gear/midland-er310/');await expect(page.locator('[data-analytics-loader]')).toHaveCount(0);
});

test('expired or malformed choices fail closed; storage failure cannot enable analytics',async({page})=>{
 await page.addInitScript(()=>{
  localStorage.setItem('agl-analytics-consent',JSON.stringify({version:1,choice:'granted',updatedAt:Date.now()-181*86400000}));
  sessionStorage.setItem('agl-analytics-consent','invalid');
 });
 await page.goto('/');await expect(page.locator('[data-analytics-choice="granted"]')).toBeEnabled();
 await expect(page.locator('[data-analytics-loader]')).toHaveCount(0);
 await page.evaluate(()=>{Object.defineProperty(window,'localStorage',{get(){throw new Error('blocked');}});Object.defineProperty(window,'sessionStorage',{get(){throw new Error('blocked');}});});
 await deny(page);await expect(page.locator('[data-analytics-loader]')).toHaveCount(0);
 await grant(page);await expect(page.locator('[data-analytics-loader]')).toHaveCount(1);
});

test('cross-tab withdrawal overrides a session grant',async({page,context})=>{
 await page.goto('/');await grant(page);const other=await context.newPage();await other.goto('/privacy/');
 await expect(other.locator('[data-analytics-loader]')).toHaveCount(1);
 await deny(page);await expect(other.locator('[data-analytics-loader]')).toHaveCount(0);
 expect(await other.evaluate(key=>JSON.parse(sessionStorage.getItem(key)!).choice,key)).toBe('denied');await other.close();
});

test('final privacy policies and keyboard-operable choices retain bilingual accessibility',async({page},testInfo)=>{
 for(const route of ['/privacy/','/fr/privacy/']){
  await page.goto(route);await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content','noindex, nofollow');
  await expect(page.locator('h1')).toHaveCount(1);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  const policy=page.locator('.privacy-policy');
  await expect(policy).toContainText(route.startsWith('/fr/')?'depuis le Québec, au Canada':'operated from Quebec, Canada');
  await expect(policy).toContainText(route.startsWith('/fr/')?'La mesure améliorée est activée pour les pages vues, les défilements, les clics sortants, les recherches sur le site, les interactions avec les formulaires, l’engagement vidéo et les téléchargements de fichiers':'Enhanced measurement is enabled for page views, scrolls, outbound clicks, site search, form interactions, video engagement and file downloads');
  await expect(policy).toContainText(route.startsWith('/fr/')?'la détection automatique des adresses courriel, des numéros de téléphone, des noms et des adresses, est désactivée':'automatic detection of email addresses, phone numbers, names and addresses, is disabled');
  await expect(policy).toContainText(route.startsWith('/fr/')?'Le masquage des adresses courriel est activé, mais il ne garantit pas':'Email-address redaction is enabled, but it is not a guarantee');
  await expect(policy).toContainText(route.startsWith('/fr/')?'La collecte d’événements Universal Analytics est désactivée':'Universal Analytics event collection is disabled');
  await expect(policy).toContainText(route.startsWith('/fr/')?'Aucun lien Google Ads n’est configuré dans cette propriété GA4':'There are no Google Ads links in this GA4 property');
  await expect(policy).toContainText(route.startsWith('/fr/')?'L’unique exploitant agit à titre de Responsable de la protection des renseignements personnels':'The sole operator serves as Privacy Officer');
  await expect(policy).toContainText(route.startsWith('/fr/')?'examine personnellement les demandes d’accès, de correction, de retrait du consentement et de suppression':'personally reviews requests for access, correction, withdrawal of consent and deletion');
  await expect(policy).toContainText(route.startsWith('/fr/')?'chacune réglées à 2 mois':'each set to 2 months');
  await expect(policy).toContainText(route.startsWith('/fr/')?'une nouvelle activité ne renouvelle donc pas la période de conservation de l’identifiant utilisateur':'new activity does not renew the user-identifier retention period');
  await expect(policy).toContainText(route.startsWith('/fr/')?'ils ne limitent pas les rapports agrégés standards':'they do not limit standard aggregated reports');
  await expect(policy).toContainText(route.startsWith('/fr/')?'Les durées de 180 jours des témoins et des préférences du site sont distinctes':'The site’s 180-day cookie and preference durations are separate');
  await expect(policy).toContainText(route.startsWith('/fr/')?'Les quatre paramètres facultatifs de partage des données du compte sont désactivés':'All four optional account data-sharing settings are disabled');
  await expect(policy).toContainText(route.startsWith('/fr/')?'produits et services Google, contributions à la modélisation et renseignements commerciaux, soutien technique et recommandations pour votre entreprise':'Google products & services, Modeling contributions & business insights, Technical support, and Recommendations for your business');
  await expect(policy).toContainText(route.startsWith('/fr/')?'Google traite toujours les données pour fournir, maintenir et protéger Analytics':'Google still processes data to provide, maintain and protect Analytics');
  await expect(policy).toContainText(route.startsWith('/fr/')?'distincts des produits explicitement associés et des destinations de la balise Google':'separate from explicitly linked products and Google-tag destinations');
  await expect(policy.locator('[data-privacy-contact-pending]')).toHaveCount(0);
  await expect(policy).not.toContainText(/draft|pending.approval|projet|en attente de l’approbation/i);
  const contact=policy.locator('a[data-privacy-contact]');
  await expect(contact).toHaveText('apocalypsegearlab@gmail.com');
  await expect(contact).toHaveAttribute('href','mailto:apocalypsegearlab@gmail.com');
  expect(await contact.getAttribute('data-affiliate-click')).toBeNull();
  expect(await contact.getAttribute('data-source-click')).toBeNull();
  await expect(policy.locator('form,address,a[href^="tel:"]')).toHaveCount(0);
  await expect(policy).toContainText(route.startsWith('/fr/')?'Cette adresse est réservée aux demandes de confidentialité':'This address is reserved for privacy requests');
  await expect(policy).toContainText(route.startsWith('/fr/')?'Il n’efface pas les renseignements déjà reçus par Google.':'It does not erase information already received by Google.');
  await open(page);
  const allow=page.locator('[data-analytics-choice="granted"]');await allow.focus();await page.keyboard.press('Enter');await expect(allow).toHaveAttribute('aria-pressed','true');
  await open(page);
  const button=page.locator('[data-analytics-choice="denied"]');const reloaded=page.waitForEvent('load');await button.focus();await page.keyboard.press('Enter');await reloaded;await expect(page.locator('[data-analytics-loader]')).toHaveCount(0);
  await page.locator('[data-analytics-open]').focus();await page.keyboard.press('Enter');await expect(button).toBeVisible();
  expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations).toEqual([]);
  await page.screenshot({path:testInfo.outputPath(route.startsWith('/fr/')?'privacy-fr.png':'privacy-en.png'),fullPage:true,scale:'css'});
 }
});

test('JavaScript disabled leaves Google off and privacy/retailer links native',async({browser,baseURL})=>{
 const context=await browser.newContext({javaScriptEnabled:false});const page=await context.newPage();
 await page.goto(baseURL+'/gear/midland-er310/');await expect(page.locator('script[src*="googletagmanager"]')).toHaveCount(0);
 await expect(page.locator('footer a[href="/privacy/"]')).toHaveCount(2);
 await expect(page.locator('[data-product-purchase] a[data-affiliate-click]')).toHaveAttribute('href','https://www.amazon.ca/dp/B015QIC1PW?tag=apocalypsegear-20');await context.close();
});

test('clearing storage in another tab also revokes an existing document grant',async({page,context})=>{
 await page.goto('/');await grant(page);const other=await context.newPage();await other.goto('/privacy/');
 await expect(other.locator('[data-analytics-loader]')).toHaveCount(1);await other.evaluate(()=>localStorage.clear());
 await expect(page.locator('[data-analytics-loader]')).toHaveCount(0);
 expect(await page.evaluate(()=>sessionStorage.getItem('agl-analytics-consent'))).toBe(null);await other.close();
});


test('EN/FR footer privacy links reach the final localized policy without enabling analytics',async({page})=>{
 const google:string[]=[];page.on('request',request=>{if(/google|doubleclick/.test(new URL(request.url()).hostname))google.push(request.url());});
 for(const prefix of ['', '/fr'])for(const source of ['/', '/gear/', '/privacy/']){
  await page.goto(prefix+source);
  await expect(page.locator('[data-analytics-choice="granted"]')).toBeEnabled();
  const links=page.locator('footer a[href="'+prefix+'/privacy/"]');
  await expect(links).toHaveCount(1);
  await expect(page.locator('[data-analytics-consent] a[href="'+prefix+'/privacy/"]')).toHaveCount(1);
  await links.first().click();
  await expect(page).toHaveURL(new RegExp(prefix+'/privacy/$'));
  await expect(page.locator('html')).toHaveAttribute('lang',prefix?'fr-CA':'en-CA');
  await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href','https://apocalypsegearlab.github.io'+prefix+'/privacy/');
  await expect(page.locator('link[rel=alternate][hreflang="en-CA"]')).toHaveAttribute('href','https://apocalypsegearlab.github.io/privacy/');
  await expect(page.locator('link[rel=alternate][hreflang="fr-CA"]')).toHaveAttribute('href','https://apocalypsegearlab.github.io/fr/privacy/');
  await expect(page.locator('[data-privacy-contact]')).toHaveAttribute('href','mailto:apocalypsegearlab@gmail.com');
  await expect(page.locator('[data-analytics-loader]')).toHaveCount(0);expect(await rows(page)).toEqual([]);
 }
 expect(google).toEqual([]);
});
