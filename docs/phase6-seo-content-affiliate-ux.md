# Phase 6: SEO, content hubs and affiliate UX

Maintained November 1, 2026. Base: `520d61a3b48d67ca01623eebcf4784275097dc56` (main, merge of PR #29). This change is for review; it does not merge or deploy the site.

## Baseline and architecture

The checkout was clean on the ORIA/eneloop branch. Remote main was fetched before creating `feat/phase6-seo-content-affiliate-ux`. No open pull requests existed at audit time. Recent power-station, account/status, BougeRV and ORIA/eneloop work was already merged through PRs #26–29; no unmerged product work was assumed to be production content. See the [base commit](https://github.com/ApocalypseGearLab/apocalypsegearlab.github.io/commit/520d61a3b48d67ca01623eebcf4784275097dc56).

This is an Astro 7 static site. JSON product records pass a shared content schema; taxonomy determines the sector. Shared catalogue, hub, card, profile and base-layout components produce the HTML. Release policy controls informational visibility and editorial publication; the affiliate library separately generates Canadian Special Links. Original/reviewed image manifests control responsive WebP delivery. GA4 uses a shared delegated event handler. Deployment is a separate, manually confirmed main-branch workflow.

Before implementation, 96 unit tests passed, the production build generated 48 pages, and 116 Playwright tests passed. The initial restricted-process attempt failed with Windows EPERM; rerunning with child-process permission passed. This was an execution-environment failure, not a source defect. All 46 public core/product URLs were fetched: their deployed HTML matched the baseline build byte for byte. The [baseline evidence](qa/phase6/baseline.json) records titles, robots, canonicals, product/card counts and preservation hashes.

The existing core indexing fix was already present. Home, catalogue, all three hubs and disclosure were already indexable, self-canonical and present in the six-URL sitemap. All 41 product profiles were informational drafts with `noindex, nofollow`; none met full editorial release requirements. The template and review previews were excluded from production. These correct safeguards were preserved. No previous deployment defect was presumed to remain.

Actual gaps: the unfiltered 41-card catalogue was difficult to scan; hubs supplied only brief planning notes; no dedicated methodology/corrections page existed; cards lacked an explicit details path for eligible products and a general limitation for products without a special safety caution. Core collections lacked descriptive ItemList/BreadcrumbList data. Existing tests already covered most media, affiliate, sitemap, accessibility and responsive behavior, but lacked filter interaction and homepage-reachability checks.

## SEO policy and decisions

| Page group | Decision | Reason and guard |
| --- | --- | --- |
| `/` | Keep indexable | Original positioning, sector navigation, methodology link, unchanged WebSite/Organization identity and self-canonical. |
| `/gear/` | Keep indexable | Original selection guidance, complete crawlable directory, category jumps and progressively enhanced discovery; independent catalogue editorial-readiness flag. |
| `/blackout/` | Keep indexable | Eight original planning sections, explicit runtime assumptions, safety references and relevant existing profiles. |
| `/fallout/` | Keep indexable | Seven household-readiness sections, supply checklist and conservative water/radiation limits. |
| `/outbreak/` | Keep indexable | Seven evacuation sections with carry, fit, subscription and respiratory limits, and explicit fiction separation. |
| `/how-we-research/` | Newly indexable | Substantive method, evidence limits, affiliate explanation and correction process; linked from home, footer, catalogue, hubs and profiles. |
| `/affiliate-disclosure/` | Keep indexable | Existing disclosure and owner-declared account status preserved. |
| All 41 `/gear/{slug}/` profiles | Keep noindex | No profile meets all existing listing, safety and editorial release safeguards; link availability cannot promote a draft. |
| Template, review previews, 404 | Keep excluded | Template/previews stay outside production; error page stays noindex. |

Readiness for the three hubs is explicitly recorded independently in `category-seo.ts`; previews always remain noindex. The generated sitemap continues to derive eligibility from actual rendered robots directives. The legacy `/sitemap.xml` alias, sitemap index, canonical host and trailing-slash policy remain intact. The only added sitemap URL is methodology: seven URLs total. Technical eligibility is not evidence that Google has indexed a URL.

Potential later product-indexing candidates are the EcoFlow DELTA 2, Jackery Explorer 1000 v2 and Reliance Aqua-Tainer profiles. Their documentary content and practical use cases make them reasonable first editorial reviews. This is a prioritization recommendation, not an approval: current offer identity, product-specific safety review, remaining blockers and explicit editorial publication must be resolved first. No record or indexing flag was changed for them. Retain noindex for every other profile until its own review is complete.

## Content and discovery changes

BLACKOUT now covers preparation before an outage, power-station selection, Wh versus W, runtime calculation, lighting/charging priorities, refrigeration, battery/charger compatibility and electrical safety. Its example assumes 1,000 Wh nominal energy, an explicitly hypothetical 80% usable fraction and a 40 W average load: 800 / 40 = about 20 hours. The guide explains conversion/idle losses, reserve, temperature, age, cutoff, compressor duty cycle and variable solar yield; this is not a product test.

FALLOUT covers water planning, food/rations, first-aid organization, sanitation, shelter/warmth, a household supply checklist and equipment limits. Storage is distinguished from treatment; serving counts from meals; a bivvy from a complete cold-weather shelter. No filter is presented as universal chemical/radiological treatment and a handheld meter cannot establish safety.

OUTBREAK covers bag planning, carry weight, navigation/communication, weather layers, respiratory limits, fit/component selection and an evacuation checklist. It avoids universal pack-weight rules, guarantees of rescue, universal PPE protection and weapon/self-defence claims. Fiction is explicitly separate from practical guidance.

Official factual references were inspected during this work and linked alongside the guidance: [Health Canada food/water emergency guidance](https://www.canada.ca/en/health-canada/services/food-drinking-water-safe-emergency.html), [Canadian kit checklist](https://www.canada.ca/en/services/policing/emergencies/preparedness/get-prepared/emergency-kits/get-kit.html), [Canadian outage precautions](https://www.canada.ca/en/services/policing/emergencies/preparedness/get-prepared/hazards-emergencies/power-outages/how-prepare.html), [CDC emergency water limits](https://www.cdc.gov/water-emergency/about/), [NIOSH respirator selection scope](https://www.cdc.gov/niosh/docs/2018-176/default.html) and [NIOSH fit testing](https://www.cdc.gov/niosh/ppe/respirators/fit-testing.html). Guidance is paraphrased and household-specific limits remain explicit.

The methodology page explains selection, specification checking, manufacturer documentation, ASIN/variant evidence, unknowns, concept illustrations, physical-testing limits, commissions and corrections through repository issues. Dates on the new guides/methodology reflect this actual maintenance on November 1; existing source dates are untouched and no per-build refresh was introduced.

The catalogue offers sector/category filters, literal case/accent-insensitive name/brand search, an announced matching count with active selections, reset and a useful empty state. Filters sit directly below the heading. The category directory expands with a native details control; its jump links work without JavaScript, and with JavaScript they select that category and clear conflicting filters. Every product card/link remains in server-rendered HTML. Controls are hidden until their event handlers are ready. Inputs/selects have visible labels, native keyboard behavior and 44px minimum heights; result counts use a polite status region. A browser-discovered reset-order bug was fixed by clearing control values and applying the result update synchronously. There is no new dependency, API call or client-side price/review data.

Cards preserve their artwork, evidence/listing labels, safety cautions and eligible Amazon CTA. Brand/model precede the product heading; summary explains the benefit; a first documented limitation is shown when no dedicated caution applies. Eligible cards gain a clear Product details link. Held cards show the first sentence of the recorded blocker, retaining a concise details route and the full explanation on the profile. No unavailable button is made clickable.

Existing related-equipment cards and the four-component 3M comparison are reused. No compatibility is invented. Each profile gains one relevant planning-context link and one methodology link: power to runtime/reserve, solar to electrical-input checking, refrigeration/thermometry to cooling limits, eneloop to chemistry/charger requirements, radios/lights to power priorities, water equipment to treatment limits, backpacks to the evacuation checklist and respiratory equipment to fit/approved assembly guidance. Guides link existing EcoFlow, BLUETTI, Jackery, BougeRV, ORIA, eneloop, Fenix, Midland, household and evacuation profiles by descriptive anchors. Obsolete short hub lists were replaced, avoiding parallel recommendation blocks; refrigeration, battery and planning anchors remain available.

## Structured data and technical controls

Core collections now have matching BreadcrumbList and ItemList data: entries name visible existing profiles, use absolute canonical destinations and sequential positions, and report the actual list count. A directory entry is not Product/Offer data or an endorsement. Existing homepage WebSite/Organization and profile BreadcrumbList behavior remain intact. No ratings, reviews, availability, prices, certifications or new Product schema were added.

The production verifier now rejects missing/duplicate canonicals, validates schema context, positions, destinations and list counts, and traverses rendered internal links from home to detect disconnected indexable pages. Existing checks still require exactly the indexable URL set in the sitemap, a unique title/H1, valid descriptions, image dimensions/srcsets, real internal targets/fragments, draft exclusions, safe CTA attributes and disclosed affiliate controls. Historical component snapshots have narrow Phase 6 allowances; a new baseline test independently freezes every existing product/media file and the commercial/tracking implementation.

## Commercial integrity

All 41 products, original images and image manifests are unchanged. There are 36 permitted Canadian destinations and five held destinations: EcoFlow RIVER 2 Pro, NANUK 904, Jackery Explorer 300, Kidde C3010 and INIU P62. Mandatory regional model/certification/safety holds remain. All authorized purchase controls retain `tag=apocalypsegear-20`, centralized generation, accurate “View on Amazon.ca” text, `target="_blank"`, `rel="sponsored nofollow noopener"`, nearby Associates disclosure and the same GA4 merchant/placement metadata. No live seller/offer approval is inferred. The owner declaration and lack of independent account confirmation are unchanged.

No products, prices, testimonials, credentials, urgency messages, overlays or new merchant destinations were introduced. Browser tests isolate Analytics and Amazon traffic; mouse/keyboard affiliate event regressions test one `affiliate_click` per genuine activation, and blocked/prevented clicks emit none.

## Validation and visual evidence

Final results and limitations are recorded in the [validation summary and screenshot manifest](qa/phase6/validation-summary.json), [complete check results](qa/phase6/validation.json), [post-layout rechecks](qa/phase6/post-layout-validation.json), [route audit](qa/phase6/route-audit.json), [performance observations](qa/phase6/performance.json), [responsive results](qa/phase6/) and the [screenshots](qa/phase6/screenshots/). The [86-file inventory](qa/phase6/changed-files.txt) includes all implementation, regression and evidence files.

| Final check | Result |
| --- | --- |
| Astro check | 114 files; zero errors, warnings or hints |
| Unit tests | 99 passed; zero failures |
| Complete Playwright regression | 127 passed; zero failures |
| Final CSS rebuild and affected Playwright cases | 25 passed; zero failures |
| Production build | 49 HTML pages |
| Canonicals, links and sitemap | 2,270 internal references; seven sitemap URLs; no orphaned indexable pages |
| Images, release, affiliate, verification, product fixtures, conversion, BougeRV and Phase 5.5 audits | All pass |
| New responsive/axe coverage | 54 page/viewport combinations; zero violations or horizontal overflow |
| QA screenshots | 24 WebP files, including split long-page panels |

The CSS-only layout reservation was rebuilt after the broad suite and verified with the 25 affected-page cases, another Astro/unit/production/SEO/conversion check and isolated Lighthouse. Automated axe and keyboard coverage are not a manual screen-reader certification. Browser coverage is Chromium with emulated viewports; no Firefox, Safari or physical-device session is claimed.

The baseline and final browser runs include actual product routes, affiliate behavior, noindex previews, image integrity and responsive checks. New tests cover combined filters, unmatched searches, literal punctuation, reset, announced counts, no-JavaScript discovery, contextual navigation and nine representative pages at 320, 375, 768, 1024, 1440 and 1920 pixels. Screenshots cover home, catalogue (including filtered UI), all hubs, methodology and representative power, refrigeration and respiratory profiles on mobile/desktop. Very long mobile captures are split into numbered panels at their original dimensions to respect WebP’s height limit.

Lighthouse results are local single-run lab observations with analytics blocked; concurrent QA can affect timing. They are not real-user Core Web Vitals. No field INP/CrUX or Search Console indexing data was accessed. The filter test records synchronous DOM-processing time separately, not as INP. Responsive image dimensions, lazy catalogue images, high-priority homepage hero, system font stacks without external font requests and static delivery architecture are preserved. Public asset cache headers depend on GitHub Pages and were not changed by this repository update. A measured shift introduced when moving the controls above the content was resolved by reserving their exact responsive layout before initialization; the form remains absent for users without JavaScript.

| Local Lighthouse observation | Performance | Accessibility | SEO | LCP | CLS | TBT |
| --- | --- | --- | --- | --- | --- | --- |
| Home, mobile | 100 | 100 | 100 | 1.82 s | 0 | 0 ms |
| Home, desktop | 100 | 100 | 100 | 0.67 s | 0 | 0 ms |
| Catalogue, mobile | 100 | 100 | 100 | 1.54 s | 0 | 4 ms |

All three also scored 100 for Lighthouse best practices. The catalogue’s bundled filter/search module is inlined at 1,494 bytes; there is no new external application script request or dependency. The local mean synchronous filter update was approximately 0.10 ms over 30 updates, recorded separately in [filter-performance.json](qa/phase6/filter-performance.json), not as field INP. These observations use an isolated build of the final layout fix, so the additional preview did not change the build served to the broad regression suite. The [production cache observation](qa/phase6/production-cache.json) records `max-age=600` and ETags for baseline HTML, CSS and favicon, with gzip for HTML/CSS; hosting headers were not modified.

## Remaining work, in priority order

- **P0:** No unmitigated navigation, indexing or CTA defect identified in the completed checks. Existing safety/model holds remain enforced and must not be overridden to increase clicks.
- **P1:** Resolve the five held product identities/safety questions with exact evidence; complete individual safety/editorial reviews before considering any product indexing. The ORIA exact-model/manual and current Amazon offer verification remain incomplete. Obtain current, independent Canadian offer evidence where required; this PR does not supply it.
- **P2:** Collect real-user LCP/INP/CLS after an owner-approved release and sufficient traffic; review actual Search Console coverage and submit the existing sitemap through the owner’s account as appropriate. Consider task-specific comparisons only after editorial review. No Google indexing, field performance improvement or affiliate-revenue lift is claimed.

One pull request is the delivery boundary. Merging and deployment remain owner-controlled.
