# Phase 1 — owner-verified GA4 release update

November 8, 2026. Branch feat/phase1-production-hardening; unchanged HEAD 2cc35df11968242c00fcc08060c18e5182dcabe0.

**NO-GO for publication pending the remaining bounded owner facts and operating/transfer decisions. The newly confirmed GA4 items are cleared.** No staging, commit, push, PR, merge, deployment or provider-account change occurred.

## Cleared facts and disclosure changes

The owner reports GA4 Administration screenshots confirming terms accepted December 24, 2025; no Google Ads associations; no GA4-integrated BigQuery associations/exports; Search Console linked to the production URL November 8, 2026; one administrator at each inspected GA4 level and no additional users. Optional account sharing remains off, user-provided collection/automatic detection remains off and enhanced measurement remains on. Prior retention, reset, redaction and UA confirmations remain valid. [Exact provenance and scope](evidence/owner-verified-facts.json).

This agent did not independently view those screenshots or inspect a private account. No need to repeat the confirmed acceptance, link or listed-user checks.

Both public-policy drafts now identify Search Console reporting and distinguish its history from the GA4 retention control. See [Google’s official integration documentation](https://support.google.com/analytics/answer/10737381?hl=en). No tag, cookie duration, analytics purpose switch or consent runtime was changed. Public pages do not acquire draft notices, invented owner practices, a personal identity, general support contact or fixed Gmail-retention promise.

Current proposed pages: [English](privacy-policy.en.md) and [French](privacy-policy.fr.md). Source files: src/pages/privacy.astro and src/i18n/fr-privacy.json. The only other existing candidate change is the docs/phase1-hardening/README.md checkpoint pointer. All other additions belong to this documentation/evidence package; the prior package remains historical.

## Remaining material release conditions, in order

1. **Bounded flow/mailbox facts:** identify other material Product links/tag destinations actually configured, plus the mailbox’s actual service/terms and delegates/forwarding/connected apps/local copies. The named GA4 confirmations do not prove every integration or permission absent. Unknown does not mean enabled or a proven breach.
2. **Actual governance practice:** adopt/implement or correct the prepared single-operator request, safeguard and purpose/hold-based retention/deletion procedure. Then apply its matching EN/FR public governance summary. A draft cannot establish actual practice.
3. **Provider/transfer decision:** conclude the updated Google/GitHub/Gmail assessment using those facts, record the Privacy Officer’s reasoned protection/mitigation decision and resolve a specific material gap if identified. Accepted Analytics terms strengthen the assessment; they do not by themselves settle other services or Quebec requirements.

These are the remaining privacy gates, rather than another technical audit. Governance implementation/public explanation and covered-transfer assessment/arrangements are distinct requirements in [Quebec’s Act, sections 3.2 and 17](https://www.legisquebec.gouv.qc.ca/en/document/cs/P-39.1). This review is not a legal-compliance certificate. Exact next actions and the unfilled decision record are in [owner decisions](owner-decisions.md); the substantive [assessment](provider-transfer-assessment.md) is updated.

After these are closed, obtain the required **owner publication authorization** and follow the requested PR/CI workflow. Authorization and engineering checks are distinct from the privacy-law assessment; no remote candidate CI or deployment success is claimed.

## Relevant validation

| Check | Result / evidence |
|---|---|
| Production build | PASS, 124 pages — evidence/build.log |
| Bilingual site/SEO verification | PASS, 62 EN/62 FR and 16 indexable URLs — evidence/test-site.log |
| Focused bilingual/privacy units | PASS 8/8, no skip — evidence/focused-unit.log |
| Policy accessibility, localized footer navigation and keyboard opt-in/withdrawal | PASS: 8 unique project/case combinations, 2 Chromium and 6 WebKit across 320/375/390px. Chromium’s two cases also ran again in the all-project invocation: 10 successful executions, not 10 distinct cases. No retry, skipped or flaky result — [summary](evidence/focused-browser-summary.json) |
| Exact new public text, approved mailto and privacy noindex | PASS in both built languages — evidence/public-policy-output.json |
| Preservation | 788/791 earlier candidate paths byte-identical; only the two policy files and README pointer differ. Nine validated source/test hashes, 234 protected original hashes and 2,537 checked unrelated files match — evidence/final-preservation.json |
| Git/worktrees and diagnostics | HEAD/branch/worktree heads preserved, index empty, whitespace pass, historical QA paths unchanged and preview port stopped |

The first focused unit attempt caught a numeric-token mismatch between English “two-month” and French “2 mois”. English now uses “2-month”; tests were not changed. The initial failed log is retained beside the passing final log. Build and affected checks were rerun on the corrected bytes.

Unchanged consent/event runtime, tests, catalogue, images and preservation inputs justify reusing the prior 134-unit/84-scoped-browser evidence and affiliate/image checks. Those full suites were not freshly rerun. The 47 active Amazon.ca destinations, five holds, 104 product-language noindex restrictions, original/optimized assets and existing safety restrictions remain unchanged. No new WHITEOUT integration occurred.

No live GA4 ingestion, Google backend deletion, physical Safari, Lighthouse, field metrics or legal conclusion is invented. [Exact inventory](commit-inventory.md) and its machine-readable hashes cover the current local candidate.
