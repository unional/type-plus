import { it } from '@jest/globals'

import { type NumericPlus, isType } from '../index.js'

it('exports', () => {
	isType<NumericPlus.Zero>(-0)
	isType<NumericPlus.Numeric>(1)
})
