# Remove two repetitive product-card labels globally

Implemented on `feat/whiteout-phase2` in the existing `tmp/whiteout-phase2` worktree, November 7, 2026.

`ProductCard.astro` now suppresses these two exact card messages before localization:

- **Information only · Manufacturer sources cited** / **À titre informatif · Sources du fabricant citées**
- **Listing not independently verified** / **Offre non vérifiée indépendamment**

The shared renderer covers BLACKOUT, FALLOUT, OUTBREAK and WHITEOUT, including the main catalogue, universe collections and related-product cards. Other status messages retain their existing behavior. An empty verification wrapper is omitted when neither remaining row is needed. No CSS, layout system or dictionary changes were required.

Descriptions, titles, images, specifications and any existing prices are unchanged. Detailed product verification statements, manufacturer sources and evidence remain available. Product records, approval states, eligibility and automatic affiliate activation are unchanged. The Amazon Associates disclosure, GA4 events, affiliate destinations, buttons and safety notes are preserved, including the XTherm **Do not use below −20 °C** warning before purchase.

## Validation

- Production build: **122 pages**, 61 per language.
- Unit tests: **131 passed**, no failures.
- Type check: **0 errors, warnings or hints**.
- `npm run test:site`: site, four-universe, bilingual/SEO and WHITEOUT preservation audits passed.
- `node scripts/verify-product-card-labels.mjs`: **502 card instances** across all 122 built pages, all four universes and both languages; neither requested label appears, and no empty review wrappers remain. All **14 rendered XTherm card warnings** remain before their unchanged affiliate links.
- `npm run audit:affiliate`: **47 active / 5 held**, no invalid URLs, duplicates or undocumented holds.
- `npm run audit:verification`, `npm run release:check`, `npm run test:conversion`: passed; existing safety/publication and purchase decisions unchanged.
- An independent semantic before/after comparison confirms the only rendered card changes are the two requested label removals and resulting empty-wrapper removal: **664 label instances removed**, all remaining card content identical. Affiliate buttons, purchase sections, SEO metadata/structured data and **104 detailed verification blocks** are identical.
- All **53 product JSON files**, every other pre-existing source/media/dictionary file outside the three listed modifications, and the unrelated original-checkout `UniverseHero.astro` edit retain their original hashes.
- Focused browser tests: **22 passed** (11 Chromium, 11 WebKit), with no failures, skips or flaky results. Final results and exact file inventory are recorded in [results.json](qa/global-card-labels/results.json). Coverage includes English/French catalogues and all four universes, retained detailed verification, WHITEOUT responsive/disclosure/safety/GA4 tests at 320/375/768/1440 px, and no-JavaScript native links.

The browser invocation uses a temporary configuration on preview port 4323, leaving the existing local development server on 4322: `npx playwright test --config tmp/global-card-labels-playwright.config.ts --grep 'all cards and profiles|WHITEOUT compact|WHITEOUT concise' --reporter=json`. The updated regression also remains part of the normal browser test suite. An initial discovery error from JSON import attributes in the test harness was corrected by using its existing file-reading approach; no site-code workaround was needed. The unrelated full browser and product-fixture build suites were not rerun for this targeted presentation change.

## Files changed for this request

- `src/components/ProductCard.astro` — suppress only the two requested labels and omit an empty wrapper.
- `tests/browser/product-verification.spec.ts` — verify absence throughout both catalogues and all four universes, while retaining other status, link and detailed-profile assertions.
- `scripts/verify-product-card-labels.mjs` — audit every built card, language and universe and retain the XTherm warning/link check.
- `scripts/whiteout-phase2-preservation.mjs` — project only the exact reviewed label-removal hunks before existing protected-baseline checks; original baseline hashes are unchanged.
- This report and `docs/qa/global-card-labels/{source-changes,preservation,results}.json` — reviewed source hunks, independent preservation checks and final validation/inventory.

No remaining implementation issues were found. Existing safety/publication restrictions remain in force. All preceding WHITEOUT work and unrelated changes are preserved. Nothing was staged, committed, pushed, merged or deployed.
