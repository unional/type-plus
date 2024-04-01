import { describe, test } from '@jest/globals'

import { type IsBoolean, isType } from '../index.js'

describe('IsBoolean<T>', () => {
	test('boolean/true/false', () => {
		isType.equal<true, true, IsBoolean<boolean>>()
		isType.equal<true, false, IsBoolean<false, { exact: true }>>()
		isType.equal<true, false, IsBoolean<true, { exact: true }>>()
	})
	test('override Then/Else', () => {
		isType.equal<true, 'yes', IsBoolean<boolean, { $then: 'yes' }>>()
		isType.equal<true, 'no', IsBoolean<1, { $then: 'yes'; $else: 'no' }>>()
	})
})
