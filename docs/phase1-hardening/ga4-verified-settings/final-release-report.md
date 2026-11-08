# Final release-readiness report — owner-confirmed GA4 settings

Originally prepared November 7, 2026; preservation and release review finalized November 8, 2026 (America/Toronto). Worktree: tmp/phase1-production-hardening. Branch: feat/phase1-production-hardening. Base and unchanged HEAD: 2cc35df11968242c00fcc08060c18e5182dcabe0. This checkpoint supersedes the previous uncertainty about retention/reset/four optional sharing settings; previous reports and results remain historical snapshots.

**Technical recommendation: PASS for the relevant local implementation scope. Publication/merge recommendation: NO-GO until the remaining factual operating-practice requirements below are resolved and any necessary policy changes validated.** Approval of the contact and confirmation of account settings do not authorize Git or publishing actions.

## Resume checkpoint and final disposition

The interrupted step was the current candidate inventory: its two output files were still placeholders. The saved 84 browser checks and 134 unit tests remain valid. On November 8, all nine frozen source/test hashes and both built privacy-page hashes matched the passing run; the full 653-path prior candidate comparison and fresh independent integrity checks also passed. Only the remaining preservation, documentation and inventory work was completed. No application/test source changed during this resume, no browser/unit/build suite was repeated, and no new WHITEOUT product integration began.

[Resume validation record](evidence/resume-final-validation/final-validation.json), [exact test-reuse proof](evidence/resume-final-validation/test-evidence-reuse.json), [fresh independent integrity](evidence/resume-final-validation/independent-integrity.json), and [fresh unrelated-file comparison](evidence/resume-final-validation/unrelated-worktrees-recheck.json) record the distinction between reused tests and newly executed checks. The relocated diagnostic helper initially failed to resolve its old relative import; only that ignored helper path was corrected, its initial log was retained, and the integrity rerun passed. This was a diagnostic setup failure, not an application regression.

## Confirmed facts and final policy wording

The owner explicitly confirmed and saved event data retention of **2 months**, user data retention of **2 months**, reset on new activity **disabled**, and **all four optional account data-sharing settings disabled**. Operation remains Quebec, Canada. apocalypsegearlab@gmail.com remains approved strictly for privacy requests. These are accepted owner-verified facts, recorded in [owner evidence](evidence/owner-confirmed-settings.json); this agent did not independently inspect or change the private account.

