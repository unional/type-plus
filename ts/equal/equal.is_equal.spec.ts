import { it, test } from '@jest/globals'
import type { Head, IsEqual, IsNotEqual, ValueOf } from '../index.js'
import { testType } from '../index.js'

it('returns true when comparing primitive types with itself', () => {
	testType.true<IsEqual<boolean, boolean>>(true)
	testType.true<IsEqual<boolean, boolean>>(true)
	testType.true<IsEqual<number, number>>(true)
	testType.true<IsEqual<string, string>>(true)
	testType.true<IsEqual<symbol, symbol>>(true)
	testType.true<IsEqual<bigint, bigint>>(true)
	testType.true<IsEqual<Function, Function>>(true)
	testType.true<IsEqual<undefined, undefined>>(true)
	testType.true<IsEqual<null, null>>(true)
	testType.true<IsEqual<object, object>>(true)
})

it('returns false when comparing primitive types against each other', () => {
	testType.false<IsEqual<boolean, number>>(true)
	testType.false<IsEqual<boolean, string>>(true)
	testType.false<IsEqual<boolean, symbol>>(true)
	testType.false<IsEqual<boolean, bigint>>(true)
	testType.false<IsEqual<boolean, Function>>(true)
	testType.false<IsEqual<boolean, undefined>>(true)
	testType.false<IsEqual<boolean, null>>(true)
	testType.false<IsEqual<boolean, object>>(true)

	testType.false<IsEqual<number, boolean>>(true)
	testType.false<IsEqual<number, string>>(true)
	testType.false<IsEqual<number, symbol>>(true)
	testType.false<IsEqual<number, bigint>>(true)
	testType.false<IsEqual<number, Function>>(true)
	testType.false<IsEqual<number, undefined>>(true)
	testType.false<IsEqual<number, null>>(true)
	testType.false<IsEqual<number, object>>(true)

	testType.false<IsEqual<string, boolean>>(true)
	testType.false<IsEqual<string, number>>(true)
	testType.false<IsEqual<string, symbol>>(true)
	testType.false<IsEqual<string, bigint>>(true)
	testType.false<IsEqual<string, Function>>(true)
	testType.false<IsEqual<string, undefined>>(true)
	testType.false<IsEqual<string, null>>(true)
	testType.false<IsEqual<string, object>>(true)

	testType.false<IsEqual<symbol, boolean>>(true)
	testType.false<IsEqual<symbol, number>>(true)
	testType.false<IsEqual<symbol, string>>(true)
	testType.false<IsEqual<symbol, bigint>>(true)
	testType.false<IsEqual<symbol, Function>>(true)
	testType.false<IsEqual<symbol, undefined>>(true)
	testType.false<IsEqual<symbol, null>>(true)
	testType.false<IsEqual<symbol, object>>(true)

	testType.false<IsEqual<bigint, boolean>>(true)
	testType.false<IsEqual<bigint, number>>(true)
	testType.false<IsEqual<bigint, string>>(true)
	testType.false<IsEqual<bigint, symbol>>(true)
	testType.false<IsEqual<bigint, Function>>(true)
	testType.false<IsEqual<bigint, undefined>>(true)
	testType.false<IsEqual<bigint, null>>(true)
	testType.false<IsEqual<bigint, object>>(true)

	testType.false<IsEqual<Function, boolean>>(true)
	testType.false<IsEqual<Function, number>>(true)
	testType.false<IsEqual<Function, string>>(true)
	testType.false<IsEqual<Function, symbol>>(true)
	testType.false<IsEqual<Function, bigint>>(true)
	testType.false<IsEqual<Function, undefined>>(true)
	testType.false<IsEqual<Function, null>>(true)
	testType.false<IsEqual<Function, object>>(true)

	testType.false<IsEqual<undefined, boolean>>(true)
	testType.false<IsEqual<undefined, number>>(true)
	testType.false<IsEqual<undefined, string>>(true)
	testType.false<IsEqual<undefined, symbol>>(true)
	testType.false<IsEqual<undefined, bigint>>(true)
	testType.false<IsEqual<undefined, Function>>(true)
	testType.false<IsEqual<undefined, null>>(true)
	testType.false<IsEqual<undefined, object>>(true)

	testType.false<IsEqual<null, boolean>>(true)
	testType.false<IsEqual<null, number>>(true)
	testType.false<IsEqual<null, string>>(true)
	testType.false<IsEqual<null, symbol>>(true)
	testType.false<IsEqual<null, bigint>>(true)
	testType.false<IsEqual<null, Function>>(true)
	testType.false<IsEqual<null, undefined>>(true)
	testType.false<IsEqual<null, object>>(true)

	testType.false<IsEqual<object, boolean>>(true)
	testType.false<IsEqual<object, number>>(true)
	testType.false<IsEqual<object, string>>(true)
	testType.false<IsEqual<object, symbol>>(true)
	testType.false<IsEqual<object, bigint>>(true)
	testType.false<IsEqual<object, Function>>(true)
	testType.false<IsEqual<object, undefined>>(true)
	testType.false<IsEqual<object, null>>(true)

	testType.false<IsEqual<number, boolean>>(true)
	testType.false<IsEqual<string, boolean>>(true)
	testType.false<IsEqual<symbol, boolean>>(true)
	testType.false<IsEqual<bigint, boolean>>(true)
	testType.false<IsEqual<Function, boolean>>(true)
	testType.false<IsEqual<undefined, boolean>>(true)
	testType.false<IsEqual<null, boolean>>(true)
	testType.false<IsEqual<object, boolean>>(true)

	testType.false<IsEqual<boolean, number>>(true)
	testType.false<IsEqual<string, number>>(true)
	testType.false<IsEqual<symbol, number>>(true)
	testType.false<IsEqual<bigint, number>>(true)
	testType.false<IsEqual<Function, number>>(true)
	testType.false<IsEqual<undefined, number>>(true)
	testType.false<IsEqual<null, number>>(true)
	testType.false<IsEqual<object, number>>(true)

	testType.false<IsEqual<boolean, string>>(true)
	testType.false<IsEqual<number, string>>(true)
	testType.false<IsEqual<symbol, string>>(true)
	testType.false<IsEqual<bigint, string>>(true)
	testType.false<IsEqual<Function, string>>(true)
	testType.false<IsEqual<undefined, string>>(true)
	testType.false<IsEqual<null, string>>(true)
	testType.false<IsEqual<object, string>>(true)

	testType.false<IsEqual<boolean, symbol>>(true)
	testType.false<IsEqual<number, symbol>>(true)
	testType.false<IsEqual<string, symbol>>(true)
	testType.false<IsEqual<bigint, symbol>>(true)
	testType.false<IsEqual<Function, symbol>>(true)
	testType.false<IsEqual<undefined, symbol>>(true)
	testType.false<IsEqual<null, symbol>>(true)
	testType.false<IsEqual<object, symbol>>(true)

	testType.false<IsEqual<boolean, bigint>>(true)
	testType.false<IsEqual<number, bigint>>(true)
	testType.false<IsEqual<string, bigint>>(true)
	testType.false<IsEqual<symbol, bigint>>(true)
	testType.false<IsEqual<Function, bigint>>(true)
	testType.false<IsEqual<undefined, bigint>>(true)
	testType.false<IsEqual<null, bigint>>(true)
	testType.false<IsEqual<object, bigint>>(true)

	testType.false<IsEqual<boolean, Function>>(true)
	testType.false<IsEqual<number, Function>>(true)
	testType.false<IsEqual<string, Function>>(true)
	testType.false<IsEqual<symbol, Function>>(true)
	testType.false<IsEqual<bigint, Function>>(true)
	testType.false<IsEqual<undefined, Function>>(true)
	testType.false<IsEqual<null, Function>>(true)
	testType.false<IsEqual<object, Function>>(true)

	testType.false<IsEqual<boolean, undefined>>(true)
	testType.false<IsEqual<number, undefined>>(true)
	testType.false<IsEqual<string, undefined>>(true)
	testType.false<IsEqual<symbol, undefined>>(true)
	testType.false<IsEqual<bigint, undefined>>(true)
	testType.false<IsEqual<Function, undefined>>(true)
	testType.false<IsEqual<null, undefined>>(true)
	testType.false<IsEqual<object, undefined>>(true)

	testType.false<IsEqual<boolean, null>>(true)
	testType.false<IsEqual<number, null>>(true)
	testType.false<IsEqual<string, null>>(true)
	testType.false<IsEqual<symbol, null>>(true)
	testType.false<IsEqual<bigint, null>>(true)
	testType.false<IsEqual<Function, null>>(true)
	testType.false<IsEqual<undefined, null>>(true)
	testType.false<IsEqual<object, null>>(true)

	testType.false<IsEqual<boolean, object>>(true)
	testType.false<IsEqual<number, object>>(true)
	testType.false<IsEqual<string, object>>(true)
	testType.false<IsEqual<symbol, object>>(true)
	testType.false<IsEqual<bigint, object>>(true)
	testType.false<IsEqual<Function, object>>(true)
	testType.false<IsEqual<undefined, object>>(true)
	testType.false<IsEqual<null, object>>(true)
})

