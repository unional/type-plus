import { type ArrayType } from './array_type.js'

/**
 * 🎭 *predicate*
 *
 * Validate that `T` is not an array, excluding tuple.
 *
 * i.e. *tuple* will pass through this filter.
 *
 * @example
 * ```ts
 * type R = IsNotArray<number[]> // false
 *
 * type R = IsNotArray<number> // true
 * type R = IsNotArray<[1]> // true
 * ```
 */

export type IsNotArray<T, Then = true, Else = false> = ArrayType<T, Else, Then>
