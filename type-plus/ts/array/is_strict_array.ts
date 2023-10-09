import { type StrictArrayType } from './strict_array_type.js'

/**
 * 🎭 *predicate*
 *
 * Validate that `T` is an array, excluding tuple.
 *
 * @example
 * ```ts
 * type R = IsStrictArray<number[]> // true
 *
 * type R = IsStrictArray<number> // false
 * type R = IsStrictArray<[1]> // false
 * ```
 */

export type IsStrictArray<T, Then = true, Else = false> = StrictArrayType<T, Then, Else>
