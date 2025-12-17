export class WhistleblowerCreateReportPage {
  constructor(page) {
    this.page = page;

    this.whistleBlowerReportType = page.locator('//button[@name="report_type"]');
    this.whistleBlowerReportTypeListbox = page.locator('ul[role="listbox"].Mui-expanded').first();
    this.whistleBlowerReportTypeOption = (reportTypeName) => page.locator(`ul[role="listbox"].Mui-expanded li[role="option"]:has-text("${reportTypeName}")`).first();
    this.whistleBlowerReportCountry = page.locator('//button[@name="country"]');
    this.whistleBlowerReportCountryListbox = page.locator('ul[role="listbox"].Mui-expanded').first();
    this.whistleBlowerReportCountryOption = (reportCountry) => page.locator(`ul[role="listbox"].Mui-expanded li[role="option"]:has-text("${reportCountry}")`).first();
    this.whistleBlowerReportDescription = page.locator('div[contenteditable="true"].tiptap.ProseMirror');
    this.whistleBlowerReporterName = page.locator('//label[.//text()[contains(., "Reporter Name")]]/following::input[1]').or(page.locator('input[name="full_name.data"]').or(page.locator('input.MuiInput-input'))).first();
  }

  async selectReportType(reportTypeName) {
    try {
      await this.whistleBlowerReportType.waitFor({ state: 'visible', timeout: 10000 });
      await this.whistleBlowerReportType.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);
      await this.whistleBlowerReportType.click({ timeout: 10000 });
      
      await this.whistleBlowerReportTypeListbox.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(300);
      
      const reportTypeLocator = this.whistleBlowerReportTypeOption(reportTypeName);
      
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
      await this.whistleBlowerReportCountry.waitFor({ state: 'visible', timeout: 10000 });
      await this.whistleBlowerReportCountry.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);
      await this.whistleBlowerReportCountry.click({ timeout: 10000 });
      
      await this.whistleBlowerReportCountryListbox.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(300);
      
      const countryLocator = this.whistleBlowerReportCountryOption(reportCountryName);
      
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
      await this.whistleBlowerReportDescription.waitFor({ state: 'visible', timeout: 10000 });
      await this.whistleBlowerReportDescription.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);
      
      await this.whistleBlowerReportDescription.click({ timeout: 10000 });
      await this.page.waitForTimeout(300);
      
      await this.whistleBlowerReportDescription.fill(description, { timeout: 10000 });
      await this.page.waitForTimeout(200);
    } catch (error) {
      throw new Error(`Cannot input description text: ${error.message}`);
    }
  }

  async inputReporterName(reporterName) {
    try {
      await this.whistleBlowerReporterName.waitFor({ state: 'visible', timeout: 10000 });
      await this.whistleBlowerReporterName.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);
      
      await this.whistleBlowerReporterName.click({ timeout: 10000 });
      await this.page.waitForTimeout(200);
      await this.whistleBlowerReporterName.fill(reporterName, { timeout: 10000 });
      await this.page.waitForTimeout(200);
    } catch (error) {
      throw new Error(`Cannot input reporter name: ${error.message}`);
    }
  }
}

