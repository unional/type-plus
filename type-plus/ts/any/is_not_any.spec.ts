import { it } from '@jest/globals'
import { testType, type IsNotAny, type $SelectionPredicate } from '../index.js'
import { describe } from 'node:test'

it('returns false for any', () => {
	testType.equal<IsNotAny<any>, false>(true)
})

it('returns true for other special types', () => {
	testType.equal<IsNotAny<unknown>, true>(true)
	testType.equal<IsNotAny<void>, true>(true)
	testType.equal<IsNotAny<never>, true>(true)
})

it('returns true for other types', () => {
	testType.equal<IsNotAny<undefined>, true>(true)
	testType.equal<IsNotAny<null>, true>(true)
	testType.equal<IsNotAny<boolean>, true>(true)
	testType.equal<IsNotAny<true>, true>(true)
	testType.equal<IsNotAny<false>, true>(true)
	testType.equal<IsNotAny<number>, true>(true)
	testType.equal<IsNotAny<1>, true>(true)
	testType.equal<IsNotAny<string>, true>(true)
	testType.equal<IsNotAny<''>, true>(true)
	testType.equal<IsNotAny<symbol>, true>(true)
	testType.equal<IsNotAny<bigint>, true>(true)
	testType.equal<IsNotAny<1n>, true>(true)
	testType.equal<IsNotAny<{}>, true>(true)
	testType.equal<IsNotAny<string[]>, true>(true)
	testType.equal<IsNotAny<[]>, true>(true)
	testType.equal<IsNotAny<Function>, true>(true)
	testType.equal<IsNotAny<() => void>, true>(true)
})

it('returns false for union type', () => {
	testType.equal<any | 1, any>(true)
	testType.equal<IsNotAny<any | 1>, false>(true)
})

it('returns false for intersection type', () => {
	testType.equal<any & 1, any>(true)
	testType.equal<IsNotAny<any & 1>, false>(true)
})

it('can override Then/Else', () => {
	testType.equal<IsNotAny<any, $SelectionPredicate>, false>(true)
	testType.equal<IsNotAny<0, $SelectionPredicate>, true>(true)

	testType.equal<IsNotAny<unknown, $SelectionPredicate>, true>(true)
	testType.equal<IsNotAny<never, $SelectionPredicate>, true>(true)
	testType.equal<IsNotAny<void, $SelectionPredicate>, true>(true)
})

it('works with partial customization', () => {
	testType.equal<IsNotAny<any, { $then: 1 }>, false>(true)
	testType.equal<IsNotAny<0, { $then: 1 }>, 1>(true)

	testType.equal<IsNotAny<any, { $else: 2 }>, 2>(true)
	testType.equal<IsNotAny<0, { $else: 2 }>, true>(true)
})

describe('filter', () => {

	it('returns never for any', () => {
		testType.never<IsNotAny<any, { selection: 'filter' }>>(true)
	})

	it('returns T for other special types', () => {
		testType.equal<IsNotAny<unknown, { selection: 'filter' }>, unknown>(true)
		testType.equal<IsNotAny<void, { selection: 'filter' }>, void>(true)
		testType.equal<IsNotAny<never, { selection: 'filter' }>, never>(true)
	})

	it('returns T for other types', () => {
		testType.equal<IsNotAny<undefined, { selection: 'filter' }>, undefined>(true)
		testType.equal<IsNotAny<null, { selection: 'filter' }>, null>(true)
		testType.equal<IsNotAny<boolean, { selection: 'filter' }>, boolean>(true)
		testType.equal<IsNotAny<true, { selection: 'filter' }>, true>(true)
		testType.equal<IsNotAny<false, { selection: 'filter' }>, false>(true)
		testType.equal<IsNotAny<number, { selection: 'filter' }>, number>(true)
		testType.equal<IsNotAny<1, { selection: 'filter' }>, 1>(true)
		testType.equal<IsNotAny<string, { selection: 'filter' }>, string>(true)
		testType.equal<IsNotAny<'', { selection: 'filter' }>, ''>(true)
		testType.equal<IsNotAny<symbol, { selection: 'filter' }>, symbol>(true)
		testType.equal<IsNotAny<bigint, { selection: 'filter' }>, bigint>(true)
		testType.equal<IsNotAny<1n, { selection: 'filter' }>, 1n>(true)
		testType.equal<IsNotAny<{}, { selection: 'filter' }>, {}>(true)
		testType.equal<IsNotAny<{ a: 1 }, { selection: 'filter' }>, { a: 1 }>(true)
		testType.equal<IsNotAny<string[], { selection: 'filter' }>, string[]>(true)
		testType.equal<IsNotAny<[], { selection: 'filter' }>, []>(true)
		testType.equal<IsNotAny<Function, { selection: 'filter' }>, Function>(true)
		testType.equal<IsNotAny<() => void, { selection: 'filter' }>, () => void>(true)
	})

	it('returns never for union type', () => {
		testType.equal<any | 1, any>(true)
		testType.equal<IsNotAny<any | 1, { selection: 'filter' }>, never>(true)
	})

	it('returns never for intersection type', () => {
		testType.equal<any & 1, any>(true)
		testType.equal<IsNotAny<any & 1, { selection: 'filter' }>, never>(true)
	})
})
