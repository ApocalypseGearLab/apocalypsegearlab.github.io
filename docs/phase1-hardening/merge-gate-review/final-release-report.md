# Phase 1 final conditional-merge review

Prepared November 8, 2026 (America/Toronto). Branch: feat/phase1-production-hardening. Unchanged local HEAD and live main: 2cc35df11968242c00fcc08060c18e5182dcabe0.

**Decision: NO-GO for staging, commit, push, PR, merge or deployment while the release gates remain open.** The owner conditionally authorizes the Phase 1 workflow after every privacy gate is satisfied, but subsequently confirms that the Quebec provider/transfer assessment is not completed or confirmed and explicitly says not to merge or deploy while it remains unresolved. No repeat approval of the same role/email/settings is requested.

## Cleared facts and corrected policy copy

Accepted as explicit owner verification, not an independent private-account inspection: property ApocalypseGearLab / G-YFJJ5N9RBX; event/user retention two months; reset off; all four optional sharing switches off; Google Ads associations zero; all seven named Enhanced measurement categories enabled; Universal Analytics event collection off; email redaction on; user-provided-data collection and automatic email/phone/name/address detection disabled and saved.

The owner is the sole operator, personally handles applicable access/correction/withdrawal/deletion requests, and approves the public title **Privacy Officer / Responsable de la protection des renseignements personnels**, using apocalypsegearlab@gmail.com strictly for privacy requests. No personal name, address or phone is published. Retention/deletion procedures or a website response-time promise are not invented.

The previously reviewed policy covered visits/scrolls/custom clicks but omitted the newly confirmed search/form/video/download scope. Both proposed policies now disclose those supported interactions and metadata categories, the verified data controls and the approved role/personal review. Existing two-month/180-day distinctions, basic opt-in, accessible-cookie cleanup, reload on withdrawal, Gmail and outside-Quebec disclosures remain. Email redaction is not described as complete personal-data removal. Updated date: November 8, 2026.

Complete proposed policies: [English](privacy-policy.en.md), [French](privacy-policy.fr.md). [Owner evidence](evidence/owner-confirmed-settings.json) and [built output](evidence/final-policy-output.json) distinguish account confirmation from actual code tests. No general contact form/support page, video embed or new WHITEOUT product is added.

## Exact local changes

| File | Change / regression risk |
|---|---|
| src/pages/privacy.astro | Expand factual processing scope and controls; add the approved privacy role and sole-operator review; update date. Low runtime impact, public-copy accuracy is material. |
| src/i18n/fr-privacy.json | Matching French policy paragraphs and date; no new route architecture. Translation/bilingual output checked. |
| tests/browser/privacy-phase1.spec.ts | Add exact current policy-scope/control/role assertions to the existing bilingual test. No existing consent/storage assertion is removed or weakened. |
| docs/phase1-hardening/README.md | Current checkpoint pointer and conditional-authorization/assessment-hold status. Documentation only. |

All other additions are this review/evidence package. Consent/event runtime code, IDs, footer markup, product records, source-change projection fixture, image files, dependencies, lockfile and workflows are unchanged. Ordinary GA4 traffic analytics, custom affiliate click tracking and future supported video engagement remain configured as the owner wants. No remote GA4 setting was changed by this review.

## Privacy and account gates

| Priority / gate | State and precise next action |
|---|---|
| P1 owner hold: provider/transfer assessment | **OUTSTANDING**, expressly owner-confirmed. Complete the factual evaluation, resolve applicable safeguards/contract arrangements and record the responsible conclusion. A public privacy notice, opt-in or passing tests is not recorded as a completed assessment. |
| P1 private GA4 configuration | Other product integrations/exports, Google-tag destinations/automatic detection/consent overrides and account/property access roles/counts remain unverified. Zero Google Ads links does not establish zero other recipients; website operator status does not establish sole GA4 access. Owner confirmation was requested; no private login, access list or unknown default is fabricated. |
| P1 actual request practices | Role and personal review cleared. Verification/complaint/response process, actual mailbox safeguards/access and purpose-based retention/destruction still need factual documentation. Do not substitute a fictional fixed period or deletion process. |
| P1 requested protected workflow | Live main reports protected:false, no required status contexts, and no rulesets. Confirm/configure the requested protected PR/CI enforcement before a future merge. This review changes no protections and bypasses no check. |

[Minimum remaining steps](minimum-release-steps.md) and the [factual provider worksheet](provider-review-worksheet.md) make these actions concrete. No legal certification, assessment result, executed agreement or identity is invented. Current known wording is corrected locally; any material findings from the remaining review must be reflected in the policies and revalidated before release.

## Consent and collection review

The existing basic opt-in implementation creates the external tag only after current explicit permission or a safely revocable saved grant; the whole tag remains absent otherwise. It configures analytics consent only after permission, while advertising storage/user-data/personalization remain denied and Google signals disabled in the website code. Withdrawal disables measurement, clears document permission/queue and accessible _ga cookies, and reloads to unload third-party listeners. Native navigation and Amazon links remain independent. The code cannot establish private tag destinations or account-level overrides.

