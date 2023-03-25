import { type } from '../index.js'
import type { IndexAt } from './array_plus.js'

it('gets never if N is never', () => {
	type.never<IndexAt<string[], never>>(true)
	type.never<IndexAt<[], never>>(true)
	type.never<IndexAt<['a'], never>>(true)
})

it('returns never if N is not an integer', () => {
	type.never<IndexAt<string[], 1.1>>(true)
	type.never<IndexAt<[1, 2, 3], 1.1>>(true)
})

it('returns never for empty tuple', () => {
	type.never<IndexAt<[], 0>>(true)
	type.never<IndexAt<[], 1>>(true)
	type.never<IndexAt<[], -1>>(true)
	type.never<IndexAt<[], 1.1>>(true)
	type.never<IndexAt<[], number>>(true)
})

it('returns number if A is an array and N is number or any', () => {
	type.equal<IndexAt<string[], number>, number>(true)

	type.equal<IndexAt<string[], any>, number>(true)
})

it.skip('returns union of indexes of the tuple when N is number', () => {
	// type.equal<IndexAt<[1, 2, 3], number>, 0 | 1 | 2>(true)
})

it('returns N if A is an array and N is positive', () => {
	type.equal<IndexAt<string[], 0>, 0>(true)
	type.equal<IndexAt<string[], 1>, 1>(true)
	type.equal<IndexAt<string[], 100>, 100>(true)
})

it('returns N if A is an array and N is negative', () => {
	type.equal<IndexAt<string[], -0>, 0>(true)
	type.equal<IndexAt<string[], -1>, -1>(true)
	type.equal<IndexAt<string[], -100>, -100>(true)
})

it('returns type of the element for positive indexes', () => {
	type.equal<IndexAt<[1, 2, 3], 0>, 0>(true)
	type.equal<IndexAt<[1, 2, 3], 1>, 1>(true)
	type.equal<IndexAt<[1, 2, 3], 2>, 2>(true)
})

it('returns type of the element for negative indexes', () => {
	type.equal<IndexAt<[1, 2, 3], -0>, 0>(true)
	type.equal<IndexAt<[1, 2, 3], -1>, 2>(true)
	type.equal<IndexAt<[1, 2, 3], -2>, 1>(true)
	type.equal<IndexAt<[1, 2, 3], -3>, 0>(true)
})

it('returns never when index is out of range', () => {
	type.never<IndexAt<[1, 2, 3], 3>>(true)
	type.never<IndexAt<[1, 2, 3], -4>>(true)
})

it('can override fail case', () => {
	type.equal<IndexAt<[], 0, 'ha'>, 'ha'>(true)

	type.equal<IndexAt<[], any, 'ha'>, 'ha'>(true)
	type.equal<IndexAt<[], never, 'ha'>, 'ha'>(true)
})
