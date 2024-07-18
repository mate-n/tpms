const { defineConfig } = require('cypress');

module.exports = defineConfig({
  viewportHeight: 1000,
  viewportWidth: 1440,
  defaultCommandTimeout: 60000,
  e2e: {
    baseUrl: 'http://localhost:8080',
    setupNodeEvents(on, config) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const runPlugin = require('./cypress/plugins/index.js');
      return runPlugin(on, config);
    },
  },
});
