import { type } from '../index.js'
import type { Sum } from './number_plus.js'

it('returns 0 for empty tuple', () => {
	type.equal<Sum<[]>, 0>(true)
})

it('returns never if A is number[]', () => {
	type.never<Sum<number[]>>(true)
})

it('returns sum of values', () => {
	type.equal<Sum<[1]>, 1>(true)
	type.equal<Sum<[1, 2]>, 3>(true)
	type.equal<Sum<[1, 2, 3]>, 6>(true)
})

it.skip('supports negative numbers as long as result is > 0', () => {
	// type.equal<Sum<[3, -1]>, 2>(true)
})

it('can override fail case', () => {
	type.equal<Sum<[-1], 0>, -1>(true)
})
