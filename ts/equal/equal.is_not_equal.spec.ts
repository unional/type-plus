import type { IsNotEqual, Head, IsEqual, ValueOf } from '../index.js'
import { type } from '../index.js'

it('returns true when comparing primitive types with itself', () => {
	type.false<IsNotEqual<boolean, boolean>>(true)
	type.false<IsNotEqual<boolean, boolean>>(true)
	type.false<IsNotEqual<number, number>>(true)
	type.false<IsNotEqual<string, string>>(true)
	type.false<IsNotEqual<symbol, symbol>>(true)
	type.false<IsNotEqual<bigint, bigint>>(true)
	type.false<IsNotEqual<Function, Function>>(true)
	type.false<IsNotEqual<undefined, undefined>>(true)
	type.false<IsNotEqual<null, null>>(true)
	type.false<IsNotEqual<object, object>>(true)
})

it('returns false when comparing primitive types against each other', () => {
	type.true<IsNotEqual<boolean, number>>(true)
	type.true<IsNotEqual<boolean, string>>(true)
	type.true<IsNotEqual<boolean, symbol>>(true)
	type.true<IsNotEqual<boolean, bigint>>(true)
	type.true<IsNotEqual<boolean, Function>>(true)
	type.true<IsNotEqual<boolean, undefined>>(true)
	type.true<IsNotEqual<boolean, null>>(true)
	type.true<IsNotEqual<boolean, object>>(true)

	type.true<IsNotEqual<number, boolean>>(true)
	type.true<IsNotEqual<number, string>>(true)
	type.true<IsNotEqual<number, symbol>>(true)
	type.true<IsNotEqual<number, bigint>>(true)
	type.true<IsNotEqual<number, Function>>(true)
	type.true<IsNotEqual<number, undefined>>(true)
	type.true<IsNotEqual<number, null>>(true)
	type.true<IsNotEqual<number, object>>(true)

	type.true<IsNotEqual<string, boolean>>(true)
	type.true<IsNotEqual<string, number>>(true)
	type.true<IsNotEqual<string, symbol>>(true)
	type.true<IsNotEqual<string, bigint>>(true)
	type.true<IsNotEqual<string, Function>>(true)
	type.true<IsNotEqual<string, undefined>>(true)
	type.true<IsNotEqual<string, null>>(true)
	type.true<IsNotEqual<string, object>>(true)

	type.true<IsNotEqual<symbol, boolean>>(true)
	type.true<IsNotEqual<symbol, number>>(true)
	type.true<IsNotEqual<symbol, string>>(true)
	type.true<IsNotEqual<symbol, bigint>>(true)
	type.true<IsNotEqual<symbol, Function>>(true)
	type.true<IsNotEqual<symbol, undefined>>(true)
	type.true<IsNotEqual<symbol, null>>(true)
	type.true<IsNotEqual<symbol, object>>(true)

	type.true<IsNotEqual<bigint, boolean>>(true)
	type.true<IsNotEqual<bigint, number>>(true)
	type.true<IsNotEqual<bigint, string>>(true)
	type.true<IsNotEqual<bigint, symbol>>(true)
	type.true<IsNotEqual<bigint, Function>>(true)
	type.true<IsNotEqual<bigint, undefined>>(true)
	type.true<IsNotEqual<bigint, null>>(true)
	type.true<IsNotEqual<bigint, object>>(true)

	type.true<IsNotEqual<Function, boolean>>(true)
	type.true<IsNotEqual<Function, number>>(true)
	type.true<IsNotEqual<Function, string>>(true)
	type.true<IsNotEqual<Function, symbol>>(true)
	type.true<IsNotEqual<Function, bigint>>(true)
	type.true<IsNotEqual<Function, undefined>>(true)
	type.true<IsNotEqual<Function, null>>(true)
	type.true<IsNotEqual<Function, object>>(true)

	type.true<IsNotEqual<undefined, boolean>>(true)
	type.true<IsNotEqual<undefined, number>>(true)
	type.true<IsNotEqual<undefined, string>>(true)
	type.true<IsNotEqual<undefined, symbol>>(true)
	type.true<IsNotEqual<undefined, bigint>>(true)
	type.true<IsNotEqual<undefined, Function>>(true)
	type.true<IsNotEqual<undefined, null>>(true)
	type.true<IsNotEqual<undefined, object>>(true)

	type.true<IsNotEqual<null, boolean>>(true)
	type.true<IsNotEqual<null, number>>(true)
	type.true<IsNotEqual<null, string>>(true)
	type.true<IsNotEqual<null, symbol>>(true)
	type.true<IsNotEqual<null, bigint>>(true)
	type.true<IsNotEqual<null, Function>>(true)
	type.true<IsNotEqual<null, undefined>>(true)
	type.true<IsNotEqual<null, object>>(true)

	type.true<IsNotEqual<object, boolean>>(true)
	type.true<IsNotEqual<object, number>>(true)
	type.true<IsNotEqual<object, string>>(true)
	type.true<IsNotEqual<object, symbol>>(true)
	type.true<IsNotEqual<object, bigint>>(true)
	type.true<IsNotEqual<object, Function>>(true)
	type.true<IsNotEqual<object, undefined>>(true)
	type.true<IsNotEqual<object, null>>(true)

	type.true<IsNotEqual<number, boolean>>(true)
	type.true<IsNotEqual<string, boolean>>(true)
	type.true<IsNotEqual<symbol, boolean>>(true)
	type.true<IsNotEqual<bigint, boolean>>(true)
	type.true<IsNotEqual<Function, boolean>>(true)
	type.true<IsNotEqual<undefined, boolean>>(true)
	type.true<IsNotEqual<null, boolean>>(true)
	type.true<IsNotEqual<object, boolean>>(true)

	type.true<IsNotEqual<boolean, number>>(true)
	type.true<IsNotEqual<string, number>>(true)
	type.true<IsNotEqual<symbol, number>>(true)
	type.true<IsNotEqual<bigint, number>>(true)
	type.true<IsNotEqual<Function, number>>(true)
	type.true<IsNotEqual<undefined, number>>(true)
	type.true<IsNotEqual<null, number>>(true)
	type.true<IsNotEqual<object, number>>(true)

	type.true<IsNotEqual<boolean, string>>(true)
	type.true<IsNotEqual<number, string>>(true)
	type.true<IsNotEqual<symbol, string>>(true)
	type.true<IsNotEqual<bigint, string>>(true)
	type.true<IsNotEqual<Function, string>>(true)
	type.true<IsNotEqual<undefined, string>>(true)
	type.true<IsNotEqual<null, string>>(true)
	type.true<IsNotEqual<object, string>>(true)

	type.true<IsNotEqual<boolean, symbol>>(true)
	type.true<IsNotEqual<number, symbol>>(true)
	type.true<IsNotEqual<string, symbol>>(true)
	type.true<IsNotEqual<bigint, symbol>>(true)
	type.true<IsNotEqual<Function, symbol>>(true)
	type.true<IsNotEqual<undefined, symbol>>(true)
	type.true<IsNotEqual<null, symbol>>(true)
	type.true<IsNotEqual<object, symbol>>(true)

	type.true<IsNotEqual<boolean, bigint>>(true)
	type.true<IsNotEqual<number, bigint>>(true)
	type.true<IsNotEqual<string, bigint>>(true)
	type.true<IsNotEqual<symbol, bigint>>(true)
	type.true<IsNotEqual<Function, bigint>>(true)
	type.true<IsNotEqual<undefined, bigint>>(true)
	type.true<IsNotEqual<null, bigint>>(true)
	type.true<IsNotEqual<object, bigint>>(true)

	type.true<IsNotEqual<boolean, Function>>(true)
	type.true<IsNotEqual<number, Function>>(true)
	type.true<IsNotEqual<string, Function>>(true)
	type.true<IsNotEqual<symbol, Function>>(true)
	type.true<IsNotEqual<bigint, Function>>(true)
	type.true<IsNotEqual<undefined, Function>>(true)
	type.true<IsNotEqual<null, Function>>(true)
	type.true<IsNotEqual<object, Function>>(true)

	type.true<IsNotEqual<boolean, undefined>>(true)
	type.true<IsNotEqual<number, undefined>>(true)
	type.true<IsNotEqual<string, undefined>>(true)
	type.true<IsNotEqual<symbol, undefined>>(true)
	type.true<IsNotEqual<bigint, undefined>>(true)
	type.true<IsNotEqual<Function, undefined>>(true)
	type.true<IsNotEqual<null, undefined>>(true)
	type.true<IsNotEqual<object, undefined>>(true)

	type.true<IsNotEqual<boolean, null>>(true)
	type.true<IsNotEqual<number, null>>(true)
	type.true<IsNotEqual<string, null>>(true)
	type.true<IsNotEqual<symbol, null>>(true)
	type.true<IsNotEqual<bigint, null>>(true)
	type.true<IsNotEqual<Function, null>>(true)
	type.true<IsNotEqual<undefined, null>>(true)
	type.true<IsNotEqual<object, null>>(true)

	type.true<IsNotEqual<boolean, object>>(true)
	type.true<IsNotEqual<number, object>>(true)
	type.true<IsNotEqual<string, object>>(true)
	type.true<IsNotEqual<symbol, object>>(true)
	type.true<IsNotEqual<bigint, object>>(true)
	type.true<IsNotEqual<Function, object>>(true)
	type.true<IsNotEqual<undefined, object>>(true)
	type.true<IsNotEqual<null, object>>(true)
})

