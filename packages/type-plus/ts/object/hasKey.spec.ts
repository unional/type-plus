import { describe, expect, test } from '@jest/globals'

import { assertType, type HasKey,hasKey } from '../index.js'

describe('HasKey<T, K>', () => {
	test('true if has key', () => {
		type Foo = { a: 1, b: 2 }
		assertType.isTrue(true as HasKey<Foo, 'a'>)
	})

	test('false if do not have key', () => {
		type Foo = { a: 1, b: 2 }
		assertType.isFalse(false as HasKey<Foo, 'c'>)
	})
})

describe('hasKey()', () => {
	test('true if has key', () => {
		const subject = { a: 1, b: 2 }

		expect(hasKey(subject, 'a')).toBeTruthy()
		expect(hasKey(subject, 'b')).toBeTruthy()
		expect(hasKey(subject, 'a', 'b')).toBeTruthy()
	})
	test('false if do not have key', () => {
		const subject = { a: 1, b: 2 }

		expect(hasKey(subject, 'c')).toBeFalsy()
		expect(hasKey(subject, 'a', 'c')).toBeFalsy()
	})
})
