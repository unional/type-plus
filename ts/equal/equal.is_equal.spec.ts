import type { IsEqual, Head, IsNotEqual, ValueOf } from '../index.js'
import { type } from '../index.js'

it('returns true when comparing primitive types with itself', () => {
	type.true<IsEqual<boolean, boolean>>(true)
	type.true<IsEqual<boolean, boolean>>(true)
	type.true<IsEqual<number, number>>(true)
	type.true<IsEqual<string, string>>(true)
	type.true<IsEqual<symbol, symbol>>(true)
	type.true<IsEqual<bigint, bigint>>(true)
	type.true<IsEqual<Function, Function>>(true)
	type.true<IsEqual<undefined, undefined>>(true)
	type.true<IsEqual<null, null>>(true)
	type.true<IsEqual<object, object>>(true)
})

it('returns false when comparing primitive types against each other', () => {
	type.false<IsEqual<boolean, number>>(true)
	type.false<IsEqual<boolean, string>>(true)
	type.false<IsEqual<boolean, symbol>>(true)
	type.false<IsEqual<boolean, bigint>>(true)
	type.false<IsEqual<boolean, Function>>(true)
	type.false<IsEqual<boolean, undefined>>(true)
	type.false<IsEqual<boolean, null>>(true)
	type.false<IsEqual<boolean, object>>(true)

	type.false<IsEqual<number, boolean>>(true)
	type.false<IsEqual<number, string>>(true)
	type.false<IsEqual<number, symbol>>(true)
	type.false<IsEqual<number, bigint>>(true)
	type.false<IsEqual<number, Function>>(true)
	type.false<IsEqual<number, undefined>>(true)
	type.false<IsEqual<number, null>>(true)
	type.false<IsEqual<number, object>>(true)

	type.false<IsEqual<string, boolean>>(true)
	type.false<IsEqual<string, number>>(true)
	type.false<IsEqual<string, symbol>>(true)
	type.false<IsEqual<string, bigint>>(true)
	type.false<IsEqual<string, Function>>(true)
	type.false<IsEqual<string, undefined>>(true)
	type.false<IsEqual<string, null>>(true)
	type.false<IsEqual<string, object>>(true)

	type.false<IsEqual<symbol, boolean>>(true)
	type.false<IsEqual<symbol, number>>(true)
	type.false<IsEqual<symbol, string>>(true)
	type.false<IsEqual<symbol, bigint>>(true)
	type.false<IsEqual<symbol, Function>>(true)
	type.false<IsEqual<symbol, undefined>>(true)
	type.false<IsEqual<symbol, null>>(true)
	type.false<IsEqual<symbol, object>>(true)

	type.false<IsEqual<bigint, boolean>>(true)
	type.false<IsEqual<bigint, number>>(true)
	type.false<IsEqual<bigint, string>>(true)
	type.false<IsEqual<bigint, symbol>>(true)
	type.false<IsEqual<bigint, Function>>(true)
	type.false<IsEqual<bigint, undefined>>(true)
	type.false<IsEqual<bigint, null>>(true)
	type.false<IsEqual<bigint, object>>(true)

	type.false<IsEqual<Function, boolean>>(true)
	type.false<IsEqual<Function, number>>(true)
	type.false<IsEqual<Function, string>>(true)
	type.false<IsEqual<Function, symbol>>(true)
	type.false<IsEqual<Function, bigint>>(true)
	type.false<IsEqual<Function, undefined>>(true)
	type.false<IsEqual<Function, null>>(true)
	type.false<IsEqual<Function, object>>(true)

	type.false<IsEqual<undefined, boolean>>(true)
	type.false<IsEqual<undefined, number>>(true)
	type.false<IsEqual<undefined, string>>(true)
	type.false<IsEqual<undefined, symbol>>(true)
	type.false<IsEqual<undefined, bigint>>(true)
	type.false<IsEqual<undefined, Function>>(true)
	type.false<IsEqual<undefined, null>>(true)
	type.false<IsEqual<undefined, object>>(true)

	type.false<IsEqual<null, boolean>>(true)
	type.false<IsEqual<null, number>>(true)
	type.false<IsEqual<null, string>>(true)
	type.false<IsEqual<null, symbol>>(true)
	type.false<IsEqual<null, bigint>>(true)
	type.false<IsEqual<null, Function>>(true)
	type.false<IsEqual<null, undefined>>(true)
	type.false<IsEqual<null, object>>(true)

	type.false<IsEqual<object, boolean>>(true)
	type.false<IsEqual<object, number>>(true)
	type.false<IsEqual<object, string>>(true)
	type.false<IsEqual<object, symbol>>(true)
	type.false<IsEqual<object, bigint>>(true)
	type.false<IsEqual<object, Function>>(true)
	type.false<IsEqual<object, undefined>>(true)
	type.false<IsEqual<object, null>>(true)

	type.false<IsEqual<number, boolean>>(true)
	type.false<IsEqual<string, boolean>>(true)
	type.false<IsEqual<symbol, boolean>>(true)
	type.false<IsEqual<bigint, boolean>>(true)
	type.false<IsEqual<Function, boolean>>(true)
	type.false<IsEqual<undefined, boolean>>(true)
	type.false<IsEqual<null, boolean>>(true)
	type.false<IsEqual<object, boolean>>(true)

	type.false<IsEqual<boolean, number>>(true)
	type.false<IsEqual<string, number>>(true)
	type.false<IsEqual<symbol, number>>(true)
	type.false<IsEqual<bigint, number>>(true)
	type.false<IsEqual<Function, number>>(true)
	type.false<IsEqual<undefined, number>>(true)
	type.false<IsEqual<null, number>>(true)
	type.false<IsEqual<object, number>>(true)

	type.false<IsEqual<boolean, string>>(true)
	type.false<IsEqual<number, string>>(true)
	type.false<IsEqual<symbol, string>>(true)
	type.false<IsEqual<bigint, string>>(true)
	type.false<IsEqual<Function, string>>(true)
	type.false<IsEqual<undefined, string>>(true)
	type.false<IsEqual<null, string>>(true)
	type.false<IsEqual<object, string>>(true)

	type.false<IsEqual<boolean, symbol>>(true)
	type.false<IsEqual<number, symbol>>(true)
	type.false<IsEqual<string, symbol>>(true)
	type.false<IsEqual<bigint, symbol>>(true)
	type.false<IsEqual<Function, symbol>>(true)
	type.false<IsEqual<undefined, symbol>>(true)
	type.false<IsEqual<null, symbol>>(true)
	type.false<IsEqual<object, symbol>>(true)

	type.false<IsEqual<boolean, bigint>>(true)
	type.false<IsEqual<number, bigint>>(true)
	type.false<IsEqual<string, bigint>>(true)
	type.false<IsEqual<symbol, bigint>>(true)
	type.false<IsEqual<Function, bigint>>(true)
	type.false<IsEqual<undefined, bigint>>(true)
	type.false<IsEqual<null, bigint>>(true)
	type.false<IsEqual<object, bigint>>(true)

	type.false<IsEqual<boolean, Function>>(true)
	type.false<IsEqual<number, Function>>(true)
	type.false<IsEqual<string, Function>>(true)
	type.false<IsEqual<symbol, Function>>(true)
	type.false<IsEqual<bigint, Function>>(true)
	type.false<IsEqual<undefined, Function>>(true)
	type.false<IsEqual<null, Function>>(true)
	type.false<IsEqual<object, Function>>(true)

	type.false<IsEqual<boolean, undefined>>(true)
	type.false<IsEqual<number, undefined>>(true)
	type.false<IsEqual<string, undefined>>(true)
	type.false<IsEqual<symbol, undefined>>(true)
	type.false<IsEqual<bigint, undefined>>(true)
	type.false<IsEqual<Function, undefined>>(true)
	type.false<IsEqual<null, undefined>>(true)
	type.false<IsEqual<object, undefined>>(true)

	type.false<IsEqual<boolean, null>>(true)
	type.false<IsEqual<number, null>>(true)
	type.false<IsEqual<string, null>>(true)
	type.false<IsEqual<symbol, null>>(true)
	type.false<IsEqual<bigint, null>>(true)
	type.false<IsEqual<Function, null>>(true)
	type.false<IsEqual<undefined, null>>(true)
	type.false<IsEqual<object, null>>(true)

	type.false<IsEqual<boolean, object>>(true)
	type.false<IsEqual<number, object>>(true)
	type.false<IsEqual<string, object>>(true)
	type.false<IsEqual<symbol, object>>(true)
	type.false<IsEqual<bigint, object>>(true)
	type.false<IsEqual<Function, object>>(true)
	type.false<IsEqual<undefined, object>>(true)
	type.false<IsEqual<null, object>>(true)
})

