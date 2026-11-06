# Responsive product specification fix

The mobile label-wrapping finding from the [final bilingual visual review](../final-visual-review/README.md) is resolved. The shared ProductProfile component now stacks each label above its value through 575 px. Between 576 and 800 px, fixed table columns keep labels from being squeezed by long values. Layout above 800 px is unchanged. Existing typography, colours, backgrounds, borders and source citations are retained. Explicit table, rowgroup, row, rowheader and cell roles preserve accessibility when CSS changes the visual table layout.

No product specifications, translations, safety text, URLs, tracking or SEO metadata changed. A before/after comparison of all 112 generated pages confirms identical visitor text, specifications, metadata, anchor destinations/affiliate attributes, images, scripts and buying holds, excluding rebuilt CSS asset names and generated CSS scope attributes. The 61 protected original sources also remain unchanged.

## Regression coverage

The new browser test was first run against the old build and reproduced split words in the English 3M 2097 labels at 375 px. It now passes for both languages at 320, 375 and 768 px across four profiles: 3M 2097, Therm-a-Rest NeoAir XTherm NXT, Kidde C3010 and the Amazon-only BougeRV 53-quart profile. These 24 page/viewport combinations verify whole label words, cell fit, full-width stacked rows on phones, stable tablet columns, no page overflow, and accessible table semantics. Focused axe checks cover the 2097 table in each language/width.

## Validation

| Check | Result |
| --- | --- |
| Production build | Passed; 112 pages |
| Astro / TypeScript | 0 errors, warnings or hints |
| Complete unit suite | 123 passed |
| Complete Chromium browser suite | 198 passed; 0 failed, skipped or flaky |
| Site and bilingual checks | Passed; 112 pages, 10,790 internal references, 16 sitemap URLs |
| Affiliate and product verification audits | Passed; existing active/held and safety decisions retained |
| Generated-content preservation | Passed across all 112 pages |

The complete browser run includes the six new responsive cases, all-route bilingual rendering at 375 and 1440 px, language persistence, keyboard/accessibility checks, analytics/affiliate events, and the existing multi-width regressions. Historical QA screenshots were restored after the full suite; fresh evidence for this fix is kept here. The exact two layout/semantic source hunks were added to the existing preservation manifest so earlier immutable source baselines continue to protect all unrelated content.

## Screenshots

| Width | English | French |
| --- | --- | --- |
| 320 px | [2097](2097-en-320.png) | [2097](2097-fr-320.png) |
| 375 px | [2097](2097-en-375.png) | [2097](2097-fr-375.png) |
| 768 px | [2097](2097-en-768.png) | [2097](2097-fr-768.png) |

The six table screenshots were visually inspected. Labels and values are readable in both languages, with no fragmented label words or clipped values. The sticky page header is hidden only while capturing the isolated table so it does not obscure the evidence.

## Files and remaining issues

Application: `src/components/ProductProfile.astro`. Regression test: `tests/browser/product-specifications.spec.ts`. Preservation record: `docs/qa/bilingual/source-changes.json`. Review documentation and evidence: this directory, the implementation report and the linked original visual review. Temporary local configuration, backup and comparison helpers are under `tmp/`.

No remaining layout issue was found in this review. Existing product verification gaps, six held destinations and safety restrictions are unchanged. Google and Amazon requests are isolated during browser QA; live attribution and account standing are outside this local check. No deployment, push or merge was performed.

See [results.json](results.json), [browser-results.json](browser-results.json), [content-preservation.json](content-preservation.json) and [test-evidence](test-evidence/) for details.
