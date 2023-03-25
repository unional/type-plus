import { literalArray, type } from '../index.js'

test('entries in array are restricted to the input literals', () => {
	const actual = literalArray('a', 'b')

	type.equal<typeof actual, Array<'a' | 'b'>>(true)
})
