import { it } from '@jest/globals'
import { testType, type ArrayPlus } from '../index.js'

it('returns never for never case', () => {
	testType.equal<ArrayPlus.Filter<never, string>, never>(true)
})

it('can override never case', () => {
	testType.equal<ArrayPlus.Filter<never, string, { $never: 1 }>, 1>(true)
})

it('can override not array case', () => {
	testType.equal<ArrayPlus.Filter<[], string, { $notArray: 1 }>, 1>(true)
})
