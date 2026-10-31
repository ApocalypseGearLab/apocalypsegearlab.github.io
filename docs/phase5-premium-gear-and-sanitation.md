# Phase 5.0 — Outdoor utility and household sanitation

Base: `main` at `a090b5dbe277f34f83b209e7e140e3f409a34801`. PR #21 is confirmed merged; #17–#20 remain in its history. No open PR or uncommitted changes existed at the start. Branch: `feat/phase5-premium-gear-and-sanitation`.

## Architecture and scope

The existing JSON collection and `productSchema` remain the product source of truth. `taxonomy.ts` adds only `fixed-blade-knives` in OUTBREAK and `hygiene-sanitation` in FALLOUT. The shared product cards, profiles, affiliate helpers, release policy, tracking handler and SEO rules are reused. No parallel catalogue, new category landing page or second Google tag is created.

The imported-media manifest appends four records; the previous 30 associations remain identical. Four original PNGs are preserved byte-for-byte and twelve WebPs are added. Product cards use their existing lazy loading, intrinsic 1254-square dimensions, 480/960/1254 srcset and complete, contained HUD composition. Finished artwork is never regenerated, recoloured or cropped. Other product images and the bunker are not re-encoded.

All 30 existing product JSON files are unchanged, including the 2091 activation. Preservation tests protect previous source, media, commercial rules, GA4 `G-YFJJ5N9RBX`, GSC, layouts, styles and workflows. Historical snapshots are retained; tests delegate only the four necessary additive integration files to Phase 5 preservation checks. Existing categories are verified as an unchanged prefix of the extended taxonomy.

## Products and commercial decisions

| Product / profile path | ASIN | Image | Profile | Affiliate CTA | SEO |
|---|---|---|---|---|---|
| Gerber StrongArm — `/gear/gerber-strongarm-fixed-blade-knife/` | B00U0IOYOU | Green HUD, three WebPs | Informational | Recorded link permitted | Noindex |
| ESEE-4 — `/gear/esee-4-fixed-blade-knife/` | B00UY4NS6K | Green HUD, three WebPs | Informational | Recorded link permitted | Noindex |
| Morakniv Garberg — `/gear/morakniv-garberg-blackblade-carbon-survival-kit/` | B09214DLJ6 | Green HUD, three WebPs | Informational | Held: selected kit/contents require confirmation | Noindex |
| Royale Velour — `/gear/royale-velour-plush-thick-toilet-paper/` | B085XRS7KP | Red HUD, three WebPs | Informational | Recorded link permitted | Noindex |

Each recorded URL is `https://www.amazon.ca/dp/{ASIN}?tag=apocalypsegear-20`. The three permissions use the explicit owner-provided product/variant/ASIN brief and manufacturer reference documentation, under the existing recorded-link policy. `listingEvidence.method` is `owner-document`, **not** `live-page`. The work order is not described as an attached Amazon capture: no capture files or dates were provided for this phase. Attempts to read all four Amazon.ca URLs failed through the web reader, without an observable HTTP code. Technical inaccessibility is not treated as invalidity or stock information.

`listingVerified=false`, `safetyStatus=pending`, `publicationApproved=false`, `testing=not-tested`, `reviewStatus=draft`, `visibility=informational` and `lastVerified=null` remain explicit. The account's final approval is not declared confirmed. A permitted recorded link does not authenticate a seller, exact current offer, delivered units or safety for a particular use. Price, stock, ratings, awards, discounts and personal testing are not invented.

The catalogue now has 34 profiles: nine BLACKOUT, ten FALLOUT and fifteen OUTBREAK. There are 28 permitted links and six holds: the five previous holds plus the selected Garberg kit. No global approval switch or mandatory hold is weakened.

## Verified reference facts and remaining limits

