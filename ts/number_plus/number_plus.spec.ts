import { isType, type NumberPlus } from '../index.js'

test('exports', () => {
	isType<NumberPlus.Zero>(-0)
	isType<NumberPlus.Numeric>(1)
	isType.equal<true, NumberPlus.Negative<-1>, -1>()
	isType.equal<true, NumberPlus.Integer<0>, 0>()
	isType.never<NumberPlus.NumberType<1>>()
})
