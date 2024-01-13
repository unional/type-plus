import { describe, it } from '@jest/globals'

import { testType, type $Else, type $Then, type IsBoolean } from '../index.js'

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
	testType.equal<IsBoolean<boolean & { a: 1 }, { distributive: false }>, true>(true)

	testType.equal<IsBoolean<true & { a: 1 }>, true>(true)
	testType.equal<IsBoolean<true & { a: 1 }, { distributive: false }>, true>(true)

	testType.equal<IsBoolean<false & { a: 1 }>, true>(true)
	testType.equal<IsBoolean<false & { a: 1 }, { distributive: false }>, true>(true)
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

describe('exact mode', () => {
	it('returns true if T is boolean', () => {
		testType.equal<IsBoolean<boolean, { exact: true }>, true>(true)
	})

	it('returns false it T is true or false literal', () => {
		testType.equal<IsBoolean<true, { exact: true }>, false>(true)
		testType.equal<IsBoolean<false, { exact: true }>, false>(true)
	})

	it('returns false for special types', () => {
		testType.equal<IsBoolean<void, { exact: true }>, false>(true)
		testType.equal<IsBoolean<unknown, { exact: true }>, false>(true)
		testType.equal<IsBoolean<any, { exact: true }>, false>(true)
		testType.equal<IsBoolean<never, { exact: true }>, false>(true)
	})

	it('returns false for other types', () => {
		testType.equal<IsBoolean<undefined, { exact: true }>, false>(true)
		testType.equal<IsBoolean<null, { exact: true }>, false>(true)
		testType.equal<IsBoolean<number, { exact: true }>, false>(true)
		testType.equal<IsBoolean<1, { exact: true }>, false>(true)
		testType.equal<IsBoolean<string, { exact: true }>, false>(true)
		testType.equal<IsBoolean<'', { exact: true }>, false>(true)
		testType.equal<IsBoolean<symbol, { exact: true }>, false>(true)
		testType.equal<IsBoolean<bigint, { exact: true }>, false>(true)
		testType.equal<IsBoolean<1n, { exact: true }>, false>(true)
		testType.equal<IsBoolean<{}, { exact: true }>, false>(true)
		testType.equal<IsBoolean<{ a: 1 }, { exact: true }>, false>(true)
		testType.equal<IsBoolean<string[], { exact: true }>, false>(true)
		testType.equal<IsBoolean<[], { exact: true }>, false>(true)
		testType.equal<IsBoolean<Function, { exact: true }>, false>(true)
		testType.equal<IsBoolean<() => void, { exact: true }>, false>(true)
	})

	it('distributes over union type', () => {
		testType.equal<IsBoolean<boolean | 1, { exact: true }>, boolean>(true)
	})

	it('can disable union distribution', () => {
		testType.equal<IsBoolean<boolean | 1, { exact: true }>, boolean>(true)
		testType.equal<IsBoolean<boolean | 1, { distributive: false, exact: true }>, false>(true)

		testType.equal<IsBoolean<true | string, { exact: true }>, false>(true)
		testType.equal<IsBoolean<true | string, { distributive: false, exact: true }>, false>(true)

		testType.equal<IsBoolean<false | string, { exact: true }>, false>(true)
		testType.equal<IsBoolean<false | string, { distributive: false, exact: true }>, false>(true)
	})

	it('returns true for intersection type', () => {
		testType.equal<IsBoolean<number & { a: 1 }, { exact: true }>, false>(true)
		testType.equal<IsBoolean<number & { a: 1 }, { distributive: false, exact: true }>, false>(true)

		testType.equal<IsBoolean<boolean & { a: 1 }, { exact: true }>, true>(true)
		testType.equal<IsBoolean<boolean & { a: 1 }, { distributive: false, exact: true }>, true>(true)

		testType.equal<IsBoolean<true & { a: 1 }, { exact: true }>, false>(true)
		testType.equal<IsBoolean<true & { a: 1 }, { distributive: false, exact: true }>, false>(true)

		testType.equal<IsBoolean<false & { a: 1 }, { exact: true }>, false>(true)
		testType.equal<IsBoolean<false & { a: 1 }, { distributive: false, exact: true }>, false>(true)
	})

	it('works as filter', () => {
		testType.equal<IsBoolean<boolean, { selection: 'filter', exact: true }>, boolean>(true)
		testType.equal<IsBoolean<true, { selection: 'filter', exact: true }>, never>(true)

		testType.equal<IsBoolean<never, { selection: 'filter', exact: true }>, never>(true)
		testType.equal<IsBoolean<unknown, { selection: 'filter', exact: true }>, never>(true)
		testType.equal<IsBoolean<string | boolean, { selection: 'filter', exact: true }>, boolean>(true)
		testType.equal<IsBoolean<string | boolean, { selection: 'filter', exact: true, distributive: false }>, never>(true)

		testType.equal<IsBoolean<string | true, { selection: 'filter', exact: true }>, never>(true)
	})

	it('works with unique branches', () => {
		testType.equal<IsBoolean<boolean, IsBoolean.$Branch<{ exact: true }>>, $Then>(true)
		testType.equal<IsBoolean<true, IsBoolean.$Branch<{ exact: true }>>, $Else>(true)
		testType.equal<IsBoolean<false, IsBoolean.$Branch<{ exact: true }>>, $Else>(true)

		testType.equal<IsBoolean<any, IsBoolean.$Branch<{ exact: true }>>, $Else>(true)
		testType.equal<IsBoolean<unknown, IsBoolean.$Branch<{ exact: true }>>, $Else>(true)
		testType.equal<IsBoolean<never, IsBoolean.$Branch<{ exact: true }>>, $Else>(true)
		testType.equal<IsBoolean<void, IsBoolean.$Branch<{ exact: true }>>, $Else>(true)
	})

	it('can override $any branch', () => {
		testType.equal<IsBoolean<any, { exact: true }>, false>(true)
		testType.equal<IsBoolean<any, { $any: unknown, exact: true }>, unknown>(true)
	})

	it('can override $unknown branch', () => {
		testType.equal<IsBoolean<unknown, { exact: true }>, false>(true)
		testType.equal<IsBoolean<unknown, { $unknown: unknown, exact: true }>, unknown>(true)
	})

	it('can override $never branch', () => {
		testType.equal<IsBoolean<never, { exact: true }>, false>(true)
		testType.equal<IsBoolean<never, { $never: unknown, exact: true }>, unknown>(true)
	})
})
