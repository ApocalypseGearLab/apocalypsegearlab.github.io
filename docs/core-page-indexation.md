The catalogue indexation fix starts from main `beeb6e8219b59bfc7dd99292060cb301f81f608e`, after the owner merged PR #25. It changes catalogue-level editorial readiness without changing any individual product, affiliate decision, safety rule, image, tracking code or global layout robots default. The branch is `fix/core-page-seo-indexation`.

The original predicate `products.some(isCommerciallyApproved)` returned false because all 36 current profiles are informational drafts. That incorrectly emitted `noindex, nofollow` for the useful directory as a whole. A read-only HTTP inspection also confirmed the public `/gear/` page returned 200 with that meta tag, a correct canonical, no X-Robots-Tag header and no sitemap entry. The four other core pages returned 200, self-canonicals and no indexing restrictions. This audit did not access private Search Console data; the owner's Search Console observation is consistent with the publicly retrieved HTML.

**Scope and editorial assessment**

The catalogue provides an equipment directory with 36 substantive profiles, original summaries and links to the three editorial sectors. Its page-level usefulness does not depend on a merchant link or a fully approved product. The revised introduction explains choosing equipment around interrupted services, storage and maintenance. A compact sector navigation links BLACKOUT, FALLOUT and OUTBREAK. A lower-page guide explains specification units and limits, compatible configurations, Canadian variants, package contents, documentary sources and the distinction between a profile, buying link and physical product test. It makes no invented testing, certification, approval, price or availability claims. The detailed guidance follows the cards so it does not displace the entire directory on mobile.

`src/lib/category-seo.ts` records the reviewed catalogue's own editorial readiness and exposes a gate that takes only editorial readiness and preview status. An unready category or any preview remains noindex. The production catalogue no longer imports or calls `isCommerciallyApproved` to decide its robots directive. Existing public hubs already use their own curated page content and preview gate, independent of product approval; their rendering source is unchanged.

Individual profile publication still uses the unchanged product release policy. All 36 current draft profiles retain `noindex, nofollow`; no draft is added to the sitemap. The 31 recorded Canadian affiliate permissions and five product holds are unchanged. The catalogue can be indexed without asserting that these products are tested, endorsed, safe for every application or commercially approved. All product JSON, original images and WebPs, GA4 configuration/tracking, Amazon account switches and mandatory holds are hash-protected against the pre-change source baseline.

**Exact production directives**

All URLs below use `https://apocalypsegearlab.github.io`. Each core page's canonical equals its absolute URL, including the trailing slash. “Absent” means no robots or Googlebot meta tag is emitted; indexing and following are unrestricted by those tags, rather than an explicit `index, follow` meta element.

| Exact page | Before robots meta | Corrected production robots meta | In corrected sitemap |
|---|---|---|---|
| `https://apocalypsegearlab.github.io/` | Absent | Absent | Yes |
| `https://apocalypsegearlab.github.io/gear/` | `noindex, nofollow` | Absent | Yes — newly included |
| `https://apocalypsegearlab.github.io/blackout/` | Absent | Absent | Yes |
| `https://apocalypsegearlab.github.io/fallout/` | Absent | Absent | Yes |
| `https://apocalypsegearlab.github.io/outbreak/` | Absent | Absent | Yes |

The sitemap contains these five pages plus `/affiliate-disclosure/`: six URLs total. No product profile is newly indexed. `/404.html` remains `noindex, nofollow` and excluded. Development-only `/review/gear/`, hub previews and product previews keep `noindex, nofollow`; the catalogue preview keeps `/gear/` as its public canonical. The template remains unavailable in production. `robots.txt` is unchanged: `User-agent: *`, `Allow: /`, and the absolute `sitemap-index.xml` reference. The legacy `/sitemap.xml` alias still matches the sitemap index.

The existing sitemap integration reads each generated page's robots meta, so fixing `/gear/` automatically adds only that URL. No global robots change, manual product inclusion or fabricated Product/Offer/price/availability/rating schema is introduced. Header navigation to all five core pages and the catalogue's sector links are verified. Existing images, canonicals, titles, H1s, source-reference sets and navigation remain compared to the historical conversion baseline; only the intended catalogue robots/description change and sole new sitemap location are allowed.

**Regression checks and evidence**

- Readiness truth-table checks keep unready categories and all previews restricted.
- A unit regression proves all 36 current profiles lack full commercial approval while the reviewed catalogue can be indexed. A renderer check rejects reintroduction of the old commercial predicate.
- Production `test:site` now requires each core page to have an unrestricted robots state, its self-canonical, sitemap entry, complete primary navigation and no Product/Offer schema. Existing product-specific assertions retain draft and affiliate safeguards.
- Playwright checks the actual five pages and HTTP headers, sitemap XML, draft restrictions, catalogue preview, six responsive widths and keyboard sector navigation. Existing GA4, image, product and affiliate suites also run.
- Old historical baselines remain immutable. Narrow snapshot exceptions allow the catalogue edit and added site assertions; a new pre-change hash baseline protects every other source file, product and asset.

Machine-readable records: [before build and protected hashes](qa/core-indexation/before.json), [read-only public HTTP audit](qa/core-indexation/public-before.json), [corrected generated pages](qa/core-indexation/after.json), [conversion audit summary](qa/core-indexation/conversion-audit.json) and [validation results](qa/core-indexation/validation.json). Mobile and desktop screenshots are stored beside these records after browser validation. The delivery message and PR checks provide the actual CI status; it is not assumed in advance.

Local validation passed: Astro check (92 files; zero errors, warnings or hints), 81 unit tests, media validation, release check, affiliate audit, product-schema/active-pending fixture builds, production build, site validation and conversion audit. The final production output has 43 HTML pages, 1,704 internal references and six sitemap URLs. All **102 Playwright tests passed**, including the two new category SEO tests, existing image/GA4/affiliate regressions and responsive accessibility audits. The catalogue produced zero automated axe violations at 320, 375, 768, 1024, 1440 and 1920 px. This is automated Chromium validation, not a claim of complete WCAG certification or observed Google indexing.

The [phone screenshot](qa/core-indexation/catalogue-375.webp) and [desktop screenshot](qa/core-indexation/catalogue-1440.webp) were visually inspected. The [exact changed-file inventory](qa/core-indexation/changed-files.txt) contains 20 files: two catalogue implementation files, validation/regression changes and focused documentation/QA artifacts. No product data, affiliate policy, GA4 implementation, media asset, BaseLayout, hub source, robots generator or Astro sitemap configuration was changed.

**After owner review**

Merge and deploy only with the owner's authorization. After the corrected HTML is public, use Search Console URL Inspection on `/gear/` to confirm Google can retrieve the new robots state and request indexing; resubmit or revisit the sitemap as appropriate. This PR removes the site's technical noindex restriction, but does not itself demonstrate Google has recrawled or indexed the page. [Google's robots documentation](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag) describes unrestricted default indexing when no restriction is specified. [Google's sitemap documentation](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview) explains that discovery and sitemap inclusion do not guarantee indexing.

No merge, deployment, Search Console submission or GA4 administration change is performed by this fix.
