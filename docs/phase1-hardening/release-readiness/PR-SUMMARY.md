# Proposed Pull Request summary — blocked draft

No PR has been opened. This description is prepared for review of the current local candidate; fixes are required before it should be presented as merge-ready.

## Proposed title
Require analytics opt-in and add responsive image candidates for thirteen catalogue illustrations

## Description

The production baseline loads optional GA4 before a visitor choice and thirteen catalogue illustrations offer only their original large file. The candidate adds all-visitor opt-in, EN/FR privacy drafts and footer preferences, and 480/960/original image candidates using the existing approved artwork.

Native navigation and Amazon.ca links remain independent of analytics. Existing validated affiliate/source events remain available in the permitted state. All thirteen originals are preserved; the smaller sets total 454,254 bytes at 480 pixels and 1,355,922 bytes at 960 pixels, versus 2,592,100 original bytes. No field performance improvement is asserted.

All 47 permitted Amazon.ca destinations, five held destinations, existing safety restrictions and 104 product-language noindex directives remain unchanged. Product-readiness work documents evidence gaps and a future three-profile pilot; it approves no products or held links.

## Blocking review findings

- RR-05: the full browser run reports 337 passed and one failed. Scope the older catalogue test’s status assertions to its catalogue counter; the new consent status makes its global role selector ambiguous. The original test remains unchanged in this reviewed candidate.

- RR-01: after withdrawal, a readable old grant can reactivate GA initialization when local storage is read-only and session storage is unavailable. Reproduced in EN/FR and Chromium/WebKit. Resolve the stale-grant reload path and add normal-CI regression coverage.
- RR-03: the source-preservation helper treats baseline replacement text as a JavaScript replacement string. Use a literal callback and prove all 31 projections match real HEAD. The current Phase 7 browser projection fails that independent comparison.
- RR-02 blocks publication: no approved private privacy-request channel exists in the policy. Both language pages still contain a pending-contact requirement. noindex does not make publishing those draft pages acceptable. Obtain an approved verified business channel and final bilingual policy review; do not invent personal contact information.

RR-04: new privacy/responsive cases need inclusion in the standard WebKit CI entry point. They have been run through release diagnostics, but the current WebKit testDir excludes their browser-directory paths.

## Validation and evidence

The fresh review build, Astro/type check, 133 unit tests, deterministic image checks, release/affiliate/verification audits, bilingual/SEO tests and conversion/BougeRV/Phase 5.5 checks passed. Direct comparison confirms 234 protected files, 554 repeated affiliate controls across all baseline pages and unchanged robots/sitemap bytes. The full browser run and the separate negative storage/helper probes are recorded in [the release review](release-readiness-review.md); normal regression passes do not override the blocking findings.

See [exact current-byte commit inventory](commit-inventory.md), [machine-readable candidate inventory](candidate-commit-inventory.json), [independent preservation evidence](evidence/independent-integrity.json) and [withdrawal reproduction](evidence/withdrawal-storage-edge.json). Regenerate the inventory after required fixes.

## Release risk and approval

Current recommendation: **NO-GO to merge; NO-GO to publish**. After the technical findings are resolved, a merge can be considered separately from publication because the checked-in Pages deployment workflow requires a manual dispatch and confirmation. Account-side settings and live Pages configuration are not certified by this review.

The intended opt-in change will reduce measured analytics volume and change the reporting population. A future rollout must publish module/footer/translations/policy and image manifest/routes/files consistently, retain all product restrictions, and obtain separate explicit owner approval for commit/push/PR/merge/deployment. No such action is performed by preparing this summary.

If responsive delivery needs rollback after a separately approved release, retain original files and fall back to original-only candidate delivery. Do not roll back consent to the previous unconditional GA loader. Physical-iPhone Safari, real-user CWV/Lighthouse and private GA4 ingestion remain outside the verified evidence.

Final browser outcome: 337 passed / 1 failed across 338 cases; the original Phase 6 case also fails alone. A scoped-selector diagnostic passes without being applied. The separate privacy storage probe remains 8 pass / 4 fail, and the actual source projection remains 30 match / 1 mismatch. See the review for the required fixes; this is not a green release.
