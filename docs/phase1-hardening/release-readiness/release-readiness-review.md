# Phase 1 release readiness review

Reviewed 2026-11-07 (America/Toronto) against current remote main and unchanged local HEAD `2cc35df11968242c00fcc08060c18e5182dcabe0`, branch `feat/phase1-production-hardening`. All 240 original Phase 1 inventory entries matched the completion checkpoint at review start. This review changes documentation/diagnostics only.

**Recommendation: NO-GO for merging the current candidate; NO-GO for public release.** RR-01 reproduces a consent-withdrawal defect, and RR-05 fails the normal Chromium CI catalogue test. RR-03 should also be corrected before accepting the preservation guarantees. RR-02 independently blocks publication under the owner’s contact-method instruction. Normal-path test passes do not clear these findings.

## Findings

### RR-01 — P1: Withdrawal can immediately reactivate a saved grant when denial cannot be persisted

Affected: `src/lib/analytics-consent.ts:45`, `src/lib/analytics-consent.ts:94`, `src/lib/analytics-consent.ts:105`.

**Evidence:** withdrawal-storage-edge.json: 12 cases; 8 controls pass, 4 fail (EN/FR × Chromium/WebKit) when local storage is readable but read-only and session storage is unavailable.

**Cause:** save() ignores failed writes, apply() reloads anyway, and the new document rereads the unchanged granted record.

**Correction:** Ensure denial cannot be undone by a reload into a stale stored grant. Verify a usable revocation path before accepting remembered permission, or use a tested fail-closed fallback; add normal-CI regressions for the combined storage failure in both languages/engines.

**Acceptance:** After withdrawal: no Google loader/config/events after reload or subsequent first-party navigation under the restricted-storage scenario; native Amazon/navigation still work; normal persistence and cross-tab tests remain green.

Effort: 2–4 h plus regressions. Regression risk: Medium: consent persistence and page lifecycle behavior..

### RR-05 — P1: The normal Chromium CI catalogue test fails after a second live status is added

Affected: `tests/browser/phase6.spec.ts:20`, `tests/browser/phase6.spec.ts:33`, `src/components/AnalyticsConsent.astro:4`.

**Evidence:** Full browser suite: 337 passed, 1 failed. phase6 catalogue filtering calls getByRole(status), which now matches both the catalogue counter and the new consent status. This is an application-induced test integration failure, not a failing filter count.

**Correction:** Scope catalogue assertions to its existing data-catalogue-count counter or appropriate main region. Retain the consent live region and all filter/count/keyboard assertions.

**Acceptance:** Unmodified standard test passes after an approved real test correction; the complete normal CI commands and the RR-01 edge regression pass.

Effort: Under 1 h plus checks. Regression risk: Low: test selector scoping; do not remove accessible status semantics to silence the test..

### RR-02 — P1: Bilingual privacy drafts lack an approved private privacy-request channel

Affected: `src/pages/privacy.astro:36`, `src/i18n/fr-privacy.json`.

**Evidence:** Both generated routes contain data-privacy-contact-pending. Repository search found no verified private business channel. noindex does not prevent a route being published.

**Correction:** Owner designates and approves a verified private business contact method; replace draft contact text in EN/FR and approve final policy before publishing. Review operator/jurisdiction and actual GA4 retention/access settings. Do not invent or publish personal contact details.

**Acceptance:** Approved real channel tested/reviewed, accurate EN/FR request-handling text, owner policy/publication approval recorded; product index restrictions unchanged.

Effort: Owner decision plus 1–2 h text/verification work. Regression risk: High if an incomplete policy is published..

### RR-03 — P2: Historical source projection interprets replacement text instead of restoring literal bytes

Affected: `scripts/phase1-preservation.mjs:12`, `tests/browser/phase7.spec.ts`.

**Evidence:** Independent comparison against git show HEAD found 30/31 matching projections; phase7.spec.ts is corrupted by the $ followed by backtick sequence in baseline regex/template text. A review-only callback replacer matches all 31 originals.

**Correction:** Use a literal replacement callback (() => change.before) and add coverage for replacement metacharacters. Keep exact-one-hunk checks; do not replace preservation tests with unconditional passes.

**Acceptance:** All 31 projections match real HEAD and literal $&, dollar-backtick and dollar-apostrophe content survives intact; historical safety/asset tests remain green.

Effort: Under 1 h plus focused tests. Regression risk: Low production risk; meaningful integrity of regression assertions..

### RR-04 — P2: New WebKit privacy/image cases are outside the standard WebKit CI testDir

Affected: `playwright.webkit.config.ts:4`, `.github/workflows/ci.yml`.

