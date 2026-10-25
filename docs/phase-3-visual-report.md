# Phase 3 — visual integration review

## A. Repository status

Prepared on 2026-10-25 on `feat/phase3-blackout-visual-assets`. Initial local worktree was clean. PR #3 was already merged into `main` at `9fd293c0dbab358fc98a14fe03b2a5ed2ea3e898`; this feature branch starts there. The origin is `https://github.com/ApocalypseGearLab/apocalypsegearlab.github.io.git`. No local or remote main changes, merge, workflow dispatch or deployment were performed.

Audit covered the Astro configuration, package/lockfile, image placeholders, home and dynamic gear templates, ProductCard, UniverseHub, layout/global CSS, all eight product records and their schema, affiliate configuration, sitemap/robots generation, CI/deploy workflows, unit/site/product/browser checks, existing assets and branch/PR state. There were no supplied product photographs or unused image files in public; only favicon.svg. No AGENTS.md was found. Other feature work was preserved.

## B. Image inventory and identity review

These are owner-supplied **AI-assisted illustrations**, not manufacturer photographs or evidence of model identity, certification or specifications. The association below identifies the intended research record. It does not certify an exact depiction. Generic delivery basenames and alt text deliberately replace the requested exact variant names wherever the artwork does not establish that variant. No online replacement images were used.

| Original filename in the owner's Downloads directory | Intended destination | Delivery basename |
|---|---|---|
| Radio d’urgence en halo ambré.png | `midland-er310` (intended association) | `midland-emergency-radio-blackout` |
| Station d’énergie Jackery Explorer 300 futuriste.png | `jackery-explorer-300` (intended association) | `jackery-explorer-300-blackout` |
| Batterie externe INIU futuriste lumineuse.png | `iniu-p62-20000mah-65w` (intended association) | `iniu-power-bank-blackout` |
| Station électrique EcoFlow futuriste.png | `ecoflow-river-2-pro` (intended association) | `ecoflow-power-station-blackout` |
| Station d’énergie Jackery futuriste en lumière orange.png | `jackery-explorer-1000-v2` (intended association) | `jackery-explorer-1000-illustration-blackout` |
| Lanterne Fenix rétroéclairée en ambre.png | `fenix-cl26r-pro` (intended association) | `fenix-lantern-blackout` |
| Alarme Kidde futuriste sous éclairage ambré-2.png | `kidde-c3010-co-alarm` (intended association) | `kidde-co-alarm-blackout` |
| Panneau solaire Jackery, affichage tactique futuriste.png | `jackery-solarsaga-100w-air` (intended association) | `jackery-folding-solar-panel-blackout` |
| Atelier de survie dans un bunker fortifié.png | Homepage bunker | `apocalypsegearlab-survival-bunker-hero` |

All eight product PNGs are 1254 × 1254 (1:1). The bunker PNG is 1672 × 941 (approximately 16:9). All nine have no alpha channel and have distinct SHA-256 hashes. The imagery is sharp enough at the requested delivery sizes; all product edges, shadows, accessories, solar sections and four illuminated frame corners are present. No unwanted white margins or duplicate sources were found. The existing source frames are slightly weathered/asymmetric by design and are preserved.

Material limitations found visually, before conversion:

