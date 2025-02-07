import type { IsAny } from '../any/is_any.js'
import type { IsNever } from '../never/is_never.js'
import type { IsObject } from '../object/is_object.js'
import type { Properties } from '../object/properties.js'
import type { And, Or } from '../predicates/logical.js'
import type { IsSymbol } from '../symbol/is_symbol.js'
import type { IdentityEqual } from './identity_equal.js'

type BothNever<A, B, Both, One, None> = And<IsNever<A>, IsNever<B>, Both, Or<IsNever<A>, IsNever<B>, One, None>>

type BothAny<A, B, Both, One, None> = And<IsAny<A>, IsAny<B>, Both, Or<IsAny<A>, IsAny<B>, One, None>>

/**
 * Checks `A` and `B` are equal.
 *
 * ```ts
 * type R = IsEqual<1, 1> // true
 * type R = IsEqual<any, any> // true
 * type R = IsEqual<boolean, boolean> // true
 * type R = IsEqual<true, true> // true
 * type R = IsEqual<[1], [1]> // true
 *
 * type R = IsEqual<boolean, true> // false
 * type R = IsEqual<any, 1> // false
 * type R = IsEqual<[any], [1]> // false
 * type R = IsEqual<{ a: 1 }, { a: 1; b: 2 }> // false
 * ```
 *
 * Note that intersection type checks only works at first level.
 * It cannot be check recursively,
 * or else will run into infinite recursion if the type includes recursive types.
 */
export type IsEqual<A, B, Then = true, Else = false> = [A, B] extends [B, A]
	? BothNever<
			A,
			B,
			Then,
			Else,
			BothAny<
				A,
				B,
				Then,
				Else,
				IdentityEqual<
					A,
					B,
					Then,
					And<
						IsObject<A>,
						IsObject<B>,
						IdentityEqual<
							Properties<A>,
							Properties<B>,
							[A, B] extends [(...args: infer P1) => any, (...args: infer P2) => any]
								? IsEqual<P1, P2, Then, Else>
								: Then,
							Else
						>,
						// `A` and `B` are narrowed, need to check again.
						// This is fixed in TS 5.0.2, but keeping it to support older versions.
						[A, B] extends [B, A] ? Then : Else
					>
				>
			>
		>
	: And<IsSymbol<A, { distributive: false }>, IsSymbol<B, { distributive: false }>, Then, Else>

/**
 * Checks `A` and `B` are not equal.
 *
 * ```ts
 * type R = IsNotEqual<1, 1> // false
 * type R = IsNotEqual<any, any> // false
 * type R = IsNotEqual<boolean, boolean> // false
 * type R = IsNotEqual<true, true> // false
 * type R = IsNotEqual<[1], [1]> // false
 *
 * type R = IsNotEqual<boolean, true> // true
 * type R = IsNotEqual<any, 1> // true
 * type R = IsNotEqual<[any], [1]> // true
 * type R = IsNotEqual<{ a: 1 }, { a: 1; b: 2 }> // true
 * ```
 *
 * Note that intersection type checks only works at first level.
 * It cannot be check recursively,
 * or else will run into infinite recursion if the type includes recursive types.
 */
export type IsNotEqual<A, B, Then = true, Else = false> = IsEqual<A, B, Else, Then>

/**
 * Checks `A` and `B` are equal.
 *
 * @deprecated this will be changed to `filter` variant in the future.
 * Please use `IsEqual` for the `predicate` behavior.
 *
 * ```ts
 * type R = Equal<1, 1> // true
 * type R = Equal<any, any> // true
 * type R = Equal<boolean, boolean> // true
 * type R = Equal<true, true> // true
 * type R = Equal<[1], [1]> // true
 *
 * type R = Equal<boolean, true> // false
 * type R = Equal<any, 1> // false
 * type R = Equal<[any], [1]> // false
 * type R = Equal<{ a: 1 }, { a: 1; b: 2 }> // false
 * ```
 */
export type Equal<A, B, Then = true, Else = false> = IsEqual<A, B, Then, Else>

/**
 * Checks `A` and `B` are not equal.
 *
 * @deprecated this will be changed to `filter` variant in the future.
 * Please use `IsNotEqual` for the `predicate` behavior.
 *
 * ```ts
 * type R = NotEqual<1, 1> // false
 * type R = NotEqual<any, any> // false
 * type R = NotEqual<boolean, boolean> // false
 * type R = NotEqual<true, true> // false
 * type R = NotEqual<[1], [1]> // false
 *
 * type R = NotEqual<boolean, true> // true
 * type R = NotEqual<any, 1> // true
 * type R = NotEqual<[any], [1]> // true
 * type R = NotEqual<{ a: 1 }, { a: 1; b: 2 }> // true
 * ```
 */
export type NotEqual<A, B, Then = true, Else = false> = IsNotEqual<A, B, Then, Else>
