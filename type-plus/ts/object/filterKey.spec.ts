import { it } from '@jest/globals'
import t from 'assert'
import { filterKey } from '../index.js'

it(`returns with type as 'keyof subject'`, () => {
	const subject = { a: 1, b: 2, c: 3 }
	const actual = filterKey(subject, key => subject[key] > 1)
	t.deepStrictEqual(actual, ['b', 'c'])
})

it('includes subject in callback', () => {
	const subject = { a: 1, b: 2, c: 3 }
	const actual = filterKey(subject, (key, i, a, s) => s[key] > 1)
	t.deepStrictEqual(actual, ['b', 'c'])
})
