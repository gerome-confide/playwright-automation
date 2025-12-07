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
     await this.reportsMenu.click();
     // Wait for the submenu to expand
     await this.page.waitForTimeout(500);
   } catch (error) {
     throw new Error(`Cannot Click Reports Menu: ${error.message}`);
   }
 }


 async clickCreateReportLink() {
   try {
     await this.createReportLink.waitFor({ state: 'visible', timeout: 5000 });
     await this.createReportLink.click();
     await this.page.waitForLoadState('networkidle');
   } catch (error) {
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
     // Click on Reports menu item in the sidebar
     await this.clickReportsMenu();
     
     // Click on Create Report link
     await this.clickCreateReportLink();
   } catch (error) {
     throw new Error(`Cannot Navigate to Create Report Page: ${error.message}`);
   }
 }

 getWorkflowLocator(workflowName) {
    return this.workflowOption(workflowName);
  }

}