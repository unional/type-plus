import { expect, it, test } from '@jest/globals'

test('behavior of array.slice()', () => {
	const a = [1, 2, 3]

	expect(a.slice(0)).toEqual([1, 2, 3])
	expect(a.slice(1)).toEqual([2, 3])
	expect(a.slice(0, 2)).toEqual([1, 2])
	expect(a.slice(-1)).toEqual([3])
	expect(a.slice(0, 0)).toEqual([])
	expect(a.slice(-3, -2)).toEqual([1])
	expect(a.slice(-5)).toEqual([1, 2, 3])
	expect(a.slice(-5, -3)).toEqual([])
	expect(a.slice(-5, -2)).toEqual([1])
})

it.todo(' tests for Slice<A>')

/**
 * Returns a copy of a section of an array or tuple.
 *
 * ```
 * import type { Slice } from 'type-plus'
 *
 * type R = Slice<string[], 0> // string[]
 * type R = Slice<[1, 2, 3], 0> // [1, 2, 3]
 * type R = Slice<[1, 2, 3], 1, 2> // [2, 3]
 * type R = Slice<[1, 2, 3], -1> // [3]
 * type R = Slice<[1, 2, 3], -2> // [2, 3]
 * type R = Slice<[1, 2, 3], -2, -1> // [2]
 * type R = Slice<[1, 2, 3], -2, 3> // [2, 3]
 * ```
 */
export type Slice<A extends unknown[], Start extends number, End extends number = number, Fail = never> = A

// import { isType, type Slice } from '../index.js'

// it('gets never if Start is never', () => {
// 	isType.never<Slice<string[], never>>()
// 	isType.never<Slice<[], never>>()
// 	isType.never<Slice<['a'], never>>()
// })

// it('gets never if End is never', () => {
// 	isType.never<Slice<string[], 0, never>>()
// 	isType.never<Slice<[], 0, never>>()
// 	isType.never<Slice<['a'], 0, never>>()
// })

// it('gets never if Start is not an integer', () => {
// 	isType.never<Slice<string[], 1.1>>()
// 	isType.never<Slice<[], 1.1>>()
// 	isType.never<Slice<['a'], 1.1>>()

// 	isType.never<Slice<string[], 0.1, 1>>()
// 	isType.never<Slice<[], 0.1, 1>>()
// 	isType.never<Slice<['a'], 0.1, 1>>()
// 	isType.never<Slice<['a'], 0.1, never>>()
// 	isType.never<Slice<['a'], 0.1, any>>()
// })

// it('gets never if End is not an integer', () => {
// 	isType.never<Slice<string[], 0, 1.1>>()
// 	isType.never<Slice<[], 0, 1.1>>()
// 	isType.never<Slice<['a'], 0, 1.1>>()
// 	isType.never<Slice<[], never, 1.1>>()
// 	isType.never<Slice<[], any, 1.1>>()
// })

// it('returns never for empty tuple', () => {
// 	isType.never<Slice<[], 0>>()
// 	isType.never<Slice<[], 0, 1>>()
// 	isType.never<Slice<[], -1>>()
// 	isType.never<Slice<[], -1, 2>>()
// 	isType.never<Slice<[], 1.1>>()
// 	isType.never<Slice<[], number>>()
// 	isType.never<Slice<[], any>>()
// })

// it('returns never when out of bound', () => {
// 	isType.never<Slice<[1], 1>>()
// 	isType.never<Slice<[1], -2>>()
// 	isType.never<Slice<[1], 0, 0>>()
// 	isType.never<Slice<[1, 2], 0, 3>>()
// 	isType.never<Slice<[1, 2], -1, 3>>()
// 	isType.never<Slice<[1, 2], -3, 2>>()
// })

// it('returns the array if input is an array', () => {
// 	isType.equal<true, Slice<string[], 0>, string[]>()
// 	isType.equal<true, Slice<string[], 0, 1>, string[]>()
// 	isType.equal<true, Slice<string[], -1>, string[]>()
// 	isType.equal<true, Slice<string[], -2, -1>, string[]>()
// 	isType.equal<true, Slice<string[], number, 1>, string[]>()
// 	isType.equal<true, Slice<string[], 0, number>, string[]>()
// 	isType.equal<true, Slice<string[], any, 1>, string[]>()
// 	isType.equal<true, Slice<string[], 0, any>, string[]>()
// })

// it('returns a slice of the tuple', () => {
// 	isType.equal<true, Slice<[1, 2, 3], 0>, [1, 2, 3]>()
// 	isType.equal<true, Slice<[1, 2, 3], 1>, [2, 3]>()
// 	isType.equal<true, Slice<[1, 2, 3], 2>, [3]>()
// 	isType.equal<true, Slice<[1, 2, 3], 0, 1>, [1, 2]>()
// 	isType.equal<true, Slice<[1, 2, 3], 1, 2>, [2, 3]>()

// 	isType.equal<true, Slice<[1, 2, 3], -3>, [1, 2, 3]>()
// 	isType.equal<true, Slice<[1, 2, 3], -2>, [2, 3]>()
// 	isType.equal<true, Slice<[1, 2, 3], -1>, [3]>()
// 	isType.equal<true, Slice<[1, 2, 3], -3, -2>, [1, 2]>()
// 	isType.equal<true, Slice<[1, 2, 3], -2, -1>, [2, 3]>()

// 	isType.equal<true, Slice<[1, 2, 3], -3, 3>, [1, 2, 3]>()

// 	isType.equal<true, Slice<[1, 2, 3], number>, [1, 2, 3]>()
// 	isType.equal<true, Slice<[1, 2, 3], 1, number>, [2, 3]>()

// 	isType.equal<true, Slice<[1, 2, 3], any>, [1, 2, 3]>()
// 	isType.equal<true, Slice<[1, 2, 3], 1, any>, [2, 3]>()
// })

// it('returns never if start > end', () => {
// 	isType.never<Slice<['a', 'b', 'c'], 1, 0>>()
// 	isType.never<Slice<['a', 'b', 'c'], -1, -2>>()
// })

// it('can override out of bound result', () => {
// 	isType.equal<true, Slice<[], 0, number, 'out-of-bound'>, 'out-of-bound'>()
// 	isType.equal<true, Slice<[1], 1, number, 'out-of-bound'>, 'out-of-bound'>()
// 	isType.equal<true, Slice<[1], -2, number, 'out-of-bound'>, 'out-of-bound'>()
// 	isType.equal<true, Slice<[1, 2], 0, 3, 'out-of-bound'>, 'out-of-bound'>()
// 	isType.equal<true, Slice<[1, 2], -1, 3, 'out-of-bound'>, 'out-of-bound'>()
// })
