import { expect, it } from '@jest/globals'

import { filterKey } from '../index.js'

it(`returns with type as 'keyof subject'`, () => {
	const subject = { a: 1, b: 2, c: 3 }
	const actual = filterKey(subject, (key) => subject[key] > 1)
	expect(actual).toEqual(['b', 'c'])
})

it('includes subject in callback', () => {
	const subject = { a: 1, b: 2, c: 3 }
	const actual = filterKey(subject, (key, _i, _a, s) => s[key] > 1)
	expect(actual).toEqual(['b', 'c'])
})
