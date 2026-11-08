# Validation report

Date: 2026-11-07 (America/Toronto). Dedicated branch: feat/phase1-production-hardening. Base and HEAD remain 2cc35df11968242c00fcc08060c18e5182dcabe0. All results below are local unless explicitly described otherwise.

## Baseline and final checks

| Check | Baseline | Final result / evidence |
|---|---|---|
| Production build | Pass, 122 pages | Pass, 124 pages: after-build.log; the product fixture test also restored and rebuilt the final 124-page production output |
| Astro / TypeScript | Pass, 162 files, zero errors/warnings/hints | Pass, 170 files, zero errors/warnings/hints: release-check-final.log |
| Unit tests | 131 passed | 133 passed, zero failed/skipped: release-test.log |
| Image integrity | Pass | Pass: after-test-images.log, including deterministic generation check for all 26 derivatives and original hash/rights controls |
| Affiliate audit | Pass | Pass: after-audit-affiliate.log; 47 active Canadian destinations, five holds |
| Product verification audit | Pass | Pass: after-audit-verification.log; 52 informational records, zero fully approved publications |
| Release policy check | Pass | Pass: after-release-check.log; existing mandatory holds and publication requirements retained |
| EN/FR site, SEO, four universes, WHITEOUT | Pass | Pass: release-test-site.log; 124 HTML pages, 12,678 internal references, 16 indexable sitemap URLs, 62 EN / 62 FR pages |
| Conversion preservation | Not repeated as a separate initial baseline command | Pass: after-test-conversion.log; historical metadata and original destinations retained, only exact responsive/privacy additions projected |
| BougeRV / Phase 5.5 regressions | Covered by baseline units | Pass: after-test-bougerv.log and after-test-phase55.log |
| Product route/approval fixture checks | Not separately run at baseline | Pass: release-test-products.log; existing test creates synthetic QA-only fixtures, checks published/pending behavior, cleans them in finally and rebuilds real production output; no fixture or site-config change remains |

Log paths in this table are under evidence/. The consolidated validation-results.json identifies the final applicable results; earlier failed attempts are retained and explained below. No dependency was installed. Existing local Node, Sharp, Playwright and browser binaries were used.

## Browser results, including resolved test failures

The requested relevant suites ran against the candidate production preview at explicit http://127.0.0.1:4321 URLs. Another existing process occupied the usual development port 4322; it was preserved. Development-only review-route browser cases were not run in this production-focused configuration. No existing process was killed or reused as an unverified server.

- **Initial broader run: 177 passed, four failed, zero skipped/flaky, 181 total.** Chromium: 96/97 passed; WebKit at each of 320/375/390: 27/28 passed. All four failures were the same newly added no-JS test using an ambiguous purchase-container anchor selector, which matched both disclosure and purchase links. The selector was corrected to a[data-affiliate-click]. The 157 non-privacy cases all passed, including bilingual routes, active/held native links, legitimate events, catalogue/category navigation, four-universe content coverage and WHITEOUT/XTherm restrictions. See browser-initial-results.json and browser.log.
- **Final privacy run: 28/28 passed, zero skipped/flaky.** Seven consent cases ran in Chromium and in WebKit at 320, 375 and 390. They cover default-off/reject, native Amazon navigation, grant/config/persistence, EN/FR withdrawal and cookie removal, invalid/expired choices, unavailable storage, cross-tab denial/clearing, no-JS and accessibility. See browser-final-results.json and browser-final.log. This run verifies the added cross-tab storage.clear handling too.
- **Supplemental run: 16 passed, eight failed, 24 total.** The four strengthened EN/FR keyboard cases passed, explicitly opening the native details control, granting and withdrawing with Enter in both languages and checking the unloaded state. Eight WebKit responsive cases initially raised EncodingError: Aborted by source change while the browser switched srcset candidates. This was a decode timing issue: no hash, geometry or source-membership assertion failed. See browser-supplement-results.json. The test now polls for a stable, successfully decoded currentSrc, as the repository's existing hero test already does.
- **Final dedicated responsive run: 10/10 passed, zero skipped/flaky.** Five cases in each of Chromium and WebKit: all 39 original/derivative HTTP hashes and all 13 cards at 390/1440 with DPR1/2. See responsive-browser-results.json and responsive-candidate-selection.json. Every image, geometry, srcset and decode assertion remains in place.
- **Existing focused media regressions: 3/3 passed.** Supplied image/hash/alt delivery, responsive hero/reduced motion and BLACKOUT cards/detail across six widths. See media-browser-results.json. The detail source expectation now permits the appropriate 960 candidate while preserving original src, dimensions and caption expectations.

