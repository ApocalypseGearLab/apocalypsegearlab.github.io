# WHITEOUT Phase 2 implementation review

Latest follow-up: [scoped affiliate automation and site stability](whiteout-affiliate-automation.md) supersedes the older six-hold decisions and test totals below using the newly supplied Amazon screenshots.

Follow-up: [Amazon purchase-button audit](whiteout-amazon-button-audit.md) records the latest destination rechecks, precise remaining holds and additional regression results. The validation totals below describe the initial Phase 2 review.

Prepared locally on `feat/whiteout-phase2` from main `658bbef6c748f4a2ece7555458275e246d9ef600`, which includes the iOS Safari fix. The original checkout and its unrelated `UniverseHero.astro` edit are preserved. No commit, push, merge or deployment is part of this implementation.

Exactly five new records are visible in the feature build, alongside the updated existing Therm-a-Rest record. All six remain informational and `noindex, nofollow` under the existing publication policy. The 41 previously active Canadian affiliate destinations retain their existing permissions. These proposed URLs become live only after an approved release.

## Profiles and routes

| Profile | English URL | French URL |
| --- | --- | --- |
| Outdoor Research Alti II GORE-TEX mitts | [/gear/outdoor-research-alti-ii-gore-tex-mitts/](https://apocalypsegearlab.github.io/gear/outdoor-research-alti-ii-gore-tex-mitts/) | [/fr/gear/outdoor-research-alti-ii-gore-tex-mitts/](https://apocalypsegearlab.github.io/fr/gear/outdoor-research-alti-ii-gore-tex-mitts/) |
| Hestra Army Leather Heli Ski gloves | [/gear/hestra-army-leather-heli-ski-gloves/](https://apocalypsegearlab.github.io/gear/hestra-army-leather-heli-ski-gloves/) | [/fr/gear/hestra-army-leather-heli-ski-gloves/](https://apocalypsegearlab.github.io/fr/gear/hestra-army-leather-heli-ski-gloves/) |
| Oakley Flight Deck XM / M | [/gear/oakley-flight-deck-m-goggles/](https://apocalypsegearlab.github.io/gear/oakley-flight-deck-m-goggles/) | [/fr/gear/oakley-flight-deck-m-goggles/](https://apocalypsegearlab.github.io/fr/gear/oakley-flight-deck-m-goggles/) |
| Smartwool NTS AW15 250 balaclava | [/gear/smartwool-nts-250-balaclava/](https://apocalypsegearlab.github.io/gear/smartwool-nts-250-balaclava/) | [/fr/gear/smartwool-nts-250-balaclava/](https://apocalypsegearlab.github.io/fr/gear/smartwool-nts-250-balaclava/) |
| Smartwool reversible cuffed beanie | [/gear/smartwool-thermal-merino-reversible-cuffed-beanie/](https://apocalypsegearlab.github.io/gear/smartwool-thermal-merino-reversible-cuffed-beanie/) | [/fr/gear/smartwool-thermal-merino-reversible-cuffed-beanie/](https://apocalypsegearlab.github.io/fr/gear/smartwool-thermal-merino-reversible-cuffed-beanie/) |
| Existing Therm-a-Rest NeoAir XTherm NXT | [/gear/therm-a-rest-neoair-xtherm-nxt-review/](https://apocalypsegearlab.github.io/gear/therm-a-rest-neoair-xtherm-nxt-review/) | [/fr/gear/therm-a-rest-neoair-xtherm-nxt-review/](https://apocalypsegearlab.github.io/fr/gear/therm-a-rest-neoair-xtherm-nxt-review/) |

## ASIN, variant and purchase decisions

All supplied candidate URLs have the required `https://www.amazon.ca/dp/ASIN?tag=apocalypsegear-20` structure. The URL audit found no formatting or tracking defect to repair. Amazon access challenges do not establish broken links, invalid ASINs or lack of availability. Purchase eligibility still requires the recorded product-specific evidence and review; an account declaration or a valid URL does not satisfy those requirements.

| Product / candidate ASIN | Evidence obtained | Button and exact remaining requirement |
| --- | --- | --- |
| Outdoor Research — `B0B67C7N9M` | Model 300009 documented in the manufacturer catalogue. Old manufacturer product URL redirects to newer 322807, whose specs were excluded. Catalogue Agate 0862 is red, while the supplied artwork is black. Both original and alternative Amazon requests returned access challenges. | **HELD.** Supply the selected child ASIN, model 300009, size, colour and reference from the actual Canadian offer. Resolve reported alternative `B0B67CFPG7`, Small/Agate / `3000090862006`; it cannot authenticate the black illustrated variant. |
| Hestra — `B00F1F08TM` | Manufacturer documents black five-finger 30570-100 with white goat-leather palm and removable liner. No waterproof membrane. Original and alternative Canadian pages returned access challenges. | **HELD.** Match the selected offer to 30570, Black/White, size 9. Reported `B013YNSJHA`, Red size 5 / `30570-560-05`, is not an approved substitution. |
| Oakley — `B012Y896ZA` | Manufacturer identifies `OO7064-41-0`, M, Matte Black / Prizm Snow Sapphire Iridium, 13% transmission for sun and clouds, Ridgelock and F3 dual lens. Canadian page returned an access challenge. | **HELD.** Match the exact Canadian child ASIN, `OO7064-41`, size M, strap and lens. Reported 150 g is unverified. No universal blizzard/low-light suitability or industrial certification claim is made. |
| Smartwool balaclava — `B002VGHX1A` | Current manufacturer SW0SC967 family documentation supports merino material and construction. It does not authenticate the older NTS AW15 / `SC967-001-ONE` / `BSC967001` revision. Amazon returned an access challenge. | **HELD.** Confirm the older revision, Black, one size and actual composition from the selected offer and matching manufacturer documentation. Reported 50 g remains unverified. The profile explicitly requires additional weather protection when appropriate. |
| Smartwool beanie — `B0DK9VRQF2` | Ordinary HTTP returned a real page selecting **Mink Heather / One Size**. Hidden selected-ASIN data matches B0DK9VRQF2. Canonical and variation data identify `B07WNF5FXC` as the **parent family ASIN**. Manufacturer documentation supports SW0SW956 Black, reversible/cuffed merino construction. | **HELD — confirmed colour mismatch.** Provide a selected dark/Black child ASIN and matching model/colour evidence. The parent ASIN cannot establish that selection. The supplied candidate URL is retained; no guessed replacement is used. Reported 68.04 g remains unverified. |
| Therm-a-Rest — `B0CS54SN91` | Manufacturer table confirms 14016, Regular Wide/Neptune, R 7.3, 540 g, 183 × 64 × 7.6 cm, pump sack, stuff sack and repair kit. Amazon returned an access challenge. | **HELD.** Confirm the selected Canadian 14016 variant and the exact wording/scope of the reported Amazon −20 °C safety statement against manufacturer instructions. R-value is not a minimum air-temperature guarantee. Unsupported 653 kg capacity is excluded from specifications and recorded as unresolved. |

No product in this six-item scope is ready for purchase activation. Their informational pages and images are already enabled in the feature build. Full editorial release still requires exact listing/variant evidence and completed product-specific safety/editorial review. No live inspection of a matching target offer, physical test or certification is invented.

The existing XTherm URL, ID, original cinematic image and original safety notes are retained. Its previously held ASIN `B0CS4P19QQ` is replaced by the owner-requested `B0CS54SN91`, also held. The original ASIN is retained in the exact before/after audit history. The new specifications distinguish Regular Wide (540 g) from Regular (440 g).

## Manufacturer references and evidence

- [Outdoor Research manufacturer catalogue, page 170](https://graniteoutdoor.net/wp-content/uploads/Outdoor-Research-Catalogo-SS-2026.pdf), hosted by its distributor; the historical 300009 model is distinguished from its replacement.
- [Hestra black 30570 five-finger model](https://www.hestragloves.us/products/army-leather-heli-ski-5-finger-black).
- [Oakley Canada OO7064-41 option](https://www.oakley.com/en-ca/product/888392149732).
- [Smartwool current SC967 family](https://www.smartwool.com/en-us/products/thermal-merino-balaclava-sw0sc967).
- [Smartwool SW0SW956 Black](https://www.smartwool.com/en-us/products/thermal-merino-reversible-cuffed-beanie-sw0sw956?variant=63206991921521).
- [Therm-a-Rest size-specific specification table](https://cascadedesigns.com/products/neoair-xtherm-nxt-sleeping-pad).

The [research record](qa/whiteout-phase2/research.json), [HTTP selection evidence](qa/whiteout-phase2/amazon-http.json) and [product verification audit](qa/whiteout-phase2/verification.json) distinguish model facts, owner-supplied candidates, access limitations and unresolved warnings. Full downloaded Amazon HTML remains temporary and is excluded from the release files. The selected-page evidence includes its SHA-256 and the relevant ASIN/size/colour fields, without session or advertising data.

## Images, design and performance

The five supplied PNGs map individually to the five new records. Originals are preserved with hashes in `assets/media/whiteout/source/`; original-source files are not public downloads. Fifteen WebPs provide 480/960/1254 px responsive delivery through the existing image component and permission gate. Dimensions and the complete square HUD frame are retained; no cropping, recolouring or upscaling occurs. Metadata is stripped and delivery has intrinsic dimensions, responsive `srcset`/`sizes`, eager profile images and lazy card images.

Original PNGs total 13,157,125 bytes. Full-size WebPs total 1,027,108 bytes, a 92.19% reduction. All fifteen variants total 1,887,944 bytes. Full-size files range from 164,432 to 239,114 bytes; 480 px card files range from 26,388 to 42,290 bytes. Quality is 82 except the largest Hestra/beanie files, which use 78/80 respectively to stay below 250 KB. [Per-file metrics and hashes](qa/whiteout-phase2/images.json) and the CSV manifest retain exact sizes, mappings and quality values. `node scripts/build-whiteout-phase2-media.mjs --check` reproduces and decodes every WebP.

English and Canadian French alt text and captions identify the artwork as conceptual. Specific caveats explain the OR Agate/black mismatch, Hestra’s five-finger appearance, the non-evidentiary lens tint and the legacy Smartwool association. The XTherm image is byte-for-byte unchanged. The existing colour systems, typography, image frame, header, responsive specification component and Safari selector are retained.

These are asset and browser-lab checks, not a field Core Web Vitals certification. Physical iPhone Safari testing remains pending; Playwright WebKit uses iPhone touch/viewport emulation on Windows.

## Routing, internal links and SEO

The shared renderers automatically generate ten new product pages, producing 61 English and 61 French pages. Existing routes remain available. New category IDs `winter-gloves-mitts`, `winter-headwear` and `snow-goggles` are appended; existing category IDs and destinations are unchanged. WHITEOUT cards, catalogue filters/navigation, related equipment and an additional guide section link to the profiles in both languages.

Canonical tags, reciprocal `en-CA`/`fr-CA`/`x-default` alternates, localized metadata and breadcrumb/collection URLs use the existing architecture. Collection ItemLists include the new references, while unapproved profiles do not acquire Product/Offer/Review/rating schema. All six retain `noindex, nofollow` and remain outside both localized sitemaps; the existing 16 indexable URLs are preserved. The additive dictionary fails closed for missing phrases and is tested against overwriting existing translations.

Affiliate routing, Amazon tag, tracking attributes, GA4, Search Console verification, disclosures and core eligibility/safety policy source are unchanged. Synthetic eligibility and affiliate browser fixtures exercise active and held controls without publishing fabricated evidence or making live Amazon purchase clicks. The original frozen baselines remain intact; a pinned Phase 2 manifest reverses only exact reviewed source hunks for historical comparisons and rejects unrelated changes.

## Final validation and files

| Final check | Result |
| --- | --- |
| Production build | Passed, 122 pages: 61 English / 61 French |
| Astro / TypeScript | Passed, 0 errors / warnings / hints |
| Complete unit suite | 127 passed |
| Complete Chromium browser suite | 212 passed, 0 failed / skipped / flaky |
| Complete WebKit browser suite | 63 passed, 0 failed / skipped / flaky; 320 / 375 / 390 px |
| Site / bilingual / SEO / structured data | Passed; 12,096 internal references, 2,631 dictionary phrases, 16 indexable sitemap URLs |
| Image integrity / deterministic encoding | Passed; 5 supplied PNGs, 15 new WebPs, previous assets preserved |
| Affiliate / product verification / release audits | Passed; 41 existing active links, 11 total held products, no undocumented block or malformed candidate URL |
| Conversion / BougeRV / Phase 5.5 regressions | Passed |
| Actual Astro product and active/held affiliate fixtures | Passed and restored; post-fixture site audit also passed |
| Visual evidence | 64 screenshots; desktop/mobile image frames, bilingual specifications and WebKit touch switching reviewed |

The [machine-readable results](qa/whiteout-phase2/results.json), [fresh layout audits](qa/whiteout-phase2/layout-audits.json) and [complete 144-file review inventory](qa/whiteout-phase2/changed-files.json) accompany this report. The inventory covers application/data changes, regression checks, preserved originals, optimized images and review evidence. The application integration is limited to additive taxonomy/media/translation imports and the WHITEOUT guide; the shared selector, specification CSS, affiliate and analytics logic remain unchanged. Existing test totals were updated to reflect 52 public products, 51 permitted illustrations and 32 populated categories while all older frozen baselines remain pinned.

Temporary tools, downloaded HTML, local dependencies and generated builds are excluded. Historical QA artifacts refreshed by browser tests were backed up locally and restored to their original tracked versions. This phase’s screenshot evidence is in `docs/qa/whiteout-phase2/screenshots/`. Nothing is staged or committed, and no GitHub CI, push, merge or deployment was triggered.

Manual iPhone follow-up: serve `npm run preview -- --host 0.0.0.0 --port 4321` on a trusted local network, open the computer’s LAN address in Safari, and check WHITEOUT plus all six profiles in portrait/landscape. Tap both languages, check the equivalent product route and current query/fragment, open the menu, and read the stacked specification rows and image caveats. Check the new catalogue filters in both languages. This local check does not require publication. Any production merge, push or Pages deployment requires explicit owner approval.