it('compares never', () => {
	type.false<IsNotEqual<never, never>>(true)
	type.true<IsNotEqual<never, 1>>(true)
	type.true<IsNotEqual<1, never>>(true)

	type.true<IsNotEqual<undefined, never>>(true)
	type.true<IsNotEqual<never, undefined>>(true)
	type.true<IsNotEqual<never, IsNotEqual<never, ValueOf<string>>>>(true)
	type.true<IsNotEqual<never, IsEqual<never, ValueOf<string>>>>(true)
})

it('compares void', () => {
	type.false<IsNotEqual<void, void>>(true)
	type.true<IsNotEqual<void, 1>>(true)
	type.true<IsNotEqual<1, void>>(true)
})

it('compares unknown', () => {
	type.false<IsNotEqual<unknown, unknown>>(true)
	type.true<IsNotEqual<unknown, 1>>(true)
	type.true<IsNotEqual<1, unknown>>(true)
})

it('compares any', () => {
	type.false<IsNotEqual<any, any>>(true)
	type.true<IsNotEqual<any, 1>>(true)
	type.true<IsNotEqual<1, any>>(true)
})

it('compares any against never', () => {
	type.true<IsNotEqual<any, never>>(true)
	type.true<IsNotEqual<never, any>>(true)
})

it('compares boolean with literals', () => {
	type.false<IsNotEqual<true, true>>(true)
	type.false<IsNotEqual<false, false>>(true)
	type.false<IsNotEqual<boolean, boolean>>(true)

	type.true<IsNotEqual<true, false>>(true)
	type.true<IsNotEqual<false, true>>(true)
})

