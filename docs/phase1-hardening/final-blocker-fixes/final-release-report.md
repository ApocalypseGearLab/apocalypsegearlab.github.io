# Phase 1 final blocker fixes and release review

Prepared November 7, 2026 (America/Toronto), in the existing feat/phase1-production-hardening worktree. Base and current HEAD: 2cc35df11968242c00fcc08060c18e5182dcabe0. This checkpoint supersedes the technical NO-GO of the [earlier review](../release-readiness/release-readiness-review.md): all required local checks pass on the corrected bytes. Historical failures remain recorded.

**Technical decision: GO for the corrected local implementation. Public release: NO-GO pending owner approval and approved-policy application/revalidation.** No staging, commit, push, PR, merge or deployment has occurred.

## Corrections

| Finding | Correction and exact implementation | Regression evidence / risk |
|---|---|---|
| RR-01, P1: withdrawal revived a stale saved grant | src/lib/analytics-consent.ts now reuses a remembered grant only if its originating storage passes a write/read/remove check. The probe uses a fixed essential value, not an analytics identifier. Readable denials remain effective; denial wins equal decision timestamps. Cross-tab grants use the same guarded read. Explicit current-document opt-in remains possible without storage. Withdrawal removes document permission, sets GA disable, clears accessible cookies, empties the queue and reloads. | New EN/FR cases cover throwing and silently ignored writes, missing session storage, restrictions before page load and after GA starts, reject, grant, withdrawal, reload and navigation. Native Amazon links are exercised after withdrawal. Medium consent/lifecycle risk. |
| RR-05, P1: ambiguous catalogue status | tests/browser/phase6.spec.ts scopes its two counter assertions to the existing data-catalogue-count element. Counts, combined filters, empty/reset states, keyboard behavior, canonical, CLS and timing assertions remain. Both accessible status regions remain in the interface. | Corrected real source passes the focused catalogue test; full-suite disposition below. Low production risk: test-only selector correction. |
| RR-03, P2: source replacement metacharacters corrupted restoration | scripts/phase1-preservation.mjs restores each reviewed hunk through a callback, preserving literal replacement text. restoreReviewedHunks retains the exact-one-match assertion and reverse ordering. | New unit coverage includes dollar-ampersand, dollar-backtick, dollar-apostrophe, double-dollar, Unicode/newline text, multiple reverse hunks, and absent/duplicate hunk rejection. Independent projection matches all 33 real Git baseline files. Low runtime risk; source-integrity assertions remain active. |
| RR-04, P2: normal WebKit entry point omitted new cases | playwright.webkit.config.ts now includes privacy-phase1 and privacy-storage-phase1 at 320/375/390, plus responsive-phase1 at 390. Existing WebKit cases remain at every width. Workflow files remain untouched. | Standard WebKit discovery lists 128 cases in 7 files. Full mirror uses identical project coverage/assertions. Low risk: broader persistent CI coverage. |

## Consent semantics and evidence

The older reproduction has four failing EN/FR × Chromium/WebKit combinations under the combined storage restriction. The fixed implementation checks revocability before trusting a readable grant. An explicit click is valid for the current document even when storage is unavailable; unavailable persistence does not imply a saved grant on the next document. We do not promise durable preference storage when the browser prevents it.

The new privacy-storage-phase1 suite has twelve cases, six per language:

- Throwing or silently ignored local writes with session storage unavailable, applied before page load or after an ordinary grant: four cases per language. Each asserts the stale granted record remains readable, while withdrawal, its reload, a second reload and first-party navigation leave the loader/config/queue off. Google request attempts after withdrawal must remain zero. Accessible synthetic GA cookies must be removed. Native Amazon destination, null opener and footer navigation remain usable.
- Both storage getters unavailable: explicit acceptance works for the document; rejection and withdrawal remain off through reload/navigation.
- Read-only persistent storage with usable session storage: the newer session denial overrides the old local grant.

Existing tests retain ordinary grant persistence across EN/FR, one loader/config per document, no pre-consent queue, expired/malformed/future rejection, cross-tab denial/clear, keyboard/axe, no-JS and affiliate/source events after permission. Advertising storage, ad user data/personalization and Google signals remain disabled. GA4 ID G-YFJJ5N9RBX and Search Console verification remain unchanged.

