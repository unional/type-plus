import type { Equal, Head, NotEqual, ValueOf } from '../index.js'
import { testType } from '../index.js'

it('returns true when comparing primitive types with itself', () => {
	testType.true<Equal<boolean, boolean>>(true)
	testType.true<Equal<boolean, boolean>>(true)
	testType.true<Equal<number, number>>(true)
	testType.true<Equal<string, string>>(true)
	testType.true<Equal<symbol, symbol>>(true)
	testType.true<Equal<bigint, bigint>>(true)
	testType.true<Equal<Function, Function>>(true)
	testType.true<Equal<undefined, undefined>>(true)
	testType.true<Equal<null, null>>(true)
	testType.true<Equal<object, object>>(true)
})

it('returns false when comparing primitive types against each other', () => {
	testType.false<Equal<boolean, number>>(true)
	testType.false<Equal<boolean, string>>(true)
	testType.false<Equal<boolean, symbol>>(true)
	testType.false<Equal<boolean, bigint>>(true)
	testType.false<Equal<boolean, Function>>(true)
	testType.false<Equal<boolean, undefined>>(true)
	testType.false<Equal<boolean, null>>(true)
	testType.false<Equal<boolean, object>>(true)

	testType.false<Equal<number, boolean>>(true)
	testType.false<Equal<number, string>>(true)
	testType.false<Equal<number, symbol>>(true)
	testType.false<Equal<number, bigint>>(true)
	testType.false<Equal<number, Function>>(true)
	testType.false<Equal<number, undefined>>(true)
	testType.false<Equal<number, null>>(true)
	testType.false<Equal<number, object>>(true)

	testType.false<Equal<string, boolean>>(true)
	testType.false<Equal<string, number>>(true)
	testType.false<Equal<string, symbol>>(true)
	testType.false<Equal<string, bigint>>(true)
	testType.false<Equal<string, Function>>(true)
	testType.false<Equal<string, undefined>>(true)
	testType.false<Equal<string, null>>(true)
	testType.false<Equal<string, object>>(true)

	testType.false<Equal<symbol, boolean>>(true)
	testType.false<Equal<symbol, number>>(true)
	testType.false<Equal<symbol, string>>(true)
	testType.false<Equal<symbol, bigint>>(true)
	testType.false<Equal<symbol, Function>>(true)
	testType.false<Equal<symbol, undefined>>(true)
	testType.false<Equal<symbol, null>>(true)
	testType.false<Equal<symbol, object>>(true)

	testType.false<Equal<bigint, boolean>>(true)
	testType.false<Equal<bigint, number>>(true)
	testType.false<Equal<bigint, string>>(true)
	testType.false<Equal<bigint, symbol>>(true)
	testType.false<Equal<bigint, Function>>(true)
	testType.false<Equal<bigint, undefined>>(true)
	testType.false<Equal<bigint, null>>(true)
	testType.false<Equal<bigint, object>>(true)

	testType.false<Equal<Function, boolean>>(true)
	testType.false<Equal<Function, number>>(true)
	testType.false<Equal<Function, string>>(true)
	testType.false<Equal<Function, symbol>>(true)
	testType.false<Equal<Function, bigint>>(true)
	testType.false<Equal<Function, undefined>>(true)
	testType.false<Equal<Function, null>>(true)
	testType.false<Equal<Function, object>>(true)

	testType.false<Equal<undefined, boolean>>(true)
	testType.false<Equal<undefined, number>>(true)
	testType.false<Equal<undefined, string>>(true)
	testType.false<Equal<undefined, symbol>>(true)
	testType.false<Equal<undefined, bigint>>(true)
	testType.false<Equal<undefined, Function>>(true)
	testType.false<Equal<undefined, null>>(true)
	testType.false<Equal<undefined, object>>(true)

	testType.false<Equal<null, boolean>>(true)
	testType.false<Equal<null, number>>(true)
	testType.false<Equal<null, string>>(true)
	testType.false<Equal<null, symbol>>(true)
	testType.false<Equal<null, bigint>>(true)
	testType.false<Equal<null, Function>>(true)
	testType.false<Equal<null, undefined>>(true)
	testType.false<Equal<null, object>>(true)

	testType.false<Equal<object, boolean>>(true)
	testType.false<Equal<object, number>>(true)
	testType.false<Equal<object, string>>(true)
	testType.false<Equal<object, symbol>>(true)
	testType.false<Equal<object, bigint>>(true)
	testType.false<Equal<object, Function>>(true)
	testType.false<Equal<object, undefined>>(true)
	testType.false<Equal<object, null>>(true)

	testType.false<Equal<number, boolean>>(true)
	testType.false<Equal<string, boolean>>(true)
	testType.false<Equal<symbol, boolean>>(true)
	testType.false<Equal<bigint, boolean>>(true)
	testType.false<Equal<Function, boolean>>(true)
	testType.false<Equal<undefined, boolean>>(true)
	testType.false<Equal<null, boolean>>(true)
	testType.false<Equal<object, boolean>>(true)

	testType.false<Equal<boolean, number>>(true)
	testType.false<Equal<string, number>>(true)
	testType.false<Equal<symbol, number>>(true)
	testType.false<Equal<bigint, number>>(true)
	testType.false<Equal<Function, number>>(true)
	testType.false<Equal<undefined, number>>(true)
	testType.false<Equal<null, number>>(true)
	testType.false<Equal<object, number>>(true)

	testType.false<Equal<boolean, string>>(true)
	testType.false<Equal<number, string>>(true)
	testType.false<Equal<symbol, string>>(true)
	testType.false<Equal<bigint, string>>(true)
	testType.false<Equal<Function, string>>(true)
	testType.false<Equal<undefined, string>>(true)
	testType.false<Equal<null, string>>(true)
	testType.false<Equal<object, string>>(true)

	testType.false<Equal<boolean, symbol>>(true)
	testType.false<Equal<number, symbol>>(true)
	testType.false<Equal<string, symbol>>(true)
	testType.false<Equal<bigint, symbol>>(true)
	testType.false<Equal<Function, symbol>>(true)
	testType.false<Equal<undefined, symbol>>(true)
	testType.false<Equal<null, symbol>>(true)
	testType.false<Equal<object, symbol>>(true)

	testType.false<Equal<boolean, bigint>>(true)
	testType.false<Equal<number, bigint>>(true)
	testType.false<Equal<string, bigint>>(true)
	testType.false<Equal<symbol, bigint>>(true)
	testType.false<Equal<Function, bigint>>(true)
	testType.false<Equal<undefined, bigint>>(true)
	testType.false<Equal<null, bigint>>(true)
	testType.false<Equal<object, bigint>>(true)

	testType.false<Equal<boolean, Function>>(true)
	testType.false<Equal<number, Function>>(true)
	testType.false<Equal<string, Function>>(true)
	testType.false<Equal<symbol, Function>>(true)
	testType.false<Equal<bigint, Function>>(true)
	testType.false<Equal<undefined, Function>>(true)
	testType.false<Equal<null, Function>>(true)
	testType.false<Equal<object, Function>>(true)

	testType.false<Equal<boolean, undefined>>(true)
	testType.false<Equal<number, undefined>>(true)
	testType.false<Equal<string, undefined>>(true)
	testType.false<Equal<symbol, undefined>>(true)
	testType.false<Equal<bigint, undefined>>(true)
	testType.false<Equal<Function, undefined>>(true)
	testType.false<Equal<null, undefined>>(true)
	testType.false<Equal<object, undefined>>(true)

	testType.false<Equal<boolean, null>>(true)
	testType.false<Equal<number, null>>(true)
	testType.false<Equal<string, null>>(true)
	testType.false<Equal<symbol, null>>(true)
	testType.false<Equal<bigint, null>>(true)
	testType.false<Equal<Function, null>>(true)
	testType.false<Equal<undefined, null>>(true)
	testType.false<Equal<object, null>>(true)

	testType.false<Equal<boolean, object>>(true)
	testType.false<Equal<number, object>>(true)
	testType.false<Equal<string, object>>(true)
	testType.false<Equal<symbol, object>>(true)
	testType.false<Equal<bigint, object>>(true)
	testType.false<Equal<Function, object>>(true)
	testType.false<Equal<undefined, object>>(true)
	testType.false<Equal<null, object>>(true)
})

