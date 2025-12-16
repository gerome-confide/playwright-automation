export class ConflictOfInterestCreateReportPage {
  constructor(page) {
    this.page = page;

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
      await this.conflictOfInterestReportType.waitFor({ state: 'visible', timeout: 10000 });
      await this.conflictOfInterestReportType.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);
      await this.conflictOfInterestReportType.click({ timeout: 10000 });
      
      await this.conflictOfInterestReportTypeListbox.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(300);
      
      const reportTypeLocator = this.conflictOfInterestReportTypeOption(reportTypeName);
      
      await reportTypeLocator.waitFor({ state: 'visible', timeout: 10000 });
      await reportTypeLocator.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);
      await reportTypeLocator.click({ timeout: 10000 });
      
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Cannot Select Report Type from dropdown: ${error.message}`);
    }
  }

  async selectReportCountry(reportCountryName) {
    try {
      await this.conflictOfInterestReportCountry.waitFor({ state: 'visible', timeout: 10000 });
      await this.conflictOfInterestReportCountry.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);
      await this.conflictOfInterestReportCountry.click({ timeout: 10000 });
      
      await this.conflictOfInterestReportCountryListbox.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(300);
      
      const countryLocator = this.conflictOfInterestReportCountryOption(reportCountryName);
      
      await countryLocator.waitFor({ state: 'visible', timeout: 10000 });
      await countryLocator.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);
      await countryLocator.click({ timeout: 10000 });
      
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Cannot Select Report Country from dropdown: ${error.message}`);
    }
  }

  async inputDescription(description) {
    try {
      await this.conflictOfInterestReportDescription.waitFor({ state: 'visible', timeout: 10000 });
      await this.conflictOfInterestReportDescription.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);
      
      await this.conflictOfInterestReportDescription.click({ timeout: 10000 });
      await this.page.waitForTimeout(300);
      
      await this.conflictOfInterestReportDescription.fill(description, { timeout: 10000 });
      await this.page.waitForTimeout(200);
    } catch (error) {
      throw new Error(`Cannot input description text: ${error.message}`);
    }
  }
}

