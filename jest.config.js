const isCI = require('is-ci')
module.exports = isCI ? {
  'collectCoverageFrom': [
    '<rootDir>/src/**/*.[jt]s',
    '!<rootDir>/src/bin.[jt]s',
    '!<rootDir>/src/type-checker/*'
  ],
  'roots': [
    '<rootDir>/src',
  ],
  'reporters': [
    'default',
    [
      'jest-junit',
      {
        'output': '.reports/junit/js-test-results.xml',
      },
    ],
  ],
  'testEnvironment': 'node',
  'testMatch': ['**/?(*.)+(spec|test|integrate|accept|system|unit).[jt]s?(x)'],
} : {
    'collectCoverageFrom': [
      '<rootDir>/src/**/*.[jt]s',
      '!<rootDir>/src/bin.[jt]s',
      '!<rootDir>/src/type-checker/*'
    ],
    'reporters': [
      'default',
      'jest-progress-tracker',
      // ['jest-audio-reporter', { volume: 0.3 }],
    ],
    'roots': [
      '<rootDir>/src',
    ],
    'testEnvironment': 'node',
    'testMatch': ['**/?(*.)+(spec|test|integrate|accept|system|unit).[jt]s?(x)'],
    'watchPlugins': [
      'jest-watch-suspend',
      'jest-watch-typeahead/filename',
      'jest-watch-typeahead/testname',
      [
        'jest-watch-toggle-config', { 'setting': 'verbose' },
      ],
      [
        'jest-watch-toggle-config', { 'setting': 'collectCoverage' },
      ],
    ],
  }
