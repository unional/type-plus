import type { IsNever } from '../never/never.js'
import type { NumberType } from '../number/number_type.js'

/**
 * Check if the type `T` is an array and not a tuple.
 *
 * ```ts
 * import type { ArrayType } from 'type-plus'
 *
 * type R = ArrayType<number[]> // true
 * type R = ArrayType<[1]> // false
 * ```
 */
export type ArrayType<T, Then = T, Else = never> = IsNever<
	T,
	Else,
	T extends any[] ? NumberType<T['length'], Then, Else> : Else
>

/**
 * Check if the type `T` is not an array.
 *
 * ```ts
 * import type { NotArrayType } from 'type-plus'
 *
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
 * import type { IsArray } from 'type-plus'
 *
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
 * import type { IsNotArray } from 'type-plus'
 *
 * type R = IsNotArray<number[]> // false
 *
 * type R = IsNotArray<number> // true
 * type R = IsNotArray<[1]> // true
 * ```
 */
export type IsNotArray<T, Then = true, Else = false> = ArrayType<T, Else, Then>
