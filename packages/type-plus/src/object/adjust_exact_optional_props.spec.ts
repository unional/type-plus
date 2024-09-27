import { it } from '@jest/globals'
import { testType } from '../testing/test_type.js'
import type { AdjustExactOptionalProps } from '../index.js'

it('adds undefined to optional props', () => {
	type X = { a: string; b?: string }
	testType.equal<AdjustExactOptionalProps<X>, { a: string, b?: string | undefined }>(true)
})

it('works with empty object', () => {
	type X = {}
	testType.equal<AdjustExactOptionalProps<X>, {}>(true)
})

it('works with intersection', () => {
	type X = { a: string; b?: string } & { c: string }
	testType.equal<AdjustExactOptionalProps<X>, { a: string, b?: string | undefined, c: string }>(true)
})

it('works with union', () => {
	type X = { a: string; b?: string } | { c: string }
	testType.equal<AdjustExactOptionalProps<X>, { a: string, b?: string | undefined } | { c: string }>(true)
})
