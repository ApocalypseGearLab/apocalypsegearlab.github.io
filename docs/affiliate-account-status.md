# Affiliate account declaration and product verification

Base: main `5efd034d6ab5bb38182bef808e93cd199500d480` (merged PR #26).
Branch: `feat/affiliate-account-product-status`. No merge or deployment is authorised by this change.

## Account declaration

The owner states: “The site owner declares that the Amazon Associates account is registered and approved.” Recorded on 2026-10-31 for Amazon Associates Canada, `apocalypsegear-20`, and `https://apocalypsegearlab.github.io`.

`AMAZON_CA_ACCOUNT_DECLARATION` records registration, declared approval, source, scope, statement and recording date. This is **owner-provided evidence**, not independent confirmation from Amazon. `AMAZON_CA_FINAL_APPROVAL_CONFIRMED` remains false because it specifically represents independent confirmation. Operational Canadian linking remains enabled. No US participation is inferred.

There was no remaining final-account-approval gate in the Canadian release policy: the existing 31 links were already permitted during initial participation. Their authorisation is preserved. The obsolete initial-period-only configuration explanation is updated, and an intentionally disabled linking switch now reports “Affiliate linking disabled” instead of incorrectly claiming that account eligibility is unconfirmed. The off switch still works.

The affiliate disclosure page distinguishes the owner's account declaration from link availability and product review. Product cards do not repeat account administration details.

## Product findings and justified updates

All **36 public informational products** were audited. The exhaustive [per-product report](account-status-product-audit.md) and [machine-readable evidence audit](qa/account-status/product-audit.json) include ASIN/model identity, specification citations, unresolved claims, safety/certification notes, editorial release requirements, commercial decisions and exact reasons for holds.

| Dimension | Result |
| --- | --- |
| Manufacturer-cited model specifications | 36; documentary coverage, not physical testing or independent validation of every specification |
| Structured owner-document listing evidence | 13; previously 10 |
| Independently verified current listings | 0 |
| Active Canadian affiliate destinations | 31; unchanged |
| Held Canadian affiliate destinations | 5; unchanged |
| Existing model editorial/safety clearances | 4; unchanged |
| Pending safety reviews | 30 |
| Blocked safety reviews | 2 |
| Fully released/indexable product profiles | 0; unchanged |

Only the following product JSON fields change: `research.listingEvidence` is added to Midland ER310, S.O.S. two-pack and ReadyWise 84-serving bucket. Existing archived owner transcriptions, source references and prior assessments justify those structured records. The recording date is not presented as a new capture or live inspection date. Midland's ER310-MFN suffix does not establish a battery revision; no capacity is guaranteed. S.O.S. two-pack identity does not establish exact lot calories or freshness. ReadyWise's documented yogurt formulation does not guarantee every delivered lot.

No `listingVerified`, `reviewStatus`, `publicationApproved`, `safetyStatus`, specification, URL, ASIN or physical-testing field is upgraded. The account declaration supplies no missing product proof. Leatherman Wave+, Reliance Aqua-Tainer, Sawyer Squeeze and SOL Emergency Bivvy retain their previously recorded model-documentation approvals; their Canadian listings and full release remain unresolved. The other 32 have no completed editorial approval recorded. Nothing establishes full publication eligibility.

## Product holds retained

| Product | ASIN | Exact unresolved commercial requirement |
| --- | --- | --- |
| EcoFlow RIVER 2 Pro | B0BVLPGS79 | Resolve selected-ASIN metadata B0D2HX1ZS9 and contradictory EFR620/EFR617 model identifiers against the intended Canadian variant. |
| Kidde C3010 | B00FHW7PBS | Establish the Canadian-approved model/certification and instructions; the US C3010/item 21010045 does not establish C3010-CA equivalence. |
| INIU P62 | B0DB888L9F | Resolve P62/P62-E1 revision and integrated/detachable cable configuration, with exact-model Canadian safety evidence. |
| Jackery Explorer 300 | B082TMBYR6 | Resolve 292/293 Wh, Lithium Ion/LiFePO4 and 110/120 V contradictions against the correct model and regional documentation. |
| NANUK 904 first-aid kit | B0G3XYHL33 | Establish the filled-kit SKU/ASIN and inventory, including FSA03 mapping, 109/110-item discrepancy, substitutions and expiry/sterility information. |

These are product restrictions. None is caused by the unavailability of independent account approval evidence. Routine checks of received goods are not newly imposed to authorise existing documentary affiliate links.

## Public status changes and preservation

The blanket “Information only · Verification pending” badge is replaced by separate signals:

- Manufacturer sources cited, or incomplete documentation when citations are missing.
- Listing documented by owner, independently verified only where matching evidence and that flag exist, or not independently verified.
- Model documentation reviewed for the four existing approvals; editorial verification incomplete elsewhere on profiles.
- Amazon.ca link available or a product-specific hold, with complete reasons on the profile.

An active link never claims a verified listing or purchase recommendation. Existing respiratory, radiation, battery and certification warnings remain intact. No safety or commercial policy is relaxed. The account declaration cannot grant product publication.

All images, the bunker, navigation, exact affiliate URLs/tag, GA4 implementation, canonical URLs, metadata, robots and sitemap rules are preserved. All 36 product profiles remain `noindex, nofollow`, excluded from the sitemap, with BreadcrumbList only and no Product/Offer data. Home, gear, BLACKOUT, FALLOUT and OUTBREAK remain indexable independently of product approval. The sitemap retains six URLs including the affiliate disclosure page.

The immutable pre-change baseline covers 206 source/media/public files. Historical test snapshots are not regenerated; narrow intentional exceptions are backed by new preservation tests proving that the three product evidence additions leave every other product field intact.

The [exact changed-file list](qa/account-status/changed-files.txt) includes configuration, the shared status helper/renderers, the three evidence records, audit tooling, focused regression tests and QA artifacts. Product release/SEO policy, GA4 code and image assets are unchanged.

## Validation

See [validation results](qa/account-status/validation.json), [responsive results](qa/account-status/responsive.json) and the screenshots in that directory. Automated retailer navigation and Google requests in regression tests are isolated; those tests do not authenticate Amazon offers, send real affiliate traffic or independently confirm private account standing.

Local results: Astro check on 97 files, zero diagnostics; 86 unit tests; 104 Playwright tests; product-schema/rendering fixtures; image validation; release and affiliate audits; production build; site/link/sitemap validation; and conversion/tracking preservation all pass. The build contains 43 HTML pages, 1,704 internal references, six sitemap URLs and 190 authorised CTA instances. Twelve new responsive axe checks cover the catalogue and disclosure at six widths with zero violations; the full suite also checks all product profiles. Twelve review screenshots are archived. A first capture attempt timed out on an offscreen lazy-loaded image; scrolling before decode corrected the test and the full suite was rerun successfully.
