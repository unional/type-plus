import { test, it } from '@jest/globals'
import { testType, type FindFirst, ArrayPlus } from '../index.js'

test('behavior of array.find()', () => {
	const array = [1, 2, '3']
	const r = array.find(x => typeof x === 'number')
	testType.equal<typeof r, number | string | undefined>(true)
})

test('behavior of tuple.find()', () => {
	const tuple = [1, 2, '3'] as const
	const r = tuple.find(x => typeof x === 'number')
	testType.equal<typeof r, 1 | 2 | '3' | undefined>(true)
})

it('returns T | undefined for T[] if T satisfies Criteria', () => {
	testType.equal<FindFirst<string[], number>, never>(true)
	testType.equal<FindFirst<number[], number>, number | undefined>(true)
	testType.equal<FindFirst<Array<1 | 2 | 'x'>, number>, 1 | 2 | undefined>(true)
})

it('returns never for empty tuple', () => {
	testType.equal<FindFirst<[], number>, never>(true)
})

it('pick first type matching criteria', () => {
	testType.equal<FindFirst<[true, 1, 'x', 3], 1>, 1>(true)
	testType.equal<FindFirst<[true, 1, 'x', 3], 'x'>, 'x'>(true)
	testType.equal<FindFirst<[true, 1, 'x', 3], true>, true>(true)
})

it('uses widen type to match literal types', () => {
	testType.equal<FindFirst<[true, 1, 'x', 3], number>, 1>(true)
	testType.equal<FindFirst<[true, 1, 'x', 3], string>, 'x'>(true)
	testType.equal<FindFirst<[true, 1, 'x', 3], boolean>, true>(true)
})

it('no match gets never', () => {
	type Actual = FindFirst<[true, 1, 'x'], 2>
	testType.equal<Actual, never>(true)
})

it('pick object', () => {
	type Actual = FindFirst<
		[{ name: 'a', type: 1 }, { name: 'b', type: 2 }, { name: 'c', type: 3 }, { name: 'b', type: 4 }],
		{ name: 'b' }
	>['type']
	testType.equal<Actual, 2>(true)
})

it('is available as ArrayPlus.Find', () => {
	testType.equal<ArrayPlus.Find<[true, 1, 'x', 3], number>, 1>(true)
})