Both languages now disclose the settings. The text separates retention controls from standard aggregated reports and from the existing 180-day browser durations. It identifies the four disabled sharing options without implying that Google ceases service processing or that explicitly linked products/tag destinations are absent. Those distinctions were checked against Google’s [retention guidance](https://support.google.com/analytics/answer/7667196?hl=en) and [sharing guidance](https://support.google.com/analytics/answer/1011397?hl=en). No exact universal deletion deadline or complete two-month limit on all Google-held copies is asserted.

Complete current policy exports: [English](privacy-policy.en.md), [French](privacy-policy.fr.md). They are derived from the final built HTML at /privacy/ and /fr/privacy/, with the approved native mailto link, Quebec/Gmail disclosures and no public draft/pending notices. No general contact form/support page, phone or personal address is added. No fixed Gmail retention/deletion promise is invented. Both pages retain their existing noindex, nofollow directives.

## Changes from the November 7 settings update

| Affected file | Correction and scope | Risk / validation |
|---|---|---|
| src/pages/privacy.astro | Replace generic retention/sharing paragraph with owner-confirmed settings and precise scope; retain all existing consent, hosting and contact wording | Low runtime risk; public wording requires accuracy. Build/output and bilingual browser assertions cover it. |
| src/i18n/fr-privacy.json | Replace old translation key with matching French paragraphs; no new independent French route architecture | Translation drift risk checked against actual /fr/privacy/ HTML. |
| tests/browser/privacy-phase1.spec.ts | Extend the existing bilingual policy test with exact two-month, reset, aggregated-report, 180-day and all-four-sharing assertions | No test removed/skipped and no timeout or consent assertion weakened. |
| docs/phase1-hardening/README.md | Point to the latest verified-settings checkpoint and distinguish superseded historical uncertainty | Documentation only. |

All other additions are this report/evidence package. No analytics runtime module, footer, product record, workflow, dependency, lockfile or artwork is changed. [Candidate inventory](commit-inventory.md) and [complete path/hash JSON](candidate-commit-inventory.json) enumerate the full uncommitted Phase 1 candidate, not just this wording update. The finalized inventory contains 706 paths: 71 implementation files and 635 documentation/evidence files; 53 paths are new relative to the previous 653-path checkpoint and four existing paths changed.

## Accuracy against actual GA4 implementation

The unchanged GoogleAnalytics.astro / analytics-consent.ts / AnalyticsConsent.astro implementation remains opt-in for all visitors, with no geography exception. A current explicit choice or safely revocable saved grant may start the tag; malformed/expired/unrevocable grants fail closed. Withdrawing permission revokes document permission, sets the Google disable flag, clears the queue and accessible _ga cookies, and reloads. It does not delete previously transmitted data from Google. Read-only/unavailable storage and cross-tab revocation retain their existing regressions.

Advertising storage, user data and personalization remain denied and Google signals disabled in the website configuration. The 180-day consent duration, cookie_expires and cookie_update:false remain unchanged. Owner-confirmed account retention/reset settings are separate and require no runtime code change. The four optional account-sharing values are also separate from consent, product integrations and remote collection configuration.

Native Amazon navigation continues independently of permission; custom affiliate_click and source_reference_click tracking remains permission-gated. Configured page/referrer/custom-event URL sanitization stays intact. The policy makes no guarantee about every privately enabled automatic event parameter.

## Validation for this exact source checkpoint

Build/type/unit/site/image/release/affiliate/product-verification and 84 browser results below were executed November 7 and reused after the matching-source checks. Independent integrity, file/branch preservation, Git whitespace and report/inventory validation were completed again November 8.

| Check | Result and evidence |
|---|---|
| Production build | PASS; 124 real-data pages; build.log |
| Astro / TypeScript | PASS; 182 files, zero errors/warnings/hints; check.log |
| Unit suite | PASS; 134/134, no skipped; test.log |
| Bilingual HTML / routes / canonicals / hreflang / robots / universes | PASS; test-site.log |
| Image integrity / deterministic derivatives | PASS; 13 preserved originals and 26 variants; test-images.log |
| Release / affiliate / verification | PASS; release-check.log / audit-affiliate.log / audit-verification.log |
| Independent content/source integrity | PASS; 234 protected originals, 33 projections match real HEAD, 554 preserved baseline affiliate controls, 104 product-language robot restrictions, unchanged robots/sitemaps and no synthetic products; fresh evidence/resume-final-validation/independent-integrity.json |
| Chromium: privacy, restricted storage, analytics/events | PASS; 24/24, two workers, zero skipped/retried/flaky cases; chromium-results.json / chromium-browser.log |
| WebKit: complete privacy/restricted-storage scope at 320/375/390px | PASS; 60/60 (20 at each width), one worker, zero skipped/retried/flaky cases; webkit-results.json / webkit-browser.log |
| Final preservation and Git whitespace | PASS; 649 of 653 prior candidate files unchanged, exactly four approved changes, nine frozen source hashes, empty index, unchanged HEAD and git diff --check exit 0; final-preservation.json |

The scoped browser run uses actual test sources directly, not a copied mirror: 8 policy/consent plus 12 restricted-storage cases per browser, and four additional Chromium analytics/event/sitemap cases. Tests cover localized footer navigation, exact contact/policy facts, keyboard/axe accessibility, default-off/rejection, explicit opt-in, cross-language persistence, withdrawal/cookie removal/reload, stale grants, blocked storage, cross-tab changes, JavaScript-off use and native retailer navigation. [Execution plan](evidence/browser-execution-plan.json) and the JSON/logs retain the exact scope.

The unchanged fixtures block real Google requests and simulate the retailer. These tests do not establish private GA4 report ingestion, account settings, mailbox delivery or Amazon service availability. Physical iPhone Safari, field Core Web Vitals and Lighthouse are not newly measured.

Chromium uses two workers; WebKit uses one worker with unchanged assertions/deadlines/browser binaries. The prior Windows parallel-WebKit click-stability failures remain preserved in [the previous report](../privacy-finalization/final-release-report.md); their exact root cause was not proven. No clean parallel-WebKit result is implied. The previous full 390-test run is historical. The November 7 settings update ran the 84 relevant scoped cases plus build/type/unit/site/image/release/integrity checks. The November 8 resume reused those matching-source results and completed only preservation and release-report validation. Remote CI is not run. No dependencies are installed or upgraded.

## Preservation and product readiness

All 2,537 checked files in the original checkout and unrelated-worktree checkpoint remain byte-identical. All 649 unaffected prior candidate paths and every historical report/evidence package remain intact. Exactly the three policy/test files and README pointer changed; all nine validated source hashes still match. No historical docs/qa paths changed, and the owned preview/dev ports are stopped. [Final preservation](evidence/final-preservation.json), [fresh unrelated-file evidence](evidence/resume-final-validation/unrelated-worktrees-recheck.json), [policy output hashes](evidence/final-policy-output.json), and [browser summary](evidence/browser-summary.json) record the final state.

All 47 active Amazon.ca destinations and tag apocalypsegear-20 remain; five holds remain EcoFlow RIVER 2 Pro, INIU P62, Jackery Explorer 300, Kidde C3010 and NANUK 904. All 52 products remain without full publication approval, with 104 EN/FR product-language noindex, nofollow pages. The Therm-a-Rest XTherm below −20°C restriction, all four universes, safety wording, originals and responsive image rights/bytes remain unchanged. No product is approved or newly indexed.

## Cleared items, outstanding requirements and disposition

**Cleared:** approved public privacy-only contact, Quebec operating location, event/user retention, reset-on-new-activity and all four optional account-sharing settings. Do not carry these forward as unverified blockers.

**Still unverified:** linked products/exports and remote tag destinations, automatic measurement/identifier features and private account access; actual Gmail/request access, safeguards, retention/destruction and response practices; privacy responsible role/title and the previously identified applicable Quebec organizational/provider/transfer assessment evidence. The newest owner message supplies no additional facts for these items. The policy does not invent them or certify overall legal compliance. [Remaining owner checks](remaining-owner-checks.md) separates resolved facts from precise remaining actions and links the earlier detailed guidance.

Complete those unresolved checks, reconcile any material collection/recipient/rights-handling differences and validate any resulting factual policy edits before public release. The wording update is technically ready for local code review, with all relevant tests passing and the Windows single-worker WebKit qualification disclosed. Overall publication/merge readiness remains **NO-GO** until the remaining factual/operational requirements are resolved. This is not a renewed request to approve the same address or reconfirm the supplied settings.

No staging, commit, push, PR creation, merge or deployment has occurred. The index is empty, HEAD is unchanged, and production remains unchanged. No future commit SHA, remote CI success or legal certification is invented.
