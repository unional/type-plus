import type { NotEqual, Head, Equal, ValueOf } from '../index.js'
import { testType } from '../index.js'

it('returns true when comparing primitive types with itself', () => {
	testType.false<NotEqual<boolean, boolean>>(true)
	testType.false<NotEqual<boolean, boolean>>(true)
	testType.false<NotEqual<number, number>>(true)
	testType.false<NotEqual<string, string>>(true)
	testType.false<NotEqual<symbol, symbol>>(true)
	testType.false<NotEqual<bigint, bigint>>(true)
	testType.false<NotEqual<Function, Function>>(true)
	testType.false<NotEqual<undefined, undefined>>(true)
	testType.false<NotEqual<null, null>>(true)
	testType.false<NotEqual<object, object>>(true)
})

it('returns false when comparing primitive types against each other', () => {
	testType.true<NotEqual<boolean, number>>(true)
	testType.true<NotEqual<boolean, string>>(true)
	testType.true<NotEqual<boolean, symbol>>(true)
	testType.true<NotEqual<boolean, bigint>>(true)
	testType.true<NotEqual<boolean, Function>>(true)
	testType.true<NotEqual<boolean, undefined>>(true)
	testType.true<NotEqual<boolean, null>>(true)
	testType.true<NotEqual<boolean, object>>(true)

	testType.true<NotEqual<number, boolean>>(true)
	testType.true<NotEqual<number, string>>(true)
	testType.true<NotEqual<number, symbol>>(true)
	testType.true<NotEqual<number, bigint>>(true)
	testType.true<NotEqual<number, Function>>(true)
	testType.true<NotEqual<number, undefined>>(true)
	testType.true<NotEqual<number, null>>(true)
	testType.true<NotEqual<number, object>>(true)

	testType.true<NotEqual<string, boolean>>(true)
	testType.true<NotEqual<string, number>>(true)
	testType.true<NotEqual<string, symbol>>(true)
	testType.true<NotEqual<string, bigint>>(true)
	testType.true<NotEqual<string, Function>>(true)
	testType.true<NotEqual<string, undefined>>(true)
	testType.true<NotEqual<string, null>>(true)
	testType.true<NotEqual<string, object>>(true)

	testType.true<NotEqual<symbol, boolean>>(true)
	testType.true<NotEqual<symbol, number>>(true)
	testType.true<NotEqual<symbol, string>>(true)
	testType.true<NotEqual<symbol, bigint>>(true)
	testType.true<NotEqual<symbol, Function>>(true)
	testType.true<NotEqual<symbol, undefined>>(true)
	testType.true<NotEqual<symbol, null>>(true)
	testType.true<NotEqual<symbol, object>>(true)

	testType.true<NotEqual<bigint, boolean>>(true)
	testType.true<NotEqual<bigint, number>>(true)
	testType.true<NotEqual<bigint, string>>(true)
	testType.true<NotEqual<bigint, symbol>>(true)
	testType.true<NotEqual<bigint, Function>>(true)
	testType.true<NotEqual<bigint, undefined>>(true)
	testType.true<NotEqual<bigint, null>>(true)
	testType.true<NotEqual<bigint, object>>(true)

	testType.true<NotEqual<Function, boolean>>(true)
	testType.true<NotEqual<Function, number>>(true)
	testType.true<NotEqual<Function, string>>(true)
	testType.true<NotEqual<Function, symbol>>(true)
	testType.true<NotEqual<Function, bigint>>(true)
	testType.true<NotEqual<Function, undefined>>(true)
	testType.true<NotEqual<Function, null>>(true)
	testType.true<NotEqual<Function, object>>(true)

	testType.true<NotEqual<undefined, boolean>>(true)
	testType.true<NotEqual<undefined, number>>(true)
	testType.true<NotEqual<undefined, string>>(true)
	testType.true<NotEqual<undefined, symbol>>(true)
	testType.true<NotEqual<undefined, bigint>>(true)
	testType.true<NotEqual<undefined, Function>>(true)
	testType.true<NotEqual<undefined, null>>(true)
	testType.true<NotEqual<undefined, object>>(true)

	testType.true<NotEqual<null, boolean>>(true)
	testType.true<NotEqual<null, number>>(true)
	testType.true<NotEqual<null, string>>(true)
	testType.true<NotEqual<null, symbol>>(true)
	testType.true<NotEqual<null, bigint>>(true)
	testType.true<NotEqual<null, Function>>(true)
	testType.true<NotEqual<null, undefined>>(true)
	testType.true<NotEqual<null, object>>(true)

	testType.true<NotEqual<object, boolean>>(true)
	testType.true<NotEqual<object, number>>(true)
	testType.true<NotEqual<object, string>>(true)
	testType.true<NotEqual<object, symbol>>(true)
	testType.true<NotEqual<object, bigint>>(true)
	testType.true<NotEqual<object, Function>>(true)
	testType.true<NotEqual<object, undefined>>(true)
	testType.true<NotEqual<object, null>>(true)

	testType.true<NotEqual<number, boolean>>(true)
	testType.true<NotEqual<string, boolean>>(true)
	testType.true<NotEqual<symbol, boolean>>(true)
	testType.true<NotEqual<bigint, boolean>>(true)
	testType.true<NotEqual<Function, boolean>>(true)
	testType.true<NotEqual<undefined, boolean>>(true)
	testType.true<NotEqual<null, boolean>>(true)
	testType.true<NotEqual<object, boolean>>(true)

	testType.true<NotEqual<boolean, number>>(true)
	testType.true<NotEqual<string, number>>(true)
	testType.true<NotEqual<symbol, number>>(true)
	testType.true<NotEqual<bigint, number>>(true)
	testType.true<NotEqual<Function, number>>(true)
	testType.true<NotEqual<undefined, number>>(true)
	testType.true<NotEqual<null, number>>(true)
	testType.true<NotEqual<object, number>>(true)

	testType.true<NotEqual<boolean, string>>(true)
	testType.true<NotEqual<number, string>>(true)
	testType.true<NotEqual<symbol, string>>(true)
	testType.true<NotEqual<bigint, string>>(true)
	testType.true<NotEqual<Function, string>>(true)
	testType.true<NotEqual<undefined, string>>(true)
	testType.true<NotEqual<null, string>>(true)
	testType.true<NotEqual<object, string>>(true)

	testType.true<NotEqual<boolean, symbol>>(true)
	testType.true<NotEqual<number, symbol>>(true)
	testType.true<NotEqual<string, symbol>>(true)
	testType.true<NotEqual<bigint, symbol>>(true)
	testType.true<NotEqual<Function, symbol>>(true)
	testType.true<NotEqual<undefined, symbol>>(true)
	testType.true<NotEqual<null, symbol>>(true)
	testType.true<NotEqual<object, symbol>>(true)

	testType.true<NotEqual<boolean, bigint>>(true)
	testType.true<NotEqual<number, bigint>>(true)
	testType.true<NotEqual<string, bigint>>(true)
	testType.true<NotEqual<symbol, bigint>>(true)
	testType.true<NotEqual<Function, bigint>>(true)
	testType.true<NotEqual<undefined, bigint>>(true)
	testType.true<NotEqual<null, bigint>>(true)
	testType.true<NotEqual<object, bigint>>(true)

	testType.true<NotEqual<boolean, Function>>(true)
	testType.true<NotEqual<number, Function>>(true)
	testType.true<NotEqual<string, Function>>(true)
	testType.true<NotEqual<symbol, Function>>(true)
	testType.true<NotEqual<bigint, Function>>(true)
	testType.true<NotEqual<undefined, Function>>(true)
	testType.true<NotEqual<null, Function>>(true)
	testType.true<NotEqual<object, Function>>(true)

	testType.true<NotEqual<boolean, undefined>>(true)
	testType.true<NotEqual<number, undefined>>(true)
	testType.true<NotEqual<string, undefined>>(true)
	testType.true<NotEqual<symbol, undefined>>(true)
	testType.true<NotEqual<bigint, undefined>>(true)
	testType.true<NotEqual<Function, undefined>>(true)
	testType.true<NotEqual<null, undefined>>(true)
	testType.true<NotEqual<object, undefined>>(true)

	testType.true<NotEqual<boolean, null>>(true)
	testType.true<NotEqual<number, null>>(true)
	testType.true<NotEqual<string, null>>(true)
	testType.true<NotEqual<symbol, null>>(true)
	testType.true<NotEqual<bigint, null>>(true)
	testType.true<NotEqual<Function, null>>(true)
	testType.true<NotEqual<undefined, null>>(true)
	testType.true<NotEqual<object, null>>(true)

	testType.true<NotEqual<boolean, object>>(true)
	testType.true<NotEqual<number, object>>(true)
	testType.true<NotEqual<string, object>>(true)
	testType.true<NotEqual<symbol, object>>(true)
	testType.true<NotEqual<bigint, object>>(true)
	testType.true<NotEqual<Function, object>>(true)
	testType.true<NotEqual<undefined, object>>(true)
	testType.true<NotEqual<null, object>>(true)
})

