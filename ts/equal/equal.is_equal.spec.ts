import type { Equal, Head, NotEqual, ValueOf } from '../index.js'
import { type } from '../index.js'

it('returns true when comparing primitive types with itself', () => {
	type.true<Equal<boolean, boolean>>(true)
	type.true<Equal<boolean, boolean>>(true)
	type.true<Equal<number, number>>(true)
	type.true<Equal<string, string>>(true)
	type.true<Equal<symbol, symbol>>(true)
	type.true<Equal<bigint, bigint>>(true)
	type.true<Equal<Function, Function>>(true)
	type.true<Equal<undefined, undefined>>(true)
	type.true<Equal<null, null>>(true)
	type.true<Equal<object, object>>(true)
})

it('returns false when comparing primitive types against each other', () => {
	type.false<Equal<boolean, number>>(true)
	type.false<Equal<boolean, string>>(true)
	type.false<Equal<boolean, symbol>>(true)
	type.false<Equal<boolean, bigint>>(true)
	type.false<Equal<boolean, Function>>(true)
	type.false<Equal<boolean, undefined>>(true)
	type.false<Equal<boolean, null>>(true)
	type.false<Equal<boolean, object>>(true)

	type.false<Equal<number, boolean>>(true)
	type.false<Equal<number, string>>(true)
	type.false<Equal<number, symbol>>(true)
	type.false<Equal<number, bigint>>(true)
	type.false<Equal<number, Function>>(true)
	type.false<Equal<number, undefined>>(true)
	type.false<Equal<number, null>>(true)
	type.false<Equal<number, object>>(true)

	type.false<Equal<string, boolean>>(true)
	type.false<Equal<string, number>>(true)
	type.false<Equal<string, symbol>>(true)
	type.false<Equal<string, bigint>>(true)
	type.false<Equal<string, Function>>(true)
	type.false<Equal<string, undefined>>(true)
	type.false<Equal<string, null>>(true)
	type.false<Equal<string, object>>(true)

	type.false<Equal<symbol, boolean>>(true)
	type.false<Equal<symbol, number>>(true)
	type.false<Equal<symbol, string>>(true)
	type.false<Equal<symbol, bigint>>(true)
	type.false<Equal<symbol, Function>>(true)
	type.false<Equal<symbol, undefined>>(true)
	type.false<Equal<symbol, null>>(true)
	type.false<Equal<symbol, object>>(true)

	type.false<Equal<bigint, boolean>>(true)
	type.false<Equal<bigint, number>>(true)
	type.false<Equal<bigint, string>>(true)
	type.false<Equal<bigint, symbol>>(true)
	type.false<Equal<bigint, Function>>(true)
	type.false<Equal<bigint, undefined>>(true)
	type.false<Equal<bigint, null>>(true)
	type.false<Equal<bigint, object>>(true)

	type.false<Equal<Function, boolean>>(true)
	type.false<Equal<Function, number>>(true)
	type.false<Equal<Function, string>>(true)
	type.false<Equal<Function, symbol>>(true)
	type.false<Equal<Function, bigint>>(true)
	type.false<Equal<Function, undefined>>(true)
	type.false<Equal<Function, null>>(true)
	type.false<Equal<Function, object>>(true)

	type.false<Equal<undefined, boolean>>(true)
	type.false<Equal<undefined, number>>(true)
	type.false<Equal<undefined, string>>(true)
	type.false<Equal<undefined, symbol>>(true)
	type.false<Equal<undefined, bigint>>(true)
	type.false<Equal<undefined, Function>>(true)
	type.false<Equal<undefined, null>>(true)
	type.false<Equal<undefined, object>>(true)

	type.false<Equal<null, boolean>>(true)
	type.false<Equal<null, number>>(true)
	type.false<Equal<null, string>>(true)
	type.false<Equal<null, symbol>>(true)
	type.false<Equal<null, bigint>>(true)
	type.false<Equal<null, Function>>(true)
	type.false<Equal<null, undefined>>(true)
	type.false<Equal<null, object>>(true)

	type.false<Equal<object, boolean>>(true)
	type.false<Equal<object, number>>(true)
	type.false<Equal<object, string>>(true)
	type.false<Equal<object, symbol>>(true)
	type.false<Equal<object, bigint>>(true)
	type.false<Equal<object, Function>>(true)
	type.false<Equal<object, undefined>>(true)
	type.false<Equal<object, null>>(true)

	type.false<Equal<number, boolean>>(true)
	type.false<Equal<string, boolean>>(true)
	type.false<Equal<symbol, boolean>>(true)
	type.false<Equal<bigint, boolean>>(true)
	type.false<Equal<Function, boolean>>(true)
	type.false<Equal<undefined, boolean>>(true)
	type.false<Equal<null, boolean>>(true)
	type.false<Equal<object, boolean>>(true)

	type.false<Equal<boolean, number>>(true)
	type.false<Equal<string, number>>(true)
	type.false<Equal<symbol, number>>(true)
	type.false<Equal<bigint, number>>(true)
	type.false<Equal<Function, number>>(true)
	type.false<Equal<undefined, number>>(true)
	type.false<Equal<null, number>>(true)
	type.false<Equal<object, number>>(true)

	type.false<Equal<boolean, string>>(true)
	type.false<Equal<number, string>>(true)
	type.false<Equal<symbol, string>>(true)
	type.false<Equal<bigint, string>>(true)
	type.false<Equal<Function, string>>(true)
	type.false<Equal<undefined, string>>(true)
	type.false<Equal<null, string>>(true)
	type.false<Equal<object, string>>(true)

	type.false<Equal<boolean, symbol>>(true)
	type.false<Equal<number, symbol>>(true)
	type.false<Equal<string, symbol>>(true)
	type.false<Equal<bigint, symbol>>(true)
	type.false<Equal<Function, symbol>>(true)
	type.false<Equal<undefined, symbol>>(true)
	type.false<Equal<null, symbol>>(true)
	type.false<Equal<object, symbol>>(true)

	type.false<Equal<boolean, bigint>>(true)
	type.false<Equal<number, bigint>>(true)
	type.false<Equal<string, bigint>>(true)
	type.false<Equal<symbol, bigint>>(true)
	type.false<Equal<Function, bigint>>(true)
	type.false<Equal<undefined, bigint>>(true)
	type.false<Equal<null, bigint>>(true)
	type.false<Equal<object, bigint>>(true)

	type.false<Equal<boolean, Function>>(true)
	type.false<Equal<number, Function>>(true)
	type.false<Equal<string, Function>>(true)
	type.false<Equal<symbol, Function>>(true)
	type.false<Equal<bigint, Function>>(true)
	type.false<Equal<undefined, Function>>(true)
	type.false<Equal<null, Function>>(true)
	type.false<Equal<object, Function>>(true)

	type.false<Equal<boolean, undefined>>(true)
	type.false<Equal<number, undefined>>(true)
	type.false<Equal<string, undefined>>(true)
	type.false<Equal<symbol, undefined>>(true)
	type.false<Equal<bigint, undefined>>(true)
	type.false<Equal<Function, undefined>>(true)
	type.false<Equal<null, undefined>>(true)
	type.false<Equal<object, undefined>>(true)

	type.false<Equal<boolean, null>>(true)
	type.false<Equal<number, null>>(true)
	type.false<Equal<string, null>>(true)
	type.false<Equal<symbol, null>>(true)
	type.false<Equal<bigint, null>>(true)
	type.false<Equal<Function, null>>(true)
	type.false<Equal<undefined, null>>(true)
	type.false<Equal<object, null>>(true)

	type.false<Equal<boolean, object>>(true)
	type.false<Equal<number, object>>(true)
	type.false<Equal<string, object>>(true)
	type.false<Equal<symbol, object>>(true)
	type.false<Equal<bigint, object>>(true)
	type.false<Equal<Function, object>>(true)
	type.false<Equal<undefined, object>>(true)
	type.false<Equal<null, object>>(true)
})

