# Proposed Phase 1 PR summary — local document, no PR created

Title: **Require GA4 opt-in, harden withdrawal and finalize bilingual privacy disclosures**

The full Phase 1 candidate makes optional GA4 opt-in for all visitors, protects withdrawal against stale/read-only storage grants and adds 480/960 responsive variants for thirteen preserved catalogue originals. Native navigation and Amazon links remain independent of analytics.

The latest EN/FR privacy copy reflects the owner-confirmed retention/reset/sharing and expanded measurement controls, email redaction and disabled user-provided collection. It names the approved privacy-role title and privacy-only Gmail contact, discloses sole-operator rights-request review, and does not invent a response-time, retention or deletion promise. Ordinary traffic, custom affiliate clicks and future supported video measurement remain desired and configured. No new video player or WHITEOUT product is added.

Validation: fresh build/type/bilingual-site/integrity checks, all 134 unit tests and all 84 scoped browser tests pass (24 Chromium; 60 single-worker WebKit at 320/375/390px), with no skipped/retried/flaky cases. All 47 active affiliate destinations, five holds, 104 product indexing restrictions, originals/26 variants and safety limits remain intact. Exactly four previous candidate paths changed; 702 others and 2,537 unrelated-checkpoint files match.

**Do not publish this PR yet.** The owner explicitly blocks merge/deployment while the Quebec provider/transfer assessment remains unresolved. Other private GA4 settings/access and actual request practices still need verification. Main is currently reported unprotected/no rulesets; the requested protected PR/CI workflow must be established/confirmed before future merging. See the [final report](final-release-report.md) and [minimum steps](minimum-release-steps.md).

No remote candidate CI, PR URL, candidate commit SHA or merge SHA exists. No staging, commit, push, PR, merge or deployment occurred. The last successful Pages deployment belongs to the unchanged baseline, not this candidate.
