import { ArrayPlus, type } from '../index.js'

it('exports all array types and utils', () => {
	type.equal<ArrayPlus.At<[1, 2, 3], -1>, 3>(true)
	type.equal<ArrayPlus.Concat<[1, 2], [3, 4]>, [1, 2, 3, 4]>(true)
	type.equal<ArrayPlus.IndexAt<['a', 'b', 'c'], -1>, 2>(true)
	type.equal<ArrayPlus.IsIndexOutOfBound<['a', 'b', 'c'], -1>, false>(true)
})