it('compares never', () => {
	testType.false<NotEqual<never, never>>(true)
	testType.true<NotEqual<never, 1>>(true)
	testType.true<NotEqual<1, never>>(true)

	testType.true<NotEqual<undefined, never>>(true)
	testType.true<NotEqual<never, undefined>>(true)
	testType.true<NotEqual<never, NotEqual<never, ValueOf<string>>>>(true)
	testType.true<NotEqual<never, Equal<never, ValueOf<string>>>>(true)
})

it('compares void', () => {
	testType.false<NotEqual<void, void>>(true)
	testType.true<NotEqual<void, 1>>(true)
	testType.true<NotEqual<1, void>>(true)
})

it('compares unknown', () => {
	testType.false<NotEqual<unknown, unknown>>(true)
	testType.true<NotEqual<unknown, 1>>(true)
	testType.true<NotEqual<1, unknown>>(true)
})

it('compares any', () => {
	testType.false<NotEqual<any, any>>(true)
	testType.true<NotEqual<any, 1>>(true)
	testType.true<NotEqual<1, any>>(true)
})

it('compares any against never', () => {
	testType.true<NotEqual<any, never>>(true)
	testType.true<NotEqual<never, any>>(true)
})

it('compares boolean with literals', () => {
	testType.false<NotEqual<true, true>>(true)
	testType.false<NotEqual<false, false>>(true)
	testType.false<NotEqual<boolean, boolean>>(true)

	testType.true<NotEqual<true, false>>(true)
	testType.true<NotEqual<false, true>>(true)
})