it('compares boolean literal with others', () => {
	type.true<IsNotEqual<true, undefined>>(true)
	type.true<IsNotEqual<true, null>>(true)
	type.true<IsNotEqual<true, number>>(true)
	type.true<IsNotEqual<true, string>>(true)
	type.true<IsNotEqual<true, symbol>>(true)
	type.true<IsNotEqual<true, object>>(true)
	type.true<IsNotEqual<true, Function>>(true)

	type.true<IsNotEqual<false, undefined>>(true)
	type.true<IsNotEqual<false, null>>(true)
	type.true<IsNotEqual<false, number>>(true)
	type.true<IsNotEqual<false, string>>(true)
	type.true<IsNotEqual<false, symbol>>(true)
	type.true<IsNotEqual<false, object>>(true)
	type.true<IsNotEqual<false, Function>>(true)
})

test('literal is not Notequal to widen type', () => {
	type.true<IsNotEqual<1, number>>(true)
	type.true<IsNotEqual<number, 1>>(true)

	type.true<IsNotEqual<'a', string>>(true)
	type.true<IsNotEqual<string, 'a'>>(true)
})

test('same object is true', () => {
	type.false<IsNotEqual<{ a: 1 }, { a: 1 }>>(true)
})

test('different object is false', () => {
	type.true<IsNotEqual<{ a: 1 }, { b: 1 }>>(true)
})

