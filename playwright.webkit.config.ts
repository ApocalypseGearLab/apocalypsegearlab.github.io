import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/webkit',
  fullyParallel: true,
  workers: 2,
  use: {
    ...devices['iPhone 13'],
    browserName: 'webkit',
    reducedMotion: 'reduce',
    baseURL: 'http://127.0.0.1:4321',
    screenshot: 'only-on-failure',
  },
  projects: [320, 375, 390].map(width => ({
    name: `webkit-iphone-${width}`,
    use: { viewport: { width, height: 844 }, screen: { width, height: 844 } },
  })),
  webServer: {
    command: 'npm run preview -- --host 127.0.0.1 --port 4321',
    url: 'http://127.0.0.1:4321',
    reuseExistingServer: false,
  },
});
