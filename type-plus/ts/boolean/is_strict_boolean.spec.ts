import { it } from '@jest/globals'

import { type $Else,type $Then, type IsStrictBoolean, testType } from '../index.js'

it('returns true if T is boolean', () => {
	testType.equal<IsStrictBoolean<boolean>, true>(true)
})

it('returns false it T is true or false literal', () => {
	testType.equal<IsStrictBoolean<true>, false>(true)
	testType.equal<IsStrictBoolean<false>, false>(true)
})

it('returns false for special types', () => {
	testType.equal<IsStrictBoolean<void>, false>(true)
	testType.equal<IsStrictBoolean<unknown>, false>(true)
	testType.equal<IsStrictBoolean<any>, false>(true)
	testType.equal<IsStrictBoolean<never>, false>(true)
})

it('returns false for other types', () => {
	testType.equal<IsStrictBoolean<undefined>, false>(true)
	testType.equal<IsStrictBoolean<null>, false>(true)
	testType.equal<IsStrictBoolean<number>, false>(true)
	testType.equal<IsStrictBoolean<1>, false>(true)
	testType.equal<IsStrictBoolean<string>, false>(true)
	testType.equal<IsStrictBoolean<''>, false>(true)
	testType.equal<IsStrictBoolean<symbol>, false>(true)
	testType.equal<IsStrictBoolean<bigint>, false>(true)
	testType.equal<IsStrictBoolean<1n>, false>(true)
	testType.equal<IsStrictBoolean<{}>, false>(true)
	testType.equal<IsStrictBoolean<{ a: 1 }>, false>(true)
	testType.equal<IsStrictBoolean<string[]>, false>(true)
	testType.equal<IsStrictBoolean<[]>, false>(true)
	testType.equal<IsStrictBoolean<Function>, false>(true)
	testType.equal<IsStrictBoolean<() => void>, false>(true)
})

it('distributes over union type', () => {
	testType.equal<IsStrictBoolean<boolean | 1>, boolean>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsStrictBoolean<boolean | 1, { distributive: false }>, false>(true)
})

it('returns true for intersection type', () => {
	testType.equal<IsStrictBoolean<boolean & { a: 1 }>, true>(true)
})

it('works as filter', () => {
	testType.equal<IsStrictBoolean<boolean, { selection: 'filter' }>, boolean>(true)
	testType.equal<IsStrictBoolean<true, { selection: 'filter' }>, never>(true)

	testType.equal<IsStrictBoolean<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsStrictBoolean<unknown, { selection: 'filter' }>, never>(true)
	testType.equal<IsStrictBoolean<string | boolean, { selection: 'filter' }>, boolean>(true)
	testType.equal<IsStrictBoolean<string | boolean, { selection: 'filter', distributive: false }>, never>(true)

	testType.equal<IsStrictBoolean<string | true, { selection: 'filter' }>, never>(true)
})

it('works with unique branches', () => {
	testType.equal<IsStrictBoolean<boolean, IsStrictBoolean.$Branch>, $Then>(true)
	testType.equal<IsStrictBoolean<true, IsStrictBoolean.$Branch>, $Else>(true)
	testType.equal<IsStrictBoolean<false, IsStrictBoolean.$Branch>, $Else>(true)

	testType.equal<IsStrictBoolean<any, IsStrictBoolean.$Branch>, $Else>(true)
	testType.equal<IsStrictBoolean<unknown, IsStrictBoolean.$Branch>, $Else>(true)
	testType.equal<IsStrictBoolean<never, IsStrictBoolean.$Branch>, $Else>(true)
	testType.equal<IsStrictBoolean<void, IsStrictBoolean.$Branch>, $Else>(true)
})

it('can override $any branch', () => {
	testType.equal<IsStrictBoolean<any>, false>(true)
	testType.equal<IsStrictBoolean<any, { $any: unknown }>, unknown>(true)
})

it('can override $unknown branch', () => {
	testType.equal<IsStrictBoolean<unknown>, false>(true)
	testType.equal<IsStrictBoolean<unknown, { $unknown: unknown }>, unknown>(true)
})

it('can override $never branch', () => {
	testType.equal<IsStrictBoolean<never>, false>(true)
	testType.equal<IsStrictBoolean<never, { $never: unknown }>, unknown>(true)
})
