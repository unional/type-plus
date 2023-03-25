import type { IsAny } from '../any/any_type.js'

/**
 * Check if the type `T` is exactly `string`.
 *
 * ```
 * import type { StringType } from 'type-plus'
 *
 * type R = StringType<string> // string
*
* type R = StringType<''> // never
* type R = StringType<'1'> // never
* type R = StringType<string | boolean> // never
* type R = StringType<never> // never
* type R = StringType<unknown> // never
 * ```
 */
export type StringType<T, Then = T, Else = never> = IsAny<T, Else, [T, string] extends [string, T] ? Then : Else>

/**
 * Is the type `T` exactly `string`.
 *
 * ```
 * import type { IsString } from 'type-plus'
 *
 * type R = IsString<string> // true
 *
 * type R = IsString<''> // false
 * type R = IsString<'a'> // false
 * type R = IsString<string | boolean> // false
 * type R = IsString<never> // false
 * type R = IsString<unknown> // false
 * ```
 */
export type IsString<T, Then = true, Else = false> = StringType<T, Then, Else>

/**
 * Check if the type `T` is not exactly `string`.
 *
 * ```
 * import type { NotStringType } from 'type-plus'
 *
 * type R = NotStringType<string> // never
 *
 * type R = NotStringType<''> // ''
 * type R = NotStringType<'a'> // 'a'
 * type R = NotStringType<string | boolean> // string | boolean
 * type R = NotStringType<never> // never
 * type R = NotStringType<unknown> // unknown
 * ```
 */
export type NotStringType<T, Then = T, Else = never> = StringType<T, Else, Then>

/**
 * Is the type `T` not exactly `string`.
 *
 * ```
 * import type { IsNotString } from 'type-plus'
 *
 * type R = IsNotString<string> // false
 *
 * type R = IsNotString<''> // true
 * type R = IsNotString<'a'> // true
 * type R = IsNotString<string | boolean> // true
 * type R = IsNotString<never> // true
 * type R = IsNotString<unknown> // true
 * ```
 */
export type IsNotString<T, Then = true, Else = false> = StringType<T, Else, Then>
