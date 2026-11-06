# iPhone Safari language selector fix

Local validation snapshot: November 6, 2026, on `fix/ios-language-selector`, in the isolated `tmp/ios-language-selector` worktree, based on production commit `d9d52c705cd5067135988a6cf1ab2019d1da2c98`. At validation time the changes were uncommitted and unpublished; the publication flags in the evidence describe that snapshot. The original worktree and its unrelated UniverseHero.astro modification remain untouched. GitHub publication is limited to the fix branch and a review PR; merging and deployment require separate explicit approval.

## Production audit and reproduced cause

The successful Pages deployment is [run 42141919294](https://github.com/ApocalypseGearLab/apocalypsegearlab.github.io/actions/runs/42141919294). HTTP inspection of English/French homepages, BLACKOUT and the 3M 2097 profile confirmed correct static language targets and canonical URLs. Their inline language module is byte-identical to the unmodified local production build (SHA-256 `e1d98e98055ad26ca6fea634bd2383bbfe6c1067a99704305a108573a87dc030`).

Trusted touch events reproduced the reported failure in WebKit at 320, 375 and 390 px. The same iPhone-sized Chromium controls successfully switched to French. In WebKit the sequence was: summary opens; the option tap causes summary focusout with relatedTarget=null; the old listener closes details during that event; no language-link click or French document request follows, and no preference is saved. This is why direct /fr/ navigation works while the tap leaves English displayed.

The [before/after touch traces](qa/bilingual/ios-language-selector/touch-trace-before.json) and [production audit](qa/bilingual/ios-language-selector/production-audit.json) record the evidence. Header navigation listeners were audited; the selector is outside the nav click handler, and no competing handler cancels language-link navigation. LanguageSelector.astro and its CSS/hrefs are unchanged.

## Small shared fix

- Replace close-on-focusout with close-on-actual-outside-focusin. The existing outside-pointer and Escape behavior remains; native link activation handles navigation.
- Write the explicit language choice to session storage as well as attempting localStorage. The head preference check reads that valid per-tab choice first. A reproduced read-only-localStorage case previously let a stale French preference redirect an English selection back to French; the session choice now survives that navigation and reload. If session storage is blocked, persistent localStorage still works. If both are unavailable, native switching remains functional.
- Restore the saved position with an explicit instant scroll after two animation frames. The WebKit trace showed the initial fragment scroll winning during first paint; this sequencing retains the actual click-time position and the original query/anchor.

There are no new language URLs, parameters, translation services, dependencies or visual changes. English remains the default. Explicit French URLs remain French. The existing catalogue parameter validation, filters, section IDs and localized internal links are retained.

## Validation

| Check | Result |
| --- | --- |
| Production build | 112 pages, 56 per language |
| Astro / TypeScript | 0 errors, warnings or hints |
| Complete unit suite | 123 passed |
| WebKit/iPhone regression suite | 45 passed; 320, 375, 390 px; 0 failed/skipped/flaky |
| Relevant Chromium regression suites | 43 passed; 0 failed/skipped/flaky |
| Bilingual/site/SEO checks | Passed; 10,790 internal references and 16 indexable sitemap URLs |
| Affiliate, safety, image and release audits | Passed; all 61 protected original sources retained |
| Generated-content comparison | All 112 pages preserve text, translations, technical values, canonical/hreflang/JSON-LD, anchor/affiliate attributes, GA4 and other non-language scripts, images and buying holds |

WebKit covers English/French touch round-trips for home, all four universes and a product; query strings, fragments and actual activation scroll positions; catalogue search/category/sector filters; flags and mobile-navigation interactions; click/keyboard/escape/focus/outside dismissal; preference persistence; read-only or blocked storage; and native details/link operation without JavaScript. Chromium rechecks every route at 375/1440 px, analytics/affiliate events, existing menu behavior, accessibility and the responsive specification component.

The existing preservation manifest now records only the exact authorized package/head preference hunks, keeping frozen historical baselines intact. The CI validation workflow installs WebKit and runs the new suite after Chromium. These new CI steps have been tested locally and have not been pushed or run on GitHub.

### Evidence

- [Results](qa/bilingual/ios-language-selector/results.json)
- [Content preservation](qa/bilingual/ios-language-selector/content-preservation.json)
- [Before touch trace](qa/bilingual/ios-language-selector/touch-trace-before.json) / [after touch trace](qa/bilingual/ios-language-selector/touch-trace-after.json)
- Menu screenshots: [EN 320](qa/bilingual/ios-language-selector/menu-en-320.png), [FR 320](qa/bilingual/ios-language-selector/menu-fr-320.png), [EN 375](qa/bilingual/ios-language-selector/menu-en-375.png), [FR 375](qa/bilingual/ios-language-selector/menu-fr-375.png), [EN 390](qa/bilingual/ios-language-selector/menu-en-390.png), [FR 390](qa/bilingual/ios-language-selector/menu-fr-390.png).

## Automated iOS limits and manual iPhone checks

Playwright WebKit runs on Windows with an iPhone touch/viewport/user-agent preset. It reproduces the actual event-ordering defect using trusted browser input, but it is not the shipping Safari app on a physical iPhone. It does not cover every iOS/WebKit revision, dynamic address-bar behavior, a real virtual keyboard, Safari extensions, all private-mode/ITP conditions or device back/forward-cache behavior. A physical iPhone check remains pending.

To review the local production build on an iPhone, run `npm run preview -- --host 0.0.0.0 --port 4321` from this worktree on a trusted local network, and open `http://<computer-LAN-IP>:4321/` on the same Wi-Fi. Use the production preview, which excludes internal development drafts. Stop it afterward. Alternatively perform these steps on the live site only after publication has been explicitly approved.

1. In a fresh/private Safari tab, open English home. Tap the selector and Français, including a tap on the flag. Confirm /fr/, French content and the selected French option. Switch back to English and reload; repeat three times, then try Back/Forward.
2. Repeat on BLACKOUT, FALLOUT, OUTBREAK, WHITEOUT and the 3M 2097 profile. Start with a query and real fragment, such as /blackout/?source=iphone#sector-guide; confirm the equivalent path, parameters and fragment survive both directions. Scroll away from the fragment before switching and verify the current position is retained.
3. In the catalogue, search EcoFlow and select BLACKOUT/power stations. Switch both ways and confirm search, filters and matching results remain. Repeat while the virtual keyboard is open and after dismissing it.
4. Open/close with the summary, tap outside, open mobile navigation and tap a language flag. With an external keyboard/accessibility keyboard, check arrows, Home/End, Enter, Escape and Tab focus departure.
5. Close/reopen a tab to check the remembered persistent preference. Check an explicit French deep link with English saved, and an explicit English selection after French was saved. Private-mode behavior should not prevent switching. Temporarily disabling JavaScript should still allow native summary toggling and equivalent-page links; re-enable it afterward.

Without JavaScript, generated links preserve the equivalent static path; runtime query/filter/fragment state, absolute scroll persistence and optional outside-tap dismissal require JavaScript. With all storage disabled, explicit navigation still works, while preference/absolute-position persistence is unavailable. Do not use automated tests as evidence of live Amazon attribution or account standing.

## Changed files

Application: src/i18n/client.ts and src/layouts/BaseLayout.astro. Regression infrastructure: playwright.webkit.config.ts, tests/webkit/language-selector.spec.ts, tests/webkit/language-storage.spec.ts, package.json and .github/workflows/ci.yml. Preservation/documentation: docs/qa/bilingual/source-changes.json, this report and docs/qa/bilingual/ios-language-selector/. No product, translation, affiliate, analytics configuration, safety-policy or artwork file changed.
