export class HealthAndSafetyCreateReportPage {
  constructor(page) {
    this.page = page;

    // Health and Safety Report Form Locators
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
      // Wait for dropdown to be actionable, then click to open the listbox
      await this.healthAndSafetyReportType.waitFor({ state: 'visible', timeout: 10000 });
      await this.healthAndSafetyReportType.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200); // Wait for stability
      await this.healthAndSafetyReportType.click({ timeout: 10000 });
      
      // Wait for the listbox to appear
      await this.healthAndSafetyReportTypeListbox.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(300); // Wait for listbox to fully render
      
      // Get the report type option locator (using the locator from constructor)
      const reportTypeLocator = this.healthAndSafetyReportTypeOption(reportTypeName);
      
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
      await this.healthAndSafetyReportCountry.waitFor({ state: 'visible', timeout: 10000 });
      await this.healthAndSafetyReportCountry.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200); // Wait for stability
      await this.healthAndSafetyReportCountry.click({ timeout: 10000 });
      
      // Wait for the listbox to appear
      await this.healthAndSafetyReportCountryListbox.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(300); // Wait for listbox to fully render
      
      // Get the country option locator (using the locator from constructor)
      const countryLocator = this.healthAndSafetyReportCountryOption(reportCountryName);
      
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

  async inputLocationOfIncident(location) {
    try {
      // Wait for field to be actionable
      await this.healthAndSafetyReportLocationOfIncident.waitFor({ state: 'visible', timeout: 10000 });
      await this.healthAndSafetyReportLocationOfIncident.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200); // Wait for stability
      
      // Click to focus, then fill
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
      // Wait for contenteditable field to be actionable
      await this.healthAndSafetyReportDescription.waitFor({ state: 'visible', timeout: 10000 });
      await this.healthAndSafetyReportDescription.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200); // Wait for stability
      
      // Click to focus the contenteditable div
      await this.healthAndSafetyReportDescription.click({ timeout: 10000 });
      await this.page.waitForTimeout(300); // Wait for focus
      
      // Clear existing content and fill
      await this.healthAndSafetyReportDescription.fill(description, { timeout: 10000 });
      await this.page.waitForTimeout(200);
    } catch (error) {
      throw new Error(`Cannot input description text: ${error.message}`);
    }
  }

  async selectSomeOneInjured(option = 'No') {
    try {
      // Wait for button to be actionable, then click to open the dropdown
      await this.healthAndSafetySomeOneInjured.waitFor({ state: 'visible', timeout: 10000 });
      await this.healthAndSafetySomeOneInjured.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200); // Wait for stability
      await this.healthAndSafetySomeOneInjured.click({ timeout: 10000 });
      
      // Wait for the listbox to appear
      await this.healthAndSafetySomeOneInjuredListbox.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(300); // Wait for listbox to fully render
      
      // Select the option using the dynamic locator
      const optionLocator = this.healthAndSafetySomeOneInjuredOption(option);
      await optionLocator.waitFor({ state: 'visible', timeout: 10000 });
      await optionLocator.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200); // Wait for stability
      await optionLocator.click({ timeout: 10000 });
      
      // Wait for the dropdown to close
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Cannot select some one injured: ${error.message}`);
    }
  }
}

