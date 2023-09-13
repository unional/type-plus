import { it } from 'node:test'
import { testType, type IsStrictObject } from '../index.js'

it('returns false for special types', () => {
	testType.equal<IsStrictObject<any>, false>(true)
	testType.equal<IsStrictObject<unknown>, false>(true)
	testType.equal<IsStrictObject<never>, false>(true)
	testType.equal<IsStrictObject<void>, false>(true)
})

it('returns false for object literal', () => {
	testType.equal<IsStrictObject<{ a: number }>, false>(true)
})

it('returns false for empty object literal', () => {
	testType.equal<IsStrictObject<{}>, false>(true)
})

it('returns true for object', () => {
	testType.equal<IsStrictObject<object>, true>(true)
})
