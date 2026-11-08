# GA4 settings the owner must verify

**Status: UNVERIFIED.** The owner confirmed that retention and sharing have not been checked. No private GA4 administration session was inspected, and no account setting or linked service was changed. The source code cannot establish these account facts.

Start in Google Analytics → Admin. Select the property whose website stream has measurement ID **G-YFJJ5N9RBX** and the ApocalypseGearLab website URL. Property IDs and measurement IDs differ; confirm the stream rather than guessing from a property name. Record the date and observed settings for the following checks. Do not supply passwords or publish screenshots containing private account/user details.

## 1. Retention and renewal

In Admin → property → **Data retention** (under Data collection and modification in current navigation; older labels: Data Settings → Data Retention), record:

- Event/user data retention: the actual selected period, without assuming a default.
- **Reset user data on new activity:** on or off.

This setting is separate from browser-cookie expiry and the site’s 180-day preference lifetime. It does not place the same limit on standard aggregated reports; exported copies need their own retention review. The site’s cookie_update:false setting also does not prove that account-side reset is off. [Google retention documentation](https://support.google.com/analytics/answer/7667196?hl=en).

## 2. Account data sharing

In Admin → Account → **Account details**, record each data-sharing option as on/off:

| Option | Observed state |
|---|---|
| Google products & services | UNVERIFIED |
| Modeling contributions & business insights | UNVERIFIED |
| Technical support | UNVERIFIED |
| Recommendations for your business | UNVERIFIED |

These account controls affect Google’s use/access and are distinct from the website’s advertising-consent flags. [Google data-sharing documentation](https://support.google.com/analytics/answer/1011397?hl=en).

## 3. Linked products, exports and Google-tag destinations

In Admin → property → **Product links**, inspect every listed integration, including Google Ads and BigQuery if present. Record what is linked, what data is exported/shared, the receiving purpose/access and any export retention. A Search Console verification meta tag does not prove a product link exists. [Google product-links documentation](https://support.google.com/analytics/answer/6002761?hl=en).

Also open Admin → Data streams → the website stream → **Google tag settings / Manage Google tag** and inspect its destinations. Confirm whether any destination beyond the intended GA4 stream receives this tag’s data. Code containing one GA4 ID is not proof that remote destinations are absent. [Google tag configuration](https://support.google.com/analytics/answer/12131703).

## 4. Automatic measurement

Open Admin → Data streams → the website stream → **Enhanced measurement** → settings gear. Record page/history views, scrolls, outbound clicks, site search, form interactions, video engagement and file downloads. Also inspect the tag’s **Manage automatic event detection** options.

In particular, establish whether automatic outbound click events duplicate the custom affiliate_click event, and whether automatic search/form measurements collect data beyond the policy’s described processing. The site strips query strings from its configured page/referrer and custom-event URLs; that does not prove every remotely enabled automatic parameter is sanitized. Do not claim that extra collection is absent until it is checked. [Google enhanced-measurement documentation](https://support.google.com/analytics/answer/9216061?hl=en).

## 5. Advertising/identifier features and access

Review the property’s Data collection controls and the stream/tag’s user-provided-data capabilities. Record Google-signals/advertising features and any additional identifier or cross-domain configuration. The site code denies ad storage/user-data/personalization and disables Google signals for its configuration; this review has not established the whole account’s settings or other collection sources.

Review the account/property access-management lists and any exported-data access. Record which roles/categories can access data; do not publish their personal email addresses in this repository.

## 6. Reconcile the policy before a future release

Provide the actual values, not an assurance that the defaults are probably unchanged. Review whether each enabled purpose/recipient is necessary and disclosed. Choose any configuration change deliberately; this task has made none. Update policy text only from verified facts, then validate the resulting bytes before approving publication.

Until these checks are complete, the release report marks GA4 retention, sharing, integrations and private access as unverified. Neither a successful browser test nor the supplied privacy-contact approval resolves them.
