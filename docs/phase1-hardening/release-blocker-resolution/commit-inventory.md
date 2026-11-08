# Exact current candidate inventory

Local review proposal only. No staging, commit, push, PR, merge or deployment occurred. The latest owner instruction requires release conditions to be resolved and publication authorization confirmed before Git or deployment actions. No such actions are permitted now. Resolved GA4 settings and remaining Quebec/account operating-practice checks are separated in the release report.

Base / unchanged HEAD: 2cc35df11968242c00fcc08060c18e5182dcabe0. Branch: feat/phase1-production-hardening.

## Proposed atomic implementation

71 paths: 33 modified tracked files, 26 new WebPs and 12 other new source/test/script/manifest/required-fixture files. The source-changes.json integrity fixture must travel with its helper. Product records, original artwork, lockfile and workflows remain unchanged.

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

## Documentation and evidence proposal

720 paths. [candidate-commit-inventory.json](candidate-commit-inventory.json) lists every path, byte count and SHA-256 except the self-inventory hash/size. Earlier failure logs, policy drafts and evidence are preserved as historical checkpoints; the current release-blocker-resolution folder records the bounded assessment, proposed procedure and current release conditions. Owner-confirmed GA4 settings and the public privacy role supersede their earlier uncertainty; the provider/transfer assessment remains outstanding. No staging/commit/PR/merge step is undertaken while the release gates remain open.

## Delta in this finalization

44 paths changed or were added relative to the 750-path merge-gate-review checkpoint. 747 previous paths remain byte-identical. Exactly three existing candidate files changed: src/pages/privacy.astro, src/i18n/fr-privacy.json and the Phase 1 README pointer. All other additions are this report/evidence package. Before/after hashes are in the JSON taskChange rows.

## Exclusions and next steps

Ignored node_modules, dist, .astro and .tools mirrors/configs/caches are excluded. Fresh QA captures are archived here; their historical docs/qa paths are restored. All unrelated worktrees and original master-audit files are excluded and preserved.

Complete the GA4/Quebec operating-practice checks and any resulting factual policy edits; revalidate/refreeze changed bytes; establish the requested protected PR/CI workflow. Only after the required conditions and new owner publication authorization may isolated Phase 1 staging/commit/PR/merge proceed, without bypassing checks. Deployment remains subject to all privacy gates and the owner’s explicit hold. No future commit SHA, remote CI success or legal certification is invented.
