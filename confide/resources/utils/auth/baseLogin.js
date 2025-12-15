/**
 * Base Login Utility for all tests
 * Provides reusable login functions for Admin, Reporter, and Private Key login methods
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @param {import('../../../resources/commons/commonResources')} commonResources - Common resources instance
 */

import { LoginPage } from '../../../pages/Loginpage';
import { loginCredentials } from '../../test-data/login-credentials';

/**
 * Base login class with methods for different login types
 */
export class BaseLogin {
  /**
   * @param {import('@playwright/test').Page} page - Playwright page object
   * @param {import('../../../resources/commons/commonResources')} commonResources - Common resources instance
   */
  constructor(page, commonResources) {
    this.page = page;
    this.commonResources = commonResources;
    this.loginPage = new LoginPage(page);
  }

  /**
   * Navigates to the login page
   * @param {string} environment - 'staging' or 'production'
   * @returns {Promise<void>}
   */
  async navigateToLoginPage(environment = 'staging') {
    const loginUrls = {
      staging: 'https://app.stgv2.confide.solutions/customer/login',
      production: 'https://app.confideplatform.com/customer/login'
    };

    const url = loginUrls[environment] || loginUrls.staging;
    
    try {
      // Check if we're already on the login page
      const currentUrl = this.page.url();
      if (currentUrl.includes('/customer/login') && currentUrl.includes(environment === 'staging' ? 'stgv2' : 'confideplatform')) {
        console.log('Already on login page, skipping navigation');
        // Still wait for page to be ready
        await this.page.waitForLoadState('domcontentloaded', { timeout: 5000 }).catch(() => {});
        return;
      }

      // Check if page is closed
      if (this.page.isClosed()) {
        throw new Error('Page is closed, cannot navigate to login page');
      }

      // Navigate with domcontentloaded first for faster initial load
      await this.page.goto(url, {
        waitUntil: 'domcontentloaded',
        timeout: 30000
      });
      
      // Then wait for network to be idle (but with shorter timeout to avoid hanging)
      await this.page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {
        // If networkidle times out, that's okay - page might still be loading resources
        console.log('Network idle timeout - continuing anyway');
      });
      
      // Verify we're on the login page
      const finalUrl = this.page.url();
      if (!finalUrl.includes('/login')) {
        console.log(`Warning: Expected login page but current URL is: ${finalUrl}`);
        // If we're not on login page, try to navigate again
        if (!finalUrl.includes('/customer/login')) {
          throw new Error(`Navigation failed - expected login page but got: ${finalUrl}`);
        }
      }
    } catch (error) {
      // If navigation fails, check if we're already on the right page
      const currentUrl = this.page.url();
      if (currentUrl.includes('/customer/login')) {
        console.log('Navigation error but already on login page, continuing...');
        return;
      }

      // If it's a timeout or navigation error, try with load state instead
      if (error.message.includes('timeout') || error.message.includes('Navigation') || error.message.includes('net::')) {
        console.log('Initial navigation failed, retrying with load state...');
        try {
          await this.page.goto(url, {
            waitUntil: 'load',
            timeout: 30000
          });
        } catch (retryError) {
          // If retry also fails, check if we're on login page anyway
          const checkUrl = this.page.url();
          if (checkUrl.includes('/customer/login')) {
            console.log('Retry failed but on login page, continuing...');
            return;
          }
          throw new Error(`Failed to navigate to login page after retry: ${retryError.message}`);
        }
      } else {
        throw error;
      }
    }
  }

  /**
   * Logs in as Admin/User
   * @param {string} environment - 'staging' or 'production'
   * @param {Object} options - Optional parameters
   * @param {string} options.email - Custom email (optional, uses default from credentials if not provided)
   * @param {string} options.password - Custom password (optional, uses default from credentials if not provided)
   * @param {number} options.timeout - Timeout for waiting for dashboard URL (default: 60000)
   * @returns {Promise<void>}
   */
  async loginAsAdmin(environment = 'staging', options = {}) {
    const credentials = environment === 'production' 
      ? loginCredentials.productionLoginAdmin 
      : loginCredentials.stagingLoginAdmin;

    const email = options.email || credentials.email;
    const password = options.password || credentials.password;
    const timeout = options.timeout || 60000;

    const dashboardUrl = environment === 'production'
      ? 'https://app.confideplatform.com/customer'
      : 'https://app.stgv2.confide.solutions/customer';

    await this.loginPage.clickAdminButton();
    await this.loginPage.inputUserName(email);
    await this.loginPage.inputPassword(password);
    
    // Click login button and handle Auth0 redirect
    await this.loginPage.clickLoginButton();
    
    // Wait for either Auth0 redirect or dashboard - handle Auth0 flow
    try {
      // Wait for navigation to start (either Auth0 or dashboard)
      await this.page.waitForLoadState('domcontentloaded', { timeout: 10000 });
      
      // Check if we're redirected to Auth0
      const currentUrl = this.page.url();
      
      if (currentUrl.includes('auth0.com')) {
        // We're on Auth0 - check for error page
        await this.page.waitForTimeout(2000); // Wait for Auth0 page to fully load
        
        // Check for Auth0 error page
        const auth0ErrorPage = this.page.locator('text="Oops!, something went wrong"');
        const isAuth0Error = await auth0ErrorPage.isVisible().catch(() => false);
        
        if (isAuth0Error) {
          // Take screenshot for debugging
          await this.page.screenshot({ path: 'auth0-error-page.png', fullPage: true });
          throw new Error('Auth0 error page detected. Screenshot saved as auth0-error-page.png. This may indicate Auth0 configuration issues or service outage.');
        }
        
        // Wait for Auth0 to redirect back to dashboard
        // Auth0 should automatically redirect after authentication
        await this.page.waitForURL(dashboardUrl + '*', { timeout: timeout }).catch(async () => {
          // If still on Auth0 after timeout, check for errors
          const stillOnAuth0 = this.page.url().includes('auth0.com');
          if (stillOnAuth0) {
            const auth0Error = this.page.locator('text="Oops!, something went wrong"');
            const hasError = await auth0Error.isVisible().catch(() => false);
            if (hasError) {
              await this.page.screenshot({ path: 'auth0-error-timeout.png', fullPage: true });
              throw new Error('Auth0 error page detected after timeout. Screenshot saved as auth0-error-timeout.png');
            }
            throw new Error(`Auth0 redirect timeout - still on Auth0: ${this.page.url()}`);
          }
        });
      } else {
        // Direct redirect to dashboard (no Auth0)
        await this.commonResources.waitForURLToBeLoaded(dashboardUrl, timeout);
      }
    } catch (error) {
      // Check for error page before throwing
      const errorPage = this.page.locator('text="Oops!, something went wrong"');
      const isErrorPage = await errorPage.isVisible().catch(() => false);
      if (isErrorPage) {
        await this.page.screenshot({ path: 'login-error-page.png', fullPage: true });
        throw new Error(`Error page detected during login: ${error.message}. Screenshot saved as login-error-page.png`);
      }
      throw error;
    }
    
    // Wait for page to be fully loaded and authenticated
    await this.page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
    
    // Wait a bit for session/cookies to be properly set
    await this.page.waitForTimeout(1000);
    
    // Final verification - check we're on dashboard and not on error page
    const finalUrl = this.page.url();
    if (finalUrl.includes('/login') || (finalUrl.includes('auth0.com') && !finalUrl.includes('callback'))) {
      throw new Error(`Login failed - still on login/auth page: ${finalUrl}`);
    }
    
    // Check for error page on final destination
    const finalErrorPage = this.page.locator('text="Oops!, something went wrong"');
    const isFinalErrorPage = await finalErrorPage.isVisible().catch(() => false);
    if (isFinalErrorPage) {
      await this.page.screenshot({ path: 'final-error-page.png', fullPage: true });
      throw new Error('Error page appeared after login completion. Screenshot saved as final-error-page.png');
    }
  }

  /**
   * Logs in as Reporter using email and password
   * @param {string} environment - 'staging' or 'production'
   * @param {Object} options - Optional parameters
   * @param {string} options.email - Custom email (optional, uses default from credentials if not provided)
   * @param {string} options.password - Custom password (optional, uses default from credentials if not provided)
   * @param {number} options.timeout - Timeout for waiting for dashboard URL (default: 60000)
   * @returns {Promise<void>}
   */
  async loginAsReporter(environment = 'staging', options = {}) {
    const credentials = environment === 'production'
      ? loginCredentials.productionLoginReporter
      : loginCredentials.stagingLoginReporter;

    const email = options.email || credentials.email;
    const password = options.password || credentials.password;
    const timeout = options.timeout || 60000;

    const dashboardUrl = environment === 'production'
      ? 'https://app.confideplatform.com/customer'
      : 'https://app.stgv2.confide.solutions/customer';

    await this.loginPage.clickReporterButton();
    await this.loginPage.clickEmailPasswordButton();
    await this.loginPage.inputReporterUserName(email);
    await this.loginPage.inputReporterPassword(password);
    await this.loginPage.clickReporterLoginButton();
    
    // Wait for dashboard URL to load
    await this.commonResources.waitForURLToBeLoaded(dashboardUrl, timeout);
  }

  /**
   * Logs in using Private Key
   * @param {string} environment - 'staging' or 'production'
   * @param {Object} options - Optional parameters
   * @param {string} options.privateKey - Custom private key (optional, uses default from credentials if not provided)
   * @param {number} options.timeout - Timeout for waiting for inbox URL (default: 60000)
   * @returns {Promise<void>}
   */
  async loginWithPrivateKey(environment = 'staging', options = {}) {
    const credentials = environment === 'production'
      ? loginCredentials.productionLoginPrivateKey
      : loginCredentials.stagingLoginPrivateKey;

    const privateKey = options.privateKey || credentials.privateKey;
    const timeout = options.timeout || 60000;

    const inboxUrl = environment === 'production'
      ? 'https://app.confideplatform.com/inbox'
      : 'https://app.stgv2.confide.solutions/inbox';

    await this.loginPage.clickInputReporterKey();
    await this.loginPage.inputPrivateKey(privateKey);
    await this.loginPage.clickPrivateKeyLogin();
    
    // Wait for inbox URL to load
    await this.commonResources.waitForURLToBeLoaded(inboxUrl, timeout);
  }

  /**
   * Complete login flow: Navigate to login page and login as Admin
   * @param {string} environment - 'staging' or 'production'
   * @param {Object} options - Optional parameters (same as loginAsAdmin)
   * @returns {Promise<void>}
   */
  async performAdminLogin(environment = 'staging', options = {}) {
    await this.navigateToLoginPage(environment);
    await this.loginAsAdmin(environment, options);
  }

  /**
   * Complete login flow: Navigate to login page and login as Reporter
   * @param {string} environment - 'staging' or 'production'
   * @param {Object} options - Optional parameters (same as loginAsReporter)
   * @returns {Promise<void>}
   */
  async performReporterLogin(environment = 'staging', options = {}) {
    await this.navigateToLoginPage(environment);
    await this.loginAsReporter(environment, options);
  }

  /**
   * Complete login flow: Navigate to login page and login with Private Key
   * @param {string} environment - 'staging' or 'production'
   * @param {Object} options - Optional parameters (same as loginWithPrivateKey)
   * @returns {Promise<void>}
   */
  async performPrivateKeyLogin(environment = 'staging', options = {}) {
    await this.navigateToLoginPage(environment);
    await this.loginWithPrivateKey(environment, options);
  }
}