it('compares actual symbol', () => {
	const s = Symbol()
	testType.equal<typeof s, typeof s>(true)
	testType.equal<typeof s, symbol>(true)
})

it('compares never', () => {
	testType.true<Equal<never, never>>(true)
	testType.false<Equal<never, 1>>(true)
	testType.false<Equal<1, never>>(true)

	testType.false<Equal<undefined, never>>(true)
	testType.false<Equal<never, undefined>>(true)
	testType.false<Equal<never, NotEqual<never, ValueOf<string>>>>(true)
	testType.false<Equal<never, Equal<never, ValueOf<string>>>>(true)
})

it('compares void', () => {
	testType.true<Equal<void, void>>(true)
	testType.false<Equal<void, 1>>(true)
	testType.false<Equal<1, void>>(true)
})

it('compares unknown', () => {
	testType.true<Equal<unknown, unknown>>(true)
	testType.false<Equal<unknown, 1>>(true)
	testType.false<Equal<1, unknown>>(true)
})

it('compares any', () => {
	testType.true<Equal<any, any>>(true)
	testType.false<Equal<any, 1>>(true)
	testType.false<Equal<1, any>>(true)
})

it('compares any against never', () => {
	testType.false<Equal<any, never>>(true)
	testType.false<Equal<never, any>>(true)
})

