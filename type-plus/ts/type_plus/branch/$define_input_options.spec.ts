import { it } from '@jest/globals'
import { testType, type $Any, type $DefineInputOptions, type $Unknown } from '../../index.js'

it('creates branch options with single branch', () => {
	testType.equal<$DefineInputOptions<$Any>, { $any?: unknown }>(true)
})

it('creates branch options with multiple branches', () => {
	testType.equal<$DefineInputOptions<$Any | $Unknown>, {
		$any?: unknown,
		$unknown?: unknown
	}>(true)
})
