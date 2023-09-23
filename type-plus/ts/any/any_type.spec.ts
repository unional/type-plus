import { it } from '@jest/globals'
import { testType, type $Else, type $SelectionBranch, type $SelectionPredicate, type $Then, type AnyType } from '../index.js'

it('returns any for any', () => {
	testType.equal<AnyType<any>, any>(true)
})

it('returns never for other special types', () => {
	testType.never<AnyType<unknown>>(true)
	testType.never<AnyType<void>>(true)
	testType.never<AnyType<never>>(true)
})

it('returns never for other types', () => {
	testType.never<AnyType<undefined>>(true)
	testType.never<AnyType<null>>(true)
	testType.never<AnyType<boolean>>(true)
	testType.never<AnyType<true>>(true)
	testType.never<AnyType<false>>(true)
	testType.never<AnyType<number>>(true)
	testType.never<AnyType<1>>(true)
	testType.never<AnyType<string>>(true)
	testType.never<AnyType<''>>(true)
	testType.never<AnyType<symbol>>(true)
	testType.never<AnyType<bigint>>(true)
	testType.never<AnyType<1n>>(true)
	testType.never<AnyType<{}>>(true)
	testType.never<AnyType<{ a: 1 }>>(true)
	testType.never<AnyType<string[]>>(true)
	testType.never<AnyType<[]>>(true)
	testType.never<AnyType<Function>>(true)
	testType.never<AnyType<() => void>>(true)
})

it('returns any for union type', () => {
	testType.equal<any | 1, any>(true)
	testType.any<AnyType<any | 1>>(true)
})

it('returns any for intersection type', () => {
	testType.equal<any & 1, any>(true)
	testType.any<AnyType<any & 1>>(true)
})

it('as predicate (same as `IsAny`)', () => {
	testType.equal<AnyType<any, $SelectionPredicate>, true>(true)
	testType.equal<AnyType<0, $SelectionPredicate>, false>(true)

	testType.equal<AnyType<never, $SelectionPredicate>, false>(true)
	testType.equal<AnyType<unknown, $SelectionPredicate>, false>(true)
	testType.equal<AnyType<void, $SelectionPredicate>, false>(true)
})

it('as branching', () => {
	testType.equal<AnyType<any, $SelectionBranch>, $Then>(true)
	testType.equal<AnyType<0, $SelectionBranch>, $Else>(true)

	testType.equal<AnyType<unknown, $SelectionBranch>, $Else>(true)
	testType.equal<AnyType<never, $SelectionBranch>, $Else>(true)
	testType.equal<AnyType<void, $SelectionBranch>, $Else>(true)
})

it('works with partial customization', () => {
	testType.equal<AnyType<any, { $then: true }>, true>(true)
	testType.equal<AnyType<0, { $then: true }>, never>(true)

	testType.equal<AnyType<any, { $else: false }>, any>(true)
	testType.equal<AnyType<0, { $else: false }>, false>(true)
})
