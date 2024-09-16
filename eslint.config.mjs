import globals from 'globals'
import yml from 'eslint-plugin-yml'

export default [
	...yml.configs['flat/standard'],
	{
		languageOptions: {
			ecmaVersion: 2022,
			sourceType: 'module',
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
		ignores: ['.*/', 'cjs/', 'coverage/', 'dist/', 'docs/', 'esm/', 'node_modules/'],
		rules: {
			'yml/quotes': ['error', { prefer: 'single' }],
		},
	},
]
