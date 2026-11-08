# Minimum remaining steps before Phase 1 merge

**Current decision: NO-GO.** The owner explicitly confirms that the Quebec provider/transfer privacy assessment is not completed or confirmed and instructs that no merge or deployment occur while it remains unresolved. This is the controlling release gate. The approved Privacy Officer title and personal review of requests are now confirmed; do not request a personal name, phone or address.

## 1. Record the actual remaining GA4 configuration

For property ApocalypseGearLab / stream G-YFJJ5N9RBX, record the observed state and review date, without passwords or personal email addresses:

- Admin → Product links: every integration other than the already confirmed zero Google Ads links, including BigQuery, Search Console and any advertising/other services actually listed. Record purposes and any exported-data retention/access separately.
- Stream → Google tag settings: all destinations, automatic event-detection switches and consent configuration/overrides. The confirmed stream Enhanced measurement list is not proof of every tag-level switch. Check any cross-domain settings or extra identifiers.
- Admin → Account access management and Property access management: role categories/counts and inherited access; remove unnecessary privileges through an intentional owner decision, not by assumption.

The confirmed two-month retention/reset settings, four sharing switches, enhanced-measurement options, disabled Universal Analytics collection, enabled email redaction and disabled/saved user-provided-data detection are cleared. Ordinary GA4, custom affiliate tracking and future video engagement remain desired; this review does not require disabling them. Tag-based outbound click and custom affiliate_click can describe one interaction as distinct events; use event-specific reporting to avoid adding both into one conversion count.

## 2. Complete and document the provider/transfer assessment

Use [the factual provider worksheet](provider-review-worksheet.md) for Google Analytics, Gmail and GitHub Pages, including any extra recipients found in step 1. For each applicable outside-Quebec processing flow, document the purpose, data sensitivity, receiving location/legal regime, safeguards and contractual protections; assess adequacy, resolve identified risks, and record the required written arrangements and responsible decision before release. Do not treat this worksheet as a completed EFVP or assume that a public privacy notice or opt-in alone completes the assessment.

The CAI describes the outside-Quebec assessment and written-arrangement process in its [private-enterprise communication guidance](https://www.cai.gouv.qc.ca/protection-renseignements-personnels/information-entreprises-privees/utilisation-communication-renseignements-personnels). The owner/Privacy Officer must resolve the actual facts and applicable requirements; this code review provides no legal certification.

## 3. Establish the remaining request-handling practices

The sole operator has confirmed personal review of access, correction, consent withdrawal and deletion requests where applicable. Still record the actual verification, response/complaint handling, mailbox access/safeguards, purpose-based retention and secure-destruction practices. Do not invent a fixed period, a deletion procedure or a response-time promise. Reconcile the public policy with the practices actually adopted.

The CAI explains [privacy responsibility and governance](https://www.cai.gouv.qc.ca/protection-renseignements-personnels/information-entreprises-privees/responsable-protection-renseignements-personnels-entreprise) and [retention/destruction](https://www.cai.gouv.qc.ca/protection-renseignements-personnels/information-entreprises-privees/conservation-destruction-renseignements-personnels). No statement here replaces applicable statutory duties with an invented website promise.

## 4. Close the gate and use the requested PR/CI workflow

Review the assessment/configuration/practice evidence, apply any factual policy corrections it requires and validate the changed bytes. Only after all privacy gates are satisfied may the existing conditional Phase 1 authorization be used for an isolated stage/commit/PR.

The live main branch currently reports protected:false and no rulesets. A protected workflow is not currently established by that evidence. Have the repository administrator configure/confirm the requested PR and required-CI enforcement before merging; do not bypass checks or alter protections as a shortcut. Require the Validate Astro site workflow’s validate job to pass on the actual Phase 1 PR candidate. No Phase 1 remote CI pass exists yet.

The current Pages workflow on main is workflow_dispatch only, requires main and confirm_publish:true, and is not automatically triggered by merge. This does not authorize deployment while the owner’s assessment hold remains in place. No staging, commit, push, PR, merge, workflow dispatch or new WHITEOUT product integration occurred in this review.
