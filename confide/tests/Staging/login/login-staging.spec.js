import { test } from '@playwright/test';
import { LoginPage } from '../../../pages/Loginpage';
import { HomePage } from '../../../pages/Homepage';
import { commonResources } from '../../../resources/commons/commonResources';
import { LoginPageAssertions } from '../../../resources/assertions/login-page-assertions';

//Login Credentials
import { loginCredentials } from '../../../resources/test-data/login-credentials';

test.describe.serial('Login Scenario Staging', () => {
  let context;
  let page;
  let commonresource;
  let loginPageAssertions;

  test.beforeEach(async ({ browser }) => {
    // create a single browser context & page that will be shared by tests
    context = await browser.newContext({
      // Clear any existing cookies/session data
      storageState: undefined
    });
    page = await context.newPage();
    commonresource = new commonResources(page);
    loginPageAssertions = new LoginPageAssertions(page);

    // Add console logging to debug
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', error => console.log('PAGE ERROR:', error.message));

    // navigate once (adjust URL as needed)
    await page.goto('https://app.stgv2.confide.solutions/customer/login', { 
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
    console.log('All staging tests completed');
  });

  test('Login as User', async () => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    await test.step('Click Admin Button', async () => {
      await loginPage.clickAdminButton();
    });

    await test.step('Input Username', async () => {
      await loginPage.inputUserName(loginCredentials.stagingLoginAdmin.email);
    });

    await test.step('Input Password', async () => {
      await loginPage.inputPassword(loginCredentials.stagingLoginAdmin.password);
    });

    await test.step('Proceed to Login', async () => {
      await loginPage.clickLoginButton();
    });

    await test.step('Wait for Dashboard URL to Load', async () => {
      // Use longer timeout for CI environments
      await commonresource.waitForURLToBeLoaded('https://app.stgv2.confide.solutions/customer', 60000);
    });

    await test.step('Click Logout Button', async () => {
      await homePage.clickLogout();
    });
  });

  test('Login as Reporter', async () => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    await test.step('Click Reporter Button', async () => {
      await loginPage.clickReporterButton();
    });

    await test.step('Click Email and Password Button', async () => {
      await loginPage.clickEmailPasswordButton();
    });

    await test.step('Input Username', async () => {
      await loginPage.inputReporterUserName(loginCredentials.stagingLoginReporter.email);
    });

    await test.step('Input Password', async () => {
      await loginPage.inputReporterPassword(loginCredentials.stagingLoginReporter.password);
    });

    await test.step('Proceed to Login', async () => {
      await loginPage.clickReporterLoginButton();
    });

    await test.step('Wait for Dashboard URL to Load', async () => {
      // Use longer timeout for CI environments
      await commonresource.waitForURLToBeLoaded('https://app.stgv2.confide.solutions/customer', 60000);
    });

    await test.step('Click Logout Button', async () => {
      await homePage.clickLogout();
    });
  });

   test('Login Using private Key', async () => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    await test.step('Click private Key Button', async () => {
      await loginPage.clickInputReporterKey();
    });

   await test.step('Input Private Key', async () => {
      await loginPage.inputPrivateKey(loginCredentials.stagingLoginPrivateKey.privateKey);
    });

    await test.step('Click Login with private key', async () => {
      await loginPage.clickPrivateKeyLogin();
    });

    await test.step('Wait for Dashboard URL to Load', async () => {
      // Wait for inbox URL with longer timeout and pattern matching
      await commonresource.waitForURLToBeLoaded('https://app.stgv2.confide.solutions/inbox', 60000);
    });

    await test.step('Click Menu Button', async () => {
      await homePage.clickBurgerButton();
    });

    await test.step('Click Logout Button', async () => {
      await homePage.clickLogout();
    });

  });

  test('Login as using blank credentials', async () => {
    const loginPage = new LoginPage(page);

    await test.step('Click Admin Button', async () => {
      await loginPage.clickAdminButton();
    });

    await test.step('Proceed to Login', async () => {
      await loginPage.clickLoginButton();
      
      // Wait a bit to see if we stay on login page or get redirected
      await page.waitForTimeout(2000);
      
      // Check if we got redirected (if so, navigate back)
      const currentUrl = page.url();
      if (!currentUrl.includes('/customer/login')) {
        console.log(`Warning: Redirected to ${currentUrl}, navigating back to login page`);
        await page.goto('https://app.stgv2.confide.solutions/customer/login', {
          waitUntil: 'networkidle',
          timeout: 30000
        });
        await loginPage.clickAdminButton();
        await loginPage.clickLoginButton();
        await page.waitForTimeout(2000);
      }
    });
   
    await test.step('Wait for Error Messages to Appear', async () => {    
      // Use longer timeout for CI environments
      const timeout = process.env.CI ? 15000 : 10000;
      await loginPageAssertions.waitForErrorMessages(timeout);
    });

    await test.step('Validate Email Error Message', async () => {
      // Use longer timeout for CI environments
      const timeout = process.env.CI ? 20000 : 15000;
      await loginPageAssertions.validateEmailErrorMessageIsDisplayed('Email is required', 'admin', timeout);
    });

    await test.step('Validate Password Error Message', async () => {
      // Use longer timeout for CI environments
      const timeout = process.env.CI ? 20000 : 15000;
      await loginPageAssertions.validatePasswordErrorMessageIsDisplayed('Password is required', 'admin', timeout);
    });
  });

  test('Login user invalid credentials', async () => {
    const loginPage = new LoginPage(page);

    await test.step('Click Admin Button', async () => {
      await loginPage.clickAdminButton();
    });

    await test.step('Input Username', async () => {
      await loginPage.inputUserName(loginCredentials.stagingInvalidCredentials.email);
    });

    await test.step('Input Password', async () => {
      await loginPage.inputPassword(loginCredentials.stagingInvalidCredentials.password);
    });

    await test.step('Proceed to Login', async () => {
      await loginPage.clickLoginButton();
    });
   
    await test.step('Wait for Error Messages to Appear', async () => {    
      await loginPageAssertions.waitForErrorMessages();
    });

    await test.step('Validate Error Message', async () => {
      await loginPageAssertions.validateInvalidCredentialsErrorMessageIsDisplayed('Wrong email or password.');
    });

  });

});
