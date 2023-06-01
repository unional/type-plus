import { it, test } from '@jest/globals'
import { testType, type ArrayPlus } from '../index.js'

test('behavior of array.entries()', () => {
	const array = [1, 2, '3']
	const entries = array.entries()
	testType.equal<typeof entries, IterableIterator<[number, string | number]>>(true)
})

test('behavior of tuple.entries()', () => {
	const tuple = [1, 2, '3'] as const
	const entries = tuple.entries()
	testType.equal<typeof entries, IterableIterator<[number, 1 | 2 | '3']>>(true)
})

it('gets Array<[number, T]> for array', () => {
	testType.equal<ArrayPlus.Entries<string[]>, Array<[number, string]>>(true)
	testType.equal<ArrayPlus.Entries<Array<string | number>>, Array<[number, string | number]>>(true)
})

it('returns [[0, T1], [1, T2],...[n, Tn]] for tuple', () => {
	testType.equal<ArrayPlus.Entries<[]>, []>(true)
	testType.equal<ArrayPlus.Entries<[1, 2, 3]>, [[0, 1], [1, 2], [2, 3]]>(true)
})
