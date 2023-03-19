/**
 * Is the type `T` exactly `any`.
 *
 * ```
 * import type { IsAny } from 'type-plus'
 *
 * type R = IsAny<any> // true
 *
 * type R = IsAny<never> // false
 * type R = IsAny<unknown> // false
 * type R = IsAny<string | boolean> // false
 * ```
 */
export type IsAny<T, Then = true, Else = false> = 0 extends 1 & T ? Then : Else

/**
 * Check if the type `T` is exactly `any`.
 *
 * ```
 * import type { AnyType } from 'type-plus'
 *
 * type R = AnyType<any> // any
 *
 * type R = AnyType<never> // never
 * type R = AnyType<unknown> // never
 * type R = AnyType<string | boolean> // never
 * ```
 */
export type AnyType<T, Then = T, Else = never> = IsAny<T, Then, Else>
