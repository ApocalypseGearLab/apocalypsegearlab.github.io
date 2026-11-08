# PR-ready summary — local draft only

## Proposed title
Require analytics opt-in and deliver responsive variants for 13 catalogue illustrations

## Proposed description
The production baseline loads optional GA4 before a visitor choice and thirteen catalogue illustrations expose only their full-resolution files. This change keeps Google off until a valid all-visitor opt-in, adds EN/FR privacy drafts and footer preferences, and delivers 480/960/original image candidates without changing artwork or affiliate destinations.

Withdrawal disables tracking, clears accessible GA cookies and reloads the document; native navigation and Amazon.ca links remain independent. Existing affiliate/source events remain available after permission. The 26 smaller files total 454,254 bytes at 480 pixels or 1,355,922 bytes at 960 pixels, compared with 2,592,100 bytes for all 13 originals. All originals remain available and unchanged.

Product work is documentation only: five held destinations remain held; the Therm-a-Rest below −20°C prohibition and pending manufacturer clarification remain; three lower-risk future pilot candidates still need independent identity, safety and editorial evidence. No draft is approved and no product becomes indexable.

Validation evidence, exact browser counts, laboratory metrics and limitations are in [validation-report.md](validation-report.md), [performance-report.md](performance-report.md) and [image-optimization-report.md](image-optimization-report.md). No Lighthouse score, field CWV improvement, physical-iPhone result or private GA4 ingestion is claimed.

## Publication blockers

- Owner must designate and approve a private business channel for privacy requests. No personal contact information or public issue submission is proposed. EN/FR policies are local noindex drafts with the missing-method requirement visible.
- Owner must review final policy text, responsible operator/jurisdiction and actual GA4 account retention/access settings before publication.
- Staging, commit, push, PR creation, merge and deployment require separate explicit approval. None has occurred.

## Deployment risk and review scope

| Area | Risk | Review / mitigation |
|---|---|---|
| Analytics reporting | Medium: fewer measured users and events are expected after opt-in; pre/post populations differ | Confirm account settings and event taxonomy; do not interpret falling events as falling traffic without consent context |
| Privacy publication | High until private contact method and final owner review are complete | Keep local and noindex; replace the draft contact requirement only with approved verified details |
| Image delivery | Low to medium: new paths/srcsets must deploy together with the sidecar and code | Deterministic hashes, direct HTTP delivery tests, browser selection and preserved originals |
| Product safety/indexing | High if someone relaxes holds outside scope | Product records and release policy unchanged; integrity, affiliate and bilingual/SEO tests retained |
| Layout/accessibility | Low: footer grows to show an in-flow preference panel; cinematic components remain intact | Responsive/keyboard/axe checks and screenshots across Chromium/WebKit |

Review the complete file inventory and source-change hunks. No dependency installation or dependency-version change occurred. The new source projection allows only the exact reviewed privacy/media/test hunks when checking historical snapshots; unrelated bytes and safety policy hashes stay protected.

## Future release and rollback notes

After approval, release the consent module, footer, translations, policy and responsive manifest/routes/assets together. A future rollback must preserve the confirmed all-visitor opt-in choice; do not silently revert to the prior unconditional GA loader. If a new image path fails, restore original-only candidate delivery while preserving originals and the consent/privacy work. No rollback or deployment action has been executed.
