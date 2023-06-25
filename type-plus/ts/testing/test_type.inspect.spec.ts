import { it } from '@jest/globals'
import { testType } from './test_type.js'

it('set `t` as the input type for inspection', () => {
	testType.inspect<{ a: number }>(t => testType.equal<typeof t, { a: number }>(true))
})
