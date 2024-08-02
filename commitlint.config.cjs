module.exports = {
	extends: ['@commitlint/config-conventional'],
	rules: {
		'body-max-line-length': [0],
		'footer-max-line-length': [0],
		'subject-case': [2, 'never', ['start-case', 'pascal-case']],
	},
}
