# Phase 6.1 navigation implementation and QA

Base: `967d8f83087a03f6554df8a43fb373439cb9e671` (merged PR #30).
Branch: `feat/phase6-1-steam-mega-menu`.

## Navigation and category architecture

The header retains the original brand mark and adds Home, All gear, Blackout, Fallout, Outbreak and Guides. Guides points to the existing research methodology. The desktop equipment panel has three sector columns and a Discover column containing existing research and planning guides. Graphite surfaces, thin separators, numbered sector headings, restrained amber/red/green accents and small transform/opacity transitions form the visual treatment. No dependencies, promotional images or new page routes were added.

`src/lib/category-navigation.ts` derives populated categories, counts and stable destinations from the schema taxonomy and existing `isPubliclyVisible` policy. The same result drives the header, catalogue category controls/directory, and sector category navigation. Existing taxonomy helpers remain authoritative for card/profile category labels. There are **25 categories: 9 BLACKOUT, 8 FALLOUT, 8 OUTBREAK**. All 41 deliberately public informational profiles contribute; internal drafts and templates do not. Commercial approval and affiliate holds are unchanged. A unit fixture demonstrates that a newly populated established category appears automatically only when the product becomes public.

No dedicated category pages or existing category hub sections exist. Links therefore use `/gear/#category-{id}`, targeting the first real profile in that category. Without JavaScript, all profiles and native anchor targets remain available. With JavaScript, initial hashes, hash changes and same-page navigation apply the category filter and clear conflicting search/sector values. Reset still restores all profiles. Catalogue canonicals remain `/gear/`; no filter query combinations or sitemap entries are generated.

## Interaction and accessibility

Desktop All gear hover/focus opens the four-column overlay without changing main-content geometry. Its link still navigates to `/gear/`. A separate disclosure button and Arrow Down provide keyboard entry into the panel. Escape closes and restores focus to the disclosure; focus leave, outside pointer clicks and delayed pointer leave close it. The panel touches the trigger row, with a 160 ms grace period to cross into it, and scrolls inside the viewport if necessary.

Below 1024px, the header becomes a Menu disclosure and an independently scrollable drawer: Home/All gear shortcuts, sector hub links with separate accordion buttons, and Discover guides. The desktop and mobile patterns share a single category DOM list. The drawer focuses Home when opened, restores focus on Escape/toggle close, closes when focus leaves without trapping Tab, and restores the previous body overflow value on close or breakpoint change. All mobile navigation controls/category links meet 44px target height. Global reduced-motion handling disables transitions and animations. Without JavaScript the navigation remains expanded in normal document flow, with no unavailable disclosure controls.

Open-menu axe audits cover 320, 375, 768, 1024, 1440 and 1920px. Other existing page-level axe audits remain in the full suite. Tests cover pointer traversal, keyboard entry/exit, outside clicks, mobile accordion collapse/expansion, actual small-screen scrolling, resize cleanup, filter loading/reset and no-JavaScript navigation. Eight screenshots in `docs/qa/phase6-1/screenshots` capture the desktop panel and each sector hover, plus the mobile drawer and each expanded sector. Screenshots were visually reviewed; review caught and corrected a mobile selector specificity problem before the final suite.

## Preservation and regression coverage

The original Phase 6 product/media/affiliate/tracking byte regression, including its narrowly scoped CSV newline handling, is unchanged. A new 16-file preservation baseline is hashed from immutable merged-main Git blobs, protecting the Phase 6 homepage, all 22 editorial hub sections, product cards/profiles, methodology, contextual linking, taxonomy/configuration, layout, styles, schema/indexability helpers and robots generation. Text checkout CRLF is canonicalized under `.gitattributes`; content, encoding and BOM changes still differ.

Historical header presentation snapshots are intentionally superseded for the authorized new header. The production conversion audit now checks every generated header against the complete source-derived category list, verifies all unique category anchor targets and product counts, retains previous major destinations and requires unique primary links. Other exact comparisons for product metadata, images, canonical/robots rules, documentary URLs and footer remain active. The old core-navigation browser assertion now scopes uniqueness to the primary row because sector column headings also link to their hubs.

The production site remains 49 HTML pages with seven sitemap URLs and 41 restricted informational profiles. Link validation covers 3,961 internal references. Affiliate validation retains 36 permitted Canadian destinations, five holds, the existing tag and 215 commercial CTA placements. Existing GA4 behavior and event deduplication are tested by the unchanged regression suite.

## Local Lighthouse before/after

Lighthouse 13.5.0, local production previews, one run per condition, analytics requests blocked. Baseline and final builds were measured separately. All three conditions scored **100 performance / 100 accessibility / 100 best practices / 100 SEO** both before and after. Timing differences are within ordinary single-run variation.

| Page / emulation | LCP before → after | CLS before → after | TBT before → after | Bytes before → after |
| --- | --- | --- | --- | --- |
| Home / mobile | 1812.5 → 1809.1 ms | 0 → 0 | 0 → 0 ms | 116,583 → 120,128 |
| Home / desktop | 647.0 → 647.5 ms | 0 → 0 | 0 → 0 ms | 382,367 → 385,912 |
| Catalogue / mobile | 1533.8 → 1534.0 ms | 0 → 0 | 0 → 0 ms | 645,203 → 648,692 |

Raw measurements: `docs/qa/phase6-1/performance-before.json` and `performance-after.json`.

These observations do not establish field Core Web Vitals, INP, search rankings or conversion changes. Automated Chromium/axe coverage does not replace manual screen-reader testing or Safari/Firefox device testing. No merge or deployment is part of this phase.

## Validation artifacts

`docs/qa/phase6-1/validation.json` records the complete command sequence and exit codes. `navigation.json` records all populated categories and destinations. `preservation.json` records immutable-base hashes. `changed-files.txt` lists every PR file. The final PR and CI status are reported with delivery.

Final local validation: **117 files checked with zero errors/warnings/hints; 103 unit tests passed; 139 Playwright tests passed (6.0 minutes)**. All 13 commands completed with exit code 0: `check`, `test`, `test:images`, `release:check`, `audit:affiliate`, `audit:verification`, `test:products`, `build`, `test:site`, `test:conversion`, `test:bougerv`, `test:phase55`, `test:browser`. The full suite includes the existing GA4 mouse/keyboard click deduplication checks and all Phase 6 responsive axe audits in addition to the six new open-navigation audits. Build output is 49 pages; 3,961 internal references and seven sitemap URLs validate. The historical Phase 6 captures regenerated during this run were restored; the eight reviewed Phase 6.1 captures are committed separately.