it('compares actual symbol', () => {
	const s = Symbol()
	type.equal<typeof s, typeof s>(true)
	type.equal<typeof s, symbol>(true)
})

it('compares never', () => {
	type.true<Equal<never, never>>(true)
	type.false<Equal<never, 1>>(true)
	type.false<Equal<1, never>>(true)

	type.false<Equal<undefined, never>>(true)
	type.false<Equal<never, undefined>>(true)
	type.false<Equal<never, NotEqual<never, ValueOf<string>>>>(true)
	type.false<Equal<never, Equal<never, ValueOf<string>>>>(true)
})

it('compares void', () => {
	type.true<Equal<void, void>>(true)
	type.false<Equal<void, 1>>(true)
	type.false<Equal<1, void>>(true)
})

it('compares unknown', () => {
	type.true<Equal<unknown, unknown>>(true)
	type.false<Equal<unknown, 1>>(true)
	type.false<Equal<1, unknown>>(true)
})

it('compares any', () => {
	type.true<Equal<any, any>>(true)
	type.false<Equal<any, 1>>(true)
	type.false<Equal<1, any>>(true)
})

it('compares any against never', () => {
	type.false<Equal<any, never>>(true)
	type.false<Equal<never, any>>(true)
})

it('compares boolean with literals', () => {
	type.true<Equal<true, true>>(true)
	type.true<Equal<false, false>>(true)
	type.true<Equal<boolean, boolean>>(true)

	type.false<Equal<true, false>>(true)
	type.false<Equal<false, true>>(true)
})

