import { it } from '@jest/globals'

import { type $Else, type $Then, type IsNotTrue,testType } from '../index.js'

it('returns false if T is true', () => {
	testType.equal<IsNotTrue<true>, false>(true)
})

it('returns boolean if T is boolean because it is distributive by default', () => {
	testType.equal<IsNotTrue<boolean>, boolean>(true)
	testType.equal<IsNotTrue<boolean, { distributive: false }>, true>(true)
})


it('returns true if T is boolean or false', () => {
	testType.equal<IsNotTrue<false>, true>(true)
})

it('returns true for special types', () => {
	testType.equal<IsNotTrue<void>, true>(true)
	testType.equal<IsNotTrue<unknown>, true>(true)
	testType.equal<IsNotTrue<any>, true>(true)
	testType.equal<IsNotTrue<never>, true>(true)
})

it('returns true for other types', () => {
	testType.equal<IsNotTrue<undefined>, true>(true)
	testType.equal<IsNotTrue<null>, true>(true)
	testType.equal<IsNotTrue<number>, true>(true)
	testType.equal<IsNotTrue<1>, true>(true)
	testType.equal<IsNotTrue<string>, true>(true)
	testType.equal<IsNotTrue<''>, true>(true)
	testType.equal<IsNotTrue<symbol>, true>(true)
	testType.equal<IsNotTrue<bigint>, true>(true)
	testType.equal<IsNotTrue<1n>, true>(true)
	testType.equal<IsNotTrue<{}>, true>(true)
	testType.equal<IsNotTrue<{ a: 1 }>, true>(true)
	testType.equal<IsNotTrue<string[]>, true>(true)
	testType.equal<IsNotTrue<[]>, true>(true)
	testType.equal<IsNotTrue<Function>, true>(true)
	testType.equal<IsNotTrue<() => void>, true>(true)
})

it('distributes over union type', () => {
	testType.equal<IsNotTrue<boolean>, boolean>(true)
	testType.equal<IsNotTrue<boolean | 1>, boolean>(true)
	testType.equal<IsNotTrue<true | 1>, boolean>(true)
	testType.equal<IsNotTrue<false | 1>, true>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsNotTrue<boolean, { distributive: false }>, true>(true)
	testType.equal<IsNotTrue<boolean | 1, { distributive: false }>, true>(true)
})

it('returns distribute over intersection type', () => {
	testType.equal<IsNotTrue<true & { a: 1 }>, false>(true)
	testType.equal<IsNotTrue<false & { a: 1 }>, true>(true)
	testType.equal<IsNotTrue<boolean & { a: 1 }>, boolean>(true)

	testType.equal<IsNotTrue<true & { a: 1 }, { distributive: false }>, false>(true)
	testType.equal<IsNotTrue<(true | 1) & { a: 1 }, { distributive: false }>, true>(true)
	testType.equal<IsNotTrue<false & { a: 1 }, { distributive: false }>, true>(true)
	testType.equal<IsNotTrue<boolean & { a: 1 }, { distributive: false }>, true>(true)
})

it('works as filter', () => {
	testType.equal<IsNotTrue<boolean, { selection: 'filter' }>, false>(true)
	testType.equal<IsNotTrue<true, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotTrue<false, { selection: 'filter' }>, false>(true)

	testType.equal<IsNotTrue<number, { selection: 'filter' }>, number>(true)
	testType.equal<IsNotTrue<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotTrue<unknown, { selection: 'filter' }>, unknown>(true)
	testType.equal<IsNotTrue<string | boolean, { selection: 'filter' }>, string | false>(true)
	testType.equal<IsNotTrue<string | boolean, { selection: 'filter', distributive: false }>, string | boolean>(true)

	testType.equal<IsNotTrue<string | true, { selection: 'filter' }>, string>(true)
})

it('works with unique branches', () => {
	testType.equal<IsNotTrue<true, IsNotTrue.$Branch>, $Else>(true)
	testType.equal<IsNotTrue<false, IsNotTrue.$Branch>, $Then>(true)
	testType.equal<IsNotTrue<boolean, IsNotTrue.$Branch>, $Then | $Else>(true)

	testType.equal<IsNotTrue<any, IsNotTrue.$Branch>, $Then>(true)
	testType.equal<IsNotTrue<unknown, IsNotTrue.$Branch>, $Then>(true)
	testType.equal<IsNotTrue<never, IsNotTrue.$Branch>, $Then>(true)
	testType.equal<IsNotTrue<void, IsNotTrue.$Branch>, $Then>(true)
})

it('can override $any branch', () => {
	testType.equal<IsNotTrue<any>, true>(true)
	testType.equal<IsNotTrue<any, { $any: unknown }>, unknown>(true)
})

it('can override $unknown branch', () => {
	testType.equal<IsNotTrue<unknown>, true>(true)
	testType.equal<IsNotTrue<unknown, { $unknown: unknown }>, unknown>(true)
})

it('can override $never branch', () => {
	testType.equal<IsNotTrue<never>, true>(true)
	testType.equal<IsNotTrue<never, { $never: unknown }>, unknown>(true)
})
