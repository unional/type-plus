import { isType } from '../index.js'
import type { IndexAt } from './array_plus.js'

it('returns never for empty tuple', () => {
	isType.never<IndexAt<[], 0>>()
	isType.never<IndexAt<[], 1>>()
	isType.never<IndexAt<[], -1>>()
})

it('returns N if A is an array and N is positive', () => {
	isType.equal<true, IndexAt<string[], 0>, 0>()
	isType.equal<true, IndexAt<string[], 1>, 1>()
	isType.equal<true, IndexAt<string[], 100>, 100>()
})

it('returns N if A is an array and N is negative', () => {
	isType.equal<true, IndexAt<string[], -0>, 0>()
	isType.never<IndexAt<string[], -1>>()
	isType.never<IndexAt<string[], -100>>()
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

it('returns undefined when index is out of range', () => {
	isType.never<IndexAt<[1, 2, 3], 3>>()
	isType.never<IndexAt<[1, 2, 3], -4>>()
})

it('returns never if N is not an integer', () => {
	isType.never<IndexAt<[1, 2, 3], 1.1>>()
})
