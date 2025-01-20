import { test } from '@jest/globals'

import { type KeysWithDiffType, assertType } from '../index.js'

test('disjoint type gets never', () => {
	type A = { a: 1 }
	type B = { b: 2 }
	const actual = 'a' as KeysWithDiffType<A, B>
	assertType<never>(actual)
})

test('key with same type is not included', () => {
	type A = { a: 1 }
	const actual = 'a' as KeysWithDiffType<A, A>
	assertType<never>(actual)
})

test('key with different type is returned', () => {
	type A = { a: 1 }
	type B = { a: 2 }
	const actual = 'a' as KeysWithDiffType<A, B>
	assertType<'a'>(actual)
})
