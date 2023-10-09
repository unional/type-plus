import { it } from '@jest/globals'
import { testType, type $Any, type $Unknown } from '../../index.js'
import { type $BranchOptions } from './$branch_options.js'

it('creates branch options with single branch', () => {
	testType.equal<$BranchOptions<$Any>, { $any: $Any }>(true)
})

it('creates branch options with multiple branches', () => {
	testType.equal<$BranchOptions<$Any | $Unknown>, {
		$any: $Any,
		$unknown: $Unknown
	}>(true)
})
