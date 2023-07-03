/**
 * 🌪️ *filter*
 *
 * Filter `T` to ensure it is exactly `any`.
 *
 * @example
 * ```ts
 * type R = AnyType<any> // any
 *
 * type R = AnyType<never> // never
 * type R = AnyType<unknown> // never
 * type R = AnyType<string | boolean> // never
 * ```
 */
export type AnyType<T, Then = T, Else = never> = 0 extends 1 & T ? Then : Else

/**
 * 🎭 *validate*
 *
 * Validate if `T` is exactly `any`.
 *
 * @example
 * ```ts
 * type R = IsAny<any> // true
 *
 * type R = IsAny<never> // false
 * type R = IsAny<unknown> // false
 * type R = IsAny<string | boolean> // false
 * ```
 */
export type IsAny<T, Then = true, Else = false> = AnyType<T, Then, Else>

/**
 * 🌪️ *filter*
 *
 * Filter `T` to ensure it is not exactly `any`.
 *
 * @example
 * ```ts
 * type R = NotAnyType<any> // never
 *
 * type R = NotAnyType<never> // never
 * type R = NotAnyType<unknown> // unknown
 * type R = NotAnyType<string | boolean> // string | boolean
 * ```
 */
export type NotAnyType<T, Then = T, Else = never> = AnyType<T, Else, Then>

/**
 * 🎭 *validate*
 *
 * Validate if `T` is not exactly `any`.
 *
 * @example
 * ```ts
 * import type { IsNotAny } from 'type-plus'
 *
 * type R = IsNotAny<any> // false
 *
 * type R = IsNotAny<never> // true
 * type R = IsNotAny<unknown> // true
 * type R = IsNotAny<string | boolean> // true
 * ```
 */
export type IsNotAny<T, Then = true, Else = false> = AnyType<T, Else, Then>