it('compares actual symbol', () => {
	const s = Symbol()
	type.equal<typeof s, typeof s>(true)
	type.equal<typeof s, symbol>(true)
})

it('compares never', () => {
	type.true<IsEqual<never, never>>(true)
	type.false<IsEqual<never, 1>>(true)
	type.false<IsEqual<1, never>>(true)

	type.false<IsEqual<undefined, never>>(true)
	type.false<IsEqual<never, undefined>>(true)
	type.false<IsEqual<never, IsNotEqual<never, ValueOf<string>>>>(true)
	type.false<IsEqual<never, IsEqual<never, ValueOf<string>>>>(true)
})

it('compares void', () => {
	type.true<IsEqual<void, void>>(true)
	type.false<IsEqual<void, 1>>(true)
	type.false<IsEqual<1, void>>(true)
})

it('compares unknown', () => {
	type.true<IsEqual<unknown, unknown>>(true)
	type.false<IsEqual<unknown, 1>>(true)
	type.false<IsEqual<1, unknown>>(true)
})

it('compares any', () => {
	type.true<IsEqual<any, any>>(true)
	type.false<IsEqual<any, 1>>(true)
	type.false<IsEqual<1, any>>(true)
})

it('compares any against never', () => {
	type.false<IsEqual<any, never>>(true)
	type.false<IsEqual<never, any>>(true)
})

