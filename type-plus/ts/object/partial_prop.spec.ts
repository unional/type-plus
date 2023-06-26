import { describe, it } from '@jest/globals'
import { testType, type IsPartialProp, type PartialPropKeys } from '../index.js'

describe('IsPartialProp', () => {
	it('returns true for partial prop', () => {
		testType.true<IsPartialProp<{ a?: number }, 'a'>>(true)
		testType.true<IsPartialProp<{ a?: number; b: number }, 'a'>>(true)
	})

	it('returns false for non-partial prop', () => {
		testType.false<IsPartialProp<{ a: number }, 'a'>>(true)
		testType.false<IsPartialProp<{ a: number; b?: number }, 'a'>>(true)
	})

	it('supports override', () => {
		testType.equal<IsPartialProp<{ a?: number; b: number }, 'a', 'yes', 'no'>, 'yes'>(true)
		testType.equal<IsPartialProp<{ a?: number; b: number }, 'b', 'yes', 'no'>, 'no'>(true)
	})
})

describe('PartialPropKeys', () => {
	it('gets the keys of the partial properties', () => {
		testType.equal<PartialPropKeys<{ a?: number; b?: number }>, 'a' | 'b'>(true)
		testType.equal<PartialPropKeys<{ a?: number; b?: number; c: number }>, 'a' | 'b'>(true)
	})

	it('gets never if T has no partial properties', () => {
		testType.equal<PartialPropKeys<{}>, never>(true)
		testType.equal<PartialPropKeys<{ c: number }>, never>(true)
	})
})
