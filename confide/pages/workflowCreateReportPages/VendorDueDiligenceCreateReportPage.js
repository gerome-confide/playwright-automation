export class VendorDueDiligenceCreateReportPage {
  constructor(page) {
    this.page = page;

    this.vendorDueDiligenceReportType = page.locator('//button[@name="report_type"]');
    this.vendorDueDiligenceReportTypeListbox = page.locator('ul[role="listbox"].Mui-expanded').first();
    this.vendorDueDiligenceReportTypeOption = (reportTypeName) => page.locator(`ul[role="listbox"].Mui-expanded li[role="option"]:has-text("${reportTypeName}")`).first();
    this.vendorDueDiligenceReportCountry = page.locator('//button[@name="country"]');
    this.vendorDueDiligenceReportCountryListbox = page.locator('ul[role="listbox"].Mui-expanded').first();
    this.vendorDueDiligenceReportCountryOption = (reportCountry) => page.locator(`ul[role="listbox"].Mui-expanded li[role="option"]:has-text("${reportCountry}")`).first();
    this.vendorDueDiligenceReportDescription = page.locator('div[contenteditable="true"].tiptap.ProseMirror');
    this.vendorDueDiligenceCompanyName = page.locator('//label[.//text()[contains(., "Company name")]]/following::input[1]').or(page.locator('input[name*="custom_fields"][name*="company"]').or(page.locator('input.MuiInput-input[data-slot="control"]'))).first();
    this.vendorDueDiligenceContactPerson = page.locator('//label[.//text()[contains(., "Contact person")]]/following::input[1]').or(page.locator('input[name*="custom_fields"][name*="contact"][name*="person"]')).first();
    this.vendorDueDiligenceContactEmail = page.locator('//label[.//text()[contains(., "Contact email")]]/following::input[1]').or(page.locator('input[name*="custom_fields"][name*="email"]').or(page.locator('input[type="email"].MuiInput-input'))).first();
    this.vendorDueDiligenceDataSecurityCertification = (certificationValue) => page.locator(`//input[@value="${certificationValue}"]`).or(page.locator(`//label[.//text()[contains(., "${certificationValue}")]]/following::input[@type="checkbox"][1]`).or(page.locator(`input[type="checkbox"][value="${certificationValue}"]`))).first();
    this.vendorDueDiligenceBusinessContinuityPlan = page.locator('//button[@id="report-form.dropdown-field.does-your-organization-have-a-business-continuity-plan?"]').or(page.locator('//label[.//text()[contains(., "business continuity plan")]]/following::button[@role="combobox"][1]'));
    this.vendorDueDiligenceDisasterRecoveryPlan = page.locator('//button[@id="report-form.dropdown-field.does-your-organization-have-a-disaster-recovery-plan?"]').or(page.locator('//label[.//text()[contains(., "disaster recovery plan")]]/following::button[@role="combobox"][1]'));
    this.vendorDueDiligenceCyberSecurityInsurance = page.locator('//button[@id="report-form.dropdown-field.does-your-organization-have-cyber-security-insurance?"]').or(page.locator('//label[.//text()[contains(., "cyber security insurance")]]/following::button[@role="combobox"][1]'));
    this.vendorDueDiligenceIncidentResponsePlan = page.locator('//button[@id="report-form.dropdown-field.does-your-organization-have-an-incident-response-plan?"]').or(page.locator('//label[.//text()[contains(., "incident response plan")]]/following::button[@role="combobox"][1]'));
    this.vendorDueDiligenceDropdownListbox = page.locator('ul[role="listbox"].Mui-expanded').first();
    this.vendorDueDiligenceDropdownOption = (optionValue) => page.locator(`ul[role="listbox"].Mui-expanded li[role="option"]:has-text("${optionValue}")`).first();
  }

  async selectReportType(reportTypeName) {
    try {
      await this.vendorDueDiligenceReportType.waitFor({ state: 'visible', timeout: 10000 });
      await this.vendorDueDiligenceReportType.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);
      await this.vendorDueDiligenceReportType.click({ timeout: 10000 });
      
      await this.vendorDueDiligenceReportTypeListbox.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(300);
      
      const reportTypeLocator = this.vendorDueDiligenceReportTypeOption(reportTypeName);
      
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
      await this.vendorDueDiligenceReportCountry.waitFor({ state: 'visible', timeout: 10000 });
      await this.vendorDueDiligenceReportCountry.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);
      await this.vendorDueDiligenceReportCountry.click({ timeout: 10000 });
      
      await this.vendorDueDiligenceReportCountryListbox.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(300);
      
      const countryLocator = this.vendorDueDiligenceReportCountryOption(reportCountryName);
      
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
      await this.vendorDueDiligenceReportDescription.waitFor({ state: 'visible', timeout: 10000 });
      await this.vendorDueDiligenceReportDescription.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);
      
      await this.vendorDueDiligenceReportDescription.click({ timeout: 10000 });
      await this.page.waitForTimeout(300);
      
      await this.vendorDueDiligenceReportDescription.fill(description, { timeout: 10000 });
      await this.page.waitForTimeout(200);
    } catch (error) {
      throw new Error(`Cannot input description text: ${error.message}`);
    }
  }

  async inputCompanyName(companyName) {
    try {
      await this.vendorDueDiligenceCompanyName.waitFor({ state: 'visible', timeout: 10000 });
      await this.vendorDueDiligenceCompanyName.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);
      
      await this.vendorDueDiligenceCompanyName.click({ timeout: 10000 });
      await this.page.waitForTimeout(200);
      await this.vendorDueDiligenceCompanyName.fill(companyName, { timeout: 10000 });
      await this.page.waitForTimeout(200);
    } catch (error) {
      throw new Error(`Cannot input company name: ${error.message}`);
    }
  }

  async inputContactPerson(contactPerson) {
    try {
      await this.vendorDueDiligenceContactPerson.waitFor({ state: 'visible', timeout: 10000 });
      await this.vendorDueDiligenceContactPerson.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);
      
      await this.vendorDueDiligenceContactPerson.click({ timeout: 10000 });
      await this.page.waitForTimeout(200);
      await this.vendorDueDiligenceContactPerson.fill(contactPerson, { timeout: 10000 });
      await this.page.waitForTimeout(200);
    } catch (error) {
      throw new Error(`Cannot input contact person: ${error.message}`);
    }
  }

  async inputContactEmail(contactEmail) {
    try {
      await this.vendorDueDiligenceContactEmail.waitFor({ state: 'visible', timeout: 10000 });
      await this.vendorDueDiligenceContactEmail.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);
      
      await this.vendorDueDiligenceContactEmail.click({ timeout: 10000 });
      await this.page.waitForTimeout(200);
      await this.vendorDueDiligenceContactEmail.fill(contactEmail, { timeout: 10000 });
      await this.page.waitForTimeout(200);
    } catch (error) {
      throw new Error(`Cannot input contact email: ${error.message}`);
    }
  }

  async checkDataSecurityCertification(certificationValue) {
    try {
      const certificationLocator = this.vendorDueDiligenceDataSecurityCertification(certificationValue);
      await certificationLocator.waitFor({ state: 'visible', timeout: 10000 });
      await certificationLocator.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);
      await certificationLocator.click({ timeout: 10000 });
      await this.page.waitForTimeout(200);
    } catch (error) {
      throw new Error(`Cannot check data security certification: ${error.message}`);
    }
  }

  async selectBusinessContinuityPlan(option) {
    try {
      await this.vendorDueDiligenceBusinessContinuityPlan.waitFor({ state: 'visible', timeout: 10000 });
      await this.vendorDueDiligenceBusinessContinuityPlan.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);
      await this.vendorDueDiligenceBusinessContinuityPlan.click({ timeout: 10000 });
      
      await this.vendorDueDiligenceDropdownListbox.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(300);
      
      const optionLocator = this.vendorDueDiligenceDropdownOption(option);
      await optionLocator.waitFor({ state: 'visible', timeout: 10000 });
      await optionLocator.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);
      await optionLocator.click({ timeout: 10000 });
      
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Cannot select business continuity plan: ${error.message}`);
    }
  }

  async selectDisasterRecoveryPlan(option) {
    try {
      await this.vendorDueDiligenceDisasterRecoveryPlan.waitFor({ state: 'visible', timeout: 10000 });
      await this.vendorDueDiligenceDisasterRecoveryPlan.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);
      await this.vendorDueDiligenceDisasterRecoveryPlan.click({ timeout: 10000 });
      
      await this.vendorDueDiligenceDropdownListbox.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(300);
      
      const optionLocator = this.vendorDueDiligenceDropdownOption(option);
      await optionLocator.waitFor({ state: 'visible', timeout: 10000 });
      await optionLocator.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);
      await optionLocator.click({ timeout: 10000 });
      
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Cannot select disaster recovery plan: ${error.message}`);
    }
  }

  async selectCyberSecurityInsurance(option) {
    try {
      await this.vendorDueDiligenceCyberSecurityInsurance.waitFor({ state: 'visible', timeout: 10000 });
      await this.vendorDueDiligenceCyberSecurityInsurance.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);
      await this.vendorDueDiligenceCyberSecurityInsurance.click({ timeout: 10000 });
      
      await this.vendorDueDiligenceDropdownListbox.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(300);
      
      const optionLocator = this.vendorDueDiligenceDropdownOption(option);
      await optionLocator.waitFor({ state: 'visible', timeout: 10000 });
      await optionLocator.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);
      await optionLocator.click({ timeout: 10000 });
      
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Cannot select cyber security insurance: ${error.message}`);
    }
  }

  async selectIncidentResponsePlan(option) {
    try {
      await this.vendorDueDiligenceIncidentResponsePlan.waitFor({ state: 'visible', timeout: 10000 });
      await this.vendorDueDiligenceIncidentResponsePlan.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);
      await this.vendorDueDiligenceIncidentResponsePlan.click({ timeout: 10000 });
      
      await this.vendorDueDiligenceDropdownListbox.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(300);
      
      const optionLocator = this.vendorDueDiligenceDropdownOption(option);
      await optionLocator.waitFor({ state: 'visible', timeout: 10000 });
      await optionLocator.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);
      await optionLocator.click({ timeout: 10000 });
      
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Cannot select incident response plan: ${error.message}`);
    }
  }
}

