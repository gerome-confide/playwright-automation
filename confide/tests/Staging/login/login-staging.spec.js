import { test } from '@playwright/test';
import { LoginPage } from '../../../pages/Loginpage';
import { commonResources } from '../../../resources/commons/commonResources';

//Login Credentials
import { loginCredentials } from '../../../resources/test-data/login-credentials';

test.describe.serial('Login Scenario Staging', () => {
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
    await page.goto('https://app.stgv2.confide.solutions/customer/login', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
  });

  test.afterEach(async () => {
    // Close browser after each test
    await page.close();
    await context.close();
  });

  test.afterAll(async () => {
    // Additional cleanup if needed
    console.log('All staging tests completed');
  });

  test('Login as User', async () => {
    const loginPage = new LoginPage(page);

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
      await commonresource.waitForURLToBeLoaded('https://app.stgv2.confide.solutions/customer');
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
      await loginPage.inputReporterUserName(loginCredentials.stagingLoginReporter.email);
    });

    await test.step('Input Password', async () => {
      await loginPage.inputReporterPassword(loginCredentials.stagingLoginReporter.password);
    });

    await test.step('Proceed to Login', async () => {
      await loginPage.clickReporterLoginButton();
    });

    await test.step('Wait for Dashboard URL to Load', async () => {
      await commonresource.waitForURLToBeLoaded('https://app.stgv2.confide.solutions/customer');
    });
  });

   test('Login Using private Key', async () => {
    const loginPage = new LoginPage(page);

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
      await commonresource.waitForURLToBeLoaded('https://app.stgv2.confide.solutions/inbox');
    });
  });

});