it('compares boolean with literals', () => {
	testType.true<Equal<true, true>>(true)
	testType.true<Equal<false, false>>(true)
	testType.true<Equal<boolean, boolean>>(true)

	testType.false<Equal<true, false>>(true)
	testType.false<Equal<false, true>>(true)
})

it('compares boolean literal with others', () => {
	testType.false<Equal<true, undefined>>(true)
	testType.false<Equal<true, null>>(true)
	testType.false<Equal<true, number>>(true)
	testType.false<Equal<true, string>>(true)
	testType.false<Equal<true, symbol>>(true)
	testType.false<Equal<true, object>>(true)
	testType.false<Equal<true, Function>>(true)

	testType.false<Equal<false, undefined>>(true)
	testType.false<Equal<false, null>>(true)
	testType.false<Equal<false, number>>(true)
	testType.false<Equal<false, string>>(true)
	testType.false<Equal<false, symbol>>(true)
	testType.false<Equal<false, object>>(true)
	testType.false<Equal<false, Function>>(true)
})

test('literal is not equal to widen type', () => {
	testType.false<Equal<1, number>>(true)
	testType.false<Equal<number, 1>>(true)

	testType.false<Equal<'a', string>>(true)
	testType.false<Equal<string, 'a'>>(true)
})

test('same object is true', () => {
	testType.true<Equal<{ a: 1 }, { a: 1 }>>(true)
})

test('different object is false', () => {
	testType.false<Equal<{ a: 1 }, { b: 1 }>>(true)
})

test('object with any', () => {
	testType.false<Equal<{ a: any }, { a: 1 }>>(true)
	testType.false<Equal<{ a: 1 }, { a: any }>>(true)
	testType.true<Equal<{ a: any }, { a: any }>>(true)
})

test('A subset of B is false', () => {
	testType.false<Equal<{ a: 1 }, { a: 1; b: 1 }>>(true)
})

test('B subset of A is false', () => {
	testType.false<Equal<{ a: 1; b: 1 }, { a: 1 }>>(true)
})

test('disjoin is false', () => {
	testType.false<Equal<{ b: 1 }, { a: 1 }>>(true)
})

test('overlap is false', () => {
	testType.false<Equal<{ a: 1; b: 1 }, { a: 1; c: 2 }>>(true)
})

it('works against tuple', () => {
	testType.true<Equal<[1], [1]>>(true)
	testType.true<Equal<[1, 2], [1, 2]>>(true)
	testType.true<Equal<[any], [any]>>(true)

	testType.false<Equal<[any], [1]>>(true)
	testType.false<Equal<1, [1]>>(true)
	testType.false<Equal<[1], 1>>(true)
	testType.false<Equal<[1, 2], [2, 1]>>(true)

	testType.true<Equal<[never], [never]>>(true)
	testType.true<Equal<[any], [any]>>(true)
	testType.true<Equal<[unknown], [unknown]>>(true)
	testType.true<Equal<[void], [void]>>(true)

	testType.false<Equal<[any], [unknown]>>(true)
	testType.false<Equal<[any], [never]>>(true)
	testType.false<Equal<[any], [void]>>(true)
	testType.false<Equal<[never], [any]>>(true)
	testType.false<Equal<[never], [unknown]>>(true)
	testType.false<Equal<[never], [void]>>(true)
	testType.false<Equal<[unknown], [any]>>(true)
	testType.false<Equal<[unknown], [never]>>(true)
	testType.false<Equal<[unknown], [void]>>(true)

	testType.false<Equal<[void], [any]>>(true)
	testType.false<Equal<[void], [unknown]>>(true)
	testType.false<Equal<[void], [never]>>(true)

	testType.false<Equal<[any, number], [number, any]>>(true)
})

it('works with union types containing undefined', () => {
	testType.false<Equal<string | undefined, string | undefined | number>>(true)
})

it('works with union types containing symbol', () => {
	testType.false<Equal<string | symbol, string | symbol | number>>(true)
})

it('works with union of functions', () => {
	testType.true<
		Equal<
			((v: string) => string) | ((v: number) => number),
			((v: string) => string) | ((v: number) => number)
		>
	>(true)

	testType.false<Equal<(v: string) => string, ((v: string) => string) | ((v: number) => number)>>(true)
	testType.false<Equal<((v: string) => string) | ((v: number) => number), (v: string) => string>>(true)
})