it('compares boolean literal with others', () => {
	testType.true<NotEqual<true, undefined>>(true)
	testType.true<NotEqual<true, null>>(true)
	testType.true<NotEqual<true, number>>(true)
	testType.true<NotEqual<true, string>>(true)
	testType.true<NotEqual<true, symbol>>(true)
	testType.true<NotEqual<true, object>>(true)
	testType.true<NotEqual<true, Function>>(true)

	testType.true<NotEqual<false, undefined>>(true)
	testType.true<NotEqual<false, null>>(true)
	testType.true<NotEqual<false, number>>(true)
	testType.true<NotEqual<false, string>>(true)
	testType.true<NotEqual<false, symbol>>(true)
	testType.true<NotEqual<false, object>>(true)
	testType.true<NotEqual<false, Function>>(true)
})

test('literal is not Notequal to widen type', () => {
	testType.true<NotEqual<1, number>>(true)
	testType.true<NotEqual<number, 1>>(true)

	testType.true<NotEqual<'a', string>>(true)
	testType.true<NotEqual<string, 'a'>>(true)
})

test('same object is true', () => {
	testType.false<NotEqual<{ a: 1 }, { a: 1 }>>(true)
})

test('different object is false', () => {
	testType.true<NotEqual<{ a: 1 }, { b: 1 }>>(true)
})

