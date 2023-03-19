import { isType, type At } from '../index.js'

it('gets never if N is never', () => {
	isType.never<At<string[], never>>()
	isType.never<At<[], never>>()
	isType.never<At<['a'], never>>()
})

it('returns never if N is not an integer', () => {
	isType.never<At<string[], 1.1>>()
	isType.never<At<[1, 2, 3], 1.1>>()
})

it('gets never from empty tuple', () => {
	isType.never<At<[], 0>>()
	isType.never<At<[], 1.1>>()
	isType.never<At<[], number>>()
	isType.never<At<[], any>>()
	isType.never<At<[], never>>()
})

it('gets type of the element in an array', () => {
	isType.equal<true, At<string[], 0>, string>()
	isType.equal<true, At<unknown[], 1>, unknown>()
	isType.equal<true, At<any[], -1>, any>()
	isType.equal<true, At<Array<string | boolean>, -2>, string | boolean>()
	isType.equal<true, At<string[], number>, string>()
	isType.equal<true, At<string[], any>, string>()
})

it('gets type of element in tuple', () => {
	isType.equal<true, At<['a', 1, string], 0>, 'a'>()
	isType.equal<true, At<['a', 1, string], 1>, 1>()
	isType.equal<true, At<['a', 1, string], 2>, string>()
	isType.equal<true, At<['a', 1, string], -1>, string>()
	isType.equal<true, At<['a', 1, string], -2>, 1>()
	isType.equal<true, At<['a', 1, string], -3>, 'a'>()
	isType.equal<true, At<['a', 1, string], number>, 'a' | 1 | string>()
	isType.equal<true, At<['a', 1, string], any>, 'a' | 1 | string>()
})

it('gets never if N is out of range', () => {
	isType.never<At<['a'], 1>>()
	isType.never<At<['a'], -2>>()
})

it(`can override fail case`, () => {
	isType.equal<true, At<[], 0, 'ha'>, 'ha'>()
})
