import type { IsAny } from '../any/any_type.js'

/**
 * Check if the type `T` is exactly `null`.
 *
 * ```
 * import type { NullType } from 'type-plus'
 *
 * type R = NullType<null> // null
 *
 * type R = NullType<never> // never
 * type R = NullType<unknown> // never
 * type R = NullType<string | boolean> // never
 * ```
 */
export type NullType<T, Then = T, Else = never> = IsAny<T, Else, [T, null] extends [null, T] ? Then : Else>

/**
 * Is the type `T` exactly `null`.
 *
 * ```
 * import type { IsNull } from 'type-plus'
 *
 * type R = IsNull<null> // true
 *
 * type R = IsNull<never> // false
 * type R = IsNull<unknown> // false
 * type R = IsNull<string | boolean> // false
 * ```
 */
export type IsNull<T, Then = true, Else = false> = NullType<T, Then, Else>

/**
 * Check if the type `T` is not exactly `null`.
 *
 * ```
 * import type { NotNullType } from 'type-plus'
 *
 * type R = NotNullType<null> // never
 *
 * type R = NotNullType<never> // never
 * type R = NotNullType<unknown> // unknown
 * type R = NotNullType<string | boolean> // string | boolean
 * ```
 */
export type NotNullType<T, Then = T, Else = never> = NullType<T, Else, Then>

/**
 * Is the type `T` not exactly `null`.
 *
 * ```
 * import type { IsNotNull } from 'type-plus'
 *
 * type R = IsNotNull<null> // false
 *
 * type R = IsNotNull<never> // true
 * type R = IsNotNull<unknown> // true
 * type R = IsNotNull<string | boolean> // true
 * ```
 */
export type IsNotNull<T, Then = true, Else = false> = NullType<T, Else, Then>
