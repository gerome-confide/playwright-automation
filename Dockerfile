# Dockerfile for Playwright Tests
FROM mcr.microsoft.com/playwright:v1.40.0-focal

# Set working directory
WORKDIR /app

# Copy package files
COPY confide/package*.json ./

# Install dependencies
RUN npm ci

# Copy test files
COPY confide/ ./

# Install Playwright browsers
RUN npx playwright install --with-deps

# Set environment variables
ENV CI=true
ENV PLAYWRIGHT_BROWSERS_PATH=0
ENV HEADLESS=true

# Expose port for reports
EXPOSE 9323

# Default command
CMD ["npm", "run", "test:ci"]

