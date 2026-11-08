# Phase 1 — focused release-blocker resolution

November 8, 2026 (America/Toronto). feat/phase1-production-hardening; HEAD unchanged at 2cc35df11968242c00fcc08060c18e5182dcabe0.

**Assessment analysis and proposed procedure are now prepared. Release remains NO-GO pending the narrow owner facts, adoption/adequacy decisions and subsequent publication authorization.** This report does not reopen the full audit or claim legal compliance.

## Concrete work completed

- [Three-provider assessment](provider-transfer-assessment.md): actual data flows, necessity/sensitivity, published protections/terms, jurisdiction risks, preliminary residual-risk findings and service-specific close-out for Google Analytics, GitHub Pages and Gmail. This replaces the earlier blank-worksheet stage; an owner decision is not pre-signed.
- [Single-operator procedure](privacy-request-procedure.md): minimal intake/register, proportionate verification, access/correction, consent withdrawal, deletion, complaints and purpose/hold-based retention. It distinguishes the legal 30-day written access/correction response requirement from an invented owner SLA or retention period.
- [Requirements register](release-requirements.md): legal duties, owner authorization and engineering workflow are distinct from optional improvements. A paid mailbox, bespoke DPA with every provider, outside counsel, every GA4 UI screenshot or a new performance audit is not automatically required.
- [Narrow GA4 check](ga4-disclosure-checks.md): actual extra recipients/exports, applicable processing-terms status and sufficient authorized access. Confirmed measurement controls are cleared; absent-tag opt-in is not reopened because a private checkbox is unknown.
- [Adoption-ready EN/FR governance addition](policy-governance-additions.md): prepared separately, not asserted as current practice or inserted before adoption.
- [Three-item owner decision card](owner-decisions.md): facts first, then an actual adoption/adequacy decision, then publication authorization.

Only official sources were used for the legal/provider findings; the [source register](official-sources.md) records scope and limitations. Public documentation establishes offered terms/capabilities, not the owner’s account acceptance or practices. The rendered Google consumer-terms page was US-country text; it is not represented as the Canadian owner’s accepted contract. No private messages, passwords or personal account lists were accessed.

## Owner unknowns — not guesses

The latest owner reply explicitly says the GA4 processing terms, other product/advertising links/BigQuery exports, mailbox service type, delegation/forwarding/connections and local copies are not checked. Known zero Google Ads links is preserved, not generalized to every integration. The existing public role, sole-operator personal review and approved privacy-only email remain confirmed.

Google’s [official acceptance instructions](https://support.google.com/analytics/answer/3379636?hl=en) make the owner action conditional: inspect accepted/incorporated status; review/accept if applicable and not already incorporated. A new account may already incorporate the terms; an older outside-EEA/UK/Swiss account may need explicit acceptance. No Ads association needs to be created. Documentation alone cannot resolve this private status.

The main service-specific uncertainty is whether the mailbox’s actual service/terms and copy/access paths support the assessed use. Ordinary Gmail is not automatically pronounced unlawful, Workspace is not automatically certified compliant, and Analytics terms are not silently applied to Gmail. Resolve a specific material gap rather than requiring unrelated procurement.

## Safe public-policy correction

Exactly two application files changed: src/pages/privacy.astro and src/i18n/fr-privacy.json. They now explicitly explain GitHub Pages IP security logging and that declining optional analytics does not stop hosting processing, as documented by [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages). Existing GA4 settings/role/rights wording stays intact. Complete current output: [English](privacy-policy.en.md), [French](privacy-policy.fr.md).

The Phase 1 README points here; all other additions are this documentation/evidence package. No consent/event runtime, tests, affiliate destinations, products, images, dependencies, workflows or privacy-contact details changed. No draft approval notice or unadopted retention/deletion practice was added to public pages. The owner must adopt the governance procedure before its matching public summary is applied.

## Relevant validation only

| Check | Current result |
|---|---|
| Build and bilingual site/SEO verification | PASS; 124 pages, 62 EN/62 FR, 16 indexable URLs; build.log / test-site.log |
| Focused bilingual/privacy units | PASS; 8/8, no skipped; focused-unit.log |
| Existing policy accessibility/content and EN/FR footer-link browser cases | PASS; 2 Chromium plus 6 single-worker WebKit at 320/375/390px, no skipped/retried/flaky cases; focused-browser-summary.json |
| Public output | Exact EN/FR hosting text, approved mailto, existing noindex and no unadopted governance inserted; public-policy-output.json |
| File preservation | 747/750 previous candidate paths unchanged; exactly the two policy files and README pointer changed; nine validated hashes match; 234 protected original hashes match; 2,537 checked unrelated files unchanged; final-preservation.json |
| Git state | Empty index, unchanged branch/HEAD/worktree heads, whitespace pass and stopped test servers |

The earlier 134-unit/84-browser full scoped results remain historical evidence. Unchanged consent/event runtime, test source, product/image inputs and protection fixtures were matched rather than broadly rerun. Prior projection/affiliate/image evidence is reused with unchanged supporting inputs; no new full-suite, live GA4 ingestion, provider backend-deletion, physical Safari, Lighthouse or legal-compliance result is claimed. The focused policy case itself exercises keyboard opt-in/withdrawal; Google/retailer fixtures remain isolated.

All 47 active Amazon.ca destinations, five holds, 104 product-language noindex restrictions, original/optimized image assets and retained safety limits remain preserved. No new WHITEOUT integration occurred. The [exact inventory](commit-inventory.md) and [current path hashes](candidate-commit-inventory.json) cover the current local candidate without staging it.

## Release decision

The earlier broad “assessment not completed” label is now replaced by a prepared assessment with explicit residual unknowns and a decision record. The remaining owner actions are the three bounded items in [owner decisions](owner-decisions.md), not another general audit. Known facts and safeguards support a proportional decision, but private contract/recipient/copy facts and adoption cannot be invented.

Branch protection and remote CI belong to the requested future engineering workflow, not a Law 25 privacy finding. They must not be confused with a statutory requirement to redesign the website. Once required privacy conditions and any resulting public-summary edits are resolved, validate only affected changes and obtain the owner’s publication authorization before Git/publication actions. The latest instruction controls over prior conditional merge authorization.

Nothing was staged, committed, pushed, opened/updated as a PR, merged or deployed. No branch protection or provider account was changed.
