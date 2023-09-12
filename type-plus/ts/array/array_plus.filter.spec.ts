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

it('filter type within the array matching the criteria', () => {
	testType.equal<ArrayPlus.Filter<Array<string | undefined>, string>, string[]>(true)
})

it('defaults to match true', () => {
	testType.equal<ArrayPlus.Filter<Array<string | true | undefined>>, true[]>(true)
	testType.equal<ArrayPlus.Filter<Array<string | boolean | undefined>>, true[]>(true)
})
