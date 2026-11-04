# Four survival universes and cinematic imagery

Based on merged PR #33, commit `0cde9ab7cf4cf7aae1d39eff7c989cdb7a212145`. This change adds WHITEOUT and the supplied cinematic assets using the existing Astro, taxonomy, catalogue, product and media architecture. No dependencies, tracking configuration or affiliate policy were added or changed.

## Pages and navigation

- `/blackout/`, `/fallout/` and `/outbreak/` retain their existing URLs, search titles, descriptions, planning content and product records. Each gains a responsive cinematic hero and its supplied scenario title.
- `/whiteout/` adds winter ground-insulation, sleep-system, shelter and repair planning, with its first product collection. It is indexable independently of product commercial approval.
- `/gear/therm-a-rest-neoair-xtherm-nxt-review/` adds an informational product profile using the existing template, disclosures, breadcrumbs and pending-link controls.
- Homepage sector cards, shared navigation, footer, equipment directory, category filters and internal planning links include WHITEOUT. The mega-menu contains four equipment divisions and the existing Discover column. Its JavaScript and keyboard/focus behavior are unchanged.

BLACKOUT uses amber `#F59E0B`, FALLOUT deep red `#DC2626`, OUTBREAK green `#65D91E` and WHITEOUT glacier blue `#7DD3FC`. Smaller FALLOUT text uses a lighter red for contrast. WHITEOUT includes `#38BDF8`, `#0369A1` and `#F0F9FF` details. Hero text follows the scene on small screens, preserving the subject without overlaying it.

## Images

The 19 supplied WebPs were already optimized. They are copied byte-for-byte, with no regeneration, re-encoding, upscaling, colour change or destructive crop. Browser `object-position` keeps the survivor in the mobile viewport. All existing artwork and manifest bytes remain unchanged.

For each of `blackout`, `fallout`, `outbreak`, `whiteout`:

- Source/delivery: `public/images/universes/{universe}-survival-hero-{768,1280,1600}.webp` → `/images/universes/...`
- Social image: `public/images/universes/{universe}-survival-og.webp` → `/images/universes/...`, measured 1200×630.

| Universe | 768 px | 1280 px | 1600 px | OG 1200×630 |
| --- | ---: | ---: | ---: | ---: |
| Blackout | 48,060 B | 120,916 B | 168,356 B | 119,446 B |
| Fallout | 91,480 B | 219,434 B | 304,400 B | 209,884 B |
| Outbreak | 59,218 B | 136,708 B | 183,984 B | 130,912 B |
| Whiteout | 78,242 B | 187,670 B | 256,276 B | 187,826 B |

Product sources: `assets/media/whiteout/therm-a-rest-neoair-xtherm-nxt-whiteout{-640,-960,}.webp`, delivered through the existing static media-route convention at `/images/whiteout/`. Measured sizes are 640×640 (63,646 B), 960×960 (127,324 B), and **1254×1254** (205,616 B). The supplied file named `-1280` actually measures 1254; the full filename is the requested `therm-a-rest-neoair-xtherm-nxt-whiteout.webp`, and its descriptor uses 1254w.

`src/data/media/whiteout-manifest.json` and `assets/media/whiteout-image-manifest.csv` record the new product mapping separately. `docs/qa/four-universes/assets.json` records all input names, final paths, dimensions, byte counts and SHA-256 hashes. Heroes use responsive widths, explicit dimensions, eager loading and high fetch priority; homepage previews and product cards lazy-load.

## Therm-a-Rest verification and release status

The owner supplied ASIN `B0CS4P19QQ` and `https://www.amazon.ca/dp/B0CS4P19QQ?tag=apocalypsegear-20`. On November 2, 2026, the web reader could not access Amazon.ca. Search results are insufficient to verify the exact selected size, variant, seller or delivered package. The stored URL retains the exact supplied tracking ID, but **no rendered link to this ASIN is enabled anywhere**. The explicit product-level decision is `hold`.

[Therm-a-Rest’s official model page](https://cascadedesigns.com/products/neoair-xtherm-nxt-sleeping-pad) documents the NXT family, 7.3 R-value and size choices. These are manufacturer specifications, not measurements by ApocalypseGearLab or confirmation of the Amazon variant. Size-dependent values are labelled as Regular-size reference information. R-value is not presented as a minimum safe air temperature. The profile explains system fit, puncture/valve limits, moisture management and contingency planning without inventing ratings, prices, availability or testing.

The artwork is explicitly labelled AI-generated concept imagery, not an official manufacturer photograph. The references link to the manufacturer’s official photographs; those photographs are not copied into the repository without reuse authorization.

The record remains `draft`, `informational`, `not-tested`, `listingVerified: false`, `publicationApproved: false`, `safetyStatus: pending`, `lastVerified: null`. It uses the existing intentional `noindex, nofollow` and sitemap exclusion. Product/Offer/Review/rating schema is withheld under the unchanged release policy; product breadcrumbs remain. No approval flags were set to satisfy the new-page request.

Manual review remains necessary to inspect the live Amazon model and selected size, verify the seller/package, and complete editorial and safety checks before enabling the affiliate destination or commercial product indexing.

## SEO and preservation

All four universe pages have one H1, unique metadata, absolute production canonicals and OG URLs, measured image dimensions, descriptive image alt text, Twitter large-image cards, CollectionPage and BreadcrumbList JSON-LD. Existing ItemList schemas remain, including the new WHITEOUT equipment list. The existing sitemap mechanism adds `/whiteout/`, preserves the legacy sitemap URL, and continues excluding unapproved products.

`docs/qa/four-universes/before.json` captures every tracked pre-change source, asset and public file directly from the merged base. Old product/media/logo/Google/affiliate bytes remain protected. Intentional source changes use exact reversible hunks in `source-changes.json`, whose checksum is pinned by the new unit test; unrelated bytes and mutations still fail historical baseline comparisons. Original historical QA baselines are not refreshed. Only exact newly introduced image URLs and the new collection schema are projected from older rendered snapshots. Earlier metadata fields remain compared exactly.

## Validation

Validation evidence is recorded in `docs/qa/four-universes/validation.json`, with desktop/mobile screenshots under `screenshots/`. New checks verify all 19 supplied WebPs, their exact delivery bytes, four universe metadata/schema/sitemap contracts, held-ASIN behavior, responsive source selection, layout shifts and accessibility. Existing affiliate-event deduplication, native new-tab, media permission, no-JavaScript, filtering and historical preservation tests remain enabled.

Local validation: all 12 non-browser commands pass, including 118 unit tests, the existing reproducible media encoder checks, all 19 supplied WebP hash/dimension/decode checks, 56 HTML pages, 5,115 internal references and eight sitemap URLs. Conversion checks find 47 profiles, 41 active Canadian destinations, six explicit holds and 245 correctly tagged purchase controls. No existing commercial hold was removed.

The full browser run exercised 179 cases; eight failures identified the old sitemap count, a test that expanded only three mobile divisions, and insufficient contrast on smaller FALLOUT guide headings. Those were fixed without relaxing accessibility or commercial controls. The focused rerun exercised 29 cases, including the added WHITEOUT collection case; all functional checks passed. A screenshot-only lazy-image timeout was then fixed by scrolling before decoding, and its final rerun passes. All 180 current browser cases are covered across these runs; the complete suite is required again in GitHub Actions. All eight cinematic hero captures measure CLS 0 with no axe violations. Catalogue/profile checks cover 320–1920 px.

No merge or deployment is performed by this change.
