import { test as base } from '@playwright/test';
import type { BrowserContext } from '@playwright/test';
export { expect } from '@playwright/test';

export const blockAnalytics = (context: BrowserContext) => context.route(
  /^https:\/\/([^/]+\.)?(google-analytics\.com|googletagmanager\.com)\//,
  route => route.abort('blockedbyclient'));

// Regression QA must not create hundreds of real page views or affiliate events.
// The separate, opt-in network audit uses unmocked Google requests.
export const test = base.extend<{ isolateAnalytics: void }>({
  isolateAnalytics: [async ({ context }, use) => {
    await blockAnalytics(context);
    await use();
  }, { auto: true }],
});
