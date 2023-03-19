import { isType } from '../index.js'
import type { IndexAt } from './array_plus.js'

it('gets never if N is never', () => {
	isType.never<IndexAt<string[], never>>()
	isType.never<IndexAt<[], never>>()
	isType.never<IndexAt<['a'], never>>()
})

it('returns never if N is not an integer', () => {
	isType.never<IndexAt<string[], 1.1>>()
	isType.never<IndexAt<[1, 2, 3], 1.1>>()
})

it('returns never for empty tuple', () => {
	isType.never<IndexAt<[], 0>>()
	isType.never<IndexAt<[], 1>>()
	isType.never<IndexAt<[], -1>>()
	isType.never<IndexAt<[], 1.1>>()
	isType.never<IndexAt<[], number>>()
})

it('returns number if A is an array and N is number', () => {
	isType.equal<true, IndexAt<string[], number>, number>()
})

it.skip('returns union of indexes of the tuple when N is number', () => {
	// isType.equal<true, IndexAt<[1, 2, 3], number>, 0 | 1 | 2>()
})

it('returns N if A is an array and N is positive', () => {
	isType.equal<true, IndexAt<string[], 0>, 0>()
	isType.equal<true, IndexAt<string[], 1>, 1>()
	isType.equal<true, IndexAt<string[], 100>, 100>()
})

it('returns N if A is an array and N is negative', () => {
	isType.equal<true, IndexAt<string[], -0>, 0>()
	isType.equal<true, IndexAt<string[], -1>, -1>()
	isType.equal<true, IndexAt<string[], -100>, -100>()
})

it('returns type of the element for positive indexes', () => {
	isType.equal<true, IndexAt<[1, 2, 3], 0>, 0>()
	isType.equal<true, IndexAt<[1, 2, 3], 1>, 1>()
	isType.equal<true, IndexAt<[1, 2, 3], 2>, 2>()
})

it('returns type of the element for negative indexes', () => {
	isType.equal<true, IndexAt<[1, 2, 3], -0>, 0>()
	isType.equal<true, IndexAt<[1, 2, 3], -1>, 2>()
	isType.equal<true, IndexAt<[1, 2, 3], -2>, 1>()
	isType.equal<true, IndexAt<[1, 2, 3], -3>, 0>()
})

it('returns never when index is out of range', () => {
	isType.never<IndexAt<[1, 2, 3], 3>>()
	isType.never<IndexAt<[1, 2, 3], -4>>()
})

it('can override fail case', () => {
	isType.equal<true, IndexAt<[], 0, 'ha'>, 'ha'>()
})
