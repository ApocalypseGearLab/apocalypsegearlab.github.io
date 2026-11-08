# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: browser\phase6.spec.ts >> catalogue search, combined filters, empty state, reset and keyboard controls
- Location: .tools\release-review\tests\browser\phase6.spec.ts:6:1

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: getByRole('status')
Expected substring: "2 matching"
Error: strict mode violation: getByRole('status') resolved to 2 elements:
    1) <p role="status" aria-live="polite" aria-atomic="true" class="filter-status" data-catalogue-count="" data-astro-cid-2csvkgym="">2 matching equipment profiles · All sectors · All…</p> aka getByText('2 matching equipment profiles')
    2) <p role="status" aria-live="polite" data-analytics-status="" data-astro-cid-fg2vtww3="">Optional analytics is off until you allow it.</p> aka getByText('Optional analytics is off')

Call log:
  - Expect "toContainText" getByRole('status') with timeout 5000ms
  - waiting for getByRole('status')

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - link "Skip to content" [ref=e2] [cursor=pointer]:
    - /url: "#main"
  - banner [ref=e3]:
    - generic [ref=e5]:
      - link "ApocalypseGearLab home" [ref=e6] [cursor=pointer]:
        - /url: /
        - generic [ref=e8]: ApocalypseGearLab
      - group [ref=e9]:
        - generic "Choose language" [ref=e10] [cursor=pointer]:
          - generic [aria-hidden] [ref=e11]: ◎
          - generic [ref=e12]: English
          - generic [aria-hidden] [ref=e13]: ⌄
      - button "Menu" [ref=e14] [cursor=pointer]:
        - generic [aria-hidden] [ref=e15]: ☰
        - text: Menu
  - main [ref=e16]:
    - generic [ref=e17]:
      - navigation "Breadcrumb" [ref=e18]:
        - list [ref=e19]:
          - listitem [ref=e20]:
            - link "Home" [ref=e21] [cursor=pointer]:
              - /url: /
          - listitem [ref=e22]: / Gear catalogue
      - heading "Gear catalogue" [level=1] [ref=e23]
      - search "Find equipment" [ref=e24]:
        - generic [ref=e25]:
          - generic [ref=e26]: Search product names and brands
          - searchbox "Search product names and brands" [active] [ref=e27]: ecoflow
        - generic [ref=e28]:
          - generic [ref=e29]: Sector
          - combobox "Sector" [ref=e30]:
            - option "All sectors" [selected]
            - option "BLACKOUT"
            - option "FALLOUT"
            - option "OUTBREAK"
            - option "WHITEOUT"
        - generic [ref=e31]:
          - generic [ref=e32]: Equipment category
          - combobox "Equipment category" [ref=e33]:
            - option "All categories" [selected]
            - option "Emergency power stations"
            - option "Solar generators and panels"
            - option "Portable battery banks"
            - option "Emergency lighting"
            - option "Weather radios"
            - option "Backup communication"
            - option "Home power outage preparedness"
            - option "Portable refrigeration & freezers"
            - option "Temperature monitoring & food preservation"
            - option "Rechargeable batteries & charging accessories"
            - option "Water storage and purification"
            - option "Emergency food storage"
            - option "Emergency food rations"
            - option "Radiation detection"
            - option "Emergency repair tools"
            - option "First aid supplies"
            - option "Emergency shelter"
            - option "Emergency hygiene & sanitation"
            - option "Exploration & metal detection"
            - option "Evacuation backpacks"
            - option "Respiratory protection"
            - option "Protective eyewear"
            - option "Protective work gloves"
            - option "Hiking footwear"
            - option "Rain shells"
            - option "Satellite navigation and communication"
            - option "Outdoor & survival knives"
            - option "Optics & observation"
            - option "Winter sleeping pads & insulation"
            - option "Winter gloves & mitts"
            - option "Winter headwear & face layers"
            - option "Snow goggles & lens selection"
        - button "Clear filters" [ref=e34] [cursor=pointer]
        - status [ref=e35]: "2 matching equipment profiles · All sectors · All categories · Search: ecoflow"
      - region [ref=e36]:
        - heading "Plan around the services you need" [level=2] [ref=e37]
        - paragraph [ref=e38]: "Start with the tasks an outage or disruption could interrupt: lighting a room, charging communications, storing water or keeping essential supplies together. Choose equipment to fill a specific gap in your plan, then consider how it will be stored, maintained and carried. More equipment does not automatically make a kit more useful."
        - navigation "Equipment sectors" [ref=e39]:
          - list [ref=e40]:
            - listitem [ref=e41]:
              - link "BLACKOUT — power, lighting and communications" [ref=e42] [cursor=pointer]:
                - /url: /blackout/
            - listitem [ref=e43]:
              - link "FALLOUT — water, household supplies and disruption planning" [ref=e44] [cursor=pointer]:
                - /url: /fallout/
            - listitem [ref=e45]:
              - link "OUTBREAK — protective equipment, carrying systems and outdoor tools" [ref=e46] [cursor=pointer]:
                - /url: /outbreak/
            - listitem [ref=e47]:
              - link "WHITEOUT — winter ground insulation and emergency shelter" [ref=e48] [cursor=pointer]:
                - /url: /whiteout/
      - group [ref=e49]:
        - generic "Browse equipment categories" [ref=e50] [cursor=pointer]
      - heading "Equipment profiles" [level=2] [ref=e51]
      - generic [ref=e52]:
        - article [ref=e54]:
          - figure "Concept illustration, not a product photograph." [ref=e55]:
            - img "Concept illustration of an EcoFlow DELTA 2-style black and silver power station in an amber HUD frame; display readings and labels are illustrative" [ref=e56]
          - paragraph [ref=e58]: Blackout · Emergency power stations
          - paragraph [ref=e59]: EcoFlow · DELTA 2
          - heading [level=3] [ref=e60]:
            - link "EcoFlow DELTA 2 Portable Power Station" [ref=e61] [cursor=pointer]:
              - /url: /gear/ecoflow-delta-2-portable-power-station/
          - paragraph [ref=e62]: A 1024 Wh LiFePO4 station with 1800 W rated AC output for a measured blackout load plan. Solar panels and extra batteries are not established as part of this offer.
          - paragraph [ref=e64]: Listing documented by owner
          - paragraph [ref=e65]:
            - strong [ref=e66]: "Consider:"
            - text: 1800 W is shared across AC outlets; motor startup or combined loads can overload the station.
          - link "Product details for EcoFlow DELTA 2 Portable Power Station" [ref=e67] [cursor=pointer]:
            - /url: /gear/ecoflow-delta-2-portable-power-station/
            - text: Product details
            - generic [ref=e68]: for EcoFlow DELTA 2 Portable Power Station
          - generic [ref=e69]:
            - paragraph [ref=e70]: Amazon.ca link available
            - complementary "Affiliate disclosure" [ref=e71]:
              - paragraph [ref=e72]:
                - text: As an Amazon Associate I earn from qualifying purchases.
                - link "Full disclosure" [ref=e73] [cursor=pointer]:
                  - /url: /affiliate-disclosure/
                - text: .
            - link "View on Amazon.ca (affiliate link, opens in a new tab)" [ref=e74] [cursor=pointer]:
              - /url: https://www.amazon.ca/dp/B0B9XB57XM?tag=apocalypsegear-20
              - text: View on Amazon.ca
              - generic [ref=e75]: (affiliate link, opens in a new tab)
        - article [ref=e77]:
          - figure "Concept illustration, not a product photograph." [ref=e78]:
            - img "Concept illustration of a grey and black EcoFlow power station in an amber frame" [ref=e79]
          - paragraph [ref=e81]: Blackout · Emergency power stations
          - paragraph [ref=e82]: EcoFlow
          - heading [level=3] [ref=e83]:
            - link "EcoFlow RIVER 2 Pro" [ref=e84] [cursor=pointer]:
              - /url: /gear/ecoflow-river-2-pro/
          - paragraph [ref=e85]: A 768 Wh LiFePO4 power station with 800 W rated AC output for lights, communications and a carefully limited set of essential devices.
          - paragraph [ref=e86]:
            - strong [ref=e87]: "Consider:"
            - text: The 800 W continuous limit constrains appliance selection.
          - generic [ref=e88]:
            - paragraph [ref=e89]: Amazon link pending verification
            - paragraph [ref=e90]: The requested B0BVLPGS79 public representation still selects B0D2HX1ZS9 and displays model EFR620 but manufacturer part EFR617.
            - link "Details about EcoFlow RIVER 2 Pro" [ref=e91] [cursor=pointer]:
              - /url: /gear/ecoflow-river-2-pro/
              - text: Details
              - generic [ref=e92]: about EcoFlow RIVER 2 Pro
      - region [ref=e93]:
        - heading "Read a profile before choosing" [level=2] [ref=e94]
        - list [ref=e95]:
          - listitem [ref=e96]:
            - strong [ref=e97]: Match the specification to the job.
            - text: Stored battery energy in Wh differs from output power in W. A panel's rated watts do not guarantee its charging yield. Compare the units and limits relevant to your intended use.
          - listitem [ref=e98]:
            - strong [ref=e99]: Read limitations alongside advantages.
            - text: Check operating conditions, compatible components and safety cautions. An accessory or protective component is useful only within its documented configuration.
          - listitem [ref=e100]:
            - strong [ref=e101]: Check the exact Canadian offer.
            - text: Match the model, revision, quantity, included accessories and seller terms before purchase. Illustrations are visual references, not proof of package contents or certification.
        - paragraph [ref=e102]:
          - text: Profiles distinguish manufacturer documentation, retailer references and unresolved questions. An informational profile or an available buying link is not a hands-on test, product endorsement or completed safety approval. Consult the sources and buying checks on each profile, read
          - link "how we research equipment" [ref=e103] [cursor=pointer]:
            - /url: /how-we-research/
          - text: and our
          - link "affiliate disclosure" [ref=e104] [cursor=pointer]:
            - /url: /affiliate-disclosure/
          - text: .
  - contentinfo [ref=e105]:
    - generic [ref=e106]:
      - generic [ref=e107]:
        - paragraph [ref=e108]: ApocalypseGearLab
        - paragraph [ref=e109]: Independent preparedness research. Product recommendations are published only after editorial research.
        - paragraph [ref=e110]: As an Amazon Associate I earn from qualifying purchases.
      - navigation "Footer" [ref=e111]:
        - list [ref=e112]:
          - listitem [ref=e113]:
            - link "Blackout" [ref=e114] [cursor=pointer]:
              - /url: /blackout/
          - listitem [ref=e115]:
            - link "Fallout" [ref=e116] [cursor=pointer]:
              - /url: /fallout/
          - listitem [ref=e117]:
            - link "Outbreak" [ref=e118] [cursor=pointer]:
              - /url: /outbreak/
          - listitem [ref=e119]:
            - link "Whiteout" [ref=e120] [cursor=pointer]:
              - /url: /whiteout/
          - listitem [ref=e121]:
            - link "Gear catalogue" [ref=e122] [cursor=pointer]:
              - /url: /gear/
          - listitem [ref=e123]:
            - link "How we research" [ref=e124] [cursor=pointer]:
              - /url: /how-we-research/
          - listitem [ref=e125]:
            - link "Affiliate disclosure" [ref=e126] [cursor=pointer]:
              - /url: /affiliate-disclosure/
          - listitem [ref=e127]:
            - link "Privacy policy" [ref=e128] [cursor=pointer]:
              - /url: /privacy/
    - paragraph [ref=e130]: © 2026 ApocalypseGearLab
    - group [ref=e132]:
      - generic "Analytics preferences" [ref=e133] [cursor=pointer]
      - paragraph [ref=e134]: Optional Google Analytics helps us understand page visits and equipment-link clicks. It may use cookies and send device and usage information to Google. It stays off unless you allow it. Your choice does not affect navigation or Amazon.ca links.
      - status [ref=e135]: Optional analytics is off until you allow it.
      - generic [ref=e136]:
        - button "Allow analytics" [ref=e137] [cursor=pointer]
        - button "Continue without analytics" [ref=e138] [cursor=pointer]
      - paragraph [ref=e139]:
        - link "Read the privacy policy" [ref=e140] [cursor=pointer]:
          - /url: /privacy/
        - text: . You can change your choice here at any time.
      - paragraph [ref=e141]: Without JavaScript, optional analytics stays off.
