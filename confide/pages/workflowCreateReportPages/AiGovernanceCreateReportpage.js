export class AiGovernanceCreateReportPage {
  constructor(page) {
    this.page = page;

    // AI Governance Report Form Locators
    this.aiGovernanceReportType = page.locator('//button[@name="report_type"]');
    this.aiGovernanceReportTypeListbox = page.locator('ul[role="listbox"].Mui-expanded').first();
    this.aiGovernanceReportTypeOption = (reportTypeName) => page.locator(`ul[role="listbox"].Mui-expanded li[role="option"]:has-text("${reportTypeName}")`).first();
    this.aiGovernanceReportCountry = page.locator('//button[@name="country"]');
    this.aiGovernanceReportCountryListbox = page.locator('ul[role="listbox"].Mui-expanded').first();
    this.aiGovernanceReportCountryOption = (reportCountry) => page.locator(`ul[role="listbox"].Mui-expanded li[role="option"]:has-text("${reportCountry}")`).first();
    this.aiGovernanceReportDescription = page.locator('div[contenteditable="true"].tiptap.ProseMirror');
    this.aiGovernanceModelName = page.locator('//label[.//text()[contains(., "Model Name/Project Name/System Name")]]/following::input[1]');
    // Data Description - Using label text to find the textarea field (not hidden)
    this.aiGovernanceDataDescription = page.locator('//label[.//text()[contains(., "Describe the data used or potentially impacted")]]/following::textarea[not(@aria-hidden="true")][1]');
  }

  async selectReportType(reportTypeName) {
    try {
      // Wait for dropdown to be actionable, then click to open the listbox
      await this.aiGovernanceReportType.waitFor({ state: 'visible', timeout: 10000 });
      await this.aiGovernanceReportType.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200); // Wait for stability
      await this.aiGovernanceReportType.click({ timeout: 10000 });
      
      // Wait for the listbox to appear
      await this.aiGovernanceReportTypeListbox.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(300); // Wait for listbox to fully render
      
      // Get the report type option locator (using the locator from constructor)
      const reportTypeLocator = this.aiGovernanceReportTypeOption(reportTypeName);
      
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
      await this.aiGovernanceReportCountry.waitFor({ state: 'visible', timeout: 10000 });
      await this.aiGovernanceReportCountry.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200); // Wait for stability
      await this.aiGovernanceReportCountry.click({ timeout: 10000 });
      
      // Wait for the listbox to appear
      await this.aiGovernanceReportCountryListbox.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(300); // Wait for listbox to fully render
      
      // Get the country option locator (using the locator from constructor)
      const countryLocator = this.aiGovernanceReportCountryOption(reportCountryName);
      
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
      await this.aiGovernanceReportDescription.waitFor({ state: 'visible', timeout: 10000 });
      await this.aiGovernanceReportDescription.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200); // Wait for stability
      
      // Click to focus the contenteditable div
      await this.aiGovernanceReportDescription.click({ timeout: 10000 });
      await this.page.waitForTimeout(300); // Wait for focus
      
      // Clear existing content and fill
      await this.aiGovernanceReportDescription.fill(description, { timeout: 10000 });
      await this.page.waitForTimeout(200);
    } catch (error) {
      throw new Error(`Cannot input description text: ${error.message}`);
    }
  }

  async inputModelName(modelName) {
    try {
      // Wait for field to be actionable
      await this.aiGovernanceModelName.waitFor({ state: 'visible', timeout: 10000 });
      await this.aiGovernanceModelName.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200); // Wait for stability
      
      // Click to focus, then fill
      await this.aiGovernanceModelName.click({ timeout: 10000 });
      await this.page.waitForTimeout(200);
      await this.aiGovernanceModelName.fill(modelName, { timeout: 10000 });
      await this.page.waitForTimeout(200);
    } catch (error) {
      throw new Error(`Cannot input model name: ${error.message}`);
    }
  }

  async inputDataDescription(dataDescription) {
    try {
      // Wait for textarea field to be actionable
      await this.aiGovernanceDataDescription.waitFor({ state: 'visible', timeout: 10000 });
      await this.aiGovernanceDataDescription.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200); // Wait for stability
      
      // Click to focus, then fill
      await this.aiGovernanceDataDescription.click({ timeout: 10000 });
      await this.page.waitForTimeout(200);
      await this.aiGovernanceDataDescription.fill(dataDescription, { timeout: 10000 });
      await this.page.waitForTimeout(200);
    } catch (error) {
      throw new Error(`Cannot input data description: ${error.message}`);
    }
  }
}

