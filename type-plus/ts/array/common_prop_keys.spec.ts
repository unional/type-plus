import { it } from '@jest/globals'
import { testType, type CommonPropKeys } from '../index.js'

it('does not support array', () => {
	testType.equal<
		CommonPropKeys<Array<{ a: number }>>,
		'CommonPropKeys only work on tuple and not array.'
	>(true)
})

it('can override array behavior', () => {
	testType.equal<
		CommonPropKeys<Array<{ a: number }>, { 'array_not_supported': 123 }>,
		123
	>(true)
})

it('returns never when there is no common keys', () => {
	type S = [{ a: number }, { b: number }]
	type A = CommonPropKeys<S>
	testType.never<A>(true)
})

it('can override no common keys behavior', () => {
	type S = [{ a: number }, { b: number }]
	testType.equal<CommonPropKeys<S, { no_common_keys: 1 }>, 1>(true)
})

it('gets all keys from single entry', () => {
	testType.equal<CommonPropKeys<[{ a: 1 }]>, 'a'>(true)
	testType.equal<CommonPropKeys<[{ a: 1, b: 2 }]>, 'a' | 'b'>(true)
})

it('gets single common key', () => {
	type S = [{ a: number, c: number }, { a: number, b: number }]
	type A = CommonPropKeys<S>
	testType.equal<A, 'a'>(true)
})

it('gets multiple common keys', () => {
	type S = [{ a: number, b: number }, { a: number, b: number }]
	type A = CommonPropKeys<S>
	testType.equal<A, 'a' | 'b'>(true)
})

it('gets common symbol keys', () => {
	testType.equal<
		CommonPropKeys<[
			{ [Symbol.iterator]: 1, a: number },
			{ [Symbol.iterator]: 2, b: number }
		]>,
		typeof Symbol.iterator
	>(true)
})

it('gets common number keys', () => {
	testType.equal<
		CommonPropKeys<[
			{ a: number, 123: 1 },
			{ b: number, 123: 2 }
		]>,
		123
	>(true)
})

it('gets common keys from multiple entries', () => {
	testType.equal<CommonPropKeys<[{ a: number }, { b: number }, { c: number }]>, never>(true)
	testType.equal<
		CommonPropKeys<[{ a: number }, { b: number }, { c: number }], { no_common_keys: 1 }>,
		1
	>(true)

	testType.equal<
		CommonPropKeys<[{ a: number, d: 1 }, { b: number, d?: 2 }, { c: number, d?: 3 | undefined }]>,
		'd'
	>(true)
})
