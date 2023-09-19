import { it } from '@jest/globals'
import { testType, type IsAnyOrNever, type $Then, type $Else, type $SelectionPredicate } from '../index.js'

it('returns true for any', () => {
	testType.equal<IsAnyOrNever<any>, $Then>(true)
})

it('returns true for never', () => {
	testType.equal<IsAnyOrNever<never>, $Then>(true)
})

it('returns false for other special types', () => {
	testType.equal<IsAnyOrNever<unknown>, $Else>(true)
	testType.equal<IsAnyOrNever<void>, $Else>(true)
})

it('returns never for other types', () => {
	testType.equal<IsAnyOrNever<undefined>, $Else>(true)
	testType.equal<IsAnyOrNever<null>, $Else>(true)
	testType.equal<IsAnyOrNever<boolean>, $Else>(true)
	testType.equal<IsAnyOrNever<true>, $Else>(true)
	testType.equal<IsAnyOrNever<false>, $Else>(true)
	testType.equal<IsAnyOrNever<number>, $Else>(true)
	testType.equal<IsAnyOrNever<1>, $Else>(true)
	testType.equal<IsAnyOrNever<string>, $Else>(true)
	testType.equal<IsAnyOrNever<''>, $Else>(true)
	testType.equal<IsAnyOrNever<symbol>, $Else>(true)
	testType.equal<IsAnyOrNever<bigint>, $Else>(true)
	testType.equal<IsAnyOrNever<1n>, $Else>(true)
	testType.equal<IsAnyOrNever<{}>, $Else>(true)
	testType.equal<IsAnyOrNever<{ a: 1 }>, $Else>(true)
	testType.equal<IsAnyOrNever<string[]>, $Else>(true)
	testType.equal<IsAnyOrNever<[]>, $Else>(true)
	testType.equal<IsAnyOrNever<Function>, $Else>(true)
	testType.equal<IsAnyOrNever<() => void>, $Else>(true)
})

it('returns true for `any | 1` because that is resolved to `any` by TypeScript', () => {
	testType.equal<any | 1, any>(true)
	testType.equal<IsAnyOrNever<any | 1>, $Then>(true)
})

it('returns false for `never | 1` because that is resolved to `1` by TypeScript', () => {
	testType.equal<never | 1, 1>(true)
	testType.equal<IsAnyOrNever<never | 1>, $Else>(true)
})

it('returns true for intersection type', () => {
	testType.equal<any & 1, any>(true)
	testType.equal<IsAnyOrNever<any & 1>, $Then>(true)

	testType.equal<never & 1, never>(true)
	testType.equal<IsAnyOrNever<never & 1>, $Then>(true)
})

it('can override Then/Else', () => {
	testType.equal<IsAnyOrNever<any, $SelectionPredicate>, true>(true)
	testType.equal<IsAnyOrNever<never, $SelectionPredicate>, true>(true)

	testType.equal<IsAnyOrNever<0, $SelectionPredicate>, false>(true)
	testType.equal<IsAnyOrNever<unknown, $SelectionPredicate>, false>(true)
	testType.equal<IsAnyOrNever<void, $SelectionPredicate>, false>(true)
})
