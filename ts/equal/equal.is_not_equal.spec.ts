import type { NotEqual, Head, Equal, ValueOf } from '../index.js'
import { type } from '../index.js'

it('returns true when comparing primitive types with itself', () => {
	type.false<NotEqual<boolean, boolean>>(true)
	type.false<NotEqual<boolean, boolean>>(true)
	type.false<NotEqual<number, number>>(true)
	type.false<NotEqual<string, string>>(true)
	type.false<NotEqual<symbol, symbol>>(true)
	type.false<NotEqual<bigint, bigint>>(true)
	type.false<NotEqual<Function, Function>>(true)
	type.false<NotEqual<undefined, undefined>>(true)
	type.false<NotEqual<null, null>>(true)
	type.false<NotEqual<object, object>>(true)
})

it('returns false when comparing primitive types against each other', () => {
	type.true<NotEqual<boolean, number>>(true)
	type.true<NotEqual<boolean, string>>(true)
	type.true<NotEqual<boolean, symbol>>(true)
	type.true<NotEqual<boolean, bigint>>(true)
	type.true<NotEqual<boolean, Function>>(true)
	type.true<NotEqual<boolean, undefined>>(true)
	type.true<NotEqual<boolean, null>>(true)
	type.true<NotEqual<boolean, object>>(true)

	type.true<NotEqual<number, boolean>>(true)
	type.true<NotEqual<number, string>>(true)
	type.true<NotEqual<number, symbol>>(true)
	type.true<NotEqual<number, bigint>>(true)
	type.true<NotEqual<number, Function>>(true)
	type.true<NotEqual<number, undefined>>(true)
	type.true<NotEqual<number, null>>(true)
	type.true<NotEqual<number, object>>(true)

	type.true<NotEqual<string, boolean>>(true)
	type.true<NotEqual<string, number>>(true)
	type.true<NotEqual<string, symbol>>(true)
	type.true<NotEqual<string, bigint>>(true)
	type.true<NotEqual<string, Function>>(true)
	type.true<NotEqual<string, undefined>>(true)
	type.true<NotEqual<string, null>>(true)
	type.true<NotEqual<string, object>>(true)

	type.true<NotEqual<symbol, boolean>>(true)
	type.true<NotEqual<symbol, number>>(true)
	type.true<NotEqual<symbol, string>>(true)
	type.true<NotEqual<symbol, bigint>>(true)
	type.true<NotEqual<symbol, Function>>(true)
	type.true<NotEqual<symbol, undefined>>(true)
	type.true<NotEqual<symbol, null>>(true)
	type.true<NotEqual<symbol, object>>(true)

	type.true<NotEqual<bigint, boolean>>(true)
	type.true<NotEqual<bigint, number>>(true)
	type.true<NotEqual<bigint, string>>(true)
	type.true<NotEqual<bigint, symbol>>(true)
	type.true<NotEqual<bigint, Function>>(true)
	type.true<NotEqual<bigint, undefined>>(true)
	type.true<NotEqual<bigint, null>>(true)
	type.true<NotEqual<bigint, object>>(true)

	type.true<NotEqual<Function, boolean>>(true)
	type.true<NotEqual<Function, number>>(true)
	type.true<NotEqual<Function, string>>(true)
	type.true<NotEqual<Function, symbol>>(true)
	type.true<NotEqual<Function, bigint>>(true)
	type.true<NotEqual<Function, undefined>>(true)
	type.true<NotEqual<Function, null>>(true)
	type.true<NotEqual<Function, object>>(true)

	type.true<NotEqual<undefined, boolean>>(true)
	type.true<NotEqual<undefined, number>>(true)
	type.true<NotEqual<undefined, string>>(true)
	type.true<NotEqual<undefined, symbol>>(true)
	type.true<NotEqual<undefined, bigint>>(true)
	type.true<NotEqual<undefined, Function>>(true)
	type.true<NotEqual<undefined, null>>(true)
	type.true<NotEqual<undefined, object>>(true)

	type.true<NotEqual<null, boolean>>(true)
	type.true<NotEqual<null, number>>(true)
	type.true<NotEqual<null, string>>(true)
	type.true<NotEqual<null, symbol>>(true)
	type.true<NotEqual<null, bigint>>(true)
	type.true<NotEqual<null, Function>>(true)
	type.true<NotEqual<null, undefined>>(true)
	type.true<NotEqual<null, object>>(true)

	type.true<NotEqual<object, boolean>>(true)
	type.true<NotEqual<object, number>>(true)
	type.true<NotEqual<object, string>>(true)
	type.true<NotEqual<object, symbol>>(true)
	type.true<NotEqual<object, bigint>>(true)
	type.true<NotEqual<object, Function>>(true)
	type.true<NotEqual<object, undefined>>(true)
	type.true<NotEqual<object, null>>(true)

	type.true<NotEqual<number, boolean>>(true)
	type.true<NotEqual<string, boolean>>(true)
	type.true<NotEqual<symbol, boolean>>(true)
	type.true<NotEqual<bigint, boolean>>(true)
	type.true<NotEqual<Function, boolean>>(true)
	type.true<NotEqual<undefined, boolean>>(true)
	type.true<NotEqual<null, boolean>>(true)
	type.true<NotEqual<object, boolean>>(true)

	type.true<NotEqual<boolean, number>>(true)
	type.true<NotEqual<string, number>>(true)
	type.true<NotEqual<symbol, number>>(true)
	type.true<NotEqual<bigint, number>>(true)
	type.true<NotEqual<Function, number>>(true)
	type.true<NotEqual<undefined, number>>(true)
	type.true<NotEqual<null, number>>(true)
	type.true<NotEqual<object, number>>(true)

	type.true<NotEqual<boolean, string>>(true)
	type.true<NotEqual<number, string>>(true)
	type.true<NotEqual<symbol, string>>(true)
	type.true<NotEqual<bigint, string>>(true)
	type.true<NotEqual<Function, string>>(true)
	type.true<NotEqual<undefined, string>>(true)
	type.true<NotEqual<null, string>>(true)
	type.true<NotEqual<object, string>>(true)

	type.true<NotEqual<boolean, symbol>>(true)
	type.true<NotEqual<number, symbol>>(true)
	type.true<NotEqual<string, symbol>>(true)
	type.true<NotEqual<bigint, symbol>>(true)
	type.true<NotEqual<Function, symbol>>(true)
	type.true<NotEqual<undefined, symbol>>(true)
	type.true<NotEqual<null, symbol>>(true)
	type.true<NotEqual<object, symbol>>(true)

	type.true<NotEqual<boolean, bigint>>(true)
	type.true<NotEqual<number, bigint>>(true)
	type.true<NotEqual<string, bigint>>(true)
	type.true<NotEqual<symbol, bigint>>(true)
	type.true<NotEqual<Function, bigint>>(true)
	type.true<NotEqual<undefined, bigint>>(true)
	type.true<NotEqual<null, bigint>>(true)
	type.true<NotEqual<object, bigint>>(true)

	type.true<NotEqual<boolean, Function>>(true)
	type.true<NotEqual<number, Function>>(true)
	type.true<NotEqual<string, Function>>(true)
	type.true<NotEqual<symbol, Function>>(true)
	type.true<NotEqual<bigint, Function>>(true)
	type.true<NotEqual<undefined, Function>>(true)
	type.true<NotEqual<null, Function>>(true)
	type.true<NotEqual<object, Function>>(true)

	type.true<NotEqual<boolean, undefined>>(true)
	type.true<NotEqual<number, undefined>>(true)
	type.true<NotEqual<string, undefined>>(true)
	type.true<NotEqual<symbol, undefined>>(true)
	type.true<NotEqual<bigint, undefined>>(true)
	type.true<NotEqual<Function, undefined>>(true)
	type.true<NotEqual<null, undefined>>(true)
	type.true<NotEqual<object, undefined>>(true)

	type.true<NotEqual<boolean, null>>(true)
	type.true<NotEqual<number, null>>(true)
	type.true<NotEqual<string, null>>(true)
	type.true<NotEqual<symbol, null>>(true)
	type.true<NotEqual<bigint, null>>(true)
	type.true<NotEqual<Function, null>>(true)
	type.true<NotEqual<undefined, null>>(true)
	type.true<NotEqual<object, null>>(true)

	type.true<NotEqual<boolean, object>>(true)
	type.true<NotEqual<number, object>>(true)
	type.true<NotEqual<string, object>>(true)
	type.true<NotEqual<symbol, object>>(true)
	type.true<NotEqual<bigint, object>>(true)
	type.true<NotEqual<Function, object>>(true)
	type.true<NotEqual<undefined, object>>(true)
	type.true<NotEqual<null, object>>(true)
})

