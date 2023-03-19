import { isType } from '../index.js'
import type { IsIndexOutOfBound } from './array_plus.js'

it('returns true for never', () => {
	isType.t<IsIndexOutOfBound<['a'], never>>()
})

it('returns true for empty tuple', () => {
	isType.t<IsIndexOutOfBound<[], never>>()
	isType.t<IsIndexOutOfBound<[], 0>>()
})

it('return false for array', () => {
	isType.f<IsIndexOutOfBound<any[], 0>>()
	isType.f<IsIndexOutOfBound<any[], 1>>()
	isType.f<IsIndexOutOfBound<any[], -1>>()
})

it('returns true for out of bound index', () => {
	isType.t<IsIndexOutOfBound<['a'], 1>>()
	isType.t<IsIndexOutOfBound<['a'], -2>>()
})

it('returns false for in bound index', () => {
	isType.f<IsIndexOutOfBound<['a'], 0>>()
	isType.f<IsIndexOutOfBound<['a'], -1>>()
})
