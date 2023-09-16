import type { NeverType } from './never_type.js'

/**
 * Is `T` not `never`.
 *
 * ```ts
 * type R = IsNotNever<1> // true
 *
 * type R = IsNotNever<never> // false
 */

export type IsNotNever<T, Then = true, Else = false> = NeverType<T, Else, Then>
