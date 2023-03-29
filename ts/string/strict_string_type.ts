import type { IsAny } from '../any/any_type.js'

/**
 * Check if the type `T` is exactly `string`.
 *
 * ```
 * import type { StrictStringType } from 'type-plus'
 *
 * type R = StrictStringType<string> // string
*
* type R = StrictStringType<''> // never
* type R = StrictStringType<'1'> // never
* type R = StrictStringType<string | boolean> // never
* type R = StrictStringType<never> // never
* type R = StrictStringType<unknown> // never
 * ```
 */
export type StrictStringType<T, Then = T, Else = never> = IsAny<T, Else, [T, string] extends [string, T] ? Then : Else>

/**
 * Is the type `T` exactly `string`.
 *
 * ```
 * import type { IsStrictString } from 'type-plus'
 *
 * type R = IsStrictString<string> // true
 *
 * type R = IsStrictString<''> // false
 * type R = IsStrictString<'a'> // false
 * type R = IsStrictString<string | boolean> // false
 * type R = IsStrictString<never> // false
 * type R = IsStrictString<unknown> // false
 * ```
 */
export type IsStrictString<T, Then = true, Else = false> = StrictStringType<T, Then, Else>

/**
 * Check if the type `T` is not exactly `string`.
 *
 * ```
 * import type { NotStrictStringType } from 'type-plus'
 *
 * type R = NotStrictStringType<string> // never
 *
 * type R = NotStrictStringType<''> // ''
 * type R = NotStrictStringType<'a'> // 'a'
 * type R = NotStrictStringType<string | boolean> // string | boolean
 * type R = NotStrictStringType<never> // never
 * type R = NotStrictStringType<unknown> // unknown
 * ```
 */
export type NotStrictStringType<T, Then = T, Else = never> = StrictStringType<T, Else, Then>

/**
 * Is the type `T` not exactly `string`.
 *
 * ```
 * import type { IsNotStrictString } from 'type-plus'
 *
 * type R = IsNotStrictString<string> // false
 *
 * type R = IsNotStrictString<''> // true
 * type R = IsNotStrictString<'a'> // true
 * type R = IsNotStrictString<string | boolean> // true
 * type R = IsNotStrictString<never> // true
 * type R = IsNotStrictString<unknown> // true
 * ```
 */
export type IsNotStrictString<T, Then = true, Else = false> = StrictStringType<T, Else, Then>
