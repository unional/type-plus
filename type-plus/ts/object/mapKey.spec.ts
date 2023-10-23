import { it, test } from '@jest/globals'
import { a } from 'assertron'

import { mapKey } from '../index.js'

test('predicate key can be used as indexer of the subject', () => {
	const subject = { a: 1, b: 2, c: 3 }
	const actual = mapKey(subject, key => subject[key] + 1)
	a.satisfies(actual, [2, 3, 4])
})

it('includes subject in callback', () => {
	const subject = { a: 1, b: 2, c: 3 }
	const actual = mapKey(subject, (key, _i, _a, s) => s[key] + 1)
	a.satisfies(actual, [2, 3, 4])
})
