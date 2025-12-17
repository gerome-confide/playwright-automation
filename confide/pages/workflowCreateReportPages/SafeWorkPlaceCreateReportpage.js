export class SafeWorkPlaceCreateReportPage {
  constructor(page) {
    this.page = page;

    this.safeWorkPlaceReportType = page.locator('//button[@name="report_type"]');
    this.safeWorkPlaceReportTypeListbox = page.locator('ul[role="listbox"].Mui-expanded').first();
    this.safeWorkPlaceReportTypeOption = (reportTypeName) => page.locator(`ul[role="listbox"].Mui-expanded li[role="option"]:has-text("${reportTypeName}")`).first();
    this.safeWorkPlaceReportCountry = page.locator('//button[@name="country"]');
    this.safeWorkPlaceReportCountryListbox = page.locator('ul[role="listbox"].Mui-expanded').first();
    this.safeWorkPlaceReportCountryOption = (reportCountry) => page.locator(`ul[role="listbox"].Mui-expanded li[role="option"]:has-text("${reportCountry}")`).first();
    this.safeWorkPlaceReportDescription = page.locator('div[contenteditable="true"].tiptap.ProseMirror');
  }

  async selectReportType(reportTypeName) {
    try {
      await this.safeWorkPlaceReportType.waitFor({ state: 'visible', timeout: 10000 });
      await this.safeWorkPlaceReportType.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);
      await this.safeWorkPlaceReportType.click({ timeout: 10000 });
      
      await this.safeWorkPlaceReportTypeListbox.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(300);
      
      const reportTypeLocator = this.safeWorkPlaceReportTypeOption(reportTypeName);
      
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
      await this.safeWorkPlaceReportCountry.waitFor({ state: 'visible', timeout: 10000 });
      await this.safeWorkPlaceReportCountry.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);
      await this.safeWorkPlaceReportCountry.click({ timeout: 10000 });
      
      await this.safeWorkPlaceReportCountryListbox.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(300);
      
      const countryLocator = this.safeWorkPlaceReportCountryOption(reportCountryName);
      
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
      await this.safeWorkPlaceReportDescription.waitFor({ state: 'visible', timeout: 10000 });
      await this.safeWorkPlaceReportDescription.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);
      
      await this.safeWorkPlaceReportDescription.click({ timeout: 10000 });
      await this.page.waitForTimeout(300);
      
      await this.safeWorkPlaceReportDescription.fill(description, { timeout: 10000 });
      await this.page.waitForTimeout(200);
    } catch (error) {
      throw new Error(`Cannot input description text: ${error.message}`);
    }
  }
}

