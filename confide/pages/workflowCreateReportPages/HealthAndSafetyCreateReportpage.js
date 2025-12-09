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
      // Click the dropdown to open the listbox
      await this.healthAndSafetyReportType.click();
      
      // Wait for the listbox to appear
      await this.healthAndSafetyReportTypeListbox.waitFor({ state: 'visible', timeout: 5000 });
      
      // Get the report type option locator (using the locator from constructor)
      const reportTypeLocator = this.healthAndSafetyReportTypeOption(reportTypeName);
      
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
      await this.healthAndSafetyReportCountry.click();
      
      // Wait for the listbox to appear
      await this.healthAndSafetyReportCountryListbox.waitFor({ state: 'visible', timeout: 5000 });
      
      // Get the country option locator (using the locator from constructor)
      const countryLocator = this.healthAndSafetyReportCountryOption(reportCountryName);
      
      // Wait for the option to be visible and clickable
      await countryLocator.waitFor({ state: 'visible', timeout: 5000 });
      await countryLocator.click();
    } catch (error) {
      throw new Error(`Cannot Select Report Country from dropdown: ${error.message}`);
    }
  }

  async inputLocationOfIncident(location) {
    try {
      // Input location of incident to the text field.
      await this.healthAndSafetyReportLocationOfIncident.fill(location);
    } catch (error) {
      throw new Error(`Cannot input from location of incident text field: ${error.message}`);
    }
  }

  async inputDescription(description) {
    try {
      // Input description to the contenteditable text field
      await this.healthAndSafetyReportDescription.click();
      await this.healthAndSafetyReportDescription.fill(description);
    } catch (error) {
      throw new Error(`Cannot input description text: ${error.message}`);
    }
  }

  async selectSomeOneInjured(option = 'No') {
    try {
      // Click the button to open the dropdown
      await this.healthAndSafetySomeOneInjured.click();
      
      // Wait for the listbox to appear
      await this.healthAndSafetySomeOneInjuredListbox.waitFor({ state: 'visible', timeout: 5000 });
      
      // Select the option using the dynamic locator
      const optionLocator = this.healthAndSafetySomeOneInjuredOption(option);
      await optionLocator.waitFor({ state: 'visible', timeout: 5000 });
      await optionLocator.click();
      
      // Wait for the dropdown to close
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Cannot select some one injured: ${error.message}`);
    }
  }
}

