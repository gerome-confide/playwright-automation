export class AntiMoneyLaunderingCreateReportPage {
  constructor(page) {
    this.page = page;

    // Anti-Money Laundering Report Form Locators
    this.antiMoneyLaunderingReportType = page.locator('//button[@name="report_type"]');
    this.antiMoneyLaunderingReportTypeListbox = page.locator('ul[role="listbox"].Mui-expanded').first();
    this.antiMoneyLaunderingReportTypeOption = (reportTypeName) => page.locator(`ul[role="listbox"].Mui-expanded li[role="option"]:has-text("${reportTypeName}")`).first();
    this.antiMoneyLaunderingReportCountry = page.locator('//button[@name="country"]');
    this.antiMoneyLaunderingReportCountryListbox = page.locator('ul[role="listbox"].Mui-expanded').first();
    this.antiMoneyLaunderingReportCountryOption = (reportCountry) => page.locator(`ul[role="listbox"].Mui-expanded li[role="option"]:has-text("${reportCountry}")`).first();
    this.antiMoneyLaunderingReportDescription = page.locator('div[contenteditable="true"].tiptap.ProseMirror');
    this.antiMoneyLaunderingCustomerAccountNumber = page.locator('//label[.//text()[contains(., "Customer account or reference details")]]/following::input[1]');
    // Red Flags - Tags input field (has data-scope="tags-input" and data-part="input")
    this.antiMoneyLaunderingRedFlags = page.locator('//label[.//text()[contains(., "Red Flags")]]/following::input[@data-part="input"][1]');
  }

  async selectReportType(reportTypeName) {
    try {
      // Wait for dropdown to be actionable, then click to open the listbox
      await this.antiMoneyLaunderingReportType.waitFor({ state: 'visible', timeout: 10000 });
      await this.antiMoneyLaunderingReportType.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200); // Wait for stability
      await this.antiMoneyLaunderingReportType.click({ timeout: 10000 });
      
      // Wait for the listbox to appear
      await this.antiMoneyLaunderingReportTypeListbox.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(300); // Wait for listbox to fully render
      
      // Get the report type option locator (using the locator from constructor)
      const reportTypeLocator = this.antiMoneyLaunderingReportTypeOption(reportTypeName);
      
      // Wait for the option to be visible and clickable
      await reportTypeLocator.waitFor({ state: 'visible', timeout: 10000 });
      await reportTypeLocator.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200); // Wait for stability
      await reportTypeLocator.click({ timeout: 10000 });
      
      // Wait for dropdown to close
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Cannot Select Report Type from dropdown: ${error.message}`);
    }
  }

  async selectReportCountry(reportCountryName) {
    try {
      // Wait for dropdown to be actionable, then click to open the listbox
      await this.antiMoneyLaunderingReportCountry.waitFor({ state: 'visible', timeout: 10000 });
      await this.antiMoneyLaunderingReportCountry.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200); // Wait for stability
      await this.antiMoneyLaunderingReportCountry.click({ timeout: 10000 });
      
      // Wait for the listbox to appear
      await this.antiMoneyLaunderingReportCountryListbox.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(300); // Wait for listbox to fully render
      
      // Get the country option locator (using the locator from constructor)
      const countryLocator = this.antiMoneyLaunderingReportCountryOption(reportCountryName);
      
      // Wait for the option to be visible and clickable
      await countryLocator.waitFor({ state: 'visible', timeout: 10000 });
      await countryLocator.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200); // Wait for stability
      await countryLocator.click({ timeout: 10000 });
      
      // Wait for dropdown to close
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Cannot Select Report Country from dropdown: ${error.message}`);
    }
  }

  async inputDescription(description) {
    try {
      // Wait for contenteditable field to be actionable
      await this.antiMoneyLaunderingReportDescription.waitFor({ state: 'visible', timeout: 10000 });
      await this.antiMoneyLaunderingReportDescription.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200); // Wait for stability
      
      // Click to focus the contenteditable div
      await this.antiMoneyLaunderingReportDescription.click({ timeout: 10000 });
      await this.page.waitForTimeout(300); // Wait for focus
      
      // Clear existing content and fill
      await this.antiMoneyLaunderingReportDescription.fill(description, { timeout: 10000 });
      await this.page.waitForTimeout(200);
    } catch (error) {
      throw new Error(`Cannot input description text: ${error.message}`);
    }
  }

  async inputCustomerAccountNumber(customerAccountNumber) {
    try {
      // Wait for field to be actionable
      await this.antiMoneyLaunderingCustomerAccountNumber.waitFor({ state: 'visible', timeout: 10000 });
      await this.antiMoneyLaunderingCustomerAccountNumber.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200); // Wait for stability
      
      // Click to focus, then fill
      await this.antiMoneyLaunderingCustomerAccountNumber.click({ timeout: 10000 });
      await this.page.waitForTimeout(200);
      await this.antiMoneyLaunderingCustomerAccountNumber.fill(customerAccountNumber, { timeout: 10000 });
      await this.page.waitForTimeout(200);
    } catch (error) {
      throw new Error(`Cannot input customer account number: ${error.message}`);
    }
  }

  async inputRedFlags(redFlags) {
    try {
      // Wait for tags input field to be actionable
      await this.antiMoneyLaunderingRedFlags.waitFor({ state: 'visible', timeout: 10000 });
      await this.antiMoneyLaunderingRedFlags.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200); // Wait for stability
      
      // Click to focus the tags input field
      await this.antiMoneyLaunderingRedFlags.click({ timeout: 10000 });
      await this.page.waitForTimeout(300);
      
      // Handle multiple tags (comma-separated) or single tag
      if (redFlags.includes(',')) {
        const tags = redFlags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
        for (const tag of tags) {
          await this.antiMoneyLaunderingRedFlags.fill(tag, { timeout: 10000 });
          await this.page.keyboard.press('Enter');
          await this.page.waitForTimeout(500);
        }
      } else {
        await this.antiMoneyLaunderingRedFlags.fill(redFlags, { timeout: 10000 });
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(500);
      }
    } catch (error) {
      throw new Error(`Cannot input red flags: ${error.message}`);
    }
  }
}

