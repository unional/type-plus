import { it } from '@jest/globals'

import { testType } from '../../index.js'
import type { $Exact } from '../../index.js'

it('returns false by default when $Options does not have the `exact` property or it is undefined', () => {
	testType.equal<$Exact.Parse<{}>, false>(true)
	testType.equal<$Exact.Parse<{ exact: undefined }>, false>(true)
})

it(`returns value from $Options['exact']`, () => {
	testType.equal<$Exact.Parse<{ exact: true }>, true>(true)
	testType.equal<$Exact.Parse<{ exact: false }>, false>(true)
})

it('supports overrides', () => {
	testType.equal<$Exact.Parse<{ exact: true }, { $then: 1 }>, 1>(true)
	testType.equal<$Exact.Parse<{ exact: false }, { $else: 1 }>, 1>(true)
})

it('supports override with any[] and unknown[]', () => {
	testType.equal<$Exact.Parse<{ exact: true }, { $then: any[] }>, any[]>(true)
	testType.equal<$Exact.Parse<{ exact: false }, { $else: unknown[] }>, unknown[]>(true)
})

it('supports override with any and unknown', () => {
	testType.equal<$Exact.Parse<{ exact: true }, { $then: any }>, any>(true)
	testType.equal<$Exact.Parse<{ exact: false }, { $else: unknown }>, unknown>(true)
})
