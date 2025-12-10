export class HomePage {

  constructor(page) {
    this.page = page;

   this.adminButton = page.locator('#admin-tab');
   this.logoutButton = page.locator("//p[text()='Logout'][1]");
   this.burgerButton = page.locator('//button[@aria-label="Toggle sidebar"]');
   this.submitreportButton = page.locator('//button[@type="submit"]');
   // Success modal locators
   this.successModal = page.locator('h2:has-text("Successfully Submitted"), h2:has-text("Success")').first();
   this.successModalDoneButton = page.locator('button:has-text("Done")').first();
   
   //Navigation Menu Locators
   this.reportsMenu = page.locator('//a[@href="/customer/reports"]');
   this.createReportLink = page.locator('//a[contains(@href, "/customer/reports/create-report")]');

   //Dropdown Menu Locators
   this.workFlowDropdown = page.locator('//button[@role="combobox"]');
   this.workflowListbox = page.locator('ul[role="listbox"]');
   this.workflowOption = (workflowName) => page.locator(`li[role="option"]:has-text("${workflowName}")`);
   
   //Health and Safety Report Form Locators
   this.healthAndSafetyReportType = page.locator('//button[@name="report_type"]');
   this.healthAndSafetyReportTypeListbox = page.locator('ul[role="listbox"].Mui-expanded').first();
   this.healthAndSafetyReportTypeOption = (reportTypeName) => page.locator(`ul[role="listbox"].Mui-expanded li[role="option"]:has-text("${reportTypeName}")`).first();
   this.healthAndSafetyReportCountry = page.locator('//button[@name="country"]');
   this.healthAndSafetyReportCountryOption = (reportCountry) => page.locator(`ul[role="listbox"].Mui-expanded li[role="option"]:has-text("${reportCountry}")`).first();
   this.healthAndSafetyReportLocationOfIncident = page.locator('//input[contains(@name, "custom_fields")]').first();
   this.healthAndSafetyReportDescription = page.locator('div[contenteditable="true"].tiptap.ProseMirror');
   // Date picker button - Best CSS selector: data-slot="control" + aria-haspopup="dialog"
   this.healthAndSafetyReportDateOfIncident = page.locator('button[data-slot="control"][aria-haspopup="dialog"]');
   this.healthAndSafetySomeOneInjured = page.locator('//p[text()="Was someone injured?"]/following::button[1]');
   this.healthAndSafetySomeOneInjuredListbox = page.locator('ul[role="listbox"].Mui-expanded').first();
   this.healthAndSafetySomeOneInjuredOption = (option) => page.locator(`ul[role="listbox"].Mui-expanded li[role="option"]:has-text("${option}")`).first();
  
  
  

  }

  async clickLogout() {
    try {
      await this.logoutButton.click();
    } catch (error) {
      throw new Error(`Cannot Click Admin Button ${error.message}`);
    }
  } 

  async clickBurgerButton() {
    try {
      await this.burgerButton.click();
    } catch (error) {
      throw new Error(`Cannot Click Burger Button ${error.message}`);
    }
  } 


 async clickReportsMenu() {
   try {
     // Check if page is still open
     if (this.page.isClosed()) {
       throw new Error('Page has been closed');
     }
     
     // Wait for Reports menu to be visible
     await this.reportsMenu.waitFor({ state: 'visible', timeout: 5000 });
     
     // Click and wait for potential navigation or submenu expansion
     await Promise.all([
       this.page.waitForLoadState('domcontentloaded', { timeout: 5000 }).catch(() => {}), // Ignore if no navigation
       this.reportsMenu.click()
     ]);
     
     // Wait a bit for submenu to expand (if it's a dropdown, not navigation)
     await this.page.waitForTimeout(1000);
   } catch (error) {
     if (this.page.isClosed()) {
       throw new Error(`Cannot Click Reports Menu: Page was closed`);
     }
     throw new Error(`Cannot Click Reports Menu: ${error.message}`);
   }
 }


 async clickCreateReportLink() {
   try {
     // Check if page is still open
     if (this.page.isClosed()) {
       throw new Error('Page has been closed');
     }
     
     // Wait for the link to be visible
     await this.createReportLink.waitFor({ state: 'visible', timeout: 10000 });
     
     // Click and wait for URL to change (handles navigation)
     // Using waitForURL is more reliable than waitForLoadState for navigation
     await Promise.all([
       this.page.waitForURL('**/customer/reports/create-report**', { timeout: 300000 }).catch(() => {
         // If URL doesn't match exactly, that's okay - just continue
       }),
       this.createReportLink.click()
     ]);
     
   } catch (error) {
     // Check if page was closed
     if (this.page.isClosed()) {
       throw new Error(`Cannot Click Create Report Link: Page was closed during navigation`);
     }
     throw new Error(`Cannot Click Create Report Link: ${error.message}`);
   }
 }

 async selectWorkFlowFromDropdown(workflowName) {
    try {
      // Click the dropdown to open the listbox
      await this.workFlowDropdown.click();
      
      // Wait for the listbox to be visible
      await this.workflowListbox.waitFor({ state: 'visible', timeout: 5000 });
      
      // Get the workflow option locator
      const workflowLocator = this.workflowOption(workflowName);
      
      // Wait for the option to be visible and clickable
      await workflowLocator.waitFor({ state: 'visible', timeout: 5000 });
      await workflowLocator.click();
    } catch (error) {
      throw new Error(`Cannot Select Workflow from dropdown: ${error.message}`);
    }
  }


 async navigateToCreateReportPage() {
  try {
    // Check if page is still open
    if (this.page.isClosed()) {
      throw new Error('Page has been closed');
    }
    
    // Verify authentication before navigation - check we're not on login/error page
    const currentUrl = this.page.url();
    if (currentUrl.includes('/login') || currentUrl.includes('auth0.com')) {
      throw new Error('Not authenticated - still on login/auth page. Please login first.');
    }
    
    // Check for error page before navigation
    const errorPage = this.page.locator('text="Oops!, something went wrong"');
    const isErrorPage = await errorPage.isVisible().catch(() => false);
    if (isErrorPage) {
      throw new Error('Error page detected before navigation - authentication may have failed');
    }
    
    // Wait for page to be ready
    await this.page.waitForLoadState('domcontentloaded', { timeout: 10000 }).catch(() => {});
    
    // Click on Reports menu item in the sidebar
    await this.clickReportsMenu();
    
    // Wait a bit for menu to expand
    await this.page.waitForTimeout(500);
    
    // Verify page is still open and not on error page
    if (this.page.isClosed()) {
      throw new Error('Page was closed after clicking Reports menu');
    }
    
    const errorAfterMenu = this.page.locator('text="Oops!, something went wrong"');
    const isErrorAfterMenu = await errorAfterMenu.isVisible().catch(() => false);
    if (isErrorAfterMenu) {
      throw new Error('Error page appeared after clicking Reports menu');
    }
    
    // Click on Create Report link
    await this.clickCreateReportLink();
    
    // Wait for navigation to complete
    await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
    
    // Verify we're on the correct page and not on error page
    if (!this.page.isClosed()) {
      const finalUrl = this.page.url();
      
      // Check for error page
      const errorOnReportPage = this.page.locator('text="Oops!, something went wrong"');
      const isErrorOnReportPage = await errorOnReportPage.isVisible().catch(() => false);
      if (isErrorOnReportPage) {
        throw new Error('Error page appeared on create report page - authentication may have expired');
      }
      
      if (!finalUrl.includes('/customer/reports/create-report')) {
        console.log(`Warning: Expected to be on create-report page, but current URL is: ${finalUrl}`);
      }
    }
  } catch (error) {
    throw new Error(`Cannot Navigate to Create Report Page: ${error.message}`);
  }
}

 ////////////////////////////////////////////////////////
 //////Health and Safety Report Form function here///////
 ////////////////////////////////////////////////////////

 async selectReportType(reportTypeName) {
  try {
    // Click the dropdown to open the listbox
    await this.healthAndSafetyReportType.click();
    
    // Wait a moment for the listbox to appear
    await this.page.waitForTimeout(500);
    
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
    
    // Wait a moment for the listbox to appear
    await this.page.waitForTimeout(500);
    
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
   //Input location of incident to the text field.
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

async selectDateOfIncident() {
  try {
    // Click the date field to open the date picker
    await this.healthAndSafetyReportDateOfIncident.click();
    
    // Wait for the calendar dialog to appear
    await this.datePickerDialog.waitFor({ state: 'visible', timeout: 5000 });
    
    // Wait a bit for the calendar to fully render
    await this.page.waitForTimeout(500);
    
  } catch (error) {
    throw new Error(`Cannot select date of incident: ${error.message}`);
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

async clickSubmitReportButton() {
  try {
    // Check if page is still open
    if (this.page.isClosed()) {
      throw new Error('Page has been closed before submitting');
    }
    
    // Zoom out to 80% before clicking submit
    await this.page.evaluate(() => {
      document.body.style.zoom = '0.8';
    });
    
    // Wait for the button to be visible
    await this.submitreportButton.waitFor({ state: 'visible', timeout: 10000 });
    
    // Scroll to the button if needed
    await this.submitreportButton.scrollIntoViewIfNeeded();
    
    // Click the submit button
    await this.submitreportButton.click();
    
    // Wait for the form submission to process
    await this.page.waitForTimeout(2000);
    
    // Check if page is still open after submission
    if (this.page.isClosed()) {
      throw new Error('Page was closed after form submission');
    }
  } catch (error) {
    throw new Error(`Cannot click Submit Report button: ${error.message}`);
  }
}

async clickSuccessModalDoneButton() {
  try {
    // Check if page is still open before waiting
    if (this.page.isClosed()) {
      throw new Error('Page has been closed before waiting for success modal');
    }
    
    // Step 1: Wait for the success modal to appear first (increased timeout)
    // Wrap in try-catch to check page state if it fails
    try {
      await this.successModal.waitFor({ state: 'visible', timeout: 200000 });
    } catch (error) {
      // Check if page was closed during wait
      if (this.page.isClosed()) {
        throw new Error('Page was closed while waiting for success modal');
      }
      // Re-throw original error if page is still open
      throw error;
    }
    
    // Step 2: Wait for the modal content to be fully loaded
    await this.page.waitForTimeout(1000);
    
    // Check page state again
    if (this.page.isClosed()) {
      throw new Error('Page was closed after modal appeared');
    }
    
    // Step 3: Wait for the Done button to appear and be visible
    await this.successModalDoneButton.waitFor({ state: 'visible', timeout: 60000 });
    
    // Step 4: Wait for the button to be enabled and clickable
    await this.successModalDoneButton.waitFor({ state: 'attached', timeout: 60000 });
    
    // Step 5: Scroll to the button if needed
    await this.successModalDoneButton.scrollIntoViewIfNeeded();
    
    // Step 6: Click the Done button
    await this.successModalDoneButton.click({ timeout: 60000 });
    
    // Step 7: Wait for the modal to close
    await this.page.waitForTimeout(500);
  } catch (error) {
    // Provide more context in error message
    const pageClosed = this.page.isClosed() ? ' (Page was closed)' : '';
    throw new Error(`Cannot click Done button in success modal: ${error.message}${pageClosed}`);
  }
}


 getWorkflowLocator(workflowName) {
    return this.workflowOption(workflowName);
  }

 getReportTypeLocator(reportTypeName) {
    return this.healthAndSafetyReportTypeOption(reportTypeName);
  }

 getReportCountryLocator(reportCountry) {
    return this.healthAndSafetyReportCountryOption(reportCountry);
  }
}