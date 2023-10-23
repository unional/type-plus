import { expect, it, test } from '@jest/globals'

import { isType, someKey } from '../index.js'

test('predicate key can be used as indexer of the subject', () => {
	const subject = { a: 1, b: 2, c: 3 }
	expect(someKey(subject, key => subject[key] === 2)).toBe(true)
})

it('includes subject in callback', () => {
	const subject = { a: 1, b: 2, c: 3 }
	const actual = someKey(subject, (k, _i, _a, s) => s[k] === 2)
	isType.equal<true, boolean, typeof actual>()
	expect(actual).toBe( true)
})
