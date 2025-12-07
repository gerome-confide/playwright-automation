import { defineConfig, devices } from '@playwright/test';

/**
 * CI/CD specific Playwright configuration
 * This configuration is optimized for continuous integration environments
 */
export default defineConfig({
  testDir: './tests',
  
  /* CI/CD optimized settings */
  fullyParallel: false,
  workers: process.env.CI ? 1 : 1,
  retries: process.env.CI ? 2 : 0,
  timeout: process.env.CI ? 60000 : 30000,
  
  /* Reporter for CI/CD */
  reporter: process.env.CI ? [
    ['list'], // Shows detailed test execution in console with pass/fail status
    ['html', { outputFolder: 'playwright-report' }],
    ['junit', { outputFile: 'test-results/results.xml' }],
    ['json', { outputFile: 'test-results/results.json' }]
  ] : [
    ['list'], // Shows detailed test execution in console with pass/fail status
    ['html']  // Generates HTML report for detailed viewing
  ],
  
  /* Global test settings */
  use: {
    /* Base URL configuration */
    baseURL: process.env.PRODUCTION_BASE_URL || 'https://app.confideplatform.com',
    
    /* CI/CD optimized settings */
    headless: process.env.CI ? true : false,
    actionTimeout: 30000,
    navigationTimeout: 30000,
    
    /* HTTP Basic auth for all tests */
    httpCredentials: { 
      username: 'admin', 
      password: process.env.HTTP_AUTH_PASSWORD || 'secretstagingv2' 
    },
    
    /* Trace collection for debugging */
    trace: process.env.CI ? 'retain-on-failure' : 'on-first-retry',
    
    /* Screenshot on failure */
    screenshot: 'only-on-failure',
    
    /* Video recording */
    video: process.env.CI ? 'retain-on-failure' : 'off',
    
    /* Additional CI settings */
    ignoreHTTPSErrors: true,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  },

  /* Environment-specific projects */
  projects: [
    // Production Tests
    {
      name: 'production-chrome',
      testMatch: '**/Production/**/*.spec.js',
      use: { 
        ...devices['Desktop Chrome'],
        baseURL: process.env.PRODUCTION_BASE_URL || 'https://app.confideplatform.com',
      },
    },

    // Staging Tests
    {
      name: 'staging-chrome',
      testMatch: '**/Staging/**/*.spec.js',
      use: { 
        ...devices['Desktop Chrome'],
        baseURL: process.env.STAGING_BASE_URL || 'https://app.stgv2.confide.solutions',
      },
    },
  ],

  /* Global setup and teardown */
  // globalSetup: require.resolve('./global-setup.js'),
  // globalTeardown: require.resolve('./global-teardown.js'),

  /* Output directory for test results */
  outputDir: 'test-results/',
  
  /* Web server configuration (if needed) */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

