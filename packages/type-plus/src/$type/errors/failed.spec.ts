import { it } from 'vitest'

import { type Failed, type FailedT, testType } from '../../index.js'

it('shows error message (inspect by hover over it)', () => {
	type R = Failed<'error message'>

	testType.equal<R, Failed<'error message'>>(true)
})

it('shows error message with type', () => {
	type R = FailedT<'type should be', number | string>

	testType.equal<R, FailedT<'type should be', number | string>>(true)
})
