import { it } from '@jest/globals'
import { ArrayPlus, testType, type FindLast } from '../index.js'

it('returns T | undefined for T[] if T satisfies Criteria', () => {
	testType.equal<FindLast<string[], number>, never>(true)
	testType.equal<FindLast<number[], number>, number | undefined>(true)
	testType.equal<FindLast<Array<1 | 2 | 'x'>, number>, 1 | 2 | undefined>(true)
})

it('pick last type matching criteria', () => {
	type Actual = FindLast<[true, 1, 'x', 3], number>
	testType.equal<Actual, 3>(true)
})

it('no match gets never', () => {
	type Actual = FindLast<[true, 1, 'x'], 2>
	testType.equal<Actual, never>(true)
})

it('pick object', () => {
	type Actual = FindLast<
		[{ name: 'a'; type: 1 }, { name: 'b'; type: 2 }, { name: 'c'; type: 3 }, { name: 'b'; type: 4 }],
		{ name: 'b' }
	>['type']
	testType.equal<Actual, 4>(true)
})

it('is available as ArrayPlus.FindLast', () => {
	testType.equal<ArrayPlus.FindLast<[true, 1, 'x', 3], number>, 3>(true)
})
