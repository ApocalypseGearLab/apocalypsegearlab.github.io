# Phase 2 — BLACKOUT affiliate drafts

Research date: **2026-10-24** (America/Toronto). This revision prepares eight source-documented product drafts. It does not approve products, activate Amazon Associates, publish a catalogue, merge a PR or deploy the site.

## 1. Repository audit

The remote was fetched before changes. `main` and the existing `content/blackout-affiliate-drafts-20261024` branch both pointed to `8372231ac4330b3e679d0489307fe96e7282c4fc`, the merge of foundation PR #2. No PR was open at the initial audit, and the content branch contained no work beyond `main`. That branch was reused, with no cherry-picks, duplicate commits or duplicate product records. Work never checked out or wrote to local `main`.

Reviewed the product directory, content configuration, product/affiliate libraries, site configuration and taxonomy, all existing components and routes, CSS, tests, Astro/package configuration, lockfile, and both workflows. Existing publication filtering, disclosure components, static SEO architecture and manual-only deployment were retained. The production routes remain unchanged.

## 2. Files created and modified

New JSON records in `src/data/products/`:

- `jackery-explorer-1000-v2.json`
- `ecoflow-river-2-pro.json`
- `jackery-explorer-300.json`
- `midland-er310.json`
- `fenix-cl26r-pro.json`
- `jackery-solarsaga-100w-air.json`
- `kidde-c3010-co-alarm.json`
- `iniu-p62-20000mah-65w.json`

New implementation/test files: `src/lib/product-schema.ts`, `src/lib/product-seo.ts`, `tests/catalog.test.ts`, `tests/browser/blackout.spec.ts`.

Modified: `src/content.config.ts`, `src/pages/gear/[slug].astro`, `src/pages/gear/index.astro`, `src/components/ProductCard.astro`, `src/components/AffiliateButton.astro`, `scripts/verify-site.mjs`, `package.json`, `.github/workflows/ci.yml`, `README.md`.

Documentation: this report, `docs/blackout-editorial-roadmap.md`, and `docs/research/recall-check-2026-10-24.json`.

No dependency was added, and `package-lock.json`, `src/config/site.ts`, `src/lib/affiliate.ts`, existing taxonomy, public routes, foundation tests, and the deployment workflow are unchanged. No supplied file was deleted. Product images remain null; the existing card now has a neutral SVG placeholder rather than an invented product photograph.

## 3–5. Product status, exact mappings and primary sources

All eight records have `reviewStatus: "draft"`, `testing: "not-tested"`, `lastVerified: null`, `research.checkedAt: "2026-10-24"`, `listingVerified: false` and `publicationApproved: false`. Source review is not hands-on testing or certification. Each JSON includes original English copy, sourced specifications, advantages, limitations, use cases, merchant notes, related research where appropriate, evidence references, unverified claims and publication blockers.

| Product / slug | Supplied ASIN | Model evidence and remaining question | Status |
| --- | --- | --- | --- |
| Jackery Explorer 1000 v2 / `jackery-explorer-1000-v2` | B0D7PPG25F | Manufacturer identifies JE-1000D; 1070 Wh, LiFePO4 and 1500 W rated AC documented. Canadian listing and labels still unverified. | Draft; review pending |
| EcoFlow RIVER 2 Pro / `ecoflow-river-2-pro` | B0BVLPGS79 | Canadian specifications document 768 Wh, LFP and 800 W rated AC. Exact model code on the selected unit remains unverified. | Draft; review pending |
| Jackery Explorer 300 / `jackery-explorer-300` | B082TMBYR6 | Original manual/support document 293.8 Wh and NCM; Canadian page also uses 291.84 Wh. Do not silently choose one revision or substitute a 300 Plus/v2/300D. | Draft; capacity/regional revision pending |
| Midland ER310 / `midland-er310` | B015QIC1PW | ER310, not ER310PRO. AM/FM, weather bands and multiple power sources documented. Support guide contains conflicting battery capacities. Canadian Weatheradio is discontinued. | Draft; battery revision and Canadian use case pending |
| Fenix CL26R Pro / `fenix-cl26r-pro` | B0CGKWX5YT | CL26R PRO documented, with a Gray Camo option in manufacturer/distributor information. Exact ASIN/colour/battery contents still pending. No CL26R or CL27R substitution. | Draft; listing match pending |
| Jackery SolarSaga 100 W Air / `jackery-solarsaga-100w-air` | B0FX8P4JST | Manual identifies JS-100H. Exact Amazon Air variant and delivered cables still require confirmation. | Draft; listing match pending |
| Kidde C3010 / `kidde-c3010-co-alarm` | B00FHW7PBS | Owner reports article/part 21010045. US C3010 data sheet contains that part; Canadian C3010-CA equivalence not established. | Draft; safety/compliance blocked |
| INIU P62 / `iniu-p62-20000mah-65w` | B0DB888L9F | Manufacturer identifies P62-E1. Canadian certification evidence and cable configuration remain unresolved. | Draft; safety review blocked |

