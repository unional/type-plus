import { it } from '@jest/globals'
import { testType, type ArrayPlus } from '../index.js'

it('never returns never', () => {
	testType.equal<ArrayPlus.CommonPropKeys<never>, never>(true)
})

it('can override never case', () => {
	testType.equal<ArrayPlus.CommonPropKeys<never, { caseNever: 1 }>, 1>(true)
})
