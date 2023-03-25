import type { IsAny } from '../any/any_type.js'
import type { TupleType } from '../tuple/tuple_type.js'
import type { And, Or } from './logical.js'

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
	TupleType<A, true, false>,
	TupleType<B, true, false>
> extends true
	? (<G>() => G extends A ? 1 : 2) extends <G>() => G extends B ? 1 : 2
		? Then
		: Else
	: [A, B] extends [B, A]
	? And<IsAny<A>, IsAny<B>, Then, Or<IsAny<A>, IsAny<B>, Else, Then>>
	: Else

/**
 * Checks if the two types are equal.
 */
export type IsEqual<A, B, Then = true, Else = false> = Equal<A, B, Then, Else>

/**
 * Check if the two types are not equal
 */
export type NotEqual<A, B, Then = true, Else = false> = Equal<A, B, Else, Then>

/**
 * Check if the two types are not equal
 */
export type IsNotEqual<A, B, Then = true, Else = false> = NotEqual<A, B, Then, Else>
