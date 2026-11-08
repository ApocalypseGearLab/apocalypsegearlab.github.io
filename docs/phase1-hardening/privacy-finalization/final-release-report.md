# Privacy policy finalization and release review

Prepared November 7, 2026 (America/Toronto), in the existing feat/phase1-production-hardening worktree. Base/unchanged HEAD: 2cc35df11968242c00fcc08060c18e5182dcabe0. This report supersedes the earlier contact-approval blocker; older drafts and reports remain historical evidence.

**Local technical validation: PASS, with the documented Windows parallel-WebKit limitation. Public release: NO-GO until the remaining operating-practice checks below are resolved.** Contact publication is approved; Git actions and deployment are not authorized.

## Final public copy and precise changes

| Exact implementation path | Final change |
|---|---|
| src/pages/privacy.astro | Replace the pending-contact/no-address paragraphs with the approved native mailto contact, privacy-only scope, Gmail handling and data minimization. Add owner-confirmed Quebec operation, possible processing outside Quebec/Canada, saved-grant reuse and distinction between 180-day device durations and Google-side retention. Remove public draft/pending notices. |
| src/i18n/fr-privacy.json | Corresponding French text, removal of obsolete pending/no-contact phrases, localized Gmail-policy label. The approved email remains identical in both languages. |
| tests/browser/privacy-phase1.spec.ts | Extend existing keyboard/accessibility tests to assert final policy facts, absence of draft markers, exact contact href/scope and no general form/phone/address. Add complete EN/FR footer-link navigation, canonical/hreflang and analytics-off checks. Existing consent assertions remain. |

The root docs/phase1-hardening/README.md points to this checkpoint. All other additions in this task are this report/evidence package and ignored diagnostic tools/mirrors. No GA4 consent/event module, footer layout, product record, artwork, release rule, dependency or workflow was changed. The final [exact-byte inventory](candidate-commit-inventory.json) and [proposed commit grouping](commit-inventory.md) cover the complete current candidate.

Complete rendered-body exports from the final build: [English](privacy-policy.en.md), [French](privacy-policy.fr.md). Actual proposed routes are /privacy/ and /fr/privacy/. Native footer links and consent preferences continue to use the correct language. The French Gmail-policy link includes hl=fr. Both policy pages retain their existing noindex, nofollow directives; removing approval notices does not require widening indexing. Product SEO restrictions remain intact.

The approved address appears only on the two policy HTML pages, once per policy, rather than in global navigation or a general support flow. The mailto link has no custom affiliate/source tracking metadata. No mail was sent or mailbox opened. [Raw public-output evidence](evidence/final-public-policy.json) records contact scope, canonical language facts and zero pending markers.

## Accuracy against the implementation

| Policy statement | Actual source evidence / scope |
|---|---|
| All-visitor analytics off until valid permission | GoogleAnalytics.astro installs the consent module in production; analytics-consent.ts creates the external tag only from permitted start(). No region-based exception. |
| An explicit choice or a safely reusable saved grant may enable GA | Version-1 granted/denied choice, timestamp validation and 180-day expiry; remembered grants require a revocable originating storage. The final text now describes reuse explicitly. |
| Withdrawal remains usable with restricted storage | Document permission removed synchronously, GA disable flag true, queue emptied, accessible _ga cookies removed and page reloaded. The existing EN/FR stale-grant/storage regressions remain in normal browser coverage. |
| Withdrawal does not retroactively erase Google-held data | No server/account deletion API is called or promised. A privacy request remains separate from stopping browser measurement. |
| Browser cookie/preference lifetime is 180 days | Consent duration and cookie_expires are 180 days; cookie_update:false. This is not a claim about GA4 server retention or reset-on-new-activity. |
| Advertising/signal controls disabled in this site configuration | analytics_storage is granted only with permission; ad_storage, ad_user_data and ad_personalization stay denied; allow_google_signals and allow_ad_personalization_signals are false. This does not establish the entire private account’s settings. |
| Page visits/scrolls and equipment/source clicks | One normal GA config; validated affiliate_click and source_reference_click events require document permission. Scroll measurement was observed in the earlier isolated real-tag probe. Current automatic account features remain unverified. |
| Configured URLs omit query/fragment data | Page/referrer configuration and custom-event parameter builders sanitize those URLs. The policy does not promise every remotely enabled automatic parameter is anonymous or sanitized. |
| Navigation and Amazon links do not need analytics | Native anchors remain; event tracking never cancels/delays/recreates buying navigation. All destination/hold assertions remain. |
| Essential preferences are distinct from analytics identifiers | agl-language / agl-language-position, versioned analytics choice and fixed temporary storage-check value match source. No visitor identifier is generated by that capability check. |
| Quebec operation / privacy-only Gmail address | Explicit owner confirmation and approval, recorded in evidence/owner-confirmed-facts.json. No personal address, phone or general support purpose is inferred. |

