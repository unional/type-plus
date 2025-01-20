import { it } from '@jest/globals'

import { type NumberPlus, isType, testType } from '../index.js'

it('exports', () => {
	isType<NumberPlus.Zero>(-0)
	testType.false<NumberPlus.IsNumber<1, { exact: true }>>(true)
})
