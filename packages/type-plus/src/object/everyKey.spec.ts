import { expect, test } from '@jest/globals'

import { everyKey } from '../index.js'

test('predicate key can be used as indexer of the subject', () => {
	const subject = { a: 1, b: 2, c: 3 }
	expect(everyKey(subject, (key) => typeof subject[key] === 'number')).toBe(true)
})

test('type this arg', () => {
	const subject = { b: 2 }
	expect(
		everyKey(
			subject,
			function () {
				return this.a === 1
			},
			{ a: 1 },
		),
	).toBe(true)
})