Google documents the disable flag and separate cookie controls: [privacy controls](https://developers.google.com/tag-platform/security/guides/privacy), [cookie documentation](https://support.google.com/analytics/answer/11397207?hl=en-GB). Code/source checks establish the site configuration, not private Google-side processing or report ingestion.

## Known facts versus remaining uncertainty

The operator is in Quebec, Canada; the contact is approved for privacy requests; incoming requests use Gmail. Those facts are resolved and used in both languages. The owner explicitly says GA4 retention/sharing have not been checked and provides no Gmail retention/deletion practice. They remain **UNVERIFIED** rather than being replaced with defaults, an invented fixed period or a claim of automatic deletion.

[Exact GA4 owner checks](GA4-OWNER-CHECKLIST.md) cover the correct stream, retention/reset, four sharing switches, linked products/exports, tag destinations, automatic measurement and private access. [Quebec-specific review](QUEBEC-PRIVACY-REVIEW.md) identifies the responsible role/title, actual request handling/retention, safeguards/complaints and applicable transfer/provider/privacy-assessment requirements. No completed EFVP, responsible-person appointment or legal certification is invented.

These unresolved practices are recorded in the review package; the proposed public pages contain factual policy copy without internal draft/approval notices. The owner’s request to finalize known wording is completed. Establishing private account values and operational compliance cannot be completed from repository code. Publication readiness remains NO-GO until that evidence is supplied and any necessary factual policy update is validated.

## Required validation results

| Check | Observed result / evidence |
|---|---|
| Final production build / synthetic product fixture cleanup | PASS; final 124 real-data pages; final-product-fixtures-and-build.log |
| Astro / TypeScript | PASS; 181 files, zero errors/warnings/hints; check.log |
| Unit tests | PASS; 134/134, no skipped; test.log |
| Deterministic images and original rights/hash checks | PASS; all 13 assets/26 variants retained; test-images.log |
| Release, affiliate, product verification | PASS; 47 active destinations, five holds, zero fully approved products; release-check.log / audit-affiliate.log / audit-verification.log |
| Bilingual routes / canonical / hreflang / robots / sitemaps / four universes | PASS; 124 HTML pages, 62 EN / 62 FR, 16 indexable URLs; test-site.log |
| Conversion / BougeRV / Phase 5.5 | PASS; all three commands exit 0 |
| Independent source/content preservation | PASS; 33 real-HEAD projections, 234 protected originals, all 554 baseline affiliate controls and 104 product-language robot restrictions; independent-integrity.json |
| First preliminary privacy focus, before final Quebec wording | 39 passed / 4 timed out, all failures WebKit click stability; focused-initial-browser-results.json |
| Frozen-source preliminary privacy focus, two workers | 41 passed / 2 timed out, different WebKit click checks; focused-browser-results.json |
| Complete Chromium | PASS; 259/259, two workers, no skipped/retried/flaky cases; chromium-results.json |
| Complete WebKit | PASS; 131/131, one worker: 42 at 320px, 42 at 375px, 47 at 390px; no skipped/retried/flaky cases; webkit-results.json |
| Bilingual privacy/contact/withdrawal coverage inside the complete runs | PASS; 80 executions: 20 Chromium plus 20 at each WebKit width; complete-browser-summary.json |
| Final preservation / Git whitespace | PASS; 503/507 prior candidate files unchanged, exactly four approved changes, nine validated source hashes, 2,537 unrelated-checkpoint files unchanged, index empty and HEAD unchanged; final-preservation.json; git diff --check exit 0 |

Both preliminary failures are retained with errors/artifacts. They stop at Playwright’s visible/enabled/stable click wait, rather than failing a consent or contact assertion. The installed Windows/Playwright combination has a reported rAF/timer stall with matching symptoms; [upstream issue](https://github.com/microsoft/playwright/issues/43818). That is a plausible explanation, **not a locally proven root cause**.

The final run passed all 390 normal discovered test executions: 259 Chromium (12.8 minutes) and 131 WebKit (6.5 minutes), using two Chromium workers and one WebKit worker after CLI checks finished. Only the worker count changes for WebKit; deadlines, native clicks, assertion content, source and browser binaries remain. No force clicks, retries, skipped cases, dependency installation or framework patch is introduced. No clean parallel-WebKit pass is claimed. Normal CI uses Ubuntu and remains unchanged; it has not run remotely for this uncommitted candidate.

The privacy regressions confirm default-off and rejection, explicit opt-in, saved choice across EN/FR, accessible-cookie cleanup and reload on withdrawal, malformed/expired choices, cross-tab revocation, JavaScript-off native navigation, keyboard/axe accessibility, localized footer links and read-only/unavailable storage. Google requests are blocked in the isolated browser fixtures and retailer navigation is simulated; these are not private-account ingestion or retailer-service tests. Final EN/FR desktop and 320px policy screenshots were reviewed with the capture limitations recorded in [screenshot review](evidence/policy-screenshot-review.json).

The diagnostic mirror covers all 71 source/helper files and substitutes only four literal development URLs from 4322 to an owned 4332 server. Production preview is 4321; servers are not reused. Discovery logs match normal source configs. [Mirror hashes](evidence/browser-mirror.json), [execution plan](evidence/browser-execution-plan.json), individual logs and JSON results retain exact scope.

## Preservation and release recommendation

The fresh independent comparison preserves all original art/product/policy/workflow/lockfile hashes. Thirteen original images plus 26 variants remain; image generation was checked without regenerating artwork. All four universes, 47 permitted Canadian destinations with tag apocalypsegear-20, five holds and the Therm-a-Rest below −20°C restriction remain unchanged. All 104 product-language noindex restrictions and five sitemap files/robots.txt remain unchanged; no product is promoted or newly indexed.

After the complete browser run, 75 generated QA captures were hash-verified and archived under this package; their initially clean historical docs/qa locations were restored. The original checkout and unrelated-worktree checkpoint retained all 2,537 checked files. All 234 protected original hashes and nine final validated source hashes match; 503 of the prior 507 candidate paths are byte-identical. Exactly the three policy/test files and README pointer changed. The index is empty, HEAD and all worktree branches/HEADs are unchanged, git diff --check passes, and owned test servers on 4321/4332 have stopped. [Final preservation evidence](evidence/final-preservation.json) and [exact inventory](candidate-commit-inventory.json) record this state.

**Release recommendation now: NO-GO for publication.** Complete the unverified account/request/Quebec operational checks, review the factual results, and apply/validate any necessary amendments. The completed local implementation is technically ready for review with the Windows parallel-WebKit limitation disclosed. That pass does not close the operational publication requirements or authorize a merge. Further explicit approval is required for staging, commit, push, PR creation, merge and deployment; none has occurred. Production remains unchanged. Physical iPhone Safari, field CWV/Lighthouse and private GA4 ingestion are unverified and are not inferred from local tests.
