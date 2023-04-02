import { testType } from '../index.js'
import type { IsIndexOutOfBound } from './array_plus.js'

it('returns true for never', () => {
	testType.true<IsIndexOutOfBound<['a'], never>>(true)
})

it('returns true for empty tuple', () => {
	testType.true<IsIndexOutOfBound<[], never>>(true)
	testType.true<IsIndexOutOfBound<[], 0>>(true)
})

it('return false for array', () => {
	testType.false<IsIndexOutOfBound<any[], 0>>(true)
	testType.false<IsIndexOutOfBound<any[], 1>>(true)
	testType.false<IsIndexOutOfBound<any[], -1>>(true)
})

it('returns true for out of bound index', () => {
	testType.true<IsIndexOutOfBound<['a'], 1>>(true)
	testType.true<IsIndexOutOfBound<['a'], -2>>(true)
})

it('returns false for in bound index', () => {
	testType.false<IsIndexOutOfBound<['a'], 0>>(true)
	testType.false<IsIndexOutOfBound<['a'], -1>>(true)
})
