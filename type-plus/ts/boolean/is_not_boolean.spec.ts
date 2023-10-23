import { it } from '@jest/globals'

import { type $Else,type $Then, type IsNotBoolean, testType } from '../index.js'

it('returns false if T is boolean', () => {
	testType.equal<IsNotBoolean<boolean>, false>(true)
})

it('returns false it T is true or false literal', () => {
	testType.equal<IsNotBoolean<true>, false>(true)
	testType.equal<IsNotBoolean<false>, false>(true)
})

it('returns true for special types', () => {
	testType.equal<IsNotBoolean<void>, true>(true)
	testType.equal<IsNotBoolean<unknown>, true>(true)
	testType.equal<IsNotBoolean<any>, true>(true)
	testType.equal<IsNotBoolean<never>, true>(true)
})

it('returns true for all other types', () => {
	testType.equal<IsNotBoolean<undefined>, true>(true)
	testType.equal<IsNotBoolean<null>, true>(true)
	testType.equal<IsNotBoolean<number>, true>(true)
	testType.equal<IsNotBoolean<1>, true>(true)
	testType.equal<IsNotBoolean<string>, true>(true)
	testType.equal<IsNotBoolean<''>, true>(true)
	testType.equal<IsNotBoolean<symbol>, true>(true)
	testType.equal<IsNotBoolean<bigint>, true>(true)
	testType.equal<IsNotBoolean<{}>, true>(true)
	testType.equal<IsNotBoolean<string[]>, true>(true)
	testType.equal<IsNotBoolean<[]>, true>(true)
	testType.equal<IsNotBoolean<Function>, true>(true)
	testType.equal<IsNotBoolean<() => void>, true>(true)
})

it('distributes over union type', () => {
	testType.equal<IsNotBoolean<boolean | 1>, boolean>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsNotBoolean<boolean | 1, { distributive: false }>, true>(true)
})

it('returns true for intersection type', () => {
	testType.equal<IsNotBoolean<boolean & { a: 1 }>, false>(true)
})

it('works as filter', () => {
	testType.equal<IsNotBoolean<boolean, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotBoolean<true, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotBoolean<false, { selection: 'filter' }>, never>(true)

	testType.equal<IsNotBoolean<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotBoolean<unknown, { selection: 'filter' }>, unknown>(true)
	testType.equal<IsNotBoolean<string | boolean, { selection: 'filter' }>, string>(true)
	testType.equal<IsNotBoolean<string | boolean, { selection: 'filter', distributive: false }>, string | boolean>(true)

	testType.equal<IsNotBoolean<string | true, { selection: 'filter' }>, string>(true)
})

it('works with unique branches', () => {
	testType.equal<IsNotBoolean<boolean, IsNotBoolean.$Branch>, $Else>(true)
	testType.equal<IsNotBoolean<string, IsNotBoolean.$Branch>, $Then>(true)

	testType.equal<IsNotBoolean<any, IsNotBoolean.$Branch>, $Then>(true)
	testType.equal<IsNotBoolean<unknown, IsNotBoolean.$Branch>, $Then>(true)
	testType.equal<IsNotBoolean<never, IsNotBoolean.$Branch>, $Then>(true)
	testType.equal<IsNotBoolean<void, IsNotBoolean.$Branch>, $Then>(true)
})

it('can override $any branch', () => {
	testType.equal<IsNotBoolean<any>, true>(true)
	testType.equal<IsNotBoolean<any, { $any: unknown }>, unknown>(true)
})

it('can override $unknown branch', () => {
	testType.equal<IsNotBoolean<unknown>, true>(true)
	testType.equal<IsNotBoolean<unknown, { $unknown: unknown }>, unknown>(true)
})

it('can override $never branch', () => {
	testType.equal<IsNotBoolean<never>, true>(true)
	testType.equal<IsNotBoolean<never, { $never: unknown }>, unknown>(true)
})
