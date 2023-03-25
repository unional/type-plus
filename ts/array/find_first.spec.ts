import { type, type FindFirst } from '../index.js'

test('pick first type matching criteria', () => {
	type Actual = FindFirst<[true, 1, 'x', 3], number>
	type.equal<Actual, 1>(true)
})

test('no match gets never', () => {
	type Actual = FindFirst<[true, 1, 'x'], 2>
	type.equal<Actual, never>(true)
})

test('pick object', () => {
	type Actual = FindFirst<
		[{ name: 'a'; type: 1 }, { name: 'b'; type: 2 }, { name: 'c'; type: 3 }, { name: 'b'; type: 4 }],
		{ name: 'b' }
	>['type']
	type.equal<Actual, 2>(true)
})

test('generic', () => {
	const s: string[] = ['a', 'b', 'c']
	type Actual = FindFirst<typeof s, string>
	type.equal<Actual, string>(true)
})
