import { type, type IntersectOfProps } from '../index.js'

test('get property from single value tuple', () => {
	type S = [{ a: number }]
	type A = IntersectOfProps<S, 'a'>

	type.equal<A, number>(true)
})

test('get property from multiple values', () => {
	type S = [{ a: { x: number } }, { a: { y: string } }]
	type A = IntersectOfProps<S, 'a'>
	type.equal<A, { x: number } & { y: string }>(true)
})