Enhanced outbound click events may coexist with the custom affiliate_click event for one interaction; preserve event-specific conversion reporting rather than adding both indiscriminately. Future video engagement is an enabled supported feature, not evidence that a player was added or real video events were successfully collected. Google’s [enhanced measurement guidance](https://support.google.com/analytics/answer/9216061?hl=en) and [redaction guidance](https://support.google.com/analytics/answer/13544947?hl=en) informed these distinctions. The catalogue already has a search form; no privacy-request form is introduced.

## Validation and preservation

Before editing, all 706 prior candidate paths were inspected and the 705 non-self inventory hashes matched; saved 134-unit/84-browser evidence was valid at that checkpoint. The known policy/test inputs then changed, so the relevant checks below were rerun rather than treating the old policy assertions as current. Unaffected affiliate/image/release evidence was reused only with matching supporting-file/content hashes.

| Check | Observed result / evidence |
|---|---|
| Production build | PASS; 124 real-data pages; build.log |
| Astro / TypeScript | PASS; 183 files, zero errors/warnings/hints; check.log |
| Unit suite | PASS; 134/134, no skipped; test.log |
| Bilingual site/SEO | PASS; 124 EN/FR pages, 16 indexable URLs; test-site.log |
| Fresh independent integrity | PASS; 234 protected originals, 33 real-HEAD projections, 554 affiliate controls across 122 baseline pages, 104 product-language noindex restrictions, robots and five sitemaps unchanged, no synthetic products; independent-integrity.json |
| Current Chromium privacy/storage/event checks | PASS; 24/24, two workers, zero skipped/retried/flaky cases; chromium-results.json |
| Current WebKit privacy/storage checks at 320/375/390px | PASS; 60/60, 20 at each width, one worker, zero skipped/retried/flaky cases; webkit-results.json |
| Final prior-file/unrelated-worktree preservation and exact inventory | PASS; 702 of 706 prior paths byte-identical, exactly four approved changes, nine current frozen hashes, 2,537 unrelated-checkpoint files unchanged, empty index, unchanged worktree branches/HEADs, Git whitespace pass; final-preservation.json |

The browser fixtures block real Google requests and simulate retailer navigation. They prove browser permission/native-link behavior and current policy assertions, not private GA4 ingestion/redaction effectiveness, tag destinations, Gmail delivery or provider compliance. WebKit runs with one worker because prior Windows parallel runs had retained click-stability stalls; no clean parallel-WebKit or physical iPhone Safari pass is claimed. No dependency install, framework patch, timeout increase or normal-config change is made. Earlier full-suite/performance results remain historical and are not presented as new Lighthouse/CWV measurements.

All 234 protected originals match their baseline hashes, all nine current validated source hashes match, and all 2,537 unrelated-checkpoint files remain byte-identical. Exactly the three policy/test files and README pointer changed relative to the previous 706-path candidate; all 702 other paths, including every historical report/evidence file, are preserved. Historical docs/qa paths remain clean and the owned test servers are stopped. [Preservation evidence](evidence/final-preservation.json), [browser summary](evidence/browser-summary.json), [complete current inventory](candidate-commit-inventory.json) and [proposed commit grouping](commit-inventory.md) record the current local candidate.

The 47 active Canadian Amazon destinations/tag apocalypsegear-20 and five holds remain intact: EcoFlow RIVER 2 Pro, INIU P62, Jackery Explorer 300, Kidde C3010 and NANUK 904. All 52 products remain without full publication approval; 104 product-language pages retain noindex, nofollow. All 13 responsive originals and 26 variants, four universes, retained safety warnings and below −20°C XTherm restriction remain unchanged. No new WHITEOUT integration was performed.

## GitHub, CI and deployment disposition

Live repository inspection found main still at the base SHA and no Phase 1 PR. The existing Validate Astro site workflow runs on PRs targeting main; no new candidate commit or remote Phase 1 CI result exists. There is no Phase 1 PR URL or merge SHA to report because the privacy gates fail. Do not substitute PR #37’s successful checks for this uncommitted candidate.

The verified deploy workflow on main uses workflow_dispatch only, main and confirm_publish:true. Merging does not automatically dispatch it under this workflow. The latest visible existing Pages deployment is [run 42413047534](https://github.com/ApocalypseGearLab/apocalypsegearlab.github.io/actions/runs/42413047534), successful for 2cc35df11968242c00fcc08060c18e5182dcabe0; it is **not a Phase 1 deployment**. [GitHub read-only evidence](evidence/github-read-only-review.json) records the snapshot.

**Final recommendation: technical GO for review of the validated local scope, but NO-GO for the release workflow until the owner’s assessment hold and the other listed gates are resolved.** Follow the [minimum steps](minimum-release-steps.md); then validate any resulting source changes and use the authorized PR/CI/protected workflow without force pushes or overrides. No staging, commit, push, PR creation/update, merge, deployment or protection change occurred.