it('detects liternal and widen type are different', () => {
	testType.false<Equal<1, number>>(true)
	testType.false<Equal<number, 1>>(true)
	testType.false<Equal<1 & { a: 1 }, number & { a: 1 }>>(true)
	testType.false<Equal<bigint & { a: 1 }, 1n & { a: 1 }>>(true)

	testType.true<Equal<1 & { a: 1 }, 1 & { a: 1 }>>(true)
})

it('works with intersect types', () => {
	testType.true<Equal<{ a: number; b: string }, { a: number } & { b: string }>>(true)
	testType.true<Equal<{ a: number } & { b: number }, { a: number; b: number }>>(true)
	testType.true<Equal<{ a: number; b?: string }, { a: number } & { b?: string }>>(true)
	testType.true<Equal<{ a: number } & { b?: string }, { a: number; b?: string }>>(true)

	testType.false<Equal<1 | 2, 1>>(true)
	testType.false<Equal<{ a: number } & { c: number }, { a: number; b: number }>>(true)
	testType.false<Equal<{ a: number; b: number }, { a: number } & { c: number }>>(true)
})

it('works with function overload', () => {
	function foo(v: string): string
	function foo(v: number): number
	function foo(v: unknown) {
		return v
	}
	type F = typeof foo

	testType.true<Equal<F, { (v: string): string; (v: number): number }>>(true)
	testType.false<Equal<F, { (v: string): string; (v: number): string }>>(true)

	testType.false<Equal<F, { (v: number): number }>>(true)
	testType.false<Equal<F, { (v: string): number }>>(true)

	testType.false<Equal<(x: 0, y: null) => void, (x: number, y: string) => void>>(true)
	testType.true<
		Equal<
			((x: 0, y: null) => void) & ((x: number, y: string) => void),
			((x: number, y: string) => void) & ((x: 0, y: null) => void)
		>
	>(true)
})

it('works with complex cases', () => {
	testType.true<Equal<1 | (number & {}), number>>(true)

	testType.false<Equal<void, null>>(true)
	testType.false<Equal<undefined, null>>(true)
	testType.false<Equal<() => void, () => undefined>>(true)

	type A = (() => 'foo') & (() => true)
	type B = (() => true) & (() => 'foo')

	testType.true<Equal<A, B>>(true)
	testType.true<Equal<A | B, B>>(true)

	testType.true<Equal<Head<[1, 2, 3]>, 1>>(true)
})

it('works with complext cases 2', () => {
	type A = () => 'foo'
	type B = () => 'foo'

	testType.true<Equal<A, B>>(true)
	testType.true<Equal<A | B, B>>(true)
})

it('works with intersect of the same type', () => {
	type P = { c: 1 } | { c: 1 }

	testType.true<Equal<P, { c: 1 }>>(true)
	testType.true<Equal<P, { c: 1 } | { c: 1 }>>(true)
	testType.true<Equal<P, { c: 1 } | { c: 1 } | { c: 1 }>>(true)
})

it('detect redonly', () => {
	testType.false<Equal<{ a: 1 }, { readonly a: 1 }>>(true)
})

it('works with deep any', () => {
	testType.true<
		Equal<{ a: { a: any; n: never; u: unknown; v: void } }, { a: { a: any; n: never; u: unknown; v: void } }>
	>(true)

	testType.false<
		Equal<{ a: { a: any; n: never; u: unknown; v: void } }, { a: { a: 1; n: never; u: unknown; v: void } }>
	>(true)

	testType.false<
		Equal<{ a: { a: any; n: never; u: unknown; v: void } }, { a: { a: any; n: 2; u: unknown; v: void } }>
	>(true)
	testType.false<
		Equal<{ a: { a: any; n: never; u: unknown; v: void } }, { a: { a: any; n: never; u: 3; v: void } }>
	>(true)
	testType.false<
		Equal<{ a: { a: any; n: never; u: unknown; v: void } }, { a: { a: any; n: never; u: unknown; v: 4 } }>
	>(true)
})

it('can override Then/Else', () => {
	testType.equal<Equal<any, any, 1, 2>, 1>(true)
	testType.equal<Equal<unknown, unknown, 1, 2>, 1>(true)
	testType.equal<Equal<never, never, 1, 2>, 1>(true)
	testType.equal<Equal<void, void, 1, 2>, 1>(true)

	testType.equal<Equal<any, undefined, 1, 2>, 2>(true)
	testType.equal<Equal<unknown, undefined, 1, 2>, 2>(true)
	testType.equal<Equal<never, undefined, 1, 2>, 2>(true)
	testType.equal<Equal<void, undefined, 1, 2>, 2>(true)

	testType.equal<Equal<undefined, any, 1, 2>, 2>(true)
	testType.equal<Equal<undefined, unknown, 1, 2>, 2>(true)
	testType.equal<Equal<undefined, never, 1, 2>, 2>(true)
	testType.equal<Equal<undefined, void, 1, 2>, 2>(true)
})
