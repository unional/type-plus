import type { IsAny } from '../any/any_type.js'

/**
 * Check if the type `T` is exactly `unknown`.
 *
 * ```
 * import type { UnknownType } from 'type-plus'
 *
 * type R = UnknownType<unknown> // unknown
 *
 * type R = UnknownType<number> // never
 * type R = UnknownType<never> // never
 * ```
 */
export type UnknownType<T, Then = T, Else = never> = IsAny<
	T,
	Else,
	[T, unknown] extends [unknown, T] ? Then : Else
>

/**
 * Is the type `T` exactly `unknown`.
 *
 * ```
 * import type { IsUnknown } from 'type-plus'
 *
 * type R = IsUnknown<unknown> // true
 *
 * type R = IsUnknown<number> // false
 * type R = IsUnknown<never> // false
 * ```
 */
export type IsUnknown<T, Then = true, Else = false> = UnknownType<T, Then, Else>

/**
 * Check if the type `T` is not `unknown`.
 *
 * ```
 * import type { NotUnknownType } from 'type-plus'
 *
 * type R = NotUnknownType<unknown> // never
 *
 * type R = NotUnknownType<never> // never
 * type R = NotUnknownType<number> // number
 * type R = NotUnknownType<string | boolean> // string | boolean
 * ```
 */
export type NotUnknownType<T, Then = T, Else = never> = UnknownType<T, Else, Then>

/**
 * Is the type `T` not exactly `unknown`.
 *
 * ```
 * import type { IsNotUnknown } from 'type-plus'
 *
 * type R = IsNotUnknown<unknown> // false
 *
 * type R = IsNotUnknown<never> // true
 * type R = IsNotUnknown<number> // true
 * type R = IsNotUnknown<string | boolean> // true
 * ```
 */
export type IsNotUnknown<T, Then = true, Else = false> = UnknownType<T, Else, Then>
