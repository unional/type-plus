import { type UnknownType } from './unknown_type.js'

/**
 * Is the type `T` exactly `unknown`.
 *
 * ```ts
 * type R = IsUnknown<unknown> // true
 *
 * type R = IsUnknown<number> // false
 * type R = IsUnknown<never> // false
 * ```
 */

export type IsUnknown<T, Then = true, Else = false> = UnknownType<T, Then, Else>
