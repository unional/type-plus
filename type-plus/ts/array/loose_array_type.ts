import type { IsAnyOrNever } from '../mix_types/any_or_never_type.js'

/**
 * 🌪️ *filter*
 * 🚧 *temporary*
 *
 * Filter `T` to ensure it is an array or tuple.
 *
 * This is a temporary type before `ArrayType` is adjusted to loose check in the next version.
 *
 * @example
 * ```ts
 * type R = LooseArrayType<number[]> // number[]
 * type R = LooseArrayType<[1]> // [1]
 * type R = LooseArrayType<number[] | 1> // number[]
 * type R = LooseArrayType<number[] & 1> // number[]s
 *
 * type R = LooseArrayType<string> // never
 * ```
 */export type LooseArrayType<T, Then = T, Else = never> = IsAnyOrNever<
	T,
	Else,
	T extends readonly any[] ? Then : Else
>

/**
 * 🎭 *validate*
 *
 * Validate that `T` is an array or tuple.
 *
 * @example
 * ```ts
 * type R = IsLooseArray<number[]> // true
 * type R = IsLooseArray<[1]> // true
 *
 * type R = IsLooseArray<number> // false
 * ```
 */
export type IsLooseArray<T, Then = true, Else = false> = LooseArrayType<T, Then, Else>

/**
 * 🌪️ *filter*
 *
 * Filter `T` to ensure it is not an array nor tuple.
 *
 * @example
 * ```ts
 * type R = NotLooseArrayType<number[]> // never
 * type R = NotLooseArrayType<[1]> // never
 *
 * type R = NotLooseArrayType<number> // number
 * ```
 */
export type NotLooseArrayType<T, Then = T, Else = never> = LooseArrayType<T, Else, Then>

/**
 * 🎭 *validate*
 *
 * Validate that `T` is not an array nor tuple.
 *
 * @example
 * ```ts
 * type R = IsNotLooseArray<number[]> // false
 * type R = IsNotLooseArray<[1]> // false
 *
 * type R = IsNotLooseArray<number> // true
 * ```
 */
export type IsNotLooseArray<T, Then = true, Else = false> = LooseArrayType<T, Else, Then>
