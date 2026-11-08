# Proposed PR summary — local draft only

Title: **Require GA4 opt-in and finalize bilingual privacy policies with owner-confirmed settings**

The full Phase 1 candidate requires all-visitor opt-in for optional GA4, hardens withdrawal against stale grants in restricted storage, and adds 480/960 responsive variants for thirteen preserved catalogue originals. Buying and navigation remain native and independent of analytics.

The latest EN/FR policies now state the owner-confirmed, saved two-month event and user retention, disabled reset and all four disabled optional account-sharing settings. They keep browser durations separate, retain the approved privacy-only Gmail address and Quebec disclosures, and avoid an invented Gmail retention/deletion promise. Public draft notices are removed. No general support/contact flow, phone or home address is added.

Validation passes: November 7 build/type, 134 unit tests, site/image/release/affiliate/verification and all 84 scoped browser cases (24 Chromium, 60 WebKit at 320/375/390px). These results were reused after matching-source/HTML verification on November 8; fresh independent integrity, file preservation and final inventory/report checks completed the interrupted work. No application/test source changed during the resume. WebKit uses one worker due the previously documented Windows parallel stability limitation. The earlier full 390-test run remains historical and was not rerun for this policy-only change. Remote CI and private-account ingestion are not claimed.

The 47 active Amazon destinations, five holds, 104 product indexing restrictions, four universes, safety restrictions and original/derivative image bytes remain unchanged. Exactly four existing candidate files changed since the prior checkpoint; 649 others and 2,537 unrelated-checkpoint files are preserved.

Technical scope is ready for review. Publication/merge remains NO-GO until the unresolved account-destination/collection/access checks and actual privacy-request/Quebec operating requirements are resolved. Retention/reset/four sharing controls are now cleared. See [final release report](final-release-report.md), [remaining checks](remaining-owner-checks.md) and [exact inventory](commit-inventory.md).

No PR was opened. Staging, commit, push, PR creation, merge and deployment require further explicit approval; none has occurred.
