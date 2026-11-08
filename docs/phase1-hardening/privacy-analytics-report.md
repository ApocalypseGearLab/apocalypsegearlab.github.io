# Privacy and analytics implementation

Prepared 2026-11-07. Status: implemented locally and runtime-verified within the limits below; privacy text remains a draft pending a private contact method and owner review. No publication or legal-compliance certification is implied.

## Confirmed owner configuration

The owner explicitly selected **opt-in GA4 for all visitors**, with navigation and Amazon.ca links independent. The owner prohibits publication of personal email, phone or home address, prohibits invented contact details, permits an existing verified private business channel if available, and otherwise requires a documented contact-method requirement and approval before publishing. Repository searches found no verified business contact address or private request channel. Public GitHub issues are not a substitute.

The local EN /privacy/ and FR /fr/privacy/ pages therefore contain a clearly marked contact requirement and remain noindex, nofollow, outside the indexable sitemap. This does not make an incomplete policy ready to publish. No deployment is authorized.

## What changed and why

| Component | Behavior | Evidence / affected paths | Effort / regression risk |
|---|---|---|---|
| P0 optional analytics gate | No Google loader, queued analytics or analytics cookies before valid permission; no denied-consent cookieless ping | src/lib/analytics-consent.ts; src/components/GoogleAnalytics.astro; consent runtime JSON and browser tests | Implemented; medium analytics-volume/integration risk |
| P0 meaningful choice | Two equal native buttons in an in-flow footer details control, localized status, no navigation gate; preferences can be reopened anywhere | AnalyticsConsent.astro; Footer.astro; EN/FR screenshots; keyboard/axe tests | Implemented; low layout risk, reduced collection expected |
| P0 policy disclosure | Purposes, optional visits/scrolls/clicks, identifiers, provider/hosting/retailer processing, withdrawal, device preferences and contact requirement | privacy.astro; fr-privacy.json; FR route/translation integration | Implemented draft; owner review still required, high publication risk if incomplete |
| P1 optional event tracking | Existing validated affiliate/source metadata queues only in permitted documents; native navigation does not wait for GA | affiliate-analytics.ts; tracking-focused regression suites choose permission explicitly | Implemented; medium event-count risk |
| P1 persistence / withdrawal | Versioned timestamped choice expires after 180 days; stale/malformed/unavailable permission fails closed; revocation disables GA, removes accessible _ga cookies and reloads to unload third-party listeners; cross-tab revocation and storage clearing supported | analytics-consent.ts; parser tests and privacy browser tests | Implemented; medium browser-storage/race risk |

Only analytics storage is granted. Advertising storage, ad user data and ad personalization stay denied; Google signals and ad personalization signals are disabled in tag configuration. A valid saved grant may load GA on a later document; language-redirecting documents do not start it. No pre-permission clicks are replayed after a later grant. Missing JS leaves analytics off and native links available.

Consent storage uses agl-analytics-consent in local/session storage, with version, choice and decision timestamp. Existing agl-language and agl-language-position preferences are independent. A newer tab denial overrides an older persistent grant. When persistence is unavailable, a choice applies to that document and may not survive navigation. Browser storage failure never implies permission.

GA4 remains G-YFJJ5N9RBX; Search Console verification is preserved. One Google loader/config is created per permitted document; only automatic GA page views are configured, with no extra manual page_view. Configured page location/referrer and custom event URLs omit query strings/fragments. This is data minimization in site-supplied parameters, not a promise that all third-party processing is anonymous. Visitors must not place personal information in URLs.

## Disclosure requirements and legal uncertainty

Google Analytics terms require an appropriate published privacy explanation of the integration, cookies/identifiers, data processing and consent where legally required. The policy draft addresses those topics. [Google Analytics terms, section 7](https://marketingplatform.google.com/about/analytics/terms/us/).

Canadian meaningful-consent guidance emphasizes understandable purposes, information collected, recipients, relevant choices and withdrawal. The precise federal/provincial regime and appropriate legal consent form depend on the operator and processing context; the operator's province, business arrangements and legal applicability have not been established here. All-visitor opt-in is the owner's confirmed product choice, not a claim that every Canadian visit has an identical statutory rule. [Office of the Privacy Commissioner guidance](https://www.priv.gc.ca/en/privacy-topics/privacy-for-businesses/appropriate-handling-of-personal-information/collecting-personal-information-and-consent/consent/gl_omc_201805/).

Google distinguishes basic blocking from advanced consent mode, which can send cookieless requests with denied storage. This implementation blocks the Google tag until permission. [Google consent-mode concepts](https://developers.google.com/tag-platform/security/concepts/consent-mode).

Google documents first-party _ga and _ga_ID cookies and configurable lifetimes. The site sets 180-day nonrenewing expiry; browser limits may shorten it. [Google cookie documentation](https://support.google.com/analytics/answer/11397207?hl=en-GB).

A private contact channel, responsible operator and account retention/access settings still require owner confirmation. No GA4 admin, Search Console, legal sign-off or account-side deletion/retention audit was performed. No declaration of PIPEDA, Quebec, Alberta or BC compliance is made.

## Runtime evidence and limits

[consent-google-runtime.json](evidence/consent-google-runtime.json) records a fresh Chromium localhost context using the actual Google loader after the UI choice. Before permission: zero external requests, zero GA cookies. After permission: one loader, _ga and _ga_YFJJ5N9RBX with about 180 days remaining; page_view, scroll and affiliate_click requests attempted. Google collection and fallback endpoints, and retailer navigation, were blocked in that probe. These observations prove local tag behavior, not ingestion into the private GA4 property. Cookie values/client identifiers are omitted.

Withdrawal produced zero subsequent external attempts in the observed reload window and zero GA cookies. Automated Chromium and WebKit tests cover default/rejection, persistence, EN/FR, withdrawal, cross-tab behavior, invalid/expired records, storage failure, native affiliate links, no-JS, keyboard behavior and automated accessibility. The final validation report gives exact pass counts and reruns.

The earlier baseline probe intercepted google-analytics.com and analytics.google.com but missed a www.google.com/g/collect fallback. A request was attempted; delivery/account ingestion is unknown. Its evidence note was corrected and synthetic identifiers minimized. It must not be described as zero analytics pollution. The later isolated probe blocks all nonlocal destinations except the Google script host.

## Owner decisions before publication

1. Designate and approve a verified private business contact method for privacy requests; no personal contact details or public issue submissions are proposed.
2. Review EN/FR policy accuracy, responsible operator/jurisdiction and actual GA4 retention/access configuration. Actual scroll measurement was observed and is disclosed.
3. Approve a concrete final privacy text and separately authorize publication/deployment. Until then this work stays local, and the policy draft stays noindex.

Deployment risk is moderate for analytics reporting because opt-in intentionally reduces event volume and changes the measurement population. Existing destinations and site access remain independent. Withdrawal cannot undo information Google already received. A real iPhone, field metrics, admin-side reports and production behavior after deployment remain unverified.
