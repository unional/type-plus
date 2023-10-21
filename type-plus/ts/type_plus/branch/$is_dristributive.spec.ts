import { it } from '@jest/globals'
import { testType } from '../../index.js'
import type { $IsDistributive } from './$is_distributive.js'

it('returns true by default when $Options does not have distributive property', () => {
	testType.equal<$IsDistributive<{}>, true>(true)
})

it(`returns value from $Options['distributive']`, () => {
	testType.equal<$IsDistributive<{ distributive: true }>, true>(true)
	testType.equal<$IsDistributive<{ distributive: false }>, false>(true)
})

it(`supports overrides`, () => {
	testType.equal<$IsDistributive<{ distributive: true }, { $then: 1 }>, 1>(true)
	testType.equal<$IsDistributive<{ distributive: false }, { $else: 1 }>, 1>(true)
})
