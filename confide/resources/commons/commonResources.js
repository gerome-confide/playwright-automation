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
   * @param {string} url - The URL to wait for (can be a pattern with *)
   * @param {number} timeout - Timeout in milliseconds (default: auto-detect based on CI)
   * @returns {Promise<void>}
   */
  async waitForURLToBeLoaded(url, timeout = null) {
    try {
      // Check if page is still open
      if (this.page.isClosed()) {
        throw new Error('Page has been closed');
      }
      
      // Auto-detect timeout: use longer timeout in CI environments
      const isCI = process.env.CI === 'true' || process.env.GITHUB_ACTIONS === 'true';
      const defaultTimeout = timeout || (isCI ? 60000 : 30000); // 60s for CI, 30s for local
      
      // Use pattern matching to handle URLs with trailing slashes or query parameters
      const urlPattern = url.includes('*') ? url : `${url}*`;
      
      console.log(`Waiting for URL: ${urlPattern} (timeout: ${defaultTimeout}ms, CI: ${isCI})`);
      
      await this.page.waitForURL(urlPattern, { timeout: defaultTimeout });
      
      // Verify we actually reached the expected URL
      const currentUrl = this.page.url();
      if (!currentUrl.includes(url.replace('https://', '').split('/')[0])) {
        console.log(`Warning: Current URL (${currentUrl}) doesn't match expected pattern (${urlPattern})`);
      }
    } catch (error) {
      // Check if page was closed during the wait
      if (this.page.isClosed()) {
        throw new Error(`Page was closed while waiting for URL: ${url}`);
      }
      
      // Log current URL for debugging
      const currentUrl = this.page.url();
      console.log(`Current URL when timeout occurred: ${currentUrl}`);
      
      throw new Error(`Failed to wait for URL to load: ${url}. Error: ${error.message}. Current URL: ${currentUrl}`);
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

  /**
   * Safely clicks an element by ensuring it's actionable
   * @param {import('@playwright/test').Locator} locator - Playwright locator
   * @param {Object} options - Click options
   * @param {number} options.timeout - Timeout in milliseconds (default: 30000)
   * @param {boolean} options.force - Force click even if element is covered (default: false)
   * @param {number} options.waitAfter - Wait time after click in ms (default: 300)
   * @returns {Promise<void>}
   */
  async safeClick(locator, options = {}) {
    const { timeout = 30000, force = false, waitAfter = 300 } = options;
    
    try {
      // Step 1: Wait for element to be attached to DOM
      await locator.waitFor({ state: 'attached', timeout });
      
      // Step 2: Wait for element to be visible
      await locator.waitFor({ state: 'visible', timeout });
      
      // Step 3: Scroll element into view
      await locator.scrollIntoViewIfNeeded({ timeout });
      
      // Step 4: Wait for element to be stable (not animating)
      await this.page.waitForTimeout(200);
      
      // Step 5: Wait for element to be enabled (if it's a button/input)
      const isDisabled = await locator.getAttribute('disabled').catch(() => null);
      if (isDisabled !== null && isDisabled !== 'false') {
        // Wait a bit more in case it's being enabled
        await this.page.waitForTimeout(500);
        const stillDisabled = await locator.getAttribute('disabled').catch(() => null);
        if (stillDisabled !== null && stillDisabled !== 'false') {
          throw new Error('Element is disabled and cannot be clicked');
        }
      }
      
      // Step 6: Check if element is actionable (not covered by another element)
      const isActionable = await locator.evaluate((el) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const topElement = document.elementFromPoint(centerX, centerY);
        return topElement === el || el.contains(topElement);
      }).catch(() => true); // If evaluation fails, assume it's actionable
      
      // Step 7: Click the element
      if (force || isActionable) {
        await locator.click({ timeout, force });
      } else {
        // If not actionable, try scrolling more and clicking again
        await locator.scrollIntoViewIfNeeded({ timeout });
        await this.page.waitForTimeout(200);
        await locator.click({ timeout, force: true });
      }
      
      // Step 8: Wait after click for any animations/transitions
      if (waitAfter > 0) {
        await this.page.waitForTimeout(waitAfter);
      }
    } catch (error) {
      // Take screenshot for debugging
      await this.page.screenshot({ path: `screenshots/click-error-${Date.now()}.png` }).catch(() => {});
      throw new Error(`Failed to click element: ${error.message}`);
    }
  }

  /**
   * Safely fills an input field by ensuring it's actionable
   * @param {import('@playwright/test').Locator} locator - Playwright locator
   * @param {string} text - Text to fill
   * @param {Object} options - Fill options
   * @param {number} options.timeout - Timeout in milliseconds (default: 30000)
   * @param {boolean} options.clearFirst - Clear field before filling (default: true)
   * @param {number} options.waitAfter - Wait time after fill in ms (default: 300)
   * @returns {Promise<void>}
   */
  async safeFill(locator, text, options = {}) {
    const { timeout = 30000, clearFirst = true, waitAfter = 300 } = options;
    
    try {
      // Step 1: Wait for element to be attached
      await locator.waitFor({ state: 'attached', timeout });
      
      // Step 2: Wait for element to be visible
      await locator.waitFor({ state: 'visible', timeout });
      
      // Step 3: Scroll element into view
      await locator.scrollIntoViewIfNeeded({ timeout });
      
      // Step 4: Wait for element to be stable
      await this.page.waitForTimeout(200);
      
      // Step 5: Click to focus (for contenteditable or special inputs)
      const tagName = await locator.evaluate((el) => el.tagName.toLowerCase()).catch(() => 'input');
      const isContentEditable = await locator.evaluate((el) => el.contentEditable === 'true').catch(() => false);
      
      if (isContentEditable || tagName === 'div') {
        // For contenteditable divs, click first to focus
        await locator.click({ timeout });
        await this.page.waitForTimeout(200);
      }
      
      // Step 6: Clear if needed
      if (clearFirst) {
        await locator.clear({ timeout });
        await this.page.waitForTimeout(100);
      }
      
      // Step 7: Fill the field
      await locator.fill(text, { timeout });
      
      // Step 8: Wait after fill
      if (waitAfter > 0) {
        await this.page.waitForTimeout(waitAfter);
      }
    } catch (error) {
      // Take screenshot for debugging
      await this.page.screenshot({ path: `screenshots/fill-error-${Date.now()}.png` }).catch(() => {});
      throw new Error(`Failed to fill element: ${error.message}`);
    }
  }

  /**
   * Waits for an element to be actionable (visible, enabled, and not covered)
   * @param {import('@playwright/test').Locator} locator - Playwright locator
   * @param {number} timeout - Timeout in milliseconds (default: 30000)
   * @returns {Promise<void>}
   */
  async waitForElementActionable(locator, timeout = 30000) {
    try {
      // Wait for attached
      await locator.waitFor({ state: 'attached', timeout });
      
      // Wait for visible
      await locator.waitFor({ state: 'visible', timeout });
      
      // Scroll into view
      await locator.scrollIntoViewIfNeeded({ timeout });
      
      // Wait for stability
      await this.page.waitForTimeout(200);
      
      // Check if enabled (for form elements)
      const tagName = await locator.evaluate((el) => el.tagName.toLowerCase()).catch(() => '');
      if (['button', 'input', 'select', 'textarea'].includes(tagName)) {
        const isDisabled = await locator.isDisabled().catch(() => false);
        if (isDisabled) {
          // Wait a bit more in case it's being enabled
          await this.page.waitForTimeout(500);
          const stillDisabled = await locator.isDisabled().catch(() => false);
          if (stillDisabled) {
            throw new Error('Element is disabled');
          }
        }
      }
    } catch (error) {
      throw new Error(`Element is not actionable: ${error.message}`);
    }
  }
}
