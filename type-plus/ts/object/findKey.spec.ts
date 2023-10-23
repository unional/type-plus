import { expect, it } from '@jest/globals'

import { findKey } from '../index.js'

it('pass key as indexer of the subject', () => {
	const subject = { a: 1, b: 2, c: 3 }
	const actual = findKey(subject, key => subject[key] === 2)
	expect(actual).toEqual('b')
})

it('includes subject in callback', () => {
	const subject = { a: 1, b: 2, c: 3 }
	const actual = findKey(subject, (key, _i, _a, s) => s[key] === 2)
	expect(actual).toEqual('b')
})
