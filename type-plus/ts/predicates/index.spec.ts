import { describe, test } from '@jest/globals'
import { isType, type IsStrictBoolean } from '../index.js'

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
