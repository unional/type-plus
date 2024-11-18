import yml from 'eslint-plugin-yml'

export default [
	{
		ignores: ['**/coverage/', '**/dist/', '**/cjs/', '**/esm/'],
	},
	...yml.configs['flat/standard'],
	{
		ignores: ['.*/'],
		rules: {
			'yml/quotes': ['error', { prefer: 'single' }],
		},
	},
]
