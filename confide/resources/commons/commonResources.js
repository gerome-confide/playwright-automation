/**
 * CommonResources class for shared utility methods
 * @param {import('@playwright/test').Page} page - Playwright page object
 */
export class commonResources {
  /**
   * @param {import('@playwright/test').Page} page - Playwright page object
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Waits for a specific URL to be loaded
   * @param {string} url - The URL to wait for
   * @returns {Promise<void>}
   */
  async waitForURLToBeLoaded(url) {
    try {
      await this.page.waitForURL(url);
    } catch (error) {
      throw new Error(`Failed to wait for URL to load: ${url}. Error: ${error.message}`);
    }
  }

  /**
   * Waits for an element to be visible
   * @param {string} selector - CSS selector or locator
   * @param {number} timeout - Timeout in milliseconds (default: 30000)
   * @returns {Promise<void>}
   */
  async waitForElement(selector, timeout = 30000) {
    try {
      await this.page.waitForSelector(selector, { timeout });
    } catch (error) {
      throw new Error(`Element not found: ${selector}. Error: ${error.message}`);
    }
  }

  /**
   * Takes a screenshot
   * @param {string} name - Screenshot name
   * @returns {Promise<void>}
   */
  async takeScreenshot(name) {
    try {
      await this.page.screenshot({ path: `screenshots/${name}.png` });
    } catch (error) {
      throw new Error(`Failed to take screenshot: ${error.message}`);
    }
  }

  /**
   * Waits for page to be fully loaded
   * @returns {Promise<void>}
   */
  async waitForPageLoad() {
    try {
      await this.page.waitForLoadState('networkidle');
    } catch (error) {
      throw new Error(`Failed to wait for page load: ${error.message}`);
    }
  }

  /**
   * Scrolls to an element
   * @param {string} selector - CSS selector or locator
   * @returns {Promise<void>}
   */
  async scrollToElement(selector) {
    try {
      await this.page.locator(selector).scrollIntoViewIfNeeded();
    } catch (error) {
      throw new Error(`Failed to scroll to element: ${selector}. Error: ${error.message}`);
    }
  }

  /**
   * Gets text content from an element
   * @param {string} selector - CSS selector or locator
   * @returns {Promise<string>}
   */
  async getText(selector) {
    try {
      return await this.page.locator(selector).textContent();
    } catch (error) {
      throw new Error(`Failed to get text from element: ${selector}. Error: ${error.message}`);
    }
  }

  /**
   * Checks if an element is visible
   * @param {string} selector - CSS selector or locator
   * @returns {Promise<boolean>}
   */
  async isElementVisible(selector) {
    try {
      return await this.page.locator(selector).isVisible();
    } catch (error) {
      return false;
    }
  }
}
