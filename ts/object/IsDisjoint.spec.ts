import { isType, IsDisjoint } from '../index.js'

test('disjoint returns true', () => {
	type A = { a: 1 }
	type B = { b: 1 }
	isType.t<IsDisjoint<A, B>>()
})

test('same type returns false', () => {
	type A = { a: 1 }
	type B = { a: 1 }
	isType.f<IsDisjoint<A, B>>()
})

test('A subset of B returns false', () => {
	type A = { a: 1 }
	type B = { a: 1; b: 1 }
	isType.f<IsDisjoint<A, B>>()
})

test('B subset of A returns false', () => {
	type A = { a: 1; b: 1 }
	type B = { a: 1 }
	isType.f<IsDisjoint<A, B>>()
})
