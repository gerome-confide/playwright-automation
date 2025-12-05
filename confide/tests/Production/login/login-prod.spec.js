import { test } from '@playwright/test';
import { LoginPage } from '../../../pages/Loginpage';
import { commonResources } from '../../../resources/commons/commonResources';
import {HomePage} from '../../../pages/Homepage';

//Login Credentials
import { loginCredentials } from '../../../resources/test-data/login-credentials';

test.describe.serial('Login Scenario Production', () => {
  let context;
  let page;
  let commonresource;

  test.beforeEach(async ({ browser }) => {
    // create a single browser context & page that will be shared by tests
    context = await browser.newContext({
      // Clear any existing cookies/session data
      storageState: undefined
    });
    page = await context.newPage();
    commonresource = new commonResources(page);

    // Add console logging to debug
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', error => console.log('PAGE ERROR:', error.message));

    // navigate once (adjust URL as needed)
    await page.goto('https://app.confideplatform.com/customer/login', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
  });

  test.afterEach(async () => {
    // Close browser after each test (only if still open)
    try {
      if (page && !page.isClosed()) {
        await page.close();
      }
    } catch (error) {
      console.log('Error closing page:', error.message);
    }
    
    try {
      if (context) {
        await context.close();
      }
    } catch (error) {
      console.log('Error closing context:', error.message);
    }
  });

  test.afterAll(async () => {
    // Additional cleanup if needed
    console.log('All tests completed');
  });

  test('Login as User', async () => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    await test.step('Click Admin Button', async () => {
      await loginPage.clickAdminButton();
    });

    await test.step('Input Username', async () => {
      await loginPage.inputUserName(loginCredentials.productionLoginAdmin.email);
    });

    await test.step('Input Password', async () => {
      await loginPage.inputPassword(loginCredentials.productionLoginAdmin.password);
    });

    await test.step('Proceed to Login', async () => {
      await loginPage.clickLoginButton();
      
      // Wait for navigation to complete (handles Auth0 redirects)
      await page.waitForLoadState('networkidle', { timeout: 30000 });
      
      // Take screenshot for debugging
      await page.screenshot({ path: 'debug-after-login.png' });
      
      // Log current URL for debugging
      console.log('Current URL after login:', page.url());
    });

    await test.step('Wait for Dashboard URL to Load', async () => {
      try {
        // Use longer timeout for CI environments
        const isCI = process.env.CI === 'true' || process.env.GITHUB_ACTIONS === 'true';
        const timeout = isCI ? 60000 : 30000;
        
        // Wait for either the dashboard or handle Auth0 redirect
        await Promise.race([
          page.waitForURL('https://app.confideplatform.com/customer*', { timeout }),
          page.waitForURL('**/auth0.com/**', { timeout })
        ]);
        
        const currentUrl = page.url();
        console.log('Final URL:', currentUrl);
        
        if (currentUrl.includes('auth0.com')) {
          throw new Error(`Redirected to Auth0: ${currentUrl}`);
        }
        
        // Additional wait to ensure page is fully loaded
        await page.waitForLoadState('domcontentloaded');
        
      } catch (error) {
        console.log('URL wait failed:', error.message);
        await page.screenshot({ path: 'debug-url-wait-failed.png' });
        throw error;
      }
    });

    
  });

  test('Login as Reporter', async () => {
    const loginPage = new LoginPage(page);

    await test.step('Click Reporter Button', async () => {
      await loginPage.clickReporterButton();
    });

    await test.step('Click Email and Password Button', async () => {
      await loginPage.clickEmailPasswordButton();
    });

    await test.step('Input Username', async () => {
      await loginPage.inputReporterUserName(loginCredentials.productionLoginReporter.email);
    });

    await test.step('Input Password', async () => {
      await loginPage.inputReporterPassword(loginCredentials.productionLoginReporter.password);
    });

    await test.step('Proceed to Login', async () => {
      await loginPage.clickReporterLoginButton();
    });

    await test.step('Wait for Dashboard URL to Load', async () => {
      // Use longer timeout for CI environments
      await commonresource.waitForURLToBeLoaded('https://app.confideplatform.com/customer', 60000);
    });
  });

  test('Login Using private Key', async () => {
    const loginPage = new LoginPage(page);

    await test.step('Click private Key Button', async () => {
      await loginPage.clickInputReporterKey();
    });

   await test.step('Input Private Key', async () => {
      await loginPage.inputPrivateKey(loginCredentials.productionLoginPrivateKey.privateKey);
    });

    await test.step('Click Login with private key', async () => {
      await loginPage.clickPrivateKeyLogin();
    });

    await test.step('Wait for Dashboard URL to Load', async () => {
      // Use longer timeout for CI environments (inbox may take longer to load)
      await commonresource.waitForURLToBeLoaded('https://app.confideplatform.com/inbox', 60000);
    });
  });
});