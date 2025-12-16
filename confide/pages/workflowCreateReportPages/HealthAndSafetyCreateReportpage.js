export class HealthAndSafetyCreateReportPage {
  constructor(page) {
    this.page = page;

    this.healthAndSafetyReportType = page.locator('//button[@name="report_type"]');
    this.healthAndSafetyReportTypeListbox = page.locator('ul[role="listbox"].Mui-expanded').first();
    this.healthAndSafetyReportTypeOption = (reportTypeName) => page.locator(`ul[role="listbox"].Mui-expanded li[role="option"]:has-text("${reportTypeName}")`).first();
    this.healthAndSafetyReportCountry = page.locator('//button[@name="country"]');
    this.healthAndSafetyReportCountryListbox = page.locator('ul[role="listbox"].Mui-expanded').first();
    this.healthAndSafetyReportCountryOption = (reportCountry) => page.locator(`ul[role="listbox"].Mui-expanded li[role="option"]:has-text("${reportCountry}")`).first();
    this.healthAndSafetyReportLocationOfIncident = page.locator('//input[contains(@name, "custom_fields")]').first();
    this.healthAndSafetyReportDescription = page.locator('div[contenteditable="true"].tiptap.ProseMirror');
    this.healthAndSafetySomeOneInjured = page.locator('//p[text()="Was someone injured?"]/following::button[1]');
    this.healthAndSafetySomeOneInjuredListbox = page.locator('ul[role="listbox"].Mui-expanded').first();
    this.healthAndSafetySomeOneInjuredOption = (option) => page.locator(`ul[role="listbox"].Mui-expanded li[role="option"]:has-text("${option}")`).first();
  }

  async selectReportType(reportTypeName) {
    try {
      await this.healthAndSafetyReportType.waitFor({ state: 'visible', timeout: 10000 });
      await this.healthAndSafetyReportType.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);
      await this.healthAndSafetyReportType.click({ timeout: 10000 });
      
      await this.healthAndSafetyReportTypeListbox.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(300);
      
      const reportTypeLocator = this.healthAndSafetyReportTypeOption(reportTypeName);
      
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
      await this.healthAndSafetyReportCountry.waitFor({ state: 'visible', timeout: 10000 });
      await this.healthAndSafetyReportCountry.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);
      await this.healthAndSafetyReportCountry.click({ timeout: 10000 });
      
      await this.healthAndSafetyReportCountryListbox.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(300);
      
      const countryLocator = this.healthAndSafetyReportCountryOption(reportCountryName);
      
      await countryLocator.waitFor({ state: 'visible', timeout: 10000 });
      await countryLocator.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);
      await countryLocator.click({ timeout: 10000 });
      
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Cannot Select Report Country from dropdown: ${error.message}`);
    }
  }

  async inputLocationOfIncident(location) {
    try {
      await this.healthAndSafetyReportLocationOfIncident.waitFor({ state: 'visible', timeout: 10000 });
      await this.healthAndSafetyReportLocationOfIncident.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);
      
      await this.healthAndSafetyReportLocationOfIncident.click({ timeout: 10000 });
      await this.page.waitForTimeout(200);
      await this.healthAndSafetyReportLocationOfIncident.fill(location, { timeout: 10000 });
      await this.page.waitForTimeout(200);
    } catch (error) {
      throw new Error(`Cannot input from location of incident text field: ${error.message}`);
    }
  }

  async inputDescription(description) {
    try {
      await this.healthAndSafetyReportDescription.waitFor({ state: 'visible', timeout: 10000 });
      await this.healthAndSafetyReportDescription.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);
      
      await this.healthAndSafetyReportDescription.click({ timeout: 10000 });
      await this.page.waitForTimeout(300);
      
      await this.healthAndSafetyReportDescription.fill(description, { timeout: 10000 });
      await this.page.waitForTimeout(200);
    } catch (error) {
      throw new Error(`Cannot input description text: ${error.message}`);
    }
  }

  async selectSomeOneInjured(option = 'No') {
    try {
      await this.healthAndSafetySomeOneInjured.waitFor({ state: 'visible', timeout: 10000 });
      await this.healthAndSafetySomeOneInjured.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);
      await this.healthAndSafetySomeOneInjured.click({ timeout: 10000 });
      
      await this.healthAndSafetySomeOneInjuredListbox.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(300);
      
      const optionLocator = this.healthAndSafetySomeOneInjuredOption(option);
      await optionLocator.waitFor({ state: 'visible', timeout: 10000 });
      await optionLocator.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);
      await optionLocator.click({ timeout: 10000 });
      
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Cannot select some one injured: ${error.message}`);
    }
  }
}

