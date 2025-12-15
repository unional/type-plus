import { it } from 'vitest'

import { isType, type NumberPlus, testType } from '../index.js'

it('exports', () => {
	isType<NumberPlus.Zero>(-0)
	testType.false<NumberPlus.IsNumber<1, { exact: true }>>(true)
})
