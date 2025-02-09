import { describe, it } from '@jest/globals'

import {
	type $Any,
	type $Else,
	type $Never,
	type $Selection,
	type $Then,
	type $Unknown,
	type IsVoid,
	testType,
} from '../index.js'

it('returns true for void', () => {
	testType.true<IsVoid<void>>(true)
})

it('returns false for other special types', () => {
	testType.false<IsVoid<any>>(true)
	testType.false<IsVoid<unknown>>(true)
	testType.false<IsVoid<never>>(true)
})

it('returns false for singular types', () => {
	testType.false<IsVoid<undefined>>(true)
	testType.false<IsVoid<null>>(true)
	testType.false<IsVoid<number>>(true)
	testType.false<IsVoid<1>>(true)
	testType.false<IsVoid<boolean>>(true)
	testType.false<IsVoid<true>>(true)
	testType.false<IsVoid<false>>(true)
	testType.false<IsVoid<string>>(true)
	testType.false<IsVoid<''>>(true)
	testType.false<IsVoid<symbol>>(true)
	testType.false<IsVoid<bigint>>(true)
	testType.false<IsVoid<1n>>(true)
	testType.false<IsVoid<{}>>(true)
	testType.false<IsVoid<string[]>>(true)
	testType.false<IsVoid<[]>>(true)
	testType.false<IsVoid<Function>>(true)
	testType.false<IsVoid<() => void>>(true)
})

it('distributes for union type', () => {
	testType.equal<IsVoid<void | 1>, true | false>(true)
	testType.equal<IsVoid<undefined | 1>, false>(true)
	testType.equal<IsVoid<undefined>, false>(true)
})

it('can disable distributive', () => {
	testType.false<IsVoid<void | 1, { distributive: false }>>(true)
})

it('returns true for intersection type', () => {
	testType.true<IsVoid<void & { a: 1 }>>(true)
})

it('works as filter', () => {
	testType.equal<IsVoid<void, { selection: 'filter' }>, void>(true)

	testType.equal<IsVoid<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsVoid<unknown, { selection: 'filter' }>, never>(true)
	testType.equal<IsVoid<string | boolean, { selection: 'filter' }>, never>(true)
	testType.equal<IsVoid<string | void, { selection: 'filter' }>, void>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsVoid<void | 1>, boolean>(true)
	testType.equal<IsVoid<void | 1, { distributive: false }>, false>(true)
	testType.equal<IsVoid<undefined | 1, { distributive: false }>, false>(true)
})

it('works with unique branches', () => {
	testType.equal<IsVoid<void, $Selection.Branch>, $Then>(true)
	testType.equal<IsVoid<undefined, $Selection.Branch>, $Else>(true)

	testType.equal<IsVoid<any, $Selection.Branch>, $Else>(true)
	testType.equal<IsVoid<any, IsVoid.Branch>, $Any>(true)
	testType.equal<IsVoid<unknown, $Selection.Branch>, $Else>(true)
	testType.equal<IsVoid<unknown, IsVoid.Branch>, $Unknown>(true)
	testType.equal<IsVoid<never, $Selection.Branch>, $Else>(true)
	testType.equal<IsVoid<never, IsVoid.Branch>, $Never>(true)
	testType.equal<IsVoid<undefined, $Selection.Branch>, $Else>(true)

	testType.equal<IsVoid<undefined, IsVoid.Branch>, $Else>(true)
	testType.equal<IsVoid<1, IsVoid.Branch>, $Else>(true)
	testType.equal<IsVoid<undefined | 1, $Selection.Branch>, $Else>(true)
	testType.equal<IsVoid<null | 1, $Selection.Branch>, $Else>(true)
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

describe('IsVoid.$', () => {
	it('basic tests', () => {
		testType.equal<IsVoid.$<void>, true>(true)
		testType.equal<IsVoid.$<undefined>, false>(true)
	})
})
