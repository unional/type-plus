/** @type {import('prettier').Config} */
module.exports = {
	arrowParens: 'avoid',
	printWidth: 110,
	semi: false,
	singleQuote: true,
	// For ES5, trailing commas cannot be used in function parameters; it is counterintuitive
	// to use them for arrays only
	trailingComma: 'none',
	useTabs: true
}
