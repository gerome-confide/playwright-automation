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
      // Click the dropdown to open the listbox
      await this.conflictOfInterestReportType.click();
      
      // Wait for the listbox to appear
      await this.conflictOfInterestReportTypeListbox.waitFor({ state: 'visible', timeout: 5000 });
      
      // Get the report type option locator (using the locator from constructor)
      const reportTypeLocator = this.conflictOfInterestReportTypeOption(reportTypeName);
      
      // Wait for the option to be visible and clickable
      await reportTypeLocator.waitFor({ state: 'visible', timeout: 5000 });
      await reportTypeLocator.click();
    } catch (error) {
      throw new Error(`Cannot Select Report Type from dropdown: ${error.message}`);
    }
  }

  async selectReportCountry(reportCountryName) {
    try {
      // Click the dropdown to open the listbox
      await this.conflictOfInterestReportCountry.click();
      
      // Wait for the listbox to appear
      await this.conflictOfInterestReportCountryListbox.waitFor({ state: 'visible', timeout: 5000 });
      
      // Get the country option locator (using the locator from constructor)
      const countryLocator = this.conflictOfInterestReportCountryOption(reportCountryName);
      
      // Wait for the option to be visible and clickable
      await countryLocator.waitFor({ state: 'visible', timeout: 5000 });
      await countryLocator.click();
    } catch (error) {
      throw new Error(`Cannot Select Report Country from dropdown: ${error.message}`);
    }
  }

  async inputDescription(description) {
    try {
      // Input description to the contenteditable text field
      await this.conflictOfInterestReportDescription.click();
      await this.conflictOfInterestReportDescription.fill(description);
    } catch (error) {
      throw new Error(`Cannot input description text: ${error.message}`);
    }
  }
}

