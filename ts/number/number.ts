import type { IsAnyOrNever } from '../any/any_or_never.js'
import type { IsNever } from '../never/never.js'

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
 *
 * ```ts
 * import type { NumericType } from 'type-plus'
 *
 * type R = NumericType<1> // 1
 * type R = NumericType<1.1> // 1.1
 *
 * type R = NumericType<string> // never
 * type R = NumericType<unknown> // never
 * ```
 */
export type NumericType<T, Then = T, Else = never> = IsAnyOrNever<T, Else, T extends Numeric ? Then : Else>

export type IsNumeric<T, Then = true, Else = false> = NumericType<T, Then, Else>

/**
 * Check if the value is an integer.
 *
 * ```
 * import type { Integer } from 'type-plus'
 *
 * type R = Integer<0> // 0
 * type R = Integer<1.1> // never
 * type R = Integer<number> // never as it contains non-integer
 *
 * type R = Integer<0, true, false> // true
 * type R = Integer<1.1, true, false> // false
 * ```
 */
export type Integer<N, Then = N, Else = never> = IsAnyOrNever<
	N,
	Else,
	N extends Numeric ? (`${N}` extends `${bigint}` ? Then : Else) : Else
>

/**
 * Check if the value is an integer.
 *
 * ```
 * import type { IsInteger } from 'type-plus'
 *
 * type R = IsInteger<0> // 0
 * type R = IsInteger<1.1> // never
 * type R = IsInteger<number> // never as it contains non-integer
 *
 * type R = IsInteger<0, true, false> // true
 * type R = IsInteger<1.1, true, false> // false
 * ```
 */
export type IsInteger<N, Then = true, Else = false> = Integer<N, Then, Else>

/**
 * Check if the value is an integer.
 *
 * ```
 * import type { IsWhole } from 'type-plus'
 *
 * type R = IsWhole<0> // 0
 * type R = IsWhole<1.1> // never
 * type R = IsWhole<number> // never as it contains non-integer
 *
 * type R = IsWhole<0, true, false> // true
 * type R = IsWhole<1.1, true, false> // false
 * ```
 */
export type IsWhole<N extends Numeric, Then = true, Else = false> = Integer<N, Then, Else>

/**
 * Check if the value is a negative number.
 *
 * ```
 * import type { Negative } from 'type-plus'
 *
 * type R = Negative<-1> // -1
 * type R = Negative<0> // never
 *
 * type R = Negative<-1, true, false> // true
 * type R = Negative<1, true, false> // false
 * ```
 */
export type Negative<N extends Numeric, Then = N, Else = never> = IsNever<
	N,
	Else,
	N extends Zero ? Else : `${N}` extends `-${string}` ? Then : Else
>

/**
 * Check if the value it not a negative number.
 *
 * ```
 * import type { NonNegative } from 'type-plus'
 *
 * type R = NonNegative<-1> // never
 * type R = NonNegative<0> // 0
 *
 * type R = NonNegative<-1, true, false> // false
 * type R = NonNegative<1, true, false> // true
 * ```
 */
export type NonNegative<N extends Numeric, Then = N, Else = never> = Negative<N, Else, Then>

/**
 * Check if the value is a positive number.
 *
 * ```
 * import type { Positive } from 'type-plus'
 *
 * type R = Positive<1> // 1
 * type R = Positive<0> // never
 * type R = Positive<-1> // never
 *
 * type R = Positive<1, true, false> // true
 * type R = Positive<-1, true, false> // false
 * ```
 */
export type Positive<N extends Numeric, Then = N, Else = never> = IsNever<
	N,
	Else,
	number extends N ? Else : N extends Zero ? Then : `${N}` extends `-${string}` ? Else : Then
>

/**
 * Is the value `N` a positive number.
 *
 * ```
 * import type { IsPositive } from 'type-plus'
 *
 * type R = IsPositive<1> // true
 * type R = IsPositive<0> // false
 * type R = IsPositive<-1> // false
 *
 * type R = IsPositive<1, 'good', 'bad'> // 'good'
 * type R = IsPositive<-1, 'good', 'bad> // 'bad'
 * ```
 */
export type IsPositive<N extends Numeric, Then = true, Else = false> = Positive<N, Then, Else>
