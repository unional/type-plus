const DISABLE = [0]

module.exports = {
	extends: ['@commitlint/config-conventional'],
	rules: {
		'body-max-line-length': DISABLE,
		'footer-max-line-length': DISABLE,
		'header-max-length': DISABLE,
		'subject-case': DISABLE,
	},
}
