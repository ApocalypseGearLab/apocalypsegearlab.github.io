# BougeRV BLACKOUT refrigeration integration

Base: merged PR #27, main `ee3ec72652713f2d89d647c1a83be1b570aaceda`.
Branch: `feat/bougerv-blackout-refrigeration`. No automatic merge or deployment.

## Products and Canadian links

| Route | ASIN | CTA decision |
| --- | --- | --- |
| `/gear/bougerv-53-quart-portable-refrigerator-freezer/` | B0869NCSNH | ACTIVE — documented recorded-link permission |
| `/gear/bougerv-rocky-v3-55qt-dual-zone-portable-car-cooler/` | B0GHMS5Y9Y | ACTIVE — documented recorded-link permission |

Destinations are respectively `https://www.amazon.ca/dp/B0869NCSNH?tag=apocalypsegear-20` and `https://www.amazon.ca/dp/B0GHMS5Y9Y?tag=apocalypsegear-20`. Only the unique `apocalypsegear-20` tag is used. Both entries appear in the gear catalogue, BLACKOUT hub, their individual profiles and reciprocal related cards. BLACKOUT gains a portable-refrigeration category and a short load/food-temperature planning section.

Permission follows the existing policy used for owner-provided ASIN/model references: the work order explicitly associates each ASIN with a documented BougeRV model family. No contradictory selected-ASIN evidence or mandatory product-specific safety hold was established. This is permission to expose the recorded destination, **not independent verification of the current Amazon offer**.

Both canonical Amazon.ca pages were inaccessible through the web reader. No visible live listing title, selected variant, seller, price, stock, included battery or exact accessory inventory is invented. `exactVisibleAmazonListingTitle` and `selectedAmazonVariant` are null in the [internal evidence record](qa/bougerv/evidence.json). No HTTP status was observable, and access failure is not treated as an invalid-link finding. Account configuration and the five existing product holds are unchanged.

## Documentary findings and limits

