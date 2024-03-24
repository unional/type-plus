/** @type {import('jest').Config} */
export default {
	preset: '@repobuddy/jest/presets/ts-esm-watch',
	modulePathIgnorePatterns: ['<rootDir>/src/types', '<rootDir>/src/type-checker'],
	roots: ['<rootDir>/src']
}