it('compares actual symbol', () => {
	const s = Symbol()
	testType.equal<typeof s, typeof s>(true)
	testType.equal<typeof s, symbol>(true)
})

it('compares never', () => {
	testType.true<IsEqual<never, never>>(true)
	testType.false<IsEqual<never, 1>>(true)
	testType.false<IsEqual<1, never>>(true)

	testType.false<IsEqual<undefined, never>>(true)
	testType.false<IsEqual<never, undefined>>(true)
	testType.false<IsEqual<never, IsNotEqual<never, ValueOf<string>>>>(true)
	testType.false<IsEqual<never, IsEqual<never, ValueOf<string>>>>(true)
})

it('compares void', () => {
	testType.true<IsEqual<void, void>>(true)
	testType.false<IsEqual<void, 1>>(true)
	testType.false<IsEqual<1, void>>(true)
})

it('compares unknown', () => {
	testType.true<IsEqual<unknown, unknown>>(true)
	testType.false<IsEqual<unknown, 1>>(true)
	testType.false<IsEqual<1, unknown>>(true)
})

it('compares any', () => {
	testType.true<IsEqual<any, any>>(true)
	testType.false<IsEqual<any, 1>>(true)
	testType.false<IsEqual<1, any>>(true)
})

it('compares any against never', () => {
	testType.false<IsEqual<any, never>>(true)
	testType.false<IsEqual<never, any>>(true)
})

