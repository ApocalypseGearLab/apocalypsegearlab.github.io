# Phase 1 PR preparation — merge and publication hold

November 8, 2026. The owner explicitly authorized staging/committing the validated Phase 1 work, pushing feat/phase1-production-hardening and creating a PR to main. This supersedes earlier Git-action holds for those preparation actions only. **No merge, auto-merge or deployment is authorized.** This document records authorization and review state, not a completed CI result.

## Scope and validated evidence

The source remains byte-identical to the [831-path validated checkpoint](owner-verified-ga4-update/candidate-commit-inventory.json). Pre-stage verification matched all 830 non-self manifest hashes, exact Git status coverage and report links. The self-inventory file is also included unchanged; this authorization note is the only new candidate file.

The planned commits isolate the existing 71 implementation paths (including the required source-changes.json preservation fixture) from the 760 historical/current documentation and evidence paths plus this note. Build/dependency caches, ignored .tools files, other worktrees, original master audits and unrelated root changes are excluded.

The [latest validation report](owner-verified-ga4-update/final-release-readiness-report.md) records build/site checks, eight focused units and eight unique Chromium/WebKit project/case combinations. Earlier 134-unit/84-scoped-browser evidence remains historical and is reused for unchanged inputs. No local full suite is repeated for preparation alone. The repository’s existing pull-request CI must still execute its configured checks; no workflow or check is bypassed.

Pre-stage preservation again matched 234 protected original hashes, the prior worktree heads and an empty index. The 47 active Amazon.ca destinations, five held products, existing SEO/noindex restrictions, all original/optimized assets and safety restrictions are unchanged. No new WHITEOUT work is included.

## Resolved GA4 facts

Owner-confirmed terms acceptance December 24, 2025; no Ads or GA4-integrated BigQuery links; known Search Console link November 8, 2026; one listed administrator at each inspected GA4 level/no additional users; four optional sharing switches off; user-provided collection/automatic detection off; enhanced measurement on. Prior two-month event/user retention and reset-off facts remain recorded. The policies include the known Search Console reporting purpose and separate retention scope. Private screenshots were reported by the owner, not independently inspected by this agent.

## Exact requirements before future merge/publication

1. Close the bounded other-product-link/tag-destination check and identify actual mailbox service/terms, delegates, forwarding, connected apps and local copies. The confirmed GA4 lists do not establish every other integration or mailbox permission.
2. Adopt/implement or correct the [prepared single-operator procedure](release-blocker-resolution/privacy-request-procedure.md), including proportionate verification, rights/complaint handling, safeguards and purpose/hold-based retention/deletion. Then apply the matching [EN/FR governance summary](release-blocker-resolution/policy-governance-additions.md) only when accurate.
3. Record the Privacy Officer’s reasoned decision on the [updated provider/transfer assessment](owner-verified-ga4-update/provider-transfer-assessment.md); resolve any specific material protection gap. No legal-compliance certificate, invented Gmail practice or automatic paid-service migration is implied.
4. Review passing remote CI and obtain explicit owner authorization for any future merge and deployment. Privacy uncertainty is not resolved by opening the PR or passing CI.

The [owner decision card](owner-verified-ga4-update/owner-decisions.md) remains the detailed close-out record. Existing reports stating that no Git actions were authorized/performed describe their earlier checkpoints; they do not negate the owner’s newer preparation-only authorization.

## CI and publication boundary

The existing Validate Astro site workflow runs for PRs targeting main. GitHub Pages deployment is a separate manual workflow gated on main and confirm_publish=true; it is not dispatched by this operation. Main protection/required-context enforcement was reported disabled by the read-only preflight; the configured validation job is still treated as a review gate. No branch protection is modified.

PR URL, exact commit SHAs and actual CI result will be reported in the PR/conversation after they exist, rather than prefilled here.

## Archived evidence handling

Staging exposed Windows long-path handling for archived screenshots; command-local core.longpaths=true resolved it without renaming files or changing persistent Git configuration. The staged whitespace diagnostic also reports trailing spaces/blank EOF lines in pre-existing raw logs, generated error contexts, worktree captures and historical policy exports. Those validated bytes are deliberately preserved. This is not an application-source whitespace failure or a skipped CI job; the new preparation note and implementation have clean whitespace checks. Git applies its existing text line-ending normalization when storing blobs; staged object IDs are checked against the same Git filters.
