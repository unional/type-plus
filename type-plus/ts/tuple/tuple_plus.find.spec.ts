import { it, test } from '@jest/globals'
import { testType, type TuplePlus } from '../index.js'

test('behavior of tuple.find()', () => {
	const tuple: [1, 2, '3'] = [1, 2, '3']
	const r = tuple.find(x => typeof x === 'number')
	testType.equal<typeof r, 1 | 2 | '3' | undefined>(true)
})

it('returns never for empty tuple', () => {
	testType.equal<TuplePlus.Find<[], number>, never>(true)
})

it('can override empty tuple case', () => {
	testType.equal<TuplePlus.Find<[], number, { empty_tuple: 1 }>, 1>(true)
})

it('does not work with array type', () => {
	testType.equal<TuplePlus.Find<string[], number>, 'does not support array. Please use `FindFirst` or `ArrayPlus.Find` instead.'>(true)
})

it('pick first type matching criteria', () => {
	testType.equal<TuplePlus.Find<[true, 1, 'x', 3], 1>, 1>(true)
	testType.equal<TuplePlus.Find<[true, 1, 'x', 3], 'x'>, 'x'>(true)
	testType.equal<TuplePlus.Find<[true, 1, 'x', 3], true>, true>(true)
})

it('uses widen type to match literal types', () => {
	testType.equal<TuplePlus.Find<[true, 1, 'x', 3], number>, 1>(true)
	testType.equal<TuplePlus.Find<[true, 1, 'x', 3], string>, 'x'>(true)
	testType.equal<TuplePlus.Find<[true, 1, 'x', 3], boolean>, true>(true)
})

it('no match gets never', () => {
	type Actual = TuplePlus.Find<[true, 1, 'x'], 2>
	testType.equal<Actual, never>(true)
})

it('pick object', () => {
	type Actual = TuplePlus.Find<
		[{ name: 'a', type: 1 }, { name: 'b', type: 2 }, { name: 'c', type: 3 }, { name: 'b', type: 4 }],
		{ name: 'b' }
	>['type']
	testType.equal<Actual, 2>(true)
})
