# Bilingual implementation and review

Implemented locally on November 5, 2026. No commit, merge, push, registration or deployment was performed.

## Coverage

The production build contains **112 HTML pages: 56 English and 56 French Canadian**. Each edition includes the homepage, BLACKOUT, FALLOUT, OUTBREAK, WHITEOUT, the complete catalogue, all 47 visible product profiles, research methodology and corrections policy, affiliate disclosures and the 404 page. Shared navigation, category menus, guide text, warnings, source labels, specifications, buttons, image descriptions, accessibility labels and search metadata are translated.

The audit included repository configuration, product records, components, route generation, media policies, tracking, tests and deployment workflows. `docs/legacy/` is the archived former website and is not published by Astro. Internal development/review routes and the product template remain excluded from production; they were not promoted into public pages.

## Architecture and hosting

- English keeps all existing paths; French adds a parallel `/fr/` directory tree with the same slugs and anchors. No English URL, product destination or asset path changes.
- `src/pages/fr/[...path].astro` reuses the existing renderers and product visibility filters. `src/middleware.ts` translates the rendered French response during static generation. The production site needs no server, translation API or client translation payload.
- The reviewed phrase catalogue covers text nodes, visitor-facing attributes, SEO metadata and textual JSON-LD fields. Unknown production text fails the build, with a list of missing phrases. Generated counts and dates use explicit translation patterns. Executable scripts, styles, machine identifiers, external source destinations and affiliate tracking data are protected.
- The selector uses native details/summary and real equivalent-page links, with Canadian flags and language names. Inline vector flags avoid Windows emoji falling back to “CA”. JavaScript adds keyboard arrows/Home/End/Escape, optional preference persistence and preservation of query parameters, anchors, catalogue filters and scroll. A saved French preference follows English entry URLs through one client navigation. Explicit French URLs remain French. Without JavaScript or storage, both static editions and native page switching remain available.
- Each edition uses a self canonical and reciprocal `en-CA`, `fr-CA` and English `x-default` alternatives. French internal navigation and page references in structured data point to the French edition. OG locale/title/description/image descriptions and Twitter metadata are localized.
- `sitemap-index.xml` references `sitemap-en-0.xml` and `sitemap-fr-0.xml`. The original `sitemap.xml` index alias and `sitemap-0.xml` English alias remain available. Both languages contain the same eight indexable pages, for 16 indexable URLs. Existing noindex product restrictions are preserved; no unsafe/unapproved profile becomes indexable.
- GitHub Pages serves the root `404.html` for missing URLs. The French equivalent is the static, noindex `/fr/404/` page. No server routing rules or HTTP language negotiation are assumed.

## Translation and preservation

