import { it } from '@jest/globals'
import { isType, testType, type NumberPlus } from '../index.js'

it('exports', () => {
	isType<NumberPlus.Zero>(-0)
	isType<NumberPlus.Numeric>(1)
	testType.equal<NumberPlus.Negative<-1>, -1>(true)
	testType.equal<NumberPlus.Integer<0>, 0>(true)
	testType.never<NumberPlus.StrictNumberType<1>>(true)
})