it('compares boolean with literals', () => {
	testType.true<IsEqual<true, true>>(true)
	testType.true<IsEqual<false, false>>(true)
	testType.true<IsEqual<boolean, boolean>>(true)

	testType.false<IsEqual<true, false>>(true)
	testType.false<IsEqual<false, true>>(true)
})

it('compares boolean literal with others', () => {
	testType.false<IsEqual<true, undefined>>(true)
	testType.false<IsEqual<true, null>>(true)
	testType.false<IsEqual<true, number>>(true)
	testType.false<IsEqual<true, string>>(true)
	testType.false<IsEqual<true, symbol>>(true)
	testType.false<IsEqual<true, object>>(true)
	testType.false<IsEqual<true, Function>>(true)

	testType.false<IsEqual<false, undefined>>(true)
	testType.false<IsEqual<false, null>>(true)
	testType.false<IsEqual<false, number>>(true)
	testType.false<IsEqual<false, string>>(true)
	testType.false<IsEqual<false, symbol>>(true)
	testType.false<IsEqual<false, object>>(true)
	testType.false<IsEqual<false, Function>>(true)
})

test('literal is not equal to widen type', () => {
	testType.false<IsEqual<1, number>>(true)
	testType.false<IsEqual<number, 1>>(true)

	testType.false<IsEqual<'a', string>>(true)
	testType.false<IsEqual<string, 'a'>>(true)
})

test('same object is true', () => {
	testType.true<IsEqual<{ a: 1 }, { a: 1 }>>(true)
})

test('different object is false', () => {
	testType.false<IsEqual<{ a: 1 }, { b: 1 }>>(true)
})

test('object with any', () => {
	testType.false<IsEqual<{ a: any }, { a: 1 }>>(true)
	testType.false<IsEqual<{ a: 1 }, { a: any }>>(true)
	testType.true<IsEqual<{ a: any }, { a: any }>>(true)
})

