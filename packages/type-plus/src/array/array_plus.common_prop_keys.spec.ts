import { it } from '@jest/globals'
import { type ArrayPlus, testType } from '../index.js'

it('never returns never', () => {
	testType.equal<ArrayPlus.CommonPropKeys<never>, never>(true)
})

it('can override never case', () => {
	testType.equal<ArrayPlus.CommonPropKeys<never, { $never: 1 }>, 1>(true)
})

it('accepts readonly array', () => {
	testType.equal<ArrayPlus.CommonPropKeys<readonly [{ a: 1 }, { a: 2 }]>, 'a'>(true)
})
