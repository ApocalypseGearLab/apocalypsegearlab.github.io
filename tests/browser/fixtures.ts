import { test as base } from '@playwright/test';
import type { BrowserContext } from '@playwright/test';
export { expect } from '@playwright/test';

export const blockAnalytics = (context: BrowserContext) => context.route(
  /^https:\/\/([^/]+\.)?(google-analytics\.com|googletagmanager\.com|google\.com|doubleclick\.net)\//,
  route => route.abort('blockedbyclient'));

// Regression QA must not create hundreds of real page views or affiliate events.
// The separate, opt-in network audit uses unmocked Google requests.
export const test = base.extend<{ isolateAnalytics: void; analyticsPermission: boolean }>({
  analyticsPermission: [false, { option: true }],
  isolateAnalytics: [async ({ context, analyticsPermission }, use) => {
    if (analyticsPermission) await context.addInitScript(() => {
      const record = JSON.stringify({ version: 1, choice: 'granted', updatedAt: Date.now() });
      localStorage.setItem('agl-analytics-consent', record);
    });
    await blockAnalytics(context);
    await use();
  }, { auto: true }],
});