```

# Test source

```ts
  1   | import { test, expect } from './fixtures';
  2   | import AxeBuilder from '@axe-core/playwright';
  3   | import { mkdirSync, writeFileSync } from 'node:fs';
  4   | import sharp from 'sharp';
  5   | 
  6   | test('catalogue search, combined filters, empty state, reset and keyboard controls', async ({ page }) => {
  7   |   await page.addInitScript(() => {
  8   |     (window as any).__catalogueCLS = 0;
  9   |     new PerformanceObserver(list => { for (const entry of list.getEntries() as any[]) if (!entry.hadRecentInput) (window as any).__catalogueCLS += entry.value; }).observe({ type: 'layout-shift', buffered: true });
  10  |   });
  11  |   await page.setViewportSize({ width: 375, height: 900 });
  12  |   await page.goto('/gear/');
  13  |   const visible = page.locator('[data-catalogue-entry]:visible');
  14  |   const search = page.getByRole('searchbox');
  15  |   await expect(visible).toHaveCount(52);
  16  |   await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  17  |   expect(await page.evaluate(() => (window as any).__catalogueCLS)).toBe(0);
  18  |   await search.fill('ecoflow');
  19  |   await expect(visible).toHaveCount(2);
> 20  |   await expect(page.getByRole('status')).toContainText('2 matching');
      |                                          ^ Error: expect(locator).toContainText(expected) failed
  21  |   await page.getByLabel('Sector', { exact: true }).selectOption('fallout');
  22  |   await expect(visible).toHaveCount(0);
  23  |   await expect(page.locator('[data-catalogue-empty]')).toBeVisible();
  24  |   await page.getByRole('button', { name: 'Clear filters' }).focus();
  25  |   await page.keyboard.press('Enter');
  26  |   await expect(visible).toHaveCount(52);
  27  |   await expect(search).toHaveValue('');
  28  |   await page.getByLabel('Equipment category', { exact: true }).selectOption('rechargeable-batteries');
  29  |   await expect(visible).toHaveCount(2);
  30  |   await search.fill('aaa');
  31  |   await expect(visible).toHaveCount(1);
  32  |   await expect(visible).toContainText('Panasonic');
  33  |   await expect(page.getByRole('status')).toContainText('1 matching equipment profile · All sectors');
  34  |   await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href', 'https://apocalypsegearlab.github.io/gear/');
  35  |   await page.getByRole('button', { name: 'Clear filters' }).click();
  36  |   await search.fill('[.*]');
  37  |   await expect(visible).toHaveCount(0);
  38  |   await page.getByText('Browse equipment categories', { exact: true }).click();
  39  |   await page.getByRole('navigation', { name: 'Equipment categories' }).getByRole('link', { name: 'Rain shells', exact: true }).click();
  40  |   await expect(visible).toHaveCount(1);
  41  |   await expect(search).toHaveValue('');
  42  |   await expect(page.getByLabel('Equipment category', { exact: true })).toHaveValue('rainwear');
  43  |   await page.getByRole('button', { name: 'Clear filters' }).click();
  44  |   await expect(visible).toHaveCount(52);
  45  |   const delay = await page.evaluate(() => {
  46  |     const input = document.querySelector<HTMLInputElement>('#gear-query')!;
  47  |     const start = performance.now();
  48  |     for (let i = 0; i < 30; i++) { input.value = i % 2 ? 'ecoflow' : ''; input.dispatchEvent(new Event('input', { bubbles: true })); }
  49  |     return (performance.now() - start) / 30;
  50  |   });
  51  |   mkdirSync('.tools/qa/phase6', { recursive: true });
  52  |   writeFileSync('docs/qa/phase6/filter-performance.json', JSON.stringify({ meanSynchronousFilterMs: delay, note: 'Local DOM processing measurement, not field INP' }, null, 2) + '\n');
  53  |   expect(delay).toBeLessThan(100);
  54  | });
  55  | 
  56  | test('catalogue and all hub guides keep working without JavaScript', async ({ browser }) => {
  57  |   const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 320, height: 900 } });
  58  |   const page = await context.newPage();
  59  |   await page.goto('http://127.0.0.1:4321/gear/');
  60  |   await expect(page.locator('article.card')).toHaveCount(52);
  61  |   await expect(page.locator('[data-catalogue-controls]')).toBeHidden();
  62  |   await page.getByText('Browse equipment categories', { exact: true }).click();
  63  |   await page.getByRole('navigation', { name: 'Equipment categories' }).getByRole('link', { name: 'Emergency power stations', exact: true }).click();
  64  |   await expect(page).toHaveURL(/#category-power-stations$/);
  65  |   await page.locator('[data-product-id="ecoflow-delta-2-portable-power-station"] .profile-details').click();
  66  |   await expect(page.locator('h1')).toContainText('DELTA 2');
  67  |   await page.locator('.planning-context a').first().click();
  68  |   await expect(page).toHaveURL(/blackout\/#planning-4$/);
  69  |   await expect(page.locator('[data-runtime-example]')).toContainText('80%');
  70  |   for (const sector of ['blackout', 'fallout', 'outbreak']) {
  71  |     await page.goto('http://127.0.0.1:4321/' + sector + '/');
  72  |     await expect(page.locator('[data-sector-guide] h3')).toHaveCount(sector === 'blackout' ? 8 : 7);
  73  |     await expect(page.getByRole('navigation', { name: 'In this preparedness guide' })).toBeVisible();
  74  |   }
  75  |   await context.close();
  76  | });
  77  | 
  78  | const captures = [
  79  |   ['home', '/'], ['catalogue', '/gear/'], ['blackout', '/blackout/'], ['fallout', '/fallout/'], ['outbreak', '/outbreak/'],
  80  |   ['methodology', '/how-we-research/'], ['power-profile', '/gear/ecoflow-delta-2-portable-power-station/'],
  81  |   ['fridge-profile', '/gear/bougerv-53-quart-portable-refrigerator-freezer/'], ['respirator-profile', '/gear/3m-6800-full-facepiece-respirator/'],
  82  | ] as const;
  83  | for (const [name, path] of captures) test(`Phase 6 ${name}: accessibility, six widths and review screenshots`, async ({ page }) => {
  84  |   test.setTimeout(120_000);
  85  |   mkdirSync('docs/qa/phase6/screenshots', { recursive: true });
  86  |   const rows = [];
  87  |   await page.goto(path);
  88  |   for (const width of [320, 375, 768, 1024, 1440, 1920]) {
  89  |     await page.setViewportSize({ width, height: 900 });
  90  |     expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  91  |     await expect(page.locator('h1')).toHaveCount(1);
  92  |     expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
  93  |     rows.push({ path, width, axeViolations: 0, horizontalOverflow: false });
  94  |     if (width === 375 || width === 1440) {
  95  |       await page.evaluate(async () => { await Promise.all([...document.images].map(async image => { image.loading = 'eager'; await image.decode().catch(() => {}); })); });
  96  |       const capture = await page.screenshot({ fullPage: name !== 'catalogue' });
  97  |       const dimensions = await sharp(capture).metadata();
  98  |       // WebP cannot exceed 16,383px in either dimension. Keep original text
  99  |       // size and split long mobile hubs into lossless-geometry review panels.
  100 |       for (let top = 0, part = 1; top < dimensions.height!; top += 12_000, part++) {
  101 |         await sharp(capture).extract({ left: 0, top, width: dimensions.width!, height: Math.min(12_000, dimensions.height! - top) }).webp({ quality: 75 }).toFile(`docs/qa/phase6/screenshots/${name}-${width}${part > 1 ? `-part${part}` : ''}.webp`);
  102 |       }
  103 |       if (name === 'catalogue') {
  104 |         await page.getByRole('searchbox').fill('ecoflow');
  105 |         await page.locator('[data-catalogue-controls]').scrollIntoViewIfNeeded();
  106 |         await sharp(await page.screenshot()).webp({ quality: 75 }).toFile(`docs/qa/phase6/screenshots/catalogue-filtered-${width}.webp`);
  107 |         await page.getByRole('button', { name: 'Clear filters' }).click();
  108 |         await page.evaluate(() => scrollTo(0, 0));
  109 |       }
  110 |     }
  111 |   }
  112 |   writeFileSync(`docs/qa/phase6/${name}-responsive.json`, JSON.stringify(rows, null, 2) + '\n');
  113 | });
  114 | 
```