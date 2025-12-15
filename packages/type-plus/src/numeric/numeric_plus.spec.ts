import { it } from 'vitest'

import { isType, type NumericPlus } from '../index.js'

it('exports', () => {
	isType<NumericPlus.Zero>(-0)
	isType<NumericPlus.Numeric>(1)
})
