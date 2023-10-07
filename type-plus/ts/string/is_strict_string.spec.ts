/**
 * Thank you `-n-` on TypeScript discord for the suggestion of:
 *
 * ```ts
 * type IsExactlyString<T extends string> =
 *   T extends string & infer U
 *   ? (U extends string ? false : true)
 *   : false
 * ```
 */


import { it } from '@jest/globals'
import { testType, type $Else, type $Then, type IsStrictString } from '../index.js'

it('returns true for string', () => {
	testType.true<IsStrictString<string>>(true)
})

it('returns false if T is a string literal', () => {
	testType.false<IsStrictString<''>>(true)
	testType.false<IsStrictString<'a'>>(true)
})

it('returns false for special types', () => {
	testType.false<IsStrictString<any>>(true)
	testType.false<IsStrictString<unknown>>(true)
	testType.false<IsStrictString<void>>(true)
	testType.false<IsStrictString<never>>(true)
})

it('returns false for other types', () => {
	testType.false<IsStrictString<undefined>>(true)
	testType.false<IsStrictString<null>>(true)
	testType.false<IsStrictString<boolean>>(true)
	testType.false<IsStrictString<true>>(true)
	testType.false<IsStrictString<false>>(true)
	testType.false<IsStrictString<number>>(true)
	testType.false<IsStrictString<1>>(true)
	testType.false<IsStrictString<symbol>>(true)
	testType.false<IsStrictString<bigint>>(true)
	testType.false<IsStrictString<{}>>(true)
	testType.false<IsStrictString<string[]>>(true)
	testType.false<IsStrictString<[]>>(true)
	testType.false<IsStrictString<Function>>(true)
	testType.false<IsStrictString<() => void>>(true)
})

it('distributes over union type', () => {
	// `string | 'abc'` is pre-resolved by TypeScript to `string`
	testType.equal<string | 'abc', string>(true)
	testType.equal<IsStrictString<string | 'abc'>, true>(true)
	testType.equal<IsStrictString<string | number>, boolean>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsStrictString<string | number, { distributive: false }>, false>(true)
})

it('returns true for intersection type', () => {
	testType.equal<IsStrictString<string & { a: 1 }>, true>(true)
	testType.equal<IsStrictString<'' & { a: 1 }>, false>(true)
})

it('works as filter', () => {
	testType.equal<IsStrictString<string, { selection: 'filter' }>, string>(true)
	testType.equal<IsStrictString<'', { selection: 'filter' }>, never>(true)

	testType.equal<IsStrictString<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsStrictString<unknown, { selection: 'filter' }>, never>(true)
	testType.equal<IsStrictString<string | number, { selection: 'filter' }>, string>(true)
	testType.equal<IsStrictString<string | number, { selection: 'filter', distributive: false }>, never>(true)
	testType.equal<IsStrictString<'' | true, { selection: 'filter' }>, never>(true)
})

it('works with unique branches', () => {
	testType.equal<IsStrictString<string, IsStrictString.$Branch>, $Then>(true)
	testType.equal<IsStrictString<'', IsStrictString.$Branch>, $Else>(true)

	testType.equal<IsStrictString<any, IsStrictString.$Branch>, $Else>(true)
	testType.equal<IsStrictString<unknown, IsStrictString.$Branch>, $Else>(true)
	testType.equal<IsStrictString<never, IsStrictString.$Branch>, $Else>(true)
	testType.equal<IsStrictString<void, IsStrictString.$Branch>, $Else>(true)
})
