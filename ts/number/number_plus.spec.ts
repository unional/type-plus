import { isType, type, type NumberPlus } from '../index.js'

test('exports', () => {
	isType<NumberPlus.Zero>(-0)
	isType<NumberPlus.Numeric>(1)
	type.equal<NumberPlus.Negative<-1>, -1>(true)
	type.equal<NumberPlus.Integer<0>, 0>(true)
	type.never<NumberPlus.NumberType<1>>(true)
})
