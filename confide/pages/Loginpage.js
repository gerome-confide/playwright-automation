/**
 * LoginPage class for handling login functionality
 * @param {import('@playwright/test').Page} page - Playwright page object
 */
export class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page - Playwright page object
   */
  constructor(page) {
    this.page = page;

   this.adminButton = page.locator('#admin-tab');
    this.reporterButton = page.locator('#reporter-tab');
    this.emailPasswordButton = page.locator('#reporter-email-password-button');
    this.ssoButton = page.locator('#reporter-sso-button');
    this.emailInput = page.locator('#admin-email');
    this.passwordInput = page.locator('#admin-password');
    this.loginPasswordButton = page.locator('#admin-login-email-password-submit-button');

    //Reporter Locators 
    this.emailReporterInput = page.locator('#reporter-email');
    this.passwordReporterInput = page.locator('#reporter-password');
    this.reporterrLoginButton = page.locator('#reporter-login-email-password-submit-button');

    //Private Key Locator
    this.privateKeyInput = page.locator('#reporter-private-key-button');
    this.inputPrivateKeyfield = page.locator('#private-key');
    this.loginPrivateKeyBtn = page.locator('#reporter-login-private-key-btn');
  }

  /**
   * Clicks the admin button
   * @returns {Promise<void>}
   */
  async clickAdminButton() {
    try {
      await this.adminButton.click();
    } catch (error) {
      throw new Error(`Cannot Click Admin Button ${error.message}`);
    }
  } 

  async clickReporterButton() {
    try {
      await this.reporterButton.click();
    } catch (error) {
      throw new Error(`Cannot Click Reporter Button ${error.message}`);
    }
  } 

  async clickEmailPasswordButton() {
    try {
      await this.emailPasswordButton.click();
    } catch (error) {
      throw new Error(`Cannot Click email and password Button ${error.message}`);
    }
  } 

  /**
   * Inputs username in the email field
   * @param {string} username - The username to input
   * @returns {Promise<void>}
   */
  async inputUserName(username) {
    try {
      await this.emailInput.fill(username);
    } catch (error) {
      throw new Error(`Cannot Input Username: ${error.message}`);
    }
  }

   async inputPassword(password) {
    try {
      await this.passwordInput.fill(password);
    } catch (error) {
      throw new Error(`Cannot Input password: ${error.message}`);
    }
  }
  async clickLoginButton() {
    try {
      await this.loginPasswordButton.click();
    } catch (error) {
      throw new Error(`Login Button not found: ${error.message}`);
    }   

}
  //Reporter Inputs
   async inputReporterUserName(username) {
    try {
      await this.emailReporterInput.fill(username);
    } catch (error) {
      throw new Error(`Cannot Input Username: ${error.message}`);
    }
  }

   async inputReporterPassword(password) {
    try {
      await this.passwordReporterInput.fill(password);
    } catch (error) {
      throw new Error(`Cannot Input password: ${error.message}`);
    }
  }

  async clickReporterLoginButton() {
    try {
      await this.reporterrLoginButton.click();
    } catch (error) {
      throw new Error(`Cannot Click Reporter Button ${error.message}`);
    }
  } 

  //Private Key Inputs
   async clickInputReporterKey() {
    try {
      await this.privateKeyInput.click();
    } catch (error) {
      throw new Error(`Cannot Click Reporter Button ${error.message}`);
    }
  } 

  async inputPrivateKey(privateKey) {
    try {
      await this.inputPrivateKeyfield.fill(privateKey);
    } catch (error) {
      throw new Error(`Cannot Click Reporter Button ${error.message}`);
    }
  } 

   async clickPrivateKeyLogin() {
    try {
      await this.loginPrivateKeyBtn.click();
    } catch (error) {
      throw new Error(`Cannot Click Reporter Button ${error.message}`);
    }
  } 
  
}