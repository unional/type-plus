import { describe, it } from '@jest/globals'

import { type IsLiteral,testType } from '../index.js'

describe('IsLiteral<T>', () => {
	it('returns false for `number` type', () => {
		testType.false<IsLiteral<number>>(true)
	})

	it('returns true for numeric literals', () => {
		testType.true<IsLiteral<1>>(true)
		testType.true<IsLiteral<12345>>(true)
	})

	it('returns false for `string` type', () => {
		testType.false<IsLiteral<string>>(true)
	})

	it('returns true for string literals', () => {
		testType.true<IsLiteral<'1'>>(true)
		testType.true<IsLiteral<'abc'>>(true)
	})

	it('returns false for `boolean` type', () => {
		testType.false<IsLiteral<boolean>>(true)
	})

	it('returns true for boolean literals', () => {
		testType.true<IsLiteral<true>>(true)
		testType.true<IsLiteral<false>>(true)
	})

	it('returns false for `symbol` type', () => {
		testType.false<IsLiteral<symbol>>(true)
	})

	it('returns true for unique symbol', () => {
		const sym = Symbol()
		const keySym = Symbol.for('key')
		testType.true<IsLiteral<typeof sym>>(true)
		testType.true<IsLiteral<typeof keySym>>(true)
	})

	it('returns false for `bigint` type', () => {
		testType.false<IsLiteral<bigint>>(true)
	})

	it('returns true for bigint literals', () => {
		testType.true<IsLiteral<1n>>(true)
		testType.true<IsLiteral<12345n>>(true)
	})

	it('override Then/Else', () => {
		testType.equal<IsLiteral<'1', 'yes'>, 'yes'>(true)
		testType.equal<IsLiteral<string, 'yes', 'no'>, 'no'>(true)
	})
})