it('compares never', () => {
	type.false<NotEqual<never, never>>(true)
	type.true<NotEqual<never, 1>>(true)
	type.true<NotEqual<1, never>>(true)

	type.true<NotEqual<undefined, never>>(true)
	type.true<NotEqual<never, undefined>>(true)
	type.true<NotEqual<never, NotEqual<never, ValueOf<string>>>>(true)
	type.true<NotEqual<never, Equal<never, ValueOf<string>>>>(true)
})

it('compares void', () => {
	type.false<NotEqual<void, void>>(true)
	type.true<NotEqual<void, 1>>(true)
	type.true<NotEqual<1, void>>(true)
})

it('compares unknown', () => {
	type.false<NotEqual<unknown, unknown>>(true)
	type.true<NotEqual<unknown, 1>>(true)
	type.true<NotEqual<1, unknown>>(true)
})

it('compares any', () => {
	type.false<NotEqual<any, any>>(true)
	type.true<NotEqual<any, 1>>(true)
	type.true<NotEqual<1, any>>(true)
})

it('compares any against never', () => {
	type.true<NotEqual<any, never>>(true)
	type.true<NotEqual<never, any>>(true)
})

it('compares boolean with literals', () => {
	type.false<NotEqual<true, true>>(true)
	type.false<NotEqual<false, false>>(true)
	type.false<NotEqual<boolean, boolean>>(true)

	type.true<NotEqual<true, false>>(true)
	type.true<NotEqual<false, true>>(true)
})

