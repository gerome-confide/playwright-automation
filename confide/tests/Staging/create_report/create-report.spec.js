import { test } from '@playwright/test';
import { HomePage } from '../../../pages/Homepage';
import { commonResources } from '../../../resources/commons/commonResources';
import { BaseLogin } from '../../../resources/utils/auth/baseLogin';

test.describe.serial('Create Report Scenario Staging', () => {
  let context;
  let page;
  let commonresource;
  let baseLogin;

  test.beforeEach(async ({ browser }) => {
    // create a single browser context & page that will be shared by tests
    context = await browser.newContext({
      // Clear any existing cookies/session data
      storageState: undefined
    });
    page = await context.newPage();
    commonresource = new commonResources(page);
    baseLogin = new BaseLogin(page, commonresource);

    // Add console logging to debug
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
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

  test('Create Health and Safety Report', async () => {
    const homePage = new HomePage(page);

    await test.step('Login as Admin', async () => {
      await baseLogin.performAdminLogin('staging');
    });

    await test.step('Select Workflow from Dropdown', async () => {
      await homePage.selectWorkFlowFromDropdown('Health and safety');
    });

    await test.step('Click Reports Menu', async () => {
      await homePage.navigateToCreateReportPage();
    });

    // Add your create report test steps here
    await test.step('Create Report', async () => {
      // TODO: Add your create report logic here
    });

    await test.step('Click Logout Button', async () => {
      await homePage.clickLogout();
    });
  });
  
  test('Create Anti-Money Laundering Report', async () => {
    const homePage = new HomePage(page);

    await test.step('Login as Admin', async () => {
      await baseLogin.performAdminLogin('staging');
    });

    await test.step('Select Workflow from Dropdown', async () => {
      await homePage.selectWorkFlowFromDropdown('Anti-money laundering');
    });

    
    await test.step('Click Reports Menu', async () => {
      await homePage.navigateToCreateReportPage();
    });
    // Add your create report test steps here
    await test.step('Create Report', async () => {
      // TODO: Add your create report logic here
    });

    await test.step('Click Logout Button', async () => {
      await homePage.clickLogout();
    });
  });

});
