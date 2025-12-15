import { expect, test } from 'vitest'

import { facade } from '../index.js'

test('facade on property', () => {
	const subject = { a: 1, b: 2, c: 3 }

	const actual = facade(subject, 'a', 'b')
	expect(actual.a).toBe(1)
	expect(actual.b).toBe(2)

	actual.b = 4
	expect(subject.b).toBe(4)
})

test('facade on function', () => {
	const subject = {
		a: 1,
		foo() {
			return this.a
		},
	}

	const actual = facade(subject, 'foo')
	expect(actual.foo()).toBe(1)
})
