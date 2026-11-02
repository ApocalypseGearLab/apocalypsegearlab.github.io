# Official ApocalypseGearLab emblem integration

Branch: `feat/official-brand-logo`, based on `00af8b6dc543619981a4646331f08688933d4c9e` (merged Phase 6.1 PR #31). The supplied emblem is the sole source. No merge or deployment is part of this task.

## Artwork and asset preparation

The actual supplied PNG is **1254 × 1254**, opaque RGB, **1,882,008 bytes**. It is copied byte for byte to `assets/brand/brand-logo-master.png`; its SHA-256 is `066aec2bf0a97d6823ed6794f02d3312e14597822af2529296c7cf1fb2563ff8`.

The black background is retained. Removing it would risk changing interior shadows, negative spaces and fine glowing boundaries. The header background matches black, allowing the full emblem to blend cleanly. No colour-keying, masks, trimming, cropping, rotation, recolouring, sharpening, regenerated artwork or invented SVG was used. Derivatives resize the complete original square canvas with Lanczos3 and lossless encoding. The master is outside `public` and is not delivered as a header image.

| Asset | Dimensions | Bytes | Delivery |
| --- | --- | ---: | --- |
| `brand-logo-master.png` | 1254 × 1254 | 1,882,008 | Preserved source in `assets/brand`, not a page download |
| `brand-logo-512.webp` | 512 × 512 | 264,740 | `/brand/brand-logo-512.webp`, Organization logo |
| `brand-logo-256.webp` | 256 × 256 | 77,666 | `/brand/brand-logo-256.webp`, high-density header candidate |
| `brand-logo-128.webp` | 128 × 128 | 22,596 | `/brand/brand-logo-128.webp`, header source/candidate |
| `brand-logo-64.webp` | 64 × 64 | 6,132 | `/brand/brand-logo-64.webp`, standard-density header candidate |
| `favicon-32.png` | 32 × 32 | 1,968 | `/favicon-32.png` |
| `favicon-16.png` | 16 × 16 | 673 | `/favicon-16.png` |
| `apple-touch-icon.png` | 180 × 180 | 43,380 | `/apple-touch-icon.png` |

Regenerate derivatives with `npm run brand:build`. The command refuses an unapproved master hash. `assets/brand/manifest.json` records all dimensions, sizes and hashes independently of existing product/media manifests. Unit tests check file hashes, dimensions and opacity, then compare every derivative's pixels against whole-canvas resampling of the approved master (a one-level pixel allowance covers platform SIMD rounding). The icon sizes were visually inspected. Tiny 16px rendering necessarily reduces fine texture; the original silhouette and colour layout remain, without a new drawing.

No web app manifest or installed-app icon requirement exists, so no PWA or unrelated icons were introduced. The old favicon SVG is unreferenced by current pages and left intact as a legacy asset; no raster-in-SVG wrapper was created.

## Header, accessibility and responsive behavior

The image appears once per header, to the left of ApocalypseGearLab: **48 CSS pixels on desktop, 38 on mobile**. Explicit square intrinsic dimensions and fixed CSS sizing reserve its geometry; `object-fit: contain` preserves proportions. A 64/128/256px `srcset` selects sufficient resolution for standard, 2x and 3x displays. The 512px version and original PNG are not header candidates.

The existing 114px desktop and 65px mobile overall header heights remain. At narrow widths, the brand text scales between 0.73rem and 0.85rem while the Menu control stays available. The existing homepage anchor has the accessible name `ApocalypseGearLab home`; the adjacent emblem has empty alt text and is hidden from the accessibility tree to avoid repetition. Keyboard focus remains visibly outlined. No runtime JavaScript or dependencies were added.

The merged desktop mega menu and mobile accordion drawer are preserved. A new immutable-base hash protects the entire navigation script and the shared category/catalogue/sector components. Browser checks cover logo rendering on eight representative routes at 320, 375, 768, 1024, 1440 and 1920px, with header geometry, no horizontal overflow, no overlap, CLS 0, menu accessibility and 44px menu targets retained by the existing navigation suite. Dedicated contexts check 2x/3x image selection.

Before/after headers at 375px and 1440px, full-page context, open navigation states and a 2x mobile capture are under `docs/qa/branding/screenshots`. The updated desktop and mobile identity was visually reviewed.

## SEO, social sharing and preservation

All pages declare the 32px and 16px PNG favicons and 180px Apple icon. Existing Organization schema on the homepage gains exactly one absolute logo URL: `https://apocalypsegearlab.github.io/brand/brand-logo-512.webp`. There remains one Organization and one WebSite object; the WebSite schema is unchanged.

The existing layout accepts optional OG images, but current generated pages have no OG fallback or page-specific OG image declarations. This integration preserves that setup instead of substituting the square logo. The before-build metadata snapshot in `docs/qa/branding/seo-before.json` protects titles, descriptions, canonical URLs, robots directives and all existing OG/Twitter metadata across the 49 pages.

The Phase 6 original product/media/affiliate/tracking regression is unchanged. The Phase 6.1 preservation baseline remains unchanged: its source comparison reverses only the exact approved favicon declarations, Organization logo property and import, then hashes every other byte as before. Tests reject unrelated edits and unexpected icon replacements. Historical layout hashes are superseded only for this narrowly checked branding integration. The conversion audit validates the exact new logo URL before comparing every original Organization field and all other schema objects. No product data, commercial policy, media manifest, GA4 handler or sector artwork was changed.

## Local performance

Lighthouse 13.5.0, separate local production builds, one run per condition with analytics blocked. Both before and after scored **100 performance / 100 accessibility / 100 best practices / 100 SEO**, with CLS 0 and TBT 0.

| Page / emulation | LCP before → after | Transferred bytes before → after |
| --- | --- | --- |
| Home / mobile | 1808.4 → 1808.3 ms | 120,128 → 144,831 |
| Home / desktop | 647.3 → 647.3 ms | 385,912 → 394,149 |
| Catalogue / mobile | 1534.1 → 1533.0 ms | 648,692 → 673,384 |

These are lab observations, not field Core Web Vitals or real-user INP. The logo adds approximately 25 KB in mobile Lighthouse's density configuration and 8 KB in desktop. Timing differences are within ordinary single-run variation. Raw measurements are in `docs/qa/branding/performance-before.json` and `performance-after.json`.

## Validation and review artifacts

`docs/qa/branding/validation.json` records the complete validation sequence. Responsive records, SEO baseline and navigation preservation hashes are stored beside it. `changed-files.txt` lists the PR files. Asset dimensions and hashes are in `assets/brand/manifest.json`.

Automated coverage uses Chromium/axe. Manual screen-reader, Safari/Firefox and installed iOS home-screen rendering checks remain outside this automated run. Favicons and Apple icon are validated as correctly sized, correctly linked HTTP image responses with exact source bytes; OS-specific icon caching is outside local preview testing. No field performance, search ranking or conversion improvement is claimed.

Final local validation: all 13 repository commands passed with exit code 0. Astro/TypeScript checked **123 files with zero diagnostics**; **108 unit tests and 148 Playwright tests passed**. The complete browser run took 6.1 minutes and includes all six responsive widths, nine dedicated branding cases, the existing navigation/axe checks, product/media safeguards and GA4 click deduplication. Production output: **49 HTML pages, 4,108 valid internal references and seven sitemap URLs**. All 41 informational profiles retain their indexability policy; 36 permitted Canadian destinations and five holds remain. Nine reviewed branding screenshots are committed. Historical Phase 6 and Phase 6.1 captures regenerated by the suite were restored. PR and GitHub Actions results are reported at delivery.
