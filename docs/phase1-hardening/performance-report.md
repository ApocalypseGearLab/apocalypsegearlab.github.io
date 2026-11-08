# Browser and performance measurements

Measured locally on 2026-11-07 using the existing Playwright Chromium installation with explicit loopback URLs and deterministic navigation. No dependency installation, Chrome UI automation, production mutation, or deployment was required.

## Method and limits

The baseline is an immutable copy of the baseline build in `.tools/phase1/baseline-dist`; the final sample serves the completed `dist`. Both use the same simple Node static server, cold browser contexts, 1440/390 CSS-pixel viewports, height 900, DPR 1, reduced motion, unthrottled CPU/network and one sample per route/width. A PerformanceObserver records buffered LCP and CLS using the maximum layout-shift session window, excluding recent-input shifts. FCP and navigation timing supply remaining values. Observation ends one second after load/fonts; later changes are outside this window.

The final after sample ran after browser suites stopped. An earlier exploratory after sample ran alongside other validation and is retained as `after-browser-first.json`; it is not used in this table. Localhost request-to-first-byte excludes DNS/TLS and production hosting/CDN latency. Baseline GA was blocked and final default analytics is off. Browser workload, server/OS caching and single-run noise prevent causal speed claims.

These are **laboratory observations, not field Core Web Vitals**, mobile hardware, Lighthouse results or a performance guarantee. INP, CrUX/real-user percentiles, physical iPhone/Safari and production post-deployment timings are unavailable. INP needs meaningful interactions/field evidence; no substitute score is invented. WebKit browser regressions are engine emulation on Windows, not device certification.

## Observed timings

All timing values are milliseconds; CLS is unitless. B/A means baseline/final after.

| Page | Width | LCP B/A | FCP B/A | CLS B/A | Local TTFB B/A | Overflow after |
|---|---:|---:|---:|---:|---:|---|
| / | 1440 | 332.0 / 176.0 | 332.0 / 176.0 | 0 / 0 | 80.8 / 7.5 | no |
| /gear/ | 1440 | 272.0 / 204.0 | 272.0 / 204.0 | 0 / 0 | 88.1 / 1.9 | no |
| /whiteout/ | 1440 | 280.0 / 172.0 | 280.0 / 172.0 | 0 / 0 | 111.2 / 1.3 | no |
| /gear/therm-a-rest-neoair-xtherm-nxt-review/ | 1440 | 216.0 / 160.0 | 216.0 / 160.0 | 0 / 0 | 63.2 / 1.0 | no |
| / | 390 | 136.0 / 148.0 | 120.0 / 132.0 | 0 / 0 | 1.1 / 1.0 | no |
| /gear/ | 390 | 160.0 / 168.0 | 160.0 / 168.0 | 0 / 0 | 1.9 / 1.5 | no |
| /whiteout/ | 390 | 136.0 / 152.0 | 136.0 / 152.0 | 0 / 0 | 1.0 / 1.2 | no |
| /gear/therm-a-rest-neoair-xtherm-nxt-review/ | 390 | 124.0 / 156.0 | 124.0 / 156.0 | 0 / 0 | 1.0 / 1.0 | no |

Raw values, browser UA, navigation duration and selected image sources are in [baseline-browser.json](evidence/baseline-browser.json) and [after-browser.json](evidence/after-browser.json). All eight final measured viewports had zero observed CLS and no horizontal overflow within the sample window. This is not a universal zero-CLS claim. Several LCP/FCP differences are noise-sized or move in opposite directions; no CWV uplift is attributed to this patch.

## Image payload and candidate evidence

All thirteen originals total 2,592,100 bytes. The new 480 set totals 454,254 bytes (82.5% fewer), the 960 set 1,355,922 bytes (47.7% fewer). Only image-file sums are compared; below-fold lazy downloads, browser density and cache affect a real page transfer. The [image report](image-optimization-report.md) lists every asset.

The baseline catalogue selected all 13 originals at DPR1; the final catalogue selected all 13 480 variants at both 390 and 1440 CSS pixels. The [dedicated candidate evidence](evidence/responsive-candidate-selection.json) covers Chromium and WebKit at 390/1440 and DPR1/2: narrow DPR2 selected 960; the other tested combinations selected 480. Original high-resolution URLs and all new paths returned their expected hashes.

## Screenshots and browser evidence

[Baseline screenshots](evidence/baseline-screenshots/) and [final screenshots](evidence/after-screenshots/) cover the home, catalogue, WHITEOUT and XTherm profile at both representative widths. New policy screenshots are in [final bilingual keyboard captures](evidence/browser-supplement-artifacts/), with additional [consent regression captures](evidence/browser-artifacts/) and [historical-suite captures](evidence/regression-captures/). The [image contact sheet](evidence/image-framing-comparison.png) was visually inspected for all 13 assets.

The metrics screenshot captures the initial viewport before catalogue scrolling; candidate inspection occurs afterward and does not contaminate the preceding paint sample. Existing suites also check all four universes, native mobile language switching, safety notices and accessible layouts.

## Follow-up after a separately approved release

Use production URL-based Lighthouse or equivalent controlled lab samples on representative EN/FR routes, and actual iPhone/Safari interaction checks. Review field CWV only when a real dataset is available; retain sample dates, devices, network/CPU settings and enough repeats to assess variance. Compare opt-in analytics populations carefully because the measurement gate changes which visits are represented.
