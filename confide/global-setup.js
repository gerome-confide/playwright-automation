/**
 * Global setup for Playwright tests
 * Runs once before all tests
 */
async function globalSetup(config) {
  console.log('🚀 Starting Playwright test suite...');
  console.log(`Environment: ${process.env.CI ? 'CI/CD' : 'Local'}`);
  console.log(`Headless mode: ${process.env.CI ? 'true' : 'false'}`);
  console.log(`Workers: ${config.workers}`);
  
  // Set up any global test data or configurations
  if (process.env.CI) {
    console.log('📋 CI/CD environment detected - applying optimizations');
  }
  
  // Validate environment variables
  const requiredEnvVars = ['PRODUCTION_BASE_URL', 'STAGING_BASE_URL'];
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0 && process.env.CI) {
    console.warn(`⚠️  Missing environment variables: ${missingVars.join(', ')}`);
    console.warn('Using default values...');
  }
  
  console.log('✅ Global setup completed');
}

module.exports = globalSetup;

