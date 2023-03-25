import { type } from '../index.js'
import type { IsIndexOutOfBound } from './array_plus.js'

it('returns true for never', () => {
	type.true<IsIndexOutOfBound<['a'], never>>(true)
})

it('returns true for empty tuple', () => {
	type.true<IsIndexOutOfBound<[], never>>(true)
	type.true<IsIndexOutOfBound<[], 0>>(true)
})

it('return false for array', () => {
	type.false<IsIndexOutOfBound<any[], 0>>(true)
	type.false<IsIndexOutOfBound<any[], 1>>(true)
	type.false<IsIndexOutOfBound<any[], -1>>(true)
})

it('returns true for out of bound index', () => {
	type.true<IsIndexOutOfBound<['a'], 1>>(true)
	type.true<IsIndexOutOfBound<['a'], -2>>(true)
})

it('returns false for in bound index', () => {
	type.false<IsIndexOutOfBound<['a'], 0>>(true)
	type.false<IsIndexOutOfBound<['a'], -1>>(true)
})
