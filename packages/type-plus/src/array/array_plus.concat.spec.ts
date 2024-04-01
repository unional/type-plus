import { expect, it, test } from '@jest/globals'

import { type ArrayPlus, isType, testType } from '../index.js'

test('behavior of array.concat()', () => {
	const a1 = [1, 2, 3]
	const a2 = [4, '5']
	const a3 = [6, 7, 8]
	// @ts-expect-error This is an limitation of the existing type
	const r1 = a1.concat(a2)
	// @ts-expect-error This is an limitation of the existing type
	const r2 = a1.concat(a2, a3)
	const r3 = a2.concat(a3)
	expect(a1).toEqual([1, 2, 3])
	expect(a2).toEqual([4, '5'])
	expect(r1).toEqual([1, 2, 3, 4, '5'])
	expect(r2).toEqual([1, 2, 3, 4, '5', 6, 7, 8])
	expect(r3).toEqual([4, '5', 6, 7, 8])
})

test('behavior of tuple.concat()', () => {
	const a1 = [1, 2, 3] as const
	const a2 = [4, '5'] as const
	const a3 = [6, 7, 8] as const
	// @ts-expect-error This is an limitation of the existing type
	const r1 = a1.concat(a2)
	// @ts-expect-error This is an limitation of the existing type
	const r2 = a1.concat(a2, a3)
	// @ts-expect-error This is an limitation of the existing type
	const r3 = a2.concat(a3)
	expect(a1).toEqual([1, 2, 3])
	expect(a2).toEqual([4, '5'])
	expect(r1).toEqual([1, 2, 3, 4, '5'])
	expect(r2).toEqual([1, 2, 3, 4, '5', 6, 7, 8])
	expect(r3).toEqual([4, '5', 6, 7, 8])
})

it('unionizes the array element type', () => {
	type A = ArrayPlus.Concat<string[], boolean[]>
	testType.equal<A, Array<string | boolean>>(true)
})

it('concats tuples', () => {
	type A = ArrayPlus.Concat<[1, 2, 3], [4, 5]>
	testType.equal<A, [1, 2, 3, 4, 5]>(true)
})

it('concats array to tuple', () => {
	type A = ArrayPlus.Concat<string[], [1, 2, 3]>
	testType.equal<A, [...string[], 1, 2, 3]>(true)
	isType<A>([1, 2, 3])
	isType<A>(['a', 1, 2, 3])
	isType<A>(['a', 'b', 1, 2, 3])
})

it('concats tuple to array', () => {
	type A = ArrayPlus.Concat<[1, 2, 3], string[]>
	testType.equal<A, [1, 2, 3, ...string[]]>(true)
	isType<A>([1, 2, 3])
	isType<A>([1, 2, 3, 'a'])
	isType<A>([1, 2, 3, 'a', 'b'])
})

it('accepts readonly array', () => {
	type A = ArrayPlus.Concat<readonly [1, 2, 3], readonly string[]>
	testType.equal<A, [1, 2, 3, ...string[]]>(true)
})
