import { describe, test } from '@jest/globals'

import { type IsStrictBoolean,isType } from '../index.js'

describe('IsBoolean<T>', () => {
	test('boolean/true/false', () => {
		isType.equal<true, true, IsStrictBoolean<boolean>>()
		isType.equal<true, false, IsStrictBoolean<false>>()
		isType.equal<true, false, IsStrictBoolean<true>>()
	})
	test('override Then/Else', () => {
		isType.equal<true, 'yes', IsStrictBoolean<boolean, { $then: 'yes' }>>()
		isType.equal<true, 'no', IsStrictBoolean<1, { $then: 'yes', $else: 'no' }>>()
	})
})
