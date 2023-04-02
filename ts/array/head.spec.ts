import { testType, type Head } from '../index.js'

test('get first type', () => {
	type S = [1, 'a', 'b']
	type A = Head<S>

	testType.equal<A, 1>(true)
})

test('empty tuple gets never', () => {
	type S = []
	type A = Head<S>

	testType.equal<A, never>(true)
})

test('array gets same type', () => {
	type A = Head<string[]>

	testType.equal<A, string>(true)
})