New browser runs block Google endpoints and isolate retailer navigation. They prove local initialization, queue/gating, cookie cleanup and native-link behavior; they do not prove private GA4 ingestion. The earlier actual-loader probe remains historical evidence with its documented collection blocking and limitations. Withdrawal cannot erase information already received by Google. The disable flag follows [Google’s documented control](https://developers.google.com/tag-platform/security/guides/privacy).

## Current validation

| Check | Current result | Evidence |
|---|---|---|
| Astro production build | PASS; 124 pages | evidence/build.log |
| Astro / TypeScript | PASS; 180 files, zero errors/warnings/hints | evidence/check-final.log |
| Unit suite | PASS; 134/134, zero skipped | evidence/test-final.log |
| Deterministic responsive / original image integrity | PASS; all 13 assets / 26 variants | evidence/test-images.log |
| Release policy | PASS | evidence/release-check.log |
| Affiliate audit | PASS; 47 active, five holds | evidence/audit-affiliate.log |
| Product-verification audit | PASS; no product publication approved | evidence/audit-verification.log |
| EN/FR routes, canonical/hreflang, robots, sitemaps, four universes, WHITEOUT | PASS; 124 HTML pages, 62 EN / 62 FR, 16 indexable URLs | evidence/test-site.log |
| Conversion, BougeRV, Phase 5.5 | PASS | evidence/test-conversion.log, test-bougerv.log, test-phase55.log |
| Focused consent/catalogue/language regressions | PASS; 42 cases | evidence/focused-browser-results.json |
| Full Chromium and WebKit | PASS; 386/386, zero failed/skipped/flaky | evidence/browser-results.json |
| Independent real-HEAD preservation | PASS; 33/33 source projections, 234 protected originals | evidence/independent-integrity.json |

The full 17.0-minute run passed **258 Chromium**, **41 WebKit at 320**, **41 at 375** and **46 at 390**. All 48 new restricted-storage case executions pass (twelve EN/FR cases × four engine/width projects); both privacy specs total 76 passing executions. The ten responsive-image cases pass across Chromium and WebKit. Standard source configs discover the same 258 Chromium and 128 WebKit cases.

An isolated mirror used production preview 4321 and development 4332, without reusing an existing server. Four test copies substitute only literal dev port 4322 → 4332; assertions, projects and all other source/helper bytes are preserved. The [71-file mirror ledger](evidence/browser-mirror.json), [executed configuration](evidence/executed-browser-config.txt), discovery logs and [per-consent-case results](evidence/consent-regression-summary.json) make that scope reviewable. The owned servers stopped after the run. There was no remote CI run.

The first type-check attempt found a widened string argument in the new Playwright test. Its explicit Restriction type assertion fixes that test typing; the final check and unit rerun pass. The initial failure is retained in check-initial-type-error.log, check.log and cli-results.json; cli-final-reruns.json records the passing corrected checks. There are no disabled or skipped assertions added to silence a failure.

The existing prepare-browser-fixtures routine regenerated synthetic active/pending markup after the source fingerprint changed. Its finally block restored site configuration and rebuilt the 124-page real-data output; independent verification confirms no synthetic products remain. Source checks were repeated after fixture cleanup.

## Preserved content and assets

Independent comparison against real Git HEAD and retained baseline HTML verifies:

- 234 protected originals unchanged: product records, original artwork, affiliate/release/image-rights policy, original media manifest, site configuration, dependency lockfile and workflows.
- All 47 active Amazon.ca destinations keep the apocalypsegear-20 tag; five holds remain EcoFlow RIVER 2 Pro, INIU P62, Jackery Explorer 300, Kidde C3010 and NANUK 904. No offer/seller verification or hold clearance was invented.
- Across all 122 baseline HTML pages, 554 repeated affiliate controls retain exact destination, rel, target and tracking identity. All 104 product-language pages retain noindex, nofollow. robots.txt and five sitemap files are byte-identical; sixteen indexable URLs remain.
- Thirteen original illustrations and their 26 derived candidates retain their bytes, dimensions and identities. Originals total 2,592,100 bytes; the 480 set totals 454,254 and the 960 set 1,355,922. No image regeneration was necessary for these fixes. The earlier image/quality report and contact sheet remain unchanged.
- BLACKOUT, FALLOUT, OUTBREAK and WHITEOUT, cinematic artwork and safety copy remain intact. Product records and their existing below −20°C XTherm prohibition are unchanged; written manufacturer clarification remains pending.
- The existing product-readiness matrix, five holds and three unapproved future pilots remain documentation only. No product becomes published or indexable.

[Independent evidence](evidence/independent-integrity.json) contains per-file hashes and preserved counts. [Unrelated-worktree evidence](evidence/unrelated-worktrees-checkpoint.json) checks all 2,537 original checkpoint files with zero differences.

## Privacy drafts and remaining publication requirements

Complete proposed policy texts: [English](privacy-policy-draft.en.md), [French](privacy-policy-draft.fr.md). The owner-supplied business mailbox is limited to privacy requests; no general form, customer-support page, phone number or home address was added. Gmail request processing and data minimization are included in the documentation drafts. No mailbox message or deliverability test was sent.

The application’s EN/FR pages now accurately say final approval of the contact method and both texts is pending. Their storage explanation matches the revocability check. The email is absent from all emitted website text assets; see [contact gate evidence](evidence/privacy-contact-gate.json). The documentation drafts contain the email and must remain local until public exposure is explicitly approved, including in GitHub/PR content. noindex does not prevent publication.

Owner approval must cover the exact privacy-only contact wording and final bilingual text. The responsible operator/jurisdiction, actual GA4 retention/access/sharing and private request-handling procedures remain unverified. Applicable privacy obligations need context-specific review; no legal certification or response deadline is invented. [Approval requirements](privacy-approval-requirements.md) records the remaining decisions and primary sources.

## Exact changes and next actions

The blocker-fix implementation changes these nine paths relative to the reviewed candidate:

| Exact path | Change |
|---|---|
| src/lib/analytics-consent.ts | Guard remembered grants with revocable storage; denial wins timestamp ties; guarded cross-tab grants |
| scripts/phase1-preservation.mjs | Literal callback replacement and testable exact-hunk restoration |
| tests/browser/phase6.spec.ts | Two scoped catalogue-counter selectors |
| playwright.webkit.config.ts | Add normal privacy/storage/image coverage |
| tests/privacy.test.ts | Metacharacter, reverse-hunk and strict-match regressions |
| tests/browser/privacy-storage-phase1.spec.ts | New twelve-case EN/FR storage-failure suite |
| src/pages/privacy.astro | Accurate storage-check explanation and final-approval notice; no email |
| src/i18n/fr-privacy.json | Matching French policy text |
| docs/phase1-hardening/evidence/source-changes.json | Exact reviewed projections expanded to 33 baseline files |

The root Phase 1 README gains a latest-checkpoint pointer. All other additions are this report package and permitted diagnostic evidence. [Exact candidate inventory and proposed commit split](commit-inventory.md) and [every candidate path/hash/task delta](candidate-commit-inventory.json) cover the final bytes. The implementation is an atomic 71-path proposal; no files are staged.

1. Required technical checks are complete and passing. The corrected code is ready for owner review; preserve this tested checkpoint while reviewing the policy drafts.
2. Owner reviews/approves the supplied business contact’s public display and final EN/FR policy/account/request practices.
3. After approval, apply the approved contact text in EN source/FR translations and rerun checks against those new bytes. Regenerate the exact inventory.
4. Only after explicit authorization, stage the reviewed atomic source/assets/fixture inventory and approved documentation. Review the staged diff, then obtain/observe authorization for commit, push and PR actions.
5. Review real remote CI against the resulting commit and current main; merge and deployment remain separately approval-gated. The previously reviewed workflow is manual, but live Pages/outside automation were not audited and no automatic-publishing guarantee is made.

Physical iPhone Safari, production behavior after a future release, private GA4 reports, real-user CWV and Lighthouse scores remain unverified. No dependency was installed or version changed. No staging, commit, push, PR, merge or deployment has been performed.

## Final disposition and preservation

| Decision | Recommendation | Outstanding requirement |
|---|---|---|
| Corrected local technical implementation | **GO for review** | All required checks pass; no remaining documented technical blocker |
| Staging / commit | **Not authorized** | Explicit owner action approval against the exact inventory |
| Public push / PR including the whole proposed inventory | **NO-GO at current scope** | Explicit action approval and public-display approval for the three address-bearing draft/requirements files; an alternative scope excluding those files needs its own explicit approval |
| Merge / publish the current release candidate | **NO-GO** | Final EN/FR policy/contact approval, operator/account/request-practice review, approved text applied and validated, and explicit merge/deployment authorization |

75 fresh QA captures/results are archived under evidence/regression-captures; historical QA paths are restored to their verified original bytes. Of the prior 370 candidate files, 363 remain byte-identical and exactly seven expected existing-candidate files changed (six implementation/fixture files plus the README pointer). Two previously clean tracked files (catalogue test/WebKit config) and the new storage spec enter the candidate, alongside this report package. No earlier evidence or image work was discarded.

All nine frozen implementation/fixture hashes still match the tested bytes. All 234 protected originals, every existing worktree branch/HEAD and the empty Git index are verified again in [final preservation](evidence/final-preservation.json). All 2,537 unrelated checkpoint files also match. Whitespace validation passes; HEAD is unchanged. Production remains unchanged. No staging, commit, push, PR, merge or deployment occurred.
