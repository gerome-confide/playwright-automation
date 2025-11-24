/**
 * LoginPageAssertions class for login page validation
 * @param {import('@playwright/test').Page} page - Playwright page object
 */
export class LoginPageAssertions {
  /**
   * @param {import('@playwright/test').Page} page - Playwright page object
   */
  constructor(page) {
    this.page = page;

    // Admin form error messages (scoped to admin form)
    this.adminEmailErrorMessage = page.locator('#admin-email-password-form #blank-email-error').first();
    this.adminPasswordErrorMessage = page.locator('#admin-email-password-form #blank-password-error').first();
    
    // Reporter form error messages (scoped to reporter form)
    this.reporterEmailErrorMessage = page.locator('#reporter-email-password-form #blank-email-error').first();
    this.reporterPasswordErrorMessage = page.locator('#reporter-email-password-form #blank-password-error').first();
    
    // Generic error messages (for backward compatibility, uses first match)
    this.blankEmailErrorMessage = page.locator('#blank-email-error').first();
    this.blankPasswordErrorMessage = page.locator('#blank-password-error').first();

    this.invalidCredentialsErrorMessage = page.locator('#error-message').first();
  }

  async validateEmailErrorMessageIsDisplayed(expectedText, formType = 'admin') {
    try {
      // Use form-specific locator to avoid strict mode violation
      const emailErrorLocator = formType === 'admin' 
        ? this.adminEmailErrorMessage 
        : this.reporterEmailErrorMessage;
      
      // Wait for the error message to be visible
      await emailErrorLocator.waitFor({ state: 'visible', timeout: 10000 });
      
      // Get the text content from the locator
      const actualText = await emailErrorLocator.textContent();
      
      // Compare with expected text (normalize whitespace)
      const normalizedActual = actualText.trim().replace(/\s+/g, ' ');
      const normalizedExpected = expectedText.trim().replace(/\s+/g, ' ');
      
      if (normalizedActual !== normalizedExpected) {
        throw new Error(`Expected error message "${expectedText}" but got "${actualText}"`);
      }
    } catch (error) {
      throw new Error(`Email error message validation failed: ${error.message}`);
    }
  }

  async validatePasswordErrorMessageIsDisplayed(expectedText, formType = 'admin') {
    try {
      // Use form-specific locator to avoid strict mode violation
      const passwordErrorLocator = formType === 'admin' 
        ? this.adminPasswordErrorMessage 
        : this.reporterPasswordErrorMessage;
      
      // Wait for the error message to be visible
      await passwordErrorLocator.waitFor({ state: 'visible', timeout: 10000 });
      
      // Get the text content from the locator
      const actualText = await passwordErrorLocator.textContent();
      
      // Compare with expected text (normalize whitespace)
      const normalizedActual = actualText.trim().replace(/\s+/g, ' ');
      const normalizedExpected = expectedText.trim().replace(/\s+/g, ' ');
      
      if (normalizedActual !== normalizedExpected) {
        throw new Error(`Expected error message "${expectedText}" but got "${actualText}"`);
      }
    } catch (error) {
      throw new Error(`Password error message validation failed: ${error.message}`);
    }
  }

  async validateInvalidCredentialsErrorMessageIsDisplayed(expectedText) {
    try {
      // Wait for the error message to be visible
      await this.invalidCredentialsErrorMessage.waitFor({ state: 'visible', timeout: 10000 });
      
      // Get the text content from the locator
      const actualText = await this.invalidCredentialsErrorMessage.textContent();
      
      // Compare with expected text (normalize whitespace)
      const normalizedActual = actualText.trim().replace(/\s+/g, ' ');
      const normalizedExpected = expectedText.trim().replace(/\s+/g, ' ');
      
      if (normalizedActual !== normalizedExpected) {
        throw new Error(`Expected error message "${expectedText}" but got "${actualText}"`);
      }
    } catch (error) {
      throw new Error(`Invalid credentials error message validation failed: ${error.message}`);
    }
  }


  async isRedirectedToAuth0() {
    try {
      const currentUrl = this.page.url();
      return currentUrl.includes('auth0.com');
    } catch (error) {
      return false;
    }
  }

  async waitForErrorMessages(timeout = 5000, formType = 'admin') {
    try {
      // Check if we're being redirected away from login page
      const currentUrl = this.page.url();
      if (currentUrl.includes('auth0.com')) {
        console.log('Warning: Page redirected to Auth0 before error messages could appear');
        return;
      }
      
      // Use form-specific locators to avoid strict mode violation
      const emailErrorLocator = formType === 'admin' 
        ? this.adminEmailErrorMessage 
        : this.reporterEmailErrorMessage;
      const passwordErrorLocator = formType === 'admin' 
        ? this.adminPasswordErrorMessage 
        : this.reporterPasswordErrorMessage;
      
      // Wait for either error message to appear
      const emailErrorPromise = emailErrorLocator.waitFor({ state: 'visible', timeout }).catch(() => null);
      const passwordErrorPromise = passwordErrorLocator.waitFor({ state: 'visible', timeout }).catch(() => null);
      
      await Promise.race([emailErrorPromise, passwordErrorPromise]);
      
      // Give additional time for both messages to appear
      await this.page.waitForTimeout(1500);
      
      // Check again if we got redirected
      const newUrl = this.page.url();
      if (newUrl.includes('auth0.com')) {
        console.log('Warning: Page redirected to Auth0 after error messages appeared');
      }
    } catch (error) {
      // If no error messages appear, that's okay, we'll handle it in validation
      console.log(`waitForErrorMessages: ${error.message}`);
    }
  }
}
