/**
 * Local Slack notification script
 * Run this after local tests to send notifications
 */

const https = require('https');

// Configuration
const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL || 'YOUR_WEBHOOK_URL_HERE';
const CHANNEL = '#playwright-automation-report';

/**
 * Send Slack notification
 */
async function sendSlackNotification(testResults) {
  if (!SLACK_WEBHOOK_URL || SLACK_WEBHOOK_URL === 'YOUR_WEBHOOK_URL_HERE') {
    console.log('⚠️  SLACK_WEBHOOK_URL not configured. Set it as environment variable or update the script.');
    return;
  }

  const message = {
    channel: CHANNEL,
    username: 'Playwright Local Tests',
    icon_emoji: ':robot_face:',
    text: `🧪 *Local Playwright Test Results*`,
    attachments: [
      {
        color: testResults.failed > 0 ? 'danger' : 'good',
        fields: [
          {
            title: 'Status',
            value: testResults.failed > 0 ? '❌ Failed' : '✅ Passed',
            short: true
          },
          {
            title: 'Total Tests',
            value: testResults.total.toString(),
            short: true
          },
          {
            title: 'Passed',
            value: testResults.passed.toString(),
            short: true
          },
          {
            title: 'Failed',
            value: testResults.failed.toString(),
            short: true
          },
          {
            title: 'Duration',
            value: `${testResults.duration}ms`,
            short: true
          },
          {
            title: 'Environment',
            value: 'Local Development',
            short: true
          }
        ],
        footer: 'Playwright Automation',
        ts: Math.floor(Date.now() / 1000)
      }
    ]
  };

  const postData = JSON.stringify(message);
  const url = new URL(SLACK_WEBHOOK_URL);

  const options = {
    hostname: url.hostname,
    port: 443,
    path: url.pathname,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const req = https.request(options, (res) => {
    console.log(`📤 Slack notification sent! Status: ${res.statusCode}`);
  });

  req.on('error', (e) => {
    console.error(`❌ Error sending Slack notification: ${e.message}`);
  });

  req.write(postData);
  req.end();
}

/**
 * Example usage
 */
function main() {
  // Example test results - replace with actual results
  const testResults = {
    total: 4,
    passed: 4,
    failed: 0,
    skipped: 0,
    duration: 45000
  };

  console.log('🚀 Sending local test results to Slack...');
  sendSlackNotification(testResults);
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { sendSlackNotification };