test('A subset of B is false', () => {
	testType.false<IsEqual<{ a: 1 }, { a: 1; b: 1 }>>(true)
})

test('B subset of A is false', () => {
	testType.false<IsEqual<{ a: 1; b: 1 }, { a: 1 }>>(true)
})

test('disjoin is false', () => {
	testType.false<IsEqual<{ b: 1 }, { a: 1 }>>(true)
})

test('overlap is false', () => {
	testType.false<IsEqual<{ a: 1; b: 1 }, { a: 1; c: 2 }>>(true)
})

it('works against tuple', () => {
	testType.true<IsEqual<[1], [1]>>(true)
	testType.true<IsEqual<[1, 2], [1, 2]>>(true)
	testType.true<IsEqual<[any], [any]>>(true)

	testType.false<IsEqual<[any], [1]>>(true)
	testType.false<IsEqual<1, [1]>>(true)
	testType.false<IsEqual<[1], 1>>(true)
	testType.false<IsEqual<[1, 2], [2, 1]>>(true)

	testType.true<IsEqual<[never], [never]>>(true)
	testType.true<IsEqual<[any], [any]>>(true)
	testType.true<IsEqual<[unknown], [unknown]>>(true)
	testType.true<IsEqual<[void], [void]>>(true)

	testType.false<IsEqual<[any], [unknown]>>(true)
	testType.false<IsEqual<[any], [never]>>(true)
	testType.false<IsEqual<[any], [void]>>(true)
	testType.false<IsEqual<[never], [any]>>(true)
	testType.false<IsEqual<[never], [unknown]>>(true)
	testType.false<IsEqual<[never], [void]>>(true)
	testType.false<IsEqual<[unknown], [any]>>(true)
	testType.false<IsEqual<[unknown], [never]>>(true)
	testType.false<IsEqual<[unknown], [void]>>(true)
	testType.false<IsEqual<[void], [any]>>(true)
	testType.false<IsEqual<[void], [unknown]>>(true)
	testType.false<IsEqual<[void], [never]>>(true)

	testType.false<IsEqual<[any, number], [number, any]>>(true)
})

it('works with union types containing undefined', () => {
	testType.false<IsEqual<string | undefined, string | undefined | number>>(true)
})

it('works with union types containing symbol', () => {
	testType.false<IsEqual<1 | 2, 1>>(true)
	testType.false<IsEqual<string | symbol, string | symbol | number>>(true)
})

it('works with union of functions', () => {
	testType.true<
		IsEqual<
			((v: string) => string) | ((v: number) => number),
			((v: string) => string) | ((v: number) => number)
		>
	>(true)

	testType.false<IsEqual<(v: string) => string, ((v: string) => string) | ((v: number) => number)>>(true)
	testType.false<IsEqual<((v: string) => string) | ((v: number) => number), (v: string) => string>>(true)
})

it('detects literal and widen type are different', () => {
	testType.false<IsEqual<1, number>>(true)
	testType.false<IsEqual<number, 1>>(true)
	testType.false<IsEqual<1 & { a: 1 }, number & { a: 1 }>>(true)
	testType.false<IsEqual<bigint & { a: 1 }, 1n & { a: 1 }>>(true)

	testType.true<IsEqual<1 & { a: 1 }, 1 & { a: 1 }>>(true)
})

it('works with intersect types', () => {
	testType.true<IsEqual<{ a: number; b: string }, { a: number } & { b: string }>>(true)
	testType.true<IsEqual<{ a: number } & { b: number }, { a: number; b: number }>>(true)
	testType.true<IsEqual<{ a: number; b?: string }, { a: number } & { b?: string }>>(true)
	testType.true<IsEqual<{ a: number } & { b?: string }, { a: number; b?: string }>>(true)

	testType.false<IsEqual<{ a: number } & { c: number }, { a: number; b: number }>>(true)
	testType.false<IsEqual<{ a: number; b: number }, { a: number } & { c: number }>>(true)

	// @ts-expect-error: Known limitation: nested intersection type properties don't work.
	testType.true<IsEqual<{nested: { a: number; b: string }}, {nested: { a: number } & { b: string }}>>(true)
})

