import { it } from '@jest/globals'

import { type StringIncludes, type StringPlus,testType } from '../index.js'

it('exposes Includes', () => {
	testType.equal<StringPlus.Includes<'', ''>, StringIncludes<'', ''>>(true)
})

it('exposes Split', () => {
	testType.equal<StringPlus.Split<'abc', ''>, ['a', 'b', 'c']>(true)
})
