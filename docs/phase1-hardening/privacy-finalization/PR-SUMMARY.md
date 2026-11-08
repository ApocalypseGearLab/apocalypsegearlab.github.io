# Proposed PR summary — local draft only

Title: **Require GA4 opt-in, harden withdrawal and finalize EN/FR privacy policies**

The candidate replaces unconditional optional analytics with all-visitor opt-in, protects withdrawal against stale grants in restricted storage, and supplies responsive 480/960 candidates for thirteen preserved catalogue originals. Native navigation and Amazon.ca destinations remain independent of analytics.

The owner-approved privacy-only business email is now linked in both policies. The final copy discloses Quebec, Canada operation, Gmail request handling, possible processing outside Quebec/Canada, analytics choices and cookie/identifier use. It clarifies saved permission reuse and distinguishes 180-day device durations from server-side retention. Draft/pending notices are removed from public pages. No general form/support page, phone or home address is added.

GA4 retention, sharing, remote destinations and email handling periods remain unverified as the owner confirmed. No fixed retention period/deletion practice or Quebec compliance certification is asserted. The [GA4 checklist](GA4-OWNER-CHECKLIST.md) and [Quebec review](QUEBEC-PRIVACY-REVIEW.md) identify the exact remaining checks.

All 47 active Amazon.ca destinations, five holds, 104 product indexing restrictions, four universes, safety warnings and thirteen originals/26 variants remain intact. No product is approved for publication; the below −20°C XTherm restriction remains. Dependencies and workflows are unchanged.

Validation: build/type, all 134 unit tests, image/release/affiliate/verification, bilingual SEO, conversion/BougeRV/Phase 5.5 and real-HEAD preservation pass. All 390 complete browser executions pass: 259 Chromium (two workers), WebKit 42 at 320px, 42 at 375px and 47 at 390px (one worker); no skipped/retried/flaky final cases. This includes 80 EN/FR privacy/storage executions. Two preliminary two-worker WebKit runs retain click-stability timeouts; no parallel-WebKit pass or physical Safari test is claimed. All 503 unaffected prior candidate files, 234 protected originals and 2,537 unrelated-checkpoint files remain unchanged; historical QA captures are restored and fresh artifacts archived.

Technical scope is ready for review with the Windows parallel-WebKit limitation. **Publication: NO-GO** until the exact GA4 and Quebec operating-practice requirements are resolved and any resulting policy changes revalidated. Evidence and final disposition are in [the release report](final-release-report.md).

No PR exists. Staging, commit, push, PR creation, merge and deployment require further explicit authorization. Contact-display approval does not authorize those actions.
