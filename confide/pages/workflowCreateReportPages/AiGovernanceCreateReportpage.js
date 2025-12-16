export class AiGovernanceCreateReportPage {
  constructor(page) {
    this.page = page;

    this.aiGovernanceReportType = page.locator('//button[@name="report_type"]');
    this.aiGovernanceReportTypeListbox = page.locator('ul[role="listbox"].Mui-expanded').first();
    this.aiGovernanceReportTypeOption = (reportTypeName) => page.locator(`ul[role="listbox"].Mui-expanded li[role="option"]:has-text("${reportTypeName}")`).first();
    this.aiGovernanceReportCountry = page.locator('//button[@name="country"]');
    this.aiGovernanceReportCountryListbox = page.locator('ul[role="listbox"].Mui-expanded').first();
    this.aiGovernanceReportCountryOption = (reportCountry) => page.locator(`ul[role="listbox"].Mui-expanded li[role="option"]:has-text("${reportCountry}")`).first();
    this.aiGovernanceReportDescription = page.locator('div[contenteditable="true"].tiptap.ProseMirror');
    this.aiGovernanceModelName = page.locator('//label[.//text()[contains(., "Model Name/Project Name/System Name")]]/following::input[1]');
    this.aiGovernanceDataDescription = page.locator('//label[.//text()[contains(., "Describe the data used or potentially impacted")]]/following::textarea[not(@aria-hidden="true")][1]');
  }

  async selectReportType(reportTypeName) {
    try {
      await this.aiGovernanceReportType.waitFor({ state: 'visible', timeout: 10000 });
      await this.aiGovernanceReportType.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);
      await this.aiGovernanceReportType.click({ timeout: 10000 });
      
      await this.aiGovernanceReportTypeListbox.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(300);
      
      const reportTypeLocator = this.aiGovernanceReportTypeOption(reportTypeName);
      
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
      await this.aiGovernanceReportCountry.waitFor({ state: 'visible', timeout: 10000 });
      await this.aiGovernanceReportCountry.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);
      await this.aiGovernanceReportCountry.click({ timeout: 10000 });
      
      await this.aiGovernanceReportCountryListbox.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(300);
      
      const countryLocator = this.aiGovernanceReportCountryOption(reportCountryName);
      
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
      await this.aiGovernanceReportDescription.waitFor({ state: 'visible', timeout: 10000 });
      await this.aiGovernanceReportDescription.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);
      
      await this.aiGovernanceReportDescription.click({ timeout: 10000 });
      await this.page.waitForTimeout(300);
      
      await this.aiGovernanceReportDescription.fill(description, { timeout: 10000 });
      await this.page.waitForTimeout(200);
    } catch (error) {
      throw new Error(`Cannot input description text: ${error.message}`);
    }
  }

  async inputModelName(modelName) {
    try {
      await this.aiGovernanceModelName.waitFor({ state: 'visible', timeout: 10000 });
      await this.aiGovernanceModelName.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);
      
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
      await this.aiGovernanceDataDescription.waitFor({ state: 'visible', timeout: 10000 });
      await this.aiGovernanceDataDescription.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);
      
      await this.aiGovernanceDataDescription.click({ timeout: 10000 });
      await this.page.waitForTimeout(200);
      await this.aiGovernanceDataDescription.fill(dataDescription, { timeout: 10000 });
      await this.page.waitForTimeout(200);
    } catch (error) {
      throw new Error(`Cannot input data description: ${error.message}`);
    }
  }
}

