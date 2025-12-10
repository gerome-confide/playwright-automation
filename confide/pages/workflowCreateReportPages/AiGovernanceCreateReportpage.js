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
      // Click the dropdown to open the listbox
      await this.aiGovernanceReportType.click();
      
      // Wait for the listbox to appear
      await this.aiGovernanceReportTypeListbox.waitFor({ state: 'visible', timeout: 5000 });
      
      // Get the report type option locator (using the locator from constructor)
      const reportTypeLocator = this.aiGovernanceReportTypeOption(reportTypeName);
      
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
      await this.aiGovernanceReportCountry.click();
      
      // Wait for the listbox to appear
      await this.aiGovernanceReportCountryListbox.waitFor({ state: 'visible', timeout: 5000 });
      
      // Get the country option locator (using the locator from constructor)
      const countryLocator = this.aiGovernanceReportCountryOption(reportCountryName);
      
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
      await this.aiGovernanceReportDescription.click();
      await this.aiGovernanceReportDescription.fill(description);
    } catch (error) {
      throw new Error(`Cannot input description text: ${error.message}`);
    }
  }

  async inputModelName(modelName) {
    try {
      // Input model name to the text field
      await this.aiGovernanceModelName.fill(modelName);
    } catch (error) {
      throw new Error(`Cannot input model name: ${error.message}`);
    }
  }

  async inputDataDescription(dataDescription) {
    try {
      // Input data description to the textarea field
      await this.aiGovernanceDataDescription.fill(dataDescription);
    } catch (error) {
      throw new Error(`Cannot input data description: ${error.message}`);
    }
  }
}

