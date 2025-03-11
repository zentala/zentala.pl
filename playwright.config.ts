import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:4444',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  // Uruchamiamy tylko przeglądarkę Chromium, która jest domyślnie instalowana
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:4444',
    reuseExistingServer: !process.env.CI,
    timeout: 60000, // Zwiększamy timeout na 60 sekund
  },
});