it('compares boolean literal with others', () => {
	type.true<NotEqual<true, undefined>>(true)
	type.true<NotEqual<true, null>>(true)
	type.true<NotEqual<true, number>>(true)
	type.true<NotEqual<true, string>>(true)
	type.true<NotEqual<true, symbol>>(true)
	type.true<NotEqual<true, object>>(true)
	type.true<NotEqual<true, Function>>(true)

	type.true<NotEqual<false, undefined>>(true)
	type.true<NotEqual<false, null>>(true)
	type.true<NotEqual<false, number>>(true)
	type.true<NotEqual<false, string>>(true)
	type.true<NotEqual<false, symbol>>(true)
	type.true<NotEqual<false, object>>(true)
	type.true<NotEqual<false, Function>>(true)
})

test('literal is not Notequal to widen type', () => {
	type.true<NotEqual<1, number>>(true)
	type.true<NotEqual<number, 1>>(true)

	type.true<NotEqual<'a', string>>(true)
	type.true<NotEqual<string, 'a'>>(true)
})

test('same object is true', () => {
	type.false<NotEqual<{ a: 1 }, { a: 1 }>>(true)
})

test('different object is false', () => {
	type.true<NotEqual<{ a: 1 }, { b: 1 }>>(true)
})

test('object with any', () => {
	type.true<NotEqual<{ a: any }, { a: 1 }>>(true)
	type.true<NotEqual<{ a: 1 }, { a: any }>>(true)
	type.false<NotEqual<{ a: any }, { a: any }>>(true)
})

test('A subset of B is false', () => {
	type.true<NotEqual<{ a: 1 }, { a: 1; b: 1 }>>(true)
})

test('B subset of A is false', () => {
	type.true<NotEqual<{ a: 1; b: 1 }, { a: 1 }>>(true)
})

test('disjoin is false', () => {
	type.true<NotEqual<{ b: 1 }, { a: 1 }>>(true)
})

test('overlap is false', () => {
	type.true<NotEqual<{ a: 1; b: 1 }, { a: 1; c: 2 }>>(true)
})

it('works against tuple', () => {
	type.false<NotEqual<[1], [1]>>(true)
	type.false<NotEqual<[1, 2], [1, 2]>>(true)
	type.false<NotEqual<[any], [any]>>(true)

	type.true<NotEqual<[any], [1]>>(true)
	type.true<NotEqual<1, [1]>>(true)
	type.true<NotEqual<[1], 1>>(true)
	type.true<NotEqual<[1, 2], [2, 1]>>(true)

	type.false<NotEqual<[never], [never]>>(true)
	type.false<NotEqual<[any], [any]>>(true)
	type.false<NotEqual<[unknown], [unknown]>>(true)

	type.true<NotEqual<[any], [never]>>(true)
	type.true<NotEqual<[any], [unknown]>>(true)
	type.true<NotEqual<[never], [any]>>(true)
	type.true<NotEqual<[never], [unknown]>>(true)
	type.true<NotEqual<[unknown], [any]>>(true)
	type.true<NotEqual<[unknown], [never]>>(true)

	type.true<NotEqual<[any, number], [number, any]>>(true)
})

it('works with union types containing undefined', () => {
	type.true<NotEqual<string | undefined, string | undefined | number>>(true)
})

it('works with union types containing symbol', () => {
	type.true<NotEqual<string | symbol, string | symbol | number>>(true)
})

it('works with union of functions', () => {
	type.false<
		NotEqual<
			((v: string) => string) | ((v: number) => number),
			((v: string) => string) | ((v: number) => number)
		>
	>(true)

	type.true<NotEqual<(v: string) => string, ((v: string) => string) | ((v: number) => number)>>(true)
	type.true<NotEqual<((v: string) => string) | ((v: number) => number), (v: string) => string>>(true)
})

