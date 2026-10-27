import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';

test('actual Astro affiliate markup supports active and pending states without sending Amazon traffic', async ({ page, context }) => {
  // test:products renders these components with a synthetic approved fixture,
  // then restores the real account configuration and rebuilds actual data.
  // Every Amazon navigation is fulfilled locally; no affiliate traffic is sent.
  const externalRequests: string[] = [];
  await context.route('**/*', async route => {
    if (new URL(route.request().url()).hostname.endsWith('amazon.ca')) {
      externalRequests.push(route.request().url());
      await route.fulfill({ status: 200, contentType: 'text/html', body: '<!doctype html><html lang="en"><title>Simulated retailer</title><h1>Simulated retailer destination</h1></html>' });
    } else await route.continue();
  });
  for (const state of ['pending', 'active']) {
    await page.setContent(readFileSync(`.tools/qa/phase4/affiliate-${state}-fixture.html`, 'utf8'));
    const button = page.getByRole('link', { name: /Voir sur Amazon.ca/ });
    await expect(button).toHaveCount(1);
    if (state === 'active') {
      await expect(button).toHaveAttribute('href', 'https://www.amazon.ca/dp/B000000001?tag=apocalypsegear-20');
      await expect(button).toHaveAttribute('target', '_blank');
      await expect(button).toHaveAttribute('rel', 'sponsored nofollow noopener');
      await expect(button).toHaveAccessibleName(/affiliate link, opens in a new tab/);
      await button.focus();
      await expect(button).toBeFocused();
      await expect(page.getByRole('complementary', { name: 'Affiliate disclosure' })).toContainText('As an Amazon Associate I earn from qualifying purchases.');
      const popupPromise = context.waitForEvent('page');
      await page.keyboard.press('Enter');
      const popup = await popupPromise;
      await expect(popup).toHaveURL('https://www.amazon.ca/dp/B000000001?tag=apocalypsegear-20');
      await expect(popup.getByRole('heading', { name: 'Simulated retailer destination' })).toBeVisible();
      expect(await popup.evaluate(() => window.opener === null)).toBe(true);
      await popup.close();
    } else {
      await expect(button).toHaveAttribute('aria-disabled', 'true');
      await expect(button).not.toHaveAttribute('href');
      await expect(button).toContainText('Affiliate eligibility unconfirmed');
      expect(await button.evaluate((el: HTMLElement) => el.tabIndex)).toBe(-1);
      await page.keyboard.press('Tab');
      await expect(button).not.toBeFocused();
    }
  }
  expect(externalRequests).toEqual(['https://www.amazon.ca/dp/B000000001?tag=apocalypsegear-20']);
});
