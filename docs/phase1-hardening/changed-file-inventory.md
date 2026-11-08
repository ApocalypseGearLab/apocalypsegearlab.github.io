# Changed-file inventory

Relative to main `2cc35df11968242c00fcc08060c18e5182dcabe0` in the dedicated Phase 1 worktree. Nothing is staged. Full path/byte/SHA-256 records are in [changed-file-inventory.json](evidence/changed-file-inventory.json). Inventory files list themselves without self-referential hashes.

## Source, checks and tests

| File | State | Purpose |
|---|---|---|
| package.json | modified | Add meaningful consent-parser tests to existing unit command |
| scripts/audit-conversion.ts | modified | Assert exact privacy additions and retain destination/metadata checks |
| scripts/audit-google.mjs | modified | Make optional Google diagnostic consent-aware and block fallback hosts in nonlive mode |
| scripts/build-responsive-imported-media.mjs | new | Deterministic 480/960 derivatives and hash manifest |
| scripts/phase1-preservation.mjs | new | Project only reviewed exact source/srcset changes for historical contracts |
| scripts/verify-bilingual.mjs | modified | Validate bilingual privacy routes and zero pre-consent loaders |
| scripts/verify-images.mjs | modified | Include deterministic derivative integrity check |
| scripts/verify-site.mjs | modified | Validate bilingual privacy routes and zero pre-consent loaders |
| scripts/whiteout-phase2-preservation.mjs | modified | Project only reviewed exact source/srcset changes for historical contracts |
| src/components/AnalyticsConsent.astro | new | Localized native footer preference controls |
| src/components/Footer.astro | modified | Discoverable privacy links and preference control |
| src/components/GoogleAnalytics.astro | modified | Install consent-gated analytics and existing optional event handler |
| src/data/media/responsive-imported-manifest.json | new | Deterministic 480/960 derivatives and hash manifest |
| src/i18n/fr-privacy.json | new | Accurate EN/FR policy draft with contact-method requirement |
| src/i18n/translate.ts | modified | Route and translate new privacy/consent text |
| src/lib/affiliate-analytics.ts | modified | Track validated native clicks only with permission |
| src/lib/analytics-consent.ts | new | Versioned opt-in state, fail-closed loading, storage and withdrawal |
| src/lib/imported-media.ts | modified | Expose approved responsive candidates through existing delivery gate |
| src/pages/fr/[...path].astro | modified | Route and translate new privacy/consent text |
| src/pages/images/blackout/[file].webp.ts | modified | Expose approved responsive candidates through existing delivery gate |
| src/pages/images/fallout/[file].webp.ts | modified | Expose approved responsive candidates through existing delivery gate |
| src/pages/privacy.astro | new | Accurate EN/FR policy draft with contact-method requirement |
| tests/browser/analytics.spec.ts | modified | Choose permission explicitly for existing tracking regressions; Phase 7 mock installed after the real gate |
| tests/browser/bilingual.spec.ts | modified | Choose permission explicitly for existing tracking regressions; Phase 7 mock installed after the real gate |
| tests/browser/bougerv.spec.ts | modified | Choose permission explicitly for existing tracking regressions; Phase 7 mock installed after the real gate |
| tests/browser/conversion.spec.ts | modified | Choose permission explicitly for existing tracking regressions; Phase 7 mock installed after the real gate |
| tests/browser/fixtures.ts | modified | Explicit opt-in fixture option; default-off and Google-fallback isolation |
| tests/browser/media.spec.ts | modified | Allow valid responsive detail candidate without changing original expectations |
| tests/browser/morakniv.spec.ts | modified | Choose permission explicitly for existing tracking regressions; Phase 7 mock installed after the real gate |
| tests/browser/phase47.spec.ts | modified | Choose permission explicitly for existing tracking regressions; Phase 7 mock installed after the real gate |
| tests/browser/phase48.spec.ts | modified | Choose permission explicitly for existing tracking regressions; Phase 7 mock installed after the real gate |
| tests/browser/phase5.spec.ts | modified | Choose permission explicitly for existing tracking regressions; Phase 7 mock installed after the real gate |
| tests/browser/phase53.spec.ts | modified | Choose permission explicitly for existing tracking regressions; Phase 7 mock installed after the real gate |
| tests/browser/phase55.spec.ts | modified | Choose permission explicitly for existing tracking regressions; Phase 7 mock installed after the real gate |
| tests/browser/phase7.spec.ts | modified | Choose permission explicitly for existing tracking regressions; Phase 7 mock installed after the real gate |
| tests/browser/privacy-phase1.spec.ts | new | Runtime default/reject/grant/withdraw/storage/native navigation and EN/FR accessibility checks |
| tests/browser/responsive-phase1.spec.ts | new | Hash delivery and stable responsive decoding/source selection in Chromium/WebKit |
| tests/browser/whiteout-card-cleanup.spec.ts | modified | Choose permission explicitly for existing tracking regressions; Phase 7 mock installed after the real gate |
| tests/browser/whiteout-phase2.spec.ts | modified | Choose permission explicitly for existing tracking regressions; Phase 7 mock installed after the real gate |
| tests/browser/xtherm-temperature-warning.spec.ts | modified | Choose permission explicitly for existing tracking regressions; Phase 7 mock installed after the real gate |
| tests/privacy.test.ts | new | Parser version, malformed, expiry and future-time invariants |

