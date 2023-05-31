import type { IsAnyOrNever } from '../mix_types/any_or_never_type.js'

/**
 * Check if the type `T` is exactly `false`.
 *
 * ```ts
 * type R = FalseType<false> // false
 *
 * type R = FalseType<true> // never
 * type R = FalseType<unknown> // never
 * ```
 */
export type FalseType<T, Then = T, Else = never> = IsAnyOrNever<
	T,
	Else,
	[T, false] extends [false, T] ? Then : Else
>

/**
 * Check if the type `T` is not exactly `false`.
 *
 * ```ts
 * type R = NotFalseType<false> // never
 *
 * type R = NotFalseType<true> // true
 * type R = NotFalseType<unknown> // unknown
 * ```
 */
export type NotFalseType<T, Then = T, Else = never> = FalseType<T, Else, Then>

/**
 * Is the type `T` exactly `false`.
 *
 * ```ts
 * type R = IsFalse<false> // true
 *
 * type R = IsFalse<true> // false
 * type R = IsFalse<unknown> // false
 * ```
 */
export type IsFalse<T, Then = true, Else = false> = FalseType<T, Then, Else>

/**
 * Is the type `T` not exactly `false`.
 *
 * ```ts
 * type R = IsNotFalse<false> // false
 *
 * type R = IsNotFalse<true> // true
 * type R = IsNotFalse<unknown> // true
 * ```
 */
export type IsNotFalse<T, Then = true, Else = false> = FalseType<T, Else, Then>
