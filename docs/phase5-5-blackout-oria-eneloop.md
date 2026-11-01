# Phase 5.5 — ORIA and Panasonic eneloop BLACKOUT integration

Reviewed 2026-11-01. Base: `main` at `996b1d3bd574933e3ce7a384cb4bba7ee45c9ce5`, after merged [BougeRV PR #28](https://github.com/ApocalypseGearLab/apocalypsegearlab.github.io/pull/28). No open PR overlapped this work. Dedicated branch: `feat/blackout-oria-eneloop-battery-kits`. No merge or deployment performed.

## Result and exact routes

Three additional informational profiles appear once each in `/gear/` and `/blackout/`. Production now contains **41 visible products**, including **16 BLACKOUT**, 10 FALLOUT and 15 OUTBREAK profiles. All 38 earlier product JSON records remain byte-for-byte unchanged.

| Product / manufacturer model | Prepared production URL | ASIN / recorded affiliate destination | CTA |
|---|---|---|---|
| ORIA two-sensor thermometer; exact WA50 identity **unconfirmed**, `modelNumber: null` | https://apocalypsegearlab.github.io/gear/oria-wireless-refrigerator-freezer-thermometer/ | [B07B9QF64N](https://www.amazon.ca/dp/B07B9QF64N?tag=apocalypsegear-20) | ACTIVE |
| Panasonic eneloop AA, K-KJ17MCA4BA / BQ-CC17 | https://apocalypsegearlab.github.io/gear/panasonic-eneloop-aa-rechargeable-battery-charger-kit/ | [B00JHKSMJU](https://www.amazon.ca/dp/B00JHKSMJU?tag=apocalypsegear-20) | ACTIVE |
| Panasonic eneloop AAA, K-KJ17M3A4BA / BQ-CC17 | https://apocalypsegearlab.github.io/gear/panasonic-eneloop-aaa-rechargeable-battery-charger-kit/ | [B010U57MSW](https://www.amazon.ca/dp/B010U57MSW?tag=apocalypsegear-20) | ACTIVE |

These routes are present in the tested production build; availability on the public site requires the owner's later merge and deployment.

## Evidence and commercial decisions

The owner work order explicitly supplies the three Canadian ASIN/model associations and approved artwork. Although it mentions listing screenshots and original product photographs, no separate reference capture was attached to this turn. The three current Amazon.ca pages were inaccessible through the web reader. Exact visible listing titles, selected variants, sellers and delivered package revisions were **not independently inspected**. No HTTP status or invalid-link inference is claimed. No physical testing or product authentication was performed.

Each new `listingEvidence` records `method: owner-document`, the exact ASIN, the owner-associated model/name, date and limitations. Each `affiliateReview` permits the **recorded link only** under the existing policy. The account configuration and affiliate release functions are unchanged. All 41 canonical Canadian URLs pass format/tag checks; 36 links are active and the same five remain held. This work does not invent independent account approval.

The existing holds for Kidde C3010, INIU P62, Jackery Explorer 300, EcoFlow RIVER 2 Pro and NANUK 904 remain unchanged. The new products retain `draft`, informational visibility, `listingVerified: false`, `safetyStatus: pending`, `publicationApproved: false`, `testing: not-tested` and `lastVerified: null`. Link availability does not imply editorial publication or safety clearance.

### Panasonic manufacturer documentation

- [Panasonic Canada AA kit reference](https://www.panasonic.com/ca/consumer/batteries/rechargeable/eneloop/kkj17mca4ba.html).
- [Panasonic Canada AAA kit reference](https://www.panasonic.com/ca/consumer/batteries/rechargeable/eneloop/kkj17m3a4ba.html).
- [Panasonic North American 2023/2024 catalogue](https://staging.panasonicbatteryproducts.com/wp-content/uploads/2023-PANASONIC-CATALOG_DIGITAL.pdf), kit tables and product descriptions. The non-staging catalogue endpoint currently showed maintenance; the accessible manufacturer staging PDF was reviewed as historical model documentation, not proof of the current Amazon offer.
- [BQ-CC17 Canada instructions and charging table](https://www.panasonic.com/ca/consumer/batteries-learn/charger-bq-cc17.html): individually controlled AA/AAA charging, AC input and conditional charge times.
- [Standard eneloop voltage/capacity convention](https://www.panasonic.com/global/energy/products/eneloop/en/lineup/eneloop.html): distinguishes maximum advertised and minimum capacity.
- [Panasonic Canada cycle-count conditions](https://www.panasonic.com/ca/consumer/batteries-learn/eneloop.html): different IEC methods yield different advertised cycle counts.

The kit descriptions specify **four cells and one charger**. Documented standard-cell values are 1.2 V; AA up to 2000 mAh/minimum 1900 mAh, AAA up to 800 mAh/minimum 750 mAh. The approximate seven-hour AA and six-hour AAA charge times apply to the stated capacity bands at room temperature and vary with cell condition. The 2100-cycle claim retains its IEC 2011 condition and the alternative 600-cycle IEC 2017 figure. Neither kit is presented as USB-powered or solar-powered. Regional plugs, actual selected Amazon contents, cell generation and delivered certification markings remain uninspected.

No device-specific NiMH compatibility is inferred. In particular, AA/AAA size alone does not establish compatibility with ORIA, a radio or a light. The AAA copy advises existing BQ-CC17 owners to compare separate cells before purchasing another charger.

### ORIA documentation boundary

No authenticated original manufacturer manual was located. Third-party manual summaries showed inconsistent details and were **not promoted to manufacturer evidence**. Two supplier graphics on the Amazon media CDN were inspected for visual comparison; their authorship and connection to the current Canadian offer were not authenticated. They show a similar white display, sensor/indoor readouts, min/max and alarm controls, but do not verify WA50, calibration, battery requirements or numeric operating limits.

ORIA therefore uses the explicit `specsStatus: owner-reported` presentation. Every table value is attributed to the owner, the public heading states verification is incomplete and its badge says **Documentation incomplete**. The schema allows this mode only for informational drafts with retailer-source attribution; it cannot be promoted to published even by forging other publication flags. Existing manufacturer-documented records keep their manufacturer-citation requirement. The release/affiliate policy itself is unchanged.

Missing ORIA evidence: original instructions tied to the Canadian model/revision; operating limits and precision; alarm thresholds/delay; radio range; battery voltage, chemistry, quantities/inclusion and runtime. None is invented. These are technical/editorial gaps, not an automatic veto on the owner-recorded retailer link under the existing policy.

The separate [Health Canada emergency food guidance](https://www.canada.ca/en/health-canada/services/food-drinking-water-safe-emergency.html) supports monitoring storage at or below 4°C in a refrigerator and −18°C in a freezer. These are food-storage targets, not ORIA operating ratings. No thermometer or displayed temperature guarantees food safety. ORIA links contextually to both existing BougeRV profiles; neither old product record is modified.

## Media and visible corrections

Three supplied PNG originals are preserved byte-for-byte under `assets/media/blackout/originals/`. Nine WebPs are generated once at quality 85/effort 6, without crop, recolouring, enlargement or regeneration. Source/derivative dimensions and SHA-256 hashes are recorded in [media.json](qa/phase5-5/media.json) and the [CSV mapping](../assets/media/phase5-5-image-manifest.csv).

All output stems below are under `assets/media/blackout/`; `-480.webp` is 480×480, `-960.webp` is 960×960 and `.webp` is 1254×1254. The corresponding `.png` source uses the same stem under `originals/`.

| Stem | 480 px bytes | 960 px bytes | 1254 px bytes | Reduction vs original at 1254 px |
|---|---:|---:|---:|---:|
| `oria-wireless-fridge-freezer-thermometer-blackout` | 30,888 | 94,918 | 139,740 | 93.21% |
| `panasonic-eneloop-aa-bq-cc17-kit-blackout` | 45,112 | 127,862 | 186,312 | 91.28% |
| `panasonic-eneloop-aaa-bq-cc17-kit-blackout` | 41,754 | 120,362 | 179,382 | 92.02% |

All variants decode successfully, remain below 250 KB and are delivered with exactly the recorded bytes. Responsive `srcset`, fixed dimensions, square ratio, `object-fit: contain` and lazy-loaded cards preserve the complete HUD and reserve image space. The bunker and all old media bytes remain unchanged.

Both Panasonic illustrations show four installed plus three decorative cells. A visible 12 px caption on **every card and profile** says the kit contains four cells and one charger. The AAA caption additionally qualifies the unverified 850 mAh artwork label against the documented 800/750 mAh convention. ORIA readings are explicitly illustrative and do not show verified safe storage. Original artwork colours are unchanged. All images remain labelled concept illustrations rather than product photographs.

Rights are recorded as owner-approved from the explicit Phase 5.5 work order. This is owner-provided provenance, not independent chain-of-title verification or manufacturer endorsement. No third-party reference photographs are republished.

## SEO, outbound links and safeguards

- The new profiles retain `noindex, nofollow`, unique titles/descriptions/H1, self-referencing canonicals, and BreadcrumbList only. No Product, Offer, rating, price, stock or review schema is invented. The three drafts are excluded from the sitemap.
- `/`, `/gear/`, `/blackout/`, `/fallout/` and `/outbreak/` remain indexable (no robots meta); their canonicals and the six existing sitemap entries remain correct. Production comparison preserves metadata/schema/image attributes for all 45 earlier pages, excluding only the three appended images on catalogue/hub pages.
- Public purchase links for the new profiles are exclusively Amazon.ca, with exactly `tag=apocalypsegear-20`, `_blank` and `rel="sponsored nofollow noopener"`. Manufacturer references stay internal; no manufacturer shopping or competing merchant links are rendered.
- The mandatory Amazon disclosure remains visible. GA4 configuration and delegated tracking code are byte-identical to main. Isolated browser clicks prove one event per interaction without sending Amazon or Google analytics traffic.

## Validation and screenshots

Observed local results: **105 Astro-checked files, zero errors/warnings/hints; 96 unit tests; 116 Playwright tests; 48 production HTML pages; 1,864 internal references; six sitemap URLs**. All passed. Commands and detailed results are in [validation.json](qa/phase5-5/validation.json).

Executed: `check`, `test`, `test:images`, `release:check`, `audit:affiliate`, `audit:verification`, `test:products`, `build`, `test:site`, `test:conversion`, `test:bougerv`, `test:phase55`, `test:browser`.

The new browser cases check 320, 375, 768, 1024, 1440 and 1920 px, square decoded images, no horizontal overflow and zero axe WCAG 2 A/AA + 2.1 AA violations across 18 new-profile viewport checks. The full suite also audits existing profiles, hubs, keyboard menu/navigation and no-JavaScript navigation. This is automated accessibility coverage, not a claim of exhaustive WCAG certification.

The new CTAs were activated 22 times using mouse/keyboard across catalogue, BLACKOUT and profiles, plus AA/AAA related cards. Each emitted exactly one `affiliate_click`, opened the exact recorded URL in a new tab and had no `window.opener`. ORIA has no existing related-card inbound placement; no unrelated product was edited to manufacture one. The complete recorded-link test also exercised 108 isolated catalogue/sector/profile destinations. Production contains 215 rendered active CTA instances.

Eighteen final captures cover every new catalogue card, BLACKOUT card and profile at 375/1440 px. The actual rendered images and relevant screenshots were visually inspected for full borders, correct assignment, captions, legible CTA/text and layout. Mobile and desktop screenshots:

| Product | Catalogue phone / desktop | BLACKOUT phone / desktop | Profile phone / desktop |
|---|---|---|---|
| ORIA | [375](qa/phase5-5/oria-wireless-refrigerator-freezer-thermometer-catalogue-375.webp) / [1440](qa/phase5-5/oria-wireless-refrigerator-freezer-thermometer-catalogue-1440.webp) | [375](qa/phase5-5/oria-wireless-refrigerator-freezer-thermometer-blackout-375.webp) / [1440](qa/phase5-5/oria-wireless-refrigerator-freezer-thermometer-blackout-1440.webp) | [375](qa/phase5-5/oria-wireless-refrigerator-freezer-thermometer-profile-375.webp) / [1440](qa/phase5-5/oria-wireless-refrigerator-freezer-thermometer-profile-1440.webp) |
| eneloop AA | [375](qa/phase5-5/panasonic-eneloop-aa-rechargeable-battery-charger-kit-catalogue-375.webp) / [1440](qa/phase5-5/panasonic-eneloop-aa-rechargeable-battery-charger-kit-catalogue-1440.webp) | [375](qa/phase5-5/panasonic-eneloop-aa-rechargeable-battery-charger-kit-blackout-375.webp) / [1440](qa/phase5-5/panasonic-eneloop-aa-rechargeable-battery-charger-kit-blackout-1440.webp) | [375](qa/phase5-5/panasonic-eneloop-aa-rechargeable-battery-charger-kit-profile-375.webp) / [1440](qa/phase5-5/panasonic-eneloop-aa-rechargeable-battery-charger-kit-profile-1440.webp) |
| eneloop AAA | [375](qa/phase5-5/panasonic-eneloop-aaa-rechargeable-battery-charger-kit-catalogue-375.webp) / [1440](qa/phase5-5/panasonic-eneloop-aaa-rechargeable-battery-charger-kit-catalogue-1440.webp) | [375](qa/phase5-5/panasonic-eneloop-aaa-rechargeable-battery-charger-kit-blackout-375.webp) / [1440](qa/phase5-5/panasonic-eneloop-aaa-rechargeable-battery-charger-kit-blackout-1440.webp) | [375](qa/phase5-5/panasonic-eneloop-aaa-rechargeable-battery-charger-kit-profile-375.webp) / [1440](qa/phase5-5/panasonic-eneloop-aaa-rechargeable-battery-charger-kit-profile-1440.webp) |

The immutable [main baseline](qa/phase5-5/before.json) was captured before implementation. Historical baseline files are unchanged. Earlier preservation tests have a narrow allowlist for necessary schema/rendering/category/media-validator integration; the new test freezes every other old source and all 38 product records/media entries. Tests also reject forged publication, mismatched evidence, held decisions and blocked safety states for the new products.

Initial QA found one missing attribution colon in the new ORIA housing value and a validator selecting the disclosure anchor instead of the affiliate button. Both were corrected; final local runs pass. No product artwork was regenerated or existing product approval changed.

## Changed files

78 files: three product records; three original PNGs and nine WebPs plus CSV/manifest; focused category/schema/caption/profile/hub integration; regression counters and preservation checks; CI wiring; report and QA artifacts including 18 screenshots. [Exact file inventory](qa/phase5-5/changed-files.json). Existing product records, account configuration, affiliate release functions, GA4 code and home source remain unchanged.

## Remaining limits and release verdict

**MERGE for this scoped informational integration and recorded-link permission**, subject to green PR CI and owner review. This is not full product verification or editorial indexation approval. ORIA model/manual/limits remain unconfirmed; current Amazon offers and delivered regional details for all three remain independently uninspected; the AAA 850 mAh illustration label remains visibly qualified. The owner's later merge and deployment are separate actions.
