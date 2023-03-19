import { ArrayPlus, isType } from '../index.js'

it('exports all array types and utils', () => {
	isType.equal<true, ArrayPlus.At<[1, 2, 3], -1>, 3>()
	isType.equal<true, ArrayPlus.Concat<[1, 2], [3, 4]>, [1, 2, 3, 4]>()
	isType.equal<true, ArrayPlus.IndexAt<['a', 'b', 'c'], -1>, 2>()
	isType.equal<true, ArrayPlus.IsIndexOutOfBound<['a', 'b', 'c'], -1>, false>()
})