The model-family evidence comes from [BougeRV Canada’s 53 QT page](https://ca.bougerv.com/products/12v-portable-car-freezer), its [53/42/31 Quart manual](https://cdn.shopify.com/s/files/1/2672/9544/files/12V_53_Quart_50L_Portable_Refrigerator-User-Manual.pdf?v=1659926718), and [BougeRV Canada’s Rocky V3.0 55QT page](https://ca.bougerv.com/products/rocky-dual-zone-metal-fridge). These documentation links belong to internal QA, not the public product pages.

- The 53 QT family is documented as 50 L with one control setting and 12/24 V DC operation. The reference manual gives −4°F to 50°F; the current manufacturer table also lists 68°F, while its FAQ retains 50°F. The profile discloses the conflict and does not guarantee an Amazon revision’s upper limit. A smaller passive section is not represented as a second independently controlled zone.
- Rocky V3.0 is documented as a 55 QT / 52 L dual-zone model. Battery and solar bundles are distinct manufacturer-store selections; none establishes this Amazon package. Canadian and US documentation differ on mass/reference identifiers, so no exact weight or regional SKU is assigned to the uninspected Amazon unit.
- [Health Canada’s emergency food-safety guidance](https://www.canada.ca/en/health-canada/services/food-drinking-water-safe-emergency.html) supports separate thermometer checks, refrigeration at or below 4°C and freezing at or below −18°C. A control setting is not a measured food temperature or proof of a safe cold chain.

No physical test, guaranteed runtime, average consumption, supplied-unit certification or exhaustive recall clearance is claimed. Limited Canada recall/CPSC site searches returned indexes/unrelated results and do not establish safety clearance.

## Amazon-only public presentation

The new `outboundPolicy: "amazon-only"` affects presentation only. Specifications still require included manufacturer citations in JSON, confirmed facts still require valid source IDs, and all release rules remain intact. Source records remain available for internal QA.

For these two profiles, no manufacturer/reference URLs, source anchors or external source section are rendered. All public outbound anchors lead to Amazon.ca affiliate destinations. Other profiles retain the default documentary-reference presentation unchanged. Related cards lead internally to profiles and use their existing authorised Amazon controls.

The primary button, catalogue cards, BLACKOUT cards and reciprocal related cards retain `target="_blank"`, `rel="sponsored nofollow noopener"`, adjacent disclosure and the shared delegated GA4 `affiliate_click` handler. No new analytics handler or client library is installed.

## Artwork and performance

The owner supplies and explicitly directs use of the two approved illustrations. This records owner-directed site authorisation, not independent chain-of-title verification or manufacturer endorsement. The original PNGs are copied byte-for-byte into `assets/media/blackout/originals/`. Manufacturer reference pictures were inspected only as temporary QA files and are not redistributed as site artwork.

The gray/charcoal closed-lid illustration maps only to the 53 QT entry. The silver/dark open-lid illustration with phone maps only to Rocky V3.0. Structural form, handles, lid and control placement were compared against manufacturer reference views. Small lettering, app screens, readings, cans and the battery-style module are illustrative; they do not prove the selected offer’s features or contents. Public captions identify concept artwork.

Six WebPs were created at 480, 960 and 1254 pixels, quality 85, with no cropping, recolouring, regeneration or changes to previous assets. Full-resolution files are 210,164 bytes for the 53 QT (91.60% below its PNG) and 226,186 bytes for Rocky (90.78% below its PNG). The [media record](qa/bougerv/media.json) and CSV preserve filenames, dimensions, hashes and mappings. Existing 36 mappings remain unchanged; the collection now has 38 mappings, 37 publishable illustrations and the original rejected Explorer 300 asset.

## Publication and preservation

Both entries are visible informational drafts, `testing: not-tested`, `listingVerified: false`, `safetyStatus: pending`, `publicationApproved: false`, with null `lastVerified`. Their self-canonicals use the two routes above. Both profiles remain `noindex, nofollow`, excluded from the sitemap and without Product/Offer structured data. Core page indexation, the six sitemap URLs and the bunker are preserved.

The pre-change baseline covers 219 tracked files and 43 production pages. All 36 earlier product JSON files, existing illustrations, account configuration, release/SEO policies and GA4 source remain unchanged. The [production check](qa/bougerv/production.json) compares every previous page’s title, description, robots, canonical, H1, structured data and prior image attributes. Historical QA artifacts are not regenerated; test counts and narrow integration exceptions are extended under a new preservation test. The [exact changed-file list](qa/bougerv/changed-files.txt) records the two JSON entries, media, narrow schema/rendering integration, validation changes and QA artifacts.

## Validation and manual review

See [validation results](qa/bougerv/validation.json), screenshots and responsive records in `docs/qa/bougerv/`. The added `test:bougerv` command runs in CI and checks production routes, catalogue/hub entries, exact CTA URLs, source-link exclusion, noindex, sitemap exclusion and delivered WebP hashes. Browser tests exercise mouse and keyboard clicks in all four placements with isolated retailer/analytics traffic and exactly one event per action.

Final local results: Astro check on 101 files with zero diagnostics; 90 unit tests; 109 Playwright tests; product fixtures; image, release and affiliate audits; production build; site/link/sitemap, conversion and BougeRV validation all pass. The build contains 45 HTML pages, 38 product profiles, 1,774 internal references, six sitemap URLs and 202 authorised CTA instances for 33 unique active Canadian destinations; the original five holds remain. Twelve added product axe audits cover 320, 375, 768, 1024, 1440 and 1920 pixels with zero violations. Twelve final screenshots are archived and relevant rendered captures were visually inspected. Mobile table labels/columns were improved after inspection, and an old preview-card expectation was corrected from eight to ten before the full suite passed.

Before full editorial/indexed release, independently review each selected Canadian listing and exact supplied electrical/variant documentation, resolve the 53 QT range discrepancy, complete product-specific safety review and record editorial publication approval. These outstanding checks do not imply that the already permitted recorded links or current package contents have been independently authenticated.
