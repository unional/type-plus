import { it } from '@jest/globals'

import { type $Else, type $Then, type IsVoid, testType } from '../index.js'

it('returns true for void', () => {
	testType.equal<IsVoid<void>, true>(true)
})

it('returns false for other special types', () => {
	testType.equal<IsVoid<any>, false>(true)
	testType.equal<IsVoid<unknown>, false>(true)
	testType.equal<IsVoid<never>, false>(true)
})

it('returns false for singular types', () => {
	testType.equal<IsVoid<undefined>, false>(true)
	testType.equal<IsVoid<null>, false>(true)
	testType.equal<IsVoid<number>, false>(true)
	testType.equal<IsVoid<1>, false>(true)
	testType.equal<IsVoid<boolean>, false>(true)
	testType.equal<IsVoid<true>, false>(true)
	testType.equal<IsVoid<false>, false>(true)
	testType.equal<IsVoid<string>, false>(true)
	testType.equal<IsVoid<''>, false>(true)
	testType.equal<IsVoid<symbol>, false>(true)
	testType.equal<IsVoid<bigint>, false>(true)
	testType.equal<IsVoid<1n>, false>(true)
	testType.equal<IsVoid<{}>, false>(true)
	testType.equal<IsVoid<string[]>, false>(true)
	testType.equal<IsVoid<[]>, false>(true)
	testType.equal<IsVoid<Function>, false>(true)
	testType.equal<IsVoid<() => void>, false>(true)
})

it('distributes for union type', () => {
	testType.equal<IsVoid<void | 1>, true | false>(true)
})

it('can disable distributive', () => {
	testType.equal<IsVoid<void | 1, { distributive: false }>, false>(true)
})

it('returns true for intersection type', () => {
	testType.equal<IsVoid<void & { a: 1 }>, true>(true)
})

it('works as filter', () => {
	testType.equal<IsVoid<void, { selection: 'filter' }>, void>(true)

	testType.equal<IsVoid<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsVoid<unknown, { selection: 'filter' }>, never>(true)
	testType.equal<IsVoid<string | boolean, { selection: 'filter' }>, never>(true)

	testType.equal<never | void, void>(true)
	testType.equal<IsVoid<string | void, { selection: 'filter' }>, void>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsVoid<void | 1>, boolean>(true)
	testType.equal<IsVoid<void | 1, { distributive: false }>, false>(true)
	testType.equal<IsVoid<undefined | 1, { distributive: false }>, false>(true)
})

it('works with unique branches', () => {
	testType.equal<IsVoid<void, IsVoid.$Branch>, $Then>(true)
	testType.equal<IsVoid<undefined, IsVoid.$Branch>, $Else>(true)

	testType.equal<IsVoid<any, IsVoid.$Branch>, $Else>(true)
	testType.equal<IsVoid<unknown, IsVoid.$Branch>, $Else>(true)
	testType.equal<IsVoid<never, IsVoid.$Branch>, $Else>(true)
	testType.equal<IsVoid<undefined, IsVoid.$Branch>, $Else>(true)

	testType.equal<IsVoid<undefined | 1, IsVoid.$Branch>, $Then | $Else>(true)
})

it('can override $any branch', () => {
	testType.equal<IsVoid<any>, false>(true)
	testType.equal<IsVoid<any, { $any: unknown }>, unknown>(true)
})

it('can override $unknown branch', () => {
	testType.equal<IsVoid<unknown>, false>(true)
	testType.equal<IsVoid<unknown, { $unknown: unknown }>, unknown>(true)
})

it('can override $never branch', () => {
	testType.equal<IsVoid<never>, false>(true)
	testType.equal<IsVoid<never, { $never: unknown }>, unknown>(true)
})
