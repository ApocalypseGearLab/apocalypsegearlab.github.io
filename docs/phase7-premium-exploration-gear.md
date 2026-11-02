# Phase 7: exploration and emergency equipment

Base: `a63234aee67e6a82937f545db75698cd253f042a` (`main`, including merged official-logo PR #32). Branch: `feat/phase7-premium-exploration-gear`. These profiles are built for review on the branch; this change does not merge or deploy the site.

| Product / intended Canadian ASIN | Universe / category | Profile route |
| --- | --- | --- |
| Vortex Diamondback HD 10×42 Mossy Oak Bottomland, DB-215-OBL / `B0GQCTM4DH` | OUTBREAK / Optics & observation | `/gear/vortex-diamondback-hd-10x42-review/` |
| Garrett Pro-Pointer AT, 1140900 / `B00TADH9HA` | FALLOUT / Exploration & metal detection | `/gear/garrett-pro-pointer-at-review/` |
| GQ Electronics GMC-600 Pro / `B0FHGKCT8D` | FALLOUT / Radiation detection | `/gear/gq-gmc-600-pro-review/` |
| Fenix PD36R Pro / `B0H7DDGK7V` | BLACKOUT / Emergency lighting | `/gear/fenix-pd36r-pro-review/` |
| Motorola Talkabout T802, two black/blue radios / `B0CVCK57CR` | BLACKOUT / Backup communication | `/gear/motorola-talkabout-t802-review/` |

All five ASIN/model associations come from the owner’s Phase 7 brief. None already existed in the catalogue. All five Amazon.ca pages were inaccessible through the web reader: the live titles, selected variants, sellers and packages could not be independently inspected. No HTTP failure code or invalid-ASIN finding is inferred.

For **each of the five profiles**: manufacturer documentation is recorded; listing evidence remains `owner-document`; `listingVerified: false`, `safetyStatus: pending`, `publicationApproved: false`, `lastVerified: null`, `testing: not-tested`, and `reviewStatus: draft`. Public visibility is informational. Each page has `noindex, nofollow`, its own canonical and BreadcrumbList only. None enters the XML sitemap or gains Product, Offer, price or rating schema.

The existing recorded-link policy permits each supplied `https://www.amazon.ca/dp/{ASIN}?tag=apocalypsegear-20` destination. That permission is distinct from listing, certification, safety or editorial approval. All five earlier holds remain intact. Commercial buttons retain the shared disclosure, new-tab behavior, `sponsored nofollow noopener`, GA4 event fields and click deduplication. No purchase merchant or tracking implementation changed.

## Evidence and unresolved checks

- [Vortex’s exact DB-215-OBL reference](https://vortexoptics.com/diamondback-hd-10x42-mossy-oak-bottomland-binoculars.html) establishes the 10×42 camouflage variant. Personal eyeglass fit and the selected retail package remain unverified.
- [Garrett’s current model reference](https://garrett.com/garrett-pro-pointer-at/?d=sport) and [manufacturer manual](https://garrett.com/sites/default/files/2019-11/1538800_propointer_at_english.pdf) identify 1140900. It is a close-search **metal pinpointer**, with no radiation or hazardous-material detection claim. Warranty/temperature discrepancies between the current page and older manual are not presented as Canadian offer facts.
- [GQ’s current store](https://gqelectronicsllc.com/comersus/store/comersus_viewItem.asp?idProduct=5889) documents the LND 7317 tube, colour LCD and USB-C. Its [available manual](https://www.gqelectronicsllc.com/GMC-600ProUserGuide.pdf) describes older monochrome/mini-USB hardware. The delivered revision must be checked. [CNSC guidance](https://www.cnsc-ccsn.gc.ca/eng/resources/frequently-asked-questions/faq-contamination-monitoring/) informs the pancake-meter dose-survey limitations. The profile provides no radiation-protection or safe-food/water/location claim; artwork readings are illustrative.
- [Fenix’s Pro model reference](https://www.fenixlighting.com/products/fenix-pd36r-pro-rechargeable-flashlight) and [mode table](https://www.fenixlighting.com/blogs/news/everything-to-know-about-fenix-pd36r-pro) distinguish the Pro, lower-output runtime, Turbo stepdown and battery exclusions. The illustrated case and exact Amazon accessory bundle remain unverified.
- [Motorola’s T802/T803 documentation](https://www.motorolasolutions.com/en_us/products/two-way-radios/consumer-two-way-radios/talkabout-t802-t803.html), [manual MN009959A01-AC](https://docs-be.motorolasolutions.com/bundle/84917/raw/resource/enus/MN009959A01-AC_multilingual_Talkabout_Two_Way_Radio_T802_T803_User_Guide.pdf) and [datasheet](https://www.motorolasolutions.com/content/dam/msi/docs/products/two-way-radios/consumer/t802-t803/t802-t803-talkabout_data-sheet_1023_rc.pdf) expressly document T802 app/Bluetooth features, black/blue trim, battery options, the 462/467 MHz channel plan and Canadian use under ISED RSS-210. Manual pages 9, 21–22 and datasheet page 2 were visually checked. This establishes intended model suitability, not certification of the selected seller’s units. Confirm Canadian unit markings, package, current phone/app compatibility and actual route coverage before use. No guaranteed range or emergency-service connection is claimed.

Sources and retrieval limits are recorded in [evidence.json](qa/phase7/evidence.json) and each product record. Documentary sources remain in the evidence data; the five public profiles follow the existing Amazon-only outbound presentation.

## Media and preservation

All five provided PNGs are preserved byte for byte under `assets/media/{sector}/originals/`. Each is 1254 × 1254. Original hashes, names and byte sizes are in [owner-inputs.json](qa/phase7/owner-inputs.json). Full square artwork, colours and borders remain intact. Garrett’s orange HUD and sticker-free revision are retained within its editorial FALLOUT classification. Motorola shows exactly two radios. Every rendered illustration has descriptive alt text, fixed dimensions and an explicit concept-art caveat.

| Artwork | 480² WebP bytes | 960² WebP bytes | 1254² WebP bytes | Full-size reduction from PNG |
| --- | ---: | ---: | ---: | ---: |
| Vortex | 50,076 | 175,262 | 265,942 | 89.83% |
| Garrett | 44,562 | 156,608 | 237,052 | 89.96% |
| GQ | 34,948 | 121,546 | 189,054 | 91.14% |
| Fenix | 42,396 | 148,646 | 227,874 | 90.59% |
| Motorola | 39,418 | 133,486 | 209,682 | 90.75% |

The imported manifest appends five entries and retains all 41 earlier entries and global provenance. [media.json](qa/phase7/media.json) lists every new path, size and hash. `npm run media:phase7` rebuilds only these assets from hash-pinned masters, using the existing three-size Sharp/WebP convention. `npm run media:phase7 -- --check` compares freshly encoded bytes with committed variants and CSV/manifest output. `test:images` also runs that reproducibility check on Windows and GitHub’s Linux runner.

The [main-commit baseline](qa/phase7/before.json) freezes 243 existing files, including all 41 product records, old media, official logo, components, navigation, affiliate/analytics/release/SEO source and old manifest. Historical baselines remain unchanged. Their comparisons reverse only the two exact appended taxonomy rows and the five-entry manifest suffix; any modification to an earlier entry still fails. Negative tests exercise those guards. Historical collection checks exclude only the exact new image URLs in their catalogue/assigned sector, retaining every previous image attribute and order.

## Discovery and QA

The five profiles appear in `/gear/`, their universe collections, shared search/filters, category anchors and mega-menu. Two taxonomy rows are appended; the existing Backup communication category becomes populated automatically. There are 46 profiles, 28 populated categories and sector totals of 18 BLACKOUT / 12 FALLOUT / 16 OUTBREAK. No thin category page or duplicate navigation system is introduced.

New profiles link to relevant existing equipment, each other, sector planning, methodology and disclosure. Alternatives are discussed by task: binocular magnification, broad metal search versus pinpointing, appropriate radiation instrumentation, handheld versus headlamp/lantern, and local radio versus weather reception/satellite communication. All old related-product arrays remain unchanged.

Validation uses the repository’s 13 existing commands: `check`, `test`, `test:images`, `release:check`, `audit:affiliate`, `audit:verification`, `test:products`, `build`, `test:site`, `test:conversion`, `test:bougerv`, `test:phase55`, `test:browser`. Recorded exits are in [validation.json](qa/phase7/validation.json). The unit suite has 116 tests. The complete browser suite has 169 tests, including 16 new Phase 7 cases. Browser assertions cover all new profiles at 375/1440 px and catalogue/category discovery at 320, 375, 768, 1024, 1440 and 1920 px. New-profile checks require zero axe WCAG A/AA violations, no horizontal overflow, zero measured layout shift, valid responsive images, correct affiliate events and safe native new tabs using isolated retailer responses.

Production checks cover 54 HTML pages, 4,667 internal references and the unchanged seven sitemap URLs. The conversion audit covers 244 commercial controls: all Amazon.ca, with no wrong tags or non-Amazon purchase CTAs. The catalogue retains 41 active recorded destinations and five existing held products. These are local/static validations, not successful live Amazon inspections.

Representative [desktop profile](qa/phase7/screenshots/vortex-diamondback-hd-10x42-review-1440.png), [mobile profile](qa/phase7/screenshots/gq-gmc-600-pro-review-375.png), [desktop catalogue](qa/phase7/screenshots/catalogue-1440.png) and [mobile catalogue](qa/phase7/screenshots/catalogue-375.png) captures support visual review. CI status is reported by the feature PR’s checks. No merge or deployment is authorised by this implementation.
