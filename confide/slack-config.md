# Slack Configuration for Playwright Notifications
# Update these values to match your Slack setup

SLACK_CHANNEL: "#playwright-automation-report"  # Configured for your channel
SLACK_WEBHOOK_URL: "YOUR_WEBHOOK_URL_HERE"  # This should be set as a GitHub Secret

# Example channels you might want to use:
# - #general (default channel)
# - #dev-team (development team)
# - #qa-notifications (QA team)
# - #alerts (alerts and monitoring)
# - #test-automation (dedicated test channel)
# - #ci-cd (CI/CD notifications)

# To change the channel:
# 1. Update the SLACK_CHANNEL value above
# 2. Update the channel values in the workflow files:
#    - .github/workflows/playwright-tests.yml
#    - .github/workflows/slack-notifications.yml