- **Gerber:** the [manufacturer plain-edge coyote reference](https://gerbergear.com/products/strongarm-coyote-brown-plain-edge-30-001058n) documents 30-001058N, full tang, 420HC, ceramic coating, 4.8-inch blade, 9.8-inch overall length, 7.2-ounce stated weight and modular sheath. These are reference specifications, not independent verification of B00U0IOYOU or its delivered mounting parts.
- **ESEE:** the [manufacturer family/variant table](https://www.eseeknives.com/product/esee-4) distinguishes carbon and stainless references and lists 4P-B with a black sheath. Length, thickness and knife-only weight are documented. Gray Micarta is the owner's selected reference; the actual steel, scale material, SKU and belt hardware must be matched on the selected offer. No warranty promise or alloy substitution is inferred.
- **Morakniv:** the [current manufacturer page](https://www.morakniv.com/en/products/garberg-survival-kit-c) confirms item 13915, carbon/DLC reference, 109 mm blade, 3.2 mm thickness, 229 mm knife length and the manufacturer's survival-kit accessories. It does **not** corroborate the contents of B09214DLJ6. The old `.se` product URL returned 404; the current `.com` page was read. The observed High price / See All Buying Options UI is recorded internally, not presented as unavailability. The retailer link remains held until the selected carbon kit and actual sheath, ferro rod, sharpener and cord contents are matched.
- **Royale:** the owner brief describes **12 physical rolls**, marketed as equivalent to 24 regular rolls. [Royale's product page](https://www.royale.ca/products/bathroom-tissue/) and [FAQ](https://www.royale.ca/faq/) document its range and brand statements. Packaging art, equivalence and environmental text are not proof of 24 physical rolls, current sheet count, independent environmental certification or a cheapest-price ranking. No current seller or pack audit is claimed.

The new knife content addresses controlled camp utility, maintenance and secure storage. It contains no combat techniques or blanket self-defence-carry permission. The [Canadian Criminal Code dangerous-purpose provision](https://laws-lois.justice.gc.ca/eng/acts/C-46/section-88.html) and [concealed-weapon provision](https://laws-lois.justice.gc.ca/eng/acts/C-46/section-90.html) were consulted; readers are told to check applicable carrying and venue rules, without a legal determination for their situation.

The existing hubs gain short outdoor-tool and sanitation checklists with links drawn from the actual products. Related-product sections connect the new knives to each other and existing outdoor equipment, and Royale to water/household supplies. No existing product JSON needs reciprocal editing and no thin guide page is introduced.

## Images, provenance and sizes

The owner supplies and explicitly directs integration of these four finished concept illustrations. Per-asset provenance records this limited authorization; it is not independent chain-of-title verification, manufacturer endorsement or physical authentication. The existing discreet caption remains “Concept illustration, not a product photograph.” Alt text describes the actual artwork and qualifying packaging/accessory limitations.

| Artwork | Original PNG bytes | 480 WebP | 960 WebP | 1254 WebP | Full-size reduction |
|---|---:|---:|---:|---:|---:|
| Gerber | 2,669,589 | 64,642 | 217,850 | 331,718 | 87.57% |
| ESEE-4 | 2,839,692 | 57,222 | 214,378 | 337,880 | 88.10% |
| Garberg | 2,778,724 | 63,978 | 224,304 | 350,952 | 87.37% |
| Royale | 2,437,522 | 54,466 | 173,556 | 255,972 | 89.50% |

All sources and outputs are 1:1. The CSV `assets/media/phase5-image-manifest.csv` and `docs/qa/phase5/media-review.json` record mappings, dimensions, byte sizes, SHA-256 and review notes. Browser rendering is checked separately from asset-header/hash validation. Original PNGs are not delivered by public image routes.

## Validation and corrections

| Check | Result |
|---|---|
| Astro check | 81 files, zero errors/warnings/hints |
| Unit tests | 68/68 passed |
| Media validation | 34 unique mappings; 33 admissible illustrations, rejected Explorer 300 preserved |
| Affiliate audit / release check | Exact URL/domain/ASIN/tag; 28 permitted, six held; final approval false |
| Product schema/release scenarios | Passed; fixtures restored after execution |
| Production build | 41 HTML pages |
| Site / SEO validation | 1,365 internal references, five sitemap URLs; canonicals, noindex, robots and JSON-LD passed |
| Full browser suite | 91/91 passed, 3.9 min locally |
| GitHub CI | See the dedicated PR for the result on its delivered commit |

The first check found an unused test variable; an exact-link assertion now uses it. The first unit run retained two historical expectations (30 products and a fully immutable taxonomy); these were narrowed to preserve old content while allowing the tested additive extension. No historical snapshot or commercial safeguard was rewritten.

Site validation caught public workflow wording and, more importantly, a source citation that made the held Garberg ASIN clickable outside its disabled purchase control. The public wording was corrected and the held retailer citation removed from rendered sources; its registered URL remains in internal product evidence. A browser regression assertion now requires **zero** public anchors containing that held ASIN. The validation rule was preserved, not weakened.

Browser tests reuse the GA4 implementation from #19 and mock Google/Amazon. Authorized buttons must be real links with the exact tag, isolated new tabs, `sponsored nofollow noopener`, visible disclosure and one `affiliate_click` per mouse/keyboard action. Held products cannot link via cards, profiles, related cards or source citations.

Responsive coverage spans 320, 375, 768, 1024, 1440 and 1920 px, including axe checks, intrinsic image ratios, full HUD framing and laboratory CLS observation. These checks do not assert field Core Web Vitals, exhaustive WCAG certification, physical product testing or private GA/GSC ingestion.

Local logs are retained under `.tools/qa/phase5/`; persistent evidence is under `docs/qa/phase5/`. No merge or deployment is performed by this phase.

## Captures and changed files

Production-preview captures: four mobile cards and four desktop profiles were manually inspected; all four profiles also passed automated checks at six widths. Sixteen QA WebPs retain phone/desktop card and profile evidence. Encoding these screenshots does not re-encode any product artwork.

| Product | Card captures | Profile captures |
|---|---|---|
| gerber-strongarm-fixed-blade-knife | [phone](qa/phase5/gerber-strongarm-fixed-blade-knife-card-375.webp) / [desktop](qa/phase5/gerber-strongarm-fixed-blade-knife-card-1440.webp) | [phone](qa/phase5/gerber-strongarm-fixed-blade-knife-profile-375.webp) / [desktop](qa/phase5/gerber-strongarm-fixed-blade-knife-profile-1440.webp) |
| esee-4-fixed-blade-knife | [phone](qa/phase5/esee-4-fixed-blade-knife-card-375.webp) / [desktop](qa/phase5/esee-4-fixed-blade-knife-card-1440.webp) | [phone](qa/phase5/esee-4-fixed-blade-knife-profile-375.webp) / [desktop](qa/phase5/esee-4-fixed-blade-knife-profile-1440.webp) |
| morakniv-garberg-blackblade-carbon-survival-kit | [phone](qa/phase5/morakniv-garberg-blackblade-carbon-survival-kit-card-375.webp) / [desktop](qa/phase5/morakniv-garberg-blackblade-carbon-survival-kit-card-1440.webp) | [phone](qa/phase5/morakniv-garberg-blackblade-carbon-survival-kit-profile-375.webp) / [desktop](qa/phase5/morakniv-garberg-blackblade-carbon-survival-kit-profile-1440.webp) |
| royale-velour-plush-thick-toilet-paper | [phone](qa/phase5/royale-velour-plush-thick-toilet-paper-card-375.webp) / [desktop](qa/phase5/royale-velour-plush-thick-toilet-paper-card-1440.webp) | [phone](qa/phase5/royale-velour-plush-thick-toilet-paper-profile-375.webp) / [desktop](qa/phase5/royale-velour-plush-thick-toilet-paper-profile-1440.webp) |

Changed implementation files: four new JSON records in `src/data/products/`; two entries in `src/config/taxonomy.ts`; the checklist section in `src/components/UniverseHub.astro`; four appended records in `src/data/media/imported-manifest.json`; `assets/media/phase5-image-manifest.csv`; four PNG originals and twelve WebPs; media verification and test expectations; two new Phase 5 test files and the test command in `package.json`; this report and its QA evidence/captures. The other product records, shared affiliate/tracking components, release policy, layouts, CSS, bunker and workflows are unchanged.

The new affiliate tests exercise 18 isolated mouse/keyboard openings across the three permitted products and three placements; the catalogue-wide suite also checks 84 isolated openings. All 34 profiles retain informational SEO, and all old commercial decisions remain unchanged.
