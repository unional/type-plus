import { type NullType } from './null_type.js'

/**
 * Is the type `T` not exactly `null`.
 *
 * ```ts
 * type R = IsNotNull<null> // false
 *
 * type R = IsNotNull<never> // true
 * type R = IsNotNull<unknown> // true
 * type R = IsNotNull<string | boolean> // true
 * ```
 */

export type IsNotNull<T, Then = true, Else = false> = NullType<T, Else, Then>
