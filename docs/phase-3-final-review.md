# Phase 3 — final visual corrections & QA

Reviewed 2026-10-25 on the existing `feat/phase3-blackout-visual-assets` branch. This update belongs to [PR #4](https://github.com/ApocalypseGearLab/apocalypsegearlab.github.io/pull/4). No new PR, merge, deploy or Phase 4 products.

## 1. Findings and corrected review conclusions

Comparison used the supplied 960 px illustrations, official product photos and manufacturer documentation. The owner's original reference-photo files were not separately provided; their provenance/permissions remain unverified. Manufacturer photos were downloaded only into ignored `.tools/references` for inspection and are neither committed nor used as replacement artwork.

### Fenix CL26R Pro — retained, earlier objection withdrawn

The earlier report called the upper marking invented model text. That was not supported: the [official gray camouflage photo](https://www.fenixlighting.com/cdn/shop/files/fenix-cl26r-pro-lantern-gray-combo.jpg?v=1755204684) also shows a similar serial-style marking in the same place. The [Fenix manufacturer page](https://www.fenixlight.com/product/cl26r-pro/) and [Fenix Lighting catalogue](https://www.fenixlighting.com/products/fenix-cl26r-pro-rechargeable-lantern) establish the CL26R Pro design. Housing, diffuser, hanging attachment, bronze dial and indicator row align with the supplied illustration. No material shape/control inconsistency was established by this comparison. The small inscription is not authenticated as a real unit's serial number. The review metadata and rendered caption are corrected; original WebP pixels are unchanged. This does not verify the Amazon listing, exact supplied unit or image rights.

### Jackery Explorer 1000 v2 — retained, badge objection withdrawn

The [official v2 product image](https://ca.jackery.com/cdn/shop/files/E1000v2.png?crop=center&height=400&v=1729760078&width=400) also carries an Explorer 1000 badge **without v2**. Missing v2 on that badge is not a defect. Comparison with the [official port/dimension diagram](https://ca.jackery.com/cdn/shop/files/PPS_fc1094ae-63fa-4ab7-904c-0400e02269dd.jpg?v=1784861865&width=750) supports the housing, raised handle, light, three AC outlets and USB control arrangement. [Jackery's JE-1000D information](https://faq.jackery.com/hc/en-us/articles/52303615153051-Explorer-1000-V2-Basic-Information) confirms 1500 W total AC, two USB-C outputs (100/30 W) and one USB-A output (18 W). The illustration remains promotional: its tiny display characters are not verified readings or technical evidence. Its WebP files are retained unchanged and the misleading earlier objection is removed from active captions/review.

### Jackery Explorer 300 — rejected for commercial publication

The [official legacy product photo](https://cdn.shopify.com/s/files/1/0607/3866/6677/products/PortablePowerStation300.jpg?v=1645603052), [manufacturer manual, page 3 / printed English page 01](https://r.jackery.net/productGuide/Jackery%20Explorer%20300%20user%20manual.pdf) and [technical support page](https://faq.jackery.com/hc/en-us/articles/52303678342683-Explorer-300-Basic-Information) show material differences:

- Illustration: USB-C **100 W**; original model: **60 W maximum**.
- Illustration: USB-A **15 W** labels; official photo/manual instead distinguish the Quick Charge port and the 5 V/2.4 A USB-A port. Relabeling both identically would misrepresent the actual port functions.
- Illustration: circular battery graphic and altered small LCD characters; official photo: segmented battery-bar display and different input/output layout.
- Illustration: **POWER** button marking; official photo: **DISPLAY**.

General body/handle and two-outlet arrangement are recognizable, but a local numeric retouch would leave other false details. No speculative replacement was generated and no manufacturer photograph was copied into the site. The two existing WebP files are **rejected**, retained byte-for-byte in `assets/rejected/blackout/`, and removed from `public/images/`. This is a documented move for audit, not loss of the artwork. They remain visible in the public GitHub repository/history; quarantine means excluded from the built website, not confidential storage.

## 2. Actual implementation corrections

- `src/data/media/review.json`: explicit rejected/reviewed-illustration decisions, dated official references and commercial-rights status.
- `src/lib/media-policy.ts`: rejects Explorer 300 in development and production. Other illustrations are previews only until the owner confirms source-photo rights and the individual artwork has a reviewed status. Product publication alone cannot grant media approval.
- `src/components/ProductImage.astro`: square, accessible **Illustration withheld** state with an accurate explanation; no image/srcset request for rejected artwork. Detailed captions now report the corrected Fenix/v2 comparisons.
- `src/lib/media.ts`: no public URL can be generated for quarantined variants; srcset omits non-public entries.
- `src/data/media/manifest.json`: records storage path for all 19 variants, with null delivery URLs for the 2 rejected files; hashes/dimensions/bytes unchanged.
- `scripts/image-sources.json`: replaces the unsupported earlier identity objections with the manufacturer comparison results.
- `scripts/optimize-images.mjs`: any future explicit regeneration honors rejection and writes those outputs outside public. It was syntax-checked, not rerun over the collection during this correction.
- `scripts/verify-images.mjs`, `tests/media-policy.test.ts`, `tests/browser/media.spec.ts`, `package.json`: verify the media gate, seven rendered images plus the withheld slot, 404 for rejected delivery URLs, all mapping/hash rules, and pending commercial permission.
- `docs/phase-3-visual-report.md`, this report and current BLACKOUT screenshots: supersede the earlier accuracy conclusions. Home screenshot evidence remains valid because home implementation and hero files are unchanged.

The approved charcoal grid, metallic/amber artwork, #F5A623 accents, complete square frames, keyboard focus and motion preferences are preserved. The withheld state is HTML/CSS, not an invented product rendering. No raster editing or new image-generation dependency was needed.

## 3. WebP impact

**No raster image was regenerated or recompressed. All 19 original WebP SHA-256 hashes remain identical.** Seven product illustrations (14 WebP variants) and the bunker (3 variants) remain in public. Two Explorer 300 variants, 147,978 B, move to the audit folder.

Public delivery collection: **1,771,860 → 1,623,882 B**, a 8.35% reduction. No browser downloads the whole collection. Rejected card/detail requests now return 404 in the production preview. Updated QA screenshot files are documentation, not delivery assets.

## 4. Homepage, SEO, accessibility and rendered QA

The bunker implementation, H1, CTA, overlay, responsive source set and all 768/1280/1672 px WebP bytes are unchanged. The complete scene remains contain-based: desktop text sits in a dark panel; mobile text follows the intact scene. Hero is eager/high priority, has intrinsic dimensions, and downloads one responsive variant on initial mobile navigation. No new competing preload, script or image is added.

Final Chromium tests cover **320, 375, 768, 1024, 1440 and 1920 px**, no overflow, square geometry, full retained artwork borders, decoded sources, withheld slot, keyboard focus, menu/Escape/skip link, reduced motion and axe WCAG 2 A/AA + 2.1 AA. Actual home, catalogue, Fenix detail and rejected Explorer 300 rendered screenshots were inspected. No new cropped frames, obscured H1/CTA or major image layout shift was found. No new Lighthouse run or field CWV measurement was made; the earlier report's lab measurements are historical and the unchanged hero's asset weights/loading attributes were reverified.

Canonical URLs, titles/descriptions, robots, sitemap alias, breadcrumbs and affiliate disclosure remain unchanged. The production build still emits **7 HTML pages and 5 sitemap URLs**; all eight draft product pages remain excluded. Internal links and srcsets resolve, and the rejected files do not enter dist. Tests are limited to installed Chromium and axe, not Safari/Firefox or physical devices.

Current evidence: [BLACKOUT desktop](qa/phase-3/blackout-1440.webp), [BLACKOUT mobile](qa/phase-3/blackout-375.webp), [homepage desktop](qa/phase-3/home-1440.webp), [homepage mobile](qa/phase-3/home-375.webp). These catalogue screenshots show development previews, not published recommendations.

## 5. Final validation

| Command | Actual result |
|---|---|
| npm run check | 0 errors, 0 warnings, 0 hints (42 files) |
| npm test | 16/16, including media approval/rejection rules and existing product schema/ASIN checks |
| npm run test:images | 9 original mappings; 17 public WebP files and 2 quarantined files; decoding, dimensions, hashes, metadata and draft guards pass |
| npm run test:products | Three temporary published fixtures validated and removed; real site restored |
| npm run build | Success, 7 real HTML pages |
| npm run test:site | 7 pages, 117 internal references, srcsets, 5 sitemap URLs, robots and draft filtering pass |
| npm run test:browser | 23/23 passed (51.2 s), including rejection URL/download checks and corrected rendered captions |
| node --check scripts/optimize-images.mjs | Syntax verified; no collection recompression performed |

GitHub validation links/results are recorded on the existing PR after pushing. No unsupported tests or current Lighthouse scores are claimed.

## 6. Remaining blockers and verdict

**Image-generation outputs do not automatically establish rights to the original reference photographs.** Owner confirmation of all necessary source-photo and commercial-use permissions remains pending. A visual match to a manufacturer photo grants no copying permission. Fenix/v2 comparisons establish promotional design consistency, not physical testing, certification, Amazon listing identity or rights. Other product artwork retains its existing identity caveats. Explorer 300 remains unsuitable for commercial publication and requires a separately supplied, accurate, permission-cleared replacement before it can be re-enabled.

All eight product JSON files, ASINs, `apocalypsegear-20`, draft status, Kidde/INIU safety blockers, Associates configuration and product publication controls are unchanged. No six FALLOUT products were added. No source PNG was deleted, no product was published, no merge or deploy was triggered.

**Verdict: MERGE for this engineering PR once checks pass.** The material Explorer 300 mismatch is excluded from delivery and protected by tests; unsupported Fenix/v2 objections are corrected with official evidence. This verdict approves the code for owner review, **not commercial publication or deployment**. Those remain subject to the explicit owner authorization and independent rights/editorial/safety requirements above. PR #4 remains unmerged.
