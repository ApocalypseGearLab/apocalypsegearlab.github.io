# Phase 1 release notes

Review package for PR #38, updated November 8, 2026. Publication remains subject to the owner decision below; this cleanup does not authorize merge or deployment.

## Implementation and preservation

- GA4 G-YFJJ5N9RBX requires all-visitor opt-in. Withdrawal disables tracking, clears accessible Analytics cookies and reloads to unload the tag. Navigation and Amazon.ca links work independently of permission. EN/FR policies describe the verified configuration and adopted privacy-request practices.
- Thirteen original images are preserved with 26 additional 480/960 responsive WebPs. Candidate totals are 82.5% smaller at 480px and 47.7% smaller at 960px; these are image-byte measurements, not field performance results.
- All 47 active Amazon.ca destinations, five holds, existing safety restrictions and 104 product-language noindex restrictions remain unchanged. No new WHITEOUT products are included.
- The documentation cleanup in e631263 preserved the implementation validated in 69cf055. The consent-card follow-up below changes only its reviewed UI, labels and relevant checks. Product records, image assets, SEO rules, unrelated worktrees and eight pre-existing untracked diagnostics remain preserved.

## Validation

[GitHub CI run 42510493911](https://github.com/ApocalypseGearLab/apocalypsegearlab.github.io/actions/runs/42510493911) passed on 69cf055be3ee2c71187fc474d67f44e835413c9f, including the configured unit/build/image/affiliate/release checks, 259 Chromium and 131 WebKit cases. This is the historical pre-redesign validation baseline; the consent UI follow-up has its own focused evidence below. The CSS-pixel screenshot fix is retained. Cleanup validation checks document references, the required preservation fixture, exact implementation hashes and worktree preservation; it does not repeat a full browser suite locally. GitHub independently runs its existing PR workflow on the cleanup commit; consult the PR for that run's current status.

No Lighthouse score, real-user metric, physical Safari result, private-account inspection or provider-backend deletion result is asserted.

## Premium consent-card follow-up

The nonmodal card is a direct body child with position: fixed and z-index 80: 448px wide at a 24px desktop/tablet offset; 12px mobile side/bottom margins with safe-area insets. The site charcoal, metallic border and amber tokens supply the palette. Accept/Decline have equal-width 44px-minimum targets; Options contains only essential storage and the optional GA4 checkbox. Save is the only way the checkbox changes permission. The footer button and policy anchor reopen preferences. Scrolling, navigation and Escape do not dismiss a pending decision; Escape returns from Options to the summary. Extra scroll clearance keeps footer links reachable, and short-view options scroll internally while decision buttons remain visible.

The existing parser, storage read/write and revocability checks, tag loading, cookie clearing and apply/withdrawal core remain unchanged. The policies only rename the referenced action to Accept/Accepter. The bilingual verifier explicitly permits the owner-specified shared word Options; historical preservation fixtures record only the exact updated diagnostic/configuration hunks.

Focused validation: 10 privacy/bilingual/affiliate-parameter units; 70 browser cases (35 Chromium, 35 WebKit), including both languages at 320/375/390/768/1440px, options/save, fixed scrolling, footer/native retailer navigation, keyboard/focus, WCAG scans, storage restrictions and withdrawal. Type checks, build/site/SEO, bilingual contracts and exact file preservation are checked separately. Screenshots and raw results remain ignored local diagnostics, not new PR reports. WebKit is an engine check, not physical iPhone certification.

## Retained review records

- [Responsive image measurements](image-optimization-report.md)
- [Existing product holds and future publication gates](product-readiness-matrix.md)
- [Adopted single-operator privacy-request procedure](owner-verified-ga4-update/privacy-request-procedure.md)
- [Provider/transfer assessment and outstanding decision](owner-verified-ga4-update/provider-transfer-assessment.md)
- [Owner-confirmed facts and explicitly unknown facts](owner-verified-ga4-update/evidence/owner-verified-facts.json)
- [Necessary release conditions versus optional improvements](release-blocker-resolution/release-requirements.md)
- [Source-preservation fixture](evidence/source-changes.json), required by scripts/phase1-preservation.mjs; retained unchanged.

The canonical proposed public policies are [English source](../../src/pages/privacy.astro) and [French translations](../../src/i18n/fr-privacy.json), served at /privacy/ and /fr/privacy/. Separate Markdown policy copies are unnecessary.

## Remaining publication decision

The owner has adopted the procedure and confirmed the recorded GA4/Gmail settings. No technical release defect or security incident is established by this cleanup. Other Google Product links/tag destinations and local/downloaded Gmail-copy arrangements remain expressly **not checked**; that does not establish extra integrations, copies, unlawful processing or an incident.

The Privacy Officer has not yet recorded the final adequate-protection/written-arrangement conclusion for the covered Google/GitHub/Gmail transfers. Complete that bounded decision using the retained assessment, checking only additional flows/copies that affect its scope and resolving any specific protection gap identified. No automatic paid-mailbox migration, custom DPA, repeated adoption or whole-site audit is required by this package. Separate owner publication authorization remains required.

## Scope cleanup

The original PR contained 848 changed files and 209,550 added lines. Phase 1 documentation/evidence accounted for 778 files and 208,259 added lines: 149,610 JSON lines, 37,795 log lines, and repeated reports/other text. Its 277 PNGs and 75 diagnostic WebPs added approximately 234 MB of redundant binary evidence. Repeated browser result dumps and expanding checkpoint/commit inventories were the main line-count drivers.

At the cleanup checkpoint, the review diff retained 70 implementation paths and eight documentation/fixture paths; the consent follow-up adds one focused test file. The 770 removed files are archived under ignored .tools/phase1-cleanup/removed-documents in this worktree and remain recoverable from earlier feature-branch commits. No history rewrite or source deletion was performed; this reduces the PR diff, not historical Git storage. Earlier checkpoint reports and duplicate policy exports are superseded by these current records.
