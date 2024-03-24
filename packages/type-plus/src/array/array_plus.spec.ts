import { it } from '@jest/globals'
import { testType, type ArrayPlus } from '../index.js'

it('exports all array types and utils', () => {
	testType.equal<ArrayPlus.At<[1, 2, 3], -1>, 3>(true)
	testType.equal<ArrayPlus.Concat<[1, 2], [3, 4]>, [1, 2, 3, 4]>(true)
	testType.equal<ArrayPlus.IndexAt<['a', 'b', 'c'], -1>, 2>(true)
	testType.equal<ArrayPlus.IsIndexOutOfBound<['a', 'b', 'c'], -1>, false>(true)
})
