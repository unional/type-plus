import type { IsAnyOrNever } from '../any/any_or_never.js'
import type { Numeric } from './numeric_type.js'

/**
 * Check if T is an integer, including bigint.
 *
 * ```
 * import type { Integer } from 'type-plus'
 *
 * type R = Integer<0> // 0
 * type R = Integer<1n> // 1n
 *
 * type R = Integer<1.1> // never
 * type R = Integer<number> // never as it contains non-integer
 * ```
 */
export type Integer<T, Then = T, Else = never> = IsAnyOrNever<
	T,
	Else,
	[T] extends [Numeric] ? (`${T}` extends `${bigint}` ? Then : Else) : Else
>

/**
 * Is T an integer, including bigint.
 *
 * ```
 * import type { IsInteger } from 'type-plus'
 *
 * type R = IsInteger<0> // true
 * type R = IsInteger<1n> // true
 *
 * type R = IsInteger<1.1> // false
 * type R = IsInteger<number> // false as it contains non-integer
 * ```
 */
export type IsInteger<T, Then = true, Else = false> = Integer<T, Then, Else>

export type NotInteger<T, Then = T, Else = never> = Integer<T, Else, Then>

export type IsNotInteger<T, Then = true, Else = false> = NotInteger<T, Else, Then>

/**
 * Check if T is an integer, including bigint.
 *
 * ```
 * import type { IsWhole } from 'type-plus'
 *
 * type R = IsWhole<0> // 0
 * type R = IsWhole<1n> // 1n
 *
 * type R = IsWhole<1.1> // never
 * type R = IsWhole<number> // never as it contains non-integer
 * ```
 */
export type IsWhole<N extends Numeric, Then = true, Else = false> = Integer<N, Then, Else>
