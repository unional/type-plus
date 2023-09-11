import { it } from '@jest/globals'
import { testType, type ArrayPlus } from '../index.js'

it('filters empty tuple -> empty tuple', () => {
	testType.equal<ArrayPlus.Filter<[]>, []>(true)
})

it('filters for true elements by default', () => {
	testType.equal<ArrayPlus.Filter<[true, false, true]>, [true, true]>(true)
})
