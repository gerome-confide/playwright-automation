/**
 * HomePage class for handling homepage functionality
 * @param {import('@playwright/test').Page} page - Playwright page object
 */
export class HomePage {
  /**
   * @param {import('@playwright/test').Page} page - Playwright page object
   */
  constructor(page) {
    this.page = page;

   this.adminButton = page.locator('#admin-tab');
   this.logoutButton = page.locator("//p[text()='Logout'][1]");

  }

  /**
   * Clicks the logout button
   * @returns {Promise<void>}
   */
  async clickLogout() {
    try {
      await this.logoutButton.click();
    } catch (error) {
      throw new Error(`Cannot Click Admin Button ${error.message}`);
    }
  } 



}