it('compares boolean with literals', () => {
	type.true<IsEqual<true, true>>(true)
	type.true<IsEqual<false, false>>(true)
	type.true<IsEqual<boolean, boolean>>(true)

	type.false<IsEqual<true, false>>(true)
	type.false<IsEqual<false, true>>(true)
})

it('compares boolean literal with others', () => {
	type.false<IsEqual<true, undefined>>(true)
	type.false<IsEqual<true, null>>(true)
	type.false<IsEqual<true, number>>(true)
	type.false<IsEqual<true, string>>(true)
	type.false<IsEqual<true, symbol>>(true)
	type.false<IsEqual<true, object>>(true)
	type.false<IsEqual<true, Function>>(true)

	type.false<IsEqual<false, undefined>>(true)
	type.false<IsEqual<false, null>>(true)
	type.false<IsEqual<false, number>>(true)
	type.false<IsEqual<false, string>>(true)
	type.false<IsEqual<false, symbol>>(true)
	type.false<IsEqual<false, object>>(true)
	type.false<IsEqual<false, Function>>(true)
})

test('literal is not equal to widen type', () => {
	type.false<IsEqual<1, number>>(true)
	type.false<IsEqual<number, 1>>(true)

	type.false<IsEqual<'a', string>>(true)
	type.false<IsEqual<string, 'a'>>(true)
})

test('same object is true', () => {
	type.true<IsEqual<{ a: 1 }, { a: 1 }>>(true)
})

test('different object is false', () => {
	type.false<IsEqual<{ a: 1 }, { b: 1 }>>(true)
})

test('object with any', () => {
	type.false<IsEqual<{ a: any }, { a: 1 }>>(true)
	type.false<IsEqual<{ a: 1 }, { a: any }>>(true)
	type.true<IsEqual<{ a: any }, { a: any }>>(true)
})

test('A subset of B is false', () => {
	type.false<IsEqual<{ a: 1 }, { a: 1; b: 1 }>>(true)
})

test('B subset of A is false', () => {
	type.false<IsEqual<{ a: 1; b: 1 }, { a: 1 }>>(true)
})

test('disjoin is false', () => {
	type.false<IsEqual<{ b: 1 }, { a: 1 }>>(true)
})

test('overlap is false', () => {
	type.false<IsEqual<{ a: 1; b: 1 }, { a: 1; c: 2 }>>(true)
})

it('works against tuple', () => {
	type.true<IsEqual<[1], [1]>>(true)
	type.true<IsEqual<[1, 2], [1, 2]>>(true)
	type.true<IsEqual<[any], [any]>>(true)

	type.false<IsEqual<[any], [1]>>(true)
	type.false<IsEqual<1, [1]>>(true)
	type.false<IsEqual<[1], 1>>(true)
	type.false<IsEqual<[1, 2], [2, 1]>>(true)

	type.true<IsEqual<[never], [never]>>(true)
	type.true<IsEqual<[any], [any]>>(true)
	type.true<IsEqual<[unknown], [unknown]>>(true)

	type.false<IsEqual<[any], [never]>>(true)
	type.false<IsEqual<[any], [unknown]>>(true)
	type.false<IsEqual<[never], [any]>>(true)
	type.false<IsEqual<[never], [unknown]>>(true)
	type.false<IsEqual<[unknown], [any]>>(true)
	type.false<IsEqual<[unknown], [never]>>(true)

	type.false<IsEqual<[any, number], [number, any]>>(true)
})

it('works with union types containing undefined', () => {
	type.false<IsEqual<string | undefined, string | undefined | number>>(true)
})

it('works with union types containing symbol', () => {
	type.false<IsEqual<string | symbol, string | symbol | number>>(true)
})

it('works with union of functions', () => {
	type.true<
		IsEqual<
			((v: string) => string) | ((v: number) => number),
			((v: string) => string) | ((v: number) => number)
		>
	>(true)

	type.false<IsEqual<(v: string) => string, ((v: string) => string) | ((v: number) => number)>>(true)
	type.false<IsEqual<((v: string) => string) | ((v: number) => number), (v: string) => string>>(true)
})

