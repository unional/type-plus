module.exports = {
  'collectCoverageFrom': [
    '<rootDir>/ts/**/*.[jt]s',
    '!<rootDir>/ts/bin.[jt]s',
    '!<rootDir>/ts/type-checker/*',
    '!<rootDir>/ts/types/*'
  ],
  'reporters': [
    'default',
    'jest-progress-tracker'
  ],
  'roots': [
    '<rootDir>/ts',
  ],
  'testEnvironment': 'node',
  'testMatch': ['**/?(*.)+(spec|test|integrate|accept|system|unit).[jt]s?(x)'],
  'watchPlugins': [
    'jest-watch-suspend',
    'jest-watch-repeat',
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
