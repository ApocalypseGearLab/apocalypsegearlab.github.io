# WHITEOUT scoped affiliate activation and site stability

**Follow-up:** The [XTherm temperature review](xtherm-temperature-review.md) supersedes only the XTherm decision and aggregate link counts below: its documented product-page link is now permitted with the explicit owner-reported prohibition on use below −20 °C retained. Current totals are 47 active / 5 held. The following feature report and its QA results preserve the earlier validation snapshot; consult the follow-up for current XTherm evidence and tests.

Worktree: `tmp/whiteout-phase2`; branch: `feat/whiteout-phase2`; base: `658bbef6c748f4a2ece7555458275e246d9ef600`. This report supersedes the earlier six-hold audit using the six Amazon screenshots supplied in the conversation alongside their URLs. No stage, commit, push, merge or deployment is authorized or performed.

## Six purchase decisions

| Product | Final Amazon.ca destination | Button / scope / remaining selection |
| --- | --- | --- |
| Outdoor Research Alti II | `https://www.amazon.ca/dp/B0B67C7N9M?tag=apocalypsegear-20` | **Active product-page link.** Screenshot shows Alti II, Black, no selected size. Manufacturer catalogue documents historical 300009. Buyer must select size and confirm the final 300009 colour/reference. Small/Agate / 3000090862006 / B0B67CFPG7 is a different reported option, not the black offer's authentication. |
| Hestra Army Leather Heli Ski | `https://www.amazon.ca/dp/B00F1F08TM?tag=apocalypsegear-20` | **Active product-page link.** Screenshot pictures Black/White, with no selected size, but the detail table says Red / size 5. The 30570 manufacturer family is documented. Buyer must resolve the selected colour/size on Amazon; neither Black/White size 9 nor the alternative Red size 5 is guaranteed by this link. |
| Oakley Flight Deck XM / M | `https://www.amazon.ca/dp/B012Y896ZA?tag=apocalypsegear-20` | **Active owner-documented configuration link.** Screenshot title identifies Medium and selected controls show Matte Black / Prizm Snow Sapphire Iridium, consistent with manufacturer OO7064-41. Confirm the current offer/lens. This is owner evidence, not independent live child-ASIN authentication. |
| Smartwool NTS AW15 250 balaclava | `https://www.amazon.ca/dp/B002VGHX1A?tag=apocalypsegear-20` | **Active product-page link.** Screenshot identifies NTS AW15 250, pictures black headwear and states 100% merino wool. It does not expose the exact legacy reference or fit selection. Buyer must confirm these; current manufacturer SC967-family documentation remains explicitly distinct from older AW15 revision authentication. |
| Smartwool Thermal Merino / Merino Sport 250 beanie | `https://www.amazon.ca/dp/B0DK9VRQF2?tag=apocalypsegear-20` | **Active product-page link: Mink Heather / One Size.** Both the screenshot and earlier selected-page evidence identify that option. It is not labelled as an authenticated Black offer. Dark concept artwork and Black SW0SW956 manufacturer specifications are explicitly reference material; buyer must confirm the linked revision and any alternative colour. No guessed Black child or parent-ASIN substitution was introduced. |
| Therm-a-Rest NeoAir XTherm NXT | `https://www.amazon.ca/dp/B0CS54SN91?tag=apocalypsegear-20` | **Held: safety evidence remains unresolved.** Screenshot selects Regular Wide / Neptune with updated stuff sack, despite a generic Regular title. Manufacturer 14016 / R 7.3 / 540 g / 183 × 64 × 7.6 cm remain the specification basis. The reported Amazon −20 °C warning is absent from this screenshot; its exact wording/context and applicable manufacturer clarification are required before purchase activation. |

Five new active links plus the 41 existing active destinations produce 46 active / 6 held products overall. All six WHITEOUT pages remain informational drafts with `noindex, nofollow` and outside the localized sitemaps. An Amazon product-page link does not grant editorial publication, certification or suitability for a particular use.

The [owner-evidence transcription](qa/whiteout-affiliate-automation/owner-evidence.json) records each screenshot's order, visible selection, destination scope and limitations. URLs are associated with screenshots by the owner's supplied table; browser address bars/ASINs are not visible. No successful live inspection, current stock, seller, price, delivered authenticity or physical test is invented. Raw screenshots contain personal delivery details and are not copied into the repository. Earlier HTTP challenges are retained as historical access limitations, not evidence of broken links.

## Reusable automatic activation

