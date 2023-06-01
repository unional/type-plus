import type { IsNever } from '../never/never_type.js'
import type { IsAny } from '../any/any_type.js'

/**
 * 🐾 Parse `T` to ensure it is either exactly `any` or exactly `never`.
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
export type AnyOrNeverType<T, Then = T, Else = never> = IsNever<T, Then, IsAny<T, Then, Else>>

/**
 * 🎭 Validate if `T` is either exactly `any` or exactly `never`.
 *
 * @example
 * ```ts
 * type R = IsAnyOrNever<any> // true
 * type R = IsAnyOrNever<never> // true
 *
 * type R = IsAnyOrNever<1> // false
 * type R = IsAnyOrNever<unknown> // false
 * ```
 */
export type IsAnyOrNever<T, Then = true, Else = false> = IsNever<T, Then, IsAny<T, Then, Else>>