it('works with function overload', () => {
	function foo(v: string): string
	function foo(v: number): number
	function foo(v: unknown) {
		return v
	}
	type F = typeof foo

	testType.true<IsEqual<F, { (v: string): string; (v: number): number }>>(true)
	testType.false<IsEqual<F, { (v: string): string; (v: number): string }>>(true)

	testType.false<IsEqual<F, { (v: number): number }>>(true)
	testType.false<IsEqual<F, { (v: string): number }>>(true)

	testType.false<IsEqual<(x: 0, y: null) => void, (x: number, y: string) => void>>(true)
	testType.true<
		IsEqual<
			((x: 0, y: null) => void) & ((x: number, y: string) => void),
			((x: number, y: string) => void) & ((x: 0, y: null) => void)
		>
	>(true)
})

it('works with complex cases', () => {
	testType.true<IsEqual<1 | (number & {}), number>>(true)

	testType.false<IsEqual<void, null>>(true)
	testType.false<IsEqual<undefined, null>>(true)
	testType.false<IsEqual<() => void, () => undefined>>(true)

	type A = (() => 'foo') & (() => true)
	type B = (() => true) & (() => 'foo')

	testType.true<IsEqual<A, B>>(true)
	testType.true<IsEqual<A | B, B>>(true)

	testType.true<IsEqual<Head<[1, 2, 3]>, 1>>(true)
})

it('works with complex cases 2', () => {
	type A = () => 'foo'
	type B = () => 'foo'

	testType.true<IsEqual<A, B>>(true)
	testType.true<IsEqual<A | B, B>>(true)
})

it('works with intersect of the same type', () => {
	type P = { c: 1 } | { c: 1 }

	testType.true<IsEqual<P, { c: 1 }>>(true)
	testType.true<IsEqual<P, { c: 1 } | { c: 1 }>>(true)
	testType.true<IsEqual<P, { c: 1 } | { c: 1 } | { c: 1 }>>(true)
})

it('detect redonly', () => {
	testType.false<IsEqual<{ a: 1 }, { readonly a: 1 }>>(true)
})

it('works with deep any', () => {
	testType.true<
		IsEqual<{ a: { a: any; n: never; u: unknown; v: void } }, { a: { a: any; n: never; u: unknown; v: void } }>
	>(true)

	testType.false<
		IsEqual<{ a: { a: any; n: never; u: unknown; v: void } }, { a: { a: 1; n: never; u: unknown; v: void } }>
	>(true)

	testType.false<
		IsEqual<{ a: { a: any; n: never; u: unknown; v: void } }, { a: { a: any; n: 2; u: unknown; v: void } }>
	>(true)
	testType.false<
		IsEqual<{ a: { a: any; n: never; u: unknown; v: void } }, { a: { a: any; n: never; u: 3; v: void } }>
	>(true)
	testType.false<
		IsEqual<{ a: { a: any; n: never; u: unknown; v: void } }, { a: { a: any; n: never; u: unknown; v: 4 } }>
	>(true)
})

it('can override Then/Else', () => {
	testType.equal<IsEqual<any, any, 1, 2>, 1>(true)
	testType.equal<IsEqual<unknown, unknown, 1, 2>, 1>(true)
	testType.equal<IsEqual<never, never, 1, 2>, 1>(true)
	testType.equal<IsEqual<void, void, 1, 2>, 1>(true)

	testType.equal<IsEqual<any, undefined, 1, 2>, 2>(true)
	testType.equal<IsEqual<unknown, undefined, 1, 2>, 2>(true)
	testType.equal<IsEqual<never, undefined, 1, 2>, 2>(true)
	testType.equal<IsEqual<void, undefined, 1, 2>, 2>(true)

	testType.equal<IsEqual<undefined, any, 1, 2>, 2>(true)
	testType.equal<IsEqual<undefined, unknown, 1, 2>, 2>(true)
	testType.equal<IsEqual<undefined, never, 1, 2>, 2>(true)
	testType.equal<IsEqual<undefined, void, 1, 2>, 2>(true)
})

it('can detect difference with optional param', () => {
	testType.false<IsEqual<() => void, (a?: number) => void>>(true)
})

it('can detect difference with union return value', () => {
	testType.false<IsEqual<() => number, () => number | undefined>>(true)
})
