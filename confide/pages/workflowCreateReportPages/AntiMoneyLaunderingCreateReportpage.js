export class AntiMoneyLaunderingCreateReportPage {
  constructor(page) {
    this.page = page;

    // Anti-Money Laundering Report Form Locators
    this.antiMoneyLaunderingReportType = page.locator('//button[@name="report_type"]');
    this.antiMoneyLaunderingReportTypeListbox = page.locator('ul[role="listbox"].Mui-expanded').first();
    this.antiMoneyLaunderingReportTypeOption = (reportTypeName) => page.locator(`ul[role="listbox"].Mui-expanded li[role="option"]:has-text("${reportTypeName}")`).first();
    this.antiMoneyLaunderingReportCountry = page.locator('//button[@name="country"]');
    this.antiMoneyLaunderingReportCountryListbox = page.locator('ul[role="listbox"].Mui-expanded').first();
    this.antiMoneyLaunderingReportCountryOption = (reportCountry) => page.locator(`ul[role="listbox"].Mui-expanded li[role="option"]:has-text("${reportCountry}")`).first();
    this.antiMoneyLaunderingReportDescription = page.locator('div[contenteditable="true"].tiptap.ProseMirror');
    this.antiMoneyLaunderingCustomerAccountNumber = page.locator('//label[.//text()[contains(., "Customer account or reference details")]]/following::input[1]');
    // Red Flags - Tags input field (has data-scope="tags-input" and data-part="input")
    this.antiMoneyLaunderingRedFlags = page.locator('//label[.//text()[contains(., "Red Flags")]]/following::input[@data-part="input"][1]');
  }

  async selectReportType(reportTypeName) {
    try {
      // Click the dropdown to open the listbox
      await this.antiMoneyLaunderingReportType.click();
      
      // Wait for the listbox to appear
      await this.antiMoneyLaunderingReportTypeListbox.waitFor({ state: 'visible', timeout: 5000 });
      
      // Get the report type option locator (using the locator from constructor)
      const reportTypeLocator = this.antiMoneyLaunderingReportTypeOption(reportTypeName);
      
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
      await this.antiMoneyLaunderingReportCountry.click();
      
      // Wait for the listbox to appear
      await this.antiMoneyLaunderingReportCountryListbox.waitFor({ state: 'visible', timeout: 5000 });
      
      // Get the country option locator (using the locator from constructor)
      const countryLocator = this.antiMoneyLaunderingReportCountryOption(reportCountryName);
      
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
      await this.antiMoneyLaunderingReportDescription.click();
      await this.antiMoneyLaunderingReportDescription.fill(description);
    } catch (error) {
      throw new Error(`Cannot input description text: ${error.message}`);
    }
  }

  async inputCustomerAccountNumber(customerAccountNumber) {
    try {
      await this.antiMoneyLaunderingCustomerAccountNumber.fill(customerAccountNumber);
    } catch (error) {
      throw new Error(`Cannot input customer account number: ${error.message}`);
    }
  }

  async inputRedFlags(redFlags) {
    try {
      // Tags input field - click first to focus, then type
      await this.antiMoneyLaunderingRedFlags.click();
      await this.antiMoneyLaunderingRedFlags.fill(redFlags);
      // Press Enter to add the tag (if it's a tags input that requires Enter)

    } catch (error) {
      throw new Error(`Cannot input red flags: ${error.message}`);
    }
  }
}