- **midland-er310:** Intended for ER310 research. Branding and radio design are recognizable; exact model and rendered display details are not independently verified.
- **jackery-explorer-300:** Explorer 300 label is visible. Rendered USB-C 100 W marking conflicts with the researched original Explorer 300 specification; do not use the artwork as specification evidence.
- **iniu-p62-20000mah-65w:** Intended for P62 research. P62-E1, capacity and output cannot be established from the artwork; cable design and exact model require owner review.
- **ecoflow-river-2-pro:** Intended for RIVER 2 Pro research. EcoFlow branding and general housing are recognizable; no legible RIVER 2 Pro model identifier.
- **jackery-explorer-1000-v2:** Intended for Explorer 1000 v2 research. Artwork says Explorer 1000 without v2; exact variant and rendered port labels require correction or confirmation before publication.
- **fenix-cl26r-pro:** Intended for CL26R Pro research, not identified as an exact CL26R Pro depiction. Garbled model text and housing/dial details require artwork review; do not present as a verified model photograph.
- **kidde-c3010-co-alarm:** Intended for C3010 research. Exact regional model and Canadian certification cannot be inferred from the rendered ten-year wording or appearance.
- **jackery-solarsaga-100w-air:** Intended for SolarSaga 100 W Air research. No legible JS-100H Air identifier; folding layout alone does not verify the Air variant.

The bunker is a fictional scene, not a real facility photograph. No product design, lettering, prices, watermarks or physical details were added or repaired. Conversion intentionally preserves the visible defects rather than hiding them. **Owner confirmation of image usage rights and source-photo permissions remains required before commercial publication.**

## C. Optimized assets

Every delivery file is WebP at quality 83, effort 6, sRGB, orientation corrected, with unnecessary EXIF/XMP/ICC metadata removed. Square variants contain the full image; no crop, sharpening or enlargement is applied. No 1440 product zoom duplicate was needed. The hero ends at the original 1672 px resolution: a 1920/2560 version would invent pixels. Resizing rounds the smaller hero heights to 432/720 px without a material framing change.

| Basename | Original PNG | WebP outputs, exact bytes |
|---|---|---|
| `midland-emergency-radio-blackout` | 1254 × 1254; 2,508,688 B | [midland-emergency-radio-blackout-480.webp](../public/images/midland-emergency-radio-blackout-480.webp) — 480 × 480; 46,628 B<br>[midland-emergency-radio-blackout-960.webp](../public/images/midland-emergency-radio-blackout-960.webp) — 960 × 960; 155,352 B |
| `jackery-explorer-300-blackout` | 1254 × 1254; 2,289,225 B | [jackery-explorer-300-blackout-480.webp](../public/images/jackery-explorer-300-blackout-480.webp) — 480 × 480; 33,566 B<br>[jackery-explorer-300-blackout-960.webp](../public/images/jackery-explorer-300-blackout-960.webp) — 960 × 960; 114,412 B |
| `iniu-power-bank-blackout` | 1254 × 1254; 2,158,736 B | [iniu-power-bank-blackout-480.webp](../public/images/iniu-power-bank-blackout-480.webp) — 480 × 480; 27,878 B<br>[iniu-power-bank-blackout-960.webp](../public/images/iniu-power-bank-blackout-960.webp) — 960 × 960; 97,092 B |
| `ecoflow-power-station-blackout` | 1254 × 1254; 2,042,716 B | [ecoflow-power-station-blackout-480.webp](../public/images/ecoflow-power-station-blackout-480.webp) — 480 × 480; 25,692 B<br>[ecoflow-power-station-blackout-960.webp](../public/images/ecoflow-power-station-blackout-960.webp) — 960 × 960; 82,078 B |
| `jackery-explorer-1000-illustration-blackout` | 1254 × 1254; 2,055,300 B | [jackery-explorer-1000-illustration-blackout-480.webp](../public/images/jackery-explorer-1000-illustration-blackout-480.webp) — 480 × 480; 29,158 B<br>[jackery-explorer-1000-illustration-blackout-960.webp](../public/images/jackery-explorer-1000-illustration-blackout-960.webp) — 960 × 960; 85,866 B |
| `fenix-lantern-blackout` | 1254 × 1254; 1,937,211 B | [fenix-lantern-blackout-480.webp](../public/images/fenix-lantern-blackout-480.webp) — 480 × 480; 25,238 B<br>[fenix-lantern-blackout-960.webp](../public/images/fenix-lantern-blackout-960.webp) — 960 × 960; 78,946 B |
| `kidde-co-alarm-blackout` | 1254 × 1254; 2,043,206 B | [kidde-co-alarm-blackout-480.webp](../public/images/kidde-co-alarm-blackout-480.webp) — 480 × 480; 22,652 B<br>[kidde-co-alarm-blackout-960.webp](../public/images/kidde-co-alarm-blackout-960.webp) — 960 × 960; 71,340 B |
| `jackery-folding-solar-panel-blackout` | 1254 × 1254; 2,429,069 B | [jackery-folding-solar-panel-blackout-480.webp](../public/images/jackery-folding-solar-panel-blackout-480.webp) — 480 × 480; 25,276 B<br>[jackery-folding-solar-panel-blackout-960.webp](../public/images/jackery-folding-solar-panel-blackout-960.webp) — 960 × 960; 112,742 B |
| `apocalypsegearlab-survival-bunker-hero` | 1672 × 941; 3,157,157 B | [apocalypsegearlab-survival-bunker-hero-768.webp](../public/images/apocalypsegearlab-survival-bunker-hero-768.webp) — 768 × 432; 108,300 B<br>[apocalypsegearlab-survival-bunker-hero-1280.webp](../public/images/apocalypsegearlab-survival-bunker-hero-1280.webp) — 1280 × 720; 255,560 B<br>[apocalypsegearlab-survival-bunker-hero-1672.webp](../public/images/apocalypsegearlab-survival-bunker-hero-1672.webp) — 1672 × 941; 374,084 B |

