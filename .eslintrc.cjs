module.exports = {
	env: {
		node: true,
		es6: true,
	},
	ignorePatterns: ['docs', 'node_modules'],
	parserOptions: {
		sourceType: 'module',
	},
	extends: ['plugin:yml/standard'],
	rules: {
		'yml/quotes': ['error', { prefer: 'single' }],
	},
	root: true,
}
