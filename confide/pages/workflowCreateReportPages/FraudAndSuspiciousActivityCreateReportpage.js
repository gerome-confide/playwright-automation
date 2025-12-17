export class FraudAndSuspiciousActivityCreateReportPage {
  constructor(page) {
    this.page = page;

    this.fraudAndSuspiciousActivityReportType = page.locator('//button[@name="report_type"]');
    this.fraudAndSuspiciousActivityReportTypeListbox = page.locator('ul[role="listbox"].Mui-expanded').first();
    this.fraudAndSuspiciousActivityReportTypeOption = (reportTypeName) => page.locator(`ul[role="listbox"].Mui-expanded li[role="option"]:has-text("${reportTypeName}")`).first();
    this.fraudAndSuspiciousActivityReportCountry = page.locator('//button[@name="country"]');
    this.fraudAndSuspiciousActivityReportCountryListbox = page.locator('ul[role="listbox"].Mui-expanded').first();
    this.fraudAndSuspiciousActivityReportCountryOption = (reportCountry) => page.locator(`ul[role="listbox"].Mui-expanded li[role="option"]:has-text("${reportCountry}")`).first();
    this.fraudAndSuspiciousActivityReportDescription = page.locator('div[contenteditable="true"].tiptap.ProseMirror');
    this.datePickerDialog = page.locator('[role="dialog"]').filter({ has: page.locator('button[name="day"]') });
    // this.calendarMonthYear = page.locator('[role="dialog"] button[aria-label*="calendar"]').or(page.locator('[role="dialog"] button:has-text("December")').or(page.locator('[role="dialog"] .MuiPickersCalendarHeader-label')));
    // this.calendarPreviousMonth = page.locator('[role="dialog"] button[aria-label*="previous"]').or(page.locator('[role="dialog"] button[aria-label*="Previous"]'));
    // this.calendarNextMonth = page.locator('[role="dialog"] button[aria-label*="next"]').or(page.locator('[role="dialog"] button[aria-label*="Next"]'));
    this.calendarDayButton = (day) => page.locator(`[role="dialog"] button[name="day"]:has-text("${day}")`).or(page.locator(`[role="dialog"] button[aria-label*="${day}"]`));
    this.fraudAndSuspiciousActivityDateOfFirstTransaction = page.locator('//label[.//text()[contains(., "Date of first transaction")]]/following::button[@data-slot="control"][@aria-haspopup="dialog"][1]').or(page.locator('//label[.//text()[contains(., "Date of first transaction")]]/following::button[@data-slot="control"][1]').or(page.locator('//label[.//text()[contains(., "Date of first transaction")]]/following::button[@aria-haspopup="dialog"][1]').or(page.locator('button[data-slot="control"][aria-haspopup="dialog"][aria-controls*="radix"]').first())));
    this.fraudAndSuspiciousActivityTransactionAmount = page.locator('//label[.//text()[contains(., "Transaction Amount")]]/following::input[1]').or(page.locator('input[id*="transaction-amount"]').or(page.locator('input[name*="transaction"][name*="amount"]').or(page.locator('input.MuiInput-input')))).first();
    this.fraudAndSuspiciousActivityMultipleTransaction = page.locator('//button[@id="report-form.dropdown-field.did-multiple-transaction-occur?"]').or(page.locator('//label[.//text()[contains(., "Did multiple transaction occur")]]/following::button[@role="combobox"][1]'));
    this.fraudAndSuspiciousActivityReportedToAuthorities = page.locator('//button[@id="report-form.dropdown-field.was-this-issue-reported-to-authorities"]').or(page.locator('//label[.//text()[contains(., "Was this issue reported to authorities")]]/following::button[@role="combobox"][1]'));
    this.fraudAndSuspiciousActivityDropdownListbox = page.locator('ul[role="listbox"].Mui-expanded').first();
    this.fraudAndSuspiciousActivityDropdownOption = (optionValue) => page.locator(`ul[role="listbox"].Mui-expanded li[role="option"]:has-text("${optionValue}")`).first();
  }

  async selectReportType(reportTypeName) {
    try {
      await this.fraudAndSuspiciousActivityReportType.waitFor({ state: 'visible', timeout: 10000 });
      await this.fraudAndSuspiciousActivityReportType.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);
      await this.fraudAndSuspiciousActivityReportType.click({ timeout: 10000 });
      
      await this.fraudAndSuspiciousActivityReportTypeListbox.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(300);
      
      const reportTypeLocator = this.fraudAndSuspiciousActivityReportTypeOption(reportTypeName);
      
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
      await this.fraudAndSuspiciousActivityReportCountry.waitFor({ state: 'visible', timeout: 10000 });
      await this.fraudAndSuspiciousActivityReportCountry.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);
      await this.fraudAndSuspiciousActivityReportCountry.click({ timeout: 10000 });
      
      await this.fraudAndSuspiciousActivityReportCountryListbox.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(300);
      
      const countryLocator = this.fraudAndSuspiciousActivityReportCountryOption(reportCountryName);
      
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
      await this.fraudAndSuspiciousActivityReportDescription.waitFor({ state: 'visible', timeout: 10000 });
      await this.fraudAndSuspiciousActivityReportDescription.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);
      
      await this.fraudAndSuspiciousActivityReportDescription.click({ timeout: 10000 });
      await this.page.waitForTimeout(300);
      
      await this.fraudAndSuspiciousActivityReportDescription.fill(description, { timeout: 10000 });
      await this.page.waitForTimeout(200);
    } catch (error) {
      throw new Error(`Cannot input description text: ${error.message}`);
    }
  }


  async selectDateOfFraudOrSuspiciousActivity() {
    try {
      await this.fraudAndSuspiciousActivityDateOfFirstTransaction.waitFor({ state: 'visible', timeout: 10000 });
      await this.fraudAndSuspiciousActivityDateOfFirstTransaction.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);
      await this.fraudAndSuspiciousActivityDateOfFirstTransaction.click({ timeout: 10000 });
      
      await this.datePickerDialog.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(500);

      const today = new Date();
      const day = today.getDate();
      
      const dayButton = this.calendarDayButton(day.toString());
      await dayButton.waitFor({ state: 'visible', timeout: 10000 });
      await dayButton.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);
      await dayButton.click({ timeout: 10000 });
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Cannot select date: ${error.message}`);
    }
  }

  async inputTransactionAmount(amount) {
    try {
      await this.fraudAndSuspiciousActivityTransactionAmount.waitFor({ state: 'visible', timeout: 10000 });
      await this.fraudAndSuspiciousActivityTransactionAmount.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);
      
      await this.fraudAndSuspiciousActivityTransactionAmount.click({ timeout: 10000 });
      await this.page.waitForTimeout(200);
      await this.fraudAndSuspiciousActivityTransactionAmount.fill(amount, { timeout: 10000 });
      await this.page.waitForTimeout(200);
    } catch (error) {
      throw new Error(`Cannot input transaction amount: ${error.message}`);
    }
  }

  async selectMultipleTransactionOccurred(option) {
    try {
      await this.fraudAndSuspiciousActivityMultipleTransaction.waitFor({ state: 'visible', timeout: 10000 });
      await this.fraudAndSuspiciousActivityMultipleTransaction.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);
      await this.fraudAndSuspiciousActivityMultipleTransaction.click({ timeout: 10000 });
      
      await this.fraudAndSuspiciousActivityDropdownListbox.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(300);
      
      const optionLocator = this.fraudAndSuspiciousActivityDropdownOption(option);
      await optionLocator.waitFor({ state: 'visible', timeout: 10000 });
      await optionLocator.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);
      await optionLocator.click({ timeout: 10000 });
      
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Cannot select multiple transaction occurred: ${error.message}`);
    }
  }

  async selectReportedToAuthorities(option) {
    try {
      await this.fraudAndSuspiciousActivityReportedToAuthorities.waitFor({ state: 'visible', timeout: 10000 });
      await this.fraudAndSuspiciousActivityReportedToAuthorities.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);
      await this.fraudAndSuspiciousActivityReportedToAuthorities.click({ timeout: 10000 });
      
      await this.fraudAndSuspiciousActivityDropdownListbox.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(300);
      
      const optionLocator = this.fraudAndSuspiciousActivityDropdownOption(option);
      await optionLocator.waitFor({ state: 'visible', timeout: 10000 });
      await optionLocator.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);
      await optionLocator.click({ timeout: 10000 });
      
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Cannot select reported to authorities: ${error.message}`);
    }
  }
}

