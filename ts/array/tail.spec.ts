import { Tail, type } from '../index.js'

test('get tail types', () => {
	type S = [1, 'a', 'b']
	type A = Tail<S>

	type.equal<A, ['a', 'b']>(true)
})

test('empty tuple gets never', () => {
	type S = []
	type A = Tail<S>

	type.never<A>(true)
})

test('array gets same type', () => {
	type A = Tail<string[]>

	type.equal<A, string[]>(true)
})

test('union array', () => {
	type A = Tail<Array<string | boolean>>

	type.equal<A, Array<string | boolean>>(true)
})

test('tuple with rest', () => {
	type A = Tail<[number, ...string[]]>
	type.equal<A, string[]>(true)
})
