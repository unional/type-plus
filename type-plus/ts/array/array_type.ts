import type { IsNever } from '../never/is_never.js'
import type { StrictNumberType } from '../number/strict_number_type.js'

/**
 * 🌪️ *filter*
 *
 * Filter `T` to ensure it is an array, excluding tuple.
 *
 * @example
 * ```ts
 * type R = ArrayType<number[]> // number[]
 *
 * type R = ArrayType<[1]> // never
 * type R = ArrayType<number[] | 1> // never
 * type R = ArrayType<number[] & { a: 1 }> // never
 * ```
 */
export type ArrayType<T, Then = T, Else = never> = IsNever<
	T,
	Else,
	[never[]] extends [T]
	? ([T] extends [readonly any[]]
		? StrictNumberType<T['length'], Then, Else>
		: Else)
	: Else
>

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

/**
 * 🌪️ *filter*
 *
 * Filter `T` to ensure it is not an array, excluding tuple.
 *
 * i.e. *tuple* will pass through this filter.
 *
 * @example
 * ```ts
 * type R = NotArrayType<number[]> // never
 *
 * type R = NotArrayType<number> // number
 * type R = NotArrayType<[1]> // [1]
 * ```
 */
export type NotArrayType<T, Then = T, Else = never> = ArrayType<T, Else, Then>

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