it('works with intersect types', () => {
	type.false<NotEqual<{ a: number; b: string }, { a: number } & { b: string }>>(true)
	type.false<NotEqual<{ a: number } & { b: number }, { a: number; b: number }>>(true)
	type.false<NotEqual<{ a: number; b?: string }, { a: number } & { b?: string }>>(true)
	type.false<NotEqual<{ a: number } & { b?: string }, { a: number; b?: string }>>(true)

	type.true<NotEqual<1 | 2, 1>>(true)
	type.true<NotEqual<{ a: number } & { c: number }, { a: number; b: number }>>(true)
	type.true<NotEqual<{ a: number; b: number }, { a: number } & { c: number }>>(true)
})

it('works with function overload', () => {
	function foo(v: string): string
	function foo(v: number): number
	function foo(v: unknown) {
		return v
	}
	type F = typeof foo

	type.false<NotEqual<F, { (v: string): string; (v: number): number }>>(true)
	type.true<NotEqual<F, { (v: string): string; (v: number): string }>>(true)

	type.true<NotEqual<F, { (v: number): number }>>(true)
	type.true<NotEqual<F, { (v: string): number }>>(true)

	type.true<NotEqual<(x: 0, y: null) => void, (x: number, y: string) => void>>(true)
	type.false<
		NotEqual<
			((x: 0, y: null) => void) & ((x: number, y: string) => void),
			((x: number, y: string) => void) & ((x: 0, y: null) => void)
		>
	>(true)
})

it('works with complex cases', () => {
	type.false<NotEqual<1 | (number & {}), number>>(true)

	type.true<NotEqual<void, null>>(true)
	type.true<NotEqual<undefined, null>>(true)
	type.true<NotEqual<() => void, () => undefined>>(true)

	type A = (() => 'foo') & (() => true)
	type B = (() => true) & (() => 'foo')

	type.false<NotEqual<A, B>>(true)
	type.false<NotEqual<A | B, B>>(true)

	type.false<NotEqual<Head<[1, 2, 3]>, 1>>(true)
})

it('works with complext cases 2', () => {
	type A = () => 'foo'
	type B = () => 'foo'

	type.false<NotEqual<A, B>>(true)
	type.false<NotEqual<A | B, B>>(true)
})

it('works with intersect of the same type', () => {
	type P = { c: 1 } | { c: 1 }

	type.false<NotEqual<P, { c: 1 }>>(true)
	type.false<NotEqual<P, { c: 1 } | { c: 1 }>>(true)
	type.false<NotEqual<P, { c: 1 } | { c: 1 } | { c: 1 }>>(true)
})

it('detect redonly', () => {
	type.true<NotEqual<{ a: 1 }, { readonly a: 1 }>>(true)
})

it('works with deep any', () => {
	type.false<
		NotEqual<
			{ a: { a: any; n: never; u: unknown; v: void } },
			{ a: { a: any; n: never; u: unknown; v: void } }
		>
	>(true)

	type.true<
		NotEqual<{ a: { a: any; n: never; u: unknown; v: void } }, { a: { a: 1; n: never; u: unknown; v: void } }>
	>(true)

	type.true<
		NotEqual<{ a: { a: any; n: never; u: unknown; v: void } }, { a: { a: any; n: 2; u: unknown; v: void } }>
	>(true)
	type.true<
		NotEqual<{ a: { a: any; n: never; u: unknown; v: void } }, { a: { a: any; n: never; u: 3; v: void } }>
	>(true)
	type.true<
		NotEqual<{ a: { a: any; n: never; u: unknown; v: void } }, { a: { a: any; n: never; u: unknown; v: 4 } }>
	>(true)
})

it('can override Then/Else', () => {
	type.equal<NotEqual<any, any, 1, 2>, 2>(true)
	type.equal<NotEqual<unknown, unknown, 1, 2>, 2>(true)
	type.equal<NotEqual<never, never, 1, 2>, 2>(true)
	type.equal<NotEqual<void, void, 1, 2>, 2>(true)

	type.equal<NotEqual<any, undefined, 1, 2>, 1>(true)
	type.equal<NotEqual<unknown, undefined, 1, 2>, 1>(true)
	type.equal<NotEqual<never, undefined, 1, 2>, 1>(true)
	type.equal<NotEqual<void, undefined, 1, 2>, 1>(true)

	type.equal<NotEqual<undefined, any, 1, 2>, 1>(true)
	type.equal<NotEqual<undefined, unknown, 1, 2>, 1>(true)
	type.equal<NotEqual<undefined, never, 1, 2>, 1>(true)
	type.equal<NotEqual<undefined, void, 1, 2>, 1>(true)
})
