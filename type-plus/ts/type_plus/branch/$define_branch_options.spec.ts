import { it } from '@jest/globals'
import { testType, type $Any, type $Unknown } from '../../index.js'
import { type $DefineBranchOptions } from './$define_branch_options.js'

it('creates branch options with single branch', () => {
	testType.equal<$DefineBranchOptions<$Any>, { $any: $Any }>(true)
})

it('creates branch options with multiple branches', () => {
	testType.equal<$DefineBranchOptions<$Any | $Unknown>, {
		$any: $Any,
		$unknown: $Unknown
	}>(true)
})
