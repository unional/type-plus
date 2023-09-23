import { it } from '@jest/globals'
import { testType, type $SelectionPredicate, type NotAnyType, type $SelectionBranch, type $Else, type $Then } from '../index.js'

it('returns never for any', () => {
	testType.never<NotAnyType<any>>(true)
})

it('returns T for other special types', () => {
	testType.equal<NotAnyType<unknown>, unknown>(true)
	testType.equal<NotAnyType<void>, void>(true)
	testType.equal<NotAnyType<never>, never>(true)
})

it('returns T for other types', () => {
	testType.equal<NotAnyType<undefined>, undefined>(true)
	testType.equal<NotAnyType<null>, null>(true)
	testType.equal<NotAnyType<boolean>, boolean>(true)
	testType.equal<NotAnyType<true>, true>(true)
	testType.equal<NotAnyType<false>, false>(true)
	testType.equal<NotAnyType<number>, number>(true)
	testType.equal<NotAnyType<1>, 1>(true)
	testType.equal<NotAnyType<string>, string>(true)
	testType.equal<NotAnyType<''>, ''>(true)
	testType.equal<NotAnyType<symbol>, symbol>(true)
	testType.equal<NotAnyType<bigint>, bigint>(true)
	testType.equal<NotAnyType<1n>, 1n>(true)
	testType.equal<NotAnyType<{}>, {}>(true)
	testType.equal<NotAnyType<{ a: 1 }>, { a: 1 }>(true)
	testType.equal<NotAnyType<string[]>, string[]>(true)
	testType.equal<NotAnyType<[]>, []>(true)
	testType.equal<NotAnyType<Function>, Function>(true)
	testType.equal<NotAnyType<() => void>, () => void>(true)
})

it('returns never for union type', () => {
	testType.equal<any | 1, any>(true)
	testType.equal<NotAnyType<any | 1>, never>(true)
})

it('returns never for intersection type', () => {
	testType.equal<any & 1, any>(true)
	testType.equal<NotAnyType<any & 1>, never>(true)
})

it('as predicate (same as `IsNotAny`)', () => {
	testType.equal<NotAnyType<any, $SelectionPredicate>, false>(true)
	testType.equal<NotAnyType<0, $SelectionPredicate>, true>(true)

	testType.equal<NotAnyType<never, $SelectionPredicate>, true>(true)
	testType.equal<NotAnyType<unknown, $SelectionPredicate>, true>(true)
	testType.equal<NotAnyType<void, $SelectionPredicate>, true>(true)
})

it('as branching', () => {
	testType.equal<NotAnyType<any, $SelectionBranch>, $Else>(true)
	testType.equal<NotAnyType<0, $SelectionBranch>, $Then>(true)

	testType.equal<NotAnyType<unknown, $SelectionBranch>, $Then>(true)
	testType.equal<NotAnyType<never, $SelectionBranch>, $Then>(true)
	testType.equal<NotAnyType<void, $SelectionBranch>, $Then>(true)
})

it('works with partial customization', () => {
	testType.equal<NotAnyType<any, { $then: true }>, never>(true)
	testType.equal<NotAnyType<0, { $then: true }>, true>(true)

	testType.equal<NotAnyType<any, { $else: false }>, false>(true)
	testType.equal<NotAnyType<0, { $else: false }>, 0>(true)
})
