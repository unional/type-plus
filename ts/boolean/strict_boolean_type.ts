import type { IsAnyOrNever } from '../any/any_or_never.js'

/**
 * Check if the type `T` is exactly `boolean`.
 *
 * ```ts
 * type R = StrictBooleanType<boolean> // true
 *
 * type R = StrictBooleanType<true> // never
 * type R = StrictBooleanType<false> // never
 * type R = StrictBooleanType<unknown> // never
 * ```
 */
export type StrictBooleanType<T, Then = T, Else = never> = IsAnyOrNever<
	T,
	Else,
	[T, boolean] extends [boolean, T] ? Then : Else
>

/**
 * Check if the type `T` is not exactly `boolean`.
 *
 * ```ts
 * type R = NotStrictBooleanType<boolean> // never
 *
 * type R = NotStrictBooleanType<true> // true
 * type R = NotStrictBooleanType<false> // false
 * type R = NotStrictBooleanType<unknown> // unknown
 * ```
 */
export type NotStrictBooleanType<T, Then = T, Else = never> = StrictBooleanType<T, Else, Then>

/**
 * Is the type `T` exactly `boolean`.
 *
 * ```ts
 * type R = IsStrictBoolean<boolean> // true
 *
 * type R = IsStrictBoolean<true> // false
 * type R = IsStrictBoolean<false> // true
 * type R = IsStrictBoolean<unknown> // false
 * ```
 */
export type IsStrictBoolean<T, Then = true, Else = false> = StrictBooleanType<T, Then, Else>

/**
 * Is the type `T` not exactly `false`.
 *
 * ```ts
 * type R = IsNotStrictBoolean<boolean> // false
 *
 * type R = IsNotStrictBoolean<true> // true
 * type R = IsNotStrictBoolean<false> // false
 * type R = IsNotStrictBoolean<unknown> // true
 * ```
 */
export type IsNotStrictBoolean<T, Then = true, Else = false> = StrictBooleanType<T, Else, Then>
