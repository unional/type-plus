import type { IsFunction } from '../function/function_type.js'
import type { IsObject } from '../object/object.js'
import type { Properties } from '../object/properties.js'
import type { And, Or } from '../predicates/logical.js'
import type { IsAny } from '../any/any_type.js'
import type { IsNever } from '../never/never.js'

/**
 * Checks `A` and `B` are equal.
 *
 * ```ts
 * import { type Equal } from 'type-plus'
 *
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
export type Equal<A, B, Then = true, Else = false> = And<
	IsNever<A>,
	IsNever<B>,
	Then,
	Or<
		IsNever<A>,
		IsNever<B>,
		Else,
		And<
			IsAny<A>,
			IsAny<B>,
			Then,
			Or<
				IsAny<A>,
				IsAny<B>,
				Else,
				And<
					IsObject<A>,
					IsObject<B>,
					And<
						IsFunction<A>,
						IsFunction<B>,
						[A, B] extends [B, A] ? Then : Else,
						(<_>() => _ extends (Properties<A> & _) | _ ? 1 : 2) extends <_>() => _ extends
							| (Properties<B> & _)
							| _
							? 1
							: 2
							? Then
							: Else
					>,
					[A, B] extends [B, A] ? Then : Else
				>
			>
		>
	>
>

/**
 * Is `A` and `B` equals.
 *
 * ```ts
 * import { type IsEqual } from 'type-plus'
 *
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
 */
export type IsEqual<A, B, Then = true, Else = false> = Equal<A, B, Then, Else>

/**
 * Checks `A` and `B` are not equal.
 *
 * ```ts
 * import { type NotEqual } from 'type-plus'
 *
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
export type NotEqual<A, B, Then = true, Else = false> = Equal<A, B, Else, Then>

/**
 * If `A` and `B` are not equal.
 *
 * ```ts
 * import { type IsNotEqual } from 'type-plus'
 *
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
 */
export type IsNotEqual<A, B, Then = true, Else = false> = IsEqual<A, B, Else, Then>
