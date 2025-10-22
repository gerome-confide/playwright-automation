const fs = require('fs');
const path = require('path');

/**
 * Parse Playwright test results and generate detailed Slack notification
 */
function parseTestResults() {
  const productionPath = 'production-results/test-results/results.json';
  const stagingPath = 'staging-results/test-results/results.json';
  
  // Debug: List all files in the directories
  console.log('=== DEBUGGING FILE PATHS ===');
  console.log('Current working directory:', process.cwd());
  
  // Check if directories exist
  if (fs.existsSync('production-results')) {
    console.log('Production results directory exists');
    const prodFiles = fs.readdirSync('production-results', { recursive: true });
    console.log('Production files:', prodFiles);
  } else {
    console.log('Production results directory does not exist');
  }
  
  if (fs.existsSync('staging-results')) {
    console.log('Staging results directory exists');
    const stagingFiles = fs.readdirSync('staging-results', { recursive: true });
    console.log('Staging files:', stagingFiles);
  } else {
    console.log('Staging results directory does not exist');
  }
  
  let productionStats = { passed: 0, failed: 0, skipped: 0, total: 0, duration: 0 };
  let stagingStats = { passed: 0, failed: 0, skipped: 0, total: 0, duration: 0 };
  
  // Parse production results - try multiple possible paths
  const productionPaths = [
    'production-results/test-results/results.json',
    'production-results/results.json',
    'test-results/results.json'
  ];
  
  let productionData = null;
  for (const path of productionPaths) {
    if (fs.existsSync(path)) {
      console.log('Found production results at:', path);
      try {
        productionData = JSON.parse(fs.readFileSync(path, 'utf8'));
        break;
      } catch (error) {
        console.log('Error parsing production results from', path, ':', error.message);
      }
    }
  }
  
  if (productionData) {
    // Playwright JSON format uses different field names
    const expected = productionData.stats?.expected || 0;
    const unexpected = productionData.stats?.unexpected || 0;
    const skipped = productionData.stats?.skipped || 0;
    const flaky = productionData.stats?.flaky || 0;
    
    productionStats = {
      passed: expected - unexpected - flaky, // passed = expected - failed - flaky
      failed: unexpected + flaky, // failed = unexpected + flaky
      skipped: skipped,
      total: expected + skipped, // total = expected + skipped
      duration: Math.round((productionData.stats?.duration || 0) / 1000)
    };
    console.log('Production stats parsed:', productionStats);
    console.log('Raw production stats:', productionData.stats);
  } else {
    console.log('No production results found in any expected location');
  }
  
  // Parse staging results - try multiple possible paths
  const stagingPaths = [
    'staging-results/test-results/results.json',
    'staging-results/results.json',
    'test-results/results.json'
  ];
  
  let stagingData = null;
  for (const path of stagingPaths) {
    if (fs.existsSync(path)) {
      console.log('Found staging results at:', path);
      try {
        stagingData = JSON.parse(fs.readFileSync(path, 'utf8'));
        break;
      } catch (error) {
        console.log('Error parsing staging results from', path, ':', error.message);
      }
    }
  }
  
  if (stagingData) {
    // Playwright JSON format uses different field names
    const expected = stagingData.stats?.expected || 0;
    const unexpected = stagingData.stats?.unexpected || 0;
    const skipped = stagingData.stats?.skipped || 0;
    const flaky = stagingData.stats?.flaky || 0;
    
    stagingStats = {
      passed: expected - unexpected - flaky, // passed = expected - failed - flaky
      failed: unexpected + flaky, // failed = unexpected + flaky
      skipped: skipped,
      total: expected + skipped, // total = expected + skipped
      duration: Math.round((stagingData.stats?.duration || 0) / 1000)
    };
    console.log('Staging stats parsed:', stagingStats);
    console.log('Raw staging stats:', stagingData.stats);
  } else {
    console.log('No staging results found in any expected location');
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
