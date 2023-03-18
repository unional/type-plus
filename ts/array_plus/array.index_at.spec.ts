import { isType } from '../index.js'
import type { IndexAt } from './array.index_at.js'

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
	isType.equal<true, IndexAt<[1, 2, 3], 3>, undefined>()
	isType.equal<true, IndexAt<[1, 2, 3], -4>, undefined>()
})

it('returns never if N is not an integer', () => {
	isType.never<IndexAt<[1, 2, 3], 1.1>>()
})
