import { describe, it, test } from '@jest/globals'
import { testType, type StrictCanAssign } from '../index.js'

describe('StrictCanAssign<A, B>', () => {
	test('literal type to widen', () => {
		testType.true<StrictCanAssign<1, number>>(true)
		testType.true<StrictCanAssign<1, 1>>(true)
		testType.true<StrictCanAssign<number, number>>(true)
		testType.true<StrictCanAssign<'a', string>>(true)
		testType.true<StrictCanAssign<'a', 'a'>>(true)
		testType.true<StrictCanAssign<string, string>>(true)
		testType.true<StrictCanAssign<false, boolean>>(true)
		testType.true<StrictCanAssign<true, boolean>>(true)
		testType.true<StrictCanAssign<boolean, boolean>>(true)
	})
	test('base type to literal type fails', () => {
		testType.false<StrictCanAssign<number, 1>>(true)
		testType.false<StrictCanAssign<string, 'a'>>(true)
		testType.false<StrictCanAssign<true, false>>(true)
		testType.false<StrictCanAssign<false, true>>(true)
		testType.false<StrictCanAssign<boolean, false>>(true)
		testType.false<StrictCanAssign<boolean, true>>(true)
	})
	test('super set to sub set', () => {
		testType.true<StrictCanAssign<{ a: string; b: number }, { a: string }>>(true)
	})
	test('sub set to super set fail', () => {
		testType.false<StrictCanAssign<{ a: string }, { a: string; b: number }>>(true)
	})

	it('union types checks against all branches', () => {
		testType.true<StrictCanAssign<number | string, number | string>>(true)
		testType.true<StrictCanAssign<(number & { a: 1 }) | (string & { a: 1 }), number | string>>(true)

		testType.false<StrictCanAssign<number | string, number>>(true)
	})
})
