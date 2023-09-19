import { type VoidType } from './void_type.js'

/**
 * Is `T` not `void`.
 *
 * ```ts
 * type R = IsNotVoid<void> // false
 *
 * type R = IsNotVoid<1> // true
 * ```
 */

export type IsNotVoid<T, Then = true, Else = false> = VoidType<T, Else, Then>