`research.purchaseDestination` records the canonical untagged evidence URL, ASIN, scope, matching profile name, optional exact-model match, source method/date, source IDs, buyer selection note and a documented decision permitting or holding the retailer link for safety reasons. Its retailer source must point to the same Canadian ASIN and its source IDs must also include manufacturer documentation.

`src/lib/purchase-destination.ts` and the shared schema validate that evidence. `getMerchantLinks` applies it to every product without a product-ID whitelist. A future informational product with valid scoped evidence and a permitted link-safety decision automatically receives its native Amazon.ca button in profiles, catalogue, universe and related cards on the next build. It does not require a component edit, a new translation-branch condition or a manually assigned `href`.

The existing account switch, exact Amazon.ca domain/path/ASIN/tag checks, explicit product holds, mandatory ASIN/ID holds, blocked safety review and conflicting old listing evidence still take precedence. Missing or malformed evidence fails closed. An existing `affiliateReview.decision: "hold"` must be deliberately resolved with new evidence; automatic eligibility never silently overrides it. Existing legacy permissions continue through their previous path.

To add a future eligible product:

1. Create its ordinary product record with its stable ID, manufacturer-backed specifications and Canadian candidate URL with exactly one `tag=apocalypsegear-20`. An eligible reference profile needs `visibility: "informational"`; an internal draft stays private. Do not automatically set `reviewStatus: "published"` or publication approval.
2. Include the manufacturer and retailer evidence in `sources`. Review product identity, limitations and safety; do not treat an access challenge or valid URL syntax as verification.
3. Populate `research.purchaseDestination` with matching `asin`, `url`, `matchedProduct`, method/date, cited `sourceIds`, scope and a precise `selectionNote`. Use `product-page` if the buyer must select or verify an option. `exact-variant` additionally requires `matchedModel` to equal the profile's manufacturer reference and evidence for that configuration.
4. Record `safetyDecision: "link-permitted"` and a reason only after that link's product-specific safety assessment supports it. Otherwise record `hold` and its exact reason. Preserve general `safetyStatus`, unresolved warnings and publication blockers independently.
5. Add Canadian French translations for all visible new text. Run the schema, unit, build, bilingual, affiliate/safety and browser checks. The shared renderer then activates the eligible destination automatically; no recurring Amazon scraping or private credentials are involved.

The future-product regression fixture demonstrates activation with a new ID and no `affiliateReview`, while retaining draft/non-indexable status. Twelve negative cases cover missing evidence, conflicting product/source/ASIN, missing manufacturer evidence, blocked product safety, a scoped link-safety hold, explicit and mandatory holds, a wrong tag, unsupported exact-variant scope and non-public visibility. The affiliate audit recognizes a documented scoped safety hold even without a legacy review. Synthetic records stay in memory and never become product data.

## Visitor flow, tracking and preservation

Profiles and active cards display either **Product page — confirm your variant on Amazon** or **Owner-documented variant — confirm the current offer**, followed by the product-specific selection caveat in English or French. Beanie summaries and descriptions explicitly identify Mink Heather. Hestra's conflicting table and OR's unselected size are visible before purchase. The XTherm remains disabled with the unresolved warning.

All active buttons use the existing `AffiliateButton.astro`, Associates disclosures, `sponsored nofollow noopener`, native new tabs and GA4 `affiliate_click` attributes. The button and analytics implementation are unchanged. Newly scoped Amazon screenshot sources are descriptive citations, not extra untagged purchase links; historical documentary anchors and their tracking remain intact. Conversion auditing now recognizes WHITEOUT's existing `collection-card` placement.

Existing 112 routes plus the ten Phase 2 additions remain 122 pages (61 English / 61 French). IDs, canonical/hreflang architecture, 16 indexable sitemap entries, Search Console verification and product schema policy are preserved. The five supplied optimized illustrations, all 15 responsive WebPs, original source PNGs and the existing XTherm artwork remain unchanged. All pre-activation WHITEOUT specification arrays and safety notes are preserved.

Historical protected-source comparisons use the pinned Phase 2 manifest with exact reviewed hunks for the authorized schema, affiliate, renderer and client changes. Unrelated edits still fail the original baselines. No historical baseline evidence is rewritten to claim an earlier result.

## Safari / WebKit investigation

The historical audit recorded one non-navigation tap failure in each of two complete WebKit runs, on different cases. Before changing the client, 60 fresh-context instrumented tap cycles across 375/390 px, including read-only preferences, passed. No definitive cause of those historical failures was established.

