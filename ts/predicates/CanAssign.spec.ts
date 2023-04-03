import { describe, test } from '@jest/globals'
import { CanAssign, assertType, canAssign } from '../index.js'

describe('CanAssign<A, B>', () => {
	test('literal type to widen', () => {
		assertType.isTrue(true as CanAssign<1, number>)
		assertType.isTrue(true as CanAssign<1, 1>)
		assertType.isTrue(true as CanAssign<number, number>)
		assertType.isTrue(true as CanAssign<'a', string>)
		assertType.isTrue(true as CanAssign<'a', 'a'>)
		assertType.isTrue(true as CanAssign<string, string>)
		assertType.isTrue(true as CanAssign<false, boolean>)
		assertType.isTrue(true as CanAssign<true, boolean>)
		assertType.isTrue(true as CanAssign<boolean, boolean>)
	})
	test('base type to literal type fails', () => {
		assertType.isFalse(false as CanAssign<number, 1>)
		assertType.isFalse(false as CanAssign<string, 'a'>)
		assertType.isFalse(false as CanAssign<true, false>)
		assertType.isFalse(false as CanAssign<false, true>)
		assertType.isFalse(false as CanAssign<boolean, false>)
		assertType.isFalse(false as CanAssign<boolean, true>)
	})
	test('super set to sub set', () => {
		assertType.isTrue(true as CanAssign<{ a: string; b: number }, { a: string }>)
	})
	test('sub set to super set fail', () => {
		assertType.isFalse(false as CanAssign<{ a: string }, { a: string; b: number }>)
	})
})

describe('canAssign()', () => {
	describe('without subject', () => {
		test('returns a function that check type at compile time', () => {
			assertType.isTrue(canAssign<{ a: string }>()({ a: 'a' }))
			assertType.isTrue(canAssign<{ a: string }>()({ a: 'a', b: 'b' }))

			// fails at compile time
			// canAssign<{ a: string }>()({ a: 1 })
		})
		test('work with falsy value such as empty string', () => {
			const s = ''
			assertType.isTrue(canAssign<''>()(s))
		})
		test('work with undefined', () => {
			assertType.isTrue(canAssign<number | undefined>()(undefined))
		})
		test('canAssign false', () => {
			const t = canAssign<{ a: string }>(false)
			assertType.isTrue(t(undefined))
			assertType.isTrue(t({ a: 1 }))

			// @ts-expect-error
			t({ a: '' })
			// @ts-expect-error
			t({ a: '', b: '' })
		})
	})
})
