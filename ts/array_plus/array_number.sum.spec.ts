import { isType } from '../predicates/isType.js'
import type { Sum } from './array_number.js'

it('returns 0 for empty tuple', () => {
	isType.equal<true, Sum<[]>, 0>()
})

it('does not allow A to be an array', () => {
	// @ts-expect-error
	type R = Sum<string[]>
})

it('returns sum of values', () => {
	isType.equal<true, Sum<[1]>, 1>()
	isType.equal<true, Sum<[1, 2]>, 3>()
	isType.equal<true, Sum<[1, 2, 3]>, 6>()
})

it.skip('supports negative numbers', () => {
	// isType.equal<true, Sum<[3, -1]>, 2>()
})
