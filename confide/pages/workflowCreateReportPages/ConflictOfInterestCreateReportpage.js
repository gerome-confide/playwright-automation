export class ConflictOfInterestCreateReportPage {
  constructor(page) {
    this.page = page;

    // Conflict of Interest Report Form Locators
    this.conflictOfInterestReportType = page.locator('//button[@name="report_type"]');
    this.conflictOfInterestReportTypeListbox = page.locator('ul[role="listbox"].Mui-expanded').first();
    this.conflictOfInterestReportTypeOption = (reportTypeName) => page.locator(`ul[role="listbox"].Mui-expanded li[role="option"]:has-text("${reportTypeName}")`).first();
    this.conflictOfInterestReportCountry = page.locator('//button[@name="country"]');
    this.conflictOfInterestReportCountryListbox = page.locator('ul[role="listbox"].Mui-expanded').first();
    this.conflictOfInterestReportCountryOption = (reportCountry) => page.locator(`ul[role="listbox"].Mui-expanded li[role="option"]:has-text("${reportCountry}")`).first();
    this.conflictOfInterestReportDescription = page.locator('div[contenteditable="true"].tiptap.ProseMirror');
  }

  async selectReportType(reportTypeName) {
    try {
      // Wait for dropdown to be actionable, then click to open the listbox
      await this.conflictOfInterestReportType.waitFor({ state: 'visible', timeout: 10000 });
      await this.conflictOfInterestReportType.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200); // Wait for stability
      await this.conflictOfInterestReportType.click({ timeout: 10000 });
      
      // Wait for the listbox to appear
      await this.conflictOfInterestReportTypeListbox.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(300); // Wait for listbox to fully render
      
      // Get the report type option locator (using the locator from constructor)
      const reportTypeLocator = this.conflictOfInterestReportTypeOption(reportTypeName);
      
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
      await this.conflictOfInterestReportCountry.waitFor({ state: 'visible', timeout: 10000 });
      await this.conflictOfInterestReportCountry.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200); // Wait for stability
      await this.conflictOfInterestReportCountry.click({ timeout: 10000 });
      
      // Wait for the listbox to appear
      await this.conflictOfInterestReportCountryListbox.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(300); // Wait for listbox to fully render
      
      // Get the country option locator (using the locator from constructor)
      const countryLocator = this.conflictOfInterestReportCountryOption(reportCountryName);
      
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
      await this.conflictOfInterestReportDescription.waitFor({ state: 'visible', timeout: 10000 });
      await this.conflictOfInterestReportDescription.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200); // Wait for stability
      
      // Click to focus the contenteditable div
      await this.conflictOfInterestReportDescription.click({ timeout: 10000 });
      await this.page.waitForTimeout(300); // Wait for focus
      
      // Clear existing content and fill
      await this.conflictOfInterestReportDescription.fill(description, { timeout: 10000 });
      await this.page.waitForTimeout(200);
    } catch (error) {
      throw new Error(`Cannot input description text: ${error.message}`);
    }
  }
}

