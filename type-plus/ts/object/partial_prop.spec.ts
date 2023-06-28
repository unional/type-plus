import { describe, it } from '@jest/globals'
import { testType, type IsOptionalKey, type OptionalKeys } from '../index.js'

describe('IsPartialProp', () => {
	it('returns true for partial prop', () => {
		testType.true<IsOptionalKey<{ a?: number }, 'a'>>(true)
		testType.true<IsOptionalKey<{ a?: number; b: number }, 'a'>>(true)
	})

	it('returns false for non-partial prop', () => {
		testType.false<IsOptionalKey<{ a: number }, 'a'>>(true)
		testType.false<IsOptionalKey<{ a: number; b?: number }, 'a'>>(true)
	})

	it('supports override', () => {
		testType.equal<IsOptionalKey<{ a?: number; b: number }, 'a', 'yes', 'no'>, 'yes'>(true)
		testType.equal<IsOptionalKey<{ a?: number; b: number }, 'b', 'yes', 'no'>, 'no'>(true)
	})
})

describe('PartialPropKeys', () => {
	it('gets the keys of the partial properties', () => {
		testType.equal<OptionalKeys<{ a?: number; b?: number }>, 'a' | 'b'>(true)
		testType.equal<OptionalKeys<{ a?: number; b?: number; c: number }>, 'a' | 'b'>(true)
	})

	it('gets never if T has no partial properties', () => {
		testType.equal<OptionalKeys<{}>, never>(true)
		testType.equal<OptionalKeys<{ c: number }>, never>(true)
	})
})
