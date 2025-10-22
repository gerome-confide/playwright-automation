import { defineConfig, devices } from '@playwright/test';

/**
 * Simplified CI/CD configuration for Playwright tests
 */
export default defineConfig({
  testDir: './tests',
  
  /* CI/CD optimized settings */
  fullyParallel: false,
  workers: 1,
  retries: process.env.CI ? 2 : 0,
  timeout: 60000,
  
  /* Reporter for CI/CD */
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['junit', { outputFile: 'test-results/results.xml' }],
    ['json', { outputFile: 'test-results/results.json' }]
  ],
  
  /* Global test settings */
  use: {
    /* Base URL configuration */
    baseURL: process.env.PRODUCTION_BASE_URL || 'https://app.confideplatform.com',
    
    /* CI/CD optimized settings - Force headless mode */
    headless: true,
    actionTimeout: 30000,
    navigationTimeout: 30000,
    
    /* HTTP Basic auth for all tests */
    httpCredentials: { 
      username: 'admin', 
      password: process.env.HTTP_AUTH_PASSWORD || 'secretstagingv2' 
    },
    
    /* Trace collection for debugging */
    trace: 'retain-on-failure',
    
    /* Screenshot on failure */
    screenshot: 'only-on-failure',
    
    /* Video recording */
    video: 'retain-on-failure',
    
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

  /* Output directory for test results */
  outputDir: 'test-results/',
});
