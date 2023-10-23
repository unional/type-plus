import { it } from '@jest/globals'

import { type $Else,type $Then, type IsStrictBigint, testType } from '../index.js'

it('returns true for bigint', () => {
	testType.true<IsStrictBigint<bigint>>(true)
})

it('returns false if T is bigint literals', () => {
	testType.false<IsStrictBigint<0n>>(true)
	testType.false<IsStrictBigint<1n>>(true)
})

it('returns false for special types', () => {
	testType.false<IsStrictBigint<any>>(true)
	testType.false<IsStrictBigint<unknown>>(true)
	testType.false<IsStrictBigint<void>>(true)
	testType.false<IsStrictBigint<never>>(true)
})

it('returns false for other types', () => {
	testType.false<IsStrictBigint<undefined>>(true)
	testType.false<IsStrictBigint<null>>(true)
	testType.false<IsStrictBigint<boolean>>(true)
	testType.false<IsStrictBigint<true>>(true)
	testType.false<IsStrictBigint<false>>(true)
	testType.false<IsStrictBigint<number>>(true)
	testType.false<IsStrictBigint<1>>(true)
	testType.false<IsStrictBigint<string>>(true)
	testType.false<IsStrictBigint<''>>(true)
	testType.false<IsStrictBigint<symbol>>(true)
	testType.false<IsStrictBigint<{}>>(true)
	testType.false<IsStrictBigint<string[]>>(true)
	testType.false<IsStrictBigint<[]>>(true)
	testType.false<IsStrictBigint<Function>>(true)
	testType.false<IsStrictBigint<() => void>>(true)
})

it('distributes over union type', () => {
	testType.equal<IsStrictBigint<bigint | 1>, boolean>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsStrictBigint<bigint | 1, { distributive: false }>, false>(true)
})

it('consider intersection type as strict', () => {
	testType.true<IsStrictBigint<bigint & { a: 1 }>>(true)
	testType.false<IsStrictBigint<1n & { a: 1 }>>(true)
})

it('works as filter', () => {
	testType.equal<IsStrictBigint<bigint, { selection: 'filter' }>, bigint>(true)
	testType.equal<IsStrictBigint<1n, { selection: 'filter' }>, never>(true)

	testType.equal<IsStrictBigint<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsStrictBigint<unknown, { selection: 'filter' }>, never>(true)
	testType.equal<IsStrictBigint<string | boolean, { selection: 'filter' }>, never>(true)

	testType.equal<never | bigint, bigint>(true)
	testType.equal<IsStrictBigint<string | bigint, { selection: 'filter' }>, bigint>(true)
})

it('works with unique branches', () => {
	testType.equal<IsStrictBigint<bigint, IsStrictBigint.$Branch>, $Then>(true)
	testType.equal<IsStrictBigint<1n, IsStrictBigint.$Branch>, $Else>(true)

	testType.equal<IsStrictBigint<any, IsStrictBigint.$Branch>, $Else>(true)
	testType.equal<IsStrictBigint<unknown, IsStrictBigint.$Branch>, $Else>(true)
	testType.equal<IsStrictBigint<never, IsStrictBigint.$Branch>, $Else>(true)
	testType.equal<IsStrictBigint<void, IsStrictBigint.$Branch>, $Else>(true)

	testType.equal<IsStrictBigint<bigint | 1, IsStrictBigint.$Branch>, $Then | $Else>(true)
})

it('can override $any branch', () => {
	testType.equal<IsStrictBigint<any>, false>(true)
	testType.equal<IsStrictBigint<any, { $any: unknown }>, unknown>(true)
})

it('can override $unknown branch', () => {
	testType.equal<IsStrictBigint<unknown>, false>(true)
	testType.equal<IsStrictBigint<unknown, { $unknown: unknown }>, unknown>(true)
})

it('can override $never branch', () => {
	testType.equal<IsStrictBigint<never>, false>(true)
	testType.equal<IsStrictBigint<never, { $never: unknown }>, unknown>(true)
})
