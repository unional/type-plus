import { isType, type At } from '../index.js'

it('gets type of element in array', () => {
	isType.equal<true, At<string[], 0>, string>()
	isType.equal<true, At<string[], 1>, string>()
	isType.equal<true, At<string[], -1>, string>()
	isType.equal<true, At<string[], -2>, string>()

	isType.equal<true, At<Array<string | boolean>, 0>, string | boolean>()
	isType.equal<true, At<Array<string | boolean>, 1>, string | boolean>()
	isType.equal<true, At<Array<string | boolean>, -1>, string | boolean>()
	isType.equal<true, At<Array<string | boolean>, -2>, string | boolean>()
})

it('gets never from empty tuple', () => {
	isType.equal<true, At<[], 0>, never>()
})

it('gets type of element in tuple', () => {
	isType.equal<true, At<['a', 1, string], 0>, 'a'>()
	isType.equal<true, At<['a', 1, string], 1>, 1>()
	isType.equal<true, At<['a', 1, string], 2>, string>()
	isType.equal<true, At<['a', 1, string], -1>, string>()
	isType.equal<true, At<['a', 1, string], -2>, 1>()
	isType.equal<true, At<['a', 1, string], -3>, 'a'>()
})

it('gets never if abs N is larger than tuple length', () => {
	isType.equal<true, At<['a'], 1>, undefined>()
	isType.equal<true, At<['a'], -1>, 'a'>()
	isType.equal<true, At<['a'], -2>, undefined>()
})
