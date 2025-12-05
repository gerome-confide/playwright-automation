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
   this.burgerButton = page.locator('//button[@aria-label="Toggle sidebar"]');

  }

  async clickLogout() {
    try {
      await this.logoutButton.click();
    } catch (error) {
      throw new Error(`Cannot Click Admin Button ${error.message}`);
    }
  } 

  async clickBurgerButton() {
    try {
      await this.burgerButton.click();
    } catch (error) {
      throw new Error(`Cannot Click Burger Button ${error.message}`);
    }
  } 


}