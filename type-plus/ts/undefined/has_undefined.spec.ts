import { it } from '@jest/globals'
import { testType, type HasUndefined } from '../index.js'

it('returns false when there is no undefined', () => {
	testType.equal<HasUndefined<1 | 2>, false>(true)
})

it('returns true when there is undefined', () => {
	testType.equal<HasUndefined<undefined>, true>(true)
	testType.equal<HasUndefined<undefined | 1>, true>(true)
})