Instrumentation did demonstrate repeated writes of identical language `href` values on native details toggles and clicks. The client now writes only when the computed destination differs, avoiding needless DOM mutation during touch sequences while retaining native links, keyboard access, query/anchor/filter preservation and optional storage. This is targeted hardening, not proof that redundant writes caused the original failure. The interface, language preference policy and static bilingual architecture are unchanged.

A new WebKit stress test performs five English/French round trips with one tap per option and read-only persistent storage at each configured iPhone width (320/375/390). Existing JavaScript-disabled, storage-disabled, explicit-selection, filter and product tests remain enabled. Test requests block analytics collection and simulate external affiliate destinations locally; no live affiliate clicks or purchases are sent.

Final test totals and any remaining browser limitations are recorded in [results.json](qa/whiteout-affiliate-automation/results.json). Playwright WebKit on Windows emulates iPhone dimensions/touch; physical iPhone Safari verification remains necessary. Serve `npm run preview -- --host 0.0.0.0 --port 4321` on a trusted local network, tap both directions from WHITEOUT and all six profiles, and repeat from `/fr/blackout/` with privacy/storage restrictions. Check one-tap navigation, reload persistence and retained query/anchor/filter state. A passing automated run is not physical iOS certification.

## Final validation

| Check | Final result |
| --- | --- |
| Production build | Passed: 122 pages, 61 English / 61 French |
| Astro / TypeScript | Passed again after final test changes: 0 errors / warnings / hints |
| Complete unit suite | 130 passed |
| Complete Chromium suite | 214 passed, 0 failed / skipped / flaky; includes 138 simulated purchase openings across all four universes, catalogue and individual profiles |
| Complete WebKit suite | 66 passed, 0 failed / skipped / flaky; 320 / 375 / 390 px |
| Repeated diagnostic WebKit run | 63 passed; earlier two non-navigation failures remain recorded, with no conclusive root cause claimed |
| Bilingual / SEO / structured data | Passed again after browser checks: 122 pages, 2,654 phrases, 16 indexable sitemap URLs, 61 protected files |
| Affiliate / safety / release | Passed: 46 active, 6 held, no invalid/duplicate destination or undocumented block; 41 previous active URLs preserved |
| Image integrity | Passed: five unchanged supplied PNGs, 15 deterministic optimized WebPs and existing XTherm artwork preserved |
| Conversion / BougeRV / Phase 5.5 / real Astro product fixtures | Passed; fixture data and configuration restored |
| Visual review | Four current purchase-view screenshots reviewed: French mobile Hestra, English mobile beanie, French desktop Oakley and English mobile held XTherm |

The first complete Chromium run found three outdated test assumptions (41 active instead of 46, screenshot citations treated as outbound links, and a click count omitting WHITEOUT). Those assertions were corrected and the complete 214-case suite rerun successfully. No application defect was hidden by retries or disabled tests. The latest final WebKit run is green, while the earlier intermittent failures and physical-iPhone limitation remain explicit.

Current visual evidence: [Hestra French mobile](qa/whiteout-affiliate-automation/screenshots/hestra-army-leather-heli-ski-gloves-fr-375.png), [beanie English mobile](qa/whiteout-affiliate-automation/screenshots/smartwool-thermal-merino-reversible-cuffed-beanie-en-375.png), [Oakley French desktop](qa/whiteout-affiliate-automation/screenshots/oakley-flight-deck-m-goggles-fr-1440.png), [XTherm English mobile](qa/whiteout-affiliate-automation/screenshots/therm-a-rest-neoair-xtherm-nxt-review-en-375.png). Screenshots position the purchase section below the sticky header without modifying application styling. Full profile/specification screenshots remain under `docs/qa/whiteout-phase2/screenshots/`.

## Changed files and release boundary

The current follow-up changes the six product records, additive French dictionary, shared product schema, affiliate eligibility, profile/card notices, idempotent language URLs, exact source-change manifest and related regression/audit expectations. It adds `src/lib/purchase-destination.ts`, a WebKit tap-stability regression, owner-evidence transcription and this report. The [review inventory](qa/whiteout-affiliate-automation/changed-files.json) lists the complete candidate changes, including the existing Phase 2 implementation, assets and tests.

Temporary scripts, logs, downloaded HTML, traces, dependencies, caches and generated builds are excluded from that inventory. Historical QA outputs regenerated by browser suites are archived locally and restored using their explicit file manifest. The original checkout's unrelated `UniverseHero.astro` edit is preserved and excluded. Everything remains unstaged and uncommitted; no GitHub CI, push, merge or Pages deployment is triggered.
