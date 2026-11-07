# XTherm NXT temperature-warning review

Reviewed 2026-11-06 on `feat/whiteout-phase2` in `tmp/whiteout-phase2`. This follow-up supersedes only the XTherm purchase decision and aggregate link counts in the earlier WHITEOUT automation report. Other product records and their decisions are unchanged. No stage, commit, push, merge or deployment is authorized.

## Evidence and temperature guidance

The owner explicitly confirmed Amazon.ca ASIN **B0CS54SN91**, manufacturer model **14016**, **Regular Wide / Neptune**, **540 g**, **R 7.3**, and the listing's prohibition on use below **−20 °C**. The supplied screenshot selects Regular Wide / Neptune. Its generic title is not used to substitute the narrower Regular model. The warning itself was supplied in the owner's subsequent message; it is not visible in the earlier screenshot. This is owner-supplied retailer evidence, not a successful live Amazon inspection or independent child-ASIN authentication. Automated access restrictions do not establish a broken destination.

Official Therm-a-Rest material inspected:

- [NeoAir XTherm NXT product and specification table](https://cascadedesigns.com/products/neoair-xtherm-nxt-sleeping-pad): confirms 14016 / Regular Wide / Neptune, 0.54 kg, R 7.3, 183 × 64 × 7.6 cm. The 0.44 kg headline concerns Regular, not Regular Wide. The description markets the family for mountaineering and extreme cold; it provides no numeric minimum-use temperature that reconciles the reported retailer prohibition.
- [R-Value vs. Degree Ratings](https://cascadedesigns.com/en-ca/blogs/thermarest-gear/how-warm-is-a-sleeping-pad-r-value-vs-degree-ratings): explains standardized pad insulation measurement and why ground conditions, humidity and individual comfort prevent a universal temperature rating. It does not convert R 7.3 into authorization below −20 °C.
- [Therm-a-Rest FAQ](https://cascadedesigns.com/pages/faq-thermarest), “How warm is my sleeping pad and what is the ASTM testing standard?”: describes comparable ASTM F3340-18 R-values, not a model-specific safe minimum air temperature.

No applicable manufacturer confirmation permitting use below −20 °C was found in those sources. Marketing language is not interpreted as such confirmation. The site preserves the owner-reported **do not use below −20 °C** prohibition. It also explicitly avoids promising safety at or above that temperature; the complete sleep system and conditions still matter.

## Purchase decision under the existing policy

**Active product-page link:** <https://www.amazon.ca/dp/B0CS54SN91?tag=apocalypsegear-20>.

The existing `purchaseDestination` policy permits a documented retailer page separately from full safety/publication approval. XTherm is not a mandatory ID/ASIN hold and its overall safety status is `pending`, not `blocked`. The old link-specific hold concerned unavailable warning wording/context and identity. The owner's explicit confirmation now documents the prohibition and product identity. The decision permits viewing the page while retaining the restriction; it does not resolve or waive the restriction.

Both the explicit affiliate review and scoped destination decision are deliberately updated to `link-permitted`, with the evidence and reasoning recorded. No gate, whitelist, component, analytics rule, account setting or mandatory hold is weakened. Regression tests still reject either reinstated explicit hold. Other pending products do not acquire permission from this review.

The destination uses `scope: product-page`, rather than promising a currently purchasable exact variant. The buyer must confirm the selected 14016 Regular Wide / Neptune size, colour and package on Amazon. No current stock, seller, price, authenticity or delivered configuration is guaranteed.

English and Canadian French profiles, catalogue cards, WHITEOUT cards and related cards display the warning in the existing selection note **before** the native affiliate button. The safety section repeats it. Existing disclosure, `sponsored nofollow noopener`, new-tab behavior and GA4 `affiliate_click` tracking remain intact.

The record retains `safetyStatus: pending`, `listingVerified: false`, no independent listing evidence, `publicationApproved: false`, draft/informational status, no product/offer/review structured-data claims and noindex/sitemap restrictions. There are now **47 active / 5 held** retailer destinations overall; all 46 previously active URLs are unchanged.

## Still required for manufacturer clarification

Obtain written instructions or an attributable Therm-a-Rest support response applicable specifically to **NeoAir XTherm NXT model 14016**, identifying whether the Amazon **do not use below −20 °C** statement is a product-use limit, its conditions and the governing current instructions. Any claim permitting colder use requires explicit manufacturer clarification addressing that prohibition. General winter marketing, a different XTherm revision, R-value arithmetic, reviews and the sleeping bag's temperature rating do not establish permission. No manufacturer was contacted or message sent by this implementation.

The unsupported 653 kg field remains excluded from specifications. All existing dimensions, accessories, artwork, other product records and safety restrictions are preserved.

## Validation

Current results and the exact changed-file/preservation inventory are recorded in `docs/qa/xtherm-temperature-review/results.json`. Earlier automation results remain an earlier snapshot; they are not presented as results for this follow-up.

Validation for this follow-up:

- Build: 122 real pages, 61 per language. Temporary product fixtures also passed and restored the real data/configuration and distributable afterwards.
- Type checks, 131 unit tests, site/bilingual/SEO audits, deterministic image checks, release checks, affiliate and product-verification audits, conversion checks, BougeRV and Phase 5.5 preservation checks passed.
- Full Chromium run: **221 passed / 3 failed**. One case still expected the superseded XTherm hold; its corrected destination/warning assertion passed. The catalogue workload reached its 60-second total deadline at a duplicate final navigation; the duplicate checks were removed and the full-catalogue workload now has a separate 90-second budget. All five collection cases passed on follow-up. The unchanged media case also exceeded its old 30-second deadline; a diagnostic passed with all assertions in **41.7 seconds**, establishing that the complete 102-image/six-width workload needed more time. Only that QA case received a 60-second budget. The final focused run passed **11/11**, including the media case and all ten warning/link/no-JavaScript cases. Every case from the full run was therefore covered by a passing result across the full and focused runs; this is not presented as a single clean 224-case run.
- Full WebKit: **66/66 passed**, zero failed/skipped/flaky, at 320/375/390 pixels. XTherm checks include both language directions, query/fragment retention, the displayed prohibition, the exact tagged destination and native touch/new-tab behavior. No new selector implementation change was made.
- Five warning screenshots were visually inspected. EN/FR mobile and desktop text/button layouts are readable without clipping. One French desktop capture omitted the brand mark despite unchanged, visible header markup; a fresh independent render showed the correct brand, geometry and hit testing. Both the original capture and the settled capture/diagnostic are retained. Its exact transient paint cause is unconfirmed; no header change is justified by this evidence.
- Browser-generated historical QA files were archived locally and the 57 known tracked historical outputs restored. Current WHITEOUT QA outputs were refreshed. Other product records, specifications, artwork and source changes are preserved; the unrelated original-checkout `UniverseHero.astro` SHA-256 remains `2b7b1871dc265aadbcf09217203f1cd4b290e19d38ff0473e196181048d7a841`.

Browser tests intercept Amazon navigation with a local response and block Google requests. They establish button behavior, exact destination/tag and emitted event data, not live offer availability. WebKit tests emulate iPhone dimensions; they do not replace a physical iPhone Safari check. No extra selector or navigation implementation change is part of this review.

Before approving a future deployment, use an authorized local preview on a physical iPhone: open the XTherm profile with a query and `#buy`, switch English/French in both directions, verify the warning precedes the button and the location is retained, and inspect the Amazon.ca destination/tag and currently selected 14016 Regular Wide / Neptune configuration. Repeat with storage unavailable and JavaScript disabled where available. Preserve the prohibition during those checks; do not treat a functioning link as evidence that colder use is permitted. Physical-device verification has not been performed here.

Implementation changes are limited to the XTherm record, additive French strings, its evidence/report, preservation metadata and regression/audit expectations. Shared affiliate eligibility, safety, SEO, header/selector, disclosure and analytics code are byte-for-byte unchanged from the start of this review. `changed-files.json` inventories the exact follow-up delta, including refreshed QA artifacts; it excludes temporary tools, builds, secrets and its own generated manifests.
