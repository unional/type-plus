import { type Concat, type, isType } from '../index.js'

it('unionizes the array element type', () => {
	type A = Concat<string[], boolean[]>
	type.equal<A, Array<string | boolean>>(true)
})

it('concats tuples', () => {
	type A = Concat<[1, 2, 3], [4, 5]>
	type.equal<A, [1, 2, 3, 4, 5]>(true)
})

it('concats array to tuple', () => {
	type A = Concat<string[], [1, 2, 3]>
	type.equal<A, [...string[], 1, 2, 3]>(true)
	isType<A>([1, 2, 3])
	isType<A>(['a', 1, 2, 3])
	isType<A>(['a', 'b', 1, 2, 3])
})

it('concats tuple to array', () => {
	type A = Concat<[1, 2, 3], string[]>
	type.equal<A, [1, 2, 3, ...string[]]>(true)
	isType<A>([1, 2, 3])
	isType<A>([1, 2, 3, 'a'])
	isType<A>([1, 2, 3, 'a', 'b'])
})
