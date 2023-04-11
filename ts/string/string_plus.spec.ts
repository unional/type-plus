import { it } from '@jest/globals'
import { StringIncludes, StringPlus, testType } from '../index.js'

it('exposes Includes', () => {
	testType.equal<StringPlus.Includes<'', ''>, StringIncludes<'', ''>>(true)
})
