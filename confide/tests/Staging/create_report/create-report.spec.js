import { test } from '@playwright/test';
import { HomePage } from '../../../pages/Homepage';
import { HealthAndSafetyCreateReportPage } from '../../../pages/workflowCreateReportPages/HealthAndSafetyCreateReportpage';
import { AntiMoneyLaunderingCreateReportPage } from '../../../pages/workflowCreateReportPages/AntiMoneyLaunderingCreateReportpage';
import { ConflictOfInterestCreateReportPage } from '../../../pages/workflowCreateReportPages/ConflictOfInterestCreateReportpage';
import { AiGovernanceCreateReportPage } from '../../../pages/workflowCreateReportPages/AiGovernanceCreateReportpage';
import { GiftsAndEntertainmentCreateReportPage } from '../../../pages/workflowCreateReportPages/GiftsAndEntertainmentCreateReportPage';
import { commonResources } from '../../../resources/commons/commonResources';
import { BaseLogin } from '../../../resources/utils/auth/baseLogin';

test.describe.serial('Create Report Scenario Staging', () => {
  let context;
  let page;
  let commonresource;
  let baseLogin;
  let testCounter = 0;

  test.beforeEach(async ({ browser }) => {
    testCounter++;
    
    if (testCounter % 2 === 0) {
      console.log(`Pausing for 10 seconds before test ${testCounter}...`);
      await new Promise(resolve => setTimeout(resolve, 10000));
      console.log(`Resuming test ${testCounter}`);
    }
    context = await browser.newContext({
      storageState: undefined
    });
    page = await context.newPage();
    commonresource = new commonResources(page);
    baseLogin = new BaseLogin(page, commonresource);

    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
    
    const screenSize = await page.evaluate(() => {
      return {
        width: window.screen.availWidth || 1920,
        height: window.screen.availHeight || 1080
      };
    });
    
    await page.setViewportSize({ 
      width: screenSize.width, 
      height: screenSize.height 
    });
    
    await page.evaluate(() => {
      document.body.style.zoom = '0.8';
    });
  });

  test.afterEach(async () => {
    try {
      if (page && !page.isClosed()) {
        await page.close();
      }
    } catch (error) {
      console.log('Error closing page:', error.message);
    }
    
    try {
      if (context) {
        await context.close();
      }
    } catch (error) {
      console.log('Error closing context:', error.message);
    }
  });

  test.afterAll(async () => {
    console.log('All staging tests completed');
  });

  // test('Create Health and Safety Report', async () => {
  //   test.setTimeout(120000); // Set test timeout to 2 minutes
  //   const homePage = new HomePage(page);
  //   const healthAndSafetyPage = new HealthAndSafetyCreateReportPage(page);

  //   await test.step('Login as Admin', async () => {
  //     await baseLogin.performAdminLogin('staging');
  //   });

  //   await test.step('Select Workflow from Dropdown', async () => {
  //     await homePage.selectWorkFlowFromDropdown('Health and safety');
  //   });

  //   await test.step('Click Reports Menu', async () => {
  //     await homePage.navigateToCreateReportPage();
  //   });

  //   // Add your create report test steps here
  //   await test.step('Select Report Type', async () => {
  //     await healthAndSafetyPage.selectReportType('Hazard');
  //   });

  //   await test.step('Select Report Country', async () => {
  //     await healthAndSafetyPage.selectReportCountry('Australia');
  //   });

  //   await test.step('Input Location of Incident', async () => {
  //     await healthAndSafetyPage.inputLocationOfIncident('Manila, Philippines');
  //   });

  //   await test.step('Input Description', async () => {
  //     await healthAndSafetyPage.inputDescription('This is an automated test for creating Health and Safety Report, please ignore and DO NOT DELETE PLEASEEE.');
  //   });

  //   await test.step('Select Some One Injured', async () => {
  //     await healthAndSafetyPage.selectSomeOneInjured('No');
  //   });


  //   await test.step('Click Submit Report Button', async () => {
  //     await homePage.clickSubmitReportButton();
  //   });

  //   await test.step('Click Success Modal Done Button', async () => {
  //     await homePage.clickSuccessModalDoneButton();
  //   });

  //   await test.step('Click Logout Button', async () => {
  //     await homePage.clickLogout();
  //   });
  // });
  
  // test('Create Anti-Money Laundering Report', async () => {
  //   test.setTimeout(300000); // Set test timeout to 5 minutes
  //   const homePage = new HomePage(page);
  //   const antiMoneyLaunderingPage = new AntiMoneyLaunderingCreateReportPage(page);

  //   await test.step('Login as Admin', async () => {
  //     await baseLogin.performAdminLogin('staging');
  //   });

  //   await test.step('Select Workflow from Dropdown', async () => {
  //     await homePage.selectWorkFlowFromDropdown('Anti-money laundering');
  //   });

    
  //   await test.step('Click Reports Menu', async () => {
  //     await homePage.navigateToCreateReportPage();
  //   });

    
  //   // Add your create report test steps here
  //   await test.step('Create Report', async () => {
  //     // TODO: Add your create report logic here
  //   });

  //   await test.step('Select Report Type', async () => {
  //     await antiMoneyLaunderingPage.selectReportType('Fraudulent activity');
  //   });

  //   await test.step('Select Report Country', async () => {
  //     await antiMoneyLaunderingPage.selectReportCountry('Australia');
  //   });

  //   await test.step('Input Description', async () => {
  //     await antiMoneyLaunderingPage.inputDescription('This is an automated test for creating Anti-Money Laundering Report, please ignore and DO NOT DELETE PLEASEEE.');
  //   });

  //   await test.step('Input Customer Account Number', async () => {
  //     await antiMoneyLaunderingPage.inputCustomerAccountNumber('1234567890');
  //   });

  //   await test.step('Input Red Flags', async () => {
  //     await antiMoneyLaunderingPage.inputRedFlags('Red Flag 1, Red Flag 2');
  //   });

  //   await test.step('Click Submit Report Button', async () => {
  //     await homePage.clickSubmitReportButton();
  //   });

  //   await test.step('Click Success Modal Done Button', async () => {
  //     await homePage.clickSuccessModalDoneButton();
  //   });

  //   await test.step('Click Logout Button', async () => {
  //     await homePage.clickLogout();
  //   });
  // });

  // test('Create Conflicts of Interest Report', async () => {
  //   test.setTimeout(300000); // Set test timeout to 5 minutes
  //   const homePage = new HomePage(page);
  //   const conflictOfInterestPage = new ConflictOfInterestCreateReportPage(page);

  //   await test.step('Login as Admin', async () => {
  //     await baseLogin.performAdminLogin('staging');
  //   });

  //   await test.step('Select Workflow from Dropdown', async () => {
  //     await homePage.selectWorkFlowFromDropdown('Conflicts of interest');
  //   });
    
  //   await test.step('Click Reports Menu', async () => {
  //     await homePage.navigateToCreateReportPage();
  //   });
  //   // Add your create report test steps here
  //   await test.step('Create Report', async () => {
  //     // TODO: Add your create report logic here
  //   });

  //   await test.step('Select Report Type', async () => {
  //     await conflictOfInterestPage.selectReportType('Outside Employement');
  //   });

  //   await test.step('Select Report Country', async () => {
  //     await conflictOfInterestPage.selectReportCountry('Belgium');
  //   });

  //   await test.step('Input Description', async () => {
  //     await conflictOfInterestPage.inputDescription('This is an automated test for creating Conflict of Interest Report, please ignore and DO NOT DELETE PLEASEEE.');
  //   });

  //   await test.step('Click Submit Report Button', async () => {
  //     await homePage.clickSubmitReportButton();
  //   });

  //   await test.step('Click Success Modal Done Button', async () => {
  //     await homePage.clickSuccessModalDoneButton();
  //   });

  //   await test.step('Click Logout Button', async () => {
  //     await homePage.clickLogout();
  //   });
  // });

  // test('Create AI governance Report', async () => {
  //   test.setTimeout(300000);
  //   const homePage = new HomePage(page);
  //   const aiGovernancePage = new AiGovernanceCreateReportPage(page);

  //   await test.step('Login as Admin', async () => {
  //     await baseLogin.performAdminLogin('staging');
  //   });

  //   await test.step('Select Workflow from Dropdown', async () => {
  //     await homePage.selectWorkFlowFromDropdown('AI governance');
  //   });

  //   await test.step('Click Reports Menu', async () => {
  //     await homePage.navigateToCreateReportPage();
  //   });
  //   // Add your create report test steps here
  //   await test.step('Create Report', async () => {
  //     // TODO: Add your create report logic here
  //   });

  //   await test.step('Select Report Type', async () => {
  //     await aiGovernancePage.selectReportType('AI Project Proposal');
  //   });

  //   await test.step('Select Report Country', async () => {
  //     await aiGovernancePage.selectReportCountry('Australia');
  //   });

  //   await test.step('Input Model Name', async () => {
  //     await aiGovernancePage.inputModelName('Test Model');
  //   });

  //   await test.step('Input Description', async () => {
  //     await aiGovernancePage.inputDescription('This is an automated test for creating AI Governance Report, please ignore and DO NOT DELETE PLEASEEE.');
  //   });

  //   await test.step('Input Data Description', async () => {
  //     await aiGovernancePage.inputDataDescription('Test Data Description');
  //   });

  //   await test.step('Click Submit Report Button', async () => {
  //     await homePage.clickSubmitReportButton();
  //   });

  //   await test.step('Click Success Modal Done Button', async () => {
  //     await homePage.clickSuccessModalDoneButton();
  //   });

  //   await test.step('Click Logout Button', async () => {
  //     await homePage.clickLogout();
  //   });
  // });

  test('Create Gifts and entertainment Report', async () => {
    test.setTimeout(300000);
    const homePage = new HomePage(page);
    const giftsAndEntertainmentPage = new GiftsAndEntertainmentCreateReportPage(page);

    await test.step('Login as Admin', async () => {
      await baseLogin.performAdminLogin('staging');
    });

    await test.step('Select Workflow from Dropdown', async () => {
      await homePage.selectWorkFlowFromDropdown('Gifts and entertainment');
    });

    await test.step('Click Reports Menu', async () => {
      await homePage.navigateToCreateReportPage();
    });
    // Add your create report test steps here
    await test.step('Create Report', async () => {
      // TODO: Add your create report logic here
    });
  
    await test.step('Select Report Type', async () => {
      await giftsAndEntertainmentPage.selectReportType('Gift Given');
    });

    await test.step('Select Report Country', async () => {
      await giftsAndEntertainmentPage.selectReportCountry('Anguilla');
    });

    await test.step('Select Gift Type', async () => {
      await giftsAndEntertainmentPage.selectGiftType('Travel');
    });

    await test.step('Select Date of Gift/Entertainment', async () => {
      await giftsAndEntertainmentPage.selectDateOfGiftOrEntertainment();
    });

    await test.step('Input Description', async () => {
      await giftsAndEntertainmentPage.inputDescription('This is an automated test for creating Gifts and Entertainment Report, please ignore and DO NOT DELETE PLEASEEE.');
    });

    await test.step('Input Estimated Value', async () => {
      await giftsAndEntertainmentPage.inputEstimatedValue('100000');
    });

    await test.step('Input Who Made Offer', async () => {
      await giftsAndEntertainmentPage.inputWhoMadeOffer('Gerome Fernandez');
    });

    await test.step('Click Submit Report Button', async () => {
      await homePage.clickSubmitReportButton();
    });

    await test.step('Click Success Modal Done Button', async () => {
      await homePage.clickSuccessModalDoneButton();
    });

    await test.step('Click Logout Button', async () => {
      await homePage.clickLogout();
    });
  });

});
