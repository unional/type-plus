import { describe, it } from '@jest/globals'

import { type $Any, type $Branch, type $BranchOptions, type $Unknown, testType } from '../../index.js'

it('create a branch type with property name', () => {
	type $Then = $Branch<'$then'>
	testType.equal<$Then['_$value'], '$then'>(true)
})

it('the property name must start with $', () => {
	// @ts-expect-error
	type _$DoesNotWork = $Branch<'nope'>
})

describe('$BranchOptions', () => {
	it('creates branch options with single branch', () => {
		testType.equal<$BranchOptions<$Any>, { $any: $Any }>(true)
	})

	it('creates branch options with multiple branches', () => {
		testType.equal<
			$BranchOptions<$Any | $Unknown>,
			{
				$any: $Any
				$unknown: $Unknown
			}
		>(true)
	})
})
