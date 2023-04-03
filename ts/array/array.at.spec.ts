import { it } from '@jest/globals'
import { testType, type At } from '../index.js'

it('gets never if N is never', () => {
	testType.never<At<string[], never>>(true)
	testType.never<At<[], never>>(true)
	testType.never<At<['a'], never>>(true)
})

it('returns never if N is not an integer', () => {
	testType.never<At<string[], 1.1>>(true)
	testType.never<At<[1, 2, 3], 1.1>>(true)
})

it('gets never from empty tuple', () => {
	testType.never<At<[], 0>>(true)
	testType.never<At<[], 1.1>>(true)
	testType.never<At<[], number>>(true)
})

it('gets type of the element in an array', () => {
	testType.equal<At<string[], 0>, string>(true)
	testType.equal<At<unknown[], 1>, unknown>(true)
	testType.equal<At<any[], -1>, any>(true)
	testType.equal<At<Array<string | boolean>, -2>, string | boolean>(true)
	testType.equal<At<string[], number>, string>(true)
	testType.equal<At<string[], any>, string>(true)
})

it('gets type of element in tuple', () => {
	testType.equal<At<['a', 1, string], 0>, 'a'>(true)
	testType.equal<At<['a', 1, string], 1>, 1>(true)
	testType.equal<At<['a', 1, string], 2>, string>(true)
	testType.equal<At<['a', 1, string], -1>, string>(true)
	testType.equal<At<['a', 1, string], -2>, 1>(true)
	testType.equal<At<['a', 1, string], -3>, 'a'>(true)
	testType.equal<At<['a', 1, string], number>, 'a' | 1 | string>(true)
	testType.equal<At<['a', 1, string], any>, 'a' | 1 | string>(true)
})

it('gets never if N is out of range', () => {
	testType.never<At<['a'], 1>>(true)
	testType.never<At<['a'], -2>>(true)
})

it(`can override fail case`, () => {
	testType.equal<At<[], 0, 'ha'>, 'ha'>(true)

	testType.equal<At<[], any, 'ha'>, 'ha'>(true)
	testType.equal<At<[], never, 'ha'>, 'ha'>(true)
})
