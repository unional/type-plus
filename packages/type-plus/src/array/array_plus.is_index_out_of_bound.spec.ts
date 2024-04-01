import { it } from '@jest/globals'

import { type ArrayPlus, testType } from '../index.js'

it('returns true for never', () => {
	testType.true<ArrayPlus.IsIndexOutOfBound<['a'], never>>(true)
})

it('returns true for empty tuple', () => {
	testType.true<ArrayPlus.IsIndexOutOfBound<[], never>>(true)
	testType.true<ArrayPlus.IsIndexOutOfBound<[], 0>>(true)
})

it('return false for array', () => {
	testType.false<ArrayPlus.IsIndexOutOfBound<any[], 0>>(true)
	testType.false<ArrayPlus.IsIndexOutOfBound<any[], 1>>(true)
	testType.false<ArrayPlus.IsIndexOutOfBound<any[], -1>>(true)
})

it('returns true for out of bound index', () => {
	testType.true<ArrayPlus.IsIndexOutOfBound<['a'], 1>>(true)
	testType.true<ArrayPlus.IsIndexOutOfBound<['a'], -2>>(true)
})

it('returns false for in bound index', () => {
	testType.false<ArrayPlus.IsIndexOutOfBound<['a'], 0>>(true)
	testType.false<ArrayPlus.IsIndexOutOfBound<['a'], -1>>(true)
})

it('supports readonly array', () => {
	testType.true<ArrayPlus.IsIndexOutOfBound<readonly ['a'], 1>>(true)
})
