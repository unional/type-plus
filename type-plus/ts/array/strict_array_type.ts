import type { IsNever } from '../never/is_never.js'
import type { StrictNumberType } from '../number/strict_number_type.js'

/**
 * 🌪️ *filter*
 *
 * Filter `T` to ensure it is an array, excluding tuple.
 *
 * @example
 * ```ts
 * type R = StrictArrayType<number[]> // number[]
 *
 * type R = StrictArrayType<[1]> // never
 * type R = StrictArrayType<number[] | 1> // never
 * type R = StrictArrayType<number[] & { a: 1 }> // never
 * ```
 */
export type StrictArrayType<T, Then = T, Else = never> = IsNever<
	T,
	{
		$then: Else,
		$else: [any[]] extends [T]
		? ([T] extends [readonly any[]]
			? StrictNumberType<T['length'], Then, Else>
			: Else)
		: Else
	}
>

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

/**
 * 🌪️ *filter*
 *
 * Filter `T` to ensure it is not an array, excluding tuple.
 *
 * i.e. *tuple* will pass through this filter.
 *
 * @example
 * ```ts
 * type R = NotStrictArrayType<number[]> // never
 *
 * type R = NotStrictArrayType<number> // number
 * type R = NotStrictArrayType<[1]> // [1]
 * ```
 */
export type NotStrictArrayType<T, Then = T, Else = never> = StrictArrayType<T, Else, Then>

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
