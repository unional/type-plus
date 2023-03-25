import { type, type At } from '../index.js'

it('gets never if N is never', () => {
	type.never<At<string[], never>>(true)
	type.never<At<[], never>>(true)
	type.never<At<['a'], never>>(true)
})

it('returns never if N is not an integer', () => {
	type.never<At<string[], 1.1>>(true)
	type.never<At<[1, 2, 3], 1.1>>(true)
})

it('gets never from empty tuple', () => {
	type.never<At<[], 0>>(true)
	type.never<At<[], 1.1>>(true)
	type.never<At<[], number>>(true)
})

it('gets type of the element in an array', () => {
	type.equal<At<string[], 0>, string>(true)
	type.equal<At<unknown[], 1>, unknown>(true)
	type.equal<At<any[], -1>, any>(true)
	type.equal<At<Array<string | boolean>, -2>, string | boolean>(true)
	type.equal<At<string[], number>, string>(true)
	type.equal<At<string[], any>, string>(true)
})

it('gets type of element in tuple', () => {
	type.equal<At<['a', 1, string], 0>, 'a'>(true)
	type.equal<At<['a', 1, string], 1>, 1>(true)
	type.equal<At<['a', 1, string], 2>, string>(true)
	type.equal<At<['a', 1, string], -1>, string>(true)
	type.equal<At<['a', 1, string], -2>, 1>(true)
	type.equal<At<['a', 1, string], -3>, 'a'>(true)
	type.equal<At<['a', 1, string], number>, 'a' | 1 | string>(true)
	type.equal<At<['a', 1, string], any>, 'a' | 1 | string>(true)
})

it('gets never if N is out of range', () => {
	type.never<At<['a'], 1>>(true)
	type.never<At<['a'], -2>>(true)
})

it(`can override fail case`, () => {
	type.equal<At<[], 0, 'ha'>, 'ha'>(true)

	type.equal<At<[], any, 'ha'>, 'ha'>(true)
	type.equal<At<[], never, 'ha'>, 'ha'>(true)
})
