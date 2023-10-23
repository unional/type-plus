import { it } from '@jest/globals'

import { type $Any, type $BranchOptions, type $Else, type $Never,type $Then, type $Unknown, type IsNotStrictBoolean, testType } from '../index.js'

it('returns false if T is boolean', () => {
	testType.equal<IsNotStrictBoolean<boolean>, false>(true)
})

it('returns true it T is true or false literal', () => {
	testType.equal<IsNotStrictBoolean<true>, true>(true)
	testType.equal<IsNotStrictBoolean<false>, true>(true)
	testType.equal<IsNotStrictBoolean<true, { distributive: false }>, true>(true)
	testType.equal<IsNotStrictBoolean<false, { distributive: false }>, true>(true)
})

it('returns true for special types', () => {
	testType.equal<IsNotStrictBoolean<void>, true>(true)
	testType.equal<IsNotStrictBoolean<unknown>, true>(true)
	testType.equal<IsNotStrictBoolean<any>, true>(true)
	testType.equal<IsNotStrictBoolean<never>, true>(true)
})

it('returns true for all other types', () => {
	testType.equal<IsNotStrictBoolean<undefined>, true>(true)
	testType.equal<IsNotStrictBoolean<null>, true>(true)
	testType.equal<IsNotStrictBoolean<number>, true>(true)
	testType.equal<IsNotStrictBoolean<1>, true>(true)
	testType.equal<IsNotStrictBoolean<string>, true>(true)
	testType.equal<IsNotStrictBoolean<''>, true>(true)
	testType.equal<IsNotStrictBoolean<symbol>, true>(true)
	testType.equal<IsNotStrictBoolean<bigint>, true>(true)
	testType.equal<IsNotStrictBoolean<1n>, true>(true)
	testType.equal<IsNotStrictBoolean<{}>, true>(true)
	testType.equal<IsNotStrictBoolean<{ a: 1 }>, true>(true)
	testType.equal<IsNotStrictBoolean<string[]>, true>(true)
	testType.equal<IsNotStrictBoolean<[]>, true>(true)
	testType.equal<IsNotStrictBoolean<Function>, true>(true)
	testType.equal<IsNotStrictBoolean<() => void>, true>(true)
})

it('distributes over union type', () => {
	testType.equal<IsNotStrictBoolean<boolean | 1>, boolean>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsNotStrictBoolean<boolean | 1, { distributive: false }>, true>(true)
})

it('returns false for intersection type', () => {
	// `boolean & { a: 1 }` is considered as strict boolean
	testType.equal<IsNotStrictBoolean<boolean & { a: 1 }>, false>(true)
})

it('works as filter', () => {
	testType.equal<IsNotStrictBoolean<boolean, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotStrictBoolean<true, { selection: 'filter' }>, true>(true)
	testType.equal<IsNotStrictBoolean<false, { selection: 'filter' }>, false>(true)

	testType.equal<IsNotStrictBoolean<number, { selection: 'filter' }>, number>(true)
	testType.equal<IsNotStrictBoolean<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotStrictBoolean<unknown, { selection: 'filter' }>, unknown>(true)
	testType.equal<IsNotStrictBoolean<string | boolean, { selection: 'filter' }>, string>(true)
	testType.equal<IsNotStrictBoolean<string | boolean, { selection: 'filter', distributive: false }>, string | boolean>(true)

	testType.equal<IsNotStrictBoolean<string | true, { selection: 'filter' }>, string | true>(true)
})

it('works with unique branches', () => {
	testType.equal<IsNotStrictBoolean<boolean, IsNotStrictBoolean.$Branch>, $Else>(true)
	testType.equal<IsNotStrictBoolean<true, IsNotStrictBoolean.$Branch>, $Then>(true)
	testType.equal<IsNotStrictBoolean<false, IsNotStrictBoolean.$Branch>, $Then>(true)

	testType.equal<IsNotStrictBoolean<any, IsNotStrictBoolean.$Branch>, $Then>(true)
	testType.equal<IsNotStrictBoolean<any, $BranchOptions<$Any>>, $Any>(true)
	testType.equal<IsNotStrictBoolean<any, $BranchOptions<$Any | $Then>>, $Any>(true)
	testType.equal<IsNotStrictBoolean<unknown, IsNotStrictBoolean.$Branch>, $Then>(true)
	testType.equal<IsNotStrictBoolean<unknown, $BranchOptions<$Unknown>>, $Unknown>(true)
	testType.equal<IsNotStrictBoolean<unknown, $BranchOptions<$Unknown | $Then>>, $Unknown>(true)
	testType.equal<IsNotStrictBoolean<never, IsNotStrictBoolean.$Branch>, $Then>(true)
	testType.equal<IsNotStrictBoolean<never, $BranchOptions<$Never>>, $Never>(true)
	testType.equal<IsNotStrictBoolean<never, $BranchOptions<$Never | $Then>>, $Never>(true)
	testType.equal<IsNotStrictBoolean<void, IsNotStrictBoolean.$Branch>, $Then>(true)
})

it('can override $any branch', () => {
	testType.equal<IsNotStrictBoolean<any>, true>(true)
	testType.equal<IsNotStrictBoolean<any, { $any: unknown }>, unknown>(true)
})

it('can override $unknown branch', () => {
	testType.equal<IsNotStrictBoolean<unknown>, true>(true)
	testType.equal<IsNotStrictBoolean<unknown, { $unknown: unknown }>, unknown>(true)
})

it('can override $never branch', () => {
	testType.equal<IsNotStrictBoolean<never>, true>(true)
	testType.equal<IsNotStrictBoolean<never, { $never: unknown }>, unknown>(true)
})