French uses Canadian vocabulary and French thousands separators while retaining the numerical values, brands, models, certifications, caveats and safety distinctions of the source. Linked guide paragraphs were reviewed in context. The respirator terminology was checked against [3M Canada's French 2097 documentation](https://www.3mcanada.ca/3M/fr_CA/p/dc/v000075275/); this terminology check does not change product eligibility or introduce a safety claim.

The preservation audit checks 61 original product, media, affiliate, analytics, taxonomy and safety-policy source files by SHA-256. It also compares every translated page's artwork, active/held controls, external source destinations, affiliate data attributes and inline interaction scripts against its English equivalent. French has the same 245 active affiliate controls and 131 technical-source links, with unchanged Amazon.ca destinations and the `apocalypsegear-20` tag.

GA4 remains `G-YFJJ5N9RBX`; Search Console verification remains `L1PfzJJwmxprbyNPTX3LpNLl86Ic-ivCj_JlSzI0Iwk`. Affiliate/source event code is unchanged. The GA configuration skips its automatic page view only on a document immediately leaving for the remembered French edition, preventing an extra page view on that preference navigation. French clicks retain the original product identity and destination and record the localized page path without its query or fragment.

Historical source tests continue through an exact, reviewed inverse-hunk projection in `scripts/bilingual-preservation.mjs`. It reverses only this authorized integration before older frozen comparisons; unrelated edits still fail. Original historical evidence files are retained.

## Modified files

Application and routing:

- `astro.config.mjs`
- `src/layouts/BaseLayout.astro`
- `src/components/Header.astro`
- `src/components/LanguageSelector.astro`, `src/components/CanadianFlag.astro` (new)
- `src/components/CatalogueControls.astro`
- `src/components/GoogleAnalytics.astro`
- `src/middleware.ts` (new)
- `src/pages/fr/[...path].astro` (new)
- `src/i18n/{routes,translate,client}.ts` (new)
- `src/i18n/fr-{a,b,c,extra,fixtures}.json` and `allow-{a,b,c}.json` (new)

Validation and documentation:

- `package.json`
- `scripts/verify-site.mjs`, `scripts/audit-conversion.ts`, `scripts/four-universes-preservation.mjs`
- `scripts/verify-bilingual.mjs`, `scripts/extract-i18n.ts`, `scripts/bilingual-preservation.mjs` (new)
- `tests/bilingual.test.ts`, `tests/browser/bilingual.spec.ts` (new)
- `tests/browser/analytics.spec.ts`, `tests/browser/branding.spec.ts`
- `README.md`, this report, and `docs/qa/bilingual/` preservation/results/screenshots (new)

Pre-existing untracked `check-hash.js` and `tmp/` were left in place. Temporary logs and translation inventories are under `tmp/`; local runtimes and browser fixtures remain ignored under `.tools/`.

## Validation

| Check | Result |
| --- | --- |
| Production static build | Passed; 112 pages |
| Astro / TypeScript | Passed; 0 errors, warnings or hints |
| Unit suite | Passed; 123 tests |
| Product publication / affiliate fixtures | Passed; active and disabled account states; production sources restored |
| Site, internal links, canonical, JSON-LD, robots and sitemap checks | Passed; both editions; 10,790 internal references |
| Bilingual preservation | Passed; all 112 pages, 61 protected source files, 245 French affiliate controls, 131 French source links |
| Translation inventory | Passed; zero missing visitor phrases |
| Image verification | Passed; supplied assets and responsive variants unchanged |
| Release / affiliate / product verification audits | Passed; existing decisions retained |
| Conversion, BougeRV and phase 5.5 checks | Passed |
| Chromium / responsive / accessibility suite | Passed across 192 unique cases: full run plus final 21-case bilingual/header rerun |

The first full browser run passed 188/192 cases. The four findings were resolved: mobile dropdown alignment, a no-JavaScript assertion targeting the guide heading instead of its section, and two old header-height assertions that needed to account for the responsive selector. The final bilingual/header rerun passed all 21 cases.

The browser matrix covers every HTML route at 375 and 1440 pixels. Focused keyboard and axe checks include 320, 768 and 1440 pixels, plus the original site's six-width regression coverage. Tests isolate Google/Amazon traffic with local mocks; they do not verify private Amazon account standing or live attribution.

## Review artifacts and outstanding items

The exact coverage summary is in [results.json](qa/bilingual/results.json), and the final command and browser results are recorded in [validation.json](qa/bilingual/validation.json). Screenshots are in [qa/bilingual/screenshots](qa/bilingual/screenshots), including both home editions, French BLACKOUT, a French respirator profile and the language menu at mobile and desktop widths.

The mobile specification-table readability issue identified in the final visual review is now resolved in the shared product component; see the [responsive fix and 198-case regression results](qa/bilingual/mobile-specifications/README.md). Routing, monetization and safety-preservation checks pass. Existing product verification gaps, six held buying destinations and 47 noindex informational profiles remain as before. No product verification, account approval, certification or physical-testing status was changed.

The final local preview review was completed on November 5, 2026 using Playwright and local screenshots: 16 browser tests and five focused bilingual unit tests passed, all 56 English URLs returned directly, and 32 page/viewport combinations were visually reviewed. See the [final visual review report](qa/bilingual/final-visual-review/README.md) for the original mobile table finding, its linked resolution, preservation results and screenshot evidence. No deployment, push or merge was performed.