test('object with any', () => {
	type.true<IsNotEqual<{ a: any }, { a: 1 }>>(true)
	type.true<IsNotEqual<{ a: 1 }, { a: any }>>(true)
	type.false<IsNotEqual<{ a: any }, { a: any }>>(true)
})

test('A subset of B is false', () => {
	type.true<IsNotEqual<{ a: 1 }, { a: 1; b: 1 }>>(true)
})

test('B subset of A is false', () => {
	type.true<IsNotEqual<{ a: 1; b: 1 }, { a: 1 }>>(true)
})

test('disjoin is false', () => {
	type.true<IsNotEqual<{ b: 1 }, { a: 1 }>>(true)
})

test('overlap is false', () => {
	type.true<IsNotEqual<{ a: 1; b: 1 }, { a: 1; c: 2 }>>(true)
})

it('works against tuple', () => {
	type.false<IsNotEqual<[1], [1]>>(true)
	type.false<IsNotEqual<[1, 2], [1, 2]>>(true)
	type.false<IsNotEqual<[any], [any]>>(true)

	type.true<IsNotEqual<[any], [1]>>(true)
	type.true<IsNotEqual<1, [1]>>(true)
	type.true<IsNotEqual<[1], 1>>(true)
	type.true<IsNotEqual<[1, 2], [2, 1]>>(true)

	type.false<IsNotEqual<[never], [never]>>(true)
	type.false<IsNotEqual<[any], [any]>>(true)
	type.false<IsNotEqual<[unknown], [unknown]>>(true)

	type.true<IsNotEqual<[any], [never]>>(true)
	type.true<IsNotEqual<[any], [unknown]>>(true)
	type.true<IsNotEqual<[never], [any]>>(true)
	type.true<IsNotEqual<[never], [unknown]>>(true)
	type.true<IsNotEqual<[unknown], [any]>>(true)
	type.true<IsNotEqual<[unknown], [never]>>(true)

	type.true<IsNotEqual<[any, number], [number, any]>>(true)
})

it('works with union types containing undefined', () => {
	type.true<IsNotEqual<string | undefined, string | undefined | number>>(true)
})

it('works with union types containing symbol', () => {
	type.true<IsNotEqual<string | symbol, string | symbol | number>>(true)
})

it('works with union of functions', () => {
	type.false<
		IsNotEqual<
			((v: string) => string) | ((v: number) => number),
			((v: string) => string) | ((v: number) => number)
		>
	>(true)

	type.true<IsNotEqual<(v: string) => string, ((v: string) => string) | ((v: number) => number)>>(true)
	type.true<IsNotEqual<((v: string) => string) | ((v: number) => number), (v: string) => string>>(true)
})

it('works with intersect types', () => {
	type.false<IsNotEqual<{ a: number; b: string }, { a: number } & { b: string }>>(true)
	type.false<IsNotEqual<{ a: number } & { b: number }, { a: number; b: number }>>(true)
	type.false<IsNotEqual<{ a: number; b?: string }, { a: number } & { b?: string }>>(true)
	type.false<IsNotEqual<{ a: number } & { b?: string }, { a: number; b?: string }>>(true)

	type.true<IsNotEqual<1 | 2, 1>>(true)
	type.true<IsNotEqual<{ a: number } & { c: number }, { a: number; b: number }>>(true)
	type.true<IsNotEqual<{ a: number; b: number }, { a: number } & { c: number }>>(true)
})

