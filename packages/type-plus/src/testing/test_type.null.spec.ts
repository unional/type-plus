import { it } from 'vitest'

import { testType } from './test_type.js'

it('accepts null', () => {
	testType.null<null>(true)
})

it('rejects undefined', () => {
	testType.null<undefined>(false)
})

it('treat special types as not true', () => {
	testType.null<any>(false)
	testType.null<unknown>(false)
	testType.null<never>(false)
	testType.null<void>(false)
})

it('treat all other types as not true', () => {
	testType.null<undefined>(false)
	testType.null<number>(false)
	testType.null<string>(false)
	testType.null<''>(false)
	testType.null<symbol>(false)
	testType.null<bigint>(false)
	testType.null<{}>(false)
	testType.null<string[]>(false)
	testType.null<[]>(false)
	testType.null<Function>(false)
	testType.null<() => void>(false)
})
