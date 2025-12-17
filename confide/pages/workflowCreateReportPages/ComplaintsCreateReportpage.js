export class ComplaintsCreateReportPage {
  constructor(page) {
    this.page = page;

    this.complaintsReportType = page.locator('//button[@name="report_type"]');
    this.complaintsReportTypeListbox = page.locator('ul[role="listbox"].Mui-expanded').first();
    this.complaintsReportTypeOption = (reportTypeName) => page.locator(`ul[role="listbox"].Mui-expanded li[role="option"]:has-text("${reportTypeName}")`).first();
    this.complaintsReportCountry = page.locator('//button[@name="country"]');
    this.complaintsReportCountryListbox = page.locator('ul[role="listbox"].Mui-expanded').first();
    this.complaintsReportCountryOption = (reportCountry) => page.locator(`ul[role="listbox"].Mui-expanded li[role="option"]:has-text("${reportCountry}")`).first();
    this.complaintsReportDescription = page.locator('div[contenteditable="true"].tiptap.ProseMirror');
    this.complaintsFullName = page.locator('input[name="full_name.data"]').or(page.locator('//label[.//text()[contains(., "Full Name")]]/following::input[1]'));
    this.complaintsEmailAddress = page.locator('input[type="email"]').or(page.locator('input[name*="email"]').or(page.locator('//label[.//text()[contains(., "Email Address")]]/following::input[1]')));
    this.complaintsDesiredOutcome = page.locator('//label[.//text()[contains(., "Desired Outcome")]]/following::input[1]').or(page.locator('input[name*="custom_fields"][name*="desired"]')).first();
    this.datePickerDialog = page.locator('[role="dialog"]').filter({ has: page.locator('button[name="day"]') });
    this.calendarDayButton = (day) => page.locator(`[role="dialog"] button[name="day"]:has-text("${day}")`).or(page.locator(`[role="dialog"] button[aria-label*="${day}"]`));
    this.complaintsDateOfIssue = page.locator('//label[.//text()[contains(., "Date of the Issue")]]/following::button[@data-slot="control"][@aria-haspopup="dialog"][1]').or(page.locator('//label[.//text()[contains(., "Date of the Issue")]]/following::button[@data-slot="control"][1]').or(page.locator('//label[.//text()[contains(., "Date of the Issue")]]/following::button[@aria-haspopup="dialog"][1]')));
  }

  async selectReportType(reportTypeName) {
    try {
      await this.complaintsReportType.waitFor({ state: 'visible', timeout: 10000 });
      await this.complaintsReportType.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);
      await this.complaintsReportType.click({ timeout: 10000 });
      
      await this.complaintsReportTypeListbox.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(300);
      
      const reportTypeLocator = this.complaintsReportTypeOption(reportTypeName);
      
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
      await this.complaintsReportCountry.waitFor({ state: 'visible', timeout: 10000 });
      await this.complaintsReportCountry.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);
      await this.complaintsReportCountry.click({ timeout: 10000 });
      
      await this.complaintsReportCountryListbox.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(300);
      
      const countryLocator = this.complaintsReportCountryOption(reportCountryName);
      
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
      await this.complaintsReportDescription.waitFor({ state: 'visible', timeout: 10000 });
      await this.complaintsReportDescription.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);
      
      await this.complaintsReportDescription.click({ timeout: 10000 });
      await this.page.waitForTimeout(300);
      
      await this.complaintsReportDescription.fill(description, { timeout: 10000 });
      await this.page.waitForTimeout(200);
    } catch (error) {
      throw new Error(`Cannot input description text: ${error.message}`);
    }
  }

  async inputFullName(fullName) {
    try {
      await this.complaintsFullName.waitFor({ state: 'visible', timeout: 10000 });
      await this.complaintsFullName.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);
      
      await this.complaintsFullName.click({ timeout: 10000 });
      await this.page.waitForTimeout(200);
      await this.complaintsFullName.fill(fullName, { timeout: 10000 });
      await this.page.waitForTimeout(200);
    } catch (error) {
      throw new Error(`Cannot input full name: ${error.message}`);
    }
  }

  async inputEmailAddress(emailAddress) {
    try {
      await this.complaintsEmailAddress.waitFor({ state: 'visible', timeout: 10000 });
      await this.complaintsEmailAddress.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);
      
      await this.complaintsEmailAddress.click({ timeout: 10000 });
      await this.page.waitForTimeout(200);
      await this.complaintsEmailAddress.fill(emailAddress, { timeout: 10000 });
      await this.page.waitForTimeout(200);
    } catch (error) {
      throw new Error(`Cannot input email address: ${error.message}`);
    }
  }

  async selectDateOfIssue() {
    try {
      await this.complaintsDateOfIssue.waitFor({ state: 'visible', timeout: 10000 });
      await this.complaintsDateOfIssue.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);
      await this.complaintsDateOfIssue.click({ timeout: 10000 });
      
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
      throw new Error(`Cannot select date of issue: ${error.message}`);
    }
  }

  async inputDesiredOutcome(desiredOutcome) {
    try {
      await this.complaintsDesiredOutcome.waitFor({ state: 'visible', timeout: 10000 });
      await this.complaintsDesiredOutcome.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);
      
      await this.complaintsDesiredOutcome.click({ timeout: 10000 });
      await this.page.waitForTimeout(200);
      await this.complaintsDesiredOutcome.fill(desiredOutcome, { timeout: 10000 });
      await this.page.waitForTimeout(200);
    } catch (error) {
      throw new Error(`Cannot input desired outcome: ${error.message}`);
    }
  }
}

