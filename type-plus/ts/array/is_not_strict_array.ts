import { type StrictArrayType } from './strict_array_type.js'

/**
 * 🎭 *predicate*
 *
 * Validate that `T` is not an array, excluding tuple.
 *
 * i.e. *tuple* will pass through this filter.
 *
 * @example
 * ```ts
 * type R = IsNotStrictArray<number[]> // false
 *
 * type R = IsNotStrictArray<number> // true
 * type R = IsNotStrictArray<[1]> // true
 * ```
 */

export type IsNotStrictArray<T, Then = true, Else = false> = StrictArrayType<T, Else, Then>
