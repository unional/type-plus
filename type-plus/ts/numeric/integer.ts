import type { IsAnyOrNever } from '../mix_types/is_any_or_never.js'
import type { $Else, $SelectionBranch, $Then } from '../type_plus/branch/selection.js'
import type { Numeric } from './numeric_type.js'

/**
 * Check if T is an integer, including bigint.
 *
 * ```ts
 * type R = Integer<0> // 0
 * type R = Integer<1n> // 1n
 *
 * type R = Integer<1.1> // never
 * type R = Integer<number> // never as it contains non-integer
 * ```
 */
export type Integer<T, Then = T, Else = never> = IsAnyOrNever<
	T,
	$SelectionBranch> extends infer R
	? R extends $Then ? Else
	: R extends $Else ? [T] extends [Numeric] ? (`${T}` extends `${bigint}` ? Then : Else) : Else
	: never : never

/**
 * Check if T is not an integer, including bigint.
 *
 * ```ts
 * type R = NotInteger<1.1> // 1.1
 * type R = NotInteger<number> // number as it contains non-integer
 *
 * type R = NotInteger<0> // never
 * type R = NotInteger<1n> // never
 * ```
 */
export type NotInteger<T, Then = T, Else = never> = Integer<T, Else, Then>

/**
 * Check if T is an integer, including bigint.
 *
 * @deprecated use `IsInteger` instead
 *
 * ```ts
 * type R = IsWhole<0> // 0
 * type R = IsWhole<1n> // 1n
 *
 * type R = IsWhole<1.1> // never
 * type R = IsWhole<number> // never as it contains non-integer
 * ```
 */
export type IsWhole<N, Then = true, Else = false> = Integer<N, Then, Else>
