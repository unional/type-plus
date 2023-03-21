import { AnyFunction, assertType, Equal, isType, NotEqual, ValueOf } from '../index.js'

describe('Equal<A, B>', () => {
	it('compares among booleans', () => {
		assertType.isTrue(true as Equal<true, true>)
		assertType.isTrue(true as Equal<false, false>)
		assertType.isTrue(true as Equal<boolean, boolean>)

		assertType.isFalse(false as Equal<true, false>)
		assertType.isFalse(false as Equal<false, true>)
	})
	it('compares boolean with others', () => {
		assertType.isFalse(false as Equal<true, undefined>)
		assertType.isFalse(false as Equal<true, null>)
		assertType.isFalse(false as Equal<true, number>)
		assertType.isFalse(false as Equal<true, string>)
		assertType.isFalse(false as Equal<true, symbol>)
		assertType.isFalse(false as Equal<true, object>)
		assertType.isFalse(false as Equal<true, AnyFunction>)

		assertType.isFalse(false as Equal<false, undefined>)
		assertType.isFalse(false as Equal<false, null>)
		assertType.isFalse(false as Equal<false, number>)
		assertType.isFalse(false as Equal<false, string>)
		assertType.isFalse(false as Equal<false, symbol>)
		assertType.isFalse(false as Equal<false, object>)
		assertType.isFalse(false as Equal<false, AnyFunction>)
	})

	test('not match', () => {
		assertType.isFalse(false as Equal<string, number>)
	})

	test('literal is not equal to widen type', () => {
		assertType.isFalse(false as Equal<1, number>)
		assertType.isFalse(false as Equal<number, 1>)
	})

	test('super set and sub set are not equal', () => {
		assertType.isFalse(false as Equal<{ a: 1 }, { a: 1; b: 2 }>)
		assertType.isFalse(false as Equal<{ a: 1; b: 2 }, { a: 1 }>)
	})

	test('boolean', () => {
		assertType.isTrue(true as Equal<boolean, boolean>)
		assertType.isTrue(true as Equal<true, true>)
		assertType.isTrue(true as Equal<false, false>)
		assertType.isFalse(false as Equal<boolean, true>)
		assertType.isFalse(false as Equal<true, boolean>)
		assertType.isFalse(false as Equal<boolean, false>)
		assertType.isFalse(false as Equal<false, boolean>)
		assertType.isFalse(false as Equal<false, true>)
		assertType.isFalse(false as Equal<true, false>)
	})

	test('same type is true', () => {
		assertType.isTrue(true as Equal<{ a: 1 }, { a: 1 }>)
	})

	test('different type is false', () => {
		assertType.isFalse(false as Equal<{ a: 1 }, { b: 1 }>)
	})

	test('A subset of B is false', () => {
		assertType.isFalse(false as Equal<{ a: 1 }, { a: 1; b: 1 }>)
	})

	test('B subset of A is false', () => {
		assertType.isFalse(false as Equal<{ a: 1; b: 1 }, { a: 1 }>)
	})

	test('disjoin is false', () => {
		assertType.isFalse(false as Equal<{ b: 1 }, { a: 1 }>)
	})

	test('overlap is false', () => {
		assertType.isFalse(false as Equal<{ a: 1; b: 1 }, { a: 1; c: 2 }>)
	})

	it('works with union types', () => {
		assertType.isTrue(true as Equal<{ a: number; b: string }, { a: number } & { b: string }>)
		assertType.isTrue(true as Equal<{ a: number; b?: string }, { a: number } & { b?: string }>)
	})

	it('works with never type', () => {
		assertType.isTrue(true as Equal<never, never>)
		assertType.isFalse(false as Equal<never, 1>)
		assertType.isFalse(false as Equal<1, never>)
	})

	it('works with union types containing undefined', () => {
		type A = Equal<string | undefined, string | undefined | number>
		assertType.isFalse(false as A)
	})

	it('works with union types containing symbol', () => {
		type A = Equal<string | symbol, string | symbol | number>
		assertType.isFalse(false as A)
	})

	it('works with intersect objects', () => {
		assertType.isTrue(true as Equal<{ a: number } & { b: number }, { a: number; b: number }>)
		assertType.isFalse(false as Equal<{ a: number } & { c: number }, { a: number; b: number }>)
	})

	it('works with union of functions', () => {
		assertType.isTrue(
			true as Equal<
				((v: string) => string) | ((v: number) => number),
				((v: string) => string) | ((v: number) => number)
			>
		)
		assertType.isFalse(
			false as Equal<(v: string) => string, ((v: string) => string) | ((v: number) => number)>
		)
		assertType.isFalse(
			false as Equal<((v: string) => string) | ((v: number) => number), (v: string) => string>
		)
	})

	it('works against any', () => {
		isType.equal<true, true, Equal<any, any>>()
		isType.equal<true, false, Equal<any, 1>>()
		isType.equal<true, false, Equal<1, any>>()
	})

	it('works agains tuple', () => {
		isType.equal<true, true, Equal<[1], [1]>>()
		isType.equal<true, true, Equal<[1, 2], [1, 2]>>()
		isType.equal<true, true, Equal<[any], [any]>>()

		isType.equal<true, false, Equal<[any], [1]>>()
		isType.equal<true, false, Equal<1, [1]>>()
		isType.equal<true, false, Equal<[1], 1>>()
		isType.equal<true, false, Equal<[1, 2], [2, 1]>>()
	})

	it('works against function overload', () => {
		function foo(v: string): string
		function foo(v: number): number
		function foo(v: unknown) {
			return v
		}
		type F = typeof foo

		assertType.isTrue(
			true as Equal<
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
		assertType.isFalse(false as NotEqual<boolean, boolean>)
		assertType.isFalse(false as NotEqual<true, true>)
		assertType.isFalse(false as NotEqual<false, false>)
		assertType.isTrue(true as NotEqual<boolean, true>)
		assertType.isTrue(true as NotEqual<true, boolean>)
		assertType.isTrue(true as NotEqual<boolean, false>)
		assertType.isTrue(true as NotEqual<false, boolean>)
		assertType.isTrue(true as NotEqual<false, true>)
		assertType.isTrue(true as NotEqual<true, false>)
	})
	it('works with union types', () => {
		assertType.isFalse(false as NotEqual<{ a: number; b: string }, { a: number } & { b: string }>)
		assertType.isTrue(true as NotEqual<{ a: number; b: string }, { a: number } & { b?: string }>)
	})
	it('works with never type', () => {
		type A = NotEqual<never, never>
		assertType.isFalse(false as A)
		assertType.isTrue(true as NotEqual<never, 1>)
		assertType.isFalse(false as Equal<never, NotEqual<never, ValueOf<string>>>)
	})
})