These groups overlap; their totals must not be added into a fictional single clean suite. All initially failed checks have passing targeted replacements. The full historical development-server suite was not rerun. A physical iPhone/Safari was not used; these WebKit results are engine/device emulation on Windows.

Tracking-focused legacy files explicitly seed a valid saved permission through an opt-in fixture option. The default fixture does not grant consent. Separate privacy tests exercise real UI choices and default-off behavior. Automated regression Google traffic is blocked, including fallback hosts; native retailer destinations are locally simulated. Automated axe checks use WCAG 2 A/AA and 2.1 AA tags; passing them does not certify full accessibility.

## Actual Google runtime check

consent-google-runtime.json records zero Google requests and zero GA cookies before permission; one loader and two approximately 180-day GA cookies after UI opt-in; permitted page_view, scroll and affiliate_click attempts; no further external attempts or GA cookies in the observed withdrawal/reload window. Actual Google scripts were allowed, but collection, fallback and retailer requests were blocked. No private GA4 report or successful collection delivery is claimed. The baseline probe missed a www.google.com fallback; its limitation is explicitly recorded in the privacy report and corrected baseline evidence note.

## Preservation and final state

preservation-results.json compares 2,537 checkpoint files in original worktrees with no differences, and 230 protected Phase 1 product/policy/original-artwork files with no differences. Product JSON, original imported rights manifest, original artwork, release/affiliate safety policies, dependency versions, product robots restrictions and product sitemap exclusions are preserved.

Historical browser suites wrote fresh screenshots to tracked QA paths. Their new captures were copied under evidence/regression-captures/ and those historical paths restored byte-for-byte from a baseline-hash-verified unchanged worktree copy. No original-worktree changes were discarded. Source-preservation projections reverse only reviewed exact hunks listed in source-changes.json, and normalize only the exact 13 new srcsets; all other snapshot assertions remain.

Source changes and permitted artifacts are listed in changed-file-inventory.md and evidence/changed-file-inventory.json. No file is staged, no commit was created, and nothing was pushed, submitted as a PR, merged or deployed. Other worktrees and the original cinematic branch remain in place.

## Remaining limits and publication requirement

The private privacy-request contact method is unresolved and must be designated and approved before publication. Both privacy pages are local noindex drafts. Operator/jurisdiction and GA4 account retention/access need owner review. Field CWV, Lighthouse, private analytics ingestion and real-device Safari remain unverified. See performance-report.md for exact local laboratory observations and PR-SUMMARY.md for deployment risks.

## Re-running focused checks

Portable diagnostic copies are retained under `diagnostics/`. From the worktree root with the existing dependencies/browser binaries available:

```powershell
npx --no-install playwright test --config docs/phase1-hardening/diagnostics/privacy-regression.config.mjs privacy-phase1
npx --no-install playwright test --config docs/phase1-hardening/diagnostics/responsive-regression.config.mjs
npx --no-install playwright test --config docs/phase1-hardening/diagnostics/media-regression.config.mjs
```

These configs use a dedicated production preview and refuse to reuse an existing server. Their diagnostic paths are local; this is not a deployment command. Standard project checks remain available through package.json. Browser runtime scripts require the built dist; the baseline runner requires the retained baseline-dist artifact described in the performance report.

Final direct artifact checks in [final-invariants.json](evidence/final-invariants.json) also confirm byte-identical robots.txt and all five sitemap files against the baseline, 104/104 unchanged product noindex directives, no synthetic product source or output pages, and restored site configuration after the fixture test. Final git diff whitespace checks passed; the index is empty. The retained diagnostic privacy configuration lists all 28 expected cases successfully.
