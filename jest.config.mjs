export default {
  preset: 'ts-jest/presets/default-esm',
  globals: {
    'ts-jest': {
      isolatedModules: true,
      useESM: true,
    },
  },
  collectCoverageFrom: [
    '<rootDir>/ts/**/*.[jt]s',
    '!<rootDir>/ts/bin.[jt]s',
    '!<rootDir>/ts/type-checker/*',
    '!<rootDir>/ts/types/*'
  ],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    '#(.*)': '<rootDir>/node_modules/$1'
  },
  modulePathIgnorePatterns: [
    '<rootDir>/ts/types',
    '<rootDir>/ts/type-checker'
  ],
  roots: [
    '<rootDir>/ts',
  ],
  testEnvironment: 'node',
  testMatch: [
    '**/?(*.)+(spec|test|integrate|accept|system|unit).[jt]s?(x)',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(@unional\\fixture|chalk)/)'
  ],
  transform: {
    '^.+\\.(js|jsx|mjs)$': 'babel-jest',
  },
  watchPlugins: [
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
