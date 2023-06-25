import { describe, test } from '@jest/globals'
import { isType, type IsLiteral, type IsStrictBoolean } from '../index.js'

describe('IsLiteral<T>', () => {
	test('`number` is not literal', () => {
		isType.equal<true, false, IsLiteral<number>>()
	})

	test('numeric literals are literals', () => {
		isType.equal<true, true, IsLiteral<1>>()
		isType.equal<true, true, IsLiteral<12345>>()
	})

	test('`string` is not literal', () => {
		isType.equal<true, false, IsLiteral<string>>()
	})

	test('string literals are literals', () => {
		isType.equal<true, true, IsLiteral<'1'>>()
		isType.equal<true, true, IsLiteral<'abc'>>()
	})

	test('override Then/Else', () => {
		isType.equal<true, 'yes', IsLiteral<'1', 'yes'>>()
		isType.equal<true, 'no', IsLiteral<string, 'yes', 'no'>>()
	})
})

describe('IsBoolean<T>', () => {
	test('boolean/true/false', () => {
		isType.equal<true, true, IsStrictBoolean<boolean>>()
		isType.equal<true, false, IsStrictBoolean<false>>()
		isType.equal<true, false, IsStrictBoolean<true>>()
	})
	test('override Then/Else', () => {
		isType.equal<true, 'yes', IsStrictBoolean<boolean, 'yes'>>()
		isType.equal<true, 'no', IsStrictBoolean<1, 'yes', 'no'>>()
	})
})
