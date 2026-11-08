# Phase 1 release notes

Review package for PR #38, updated November 8, 2026. Publication remains subject to the owner decision below; this cleanup does not authorize merge or deployment.

## Implementation and preservation

- GA4 G-YFJJ5N9RBX requires all-visitor opt-in. Withdrawal disables tracking, clears accessible Analytics cookies and reloads to unload the tag. Navigation and Amazon.ca links work independently of permission. EN/FR policies describe the verified configuration and adopted privacy-request practices.
- Thirteen original images are preserved with 26 additional 480/960 responsive WebPs. Candidate totals are 82.5% smaller at 480px and 47.7% smaller at 960px; these are image-byte measurements, not field performance results.
- All 47 active Amazon.ca destinations, five holds, existing safety restrictions and 104 product-language noindex restrictions remain unchanged. No new WHITEOUT products are included.
- Cleanup changes only Phase 1 documentation. Production source, policies, tests, scripts, configuration and image assets remain byte-identical to validated commit 69cf055. Unrelated worktrees and eight pre-existing untracked diagnostics are preserved.

## Validation

[GitHub CI run 42510493911](https://github.com/ApocalypseGearLab/apocalypsegearlab.github.io/actions/runs/42510493911) passed on 69cf055be3ee2c71187fc474d67f44e835413c9f, including the configured unit/build/image/affiliate/release checks, 259 Chromium and 131 WebKit cases. This evidence remains applicable to the unchanged implementation. The CSS-pixel screenshot fix is retained. Cleanup validation checks document references, the required preservation fixture, exact implementation hashes and worktree preservation; it does not repeat a full browser suite locally. GitHub independently runs its existing PR workflow on the cleanup commit; consult the PR for that run's current status.

No Lighthouse score, real-user metric, physical Safari result, private-account inspection or provider-backend deletion result is asserted.

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

The review diff now retains 70 implementation paths and eight documentation/fixture paths. The 770 removed files are archived under ignored .tools/phase1-cleanup/removed-documents in this worktree and remain recoverable from earlier feature-branch commits. No history rewrite or source deletion was performed; this reduces the PR diff, not historical Git storage. Earlier checkpoint reports and duplicate policy exports are superseded by these current records.
