import { it } from '@jest/globals'
import { testType } from '../index.js'
import { type $MergeOptions } from './$merge_options.js'

it('overrides', () => {
	testType.equal<$MergeOptions<{ $any: 1 }, {}>, { $any: 1 }>(true)
	testType.equal<$MergeOptions<{ $any: 1 }, { $any: 2 }>, { $any: 2 }>(true)
	testType.equal<$MergeOptions<{ $any: 1, $else: 2 }, { $any: 2 }>, { $any: 2, $else: 2 }>(true)
})
