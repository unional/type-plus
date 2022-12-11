/** @type {import('jest').Config} */
export default {
  preset: '@repobuddy/jest/presets/ts',
  modulePathIgnorePatterns: [
    '<rootDir>/ts/types',
    '<rootDir>/ts/type-checker'
  ]
}
