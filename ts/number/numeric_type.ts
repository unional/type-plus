import type { IsAnyOrNever } from '../any/any_or_never.js'

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
export type NumericType<T, Then = T, Else = never> = IsAnyOrNever<T, Else, [T] extends [Numeric] ? Then : Else>

/**
 * Is `T` numeric.
 *
 * ```ts
 * type R = IsNumeric<1> // true
 * type R = IsNumeric<1.1> // true
 *
 * type R = IsNumeric<string> // false
 * type R = IsNumeric<unknown> // false
 * ```
 */
export type IsNumeric<T, Then = true, Else = false> = NumericType<T, Then, Else>

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

/**
 * Is `T` not numeric.
 *
 * ```ts
 * type R = IsNotNumeric<1> // false
 * type R = IsNotNumeric<1.1> // false
 *
 * type R = IsNotNumeric<string> // true
 * type R = IsNotNumeric<unknown> // true
 * ```
 */
export type IsNotNumeric<T, Then = true, Else = false> = NumericType<T, Else, Then>
