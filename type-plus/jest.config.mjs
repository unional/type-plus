/** @type {import('jest').Config} */
export default {
	preset: '@repobuddy/jest/presets/ts-esm-watch',
	modulePathIgnorePatterns: ['<rootDir>/ts/types', '<rootDir>/ts/type-checker']
}
