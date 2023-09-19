import { type VoidType } from './void_type.js'

/**
 * Is `T` `void`.
 *
 * ```ts
 * type R = IsVoid<void> // true
 *
 * type R = IsVoid<1> // false
 * ```
 */

export type IsVoid<T, Then = true, Else = false> = VoidType<T, Then, Else>
