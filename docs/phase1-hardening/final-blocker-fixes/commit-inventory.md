# Exact candidate commit inventory

Local proposal only. No staging, commit, push, PR, merge or deployment has occurred. Technical results and publication blockers are in [the final release report](final-release-report.md). Regenerate this inventory after any approved policy application or other edit.

Base / unchanged HEAD: 2cc35df11968242c00fcc08060c18e5182dcabe0. Branch: feat/phase1-production-hardening.

## Proposed atomic implementation commit

71 paths: 33 modified tracked files, 26 new WebPs, and 12 other new source/script/test/manifest/required-fixture files. Include the source-changes.json fixture with its helper; it is required for integrity checks. No product records, original artwork, dependency lockfile or workflow changes are proposed.

| Path | State |
|---|---|
| assets/media/blackout/ecoflow-river-2-pro-power-station-blackout-480.webp | new |
| assets/media/blackout/ecoflow-river-2-pro-power-station-blackout-960.webp | new |
| assets/media/blackout/fenix-cl26r-pro-camping-lantern-blackout-480.webp | new |
| assets/media/blackout/fenix-cl26r-pro-camping-lantern-blackout-960.webp | new |
| assets/media/blackout/fenix-hm50r-v2-headlamp-blackout-480.webp | new |
| assets/media/blackout/fenix-hm50r-v2-headlamp-blackout-960.webp | new |
| assets/media/blackout/iniu-p62-20000mah-power-bank-blackout-480.webp | new |
| assets/media/blackout/iniu-p62-20000mah-power-bank-blackout-960.webp | new |
| assets/media/blackout/jackery-explorer-1000-v2-power-station-blackout-480.webp | new |
| assets/media/blackout/jackery-explorer-1000-v2-power-station-blackout-960.webp | new |
| assets/media/blackout/jackery-solarsaga-100w-air-solar-panel-blackout-480.webp | new |
| assets/media/blackout/jackery-solarsaga-100w-air-solar-panel-blackout-960.webp | new |
| assets/media/blackout/kidde-c3010-carbon-monoxide-alarm-blackout-480.webp | new |
| assets/media/blackout/kidde-c3010-carbon-monoxide-alarm-blackout-960.webp | new |
| assets/media/blackout/midland-er310-emergency-radio-blackout-480.webp | new |
| assets/media/blackout/midland-er310-emergency-radio-blackout-960.webp | new |
| assets/media/fallout/leatherman-wave-plus-multitool-fallout-480.webp | new |
| assets/media/fallout/leatherman-wave-plus-multitool-fallout-960.webp | new |
| assets/media/fallout/nanuk-904-first-aid-kit-fallout-480.webp | new |
| assets/media/fallout/nanuk-904-first-aid-kit-fallout-960.webp | new |
| assets/media/fallout/reliance-aqua-tainer-9410-03r-water-container-fallout-480.webp | new |
| assets/media/fallout/reliance-aqua-tainer-9410-03r-water-container-fallout-960.webp | new |
| assets/media/fallout/sawyer-squeeze-sp129-water-filter-fallout-480.webp | new |
| assets/media/fallout/sawyer-squeeze-sp129-water-filter-fallout-960.webp | new |
| assets/media/fallout/sol-emergency-bivvy-survival-shelter-fallout-480.webp | new |
| assets/media/fallout/sol-emergency-bivvy-survival-shelter-fallout-960.webp | new |
| docs/phase1-hardening/evidence/source-changes.json | new |
| package.json | modified |
| playwright.webkit.config.ts | modified |
| scripts/audit-conversion.ts | modified |
| scripts/audit-google.mjs | modified |
| scripts/build-responsive-imported-media.mjs | new |
| scripts/phase1-preservation.mjs | new |
| scripts/verify-bilingual.mjs | modified |
| scripts/verify-images.mjs | modified |
| scripts/verify-site.mjs | modified |
| scripts/whiteout-phase2-preservation.mjs | modified |
| src/components/AnalyticsConsent.astro | new |
| src/components/Footer.astro | modified |
| src/components/GoogleAnalytics.astro | modified |
| src/data/media/responsive-imported-manifest.json | new |
| src/i18n/fr-privacy.json | new |
| src/i18n/translate.ts | modified |
| src/lib/affiliate-analytics.ts | modified |
| src/lib/analytics-consent.ts | new |
| src/lib/imported-media.ts | modified |
| src/pages/fr/[...path].astro | modified |
| src/pages/images/blackout/[file].webp.ts | modified |
| src/pages/images/fallout/[file].webp.ts | modified |
| src/pages/privacy.astro | new |
| tests/browser/analytics.spec.ts | modified |
| tests/browser/bilingual.spec.ts | modified |
| tests/browser/bougerv.spec.ts | modified |
| tests/browser/conversion.spec.ts | modified |
| tests/browser/fixtures.ts | modified |
| tests/browser/media.spec.ts | modified |
| tests/browser/morakniv.spec.ts | modified |
| tests/browser/phase47.spec.ts | modified |
| tests/browser/phase48.spec.ts | modified |
| tests/browser/phase5.spec.ts | modified |
| tests/browser/phase53.spec.ts | modified |
| tests/browser/phase55.spec.ts | modified |
| tests/browser/phase6.spec.ts | modified |
| tests/browser/phase7.spec.ts | modified |
| tests/browser/privacy-phase1.spec.ts | new |
| tests/browser/privacy-storage-phase1.spec.ts | new |
| tests/browser/responsive-phase1.spec.ts | new |
| tests/browser/whiteout-card-cleanup.spec.ts | modified |
| tests/browser/whiteout-phase2.spec.ts | modified |
| tests/browser/xtherm-temperature-warning.spec.ts | modified |
| tests/privacy.test.ts | new |

## Proposed documentation and evidence commit

436 paths. The JSON inventory lists every path, state and SHA-256, including historical reports, failure logs and fresh captures. No files were silently pruned. Raw evidence can be reviewed for a separately authorized curated commit; do not discard the local artifacts.

**Contact exposure gate:** the following three files contain the owner-supplied business address and must remain local until the owner explicitly approves public display (including public repository/PR exposure):

- docs/phase1-hardening/final-blocker-fixes/privacy-policy-draft.en.md
- docs/phase1-hardening/final-blocker-fixes/privacy-policy-draft.fr.md
- docs/phase1-hardening/final-blocker-fixes/privacy-approval-requirements.md

## Changes in this blocker-fix task

144 candidate paths changed or newly entered the candidate relative to the 370-path review checkpoint. Exact before/after hashes and taskChange fields are in [candidate-commit-inventory.json](candidate-commit-inventory.json). 363 previous candidate paths remain byte-identical.

The eight source/config/test paths and required fixture are listed in the final report. The Phase 1 README gains a checkpoint pointer. All remaining additions are this final-blocker-fixes report/evidence package. The two new tracked modifications are the WebKit config and catalogue test; no previously modified tracked application file was otherwise altered in this fix pass.

## Excluded from any current commit proposal

- Ignored node_modules, dist, .astro and .tools diagnostic mirrors/configs/caches. The executed config and 71-file source/hash/port-substitution ledger are retained in evidence.
- Restored historical docs/qa paths; their fresh captures are archived under this report.
- Every unrelated worktree, local modification and master-audit file in the original checkout.

Approval sequence: approve public privacy-contact exposure and final EN/FR policy/practices; apply approved text and revalidate; regenerate this inventory; explicitly authorize staging/commit; then explicitly authorize any push/PR/merge/deployment. No future commit SHA or remote CI success is invented.
