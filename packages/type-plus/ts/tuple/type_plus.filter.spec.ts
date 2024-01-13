import { it } from '@jest/globals'

import { testType, type TuplePlus } from '../index.js'

it('filters empty tuple -> empty tuple', () => {
	testType.equal<TuplePlus.Filter<[]>, []>(true)
})

it('filters for true elements by default', () => {
	testType.equal<TuplePlus.Filter<[true, false, true]>, [true, true]>(true)
})