it('compares boolean literal with others', () => {
	type.false<Equal<true, undefined>>(true)
	type.false<Equal<true, null>>(true)
	type.false<Equal<true, number>>(true)
	type.false<Equal<true, string>>(true)
	type.false<Equal<true, symbol>>(true)
	type.false<Equal<true, object>>(true)
	type.false<Equal<true, Function>>(true)

	type.false<Equal<false, undefined>>(true)
	type.false<Equal<false, null>>(true)
	type.false<Equal<false, number>>(true)
	type.false<Equal<false, string>>(true)
	type.false<Equal<false, symbol>>(true)
	type.false<Equal<false, object>>(true)
	type.false<Equal<false, Function>>(true)
})

test('literal is not equal to widen type', () => {
	type.false<Equal<1, number>>(true)
	type.false<Equal<number, 1>>(true)

	type.false<Equal<'a', string>>(true)
	type.false<Equal<string, 'a'>>(true)
})

test('same object is true', () => {
	type.true<Equal<{ a: 1 }, { a: 1 }>>(true)
})

test('different object is false', () => {
	type.false<Equal<{ a: 1 }, { b: 1 }>>(true)
})

test('object with any', () => {
	type.false<Equal<{ a: any }, { a: 1 }>>(true)
	type.false<Equal<{ a: 1 }, { a: any }>>(true)
	type.true<Equal<{ a: any }, { a: any }>>(true)
})

test('A subset of B is false', () => {
	type.false<Equal<{ a: 1 }, { a: 1; b: 1 }>>(true)
})

test('B subset of A is false', () => {
	type.false<Equal<{ a: 1; b: 1 }, { a: 1 }>>(true)
})

test('disjoin is false', () => {
	type.false<Equal<{ b: 1 }, { a: 1 }>>(true)
})

test('overlap is false', () => {
	type.false<Equal<{ a: 1; b: 1 }, { a: 1; c: 2 }>>(true)
})

it('works against tuple', () => {
	type.true<Equal<[1], [1]>>(true)
	type.true<Equal<[1, 2], [1, 2]>>(true)
	type.true<Equal<[any], [any]>>(true)

	type.false<Equal<[any], [1]>>(true)
	type.false<Equal<1, [1]>>(true)
	type.false<Equal<[1], 1>>(true)
	type.false<Equal<[1, 2], [2, 1]>>(true)

	type.true<Equal<[never], [never]>>(true)
	type.true<Equal<[any], [any]>>(true)
	type.true<Equal<[unknown], [unknown]>>(true)
	type.true<Equal<[void], [void]>>(true)

	type.false<Equal<[any], [unknown]>>(true)
	type.false<Equal<[any], [never]>>(true)
	type.false<Equal<[any], [void]>>(true)
	type.false<Equal<[never], [any]>>(true)
	type.false<Equal<[never], [unknown]>>(true)
	type.false<Equal<[never], [void]>>(true)
	type.false<Equal<[unknown], [any]>>(true)
	type.false<Equal<[unknown], [never]>>(true)
	type.false<Equal<[unknown], [void]>>(true)

	type.false<Equal<[void], [any]>>(true)
	type.false<Equal<[void], [unknown]>>(true)
	type.false<Equal<[void], [never]>>(true)

	type.false<Equal<[any, number], [number, any]>>(true)
})

it('works with union types containing undefined', () => {
	type.false<Equal<string | undefined, string | undefined | number>>(true)
})

it('works with union types containing symbol', () => {
	type.false<Equal<string | symbol, string | symbol | number>>(true)
})

it('works with union of functions', () => {
	type.true<
		Equal<
			((v: string) => string) | ((v: number) => number),
			((v: string) => string) | ((v: number) => number)
		>
	>(true)

	type.false<Equal<(v: string) => string, ((v: string) => string) | ((v: number) => number)>>(true)
	type.false<Equal<((v: string) => string) | ((v: number) => number), (v: string) => string>>(true)
})

it('detects liternal and widen type are different', () => {
	type.false<Equal<1, number>>(true)
	type.false<Equal<number, 1>>(true)
	type.false<Equal<1 & { a: 1 }, number & { a: 1 }>>(true)
	type.false<Equal<bigint & { a: 1 }, 1n & { a: 1 }>>(true)

	type.true<Equal<1 & { a: 1 }, 1 & { a: 1 }>>(true)
})

