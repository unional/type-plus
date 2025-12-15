import { test } from 'vitest'

import { type CreateTuple, isType } from '../index.js'

test('create empty tuple', () => {
	isType.equal<true, [], CreateTuple<0>>()
})

test('single element', () => {
	isType.equal<true, [unknown], CreateTuple<1>>()
})

test('multiple elements', () => {
	type A = CreateTuple<3>
	isType.equal<true, [unknown, unknown, unknown], A>()
})

test('override element type', () => {
	type A = CreateTuple<5, 1>
	isType.equal<true, [1, 1, 1, 1, 1], A>()
})

test('negative length gets never', () => {
	isType.equal<true, never, CreateTuple<-1>>()
})

test('Can create tuple up to 9999', () => {
	type A = CreateTuple<9999>['length']

	isType.equal<true, 9999, A>()
})

test('L = number gets array', () => {
	type A = CreateTuple<number, 1>
	isType.equal<true, 1[], A>()
})

test('Non whole number gets never', () => {
	type A = CreateTuple<1.2>

	isType.equal<true, never, A>()
})

test('can specify fail type', () => {
	type A = CreateTuple<1.2, 1, null>

	isType.equal<true, null, A>()
})
