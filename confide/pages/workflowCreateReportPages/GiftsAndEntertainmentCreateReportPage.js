export class GiftsAndEntertainmentCreateReportPage {
  constructor(page) {
    this.page = page;

    this.giftsAndEntertainmentReportType = page.locator('//button[@name="report_type"]');
    this.giftsAndEntertainmentReportTypeListbox = page.locator('ul[role="listbox"].Mui-expanded').first();
    this.giftsAndEntertainmentReportTypeOption = (reportTypeName) => page.locator(`ul[role="listbox"].Mui-expanded li[role="option"]:has-text("${reportTypeName}")`).first();
    this.giftsAndEntertainmentReportCountry = page.locator('//button[@name="country"]');
    this.giftsAndEntertainmentReportCountryListbox = page.locator('ul[role="listbox"].Mui-expanded').first();
    this.giftsAndEntertainmentReportCountryOption = (reportCountry) => page.locator(`ul[role="listbox"].Mui-expanded li[role="option"]:has-text("${reportCountry}")`).first();
    this.giftsAndEntertainmentGiftType = page.locator('//button[@id="report-form.dropdown-field.gift/entertainment-type"]').or(page.locator('//label[.//text()[contains(., "Gift/Entertainment Type")]]/following::button[@role="combobox"][1]'));
    this.giftsAndEntertainmentGiftTypeListbox = page.locator('ul[role="listbox"].Mui-expanded').first();
    this.giftsAndEntertainmentGiftTypeOption = (giftTypeName) => page.locator(`ul[role="listbox"].Mui-expanded li[role="option"]:has-text("${giftTypeName}")`).first();
    this.giftsAndEntertainmentDateField = page.locator('//label[.//text()[contains(., "Date of gift/entertainment")]]/following::button[@data-slot="control"][1]').or(page.locator('//label[.//text()[contains(., "Date of gift/entertainment")]]/following::button[@aria-haspopup="dialog"][1]').or(page.locator('//label[.//text()[contains(., "Date of gift/entertainment")]]/following::button[@type="button"][1]')));
    this.datePickerDialog = page.locator('[role="dialog"]').filter({ has: page.locator('button[name="day"]') });
    // this.calendarMonthYear = page.locator('[role="dialog"] button[aria-label*="calendar"]').or(page.locator('[role="dialog"] button:has-text("December")').or(page.locator('[role="dialog"] .MuiPickersCalendarHeader-label')));
    // this.calendarPreviousMonth = page.locator('[role="dialog"] button[aria-label*="previous"]').or(page.locator('[role="dialog"] button[aria-label*="Previous"]'));
    // this.calendarNextMonth = page.locator('[role="dialog"] button[aria-label*="next"]').or(page.locator('[role="dialog"] button[aria-label*="Next"]'));
    this.calendarDayButton = (day) => page.locator(`[role="dialog"] button[name="day"]:has-text("${day}")`).or(page.locator(`[role="dialog"] button[aria-label*="${day}"]`));
    this.giftsAndEntertainmentReportDescription = page.locator('div[contenteditable="true"].tiptap.ProseMirror');
    this.giftsAndEntertainmentEstimatedValue = page.locator('//label[.//text()[contains(., "Estimated value")]]/following::input[1]').or(page.locator('input[name*="custom_fields"][name*="estimated"]').or(page.locator('input.MuiInput-input[aria-describedby*="helper-text"]')));
    this.giftsAndEntertainmentWhoMadeOffer = page.locator('//label[.//text()[contains(., "Who made the offer")]]/following::input[1]').or(page.locator('input[name*="custom_fields"][name*="who"]').or(page.locator('input.MuiInput-input[aria-describedby*="helper-text"]')));
  }

  async selectReportType(reportTypeName) {
    try {
      await this.giftsAndEntertainmentReportType.waitFor({ state: 'visible', timeout: 10000 });
      await this.giftsAndEntertainmentReportType.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);
      await this.giftsAndEntertainmentReportType.click({ timeout: 10000 });
      
      await this.giftsAndEntertainmentReportTypeListbox.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(300);
      
      const reportTypeLocator = this.giftsAndEntertainmentReportTypeOption(reportTypeName);
      
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
      await this.giftsAndEntertainmentReportCountry.waitFor({ state: 'visible', timeout: 10000 });
      await this.giftsAndEntertainmentReportCountry.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);
      await this.giftsAndEntertainmentReportCountry.click({ timeout: 10000 });
      
      await this.giftsAndEntertainmentReportCountryListbox.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(300);
      
      const countryLocator = this.giftsAndEntertainmentReportCountryOption(reportCountryName);
      
      await countryLocator.waitFor({ state: 'visible', timeout: 10000 });
      await countryLocator.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);
      await countryLocator.click({ timeout: 10000 });
      
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Cannot Select Report Country from dropdown: ${error.message}`);
    }
  }

  async selectGiftType(giftTypeName) {
    try {
      await this.giftsAndEntertainmentGiftType.waitFor({ state: 'visible', timeout: 10000 });
      await this.giftsAndEntertainmentGiftType.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);
      await this.giftsAndEntertainmentGiftType.click({ timeout: 10000 });
      
      await this.giftsAndEntertainmentGiftTypeListbox.waitFor({ state: 'visible', timeout: 10000 });
      await this.page.waitForTimeout(300);
      
      const giftTypeLocator = this.giftsAndEntertainmentGiftTypeOption(giftTypeName);
      
      await giftTypeLocator.waitFor({ state: 'visible', timeout: 10000 });
      await giftTypeLocator.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);
      await giftTypeLocator.click({ timeout: 10000 });
      
      await this.page.waitForTimeout(300);
    } catch (error) {
      throw new Error(`Cannot Select Gift/Entertainment Type from dropdown: ${error.message}`);
    }
  }

  async inputDescription(description) {
    try {
      await this.giftsAndEntertainmentReportDescription.waitFor({ state: 'visible', timeout: 10000 });
      await this.giftsAndEntertainmentReportDescription.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);
      
      await this.giftsAndEntertainmentReportDescription.click({ timeout: 10000 });
      await this.page.waitForTimeout(300);
      
      await this.giftsAndEntertainmentReportDescription.fill(description, { timeout: 10000 });
      await this.page.waitForTimeout(200);
    } catch (error) {
      throw new Error(`Cannot input description text: ${error.message}`);
    }
  }

  async selectDateOfGiftOrEntertainment() {
    try {
      await this.giftsAndEntertainmentDateField.waitFor({ state: 'visible', timeout: 10000 });
      await this.giftsAndEntertainmentDateField.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);
      await this.giftsAndEntertainmentDateField.click({ timeout: 10000 });
      
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

  async inputEstimatedValue(value) {
    try {
      await this.giftsAndEntertainmentEstimatedValue.waitFor({ state: 'visible', timeout: 10000 });
      await this.giftsAndEntertainmentEstimatedValue.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);
      
      await this.giftsAndEntertainmentEstimatedValue.click({ timeout: 10000 });
      await this.page.waitForTimeout(200);
      await this.giftsAndEntertainmentEstimatedValue.fill(value, { timeout: 10000 });
      await this.page.waitForTimeout(200);
    } catch (error) {
      throw new Error(`Cannot input estimated value: ${error.message}`);
    }
  }

  async inputWhoMadeOffer(whoMadeOffer) {
    try {
      await this.giftsAndEntertainmentWhoMadeOffer.waitFor({ state: 'visible', timeout: 10000 });
      await this.giftsAndEntertainmentWhoMadeOffer.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(200);
      
      await this.giftsAndEntertainmentWhoMadeOffer.click({ timeout: 10000 });
      await this.page.waitForTimeout(200);
      await this.giftsAndEntertainmentWhoMadeOffer.fill(whoMadeOffer, { timeout: 10000 });
      await this.page.waitForTimeout(200);
    } catch (error) {
      throw new Error(`Cannot input who made offer: ${error.message}`);
    }
  }
}

