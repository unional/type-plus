import { it } from '@jest/globals'
import { isType, testType, type NumericPlus } from '../index.js'

it('exports', () => {
	isType<NumericPlus.Zero>(-0)
	isType<NumericPlus.Numeric>(1)
	testType.equal<NumericPlus.Negative<-1>, -1>(true)
	testType.equal<NumericPlus.Integer<0>, 0>(true)
})