**Evidence:** Standard WebKit config discovers tests/webkit only; new privacy-phase1 and responsive-phase1 specs live under tests/browser. They run through documented diagnostic configs and this release review, not that CI command.

**Correction:** Include the new cases and the RR-01 regression in the normal WebKit CI entry point, or add an explicit dedicated CI command after an approved implementation change.

Effort: 1–2 h. Regression risk: Low; prevents engine-specific coverage from depending on manual diagnostics..

## Verified scope

All eight implementation reports and all 31 tracked diffs were inspected, together with the ten new source/script/test/manifest files. Every generated binary was covered by hash/dimension/decode checks; provenance and the previously reviewed contact sheet remain intact. The helper's projection was compared directly with real Git HEAD, rather than trusting its own stored hunks.

- Connected GitHub comparison confirms current main equals the Phase 1 base, with zero ahead/behind. The checked-in deployment workflow matches the fetched remote workflow. No remote write occurred.
- The Google tag is absent before permission. Normal remembered/UI grants create one config; advertising consent remains denied. Validated affiliate/source events require document permission. Native links remain independent. Normal EN/FR withdrawal works; the combined storage failure in RR-01 reinitializes the loader after withdrawal.
- Thirteen original 1254-pixel illustrations remain byte-identical to Git HEAD. All 26 smaller variants match expected hashes/dimensions and decode. Original aggregate: 2,592,100 bytes; 480 set: 454,254 bytes (82.5% fewer); 960 set: 1,355,922 bytes (47.7% fewer). These are file-candidate savings, not field CWV improvements.
- Direct comparison found **234 protected originals unchanged**: products, original artwork, affiliate/release/image-rights policies, site configuration, lockfile and workflows. Across 122 baseline HTML pages, all **554 repeated affiliate controls** retain their exact href, rel, target and tracking identity. Fresh audit: **47 active permitted Canadian destinations, five holds**, zero invalid/duplicate URLs. This does not independently verify current offers or sellers.
- **104 product-language pages** retain noindex, nofollow. robots.txt and all five sitemap files are byte-identical to baseline; sixteen indexable sitemap URLs remain. Zero product publications are fully approved; no synthetic QA record remains. The XTherm below −20°C prohibition and pending manufacturer clarification are unchanged.

[Independent evidence](evidence/independent-integrity.json) contains exact hashes and per-file results. That diagnostic exits unsuccessfully because one source projection mismatches HEAD; the asset/destination/SEO comparisons pass. A callback-based literal replacement tested only inside the diagnostic matches all 31 originals and has not been applied to source.

## Privacy and contact requirements

No verified private business channel was found in repository text. Both generated privacy routes contain the contact-pending marker. No personal email, phone, home address or invented address was added. The pages are static public output if deployed: **noindex does not prevent publication or access**. Owner approval of a real private channel and final EN/FR request-handling text is required before release. Operator/jurisdiction and actual GA4 account retention/access still need owner review; this is not a compliance certification.

