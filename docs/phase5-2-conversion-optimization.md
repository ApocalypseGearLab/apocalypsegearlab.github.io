# Phase 5.2 — Amazon-first conversion audit

Implemented on `feat/amazon-first-conversion-optimization` from merged-main `bbf591cdcf8188374a5e979826bf64e948fda3e2` (PR #23). The working tree was clean, and no matching PR was open. No other branch, product approval, merge or deployment is changed.

## Inventory and scope

The inventory was generated **before implementation** from a production build and all tracked text. It is retained in [inventory-before.json](qa/phase5-2/inventory-before.json); the repeatable production audit is [inventory-after.json](qa/phase5-2/inventory-after.json). [repository-urls.json](qa/phase5-2/repository-urls.json) separately inventories 760 URL tokens across 246 tracked text files (547 tracked files overall). Dependency URLs, historical QA, deliberate invalid test URLs and dynamic templates in that repository index are not presented as live visitor destinations.

Audited: **34 products, 34 product pages, 41 HTML pages**, all 34 stored Canadian URLs, and **176 rendered purchase controls**. **29 active / 5 blocked**, unchanged. No invalid affiliate tag or non-Amazon purchase CTA was found; consequently **zero tags corrected and zero manufacturer purchase buttons removed**.

The homepage, gear catalogue, three collection hubs, all individual profiles, related cards, four compatible-filter cards, header, footer, metadata, schemas, source data, release policy and existing tests were inspected. No standalone category pages or survival-guide routes currently exist. The existing hub checklists use internal links. The comparison component currently has no production call site or purchase CTA and is preserved. No thin pages are added.

| External URL class | Before: anchor instances | After: anchor instances | Treatment |
| --- | ---: | ---: | --- |
| A: Amazon.ca affiliate link | 176 | 176 | Canonical approved ASIN/tag only |
| B: Manufacturer documentation | 176 | 55 | Legitimate references preserved |
| C: Manufacturer commercial landing used as documentation | 107 | 25 | Manufacturer store landing is cited for documentation, never as a purchase CTA |
| D: Competing retailer | 1 | 1 | Zoro identity cross-reference retained as documentary evidence |
| E: Independent informational reference | 1 | 1 | Legitimate references preserved |
| F: Legal, regulatory or official safety reference | 29 | 29 | Legitimate references preserved |
| G: Other legitimate destination / untagged documentary Amazon evidence | 12 | 12 | Legitimate references preserved |

There are **79 manufacturer source bindings, 71 distinct manufacturer URLs**, all retained. All **123 source records** remain linked in the technical section. Before: 326 documentary external-anchor instances; after: 123. **203 repetitive external specification links now point to the corresponding in-page citation**, preserving the original destination once in the reference list. No source is replaced with an affiliate URL. The 12 untagged Amazon documentary anchors are source evidence, not missing affiliate tags.

## Implementation

- One shared primary `View on Amazon.ca` control per eligible product profile is placed directly after its summary/status and before its artwork. Existing model/safety cautions remain above the control. There is no added duplicate purchase button; a quiet internal `Back to buying options` link returns long-page readers to it.
- Manufacturer and other sources are ordinary underlined links in **Technical Sources & References**, at the bottom after related equipment. Neutral readable typography replaces their previous amber emphasis. Source IDs and technical citations remain keyboard-accessible without JavaScript; no collapsed/hidden documentation is introduced.
- The shared button rejects non-Canadian, untagged, malformed or non-Amazon merchant destinations, while the profile filters purchase options to Amazon.ca. This display guard supplements the unchanged product-level release checks; it grants no approval. All five existing holds remain, including Kidde, INIU and Explorer 300.
- Cards, related products and compatible filters reuse the existing components, canonical URLs and release decisions. No product JSON, illustration, colour, navigation, homepage bunker, price, rating, availability or recommendation is changed.

## GA4 and disclosure

The existing single Google loader/configuration and `affiliate_click` handler are reused. Canonical product name (up to GA4's value length), product ID, ASIN, merchant, marketplace, destination and sanitised source-page path are preserved, with one of five explicit placements: `catalogue-card`, `collection-card`, `profile-summary`, `related-card`, `compatible-filter`. The document-level installation guard still prevents duplicate listeners. No click is cancelled or redirected by analytics.

Documentary anchors use a separate **source_reference_click** event with product/source IDs, declared source kind and destination path. Both source and page query strings/fragments are excluded; documentary clicks never emit `affiliate_click`. Internal citation jumps do not emit either custom outbound event. An absent/throwing analytics function still leaves native navigation operational. Existing optional tracking/privacy behaviour is retained.

The 29 own-profile Amazon activations in the new global browser test each produce exactly one expected custom event. Eight documentary mouse/keyboard activations covering manufacturer, retailer, safety and recall references each produce exactly one source event and no affiliate conversion. Existing placement and keyboard/new-tab tests also pass. Amazon/documentary destinations are mocked and Google requests are blocked in QA; no live GA4 delivery, admin configuration or conversion uplift is claimed. GA4 custom dimensions for the new event parameters would need registration in the property to appear in ordinary reports; no account settings were changed. See [Google event parameters](https://developers.google.com/analytics/devguides/collection/ga4/event-parameters).

The existing visible Associates statement and nearby disclosures remain, along with `rel="sponsored nofollow noopener"` and accessible new-tab notice. The [Amazon.ca disclosure guidance](https://associates.amazon.ca/help/node/topic/GPXFHVYZMTGPUMPE) and [Operating Agreement](https://associates.amazon.ca/help/operating/agreement) were consulted. Final Associates approval remains false; account standing is not independently authenticated.

## SEO, accessibility and performance

The repeatable `npm run test:conversion` compares the production DOM against pre-change snapshots for every existing page: titles, descriptions, H1s, canonicals, robots, JSON-LD, image delivery attributes, header/footer links and unique documentary URL sets. Sitemap XML and robots.txt remain identical. All informational product profiles retain `noindex, nofollow`; no unsupported Product/Offer/review/price/rating data is added. Every raw product record and protected source/media file is hash-checked. Historical snapshot exceptions list only the deliberate shared integration files; the new baseline and semantic tests cover their replacements.

Responsive QA covers **320, 375, 768, 1024, 1440 and 1920px**. The three sampled HUD profiles pass automated WCAG A/AA checks, keyboard focus and minimum 44px target checks; no horizontal overflow or observed layout shift occurred (CLS 0 in that lab check). Actual phone/desktop profiles, CTA and source screenshots were inspected. Image dimensions, responsive variants, priority and loading attributes are unchanged. No new runtime dependency, font, popup, image request or tracking loader is added. Field Core Web Vitals, INP, CrUX and comparative LCP were not measured, so no all-metric performance or ranking improvement is claimed.

## Validation results

| Check | Result |
| --- | --- |
| Astro check | 87 files; zero errors, warnings or hints |
| Unit tests | 74 passed, zero failed |
| Images, release, affiliate and product-rendering checks | Passed; product data restored after synthetic fixtures |
| Production build | 41 HTML pages |
| Site/SEO/internal links | 1,598 internal references; five sitemap URLs; passed |
| Global conversion audit | 34 profiles; 176 approved Amazon-only controls; 29 active / five held |
| Focused browser QA | Three new tests passed |
| Complete Playwright suite | 95 passed, zero failed |

Exact commands, outcomes, timings and screenshot hashes: [test-results.json](qa/phase5-2/test-results.json). The new global production audit is part of the GitHub CI workflow. Initial development findings (two audit-script type diagnostics and a raw-HTML ordering assertion that matched head CSS) were corrected before the final passing run and are recorded there. CI results for the final commit are linked in the PR.

## Remaining limitations

1. Existing offer/variant evidence limits remain. No fresh Amazon.ca live listing, seller or private account verification is asserted; local URL validation is not offer authentication. No blocked product was automatically enabled.
2. Public documentary HTTP check: 84 non-Amazon source URLs, 38 successful responses, one HTTP 404, 45 inaccessible/unverified responses (including access restrictions). Inaccessibility is not declared a broken link or product defect. [Full HTTP observations](qa/phase5-2/source-link-health.json). The old [Leatherman Japan 2022 catalogue](https://www.leatherman-japan.com/wp/wp-content/uploads/2022/04/Leatherman-2022-Digital-Catalog.pdf) returned 404 in both the header check and web reader. Its existing documentary citation is retained as instructed; it requires future editorial source maintenance. Other manufacturer references on the Wave+ profile remain available. No substitute source or commercial approval is invented.
3. The seven URL classes describe link purpose, not proof of manufacturer endorsement or current content. A manufacturer store may host useful specifications; its presence in a source list does not make it an authorised purchase CTA. One competing-retailer cross-reference (Zoro) remains editorial identity evidence and is explicitly not a buying option.
4. Conversion improvement requires post-release measurement. This change establishes placement and separate event instrumentation; it does not guarantee sales, ranking gains or Google reporting configuration.

## Per-product audit

All rows retain their previous decision. Each active row uses the single tag `apocalypsegear-20`; all profiles preserve their prior indexing rules. Exact per-page placements and CTA metadata are in the JSON inventory.

| Product | ASIN | Affiliate URL | State | Evidence limit or exact blocker |
| --- | --- | --- | --- | --- |
| 3M 2091 P100 Particulate Filters | B001D1JCK4 | [Recorded link](https://www.amazon.ca/dp/B001D1JCK4?tag=apocalypsegear-20) | ACTIVE | Existing recorded-link permission retained; current offer not independently reverified |
| 3M 2097 P100 Particulate Filters | B07FMJPFTY | [Recorded link](https://www.amazon.ca/dp/B07FMJPFTY?tag=apocalypsegear-20) | ACTIVE | Existing recorded-link permission retained; current offer not independently reverified |
| 3M 60921 Organic Vapor/P100 Cartridge Filters | B07571LR2K | [Recorded link](https://www.amazon.ca/dp/B07571LR2K?tag=apocalypsegear-20) | ACTIVE | Existing recorded-link permission retained; current offer not independently reverified |
| 3M 60926 Multi-Gas/Vapor P100 Cartridge Filters | B009POHLRC | [Recorded link](https://www.amazon.ca/dp/B009POHLRC?tag=apocalypsegear-20) | ACTIVE | Existing recorded-link permission retained; current offer not independently reverified |
| 3M 6800 Full Facepiece Reusable Respirator | B00MA4K4C8 | [Recorded link](https://www.amazon.ca/dp/B00MA4K4C8?tag=apocalypsegear-20) | ACTIVE | Existing recorded-link permission retained; current offer not independently reverified |
| 3M Aura 9205+ N95 particulate respirator | B09FM2P1KF | [Recorded link](https://www.amazon.ca/dp/B09FM2P1KF?tag=apocalypsegear-20) | ACTIVE | Existing recorded-link permission retained; current offer not independently reverified |
| 3M GoggleGear 500 protective goggles | B016L26QS0 | [Recorded link](https://www.amazon.ca/dp/B016L26QS0?tag=apocalypsegear-20) | ACTIVE | Existing recorded-link permission retained; current offer not independently reverified |
| 5.11 Tactical RUSH72 2.0 55 L backpack | B0D9R239MT | [Recorded link](https://www.amazon.ca/dp/B0D9R239MT?tag=apocalypsegear-20) | ACTIVE | Existing recorded-link permission retained; current offer not independently reverified |
| Datrex DX2400F Emergency Food Ration — 2400 Calories | B08T57RVBY | [Recorded link](https://www.amazon.ca/dp/B08T57RVBY?tag=apocalypsegear-20) | ACTIVE | Existing recorded-link permission retained; current offer not independently reverified |
| EcoFlow RIVER 2 Pro | B0BVLPGS79 | [Recorded link](https://www.amazon.ca/dp/B0BVLPGS79?tag=apocalypsegear-20) | BLOCKED | The requested B0BVLPGS79 public representation still selects B0D2HX1ZS9 and displays model EFR620 but manufacturer part EFR617. The Canadian electrical variant and exact ASIN configuration are unresolved. No ASIN substitution is authorised by this evidence. |
| ESEE-4 Fixed Blade Knife | B00UY4NS6K | [Recorded link](https://www.amazon.ca/dp/B00UY4NS6K?tag=apocalypsegear-20) | ACTIVE | Existing recorded-link permission retained; current offer not independently reverified |
| Fenix CL26R Pro rechargeable lantern | B0CGKWX5YT | [Recorded link](https://www.amazon.ca/dp/B0CGKWX5YT?tag=apocalypsegear-20) | ACTIVE | Existing recorded-link permission retained; current offer not independently reverified |
| Fenix HM50R V2.0 rechargeable headlamp | B0H6R34CBL | [Recorded link](https://www.amazon.ca/dp/B0H6R34CBL?tag=apocalypsegear-20) | ACTIVE | Existing recorded-link permission retained; current offer not independently reverified |
| FNIRSI GC-01 Geiger Counter | B0BHH9X1WG | [Recorded link](https://www.amazon.ca/dp/B0BHH9X1WG?tag=apocalypsegear-20) | ACTIVE | Existing recorded-link permission retained; current offer not independently reverified |
| Garmin GPSMAP 67i satellite communicator | B0C3WQPQPL | [Recorded link](https://www.amazon.ca/dp/B0C3WQPQPL?tag=apocalypsegear-20) | ACTIVE | Existing recorded-link permission retained; current offer not independently reverified |
| Gerber StrongArm Fixed Blade Knife | B00U0IOYOU | [Recorded link](https://www.amazon.ca/dp/B00U0IOYOU?tag=apocalypsegear-20) | ACTIVE | Existing recorded-link permission retained; current offer not independently reverified |
| INIU P62 20000 mAh 65 W power bank | B0DB888L9F | [Recorded link](https://www.amazon.ca/dp/B0DB888L9F?tag=apocalypsegear-20) | BLOCKED | Exact-model safety verification is incomplete. |
| Jackery Explorer 1000 v2 | B0D7PPG25F | [Recorded link](https://www.amazon.ca/dp/B0D7PPG25F?tag=apocalypsegear-20) | ACTIVE | Existing recorded-link permission retained; current offer not independently reverified |
| Jackery Explorer 300 | B082TMBYR6 | [Recorded link](https://www.amazon.ca/dp/B082TMBYR6?tag=apocalypsegear-20) | BLOCKED | Regional model identity, capacity and voltage must be matched to the Canadian listing. |
| Jackery SolarSaga 100 W Air | B0FX8P4JST | [Recorded link](https://www.amazon.ca/dp/B0FX8P4JST?tag=apocalypsegear-20) | ACTIVE | Existing recorded-link permission retained; current offer not independently reverified |
| Kidde C3010 carbon monoxide alarm | B00FHW7PBS | [Recorded link](https://www.amazon.ca/dp/B00FHW7PBS?tag=apocalypsegear-20) | BLOCKED | Canadian model and certification evidence are incomplete. |
| Leatherman Wave+ multi-tool | B079MJBP21 | [Recorded link](https://www.amazon.ca/dp/B079MJBP21?tag=apocalypsegear-20) | ACTIVE | Existing recorded-link permission retained; current offer not independently reverified |
| Marmot PreCip rain jacket | B0CMS33YXX | [Recorded link](https://www.amazon.ca/dp/B0CMS33YXX?tag=apocalypsegear-20) | ACTIVE | Existing recorded-link permission retained; current offer not independently reverified |
| Mechanix Wear M-Pact work gloves | B00939MRAA | [Recorded link](https://www.amazon.ca/dp/B00939MRAA?tag=apocalypsegear-20) | ACTIVE | Existing recorded-link permission retained; current offer not independently reverified |
| Merrell Moab 3 Mid Waterproof hiking boots | B0987Z7CKY | [Recorded link](https://www.amazon.ca/dp/B0987Z7CKY?tag=apocalypsegear-20) | ACTIVE | Existing recorded-link permission retained; current offer not independently reverified |
| Midland ER310 emergency radio | B015QIC1PW | [Recorded link](https://www.amazon.ca/dp/B015QIC1PW?tag=apocalypsegear-20) | ACTIVE | Existing recorded-link permission retained; current offer not independently reverified |
| Morakniv Garberg BlackBlade Carbon Steel Survival Kit | B09214DLJ6 | [Recorded link](https://www.amazon.ca/dp/B09214DLJ6?tag=apocalypsegear-20) | ACTIVE | Existing recorded-link permission retained; current offer not independently reverified |
| NANUK 904 first aid kit | B0G3XYHL33 | [Recorded link](https://www.amazon.ca/dp/B0G3XYHL33?tag=apocalypsegear-20) | BLOCKED | NANUK Canada documents a filled FSA03 kit, but B0G3XYHL33 is not matched to that SKU or confirmed as filled. US FSA02 still has 109/110 across repeated descriptions; Canadian FSA03 has 108/110. Substitutions, delivered expiry and sterile seals remain unverified. Obtain the actual Canadian SKU and current fill list. |
| ReadyWise 84 Servings Gluten-Free Emergency Food Supply Bucket | B00TX5J74S | [Recorded link](https://www.amazon.ca/dp/B00TX5J74S?tag=apocalypsegear-20) | ACTIVE | Existing recorded-link permission retained; current offer not independently reverified |
| Reliance Aqua-Tainer 7-gallon water container | B001QC31G6 | [Recorded link](https://www.amazon.ca/dp/B001QC31G6?tag=apocalypsegear-20) | ACTIVE | Existing recorded-link permission retained; current offer not independently reverified |
| Royale Velour Plush & Thick Toilet Paper | B085XRS7KP | [Recorded link](https://www.amazon.ca/dp/B085XRS7KP?tag=apocalypsegear-20) | ACTIVE | Existing recorded-link permission retained; current offer not independently reverified |
| Sawyer Squeeze SP129 water filtration system | B00B1OSU4W | [Recorded link](https://www.amazon.ca/dp/B00B1OSU4W?tag=apocalypsegear-20) | ACTIVE | Existing recorded-link permission retained; current offer not independently reverified |
| SOL Emergency Bivvy with rescue whistle | B08NC9BLQ5 | [Recorded link](https://www.amazon.ca/dp/B08NC9BLQ5?tag=apocalypsegear-20) | ACTIVE | Existing recorded-link permission retained; current offer not independently reverified |
| S.O.S. Emergency Food Rations — 3600 Calories | B00W20PIHQ | [Recorded link](https://www.amazon.ca/dp/B00W20PIHQ?tag=apocalypsegear-20) | ACTIVE | Existing recorded-link permission retained; current offer not independently reverified |

## Screenshots

Twenty QA WebPs preserve rendered phone/desktop profiles, CTA regions, source sections and the Kidde blocked state. These are screenshot delivery copies only; original product assets are untouched.

| Sector | Phone profile | Desktop profile | References example |
| --- | --- | --- | --- |
| BLACKOUT | [375px](qa/phase5-2/screenshots/fenix-cl26r-pro-profile-375.webp) | [1440px](qa/phase5-2/screenshots/fenix-cl26r-pro-profile-1440.webp) | [Sources](qa/phase5-2/screenshots/fenix-cl26r-pro-sources-375.webp) |
| FALLOUT | [375px](qa/phase5-2/screenshots/readywise-84-servings-emergency-food-bucket-profile-375.webp) | [1440px](qa/phase5-2/screenshots/readywise-84-servings-emergency-food-bucket-profile-1440.webp) | [Sources](qa/phase5-2/screenshots/readywise-84-servings-emergency-food-bucket-sources-375.webp) |
| OUTBREAK | [375px](qa/phase5-2/screenshots/3m-6800-full-facepiece-respirator-profile-375.webp) | [1440px](qa/phase5-2/screenshots/3m-6800-full-facepiece-respirator-profile-1440.webp) | [Sources](qa/phase5-2/screenshots/3m-6800-full-facepiece-respirator-sources-375.webp) |

[Blocked Kidde control](qa/phase5-2/screenshots/kidde-held-375.webp).

## Changed files

- `.github/workflows/ci.yml`
- `package.json`
- `src/components/AffiliateButton.astro`
- `src/components/ProductCard.astro`
- `src/components/ProductCatalogue.astro`
- `src/components/ProductProfile.astro`
- `src/components/UniverseHub.astro`
- `src/lib/affiliate-analytics.ts`
- `src/lib/affiliate.ts`
- `tests/browser/analytics.spec.ts`
- `tests/browser/morakniv.spec.ts`
- `tests/browser/phase48.spec.ts`
- `tests/browser/phase5.spec.ts`
- `tests/catalog.test.ts`
- `tests/morakniv.test.ts`
- `tests/phase47.test.ts`
- `tests/phase48.test.ts`
- `tests/phase5.test.ts`
- `docs/phase5-2-conversion-optimization.md`
- `docs/qa/phase5-2/baseline.json`
- `docs/qa/phase5-2/inventory-after.json`
- `docs/qa/phase5-2/inventory-before.json`
- `docs/qa/phase5-2/repository-urls.json`
- `docs/qa/phase5-2/screenshots/3m-6800-full-facepiece-respirator-cta-1440.webp`
- `docs/qa/phase5-2/screenshots/3m-6800-full-facepiece-respirator-cta-375.webp`
- `docs/qa/phase5-2/screenshots/3m-6800-full-facepiece-respirator-profile-1440.webp`
- `docs/qa/phase5-2/screenshots/3m-6800-full-facepiece-respirator-profile-375.webp`
- `docs/qa/phase5-2/screenshots/3m-6800-full-facepiece-respirator-sources-1440.webp`
- `docs/qa/phase5-2/screenshots/3m-6800-full-facepiece-respirator-sources-375.webp`
- `docs/qa/phase5-2/screenshots/fenix-cl26r-pro-cta-1440.webp`
- `docs/qa/phase5-2/screenshots/fenix-cl26r-pro-cta-375.webp`
- `docs/qa/phase5-2/screenshots/fenix-cl26r-pro-profile-1440.webp`
- `docs/qa/phase5-2/screenshots/fenix-cl26r-pro-profile-375.webp`
- `docs/qa/phase5-2/screenshots/fenix-cl26r-pro-sources-1440.webp`
- `docs/qa/phase5-2/screenshots/fenix-cl26r-pro-sources-375.webp`
- `docs/qa/phase5-2/screenshots/kidde-held-1440.webp`
- `docs/qa/phase5-2/screenshots/kidde-held-375.webp`
- `docs/qa/phase5-2/screenshots/readywise-84-servings-emergency-food-bucket-cta-1440.webp`
- `docs/qa/phase5-2/screenshots/readywise-84-servings-emergency-food-bucket-cta-375.webp`
- `docs/qa/phase5-2/screenshots/readywise-84-servings-emergency-food-bucket-profile-1440.webp`
- `docs/qa/phase5-2/screenshots/readywise-84-servings-emergency-food-bucket-profile-375.webp`
- `docs/qa/phase5-2/screenshots/readywise-84-servings-emergency-food-bucket-sources-1440.webp`
- `docs/qa/phase5-2/screenshots/readywise-84-servings-emergency-food-bucket-sources-375.webp`
- `docs/qa/phase5-2/source-link-health.json`
- `docs/qa/phase5-2/test-results.json`
- `scripts/audit-conversion.ts`
- `tests/browser/conversion.spec.ts`
- `tests/conversion-fixture.ts`
- `tests/conversion.test.ts`

No automatic merge or deployment.
