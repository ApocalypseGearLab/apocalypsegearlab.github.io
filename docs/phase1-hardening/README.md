> Latest checkpoint: [Owner-verified GA4 update](owner-verified-ga4-update/README.md). The owner has confirmed Analytics terms acceptance, no Ads or GA4 BigQuery links, the Search Console link and one listed administrator at each GA4 level. Both policies now distinguish Search Console reporting from GA4 retention. Remaining decisions concern unchecked material data flows, mailbox arrangements and adoption/approval of the prepared privacy procedure and transfer assessment. No staging, commit, push, PR, merge or deployment is authorized.

# ApocalypseGearLab Phase 1 — local review package

Initial implementation checkpoint prepared 2026-11-07. The sections below preserve the first implementation report and its historical results. Its original missing-contact blocker is superseded by the approved contact in the latest privacy-finalization report linked above; current publication requirements concern the remaining unverified operating practices. No staging, commit, push, PR creation, merge or deployment has occurred.

Worktree: tmp/phase1-production-hardening within the original checkout. Branch: feat/phase1-production-hardening. Verified main/base and unchanged HEAD: 2cc35df11968242c00fcc08060c18e5182dcabe0. Main and the successful production deployment were checked at Phase 1 setup; production was not changed by this work.

The six completed master audit reports remain in the original checkout at docs/audits/. They were not moved, overwritten or restarted. Original feat/four-universes-cinematic, feat/whiteout-phase2, iOS and conflict-resolution worktrees are preserved.

## Delivered

| Requested deliverable | Report / evidence |
|---|---|
| Changed-file inventory | [Inventory](changed-file-inventory.md), with complete machine-readable path/hash lists |
| EN/FR privacy and analytics implementation | [Privacy and analytics report](privacy-analytics-report.md) |
| All thirteen image byte measurements | [Image optimization report](image-optimization-report.md) |
| Five holds, XTherm restriction, three future pilots | [Product-readiness matrix](product-readiness-matrix.md) |
| Browser/performance samples and limits | [Performance report](performance-report.md) |
| Complete check outcomes and resolved failures | [Validation report](validation-report.md) |
| Screenshots | [Image comparison](evidence/image-framing-comparison.png), [page captures](evidence/after-screenshots/), [bilingual keyboard/consent captures](evidence/browser-supplement-artifacts/) |
| Review-ready description and deployment risk | [PR summary](PR-SUMMARY.md) — no PR opened |

## Highest-impact results

- GA4 is off until valid all-visitor opt-in. Default/reject, EN/FR grant/withdraw, storage failure/expiry, cross-tab withdrawal/clearing, native affiliate navigation and no-JS paths are tested. Actual Google-runtime observations are separated from blocked collection and unverified account ingestion.
- Twenty-six 480/960 WebPs supplement thirteen untouched originals. Aggregate candidate bytes fall by 82.5% at 480 pixels or 47.7% at 960 pixels. Chromium and WebKit select the expected candidates; no field CWV uplift is claimed.
- Forty-seven active Amazon.ca destinations and five holds are preserved. All 104 product-language pages retain noindex restrictions and exclusions. Three pilot candidates have an evidence plan, not publication approval. The below −20°C XTherm prohibition remains.
- The production build, type check, 133 unit tests, image/affiliate/safety/SEO checks and targeted Chromium/WebKit regressions have passing evidence. The validation report records initial test failures and their passing targeted corrections rather than presenting a fabricated single aggregate pass count.

## Outstanding owner decisions

**Before publishing either privacy policy:** designate and approve a verified private business contact channel. No verified channel was found in the repository. No personal email, phone, home address or invented details were added; public GitHub issues are explicitly discouraged for personal information. The bilingual drafts visibly record the contact-method requirement and remain noindex.

Review the final EN/FR explanation against the responsible operator's jurisdiction and real GA4 account retention/access settings. The code review does not establish legal applicability or certify compliance. Publication/deployment requires separate explicit approval under the current instructions; this package does not request or imply that approval.

Future pilot publication requires fresh exact-variant evidence, a designated reviewer, safety clearance, factual bilingual editorial review and explicit approval under the unchanged release policy. There is no current approval to activate held links, approve product drafts or widen indexing.

Physical-device Safari, Lighthouse/field CWV and private analytics report ingestion remain unverified. Screenshots, engine tests and single-sample localhost measurements must not be described as those missing forms of evidence.
