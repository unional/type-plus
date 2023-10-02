import type { IsAnyOrNever } from '../mix_types/is_any_or_never.js'

/**
 * Either number or bigint.
 */
export type Numeric = number | bigint

/**
 * The value 0 in number or bigint.
 */
export type Zero = 0 | 0n

/**
 * Check if `T` is numeric.
 * Meaning it is either a `number` or a `bigint`.
 *
 * ```ts
 * type R = NumericType<1> // 1
 * type R = NumericType<1.1> // 1.1
 *
 * type R = NumericType<string> // never
 * type R = NumericType<unknown> // never
 * ```
 */
export type NumericType<T, Then = T, Else = never> = IsAnyOrNever<T, {
	$then: Else,
	$else: [T] extends [Numeric] ? Then : Else
}>

/**
 * Check if `T` is not numeric.
 *
 * ```ts
 * type R = NotNumericType<1> // never
 * type R = NotNumericType<1.1> // never
 *
 * type R = NotNumericType<string> // string
 * type R = NotNumericType<unknown> // unknown
 * ```
 */
export type NotNumericType<T, Then = T, Else = never> = NumericType<T, Else, Then>
