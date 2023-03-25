/**
 * Testing for `Equal` cannot use `isType.equal()` as it is using `Equal`.
 */

import { AnyFunction, assertType, IsEqual, isType, IsNotEqual } from '../index.js'

describe('Equal<A, B>', () => {
	it('compares among booleans', () => {
		assertType.isTrue(true as IsEqual<true, true>)
		assertType.isTrue(true as IsEqual<false, false>)
		assertType.isTrue(true as IsEqual<boolean, boolean>)

		assertType.isFalse(false as IsEqual<true, false>)
		assertType.isFalse(false as IsEqual<false, true>)
	})

	it('compares boolean with others', () => {
		assertType.isFalse(false as IsEqual<true, undefined>)
		assertType.isFalse(false as IsEqual<true, null>)
		assertType.isFalse(false as IsEqual<true, number>)
		assertType.isFalse(false as IsEqual<true, string>)
		assertType.isFalse(false as IsEqual<true, symbol>)
		assertType.isFalse(false as IsEqual<true, object>)
		assertType.isFalse(false as IsEqual<true, AnyFunction>)

		assertType.isFalse(false as IsEqual<false, undefined>)
		assertType.isFalse(false as IsEqual<false, null>)
		assertType.isFalse(false as IsEqual<false, number>)
		assertType.isFalse(false as IsEqual<false, string>)
		assertType.isFalse(false as IsEqual<false, symbol>)
		assertType.isFalse(false as IsEqual<false, object>)
		assertType.isFalse(false as IsEqual<false, AnyFunction>)
	})

	it('works with never', () => {
		assertType.isTrue(true as IsEqual<never, never>)
		assertType.isFalse(false as IsEqual<never, 1>)
		assertType.isFalse(false as IsEqual<never, any>)
		assertType.isFalse(false as IsEqual<1, never>)
		assertType.isFalse(false as IsEqual<any, never>)
	})

	test('not match', () => {
		assertType.isFalse(false as IsEqual<string, number>)
	})

	test('literal is not equal to widen type', () => {
		assertType.isFalse(false as IsEqual<1, number>)
		assertType.isFalse(false as IsEqual<number, 1>)
	})

	test('super set and sub set are not equal', () => {
		assertType.isFalse(false as IsEqual<{ a: 1 }, { a: 1; b: 2 }>)
		assertType.isFalse(false as IsEqual<{ a: 1; b: 2 }, { a: 1 }>)
	})

	test('boolean', () => {
		assertType.isTrue(true as IsEqual<boolean, boolean>)
		assertType.isTrue(true as IsEqual<true, true>)
		assertType.isTrue(true as IsEqual<false, false>)
		assertType.isFalse(false as IsEqual<boolean, true>)
		assertType.isFalse(false as IsEqual<true, boolean>)
		assertType.isFalse(false as IsEqual<boolean, false>)
		assertType.isFalse(false as IsEqual<false, boolean>)
		assertType.isFalse(false as IsEqual<false, true>)
		assertType.isFalse(false as IsEqual<true, false>)
	})

	test('same type is true', () => {
		assertType.isTrue(true as IsEqual<{ a: 1 }, { a: 1 }>)
	})

	test('different type is false', () => {
		assertType.isFalse(false as IsEqual<{ a: 1 }, { b: 1 }>)
	})

	test('A subset of B is false', () => {
		assertType.isFalse(false as IsEqual<{ a: 1 }, { a: 1; b: 1 }>)
	})

	test('B subset of A is false', () => {
		assertType.isFalse(false as IsEqual<{ a: 1; b: 1 }, { a: 1 }>)
	})

	test('disjoin is false', () => {
		assertType.isFalse(false as IsEqual<{ b: 1 }, { a: 1 }>)
	})

	test('overlap is false', () => {
		assertType.isFalse(false as IsEqual<{ a: 1; b: 1 }, { a: 1; c: 2 }>)
	})

	it('works with union types', () => {
		assertType.isTrue(true as IsEqual<{ a: number; b: string }, { a: number } & { b: string }>)
		assertType.isTrue(true as IsEqual<{ a: number; b?: string }, { a: number } & { b?: string }>)
	})

	it('works with never type', () => {
		assertType.isTrue(true as IsEqual<never, never>)
		assertType.isFalse(false as IsEqual<never, 1>)
		assertType.isFalse(false as IsEqual<1, never>)
	})

	it('works with union types containing undefined', () => {
		type A = IsEqual<string | undefined, string | undefined | number>
		assertType.isFalse(false as A)
	})

	it('works with union types containing symbol', () => {
		type A = IsEqual<string | symbol, string | symbol | number>
		assertType.isFalse(false as A)
	})

	it('works with intersect objects', () => {
		assertType.isTrue(true as IsEqual<{ a: number } & { b: number }, { a: number; b: number }>)
		assertType.isFalse(false as IsEqual<{ a: number } & { c: number }, { a: number; b: number }>)
	})

	it('works with union of functions', () => {
		assertType.isTrue(
			true as IsEqual<
				((v: string) => string) | ((v: number) => number),
				((v: string) => string) | ((v: number) => number)
			>
		)
		assertType.isFalse(
			false as IsEqual<(v: string) => string, ((v: string) => string) | ((v: number) => number)>
		)
		assertType.isFalse(
			false as IsEqual<((v: string) => string) | ((v: number) => number), (v: string) => string>
		)
	})

	it('works against any', () => {
		isType.equal<true, true, IsEqual<any, any>>()
		isType.equal<true, false, IsEqual<any, 1>>()
		isType.equal<true, false, IsEqual<1, any>>()
	})

	it('works against tuple', () => {
		isType.equal<true, true, IsEqual<[1], [1]>>()
		isType.equal<true, true, IsEqual<[1, 2], [1, 2]>>()
		isType.equal<true, true, IsEqual<[any], [any]>>()

		isType.equal<true, false, IsEqual<[any], [1]>>()
		isType.equal<true, false, IsEqual<1, [1]>>()
		isType.equal<true, false, IsEqual<[1], 1>>()
		isType.equal<true, false, IsEqual<[1, 2], [2, 1]>>()
	})

	it('works against function overload', () => {
		function foo(v: string): string
		function foo(v: number): number
		function foo(v: unknown) {
			return v
		}
		type F = typeof foo

		assertType.isTrue(
			true as IsEqual<
				F,
				{
					(v: string): string
					(v: number): number
				}
			>
		)
	})
})

describe('NotEqual<A, B>', () => {
	test('boolean', () => {
		assertType.isFalse(false as IsNotEqual<boolean, boolean>)
		assertType.isFalse(false as IsNotEqual<true, true>)
		assertType.isFalse(false as IsNotEqual<false, false>)
		assertType.isTrue(true as IsNotEqual<boolean, true>)
		assertType.isTrue(true as IsNotEqual<true, boolean>)
		assertType.isTrue(true as IsNotEqual<boolean, false>)
		assertType.isTrue(true as IsNotEqual<false, boolean>)
		assertType.isTrue(true as IsNotEqual<false, true>)
		assertType.isTrue(true as IsNotEqual<true, false>)
	})
	it('works with union types', () => {
		assertType.isFalse(false as IsNotEqual<{ a: number; b: string }, { a: number } & { b: string }>)
		assertType.isTrue(true as IsNotEqual<{ a: number; b: string }, { a: number } & { b?: string }>)
	})
	it('works with never type', () => {
		type A = IsNotEqual<never, never>
		assertType.isFalse(false as A)
		assertType.isTrue(true as IsNotEqual<never, 1>)
		// assertType.isFalse(false as Equal<never, NotEqual<never, ValueOf<string>>>)
	})
})
