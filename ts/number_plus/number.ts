/**
 * Either number or bigint.
 */
export type Numeric = number | bigint

/**
 * The value 0 in number or bigint.
 */
export type Zero = 0 | 0n

/**
 * Check if the value is an integer.
 *
 * ```
 * import type { Integer } from 'type-plus'
 *
 * type R = Integer<0> // 0
 * type R = Integer<1.1> // never
 *
 * type R = Integer<0, true, false> // true
 * type R = Integer<1.1, true, false> // false
 * ```
 */
export type Integer<N extends Numeric, Then = N, Else = never> = `${N}` extends `${bigint}` ? Then : Else

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
export type Negative<N extends Numeric, Then = N, Else = never> = N extends Zero
	? Else
	: `${N}` extends `-${string}`
	? Then
	: Else

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
