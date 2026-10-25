import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/browser',
  fullyParallel: true,
  workers: 2,
  use: { baseURL: 'http://127.0.0.1:4321', browserName: 'chromium', screenshot: 'only-on-failure' },
  webServer: [
    { command: 'npm run preview -- --host 127.0.0.1 --port 4321', url: 'http://127.0.0.1:4321', reuseExistingServer: false },
    { command: 'npm run dev -- --host 127.0.0.1 --port 4322', url: 'http://127.0.0.1:4322', reuseExistingServer: false },
  ],
});
