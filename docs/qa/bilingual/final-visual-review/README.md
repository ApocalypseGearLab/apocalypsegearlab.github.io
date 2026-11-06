# Final bilingual visual review

Reviewed locally on November 5, 2026 with `npm run preview` at `http://127.0.0.1:4321/`. Existing Playwright tests and local PNG screenshots were used. The interrupted Chrome Computer Use method was not retried. No deployment, push or merge was performed. No application source was changed during this review.

## Coverage and result

Visual inspection covered English and French at 1440 × 900 and 375 × 900: the homepage; BLACKOUT, FALLOUT, OUTBREAK and WHITEOUT; and three product profiles (3M 2097 filters, Kidde C3010 and Therm-a-Rest NeoAir XTherm NXT). This is 32 page/viewport combinations, with 114 original screenshots and 24 inspected English/French contact sheets. Product captures include buying controls, specifications and safety notes. Home captures include the selector, mobile navigation, content and footer; universe captures include the guide and equipment sections.

| Area | Result |
| --- | --- |
| Homepage and four universes | Artwork, accent colours and cinematic layout preserved; longer French text fits without overlap or horizontal page overflow. |
| Desktop/mobile language selector | Both Canadian flags and labels render; menu fits the viewport, targets are at least 44 px high, and selected/focus states are visible. |
| Switching and persistence | Existing tests pass for current page, query/filter state, fragment, scroll position and stored language; blocked storage and disabled JavaScript cases also pass. |
| Mobile navigation and footer | English and French labels fit and navigation exposes all four universes. |
| Product buying and safety | Active 2097 control and adjacent disclosure preserved; Kidde and XTherm controls remain disabled. Safety caveats and noindex state retained. |
| Product specification tables | The original mobile readability finding is now [resolved](../mobile-specifications/README.md); original evidence remains below. Desktop tables are readable. |

## Finding: mobile specification label width

**Resolved after this review:** the [shared responsive specification fix](../mobile-specifications/README.md) stacks phone rows and stabilizes tablet columns. The text below and screenshots retain the original finding for comparison.

At 375 px, the 3M 2097 table gives the label column too little width, splitting labels into short fragments across many lines in both languages. The values remain visible and the page does not overflow. Some awkward label breaks also occur on the Therm-a-Rest mobile table. This existing table layout affects English as well as French; the review did not change it.

Evidence: [English 2097 specifications](product-2097-en-375-specifications.png), [French 2097 specifications](product-2097-fr-375-specifications.png), [side-by-side contact sheet](contact-sheets/specifications-375-1.png).

Recommended follow-up: give the label column a useful minimum width or stack specification rows on small screens, keeping the specification and warning text intact. This was an open readability finding at the time of the original review; it does not disable buying restrictions or change technical values.

## Fresh automated checks

| Check | Result |
| --- | --- |
| Existing bilingual + analytics Playwright tests | 16 passed, 0 failed (31.1 s). |
| All bilingual routes | 112 HTML routes render at both 375 and 1440 px without page overflow. |
| Keyboard and accessibility checks | Passed at 320, 768 and 1440 px, including selector keyboard behavior. |
| Site, SEO and internal-link verification | Passed: 112 pages, 10,790 internal references, 16 indexable sitemap URLs; canonical, hreflang, robots and JSON-LD checks retained. |
| Affiliate audit | Passed; original destinations and product decisions retained. |
| Product verification audit | Passed; existing verification and safety statuses retained. |
| Focused bilingual unit tests | 5 passed, including numeric specification and warning quantity fidelity. |
| Fresh screenshot session | 0 page errors; 0 failed local resources. |

The production build, complete unit suite and Astro checks were run earlier in the implementation review; their results remain in [the implementation report](../../../bilingual-implementation.md). This final pass exercised the existing production preview and did not rebuild or change application code.

## URL, affiliate, analytics and safety preservation

All 56 existing English output URLs returned HTTP 200 directly from the local preview, without redirects. All 61 protected original product, media, affiliate, analytics, taxonomy and safety-policy source files passed preservation checks. Each language retains 245 affiliate controls and 131 technical-source links. Amazon.ca destinations and the `apocalypsegear-20` tag are unchanged. There are still 41 active product destinations, six held destinations and 47 noindex informational product profiles.

The existing GA4 event tests, single configuration check and Search Console verification check pass. Mocked affiliate clicks retain the original event, product identity and destination; held controls emit no affiliate events. No product details, warnings, certification claims or verification decisions were changed. Existing incomplete verification and safety reviews remain pending.

External Google/Amazon traffic was mocked or blocked during local testing and capture. These results verify the local link/event implementation and preserved restrictions; they do not establish live retailer attribution or Amazon account standing.

## Evidence

- [Machine-readable review summary](review-summary.json)
- [Capture, route and resource results](capture-results.json)
- [Contact-sheet index](contact-sheets/index.json)
- [Fresh Playwright results](test-evidence/browser-results.json)
- [Site verification log](test-evidence/site.log)
- [Affiliate audit log](test-evidence/affiliate.log)
- [Verification audit log](test-evidence/verification.log)
- [Bilingual unit test log](test-evidence/unit.log)

This final review adds documentation, screenshot evidence and temporary test/capture helpers only. The implementation remains local for review.
