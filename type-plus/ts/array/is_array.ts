import { type ArrayType } from './array_type.js'

/**
 * 🎭 *predicate*
 *
 * Validate that `T` is an array, excluding tuple.
 *
 * @example
 * ```ts
 * type R = IsArray<number[]> // true
 *
 * type R = IsArray<number> // false
 * type R = IsArray<[1]> // false
 * ```
 */

export type IsArray<T, Then = true, Else = false> = ArrayType<T, Then, Else>
