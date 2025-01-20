import { it } from '@jest/globals'
import { type $MergeOptions, testType } from '../index.js'

it('overrides', () => {
	testType.equal<$MergeOptions<{ $any: 1 }, {}>, { $any: 1 }>(true)
	testType.equal<$MergeOptions<{ $any: 1 }, { $any: 2 }>, { $any: 2 }>(true)
	testType.equal<$MergeOptions<{ $any: 1; $else: 2 }, { $any: 2 }>, { $any: 2; $else: 2 }>(true)
})
