/**
 * Global type definitions for Playwright automation
 */

/**
 * @typedef {Object} LoginCredentials
 * @property {string} username - The username for login
 * @property {string} password - The password for login
 */

/**
 * @typedef {Object} TestData
 * @property {LoginCredentials} production - Production login credentials
 * @property {LoginCredentials} staging - Staging login credentials
 */

/**
 * @typedef {Object} CommonResources
 * @property {import('@playwright/test').Page} page - Playwright page object
 */

// Extend global namespace for better IntelliSense
globalThis.PlaywrightTest = {
  /**
   * @param {import('@playwright/test').Page} page
   * @returns {Promise<void>}
   */
  async waitForPageLoad(page) {
    await page.waitForLoadState('networkidle');
  }
};
