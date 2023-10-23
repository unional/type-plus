import { describe, it } from '@jest/globals'

import { type IsOptionalKey, type OptionalKeys, type OptionalProps,testType } from '../index.js'

describe('IsOptionalKey', () => {
	it('returns true for optional prop', () => {
		testType.true<IsOptionalKey<{ a?: number }, 'a'>>(true)
		testType.true<IsOptionalKey<{ a?: number, b: number }, 'a'>>(true)
	})

	it('returns false for non-optional prop', () => {
		testType.false<IsOptionalKey<{ a: number }, 'a'>>(true)
		testType.false<IsOptionalKey<{ a: number, b?: number }, 'a'>>(true)
	})

	it('works with union type', () => {
		type X = { a?: string, b: string } | { c: string, d?: string }

		testType.true<IsOptionalKey<X, 'a'>>(true)
		testType.false<IsOptionalKey<X, 'b'>>(true)
		testType.false<IsOptionalKey<X, 'c'>>(true)
		testType.true<IsOptionalKey<X, 'd'>>(true)
	})

	it('supports override', () => {
		testType.equal<IsOptionalKey<{ a?: number, b: number }, 'a', 'yes', 'no'>, 'yes'>(true)
		testType.equal<IsOptionalKey<{ a?: number, b: number }, 'b', 'yes', 'no'>, 'no'>(true)
	})
})

describe('OptionalKeys', () => {
	it('gets the keys of the optional properties', () => {
		testType.equal<OptionalKeys<{ a?: number, b?: number }>, 'a' | 'b'>(true)
		testType.equal<OptionalKeys<{ a?: number, b?: number, c: number }>, 'a' | 'b'>(true)
	})

	it('gets never if T has no optional properties', () => {
		testType.equal<OptionalKeys<{}>, never>(true)
		testType.equal<OptionalKeys<{ c: number }>, never>(true)
	})

	it('gets the keys of optional properties across unions', () => {
		testType.equal<OptionalKeys<{ a?: number } | { b?: number }>, 'a' | 'b'>(true)
	})
})

describe('OptionalProps<T>', () => {
	it('returns empty for object with no optional properties', () => {
		testType.equal<OptionalProps<{}>, {}>(true)
		testType.equal<OptionalProps<{ a: number }>, {}>(true)
	})

	it('returns only the optional properties', () => {
		testType.equal<OptionalProps<{ a?: number }>, { a?: number }>(true)
		testType.equal<OptionalProps<{ a?: number | undefined }>, { a?: number | undefined }>(true)
		testType.equal<OptionalProps<{ a?: number, b: number | undefined }>, { a?: number }>(true)
	})

	it('extracts optional properties from composite function', () => {
		testType.equal<OptionalProps<{
			(): void,
			a?: number
		}>, { a?: number }>(true)
		testType.equal<OptionalProps<(() => void) & {
			a?: number
		}>, { a?: number }>(true)
	})

	it('ex', () => {
		testType.equal<
			OptionalProps<{ a?: number } | { b?: number }>,
			{ a?: number } | { b?: number }
		>(true)
	})
})

// ---- weaker implementations ----
// export type IsOptionalKey<T, K extends keyof T, Then = true, Else = false> =
// 	{ [k in K]?: T[k] } extends { [k in K]: T[k] }
// 	? Then
// 	: Else

// export type OptionalKeys<T extends AnyRecord> = Exclude<
// 	{ [k in keyof T]: IsOptionalKey<T, k, k, never> }[keyof T],
// 	undefined
// >