## D. Optimization results and pipeline

Original total: **20,621,308 B** across 9 files. Delivery total: **1,771,860 B** across **19 responsive variants**. Reduction: **91.41%**, or **11.64:1**, even including every responsive size. A browser downloads the selected variant, not this entire collection. Screenshot documentation is excluded from delivery totals.

Card files range from 22,652 to 46,628 B; detail files range from 71,340 to 155,352 B. Several are smaller than the suggested minimum budget without changing the quality setting. Thin grid/frame lines and readable source labels remain visible in converted images; smaller lettering naturally becomes harder to read at card size. Original AI lettering defects remain visible at detail size.

There was no reusable project image conversion command. Sharp 0.35.5 is pinned as a **development dependency** with an updated lockfile, not added as client JavaScript. Its [documented output behavior](https://sharp.pixelplumbing.com/api-output/) strips metadata by default. Processing uses the existing Node toolchain and precomputed static WebP files rather than another browser/runtime image library.

Reproduction from repository root (Node >=22.23.4):

```powershell
npm ci
npm run images:build -- "C:/Users/1995/Downloads"
npm run test:images
```

The input directory may differ; the nine original filenames must match `scripts/image-sources.json`. Originals stay outside public and Git. The pipeline validates all inputs, duplicate hashes and output ownership before writing, refuses unrelated image overwrites, preserves full artwork and records source/output hashes, dimensions, exact bytes, encoder versions and identity caveats in `src/data/media/manifest.json`. No timestamp makes the manifest churn. Regeneration was checked for identical manifest/output hashes on this machine. Cross-platform encoder upgrades should be reviewed visually and via the manifest. CI validates committed outputs and never requires access to the owner's Downloads folder.

## E. Astro integration and changed files

- `src/pages/index.astro`: responsive bunker hero with the existing H1, copy, CTA, status console and anchors preserved. On desktop a dark text panel overlays the left of the intact scene, leaving the door visible. Below 960 px the full scene precedes the text panel, avoiding a destructive mobile crop.
- `src/components/ProductImage.astro` and `src/lib/media.ts`: shared responsive card/detail artwork, accurate illustration alt text, reserved square dimensions, per-asset identity caveats, and base-aware static URLs.
- `src/components/ProductCard.astro`: keeps existing title/product information; uses artwork in development previews and removes duplicate decorative corner brackets. Amber #F5A623 hover/focus styling has no expensive glow or filters. The template/unmapped image fallback remains available.
- `src/pages/gear/[slug].astro`: artwork and explicit caveats in the existing draft detail template; research, sources and affiliate controls untouched.
- `src/components/UniverseHub.astro`: BLACKOUT topic badges no longer split the word Planned at tablet widths. FALLOUT and OUTBREAK design is unchanged.
- `scripts/image-sources.json`, `scripts/optimize-images.mjs`, `scripts/verify-images.mjs`, `src/data/media/manifest.json`, `public/images/*.webp`: reproducible media inventory, conversion and verification.
- `scripts/verify-site.mjs`, `tests/browser/{site,blackout,media}.spec.ts`: responsive source validation, six widths, image layout/decoding/focus/reduced-motion checks and screenshots.
- `package.json`, `package-lock.json`, `.github/workflows/ci.yml`: Sharp, supported image commands, CI asset verification and feature branch trigger.
- This report and four selected compressed QA screenshots in `docs/qa/phase-3`, plus measured Lighthouse settings/results. Other temporary screenshots and full Lighthouse reports remain in ignored `.tools`.

The product JSON records deliberately remain byte-for-byte unchanged; the separate media map requires no schema migration. No original source file was deleted. No new public page or client image JavaScript was introduced.

## F. Technical SEO and measured performance

Image filenames are descriptive lowercase ASCII. Alts describe visible content and say AI-assisted illustration; uncertain model variants are not asserted. Product captions disclose unverified identity, with detailed issues on draft pages. The hero is explicitly fictional. Essential titles, specifications and CTA remain HTML.

Hero: responsive `srcset`/`sizes=100vw`, explicit intrinsic dimensions, `loading=eager`, one `fetchpriority=high`, async decode and no competing image preloads. Product cards are lazy/async, detail artwork eager/async at normal priority, with 480/960 source selection and slot sizes matching the existing grid. All frames use contain-based display and stable aspect ratios. Absolute base-aware image paths resolve on nested gear routes. Existing root-domain GitHub Pages configuration remains correct.

Canonical URLs, titles, descriptions, robots directives, sitemap alias, breadcrumbs, affiliate disclosure and Product JSON-LD safeguards are preserved. The production build still has 7 HTML pages and 5 sitemap URLs; all eight draft detail routes remain 404. Product names/ASINs do not leak into rendered production pages. Static image assets exist in public for the requested future integration, but no product is published or linked by this work. These image files would become directly retrievable if a future deployment is authorized; image presence is not editorial approval.

Local Lighthouse **13.5.0**, Windows 10/Chromium 156 headless, Node 22.23.4, Astro production preview on loopback. One cold mobile run and one cold desktop run for each version; default simulated mobile and desktop configurations. [Machine-readable measurements and exact emulation/throttling settings](qa/phase-3/performance.json). These are **local lab measurements**, not field Core Web Vitals or guarantees for GitHub Pages.

| Profile | Performance before → after | LCP before → after | CLS before → after | Total network bytes before → after |
|---|---|---|---|---|
| mobile | 100 → 100 | 755 → 1513 ms | 0 → 0 | 6,082 → 115,132 B |
| desktop | 100 → 100 | 245 → 566 ms | 0 → 0 | 6,082 → 380,916 B |

Accessibility, best practices and SEO scores were **100 before and after** in both profiles; no Lighthouse run warnings. Adding the hero increased bytes and LCP from a text-only homepage, as shown, while keeping the lab performance score 100 and CLS 0. Mobile loaded one 768 px hero variant on first navigation; desktop selected 1672 px. No duplicate competing hero request was observed. No server caching claim is inferred from loopback: GitHub Pages controls deployed cache headers; no deployment/header measurement or field traffic was available. Stable filenames do not claim immutable caching.

## G. Visual QA

Chromium + axe WCAG 2 A/AA and 2.1 AA at **320, 375, 768, 1024, 1440 and 1920 px**. All public pages, eight draft detail pages and both catalogues were checked. No horizontal overflow, square distortion or cropped frame corners was detected. Full bunker composition remains visible on mobile, with copy in a separate high-contrast panel. Desktop copy overlay leaves the doorway and right-side equipment visible. No major layout shift was measured; image space is present before image delivery. Menu, Escape, skip link, CTA anchors, keyboard outlines, no-JavaScript navigation and reduced-motion behavior passed. Tests are limited to installed Chromium, not Safari/Firefox or physical device/user testing.

Rendered screenshots and the optimized eight-image contact sheet were inspected. All nine original embedded images were inspected for identity/branding defects. QA revealed a pre-existing BLACKOUT tablet badge wrapping defect, now corrected; full-page capture scroll positions were also normalized so the sticky header is captured at the top. Astro's development toolbar is hidden in catalogue screenshots; site content is unchanged.

| Homepage | BLACKOUT development catalogue (drafts only) |
|---|---|
| [Desktop, 1440 px](qa/phase-3/home-1440.webp) | [Desktop, 1440 px](qa/phase-3/blackout-1440.webp) |
| [Mobile, 375 px](qa/phase-3/home-375.webp) | [Mobile, 375 px](qa/phase-3/blackout-375.webp) |

## H. Commands actually executed

| Check | Result |
|---|---|
| `npm install --save-dev --save-exact sharp` | Sharp 0.35.5; audit 0 vulnerabilities |
| `npm ci` | Passed; 295 packages installed; audit 0 vulnerabilities |
| `npm run images:build -- "C:/Users/1995/Downloads"` | 9 inputs → 19 WebP outputs; repeated deterministically |
| `npm run check` | 0 errors, 0 warnings, 0 hints |
| `npm test` | 14/14 passed |
| `npm run test:images` | 9 unique mappings; 19 files decoded; hashes, dimensions, format, metadata, weights and draft safeguards passed |
| `npm run test:products` | Three temporary published fixtures passed; fixtures removed by the test and real build restored |
| `npm run build` | Success; 7 real HTML pages |
| `npm run test:site` | 7 pages, 117 internal references, all srcset files, 5 sitemap URLs, robots and publication filtering passed |
| `npm run test:browser` | 21/21 passed (initial complete run); image/site suite rerun after the tablet badge/capture correction |
| Local Lighthouse script, before/after | Mobile and desktop measured; results above |

The first browser launch encountered the reference preview server on port 4321. Only that identified Astro process was stopped; the full suite then passed. No test result was fabricated. Exact post-correction/CI results are recorded in the PR.

## I. Safety and publication state

All eight products remain draft, not physically tested, listingVerified=false, publicationApproved=false, with existing evidence and publication blockers intact. No safety status was cleared; Kidde and INIU remain blocked. ASINs and `apocalypsegear-20` are unchanged, `AMAZON_ASSOCIATE_ENROLLED=false`, and Anker Zolo remains excluded. No commercial or Product structured data is derived from these illustrations. No merge, deploy or production workflow dispatch is authorized by this phase.

## J. GitHub handoff

Feature branch: `feat/phase3-blackout-visual-assets`. A draft pull request targets main; its URL and CI result are returned in the delivery message. Publication still requires the owner's explicit authorization. The manual deployment workflow is untouched.

## K. Verdict — CORRECT before commercial publication

The implementation and automated checks support technical review of the feature branch. **CORRECT** is the publication verdict because the Explorer 300 port marking, Fenix identity/garbled model text and Explorer 1000 v2 ambiguity require owner review/correct artwork; the remaining exact regional/model variants are not visually established. Image usage rights and source-photo permissions also require owner confirmation. Product listing verification, editorial approval, Canadian safety review and Associates enrollment remain independent unresolved prerequisites. Keeping this PR draft makes those limits explicit. This verdict does not authorize merging or deployment.
