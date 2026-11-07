# WHITEOUT Amazon purchase-button audit

Historical audit before the six Amazon screenshots were supplied. See the [current activation and automation report](whiteout-affiliate-automation.md) for superseding product decisions and validation results.

Branch: `feat/whiteout-phase2`. This follow-up leaves the six real purchase decisions on hold. No technical false block was found, and no newly verified exact target destination was obtained. No product, translation, specification, URL, safety status, SEO rule or runtime affiliate code was changed in this follow-up. Nothing was staged, committed, pushed, merged or deployed.

## What controls the buttons

`src/config/site.ts` enables Canadian affiliate linking. `src/lib/affiliate.ts` checks the public profile, exact HTTPS Amazon.ca ASIN URL and unique `tag=apocalypsegear-20`, mandatory product holds, blocked safety reviews, product-specific affiliate review and any recorded identity evidence. None of these six products has a malformed URL, account-level block or mandatory policy hold. **Each has a specific `affiliateReview.decision: "hold"`.** That is the effective blocker.

`AffiliateButton.astro` renders a native, tracked external link when `getMerchantLinks` supplies an eligible Canadian URL; otherwise it renders a disabled control. `ProductProfile.astro` and `ProductCard.astro` use the same permission result. No component filters out WHITEOUT or requires a fully published/indexable profile for a reviewed Canadian link. Cards intentionally offer keyboard-accessible profile details while an offer is held. Changing a CSS class or removing the disabled state would bypass the documented decision. The [gate trace](qa/whiteout-button-audit/gates.json) records each effective blocker and hashes seven unchanged runtime files.

Canadian recorded-link permission is distinct from independent live listing verification and editorial/indexing approval. Existing 41 permissions remain intact. The present six require exact target identity evidence under their recorded reviews and the owner's Phase 2 instructions; their valid URL syntax alone is insufficient. Synthetic tests exercise later activation without saving fabricated verification or approvals.

## Final real-product decisions

**Newly activated buttons: none.** These are retained candidates, not claims of broken or unavailable Amazon offers:

| Product | Retained exact affiliate URL | Status and evidence needed to activate |
| --- | --- | --- |
| Outdoor Research Alti II mitts | `https://www.amazon.ca/dp/B0B67C7N9M?tag=apocalypsegear-20` | **HELD.** An actual selected Canadian offer must identify child ASIN, historical model 300009, colour, size and reference. Resolve the reported alternative B0B67CFPG7 / Small / Agate / 3000090862006. The red Agate option does not authenticate the illustrated black option. The newer manufacturer model 322807 is not a substitute. |
| Hestra Army Leather Heli Ski | `https://www.amazon.ca/dp/B00F1F08TM?tag=apocalypsegear-20` | **HELD.** Selected Canadian child ASIN must match five-finger 30570, Black/White, size 9. B013YNSJHA / Red / size 5 / 30570-560-05 cannot satisfy that target. |
| Oakley Flight Deck XM / M | `https://www.amazon.ca/dp/B012Y896ZA?tag=apocalypsegear-20` | **HELD.** Match the Canadian child ASIN to OO7064-41, Medium, Matte Black strap and Prizm Snow Sapphire Iridium lens. Manufacturer model documentation does not itself identify an Amazon child. Reported 150 g remains unverified and is not a requirement to invent. |
| Smartwool NTS AW15 250 balaclava | `https://www.amazon.ca/dp/B002VGHX1A?tag=apocalypsegear-20` | **HELD.** Selected offer and matching documentation must resolve SC967-001-ONE / BSC967001, Black, one size and composition for the older AW15 revision. Current SW0SC967 family specifications cannot authenticate that older listing. Reported 50 g remains unverified. |
| Smartwool reversible cuffed beanie | `https://www.amazon.ca/dp/B0DK9VRQF2?tag=apocalypsegear-20` | **HELD: observed colour conflict.** Earlier direct selected-page evidence identifies Mink Heather / One Size. Supply the intended dark/Black child ASIN and model SW0SW956 evidence. B07WNF5FXC was a parent family identifier; a canonical parent does not establish a purchasable Black child. No guessed replacement URL was inserted. |
| Therm-a-Rest NeoAir XTherm NXT | `https://www.amazon.ca/dp/B0CS54SN91?tag=apocalypsegear-20` | **HELD.** Confirm Canadian child ASIN, 14016, Regular Wide / Neptune, including package/version. Obtain the exact Amazon −20 °C statement with its section/context and applicable manufacturer instructions or clarification sufficient to reconcile its scope. The warning remains unresolved. Unsupported 653 kg capacity stays out of specifications. |

For a held record, a saved Amazon.ca page, screenshot or supplied page transcription must show the final URL and selected ASIN/model/colour/size together, not just a family title or search result. Evidence can be recorded as an owner document under the existing policy; a live automated fetch is not mandatory. An access challenge alone never proves a broken URL. The source, date, exact selection and product-specific review decision must be documented before activation; conflicting safety evidence must be resolved without suppressing warnings. No physical testing is asserted.

## Fresh evidence and XTherm investigation

