import { type UnknownType } from './unknown_type.js'

/**
 * Is the type `T` not exactly `unknown`.
 *
 * ```ts
 * type R = IsNotUnknown<unknown> // false
 *
 * type R = IsNotUnknown<never> // true
 * type R = IsNotUnknown<number> // true
 * type R = IsNotUnknown<string | boolean> // true
 * ```
 */

export type IsNotUnknown<T, Then = true, Else = false> = UnknownType<T, Else, Then>
