import { expect, it, test } from '@jest/globals'
import { testType } from '../index.js'
import type { SplitAt } from './array_plus.js'

test('behavior of array.splice(start)', () => {
	const a = [1, 2, 3]
	const r = a.splice(1)

	expect(a).toEqual([1])
	expect(r).toEqual([2, 3])

	const a2 = [1, 2, 3]
	const r2 = a2.splice(-1)

	expect(a2).toEqual([1, 2])
	expect(r2).toEqual([3])
})

test('behavior of array.splice(start) where start is out of bound', () => {
	const a1 = [1, 2, 3]
	const r1 = a1.splice(5)

	expect(a1).toEqual([1, 2, 3])
	expect(r1).toEqual([])

	const a2 = [1, 2, 3]
	const r2 = a2.splice(-4)

	expect(a2).toEqual([])
	expect(r2).toEqual([1, 2, 3])
})

test('behavior of array.splice(start, deleteCount)', () => {
	const a = [1, 2, 3, 4, 5]
	const r = a.splice(1, 2)

	expect(a).toEqual([1, 4, 5])
	expect(r).toEqual([2, 3])
})

test('behavior of array.splice(start, deleteCount, ...items)', () => {
	const a1 = [1, 2, 3, 4, 5]
	const r1 = a1.splice(1, 2, 6)

	expect(a1).toEqual([1, 6, 4, 5])
	expect(r1).toEqual([2, 3])

	const a2 = [1, 2, 3, 4, 5]
	const r2 = a2.splice(1, 2, 6, 7, 8)

	expect(a2).toEqual([1, 6, 7, 8, 4, 5])
	expect(r2).toEqual([2, 3])
})

it('split array to two', () => {
	testType.equal<SplitAt<[1, 2, 3, 4, 5], 0>, [[], [1, 2, 3, 4, 5]]>(true)
	testType.equal<SplitAt<[1, 2, 3, 4, 5], 1>, [[1], [2, 3, 4, 5]]>(true)
	testType.equal<SplitAt<[1, 2, 3, 4, 5], 2>, [[1, 2], [3, 4, 5]]>(true)
	testType.equal<SplitAt<[1, 2, 3, 4, 5], 3>, [[1, 2, 3], [4, 5]]>(true)
	testType.equal<SplitAt<[1, 2, 3, 4, 5], 4>, [[1, 2, 3, 4], [5]]>(true)
	testType.equal<SplitAt<[1, 2, 3, 4, 5], 5>, [[1, 2, 3, 4, 5], []]>(true)

	testType.equal<SplitAt<[1, 2, 3, 4, 5], -5>, [[], [1, 2, 3, 4, 5]]>(true)
	testType.equal<SplitAt<[1, 2, 3, 4, 5], -4>, [[1], [2, 3, 4, 5]]>(true)
	testType.equal<SplitAt<[1, 2, 3, 4, 5], -3>, [[1, 2], [3, 4, 5]]>(true)
	testType.equal<SplitAt<[1, 2, 3, 4, 5], -2>, [[1, 2, 3], [4, 5]]>(true)
	testType.equal<SplitAt<[1, 2, 3, 4, 5], -1>, [[1, 2, 3, 4], [5]]>(true)
})

it('works with out of bound Start', () => {
	testType.equal<SplitAt<[1, 2, 3, 4, 5], 6>, [[1, 2, 3, 4, 5], []]>(true)
	testType.equal<SplitAt<[1, 2, 3, 4, 5], -6>, [[], [1, 2, 3, 4, 5]]>(true)
})

it('split array type to two same array', () => {
	testType.equal<SplitAt<number[], 0>, [number[], number[]]>(true)
	testType.equal<SplitAt<string[], 1>, [string[], string[]]>(true)
})
