import { ArrayPlus, isType } from '../index.js'

it('shape', () => {
	isType.equal<true, ArrayPlus.At<[1, 2, 3], -1>, 3>()
})
