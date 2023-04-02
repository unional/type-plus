import type { IsAny } from '../any/any_type.js'
import type { IsNever } from '../never/never_type.js'
import type { Zero } from './numeric_type.js'

/**
 * Check if 'T' is a negative numeric type.
 *
 * ```ts
 * import type { Negative } from 'type-plus'
 *
 * type R = Negative<-1> // -1
 * type R = Negative<-1n> // -1n
 *
 * type R = Negative<number> // number
 * type R = Negative<any> // any
 *
 * type R = Negative<0> // never
 * type R = Negative<1> // never
 * ```
 */
export type Negative<T, Then = T, Else = never> = IsAny<
	T,
	Then | Else,
	IsNever<
		T,
		Else,
		[number, T] extends [T, number]
			? Then
			: [bigint, T] extends [T, bigint]
			? Then
			: T extends Zero
			? Else
			: [T] extends [number | bigint]
			? `${T}` extends `-${string}`
				? Then
				: Else
			: Else
	>
>

/**
 * Is 'T' a negative numeric type.
 *
 * ```ts
 * import type { IsNegative } from 'type-plus'
 *
 * type R = IsNegative<-1> // true
 * type R = IsNegative<-1n> // true
 *
 * type R = IsNegative<number> // boolean
 * type R = IsNegative<any> // boolean
 *
 * type R = IsNegative<0> // false
 * type R = IsNegative<1> // false
 * ```
 */
export type IsNegative<T, Then = true, Else = false> = Negative<T, Then, Else>

/**
 * Check if 'T' is not a negative numeric type.
 *
 * ```ts
 * import type { NotNegative } from 'type-plus'
 *
 * type R = NotNegative<-1> // never
 * type R = NotNegative<-1n> // never
 *
 * type R = NotNegative<number> // number
 * type R = NotNegative<any> // any
 *
 * type R = NotNegative<0> // 0
 * type R = NotNegative<1> // 1
 * ```
 */
export type NotNegative<T, Then = T, Else = never> = IsAny<
	T,
	Then | Else,
	IsNever<
		T,
		Then,
		[number, T] extends [T, number]
			? Then
			: [bigint, T] extends [T, bigint]
			? Then
			: [T] extends [number | bigint]
			? `${T}` extends `-${string}`
				? Else
				: Then
			: Then
	>
>

/**
 * Is 'T' not a negative numeric type.
 *
 * ```ts
 * import type { IsNotNegative } from 'type-plus'
 *
 * type R = IsNotNegative<-1> // false
 * type R = IsNotNegative<-1n> // false
 *
 * type R = IsNotNegative<number> // boolean
 * type R = IsNotNegative<any> // boolean
 *
 * type R = IsNotNegative<0> // true
 * type R = IsNotNegative<1> // true
 * ```
 */
export type IsNotNegative<T, Then = true, Else = false> = NotNegative<T, Then, Else>
