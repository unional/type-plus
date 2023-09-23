import { it } from '@jest/globals'
import { testType, type NonUndefined } from '../index.js'

it('defaults to return never when T is undefined', () => {
	testType.equal<NonUndefined<undefined>, never>(true)
})

it('replace undefined with Replace', () => {
	testType.equal<NonUndefined<1, 2>, 1>(true)
	testType.equal<NonUndefined<undefined, 2>, 2>(true)
	testType.equal<NonUndefined<undefined | 1, 2>, 1 | 2>(true)
})
