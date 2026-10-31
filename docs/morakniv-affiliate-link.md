# Morakniv recorded-link review — 2026-10-31

**Decision: ACTIVE for the recorded Canadian link; no independent live-offer or SEO approval.**

Base: `44325ec7be0882282b2ba7df249ab8dd0ec7ecf4`, the merge of PR #22. No open PR existed at the start of this fix. The dedicated branch is `fix/morakniv-garberg-affiliate-link`.

The owner’s current written request explicitly identifies **B09214DLJ6** as the **Garberg BlackBlade Carbon Survival Kit, manufacturer model 13915**, and supplies the exact Canadian destination. This supplements the less specific Phase 5 brief. It is an owner document, not an Amazon screenshot, seller attestation or successful live-page inspection.

The existing `canadianAffiliateIssues` policy accepts a matching `owner-document` and a product-specific `link-permitted` review, independently of full editorial publication. No policy code, mandatory hold, account switch or final-approval flag changed. Physical examination is not a prerequisite for this recorded-link path. Consumer inspection and the separate full editorial requirements remain in place.

## Evidence and limits

| Question | Finding | Evidence scope |
| --- | --- | --- |
| Intended Canadian ASIN and model | B09214DLJ6 → carbon BlackBlade Survival Kit, 13915 | Explicit owner statement; not independently authenticated Amazon metadata |
| Manufacturer reference | Item 13915, carbon blade with black DLC, polymer sheath | [Morakniv product documentation](https://www.morakniv.com/en/products/garberg-survival-kit-c), read during this review |
| Manufacturer accessories | Ferro rod, diamond sharpener and reflective cord | Same manufacturer source; these complete the five requested kit components with the knife and sheath |
| Actual selected Amazon.ca offer | Not independently inspected | Direct web reader could not access `https://www.amazon.ca/dp/B09214DLJ6`; no observable HTTP status was returned. Primary-domain searches supplied no additional Amazon evidence |
| Actual retailer contents, seller and delivered unit | Still unverified | Manufacturer contents and concept art do not establish the current retailer package; existing purchase checks and limitations retained |
| Recorded URL | HTTPS, www.amazon.ca, exact `/dp/B09214DLJ6`, one `tag=apocalypsegear-20` | Local URL validation; not a stock, price or seller check |

No commercial link blocker remains under the existing owner-document policy. The residual offer uncertainty remains explicit and continues to prevent full editorial/SEO approval. No physical test, seller authentication, final Associates approval, price or availability is claimed. Secondary marketplace mirrors were not accepted as Canadian offer evidence.

## Change scope

- Only the Morakniv product JSON changes among product records: documentary evidence, owner-reference source, product-level link decision and obsolete “before its buying link can be enabled” summary wording.
- Model identifier, ASIN, exact affiliate URL, all specifications, description, advantages/limitations, safety notes, purchase checks, related products and images are preserved.
- `listingVerified=false`, `reviewStatus=draft`, `safetyStatus=pending`, `publicationApproved=false` and `lastVerified=null` remain. The production page keeps `noindex, nofollow`, its canonical and no Product/Offer/Review/rating markup.
- Shared button, GA4 code, site configuration, navigation, CSS, media files and every other product are unchanged. Hash and field preservation is enforced by `tests/morakniv.test.ts` against the merged-main baseline in [preservation.json](qa/morakniv-affiliate/preservation.json).
- Existing catalogue test expectations change from 28 active / 6 held to **29 active / 5 held**. No other product’s decision changes. Historical Phase 5 reports remain historical.

## Validation

Local and CI results, rendered screenshots and the exact command outcomes are recorded in [test-results.json](qa/morakniv-affiliate/test-results.json). The new browser test covers the gear catalogue, OUTBREAK, the own profile and both applicable related-card hosts (Gerber and ESEE), at phone and desktop sizes. Each placement checks mouse and keyboard activation, the exact destination, a new tab without an opener, `rel="sponsored nofollow noopener"`, visible disclosure and exactly one `affiliate_click` event per action.

Google requests are blocked and Amazon destinations are intercepted in browser QA. These tests prove the rendered button and GA4 queue behaviour; they do not validate Amazon’s current listing, account reporting or checkout. Existing broader responsive checks cover 320–1920px, with automated accessibility checks and internal-link/media/SEO validation.

No merge or deployment is performed by this fix.
