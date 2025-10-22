# 🚀 Playwright Automation CI/CD Pipeline

This repository contains a comprehensive CI/CD pipeline for Playwright automation tests with support for multiple environments and deployment strategies.

## 📋 Features

- ✅ **Multi-Environment Testing** - Production and Staging environments
- ✅ **Sequential Test Execution** - Tests run one at a time for stability
- ✅ **Automated Browser Management** - Fresh browser for each test
- ✅ **Comprehensive Reporting** - HTML, JUnit, and JSON reports
- ✅ **Docker Support** - Containerized test execution
- ✅ **GitHub Actions** - Automated CI/CD pipeline
- ✅ **Artifact Collection** - Test results and screenshots
- ✅ **Environment Variables** - Configurable test settings

## 🏗️ CI/CD Pipeline Structure

### GitHub Actions Workflow

The pipeline includes the following jobs:

1. **Lint and Validate** - Code quality checks
2. **Test Production** - Production environment tests
3. **Test Staging** - Staging environment tests  
4. **Test All** - Complete test suite (scheduled)
5. **Test Report** - Generate consolidated reports
6. **Notify** - Failure notifications

### Trigger Events

- **Push to main/develop** - Runs environment-specific tests
- **Pull Requests** - Runs all tests
- **Daily Schedule** - Complete test suite at 2 AM UTC
- **Manual Trigger** - On-demand execution

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
cd confide
npm install

# Install Playwright browsers
npm run test:install

# Run tests locally
npm run test:production
npm run test:staging
npm run test:production-first
```

### CI/CD Execution

```bash
# Run CI-optimized tests
npm run test:ci
npm run test:ci:production
npm run test:ci:staging
npm run test:ci:all
```

### Docker Execution

```bash
# Build and run with Docker
docker build -t playwright-tests .
docker run -v $(pwd)/confide/test-results:/app/test-results playwright-tests

# Or use Docker Compose
docker-compose up
```

## 📁 Project Structure

```
confide/
├── .github/workflows/          # GitHub Actions workflows
├── tests/                      # Test files
│   ├── Production/            # Production tests
│   └── Staging/              # Staging tests
├── pages/                     # Page Object Models
├── resources/                 # Test data and utilities
├── playwright.config.js       # Local development config
├── playwright.config.ci.js    # CI/CD optimized config
├── global-setup.js           # Global test setup
├── global-teardown.js        # Global test teardown
└── env.example              # Environment variables template
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file based on `env.example`:

```bash
# Production Environment
PRODUCTION_BASE_URL=https://app.confideplatform.com
PRODUCTION_LOGIN_URL=https://app.confideplatform.com/customer/login

# Staging Environment  
STAGING_BASE_URL=https://app.stgv2.confide.solutions
STAGING_LOGIN_URL=https://app.stgv2.confide.solutions/customer/login

# Test Configuration
HEADLESS=true
WORKERS=1
RETRIES=2
TIMEOUT=30000
```

### Test Execution Modes

| Command | Description |
|---------|-------------|
| `npm run test` | Run all tests (local config) |
| `npm run test:production` | Production tests only |
| `npm run test:staging` | Staging tests only |
| `npm run test:production-first` | Production then Staging |
| `npm run test:ci` | CI-optimized tests |
| `npm run test:debug` | Debug mode |
| `npm run test:headed` | Visible browser |
| `npm run test:ui` | Playwright UI mode |

## 📊 Reports and Artifacts

### Generated Reports

- **HTML Report** - Interactive test results
- **JUnit XML** - CI/CD integration
- **JSON Report** - Programmatic access
- **Screenshots** - Failure captures
- **Videos** - Test recordings (on failure)
- **Traces** - Detailed execution traces

### Artifact Locations

- `test-results/` - Test execution results
- `playwright-report/` - HTML reports
- `debug-*.png` - Debug screenshots

## 🔧 Troubleshooting

### Common Issues

1. **Auth0 Redirects** - Check environment URLs and credentials
2. **Timeout Errors** - Increase timeout values in config
3. **Browser Issues** - Ensure Playwright browsers are installed
4. **CI Failures** - Check environment variables and permissions

### Debug Commands

```bash
# Run with debug output
DEBUG=pw:api npm run test:debug

# Generate test code
npm run test:codegen

# View test results
npm run test:report
```

## 🚀 Deployment

### GitHub Actions

The pipeline automatically runs on:
- Push to main/develop branches
- Pull request creation
- Daily schedule (2 AM UTC)
- Manual workflow dispatch

### Docker Deployment

```bash
# Build image
docker build -t playwright-tests .

# Run tests
docker run -e CI=true playwright-tests

# View reports
docker run -p 8080:80 -v $(pwd)/confide/playwright-report:/usr/share/nginx/html nginx:alpine
```

## 📈 Monitoring and Alerts

- **Test Results** - Available in GitHub Actions
- **Artifacts** - Stored for 30 days
- **Notifications** - Configure in workflow file
- **Reports** - Accessible via GitHub Pages (optional)

## 🤝 Contributing

1. Create feature branch
2. Add tests for new functionality
3. Ensure all tests pass
4. Submit pull request
5. CI/CD pipeline will validate changes

## 📚 Additional Resources

- [Playwright Documentation](https://playwright.dev/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Docker Documentation](https://docs.docker.com/)
- [CI/CD Best Practices](https://docs.github.com/en/actions/learn-github-actions)

---

**Happy Testing! 🎉**