it('works with intersect types', () => {
	type.true<IsEqual<{ a: number; b: string }, { a: number } & { b: string }>>(true)
	type.true<IsEqual<{ a: number } & { b: number }, { a: number; b: number }>>(true)
	type.true<IsEqual<{ a: number; b?: string }, { a: number } & { b?: string }>>(true)
	type.true<IsEqual<{ a: number } & { b?: string }, { a: number; b?: string }>>(true)

	type.false<IsEqual<1 | 2, 1>>(true)
	type.false<IsEqual<{ a: number } & { c: number }, { a: number; b: number }>>(true)
	type.false<IsEqual<{ a: number; b: number }, { a: number } & { c: number }>>(true)
})

it('works with function overload', () => {
	function foo(v: string): string
	function foo(v: number): number
	function foo(v: unknown) {
		return v
	}
	type F = typeof foo

	type.true<IsEqual<F, { (v: string): string; (v: number): number }>>(true)
	type.false<IsEqual<F, { (v: string): string; (v: number): string }>>(true)

	type.false<IsEqual<F, { (v: number): number }>>(true)
	type.false<IsEqual<F, { (v: string): number }>>(true)

	type.false<IsEqual<(x: 0, y: null) => void, (x: number, y: string) => void>>(true)
	type.true<
		IsEqual<
			((x: 0, y: null) => void) & ((x: number, y: string) => void),
			((x: number, y: string) => void) & ((x: 0, y: null) => void)
		>
	>(true)
})

it('works with complex cases', () => {
	type.true<IsEqual<1 | (number & {}), number>>(true)

	type.false<IsEqual<void, null>>(true)
	type.false<IsEqual<undefined, null>>(true)
	type.false<IsEqual<() => void, () => undefined>>(true)

	type A = (() => 'foo') & (() => true)
	type B = (() => true) & (() => 'foo')

	type.true<IsEqual<A, B>>(true)
	type.true<IsEqual<A | B, B>>(true)

	type.true<IsEqual<Head<[1, 2, 3]>, 1>>(true)
})

it('works with complext cases 2', () => {
	type A = () => 'foo'
	type B = () => 'foo'

	type.true<IsEqual<A, B>>(true)
	type.true<IsEqual<A | B, B>>(true)
})

it('works with intersect of the same type', () => {
	type P = { c: 1 } | { c: 1 }

	type.true<IsEqual<P, { c: 1 }>>(true)
	type.true<IsEqual<P, { c: 1 } | { c: 1 }>>(true)
	type.true<IsEqual<P, { c: 1 } | { c: 1 } | { c: 1 }>>(true)
})

it('detect redonly', () => {
	type.false<IsEqual<{ a: 1 }, { readonly a: 1 }>>(true)
})

it('works with deep any', () => {
	type.true<
		IsEqual<
			{ a: { a: any; n: never; u: unknown; v: void } },
			{ a: { a: any; n: never; u: unknown; v: void } }
		>
	>(true)

	type.false<
		IsEqual<{ a: { a: any; n: never; u: unknown; v: void } }, { a: { a: 1; n: never; u: unknown; v: void } }>
	>(true)

	type.false<
		IsEqual<{ a: { a: any; n: never; u: unknown; v: void } }, { a: { a: any; n: 2; u: unknown; v: void } }>
	>(true)
	type.false<
		IsEqual<{ a: { a: any; n: never; u: unknown; v: void } }, { a: { a: any; n: never; u: 3; v: void } }>
	>(true)
	type.false<
		IsEqual<{ a: { a: any; n: never; u: unknown; v: void } }, { a: { a: any; n: never; u: unknown; v: 4 } }>
	>(true)
})

it('can override Then/Else', () => {
	type.equal<IsEqual<any, any, 1, 2>, 1>(true)
	type.equal<IsEqual<unknown, unknown, 1, 2>, 1>(true)
	type.equal<IsEqual<never, never, 1, 2>, 1>(true)
	type.equal<IsEqual<void, void, 1, 2>, 1>(true)

	type.equal<IsEqual<any, undefined, 1, 2>, 2>(true)
	type.equal<IsEqual<unknown, undefined, 1, 2>, 2>(true)
	type.equal<IsEqual<never, undefined, 1, 2>, 2>(true)
	type.equal<IsEqual<void, undefined, 1, 2>, 2>(true)

	type.equal<IsEqual<undefined, any, 1, 2>, 2>(true)
	type.equal<IsEqual<undefined, unknown, 1, 2>, 2>(true)
	type.equal<IsEqual<undefined, never, 1, 2>, 2>(true)
	type.equal<IsEqual<undefined, void, 1, 2>, 2>(true)
})