it('works with function overload', () => {
	function foo(v: string): string
	function foo(v: number): number
	function foo(v: unknown) {
		return v
	}
	type F = typeof foo

	type.false<IsNotEqual<F, { (v: string): string; (v: number): number }>>(true)
	type.true<IsNotEqual<F, { (v: string): string; (v: number): string }>>(true)

	type.true<IsNotEqual<F, { (v: number): number }>>(true)
	type.true<IsNotEqual<F, { (v: string): number }>>(true)

	type.true<IsNotEqual<(x: 0, y: null) => void, (x: number, y: string) => void>>(true)
	type.false<
		IsNotEqual<
			((x: 0, y: null) => void) & ((x: number, y: string) => void),
			((x: number, y: string) => void) & ((x: 0, y: null) => void)
		>
	>(true)
})

it('works with complex cases', () => {
	type.false<IsNotEqual<1 | (number & {}), number>>(true)

	type.true<IsNotEqual<void, null>>(true)
	type.true<IsNotEqual<undefined, null>>(true)
	type.true<IsNotEqual<() => void, () => undefined>>(true)

	type A = (() => 'foo') & (() => true)
	type B = (() => true) & (() => 'foo')

	type.false<IsNotEqual<A, B>>(true)
	type.false<IsNotEqual<A | B, B>>(true)

	type.false<IsNotEqual<Head<[1, 2, 3]>, 1>>(true)
})

it('works with complext cases 2', () => {
	type A = () => 'foo'
	type B = () => 'foo'

	type.false<IsNotEqual<A, B>>(true)
	type.false<IsNotEqual<A | B, B>>(true)
})

it('works with intersect of the same type', () => {
	type P = { c: 1 } | { c: 1 }

	type.false<IsNotEqual<P, { c: 1 }>>(true)
	type.false<IsNotEqual<P, { c: 1 } | { c: 1 }>>(true)
	type.false<IsNotEqual<P, { c: 1 } | { c: 1 } | { c: 1 }>>(true)
})

it('detect redonly', () => {
	type.true<IsNotEqual<{ a: 1 }, { readonly a: 1 }>>(true)
})

it('works with deep any', () => {
	type.false<
		IsNotEqual<
			{ a: { a: any; n: never; u: unknown; v: void } },
			{ a: { a: any; n: never; u: unknown; v: void } }
		>
	>(true)

	type.true<
		IsNotEqual<{ a: { a: any; n: never; u: unknown; v: void } }, { a: { a: 1; n: never; u: unknown; v: void } }>
	>(true)

	type.true<
		IsNotEqual<{ a: { a: any; n: never; u: unknown; v: void } }, { a: { a: any; n: 2; u: unknown; v: void } }>
	>(true)
	type.true<
		IsNotEqual<{ a: { a: any; n: never; u: unknown; v: void } }, { a: { a: any; n: never; u: 3; v: void } }>
	>(true)
	type.true<
		IsNotEqual<{ a: { a: any; n: never; u: unknown; v: void } }, { a: { a: any; n: never; u: unknown; v: 4 } }>
	>(true)
})

it('can override Then/Else', () => {
	type.equal<IsNotEqual<any, any, 1, 2>, 2>(true)
	type.equal<IsNotEqual<unknown, unknown, 1, 2>, 2>(true)
	type.equal<IsNotEqual<never, never, 1, 2>, 2>(true)
	type.equal<IsNotEqual<void, void, 1, 2>, 2>(true)

	type.equal<IsNotEqual<any, undefined, 1, 2>, 1>(true)
	type.equal<IsNotEqual<unknown, undefined, 1, 2>, 1>(true)
	type.equal<IsNotEqual<never, undefined, 1, 2>, 1>(true)
	type.equal<IsNotEqual<void, undefined, 1, 2>, 1>(true)

	type.equal<IsNotEqual<undefined, any, 1, 2>, 1>(true)
	type.equal<IsNotEqual<undefined, unknown, 1, 2>, 1>(true)
	type.equal<IsNotEqual<undefined, never, 1, 2>, 1>(true)
	type.equal<IsNotEqual<undefined, void, 1, 2>, 1>(true)
})
