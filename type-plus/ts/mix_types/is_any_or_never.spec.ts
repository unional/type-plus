import { it } from '@jest/globals'

import { type $SelectionPredicate, type IsAnyOrNever,testType } from '../index.js'

it('returns true for any', () => {
	testType.equal<IsAnyOrNever<any>, true>(true)
})

it('returns true for never', () => {
	testType.equal<IsAnyOrNever<never>, true>(true)
})

it('returns false for other special types', () => {
	testType.equal<IsAnyOrNever<unknown>, false>(true)
	testType.equal<IsAnyOrNever<void>, false>(true)
})

it('returns never for other types', () => {
	testType.equal<IsAnyOrNever<undefined>, false>(true)
	testType.equal<IsAnyOrNever<null>, false>(true)
	testType.equal<IsAnyOrNever<boolean>, false>(true)
	testType.equal<IsAnyOrNever<true>, false>(true)
	testType.equal<IsAnyOrNever<false>, false>(true)
	testType.equal<IsAnyOrNever<number>, false>(true)
	testType.equal<IsAnyOrNever<1>, false>(true)
	testType.equal<IsAnyOrNever<string>, false>(true)
	testType.equal<IsAnyOrNever<''>, false>(true)
	testType.equal<IsAnyOrNever<symbol>, false>(true)
	testType.equal<IsAnyOrNever<bigint>, false>(true)
	testType.equal<IsAnyOrNever<1n>, false>(true)
	testType.equal<IsAnyOrNever<{}>, false>(true)
	testType.equal<IsAnyOrNever<{ a: 1 }>, false>(true)
	testType.equal<IsAnyOrNever<string[]>, false>(true)
	testType.equal<IsAnyOrNever<[]>, false>(true)
	testType.equal<IsAnyOrNever<Function>, false>(true)
	testType.equal<IsAnyOrNever<() => void>, false>(true)
})

it('returns true for `any | 1` because that is resolved to `any` by TypeScript', () => {
	testType.equal<any | 1, any>(true)
	testType.equal<IsAnyOrNever<any | 1>, true>(true)
})

it('returns false for `never | 1` because that is resolved to `1` by TypeScript', () => {
	testType.equal<never | 1, 1>(true)
	testType.equal<IsAnyOrNever<never | 1>, false>(true)
})

it('returns true for intersection type', () => {
	testType.equal<any & 1, any>(true)
	testType.equal<IsAnyOrNever<any & 1>, true>(true)

	testType.equal<never & 1, never>(true)
	testType.equal<IsAnyOrNever<never & 1>, true>(true)
})

it('can override Then/Else', () => {
	testType.equal<IsAnyOrNever<any, $SelectionPredicate>, true>(true)
	testType.equal<IsAnyOrNever<never, $SelectionPredicate>, true>(true)

	testType.equal<IsAnyOrNever<0, $SelectionPredicate>, false>(true)
	testType.equal<IsAnyOrNever<unknown, $SelectionPredicate>, false>(true)
	testType.equal<IsAnyOrNever<void, $SelectionPredicate>, false>(true)
})
