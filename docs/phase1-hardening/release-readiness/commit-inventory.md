# Candidate commit inventory

**Blocked for commit/merge recommendation pending the release findings. No files have been staged and no commit was created.** This is an exact inventory of current candidate bytes; regenerate it after the consent/helper/CI-selector fixes and any approved contact-text changes. No future commit SHA is invented.

Base and current HEAD: `2cc35df11968242c00fcc08060c18e5182dcabe0`. Branch: `feat/phase1-production-hardening`.

## Proposed commit 1 — atomic implementation

68 paths: 31 modified tracked files, 26 new WebPs and 11 other new source/script/test/manifest/required-fixture files. The original 240-file implementation inventory contains all these paths. The source-change JSON is required by scripts/phase1-preservation.mjs and must travel with the helper, even if remaining reports are committed separately.

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
| tests/browser/phase7.spec.ts | modified |
| tests/browser/privacy-phase1.spec.ts | new |
| tests/browser/responsive-phase1.spec.ts | new |
| tests/browser/whiteout-card-cleanup.spec.ts | modified |
| tests/browser/whiteout-phase2.spec.ts | modified |
| tests/browser/xtherm-temperature-warning.spec.ts | modified |
| tests/privacy.test.ts | new |

## Proposed commit 2 — reports and evidence

Include the other 172 original documentation/evidence paths plus 130 release-readiness paths (302 documentation paths in this proposed commit), all listed in [candidate-commit-inventory.json](candidate-commit-inventory.json). The original implementation evidence is about 55 MB, chiefly screenshots and overlapping diagnostic runs; the full evidence set is explicit so it can be reviewed before deciding to retain all of it in Git. It has not been silently pruned or staged.

The final JSON contains every exact proposed path and available SHA-256; the related [current diff review](release-readiness-review.md) and [PR summary](PR-SUMMARY.md) state what blocks acceptance. Self-inventory files omit self-referential hashes. Large generated/cache trees, test mirrors, linked dependencies, .astro and dist are excluded from the proposed commits.

No product JSON, original media, existing rights manifest, release/affiliate policy, lockfile or workflow is part of the change set. Original worktrees and unrelated user changes remain outside it.

Current source/asset commit: 68 paths. Current documentation/evidence commit: 302 paths. Combined candidate: 370 paths. These include review results documenting unresolved failures. The final JSON has exact paths/statuses/sizes/hashes, except its own self-referential bytes. No broad staging command was executed.