One ordinary unauthenticated HTTP GET per supplied candidate returned HTTP 200 **access-challenge pages**, with no product title or selected ASIN. Response hashes and UTC timestamps are recorded in [amazon-recheck.json](qa/whiteout-button-audit/amazon-recheck.json). This distinguishes HTTP success from usable offer evidence. No CAPTCHA, authenticated access, proxy or purchase action was used. The earlier genuine [beanie selection evidence](qa/whiteout-phase2/amazon-http.json) is preserved; this later challenge does not overturn its colour conflict. Web-reader attempts also could not open the XTherm or Oakley Canadian pages.

The [manufacturer XTherm table](https://cascadedesigns.com/products/neoair-xtherm-nxt-sleeping-pad) still distinguishes Regular Wide 14016 / 540 g from Regular. The [manufacturer FAQ](https://cascadedesigns.com/pages/faq-thermarest) describes ASTM R-value comparisons and valve operation. The inspected [manufacturer NeoAir French/German guide, ©2020](https://www.thermarest.com/on/demandware.static/-/Library-Sites-cdiSharedLibrary/default/dw0ddb94f9/pdf/manuals/34_1800_2020_TR_Warranty_AIR_FR-DE.pdf) addresses pressure/temperature changes, punctures, fire, flotation and high-pressure inflation. It does not resolve the reported Amazon −20 °C statement. It is a general older NeoAir guide, not proof of the exact 14016 package's instructions. Old FAQ blog links redirected to the general blog and supplied no additional clarification.

No inference was made that the warning is an error, refers to storage, or can be overridden by R 7.3. Search results from importers/aggregators contained inconsistent Regular/Regular Wide and 11633/14016 fields; they were not accepted as Canadian selected-offer evidence or used to change specifications. The existing bilingual safety notes, unresolved −20 °C warning and commercial restrictions remain unchanged.

## Changes and validation

This follow-up adds two unit tests covering all six records: synthetic eligible activation while preserving draft/noindex policy, and 36 rejected cases covering retained holds, blocked safety, wrong review ASIN, wrong evidence model/ASIN and altered affiliate tag. Two bilingual browser tests follow every held WHITEOUT card using the keyboard, read its precise localized restriction, check disabled purchase markup, and assert zero retailer traffic.

Follow-up files: `tests/whiteout-phase2.test.ts`, `tests/browser/whiteout-phase2.spec.ts`, this report, the cross-reference in `docs/whiteout-phase2-implementation.md`, and evidence/results under `docs/qa/whiteout-button-audit/`. Local raw HTML, scripts, logs, dependency caches and builds remain excluded. The original checkout's unrelated `UniverseHero.astro` modification is untouched.

| Follow-up check | Result |
| --- | --- |
| Production build | Passed, 122 pages (61 English / 61 French) |
| Final Astro / TypeScript check | Passed, 0 errors / warnings / hints |
| Complete unit suite | 129 passed |
| Complete Chromium suite | 214 passed, 0 failed / skipped / flaky |
| Complete WebKit suite | **62 passed / 1 failed on each of two full runs**, on different language-tap cases; not a green suite |
| Original failed WebKit case, isolated with tracing | 10 / 10 passed; does not establish a cause or invalidate the full-run failures |
| Bilingual / SEO / structured data / images / release / affiliate / product verification | Passed |
| Conversion / BougeRV / Phase 5.5 / actual Astro product and button fixtures | Passed; real data/configuration restored, then site audit passed again |
| Protected functionality | 41 existing active destinations preserved; 61 protected files checked; seven affiliate runtime files unchanged from HEAD; original local UniverseHero hash unchanged |

The first full WebKit run failed the French tap on the balaclava at 390 px: the page stayed English for the 5-second URL assertion. Ten isolated traced repetitions passed. A second complete run passed every WHITEOUT profile, but failed the English tap on `/fr/blackout/` with simulated read-only localStorage at 375 px: it stayed French. The [failure screenshot](qa/whiteout-button-audit/webkit-375-language-failure.png) shows the menu open after that tap. No runtime cause has been established. The selector, storage logic and header were not changed, and the suite is **not reported as fully passing**. This intermittent interaction remains an outstanding validation issue.

The two development-time check errors were corrected before final validation: the added browser test now reads the translation JSON fixture directly rather than importing its application module through Playwright's JSON loader, and a temporary diagnostic helper includes Astro's required collection field. No production code change was needed for either.

Detailed final results, both WebKit full-run totals, the isolated run and exact follow-up file list are recorded in [results.json](qa/whiteout-button-audit/results.json). Temporary full logs, downloaded HTML, traces and helpers remain local. Historical QA outputs regenerated by Chromium were archived under the ignored local tools directory and their 57 tracked originals restored using the explicit artifact manifest. Current WHITEOUT screenshot evidence remains available under `docs/qa/whiteout-phase2/screenshots/`.

Physical iPhone verification: serve `npm run preview -- --host 0.0.0.0 --port 4321` on a trusted local network. On a real iPhone, repeatedly open `/gear/smartwool-nts-250-balaclava/?source=whiteout-review#buy`, tap Français once and then English once; verify the equivalent route plus query and anchor each time. Also open `/fr/blackout/` with a saved French preference, select English, and check navigation and reload persistence; repeat with Safari privacy/storage restrictions. Record iOS/Safari version and any first-tap failure. WebKit emulation is not physical iOS certification. Actual Amazon selected-offer/purchase availability also remains unverified. No automated test grants real product verification or sends live affiliate clicks.
