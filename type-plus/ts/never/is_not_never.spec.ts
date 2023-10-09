import { describe, it } from '@jest/globals'
import { testType, type $Never, type IsNotNever, type $BranchOptions, type $Then, type $Else, type $Any, type $Unknown } from '../index.js'

it('returns false for never', () => {
	testType.false<IsNotNever<never>>(true)
})

it('returns true for other special types', () => {
	testType.true<IsNotNever<unknown>>(true)
	testType.true<IsNotNever<void>>(true)
	testType.true<IsNotNever<any>>(true)
})

it('returns true for singular types', () => {
	testType.true<IsNotNever<undefined>>(true)
	testType.true<IsNotNever<null>>(true)
	testType.true<IsNotNever<number>>(true)
	testType.true<IsNotNever<1>>(true)
	testType.true<IsNotNever<boolean>>(true)
	testType.true<IsNotNever<true>>(true)
	testType.true<IsNotNever<false>>(true)
	testType.true<IsNotNever<string>>(true)
	testType.true<IsNotNever<''>>(true)
	testType.true<IsNotNever<symbol>>(true)
	testType.true<IsNotNever<bigint>>(true)
	testType.true<IsNotNever<1n>>(true)
	testType.true<IsNotNever<{}>>(true)
	testType.true<IsNotNever<string[]>>(true)
	testType.true<IsNotNever<[]>>(true)
	testType.true<IsNotNever<Function>>(true)
	testType.true<IsNotNever<() => void>>(true)
})

it('returns true for union type', () => {
	testType.true<IsNotNever<never | 1>>(true)
})

it('returns false for intersection type', () => {
	testType.false<IsNotNever<never & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	testType.equal<IsNotNever<never, $BranchOptions<$Else>>, $Else>(true)
	testType.equal<IsNotNever<never, $BranchOptions<$Then | $Else>>, $Else>(true)
	testType.equal<IsNotNever<0, $BranchOptions<$Then | $Else>>, $Then>(true)

	testType.equal<IsNotNever<any, $BranchOptions<$Then>>, $Then>(true)
	testType.equal<IsNotNever<any, $BranchOptions<$Any>>, $Any>(true)
	testType.equal<IsNotNever<any, $BranchOptions<$Any | $Then>>, $Any>(true)
	testType.equal<IsNotNever<unknown, $BranchOptions<$Then>>, $Then>(true)
	testType.equal<IsNotNever<unknown, $BranchOptions<$Unknown>>, $Unknown>(true)
	testType.equal<IsNotNever<unknown, $BranchOptions<$Unknown | $Then>>, $Unknown>(true)
})

it('can override Then/Else', () => {
	testType.equal<IsNotNever<never, { $then: 1, $else: 2 }>, 2>(true)
	testType.equal<IsNotNever<0, { $then: 1, $else: 2 }>, 1>(true)

	testType.equal<IsNotNever<any, { $then: 1, $else: 2 }>, 1>(true)
	testType.equal<IsNotNever<unknown, { $then: 1, $else: 2 }>, 1>(true)
	testType.equal<IsNotNever<void, { $then: 1, $else: 2 }>, 1>(true)
})

describe('filter', () => {
	it('returns `is_never` if T is never', () => {
		testType.equal<IsNotNever<never, { selection: 'filter' }>, $Never>(true)
	})

	it('returns T for other special types', () => {
		testType.equal<IsNotNever<unknown, { selection: 'filter' }>, unknown>(true)
		testType.equal<IsNotNever<void, { selection: 'filter' }>, void>(true)
		testType.equal<IsNotNever<any, { selection: 'filter' }>, any>(true)
	})

	it('returns T for other types', () => {
		testType.equal<IsNotNever<undefined, { selection: 'filter' }>, undefined>(true)
		testType.equal<IsNotNever<null, { selection: 'filter' }>, null>(true)
		testType.equal<IsNotNever<number, { selection: 'filter' }>, number>(true)
		testType.equal<IsNotNever<boolean, { selection: 'filter' }>, boolean>(true)
		testType.equal<IsNotNever<true, { selection: 'filter' }>, true>(true)
		testType.equal<IsNotNever<false, { selection: 'filter' }>, false>(true)
		testType.equal<IsNotNever<string, { selection: 'filter' }>, string>(true)
		testType.equal<IsNotNever<'', { selection: 'filter' }>, ''>(true)
		testType.equal<IsNotNever<symbol, { selection: 'filter' }>, symbol>(true)
		testType.equal<IsNotNever<bigint, { selection: 'filter' }>, bigint>(true)
		testType.equal<IsNotNever<{}, { selection: 'filter' }>, {}>(true)
		testType.equal<IsNotNever<string[], { selection: 'filter' }>, string[]>(true)
		testType.equal<IsNotNever<[], { selection: 'filter' }>, []>(true)
		testType.equal<IsNotNever<Function, { selection: 'filter' }>, Function>(true)
		testType.equal<IsNotNever<() => void, { selection: 'filter' }>, () => void>(true)
	})

	it('returns T for union type', () => {
		testType.equal<IsNotNever<never | 1, { selection: 'filter' }>, 1>(true)
	})

	it('returns $Never for intersection type', () => {
		testType.equal<IsNotNever<never & { a: 1 }, { selection: 'filter' }>, $Never>(true)
	})
})
