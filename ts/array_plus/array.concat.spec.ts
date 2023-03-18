import { type Concat, isType } from '../index.js'

it('unionizes the array element type', () => {
	type A = Concat<string[], boolean[]>
	isType.equal<true, A, Array<string | boolean>>()
})

it('concats tuples', () => {
	type A = Concat<[1, 2, 3], [4, 5]>
	isType.equal<true, A, [1, 2, 3, 4, 5]>()
})

it('concats array to tuple', () => {
	type A = Concat<string[], [1, 2, 3]>
	isType.equal<true, A, [...string[], 1, 2, 3]>()
	isType<A>([1, 2, 3])
	isType<A>(['a', 1, 2, 3])
	isType<A>(['a', 'b', 1, 2, 3])
})

it('concats tuple to array', () => {
	type A = Concat<[1, 2, 3], string[]>
	isType.equal<true, A, [1, 2, 3, ...string[]]>()
	isType<A>([1, 2, 3])
	isType<A>([1, 2, 3, 'a'])
	isType<A>([1, 2, 3, 'a', 'b'])
})