## New responsive assets

All 26 are derived from thirteen unchanged approved WebPs. No original binary, product JSON, original rights manifest, release policy or dependency lockfile changed.

- assets/media/blackout/ecoflow-river-2-pro-power-station-blackout-480.webp — 24,116 bytes.
- assets/media/blackout/ecoflow-river-2-pro-power-station-blackout-960.webp — 68,756 bytes.
- assets/media/blackout/fenix-cl26r-pro-camping-lantern-blackout-480.webp — 23,296 bytes.
- assets/media/blackout/fenix-cl26r-pro-camping-lantern-blackout-960.webp — 64,410 bytes.
- assets/media/blackout/fenix-hm50r-v2-headlamp-blackout-480.webp — 43,798 bytes.
- assets/media/blackout/fenix-hm50r-v2-headlamp-blackout-960.webp — 126,440 bytes.
- assets/media/blackout/iniu-p62-20000mah-power-bank-blackout-480.webp — 26,482 bytes.
- assets/media/blackout/iniu-p62-20000mah-power-bank-blackout-960.webp — 79,758 bytes.
- assets/media/blackout/jackery-explorer-1000-v2-power-station-blackout-480.webp — 27,312 bytes.
- assets/media/blackout/jackery-explorer-1000-v2-power-station-blackout-960.webp — 72,494 bytes.
- assets/media/blackout/jackery-solarsaga-100w-air-solar-panel-blackout-480.webp — 24,488 bytes.
- assets/media/blackout/jackery-solarsaga-100w-air-solar-panel-blackout-960.webp — 96,122 bytes.
- assets/media/blackout/kidde-c3010-carbon-monoxide-alarm-blackout-480.webp — 21,104 bytes.
- assets/media/blackout/kidde-c3010-carbon-monoxide-alarm-blackout-960.webp — 58,230 bytes.
- assets/media/blackout/midland-er310-emergency-radio-blackout-480.webp — 44,072 bytes.
- assets/media/blackout/midland-er310-emergency-radio-blackout-960.webp — 133,396 bytes.
- assets/media/fallout/leatherman-wave-plus-multitool-fallout-480.webp — 32,006 bytes.
- assets/media/fallout/leatherman-wave-plus-multitool-fallout-960.webp — 95,390 bytes.
- assets/media/fallout/nanuk-904-first-aid-kit-fallout-480.webp — 51,432 bytes.
- assets/media/fallout/nanuk-904-first-aid-kit-fallout-960.webp — 159,018 bytes.
- assets/media/fallout/reliance-aqua-tainer-9410-03r-water-container-fallout-480.webp — 39,432 bytes.
- assets/media/fallout/reliance-aqua-tainer-9410-03r-water-container-fallout-960.webp — 112,546 bytes.
- assets/media/fallout/sawyer-squeeze-sp129-water-filter-fallout-480.webp — 40,098 bytes.
- assets/media/fallout/sawyer-squeeze-sp129-water-filter-fallout-960.webp — 114,328 bytes.
- assets/media/fallout/sol-emergency-bivvy-survival-shelter-fallout-480.webp — 56,618 bytes.
- assets/media/fallout/sol-emergency-bivvy-survival-shelter-fallout-960.webp — 175,034 bytes.

## Documentation and evidence

New reports: README.md, privacy-analytics-report.md, image-optimization-report.md, product-readiness-matrix.md, performance-report.md, validation-report.md, PR-SUMMARY.md and this inventory. All are under docs/phase1-hardening/. Evidence includes individual check logs, source/checkpoint hashes, exact source-change hunks, product snapshots, before/after browser metrics, candidate-selection data, anonymized Google-runtime observations, screenshots, initial failure details, corrected passing results and preservation checks. Diagnostic runner copies are under diagnostics/. The machine-readable inventory lists every retained documentation/artifact file.

Historical tracked QA screenshots were preserved; fresh replacements are retained in evidence/regression-captures/. The original six audit reports remain in the original checkout docs/audits/, outside this new worktree.

## Generated/ignored local artifacts

- dist/ and .astro/: generated production/type output; synthetic product fixtures were removed and final production output rebuilt (124 HTML pages).
- .tools/phase1/: retained baseline-dist copy, local diagnostic scripts/configurations and initial runner output. Portable diagnostic copies and review evidence are also in docs/phase1-hardening/.
- .tools/qa/: existing browser suites wrote permitted screenshots/selection diagnostics here.
- node_modules: junction to the original installed dependencies; no install or dependency update.

Generated build/cache trees and linked dependencies are not enumerated as source changes. Other worktrees and original user modifications were preserved. Final git status and direct file hashes provide independent scope evidence.
