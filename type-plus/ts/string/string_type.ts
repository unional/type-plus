import type { IsAnyOrNever } from '../mix_types/is_any_or_never.js'

/**
 * Check if the type `T` is `string` or string literals.
 *
 * ```ts
 * type R = StringType<string> // string
 * type R = StringType<''> // ''
 * type R = StringType<'1'> // '1'
 *
 * type R = StringType<string | boolean> // never
 * type R = StringType<never> // never
 * type R = StringType<unknown> // never
 * ```
 */
export type StringType<T, Then = T, Else = never> = IsAnyOrNever<T, { $then: Else, $else: [T] extends [string] ? Then : Else }>

/**
 * Is the type `T` `string` or string literals.
 *
 * ```ts
 * type R = IsString<string> // true
 * type R = IsString<''> // true
 * type R = IsString<'a'> // true
 *
 * type R = IsString<string | boolean> // false
 * type R = IsString<never> // false
 * type R = IsString<unknown> // false
 * ```
 */
export type IsString<T, Then = true, Else = false> = StringType<T, Then, Else>

/**
 * Check if the type `T` is not `string` nor string literals.
 *
 * ```ts
 * type R = NotStringType<string> // never
 * type R = NotStringType<''> // ''
 * type R = NotStringType<'a'> // 'a'
 *
 * type R = NotStringType<string | boolean> // string | boolean
 * type R = NotStringType<never> // never
 * type R = NotStringType<unknown> // unknown
 * ```
 */
export type NotStringType<T, Then = T, Else = never> = StringType<T, Else, Then>

/**
 * Is the type `T` not `string` nor string literals.
 *
 * ```ts
 * type R = IsNotString<string> // false
 * type R = IsNotString<''> // false
 * type R = IsNotString<'a'> // false
 *
 * type R = IsNotString<string | boolean> // true
 * type R = IsNotString<never> // true
 * type R = IsNotString<unknown> // true
 * ```
 */
export type IsNotString<T, Then = true, Else = false> = StringType<T, Else, Then>