test('object with any', () => {
	testType.true<NotEqual<{ a: any }, { a: 1 }>>(true)
	testType.true<NotEqual<{ a: 1 }, { a: any }>>(true)
	testType.false<NotEqual<{ a: any }, { a: any }>>(true)
})

test('A subset of B is false', () => {
	testType.true<NotEqual<{ a: 1 }, { a: 1; b: 1 }>>(true)
})

test('B subset of A is false', () => {
	testType.true<NotEqual<{ a: 1; b: 1 }, { a: 1 }>>(true)
})

test('disjoin is false', () => {
	testType.true<NotEqual<{ b: 1 }, { a: 1 }>>(true)
})

test('overlap is false', () => {
	testType.true<NotEqual<{ a: 1; b: 1 }, { a: 1; c: 2 }>>(true)
})

it('works against tuple', () => {
	testType.false<NotEqual<[1], [1]>>(true)
	testType.false<NotEqual<[1, 2], [1, 2]>>(true)
	testType.false<NotEqual<[any], [any]>>(true)

	testType.true<NotEqual<[any], [1]>>(true)
	testType.true<NotEqual<1, [1]>>(true)
	testType.true<NotEqual<[1], 1>>(true)
	testType.true<NotEqual<[1, 2], [2, 1]>>(true)

	testType.false<NotEqual<[never], [never]>>(true)
	testType.false<NotEqual<[any], [any]>>(true)
	testType.false<NotEqual<[unknown], [unknown]>>(true)

	testType.true<NotEqual<[any], [never]>>(true)
	testType.true<NotEqual<[any], [unknown]>>(true)
	testType.true<NotEqual<[never], [any]>>(true)
	testType.true<NotEqual<[never], [unknown]>>(true)
	testType.true<NotEqual<[unknown], [any]>>(true)
	testType.true<NotEqual<[unknown], [never]>>(true)

	testType.true<NotEqual<[any, number], [number, any]>>(true)
})

it('works with union types containing undefined', () => {
	testType.true<NotEqual<string | undefined, string | undefined | number>>(true)
})

it('works with union types containing symbol', () => {
	testType.true<NotEqual<string | symbol, string | symbol | number>>(true)
})

it('works with union of functions', () => {
	testType.false<
		NotEqual<
			((v: string) => string) | ((v: number) => number),
			((v: string) => string) | ((v: number) => number)
		>
	>(true)

	testType.true<NotEqual<(v: string) => string, ((v: string) => string) | ((v: number) => number)>>(true)
	testType.true<NotEqual<((v: string) => string) | ((v: number) => number), (v: string) => string>>(true)
})

it('works with intersect types', () => {
	testType.false<NotEqual<{ a: number; b: string }, { a: number } & { b: string }>>(true)
	testType.false<NotEqual<{ a: number } & { b: number }, { a: number; b: number }>>(true)
	testType.false<NotEqual<{ a: number; b?: string }, { a: number } & { b?: string }>>(true)
	testType.false<NotEqual<{ a: number } & { b?: string }, { a: number; b?: string }>>(true)

	testType.true<NotEqual<1 | 2, 1>>(true)
	testType.true<NotEqual<{ a: number } & { c: number }, { a: number; b: number }>>(true)
	testType.true<NotEqual<{ a: number; b: number }, { a: number } & { c: number }>>(true)
})

