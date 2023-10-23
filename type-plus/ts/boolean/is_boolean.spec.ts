import { it } from '@jest/globals'

import { type $Else,type $Then, type IsBoolean, testType } from '../index.js'

it('returns true if T is boolean', () => {
	testType.equal<IsBoolean<boolean>, true>(true)
})

it('returns true it T is true or false literal', () => {
	testType.equal<IsBoolean<true>, true>(true)
	testType.equal<IsBoolean<false>, true>(true)
})

it('returns false for special types', () => {
	testType.equal<IsBoolean<void>, false>(true)
	testType.equal<IsBoolean<unknown>, false>(true)
	testType.equal<IsBoolean<any>, false>(true)
	testType.equal<IsBoolean<never>, false>(true)
})

it('returns false for other types', () => {
	testType.equal<IsBoolean<undefined>, false>(true)
	testType.equal<IsBoolean<null>, false>(true)
	testType.equal<IsBoolean<number>, false>(true)
	testType.equal<IsBoolean<1>, false>(true)
	testType.equal<IsBoolean<string>, false>(true)
	testType.equal<IsBoolean<''>, false>(true)
	testType.equal<IsBoolean<symbol>, false>(true)
	testType.equal<IsBoolean<bigint>, false>(true)
	testType.equal<IsBoolean<1n>, false>(true)
	testType.equal<IsBoolean<{}>, false>(true)
	testType.equal<IsBoolean<{ a: 1 }>, false>(true)
	testType.equal<IsBoolean<string[]>, false>(true)
	testType.equal<IsBoolean<[]>, false>(true)
	testType.equal<IsBoolean<Function>, false>(true)
	testType.equal<IsBoolean<() => void>, false>(true)
})

it('distributes over union type', () => {
	testType.equal<IsBoolean<boolean | 1>, boolean>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsBoolean<boolean | 1, { distributive: false }>, false>(true)
})

it('returns true for intersection type', () => {
	testType.equal<IsBoolean<boolean & { a: 1 }>, true>(true)
})

it('works as filter', () => {
	testType.equal<IsBoolean<boolean, { selection: 'filter' }>, boolean>(true)
	testType.equal<IsBoolean<true, { selection: 'filter' }>, true>(true)

	testType.equal<IsBoolean<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsBoolean<unknown, { selection: 'filter' }>, never>(true)
	testType.equal<IsBoolean<string | boolean, { selection: 'filter' }>, boolean>(true)

	testType.equal<IsBoolean<string | true, { selection: 'filter' }>, true>(true)
})

it('works with unique branches', () => {
	testType.equal<IsBoolean<boolean, IsBoolean.$Branch>, $Then>(true)
	testType.equal<IsBoolean<true, IsBoolean.$Branch>, $Then>(true)

	testType.equal<IsBoolean<any, IsBoolean.$Branch>, $Else>(true)
	testType.equal<IsBoolean<unknown, IsBoolean.$Branch>, $Else>(true)
	testType.equal<IsBoolean<never, IsBoolean.$Branch>, $Else>(true)
	testType.equal<IsBoolean<void, IsBoolean.$Branch>, $Else>(true)
})

it('can override $any branch', () => {
	testType.equal<IsBoolean<any>, false>(true)
	testType.equal<IsBoolean<any, { $any: unknown }>, unknown>(true)
})

it('can override $unknown branch', () => {
	testType.equal<IsBoolean<unknown>, false>(true)
	testType.equal<IsBoolean<unknown, { $unknown: unknown }>, unknown>(true)
})

it('can override $never branch', () => {
	testType.equal<IsBoolean<never>, false>(true)
	testType.equal<IsBoolean<never, { $never: unknown }>, unknown>(true)
})