Every `amazonCa.url` is exactly `https://www.amazon.ca/dp/<ASIN>?tag=apocalypsegear-20`, using its row's ASIN. Tests check all eight literal mappings, one tracking parameter, unique ASINs/slugs, category mapping to BLACKOUT and absence of the unrelated `kitchengearla-20` tag. No fixed prices, stock data, ratings, customer feedback or discounts were recorded. The owner-observed Kidde/INIU prices were deliberately not copied into product data.

All eight clean Amazon detail URLs were attempted with the browsing tool, but none could be retrieved. Therefore this work validates the supplied mapping and primary manufacturer documentation; it does **not** independently verify current seller identity, delivered revision, availability, redirect behaviour, commission attribution or live listing claims. The owner's text describing screenshots is treated as owner-provided evidence, not as screenshots inspected in this environment.

Primary references, also linked in each record:

- **Jackery 1000 v2:** [technical support](https://faq.jackery.com/hc/en-us/articles/52303615153051-Explorer-1000-V2-Basic-Information), [Canadian product/bundle](https://ca.jackery.com/products/jackery-explorer-1000-v2-portable-power-station).
- **EcoFlow:** [Canadian RIVER 2 Pro specifications](https://ca.ecoflow.com/products/river-2-pro-portable-power-station). The interactive manual page did not expose substantive text to the browsing tool, so it is not used as evidence for additional claims.
- **Jackery 300:** [original manual](https://r.jackery.net/productGuide/Jackery%20Explorer%20300%20user%20manual.pdf), [support](https://faq.jackery.com/hc/en-us/articles/52303678342683-Explorer-300-Basic-Information), [Canadian page](https://ca.jackery.com/products/explorer-300-portable-power-station).
- **Midland:** [ER310 guide](https://support.midlandusa.com/hc/en-us/articles/33020284947351-Midland-ER310-Emergency-Crank-Weather-Alert-Radio-Full-User-Guide), [ER310 FAQ](https://support.midlandusa.com/hc/en-us/articles/29999147473431-ER310-FAQs), [ECCC service notice](https://www.canada.ca/en/environment-climate-change/services/weatheradio.html).
- **Fenix:** [CL26R PRO manufacturer page](https://www.fenixlight.com/product/cl26r-pro/), [operating instructions and modes](https://www.fenixlighting.com/products/fenix-cl26r-pro-rechargeable-lantern). The 650-lumen figure is combined output; up to 408 hours is a mode-dependent maximum, not operation at 650 lumens.
- **SolarSaga:** [Canadian 100 Air page](https://ca.jackery.com/products/jackery-solarsaga-100-air), [technical/compatibility guide](https://www.jackery.com/blogs/buying-advice/complete-guide-to-jackery-solarsaga-100-air), [JS-100H manual](https://cdn.shopify.com/s/files/1/0970/9262/files/Jackery_SolarSaga_100_Air_User_Manual.pdf?v=1758778870).
- **Kidde:** [US C3010 data sheet](https://brand.kidde.com/m/f4ea19b2ad5aed6/original/PDS_C3010.pdf), [Canadian C3010-CA](https://www.kiddecanada.com/en/products/carbon-monoxide-alarms/c3010-ca), [Health Canada certification advisory](https://recalls-rappels.canada.ca/en/alert-recall/when-purchasing-smoke-or-carbon-monoxide-alarms-look-canadian-certification-mark), [Health Canada CO guidance and CSA 6.19 reference](https://www.canada.ca/en/health-canada/services/air-quality/pollutants/carbon-monoxide/preventing-exposure.html).
- **INIU:** [P62-E1 specifications](https://iniushop.com/products/iniu-p62-e1-power-bank-smallest-20000mah-65w), [manufacturer BI-B41 recall](https://iniushop.com/pages/recall-b41), [CPSC BI-B41 notice](https://www.cpsc.gov/Recalls/2026/INIU-Recalls-Power-Banks-Due-to-Fire-and-Burn-Hazards-Sold-on-Amazon).

## 6. Recall and safety findings

The official [Health Canada open dataset](https://open.canada.ca/data/en/dataset/d38de914-c94c-429b-8ab1-8776c31643e3) was downloaded and searched. The audit summary records 34,285 entries, the downloaded file's SHA-256, the exact search expressions and matches. The full 15.8 MB source file stays in ignored local tooling, not the repository.

No exact INIU/P62/P62-E1, C3010/21010045, or selected Kidde/INIU ASIN match was found in the supplied summary fields. This is a bounded snapshot search, not an exhaustive search of every linked notice, PDF, serial-number checker or certification register. A no-match result is not proof that a product is safe or recall-free.

The [Health Canada EcoFlow recall](https://recalls-rappels.canada.ca/en/alert-recall/ecoflow-delta-max-2000-power-stations-recalled-due-risk-serious-burn-injury-and-fire) identifies DELTA Max 2000 / EFD310, not RIVER 2 Pro. The reviewed INIU notices identify BI-B41 and specific batches, not P62-E1. Neither brand-level association is used to assert an exact-model recall.

**Excluded Anker:** no JSON record or recommendation was created for B0CZ9LH53B. [Health Canada](https://recalls-rappels.canada.ca/en/alert-recall/anker-power-bank-a1647-and-anker-zolo-power-banks-a1681-and-a1689-sold-amazonca) and [Anker](https://www.anker.com/rc2506) identify affected Zolo model families A1681/A1689. The supplied ASIN's manufacturer model was not established, so this report does not claim that exact ASIN is recalled. No substitute was added.

**Canadian weather service:** the current [ECCC Weatheradio notice](https://www.canada.ca/en/environment-climate-change/services/weatheradio.html) says Weatheradio and Hello Weather are no longer in service. Consequently the ER310 draft does not promise Canadian weather-alert reception. US NOAA reception would require a location-specific check and is not guaranteed. The radio remains an AM/FM research candidate.

## 7. Kidde Canadian compliance verdict

**UNRESOLVED — retain the selected item unpublished.** The manufacturer's Canadian page explicitly describes C3010-CA as CSA listed. The US C3010 sheet names UL 2034 and includes part 21010045. These are evidence about different designations, not proof that the Amazon item is C3010-CA or bears a Canadian-recognized mark. No Canadian certification is asserted for B00FHW7PBS.

Health Canada's guidance references CSA 6.19 and requires attention to Canadian certification marks on the product. Obtain the actual unit label, manufacturer confirmation, certification file and Canadian installation documentation, and check local requirements before recommending this item. `safetyStatus` remains `blocked`; changing only `reviewStatus` is rejected by the schema.

## 8. INIU P62 safety verdict

**UNRESOLVED — retain unpublished.** The manufacturer documents P62-E1, 20000 mAh, up to 65 W USB-C output and two USB-C plus one USB-A port. It describes a detachable GoCord; the owner transcribed an integrated-cable listing. That configuration must be reconciled.

Manufacturer marketing safety badges and seller protection claims were not accepted as independently verified Canadian certification. No exact-model Canadian certification file or independent test report was obtained. The BI-B41 recall is a different-model notice; it does not establish that P62-E1 is recalled and does not provide a safety clearance. The `blocked` status is an editorial evidence hold, not a finding that this exact product is defective.

## 9. SolarSaga compatibility verdict

**Documented at manufacturer-model level; selected listing still unverified.** Jackery's guide explicitly includes Explorer 1000 v2, the Canadian site offers a 1000 v2 + 100 Air bundle, and the linked manual identifies 100 Air as JS-100H. Record the required cable and supplied accessories before treating B0FX8P4JST as that documented combination.

The Canadian panel page expressly excludes recharging Explorer 300, 300 v2, 300D and 240D. That product-specific exclusion is retained despite generic adapter descriptions elsewhere. No inference that an adapter alone makes devices compatible, no pneumatic/inflatable construction claim, and no substitution of SolarSaga 100 Light/Prime/older 100 W are made.

## 10. Astro, UX and SEO changes

The collection still uses the same loader and existing fields. Its schema is extracted into one shared module, with backward-compatible source/research metadata and publication guards. Source IDs are checked for uniqueness and valid references, and direct Amazon marketplace links must match their ASIN. Existing fixture tests continue to exercise legacy records without research metadata.

The existing product route now renders English research status, sourced specification tables, evidence, claims still to verify, safety notes, sources, merchant notes and curated related research. Related products pass through the same visibility filter. Catalogue cards use H2 beneath the catalogue H1 and H3 in sections. Tables expose a named keyboard-focusable region and caption. No new client-side JavaScript, external fonts, copied photos, runtime filters or new routes were introduced.

Product titles use “specs, uses & limitations” rather than an unsupported “review” label. Each draft has its own summary/meta description, descriptive slug, canonical URL, one H1 and BreadcrumbList JSON-LD. Drafts retain `noindex, nofollow` in development and are omitted entirely from production. A minimal Product schema is prepared only for later published, approved, listing-verified and safety-cleared research; it contains identity data, with no Review, AggregateRating, Offer, price, availability or invented image. This is local JSON/shape validation, not a Google Rich Results eligibility claim.

The public sitemap retains five indexable URLs and excludes the empty catalogue, 404 and all drafts. The existing sitemap alias, robots, navigation and homepage anchors are preserved. Core Web Vitals field measurements were not performed; the static architecture and unchanged browser JavaScript avoid adding a new runtime burden. The roadmap prepares seven future guide/link opportunities as documentation only.

## 11. Executed QA

- Supported commands and Node requirements inspected first; Node 22.23.4 / npm 10.9.9 used with the existing lockfile.
- `npm ci --offline=false --cache .tools/npm-cache`: successful; 295 packages installed, npm reported **0 vulnerabilities**. Existing transitive `whatwg-encoding` deprecation warning remains.
- `npm run check`: **0 errors, 0 warnings, 0 hints**, 35 files in the last check.
- `npm test`: **14 tests passed**, including the seven preserved affiliation tests and seven catalogue/schema/SEO tests. Checks cover all eight exact ASIN/URL mappings, one intended tag, unique identifiers, valid related records, taxonomy, unpublished state, safety blockers and approval gates.
- `npm run test:products`: passed. The existing three temporary published fixtures still exercise all universes, populated catalogue indexing, product routes, specifications and pending CTAs. Fixtures were removed and the actual build restored.
- `npm run build`: successful, **7 HTML pages**; no new product route in production. Robots, sitemap index/chunk/alias and assets generated.
- `npm run test:site`: successful, **116 internal references and 5 sitemap URLs**, canonical/OG/JSON-LD checks, historical anchors, draft names/routes/sitemap exclusions. Added artifact checks reject draft ASINs in generated HTML/XML/TXT/JSON/JS/CSS.
- `npm run test:browser`: **19 tests passed**. The ten foundation tests remain. Eight new product tests inspect each draft at **320, 375, 768 and 1440 px**, with axe WCAG A/AA checks, no horizontal overflow, correct canonical/noindex/BreadcrumbList, source anchors, disabled merchant CTAs and production 404 responses. A further test checks both local catalogues and public exclusions. No browser JS errors were observed by the page tests.
- Screenshots of the development catalogue and Explorer 1000 v2 page at desktop/mobile sizes were inspected visually. The development toolbar visible in these local captures is not part of production.
- `git diff --check` passed. Enrollment configuration, affiliate relations and lockfile were verified unchanged.

No test failure was observed in this phase. Failed Amazon retrievals and the inaccessible interactive EcoFlow manual content are research limitations, not successful listing/manual verifications. No physical testing, electrical certification test, Firefox/Safari, reader-assistive-technology audit, Lighthouse, Google Rich Results test or live commission attribution test was executed. GitHub CI results are reported separately in the PR and final handoff.

## 12–14. Pull request, blockers and recommendation

The PR targets `main` from the reused `content/blackout-affiliate-drafts-20261024` branch. Its exact URL and observed CI status are supplied in the handoff. The CI push trigger now also covers `content/**`; the manual publication workflow is unchanged. No workflow dispatch, merge or deployment was requested or performed.

Remaining blockers before public publication: explicit owner approval, current listing/model/Canadian unit verification for every product, the two blocked safety files, Explorer 300 revision discrepancy, ER310 battery revision and Canadian use-case limits, Fenix listing contents, SolarSaga ASIN/cables, INIU cable discrepancy, permitted photography if later desired, and separately verified Associates approval. A correct tag is not proof of account approval or commission tracking.

**Recommendation: MERGE for draft-only implementation after green CI and owner review.** This recommendation permits neither changing publication flags nor publishing any product. Keep all eight drafts and the existing Associates gate unchanged until their respective checks and approvals are complete. A later approval/publication PR must update the deliberately draft-specific QA assertions along with reviewed data; a configuration flag alone is not authorization.
