const fs = require('fs');
const path = require('path');

/**
 * Parse Playwright test results and generate detailed Slack notification
 */
function parseTestResults() {
  const productionPath = 'production-results/production-results.json';
  const stagingPath = 'staging-results/staging-results.json';
  
  let productionStats = { passed: 0, failed: 0, skipped: 0, total: 0, duration: 0 };
  let stagingStats = { passed: 0, failed: 0, skipped: 0, total: 0, duration: 0 };
  
  // Parse production results
  if (fs.existsSync(productionPath)) {
    try {
      const productionData = JSON.parse(fs.readFileSync(productionPath, 'utf8'));
      productionStats = {
        passed: productionData.stats?.passed || 0,
        failed: productionData.stats?.failed || 0,
        skipped: productionData.stats?.skipped || 0,
        total: productionData.stats?.total || 0,
        duration: Math.round((productionData.stats?.duration || 0) / 1000)
      };
    } catch (error) {
      console.log('Error parsing production results:', error.message);
    }
  }
  
  // Parse staging results
  if (fs.existsSync(stagingPath)) {
    try {
      const stagingData = JSON.parse(fs.readFileSync(stagingPath, 'utf8'));
      stagingStats = {
        passed: stagingData.stats?.passed || 0,
        failed: stagingData.stats?.failed || 0,
        skipped: stagingData.stats?.skipped || 0,
        total: stagingData.stats?.total || 0,
        duration: Math.round((stagingData.stats?.duration || 0) / 1000)
      };
    } catch (error) {
      console.log('Error parsing staging results:', error.message);
    }
  }
  
  // Calculate overall stats
  const overallStats = {
    passed: productionStats.passed + stagingStats.passed,
    failed: productionStats.failed + stagingStats.failed,
    skipped: productionStats.skipped + stagingStats.skipped,
    total: productionStats.total + stagingStats.total,
    duration: productionStats.duration + stagingStats.duration
  };
  
  // Generate Slack message
  const status = overallStats.failed > 0 ? '🚨' : '✅';
  const overallStatus = overallStats.failed > 0 ? 'SOME TESTS FAILED' : 'ALL TESTS PASSED';
  
  const message = `${status} *Playwright Test Results*

*Repository:* ${process.env.GITHUB_REPOSITORY || 'N/A'}
*Branch:* ${process.env.GITHUB_REF_NAME || 'N/A'}
*Commit:* ${process.env.GITHUB_SHA || 'N/A'}
*Author:* ${process.env.GITHUB_ACTOR || 'N/A'}
*Workflow:* ${process.env.GITHUB_WORKFLOW || 'N/A'}

*Test Results:*
• *Production:* ${productionStats.failed > 0 ? '❌ FAILED' : '✅ PASSED'} (${productionStats.passed}/${productionStats.total} passed, ${productionStats.duration}s)
• *Staging:* ${stagingStats.failed > 0 ? '❌ FAILED' : '✅ PASSED'} (${stagingStats.passed}/${stagingStats.total} passed, ${stagingStats.duration}s)

*Overall Statistics:*
• *Total Tests:* ${overallStats.total}
• *Passed:* ${overallStats.passed} ✅
• *Failed:* ${overallStats.failed} ${overallStats.failed > 0 ? '❌' : '✅'}
• *Skipped:* ${overallStats.skipped} ⏭️
• *Duration:* ${overallStats.duration}s
• *Success Rate:* ${overallStats.total > 0 ? Math.round((overallStats.passed / overallStats.total) * 100) : 0}%

*Overall Status:* ${overallStatus}

*View Results:* ${process.env.GITHUB_SERVER_URL || 'https://github.com'}/${process.env.GITHUB_REPOSITORY || ''}/actions/runs/${process.env.GITHUB_RUN_ID || ''}`;

  // Write to file for GitHub Actions to use
  fs.writeFileSync('slack-message.txt', message);
  console.log('Generated detailed test report:');
  console.log(message);
}

// Run the parser
parseTestResults();
