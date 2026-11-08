# Responsive image measurements

Measured 2026-11-07 from the exact 13 single-candidate assets identified by the master audit (`C:/Users/1995/Downloads/apocalypsegearlab-phase1-revise/apocalypsegearlab/docs/audits/evidence/catalogue-image-bytes.json`). The audit files remain in place in the original checkout.

The new sidecar `src/data/media/responsive-imported-manifest.json` records dimensions, paths, byte sizes and SHA-256 values. Original 1254 × 1254 WebPs, supplied masters, original rights manifest and descriptive EN/FR alt text remain unchanged. Each image now has 480, 960 and original 1254 width candidates. `deliveredMedia` adds only derived delivery metadata; original records and product identity stay intact.

| Product | Original 1254 bytes | New 480 bytes | New 960 bytes | 480 reduction | 960 reduction |
|---|---:|---:|---:|---:|---:|
| ecoflow-river-2-pro | 131,338 | 24,116 | 68,756 | 81.6% | 47.6% |
| fenix-hm50r-v2-headlamp | 237,356 | 43,798 | 126,440 | 81.5% | 46.7% |
| fenix-cl26r-pro | 120,578 | 23,296 | 64,410 | 80.7% | 46.6% |
| jackery-explorer-1000-v2 | 135,916 | 27,312 | 72,494 | 79.9% | 46.7% |
| kidde-c3010-co-alarm | 118,340 | 21,104 | 58,230 | 82.2% | 50.8% |
| leatherman-wave-plus-multitool | 176,614 | 32,006 | 95,390 | 81.9% | 46.0% |
| iniu-p62-20000mah-65w | 169,576 | 26,482 | 79,758 | 84.4% | 53.0% |
| jackery-solarsaga-100w-air | 205,778 | 24,488 | 96,122 | 88.1% | 53.3% |
| midland-er310 | 249,316 | 44,072 | 133,396 | 82.3% | 46.5% |
| nanuk-904-first-aid-kit | 313,204 | 51,432 | 159,018 | 83.6% | 49.2% |
| sawyer-squeeze-sp129-water-filter | 214,632 | 40,098 | 114,328 | 81.3% | 46.7% |
| reliance-aqua-tainer-7-gallon | 204,054 | 39,432 | 112,546 | 80.7% | 44.8% |
| sol-emergency-bivvy | 315,398 | 56,618 | 175,034 | 82.0% | 44.5% |
| **Total** | **2,592,100** | **454,254** | **1,355,922** | **82.5%** | **47.7%** |

This saves 2,137,846 bytes when all 13 use 480 candidates, or 1,236,178 bytes when they use 960 candidates. These are sums of those image files, not total-page transfer savings or a Core Web Vitals prediction. Keeping both new variants adds 1,810,176 bytes to build storage while reducing appropriate client transfers.

The Reliance manifest ID is `reliance-aqua-tainer-7-gallon-water-container-fallout`; its approved filename uses `9410-03r`. The generator uses explicit IDs, never a filename-derived product substitution.

## Reproducibility and integrity

Run `node scripts/build-responsive-imported-media.mjs --check` or `npm run test:images`. Generation without `--check` uses the already installed Sharp pipeline, WebP quality 83 / effort 6, proportional resize, no crop/recolour/enlargement. New derivative paths are guarded against unexpected replacement. The existing `canPublishImportedAsset` gate controls both new routes and originals; no artwork permission or product-link permission is created by resizing.

Existing `ProductImage.astro` keeps explicit dimensions, square containment, lazy card loading and its established sizes expression. Detail `src` remains the original; browsers may select a smaller detail candidate according to rendered width/DPR.

## Browser selection and visual review

The local before/after catalogue capture at 390 and 1440 CSS pixels, DPR 1, decoded and scrolled every card. All 13 previously selected the original; all 13 now selected their 480 variant. Exact rendered widths, srcsets and currentSrc are in [baseline-browser.json](evidence/baseline-browser.json) and [after-browser.json](evidence/after-browser.json). Focused tests additionally cover 390/1440 at DPR 1/2, all 39 delivered original/derivative hashes, square geometry and source membership. Browser selection is browser-managed; a candidate larger than CSS width is expected for high DPR.

The [three-column contact sheet](evidence/image-framing-comparison.png) was visually inspected for all 13 assets: original, 480 and 960 at equal display size. Framing, identity, labels and cinematic colour treatment remain consistent at card size; resizing introduces expected lossy detail differences. [Pixel diagnostics](evidence/image-quality-diagnostics.json) compare decoded 480 images with a matching original resize; these are supplementary measurements, not a visual-quality certification. Original high-resolution artwork remains available.

No measured field CWV, Lighthouse score or universal speed improvement is claimed. See [performance report](performance-report.md).

Both Chromium and WebKit selected the same candidates in the final dedicated image run: 390/DPR1 → 480; 390/DPR2 → 960; 1440/DPR1 → 480; 1440/DPR2 → 480, for all 13 cards. See [responsive-candidate-selection.json](evidence/responsive-candidate-selection.json). WebKit can abort an in-flight decode while selecting a new srcset candidate; the test waits for a stable successfully decoded source rather than treating that normal transition as a broken image. All hash, geometry and membership checks remain.
