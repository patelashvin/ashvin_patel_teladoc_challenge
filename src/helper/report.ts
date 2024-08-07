const report = require('multiple-cucumber-html-reporter');

report.generate({
  jsonDir: 'test-results',
  reportPath: './',
  reportName: 'Playwright Automation Report',
  pageTitle: 'Webtable App test report',
  displayDuration: false,
  metadata: {
    browser: {
      name: 'chrome',
      version: '120',
    },
    device: 'Mac',
    platform: {
      name: 'IOS',
      version: '14.5 (23F79)',
    },
  },
  customData: {
    title: 'Test Info',
    data: [
      { label: 'Project', value: 'Webtable App' },
      { label: 'Release', value: '1.2.3' },
      { label: 'Cycle', value: 'Smoke-1' },
    ],
  },
});