it('works with function overload', () => {
	function foo(v: string): string
	function foo(v: number): number
	function foo(v: unknown) {
		return v
	}
	type F = typeof foo

	testType.false<NotEqual<F, { (v: string): string; (v: number): number }>>(true)
	testType.true<NotEqual<F, { (v: string): string; (v: number): string }>>(true)

	testType.true<NotEqual<F, { (v: number): number }>>(true)
	testType.true<NotEqual<F, { (v: string): number }>>(true)

	testType.true<NotEqual<(x: 0, y: null) => void, (x: number, y: string) => void>>(true)
	testType.false<
		NotEqual<
			((x: 0, y: null) => void) & ((x: number, y: string) => void),
			((x: number, y: string) => void) & ((x: 0, y: null) => void)
		>
	>(true)
})

it('works with complex cases', () => {
	testType.false<NotEqual<1 | (number & {}), number>>(true)

	testType.true<NotEqual<void, null>>(true)
	testType.true<NotEqual<undefined, null>>(true)
	testType.true<NotEqual<() => void, () => undefined>>(true)

	type A = (() => 'foo') & (() => true)
	type B = (() => true) & (() => 'foo')

	testType.false<NotEqual<A, B>>(true)
	testType.false<NotEqual<A | B, B>>(true)

	testType.false<NotEqual<Head<[1, 2, 3]>, 1>>(true)
})

it('works with complext cases 2', () => {
	type A = () => 'foo'
	type B = () => 'foo'

	testType.false<NotEqual<A, B>>(true)
	testType.false<NotEqual<A | B, B>>(true)
})

it('works with intersect of the same type', () => {
	type P = { c: 1 } | { c: 1 }

	testType.false<NotEqual<P, { c: 1 }>>(true)
	testType.false<NotEqual<P, { c: 1 } | { c: 1 }>>(true)
	testType.false<NotEqual<P, { c: 1 } | { c: 1 } | { c: 1 }>>(true)
})

it('detect redonly', () => {
	testType.true<NotEqual<{ a: 1 }, { readonly a: 1 }>>(true)
})

it('works with deep any', () => {
	testType.false<
		NotEqual<
			{ a: { a: any; n: never; u: unknown; v: void } },
			{ a: { a: any; n: never; u: unknown; v: void } }
		>
	>(true)

	testType.true<
		NotEqual<{ a: { a: any; n: never; u: unknown; v: void } }, { a: { a: 1; n: never; u: unknown; v: void } }>
	>(true)

	testType.true<
		NotEqual<{ a: { a: any; n: never; u: unknown; v: void } }, { a: { a: any; n: 2; u: unknown; v: void } }>
	>(true)
	testType.true<
		NotEqual<{ a: { a: any; n: never; u: unknown; v: void } }, { a: { a: any; n: never; u: 3; v: void } }>
	>(true)
	testType.true<
		NotEqual<{ a: { a: any; n: never; u: unknown; v: void } }, { a: { a: any; n: never; u: unknown; v: 4 } }>
	>(true)
})

it('can override Then/Else', () => {
	testType.equal<NotEqual<any, any, 1, 2>, 2>(true)
	testType.equal<NotEqual<unknown, unknown, 1, 2>, 2>(true)
	testType.equal<NotEqual<never, never, 1, 2>, 2>(true)
	testType.equal<NotEqual<void, void, 1, 2>, 2>(true)

	testType.equal<NotEqual<any, undefined, 1, 2>, 1>(true)
	testType.equal<NotEqual<unknown, undefined, 1, 2>, 1>(true)
	testType.equal<NotEqual<never, undefined, 1, 2>, 1>(true)
	testType.equal<NotEqual<void, undefined, 1, 2>, 1>(true)

	testType.equal<NotEqual<undefined, any, 1, 2>, 1>(true)
	testType.equal<NotEqual<undefined, unknown, 1, 2>, 1>(true)
	testType.equal<NotEqual<undefined, never, 1, 2>, 1>(true)
	testType.equal<NotEqual<undefined, void, 1, 2>, 1>(true)
})
