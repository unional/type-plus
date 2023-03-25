import { type, type UnionOfProps } from '../index.js'

test('get property from single value tuple', () => {
	type S = [{ a: number }]
	type A = UnionOfProps<S, 'a'>
	type.equal<A, number>(true)
})

test('get property from multiple values', () => {
	type S = [{ a: 'a' }, { a: 'b' }]
	type A = UnionOfProps<S, 'a'>
	type.equal<A, 'a' | 'b'>(true)
})
