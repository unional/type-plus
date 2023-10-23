import { it } from '@jest/globals'

import { isType, type NumberPlus,testType } from '../index.js'

it('exports', () => {
	isType<NumberPlus.Zero>(-0)
	testType.false<NumberPlus.IsStrictNumber<1>>(true)
})
