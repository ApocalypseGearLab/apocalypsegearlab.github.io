# WHITEOUT product-card cleanup — November 7, 2026

The six WHITEOUT cards now use concise English and Canadian French copy, a single standard image disclosure, existing details and affiliate controls, and a short relevant caution where needed. Fonts, sizes, colours, borders, image dimensions and button styles reuse the existing ProductCard and FNIRSI GC-01 reference. No product record, eligibility rule or detailed profile content was changed.

## Presentation changes

- Image captions on these six cards contain only **Conceptual illustration, not a product photograph.** / **Illustration conceptuelle, et non photographie du produit.** Long identity caveats remain on the detailed profiles, with the original media manifests unchanged.
- Removed card-only verification rows: **Information only · Manufacturer sources cited** / **À titre informatif · Sources du fabricant citées** and **Listing not independently verified** / **Offre non vérifiée indépendamment**. Detailed profiles retain their verification and source information. Other universes retain their existing card labels.
- Removed card purchase paragraphs beginning **Product page — confirm your variant on Amazon.** and **Owner-documented variant — confirm the current offer.**, with their long selection notes. Their complete original wording remains on the detailed product pages and in the evidence records.
- Replaced the beanie summary beginning **The linked Amazon option is Mink Heather / One Size, sold as Merino Sport 250. Manufacturer SW0SW956 specifications below describe the cited Black reference option…** with **The linked Amazon option is Mink Heather / One Size, sold as Merino Sport 250. A merino layer for a winter headwear kit.** French explicitly says **Vison chiné / taille unique**. The card makes no Black-variant claim.
- Removed the repeated **Consider:** prefix from the concise WHITEOUT cautions. The existing caution typography and accent border remain.
- XTherm’s repeated long identity/temperature explanation is replaced on the card by **Amazon warning: Do not use below −20 °C. R-value is not a safe air-temperature rating.** French: **Avertissement Amazon : ne pas utiliser sous −20 °C. La valeur R ne garantit pas une température de l’air sécuritaire.** It appears before the details link and purchase button. The complete manufacturer-pending warning remains unchanged on the profile.
- A WHITEOUT-only flex rule makes the existing automatic purchase spacing effective. Details, disclosures and buttons align within grid rows. There are no fixed card heights, truncated paragraphs or hidden warnings.

[copy-review.json](qa/whiteout-card-cleanup/copy-review.json) records the exact original and replacement captions, verification labels, purchase paragraphs, summaries and warnings for every card, language and before/after capture. [before.json](qa/whiteout-card-cleanup/before.json) and [after.json](qa/whiteout-card-cleanup/after.json) preserve the rendered card markup and measured heights.

## Six unchanged eligible destinations

| Product | Amazon.ca destination | Scope retained |
| --- | --- | --- |
| Outdoor Research Alti II | https://www.amazon.ca/dp/B0B67C7N9M?tag=apocalypsegear-20 | Product page; choose size/colour |
| Hestra Heli Ski | https://www.amazon.ca/dp/B00F1F08TM?tag=apocalypsegear-20 | Product page; choose size/colour |
| Oakley Flight Deck XM / M | https://www.amazon.ca/dp/B012Y896ZA?tag=apocalypsegear-20 | Owner-documented configuration; existing detailed caveats retained |
| Smartwool NTS AW15 250 | https://www.amazon.ca/dp/B002VGHX1A?tag=apocalypsegear-20 | Product page; legacy-reference limitations retained |
| Smartwool beanie | https://www.amazon.ca/dp/B0DK9VRQF2?tag=apocalypsegear-20 | Product page; Mink Heather / One Size |
| Therm-a-Rest XTherm NXT | https://www.amazon.ca/dp/B0CS54SN91?tag=apocalypsegear-20 | Product page; −20 °C prohibition retained |

All six buttons remain active under their previous decisions. No link was promoted to independently verified or to a different destination scope. The catalogue remains **47 active / 5 held**, with no invalid URLs, duplicate URLs/ASINs, incorrect tags or undocumented blocks. Native links, Amazon disclosures and GA4 affiliate-click fields remain intact. No live Amazon offer inspection is claimed.

## Screenshots and visual review

Fresh before/after screenshots compare actual local renders with the unchanged FNIRSI reference. Before captures cover English/French at 375 and 1440 px; after captures also cover 320 and 768 px. All six cards were inspected in both desktop grids; narrow beanie and XTherm captures confirm readable colour and warning text, with no horizontal overflow. The unchanged sticky header is hidden only during element screenshots so it cannot cover card content; the Astro development toolbar is also hidden in final after captures. Neither adjustment is shipped site CSS.

| View | Before | After |
| --- | --- | --- |
| French desktop grid | [Before](qa/whiteout-card-cleanup/screenshots/before-whiteout-grid-fr-1440.png) | [After](qa/whiteout-card-cleanup/screenshots/after-whiteout-grid-fr-1440.png) |
| English desktop grid | [Before](qa/whiteout-card-cleanup/screenshots/before-whiteout-grid-en-1440.png) | [After](qa/whiteout-card-cleanup/screenshots/after-whiteout-grid-en-1440.png) |
| French mobile beanie | [Before](qa/whiteout-card-cleanup/screenshots/before-smartwool-thermal-merino-reversible-cuffed-beanie-fr-375.png) | [After](qa/whiteout-card-cleanup/screenshots/after-smartwool-thermal-merino-reversible-cuffed-beanie-fr-375.png) |
| English mobile XTherm | [Before](qa/whiteout-card-cleanup/screenshots/before-therm-a-rest-neoair-xtherm-nxt-review-en-375.png) | [After](qa/whiteout-card-cleanup/screenshots/after-therm-a-rest-neoair-xtherm-nxt-review-en-375.png) |
| FNIRSI desktop reference | [Before](qa/whiteout-card-cleanup/screenshots/before-fnirsi-reference-en-1440.png) | [After](qa/whiteout-card-cleanup/screenshots/after-fnirsi-reference-en-1440.png) |

