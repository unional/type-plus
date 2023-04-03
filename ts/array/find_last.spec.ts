import { test } from '@jest/globals'
import { testType, type FindLast } from '../index.js'

test('pick last type matching criteria', () => {
	type Actual = FindLast<[true, 1, 'x', 3], number>
	testType.equal<Actual, 3>(true)
})

test('no match gets never', () => {
	type Actual = FindLast<[true, 1, 'x'], 2>
	testType.equal<Actual, never>(true)
})

test('pick object', () => {
	type Actual = FindLast<
		[{ name: 'a'; type: 1 }, { name: 'b'; type: 2 }, { name: 'c'; type: 3 }, { name: 'b'; type: 4 }],
		{ name: 'b' }
	>['type']
	testType.equal<Actual, 4>(true)
})

test('works on array type', () => {
	const s: string[] = ['a', 'b', 'c']
	type Actual = FindLast<typeof s, string>
	testType.equal<Actual, string>(true)
})
