import { it } from '@jest/globals'

import { testType, type $Else, type $Then, type IsArray } from '../index.js'

it('returns true if T is array', () => {
	testType.true<IsArray<any[]>>(true)
	testType.true<IsArray<unknown[]>>(true)
	testType.true<IsArray<never[]>>(true)
	testType.true<IsArray<void[]>>(true)

	testType.true<IsArray<string[]>>(true)
})

it('returns false if T is tuple', () => {
	testType.false<IsArray<[]>>(true)
	testType.false<IsArray<[1]>>(true)
})

it('returns false for special types', () => {
	testType.false<IsArray<void>>(true)
	testType.false<IsArray<unknown>>(true)
	testType.false<IsArray<any>>(true)
	testType.false<IsArray<never>>(true)
})

it('returns false for other types', () => {
	testType.false<IsArray<undefined>>(true)
	testType.false<IsArray<null>>(true)
	testType.false<IsArray<boolean>>(true)
	testType.false<IsArray<true>>(true)
	testType.false<IsArray<false>>(true)
	testType.false<IsArray<number>>(true)
	testType.false<IsArray<1>>(true)
	testType.false<IsArray<string>>(true)
	testType.false<IsArray<''>>(true)
	testType.false<IsArray<symbol>>(true)
	testType.false<IsArray<bigint>>(true)
	testType.false<IsArray<1n>>(true)
	testType.false<IsArray<{}>>(true)
	testType.false<IsArray<{ a: 1 }>>(true)
	testType.false<IsArray<[]>>(true)
	testType.false<IsArray<Function>>(true)
	testType.false<IsArray<() => void>>(true)
})

it('distributes over union type', () => {
	testType.boolean<IsArray<number[] | 1>>(true)
})

it('returns true if T is union of arrays', () => {
	testType.true<IsArray<string[] | number[]>>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsArray<number[] | number, { distributive: false }>, false>(true)
})

it('returns false for intersection type', () => {
	testType.true<IsArray<number[] & 1>>(true)
	testType.true<IsArray<number[] & 1, { distributive: false }>>(true)

	testType.false<IsArray<[] & 1>>(true)
	testType.false<IsArray<[] & 1, { distributive: false }>>(true)
})

it('works as filter', () => {
	testType.equal<IsArray<null[], { selection: 'filter' }>, null[]>(true)

	testType.equal<IsArray<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsArray<unknown, { selection: 'filter' }>, never>(true)
	testType.equal<IsArray<null[] | number, { selection: 'filter' }>, null[]>(true)
})
it('works with unique branches', () => {
	testType.equal<IsArray<string[], IsArray.$Branch>, $Then>(true)

	testType.equal<IsArray<any, IsArray.$Branch>, $Else>(true)
	testType.equal<IsArray<unknown, IsArray.$Branch>, $Else>(true)
	testType.equal<IsArray<never, IsArray.$Branch>, $Else>(true)
	testType.equal<IsArray<void, IsArray.$Branch>, $Else>(true)
})

it('can override $any branch', () => {
	testType.equal<IsArray<any>, false>(true)
	testType.equal<IsArray<any, { $any: unknown }>, unknown>(true)
})

it('can override $unknown branch', () => {
	testType.equal<IsArray<unknown>, false>(true)
	testType.equal<IsArray<unknown, { $unknown: unknown }>, unknown>(true)
})

it('can override $never branch', () => {
	testType.equal<IsArray<never>, false>(true)
	testType.equal<IsArray<never, { $never: unknown }>, unknown>(true)
})

it('supports readonly array', () => {
	testType.true<IsArray<readonly string[]>>(true)
	testType.false<IsArray<readonly []>>(true)
})
