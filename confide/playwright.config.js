import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests sequentially (one at a time) */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Run only 1 worker to ensure sequential execution */
  workers: 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['list'], // Shows detailed test execution in console with pass/fail status
    ['html']  // Generates HTML report for detailed viewing
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* HTTP Basic auth for all tests */
    httpCredentials: { username: 'admin', password: 'secretstagingv2' },

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    headless: process.env.CI ? true : false,
    
    /* Additional settings for Auth0 handling */
    actionTimeout: 30000,
    navigationTimeout: 30000,
    
    /* Ignore HTTPS errors (sometimes needed for Auth0) */
    ignoreHTTPSErrors: true,
    
    /* User agent to avoid bot detection */
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  },

  /* Configure projects for Chrome only */
  projects: [
    // Production Tests - Run First
    {
      name: 'production-chrome',
      testMatch: '**/Production/**/*.spec.js',
      use: { 
        ...devices['Desktop Chrome'],
        // Production-specific settings
        baseURL: 'https://app.confideplatform.com',
      },
    },

    // Staging Tests - Run After Production
    {
      name: 'staging-chrome',
      testMatch: '**/Staging/**/*.spec.js',
      use: { 
        ...devices['Desktop Chrome'],
        // Staging-specific settings
        baseURL: 'https://staging.confideplatform.com',
      },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