## Validation

The final machine-readable results and complete file inventory accompany this report under [docs/qa/whiteout-card-cleanup](qa/whiteout-card-cleanup/). Validation covers the production build, type checks, all existing unit tests, bilingual/site audits, image checks, affiliate and verification/safety audits, release policy, conversion checks, and focused Chromium/WebKit card regressions.

| Check | Final result |
| --- | --- |
| `npm run build` | Passed; 122 pages, 61 per language |
| `npm run check` | 0 errors, warnings or hints |
| `npm test` | 131 passed; 0 failed |
| `npm run test:site` | Passed; bilingual coverage, SEO, 12,162 internal references, 16 sitemap URLs and protected baselines |
| `npm run test:images` | Passed; original image hashes and deterministic WHITEOUT outputs preserved |
| `npm run audit:affiliate` | Passed; 47 active / 5 held, no invalid or duplicate destinations or undocumented blocks |
| `npm run audit:verification` and `npm run release:check` | Passed; previous publication and safety decisions preserved |
| `npm run test:conversion` | Passed; 277 CTA instances, no incorrect tags or non-Amazon purchase CTAs |
| Focused Chromium / WebKit | **24 passed**, 0 failed/skipped/flaky: 12 per browser |
| Independent output/source preservation and `git diff --check` | Passed |

The focused browser run used a temporary Playwright configuration on preview port 4323, preserving the user’s development server on 4322: `npx playwright test --config tmp/whiteout-card-playwright.config.ts --grep 'WHITEOUT compact|WHITEOUT concise|XTherm.*320px' --reporter=json`. The new regression file also runs through the normal Chromium `test:browser` configuration. A full unrelated browser suite was not rerun for this presentation-only change.

Initial validation caught a French decimal-format mismatch with the existing numeric-preservation rule, temporary `.astro` reference copies being included in type checking, and strict TypeScript return typing in the new test helper. All were corrected; final checks above are clean. Temporary reference copies now have a `.txt` suffix. No product or safety-policy changes were needed.

Browser regressions cover both languages at **320, 375, 768 and 1440 px** on WHITEOUT and the filtered catalogue: caption count, removed redundant text, accurate beanie colour, XTherm warning before purchase, unchanged affiliate destinations, native window opening, one GA4 event per click, row alignment, WCAG A/AA checks and no overflow. Separate no-JavaScript tests retain all six native links and the warning. The existing XTherm warning test is also exercised at 320 px in both languages and browsers. Retailer windows and Google network traffic are isolated; these tests do not generate real Amazon purchases or Google Analytics traffic.

An independent comparison of all **122 built pages** confirms unchanged SEO metadata, canonical/hreflang, structured data, affiliate destination lists and non-WHITEOUT card content (ignoring only generated Astro scoping attributes and inter-tag whitespace). All **53 product JSON records**, all image/media files, every pre-existing French entry, and unrelated source changes are preserved. [preservation.json](qa/whiteout-card-cleanup/preservation.json) records the branch, HEAD and file-preservation checks.

## Changed files and maintenance

- `src/components/ProductCard.astro`: optional concise WHITEOUT presentation, original shared controls, scoped alignment.
- `src/components/ProductImage.astro`: optional compact caption; default and detailed rendering preserved.
- `src/data/whiteout-card-copy.json`: six catalogue summaries and short cautions, separate from detailed/SEO records and commerce evidence.
- `src/i18n/fr-whiteout.json`: eleven additive translations; existing translations unchanged.
- `scripts/whiteout-phase2-preservation.mjs`: reverses only the exact documented cleanup hunks before the existing frozen-baseline audits; no baseline hashes were replaced.
- `tests/browser/whiteout-card-cleanup.spec.ts`: new card, accessibility, affiliate, analytics, responsive and no-JavaScript regressions.
- `tests/browser/xtherm-temperature-warning.spec.ts`: card assertions now require the short visible warning and unchanged destination; detailed-page assertions remain intact.
- This report and `docs/qa/whiteout-card-cleanup/*`: before/after screenshots, exact copy review, reviewed component hunks, preservation and final results/inventory.

Future products retain the full existing notices by default. A reviewed WHITEOUT card-copy entry opts into concise presentation; update it alongside reviewed identity/safety changes and supply matching dictionary entries. Card copy never activates a button: the existing shared evidence, affiliate and safety gates remain authoritative. Product details and SEO continue using the original product records.

No cleanup defects remain. Existing independent offer-verification and editorial/safety approvals remain pending where already documented. The XTherm restriction must remain until applicable written manufacturer clarification resolves it; this cleanup supplies no new temperature clearance. Automated desktop WebKit coverage is not a physical iPhone test. No additional cleanup screenshots accompanied the latest pasted text; fresh local captures provide the review evidence.

Work remains unstaged and uncommitted on `feat/whiteout-phase2`. No push, merge or deployment was performed. The local WHITEOUT development server remains available at http://127.0.0.1:4322/whiteout/.
