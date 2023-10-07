import { it } from '@jest/globals'
import { testType } from '../../index.js'
import type { $Branch } from './$branch.js'

it('create a branch type with property name', () => {
	type $Then = $Branch<'$then'>
	testType.equal<$Then['value'], '$then'>(true)
})

it('the property name must start with $', () => {
	// @ts-expect-error
	type $DoesNotWork = $Branch<'nope'>
})
