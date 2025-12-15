import { it } from 'vitest'

import { testType } from './test_type.js'

it('accepts undefined', () => {
	testType.undefined<undefined>(true)
})

it('rejects null', () => {
	testType.undefined<null>(false)
})

it('treat special types as not true', () => {
	testType.undefined<any>(false)
	testType.undefined<unknown>(false)
	testType.undefined<never>(false)
	testType.undefined<void>(false)
})

it('treat all other types as not true', () => {
	testType.undefined<null>(false)
	testType.undefined<number>(false)
	testType.undefined<string>(false)
	testType.undefined<''>(false)
	testType.undefined<symbol>(false)
	testType.undefined<bigint>(false)
	testType.undefined<{}>(false)
	testType.undefined<string[]>(false)
	testType.undefined<[]>(false)
	testType.undefined<Function>(false)
	testType.undefined<() => void>(false)
})

// it('is distributive against union', () => {
// 	testType.undefined<undefined | 1>(Boolean())
// })

// it('check if the type has undefined', () => {
// 	testType.hasUndefined<number | undefined>(true)
// 	testType.hasUndefined<undefined>(true)
// 	testType.hasUndefined<undefined | null>(true)
// 	testType.hasUndefined<number>(false)

// 	testType.hasUndefined<any>(true)
// 	testType.hasUndefined<unknown>(true)
// 	testType.hasUndefined<void>(true)
// 	testType.hasUndefined<never>(true)
// })
