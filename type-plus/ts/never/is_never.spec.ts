import { describe, it } from '@jest/globals'
import { testType, type $NotNever, type IsNever } from '../index.js'

it('returns true for never', () => {
	testType.true<IsNever<never>>(true)
})

it('returns false for other special types', () => {
	testType.false<IsNever<unknown>>(true)
	testType.false<IsNever<void>>(true)
	testType.false<IsNever<any>>(true)
})

it('returns false for other types', () => {
	testType.false<IsNever<undefined>>(true)
	testType.false<IsNever<null>>(true)
	testType.false<IsNever<number>>(true)
	testType.false<IsNever<1>>(true)
	testType.false<IsNever<boolean>>(true)
	testType.false<IsNever<true>>(true)
	testType.false<IsNever<false>>(true)
	testType.false<IsNever<string>>(true)
	testType.false<IsNever<''>>(true)
	testType.false<IsNever<symbol>>(true)
	testType.false<IsNever<bigint>>(true)
	testType.false<IsNever<1n>>(true)
	testType.false<IsNever<{}>>(true)
	testType.false<IsNever<string[]>>(true)
	testType.false<IsNever<[]>>(true)
	testType.false<IsNever<Function>>(true)
	testType.false<IsNever<() => void>>(true)
})

it('returns false for union type', () => {
	testType.false<IsNever<never | 1>>(true)
})

it('returns true for intersection type', () => {
	testType.true<IsNever<never & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	testType.equal<IsNever<never, { $then: 1, $else: 2 }>, 1>(true)
	testType.equal<IsNever<0, { $then: 1, $else: 2 }>, 2>(true)

	testType.equal<IsNever<any, { $then: 1, $else: 2 }>, 2>(true)
	testType.equal<IsNever<unknown, { $then: 1, $else: 2 }>, 2>(true)
	testType.equal<IsNever<void, { $then: 1, $else: 2 }>, 2>(true)
})

describe('filter', () => {

	it('returns never if T is never', () => {
		testType.equal<IsNever<never, { selection: 'filter' }>, never>(true)
	})

	it('returns $NotNever for other special types', () => {
		testType.equal<IsNever<unknown, { selection: 'filter' }>, $NotNever>(true)
		testType.equal<IsNever<void, { selection: 'filter' }>, $NotNever>(true)
		testType.equal<IsNever<any, { selection: 'filter' }>, $NotNever>(true)
	})

	it('returns $NotNever for other types', () => {
		testType.equal<IsNever<undefined, { selection: 'filter' }>, $NotNever>(true)
		testType.equal<IsNever<null, { selection: 'filter' }>, $NotNever>(true)
		testType.equal<IsNever<number, { selection: 'filter' }>, $NotNever>(true)
		testType.equal<IsNever<boolean, { selection: 'filter' }>, $NotNever>(true)
		testType.equal<IsNever<true, { selection: 'filter' }>, $NotNever>(true)
		testType.equal<IsNever<false, { selection: 'filter' }>, $NotNever>(true)
		testType.equal<IsNever<string, { selection: 'filter' }>, $NotNever>(true)
		testType.equal<IsNever<'', { selection: 'filter' }>, $NotNever>(true)
		testType.equal<IsNever<symbol, { selection: 'filter' }>, $NotNever>(true)
		testType.equal<IsNever<bigint, { selection: 'filter' }>, $NotNever>(true)
		testType.equal<IsNever<{}, { selection: 'filter' }>, $NotNever>(true)
		testType.equal<IsNever<string[], { selection: 'filter' }>, $NotNever>(true)
		testType.equal<IsNever<[], { selection: 'filter' }>, $NotNever>(true)
		testType.equal<IsNever<Function, { selection: 'filter' }>, $NotNever>(true)
		testType.equal<IsNever<() => void, { selection: 'filter' }>, $NotNever>(true)
	})

	it('returns $NotNever for union type', () => {
		testType.equal<IsNever<never | 1, { selection: 'filter' }>, $NotNever>(true)
	})

	it('returns never for intersection type', () => {
		// TypeScript resolve this to `never` automatically,
		// so `IsNever<>` actually does not do anthing in this case.
		testType.never<never & { a: 1 }>(true)
		testType.never<IsNever<never & { a: 1 }, { selection: 'filter' }>>(true)
	})
})