Google requires a published privacy explanation of Analytics and its processing; Canadian regulator guidance emphasizes meaningful choice and respecting withdrawal. Exact federal/provincial applicability remains context-dependent. Rechecked primary sources: [Google terms, section 7](https://marketingplatform.google.com/about/analytics/terms/us/), [Google consent-mode concepts](https://developers.google.com/tag-platform/security/concepts/consent-mode), [OPC consent guidance](https://www.priv.gc.ca/en/privacy-topics/privacy-for-businesses/appropriate-handling-of-personal-information/collecting-personal-information-and-consent/consent/gl_omc_201805/).

The checked-in and remotely fetched deployment workflow uses workflow_dispatch, requires main and confirm_publish=true. Merging alone does not trigger that workflow. Live Pages settings, outside automation and environment reviewer rules were not audited. This observation grants no permission to merge or publish; [remote baseline evidence](evidence/remote-baseline.json) records its scope.

## Required disposition

| Action | Recommendation | Outstanding requirement |
|---|---|---|
| Merge current candidate | NO-GO | Resolve RR-01, RR-03 and RR-05; retain normal CI regression coverage and rerun affected checks on the corrected bytes; obtain explicit owner approval |
| Publish | NO-GO | Merge requirements plus RR-02: approved verified private contact, final EN/FR policy/account review and explicit publication approval |
| Prepare written inventory/PR summary | Complete locally | Current-byte candidate only; regenerate hashes after fixes; no commit or PR is created |

RR-04 should be addressed when adding the RR-01 regression so WebKit coverage survives beyond a manual diagnostic command. Existing five holds and all product publication restrictions must remain unchanged during corrections.

Physical iPhone/Safari, private GA4 ingestion and field CWV/Lighthouse remain unverified. The earlier actual-loader probe blocked collection endpoints and omitted client/cookie values; it proves attempted behavior, not account ingestion. This review's edge reproduction blocks every external request, so its failure proves reinitialization of site analytics code, not delivery of real user data. No new performance score is inferred from the release checks.

## Fresh release and regression results

| Check | Observed result |
|---|---|
| Production build | PASS; 124 pages |
| Astro / TypeScript | PASS; 176 files, zero errors/warnings/hints |
| Unit suite | PASS; 133/133, no skipped cases |
| Deterministic images, release policy, affiliate and product-verification audits | PASS; all four commands exit 0 |
| EN/FR site / four universes / WHITEOUT / SEO | PASS; 124 HTML pages, 16 sitemap URLs, 104 restricted product-language pages |
| Conversion, BougeRV, Phase 5.5 | PASS; all three checks exit 0 |
| Full Chromium suite plus WebKit and new privacy/image cases | **337 passed / 1 failed**; zero skipped/flaky; 338 cases |
| Unmodified Phase 6 source, focused reproduction | **1 failed** with the same ambiguous status selector |
| Isolated proposed Phase 6 selector correction | 1 passed; diagnostic copy only, not applied to source |
| Combined storage-edge probe | **8 passed / 4 failed**; four failing EN/FR × Chromium/WebKit combinations reproduce RR-01 |
| Real-HEAD source projection | **30 matched / 1 mismatched**; RR-03 |
| Isolated literal-callback proposal | 31/31 matched; diagnostic only, not applied |

The 338-case run used all Chromium browser specs and the normal WebKit cases at 320/375/390, plus the new consent cases in every engine/width and image cases in WebKit. Per project: Chromium 245 pass / 1 fail; WebKit 320: 29/29; 375: 29/29; 390: 34/34. New consent and responsive cases pass on their normal paths. The negative storage probe is separate and remains red; it is not hidden in a passing aggregate.

Port 4322 belonged to an existing unrelated process, which was preserved. Read-only diagnostic test copies changed only four literal development URLs to an owned 4332 server; all other assertions were identical. Seventy source/helper files and their hashes are listed in [browser-mirror.json](evidence/browser-mirror.json). Preview used 4321. The first mirror setup missed shared fixture imports and ran no application tests; that setup log is retained, then corrected before the 338-case run. The failing Phase 6 case was reproduced directly from the original test directory to exclude a mirror artifact.

Proposed corrections are diagnostics, not fixes to the reviewed candidate. All actual source modifications remain exactly as reviewed. No remote CI run or successful PR check is claimed; there is no new commit/PR to validate. Dependencies were not installed. Versions: Node 22.23.4, Playwright 1.64.1, Astro 7.4.2 and Sharp 0.35.5. The local suite emulates WebKit devices on Windows; no physical iPhone was tested.

Individual command logs and [machine-readable outcomes](evidence/release-results.json) retain failures as well as passes. Historical QA outputs overwritten by browser diagnostics are archived under this review and restored to their original tracked bytes; source and the original reports are preserved.

## Required sequence before reconsidering GO

1. Resolve RR-01 in real candidate source and add the combined storage-failure regression in EN/FR and both engines. Verify withdrawal stays off across reload/navigation, with native Amazon links independent.
2. Resolve RR-03 with literal replacement and a regression for replacement metacharacters; verify every stored projection against real Git baseline bytes.
3. Resolve RR-05 in the actual catalogue test while preserving both accessible live regions and all filter/count/keyboard assertions. Include the new WebKit coverage in the normal CI path (RR-04).
4. Rerun the affected type/unit/browser/preservation checks on corrected bytes, regenerate the exact inventory, and inspect real PR checks after a separately approved commit/push/PR. The current inventory is not approval to perform any of those actions.
5. Before publication, owner designates and approves a verified private contact method, final EN/FR policy/request wording and actual operator/account-processing details. Do not invent personal details or send privacy requests to public issues. Product holds/indexing exclusions remain intact.
6. Obtain explicit approval for merging and, separately, for publishing. No approval is inferred from this review or the manual workflow gate.

## Final preservation and authorization state

All 240 original Phase 1 inventory entries remain at their reviewed bytes (all hash-bearing entries rechecked); all 2,537 original-worktree checkpoint files also match. 75 fresh QA artifacts were archived in this review and their historical paths restored or newly generated copies relocated. See [preservation results](evidence/final-preservation.json) and [capture ledger](evidence/qa-capture-preservation.json). The original process on port 4322 remains; review preview/dev servers stopped.

Final git whitespace check passed. No path is staged; HEAD remains the original base and every existing worktree/branch is preserved. No commit, push, PR, merge or deployment was performed. The exact inventory covers the current unresolved candidate and its review artifacts, not an approved or corrected release.
