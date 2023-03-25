import { type, type ChainFn } from '../index.js'

test('return type is the same as input type', () => {
	type A = ChainFn<number>

	type.equal<Parameters<A>[0], ReturnType<A>>(true)
})
