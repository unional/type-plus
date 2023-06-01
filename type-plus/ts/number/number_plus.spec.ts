import { it } from '@jest/globals'
import { isType, testType, type NumberPlus } from '../index.js'

it('exports', () => {
	isType<NumberPlus.Zero>(-0)
	testType.never<NumberPlus.StrictNumberType<1>>(true)
})
