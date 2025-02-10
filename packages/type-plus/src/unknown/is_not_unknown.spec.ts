import { it } from '@jest/globals'

import {
	type $Any,
	type $Else,
	type $Never,
	type $Selection,
	type $Then,
	type $Void,
	type IsNotUnknown,
	testType,
} from '../index.js'

// alternative implementation
// export type IsNotUnknown<
// 	T,
// 	$O extends IsNotUnknown.$Options = {}
// > =
// 	0 extends 1 & T
// 	? $ResolveBranch<$O, [$Any, $Then],T>
// 	: (
// 		[T, never] extends [never, T]
// 		? $ResolveBranch<$O, [$Never, $Then],T>
// 		: (
// 			[T, unknown] extends [unknown, T]
// 			? $ResolveBranch<$O, [$Else]>
// 			: $ResolveBranch<$O, [$Then], T>
// 		)
// 	)

it('returns false for unknown', () => {
	testType.false<IsNotUnknown<unknown>>(true)
})

it('returns true for other special types', () => {
	testType.true<IsNotUnknown<any>>(true)
	testType.true<IsNotUnknown<void>>(true)
	testType.true<IsNotUnknown<never>>(true)
})

it('returns true for other types', () => {
	testType.true<IsNotUnknown<null>>(true)
	testType.true<IsNotUnknown<number>>(true)
	testType.true<IsNotUnknown<boolean>>(true)
	testType.true<IsNotUnknown<true>>(true)
	testType.true<IsNotUnknown<false>>(true)
	testType.true<IsNotUnknown<string>>(true)
	testType.true<IsNotUnknown<''>>(true)
	testType.true<IsNotUnknown<symbol>>(true)
	testType.true<IsNotUnknown<bigint>>(true)
	testType.true<IsNotUnknown<{}>>(true)
	testType.true<IsNotUnknown<string[]>>(true)
	testType.true<IsNotUnknown<[]>>(true)
	testType.true<IsNotUnknown<Function>>(true)
	testType.true<IsNotUnknown<() => void>>(true)
})

it('returns false for union type as unknown | <others> => unknown', () => {
	testType.equal<unknown | 1, unknown>(true)
	testType.false<IsNotUnknown<unknown | 1>>(true)
})

it('returns true as unknown & any => any', () => {
	testType.equal<unknown & any, any>(true)
	testType.true<IsNotUnknown<unknown & any>>(true)
})

it('returns false as unknown & void => void', () => {
	testType.equal<unknown & void, void>(true)
	testType.true<IsNotUnknown<unknown & void>>(true)
})

it('returns true as unknown & never => never', () => {
	testType.equal<unknown & never, never>(true)
	testType.true<IsNotUnknown<unknown & never>>(true)
})

it('returns true for intersection type', () => {
	testType.equal<unknown & { a: 1 }, { a: 1 }>(true)
	testType.true<IsNotUnknown<unknown & { a: 1 }>>(true)
})

it('returns true as unknown & <others> => <others>', () => {
	testType.true<IsNotUnknown<unknown & null>>(true)
	testType.true<IsNotUnknown<unknown & number>>(true)
	testType.true<IsNotUnknown<unknown & 1>>(true)
	testType.true<IsNotUnknown<unknown & boolean>>(true)
	testType.true<IsNotUnknown<unknown & true>>(true)
	testType.true<IsNotUnknown<unknown & false>>(true)
	testType.true<IsNotUnknown<unknown & string>>(true)
	testType.true<IsNotUnknown<unknown & ''>>(true)
	testType.true<IsNotUnknown<unknown & symbol>>(true)
	testType.true<IsNotUnknown<unknown & bigint>>(true)
	testType.true<IsNotUnknown<unknown & 1n>>(true)
	testType.true<IsNotUnknown<unknown & {}>>(true)
	testType.true<IsNotUnknown<unknown & { a: 1 }>>(true)
	testType.true<IsNotUnknown<unknown & string[]>>(true)
	testType.true<IsNotUnknown<unknown & []>>(true)
	testType.true<IsNotUnknown<unknown & Function>>(true)
	testType.true<IsNotUnknown<unknown & (() => void)>>(true)
})

it('works as filter', () => {
	testType.equal<IsNotUnknown<unknown, { selection: 'filter' }>, never>(true)

	testType.equal<IsNotUnknown<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotUnknown<undefined, { selection: 'filter' }>, undefined>(true)
	testType.equal<IsNotUnknown<string | boolean, { selection: 'filter' }>, string | boolean>(true)

	testType.equal<IsNotUnknown<string | unknown, { selection: 'filter' }>, never>(true)
})

it('works with unique branches', () => {
	testType.equal<IsNotUnknown<unknown, $Selection.Branch>, $Else>(true)
	testType.equal<IsNotUnknown<number, $Selection.Branch>, $Then>(true)

	testType.equal<IsNotUnknown<any, $Selection.Branch>, $Then>(true)
	testType.equal<IsNotUnknown<any, IsNotUnknown.Branch>, $Any>(true)

	testType.equal<IsNotUnknown<never, $Selection.Branch>, $Then>(true)
	testType.equal<IsNotUnknown<never, IsNotUnknown.Branch>, $Never>(true)

	testType.equal<IsNotUnknown<void, $Selection.Branch>, $Then>(true)
	testType.equal<IsNotUnknown<void, IsNotUnknown.Branch>, $Void>(true)
})

it('can override $never branch', () => {
	testType.equal<IsNotUnknown<never>, true>(true)
	testType.equal<IsNotUnknown<never, { $never: unknown }>, unknown>(true)
})

it('can override $any branch', () => {
	testType.equal<IsNotUnknown<any>, true>(true)
	testType.equal<IsNotUnknown<any, { $any: unknown }>, unknown>(true)
})

it('can override $void branch', () => {
	testType.equal<IsNotUnknown<void>, true>(true)
	testType.equal<IsNotUnknown<void, { $void: unknown }>, unknown>(true)
})
