import { testType } from '../index.js'
import type { IndexAt } from './array_plus.js'

it('gets never if N is never', () => {
	testType.never<IndexAt<string[], never>>(true)
	testType.never<IndexAt<[], never>>(true)
	testType.never<IndexAt<['a'], never>>(true)
})

it('returns never if N is not an integer', () => {
	testType.never<IndexAt<string[], 1.1>>(true)
	testType.never<IndexAt<[1, 2, 3], 1.1>>(true)
})

it('returns never for empty tuple', () => {
	testType.never<IndexAt<[], 0>>(true)
	testType.never<IndexAt<[], 1>>(true)
	testType.never<IndexAt<[], -1>>(true)
	testType.never<IndexAt<[], 1.1>>(true)
	testType.never<IndexAt<[], number>>(true)
})

it('returns number if A is an array and N is number or any', () => {
	testType.equal<IndexAt<string[], number>, number>(true)

	testType.equal<IndexAt<string[], any>, number>(true)
})

it.skip('returns union of indexes of the tuple when N is number', () => {
	// type.equal<IndexAt<[1, 2, 3], number>, 0 | 1 | 2>(true)
})

it('returns N if A is an array and N is positive', () => {
	testType.equal<IndexAt<string[], 0>, 0>(true)
	testType.equal<IndexAt<string[], 1>, 1>(true)
	testType.equal<IndexAt<string[], 100>, 100>(true)
})

it('returns N if A is an array and N is negative', () => {
	testType.equal<IndexAt<string[], -0>, 0>(true)
	testType.equal<IndexAt<string[], -1>, -1>(true)
	testType.equal<IndexAt<string[], -100>, -100>(true)
})

it('returns type of the element for positive indexes', () => {
	testType.equal<IndexAt<[1, 2, 3], 0>, 0>(true)
	testType.equal<IndexAt<[1, 2, 3], 1>, 1>(true)
	testType.equal<IndexAt<[1, 2, 3], 2>, 2>(true)
})

it('returns type of the element for negative indexes', () => {
	testType.equal<IndexAt<[1, 2, 3], -0>, 0>(true)
	testType.equal<IndexAt<[1, 2, 3], -1>, 2>(true)
	testType.equal<IndexAt<[1, 2, 3], -2>, 1>(true)
	testType.equal<IndexAt<[1, 2, 3], -3>, 0>(true)
})

it('returns never when index is out of range', () => {
	testType.never<IndexAt<[1, 2, 3], 3>>(true)
	testType.never<IndexAt<[1, 2, 3], -4>>(true)
})

it('can override fail case', () => {
	testType.equal<IndexAt<[], 0, 'ha'>, 'ha'>(true)

	testType.equal<IndexAt<[], any, 'ha'>, 'ha'>(true)
	testType.equal<IndexAt<[], never, 'ha'>, 'ha'>(true)
})
