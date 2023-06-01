import type { IsAnyOrNever } from '../mix_types/any_or_never_type.js'

/**
 * Check if the type `T` is exactly `bigint`.
 *
 * ```ts
 * type R = StrictBigintType<bigint> // bigint
 *
 * type R = StrictBigintType<1n> // never
 * type R = StrictBigintType<number> // never
 * type R = StrictBigintType<bigint | boolean> // never
 * type R = StrictBigintType<unknown> // never
 * ```
 */
export type StrictBigintType<T, Then = T, Else = never> = IsAnyOrNever<
	T,
	Else,
	[bigint] extends [T] ? ([T] extends [bigint] ? (`${T}` extends `${number}` ? Else : Then) : Else) : Else
>

/**
 * Is the type `T` exactly `bigint`.
 *
 * ```ts
 * type R = IsStrictBigint<bigint> // true
 *
 * type R = IsStrictBigint<1n> // false
 * type R = IsStrictBigint<number> // false
 * type R = IsStrictBigint<bigint | boolean> // false
 * type R = IsStrictBigint<unknown> // false
 * ```
 */
export type IsStrictBigint<T, Then = true, Else = false> = StrictBigintType<T, Then, Else>

/**
 * Check if the type `T` is not exactly `bigint`.
 *
 * ```ts
 * type R = NotStrictBigintType<bigint> // never
 *
 * type R = NotStrictBigintType<1n> // 1n
 * type R = NotStrictBigintType<number> // number
 * type R = NotStrictBigintType<bigint | boolean> // string | boolean
 * type R = NotStrictBigintType<unknown> // unknown
 * ```
 */
export type NotStrictBigintType<T, Then = T, Else = never> = StrictBigintType<T, Else, Then>

/**
 * Is the type `T` not exactly `bigint`.
 *
 * ```ts
 * type R = IsNotStrictBigint<bigint> // false
 *
 * type R = IsNotStrictBigint<1n> // true
 * type R = IsNotStrictBigint<number> // true
 * type R = IsNotStrictBigint<bigint | boolean> // true
 * type R = IsNotStrictBigint<unknown> // true
 * ```
 */
export type IsNotStrictBigint<T, Then = true, Else = false> = StrictBigintType<T, Else, Then>
