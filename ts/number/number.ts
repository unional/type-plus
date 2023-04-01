import type { IsNever } from '../never/never_type.js'
import type { Numeric, Zero } from './numeric_type.js'

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