it('works with intersect types', () => {
	type.true<Equal<{ a: number; b: string }, { a: number } & { b: string }>>(true)
	type.true<Equal<{ a: number } & { b: number }, { a: number; b: number }>>(true)
	type.true<Equal<{ a: number; b?: string }, { a: number } & { b?: string }>>(true)
	type.true<Equal<{ a: number } & { b?: string }, { a: number; b?: string }>>(true)

	type.false<Equal<1 | 2, 1>>(true)
	type.false<Equal<{ a: number } & { c: number }, { a: number; b: number }>>(true)
	type.false<Equal<{ a: number; b: number }, { a: number } & { c: number }>>(true)
})

it('works with function overload', () => {
	function foo(v: string): string
	function foo(v: number): number
	function foo(v: unknown) {
		return v
	}
	type F = typeof foo

	type.true<Equal<F, { (v: string): string; (v: number): number }>>(true)
	type.false<Equal<F, { (v: string): string; (v: number): string }>>(true)

	type.false<Equal<F, { (v: number): number }>>(true)
	type.false<Equal<F, { (v: string): number }>>(true)

	type.false<Equal<(x: 0, y: null) => void, (x: number, y: string) => void>>(true)
	type.true<
		Equal<
			((x: 0, y: null) => void) & ((x: number, y: string) => void),
			((x: number, y: string) => void) & ((x: 0, y: null) => void)
		>
	>(true)
})

it('works with complex cases', () => {
	type.true<Equal<1 | (number & {}), number>>(true)

	type.false<Equal<void, null>>(true)
	type.false<Equal<undefined, null>>(true)
	type.false<Equal<() => void, () => undefined>>(true)

	type A = (() => 'foo') & (() => true)
	type B = (() => true) & (() => 'foo')

	type.true<Equal<A, B>>(true)
	type.true<Equal<A | B, B>>(true)

	type.true<Equal<Head<[1, 2, 3]>, 1>>(true)
})

it('works with complext cases 2', () => {
	type A = () => 'foo'
	type B = () => 'foo'

	type.true<Equal<A, B>>(true)
	type.true<Equal<A | B, B>>(true)
})

it('works with intersect of the same type', () => {
	type P = { c: 1 } | { c: 1 }

	type.true<Equal<P, { c: 1 }>>(true)
	type.true<Equal<P, { c: 1 } | { c: 1 }>>(true)
	type.true<Equal<P, { c: 1 } | { c: 1 } | { c: 1 }>>(true)
})

it('detect redonly', () => {
	type.false<Equal<{ a: 1 }, { readonly a: 1 }>>(true)
})

it('works with deep any', () => {
	type.true<
		Equal<{ a: { a: any; n: never; u: unknown; v: void } }, { a: { a: any; n: never; u: unknown; v: void } }>
	>(true)

	type.false<
		Equal<{ a: { a: any; n: never; u: unknown; v: void } }, { a: { a: 1; n: never; u: unknown; v: void } }>
	>(true)

	type.false<
		Equal<{ a: { a: any; n: never; u: unknown; v: void } }, { a: { a: any; n: 2; u: unknown; v: void } }>
	>(true)
	type.false<
		Equal<{ a: { a: any; n: never; u: unknown; v: void } }, { a: { a: any; n: never; u: 3; v: void } }>
	>(true)
	type.false<
		Equal<{ a: { a: any; n: never; u: unknown; v: void } }, { a: { a: any; n: never; u: unknown; v: 4 } }>
	>(true)
})

it('can override Then/Else', () => {
	type.equal<Equal<any, any, 1, 2>, 1>(true)
	type.equal<Equal<unknown, unknown, 1, 2>, 1>(true)
	type.equal<Equal<never, never, 1, 2>, 1>(true)
	type.equal<Equal<void, void, 1, 2>, 1>(true)

	type.equal<Equal<any, undefined, 1, 2>, 2>(true)
	type.equal<Equal<unknown, undefined, 1, 2>, 2>(true)
	type.equal<Equal<never, undefined, 1, 2>, 2>(true)
	type.equal<Equal<void, undefined, 1, 2>, 2>(true)

	type.equal<Equal<undefined, any, 1, 2>, 2>(true)
	type.equal<Equal<undefined, unknown, 1, 2>, 2>(true)
	type.equal<Equal<undefined, never, 1, 2>, 2>(true)
	type.equal<Equal<undefined, void, 1, 2>, 2>(true)
})
