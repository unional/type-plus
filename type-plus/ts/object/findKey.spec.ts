import { it } from '@jest/globals'
import t from 'assert'
import { findKey } from '../index.js'

it('pass key as indexer of the subject', () => {
	const subject = { a: 1, b: 2, c: 3 }
	const actual = findKey(subject, key => subject[key] === 2)
	t.strictEqual(actual, 'b')
})

it('includes subject in callback', () => {
	const subject = { a: 1, b: 2, c: 3 }
	const actual = findKey(subject, (key, i, a, s) => s[key] === 2)
	t.strictEqual(actual, 'b')
})
