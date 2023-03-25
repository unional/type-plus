import { type, type Head } from '../index.js'

test('get first type', () => {
	type S = [1, 'a', 'b']
	type A = Head<S>

	type.equal<A, 1>(true)
})

test('empty tuple gets never', () => {
	type S = []
	type A = Head<S>

	type.equal<A, never>(true)
})

test('array gets same type', () => {
	type A = Head<string[]>

	type.equal<A, string>(true)
})
