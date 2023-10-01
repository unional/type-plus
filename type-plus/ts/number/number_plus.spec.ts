import { it } from '@jest/globals'
import { isType, testType, type NumberPlus } from '../index.js'

it('exports', () => {
	isType<NumberPlus.Zero>(-0)
	testType.false<NumberPlus.IsStrictNumber<1>>(true)
})
