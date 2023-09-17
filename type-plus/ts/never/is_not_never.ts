import type { IsNever } from './is_never.js'

/**
 * Is `T` not `never`.
 *
 * ```ts
 * type R = IsNotNever<1> // true
 *
 * type R = IsNotNever<never> // false
 */

export type IsNotNever<T, Then = true, Else = false> = IsNever<T, Else, Then>
