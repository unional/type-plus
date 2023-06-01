import type { IsNever } from '../never/never_type.js'
import type { StrictNumberType } from '../number/strict_number_type.js'

/**
 * Check if the type `T` is an array and not a tuple.
 *
 * ```ts
 * type R = ArrayType<number[]> // number[]
 *
 * type R = ArrayType<[1]> // never
 * ```
 */
export type ArrayType<T, Then = T, Else = never> = IsNever<
	T,
	Else,
	[any[]] extends [T] ? ([T] extends [any[]] ? StrictNumberType<T['length'], Then, Else> : Else) : Else
>

/**
 * Check if the type `T` is not an array.
 *
 * ```ts
 * type R = NotArrayType<number[]> // never
 *
 * type R = NotArrayType<number> // number
 * type R = NotArrayType<[1]> // [1]
 * ```
 */
export type NotArrayType<T, Then = T, Else = never> = ArrayType<T, Else, Then>

/**
 * Is `T` an array?
 *
 * ```ts
 * type R = IsArray<number[]> // true
 *
 * type R = IsArray<number> // false
 * type R = IsArray<[1]> // false
 * ```
 */
export type IsArray<T, Then = true, Else = false> = ArrayType<T, Then, Else>

/**
 * Is `T` not an array?
 *
 * ```ts
 * type R = IsNotArray<number[]> // false
 *
 * type R = IsNotArray<number> // true
 * type R = IsNotArray<[1]> // true
 * ```
 */
export type IsNotArray<T, Then = true, Else = false> = ArrayType<T, Else, Then>
