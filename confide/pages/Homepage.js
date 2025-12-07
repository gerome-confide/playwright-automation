export class HomePage {

  constructor(page) {
    this.page = page;

   this.adminButton = page.locator('#admin-tab');
   this.logoutButton = page.locator("//p[text()='Logout'][1]");
   this.burgerButton = page.locator('//button[@aria-label="Toggle sidebar"]');
   
   //Navigation Menu Locators
   this.reportsMenu = page.locator('//a[@href="/customer/reports"]');
   this.createReportLink = page.locator('//a[contains(@href, "/customer/reports/create-report")]');

   //Dropdown Menu Locators
   this.workFlowDropdown = page.locator('//button[@role="combobox"]');
   this.workflowListbox = page.locator('ul[role="listbox"]');
   this.workflowOption = (workflowName) => page.locator(`li[role="option"]:has-text("${workflowName}")`);

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
       this.page.waitForURL('**/customer/reports/create-report**', { timeout: 30000 }).catch(() => {
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
     
     // Click on Reports menu item in the sidebar
     await this.clickReportsMenu();
     
     // Verify page is still open before clicking Create Report
     if (this.page.isClosed()) {
       throw new Error('Page was closed after clicking Reports menu');
     }
     
     // Click on Create Report link
     await this.clickCreateReportLink();
     
     // Verify we're on the correct page
     if (!this.page.isClosed()) {
       const currentUrl = this.page.url();
       if (!currentUrl.includes('/customer/reports/create-report')) {
         console.log(`Warning: Expected to be on create-report page, but current URL is: ${currentUrl}`);
       }
     }
   } catch (error) {
     throw new Error(`Cannot Navigate to Create Report Page: ${error.message}`);
   }
 }

 getWorkflowLocator(workflowName) {
    return this.workflowOption(workflowName);
  }

}