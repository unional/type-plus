import { it } from '@jest/globals'
import { testType } from '../index.js'

it('TODO: how to handle distributed union types', () => {
	// `CanAssign<A, B>` returns boolean is the correct behavior.
	// Need a `CanAssignStrict<A, B>` or `CanStrictAssign<A, B>` or `StrictCanAssign<A, B>`?
	testType.canAssign<string|number, number>(true)
	testType.canAssign<string|number, number>(false)
})
