import type { IsAny } from '../any/is_any.js'
import type { IsNever } from '../never/is_never.js'
import type { $Else, $SelectionBranch, $Then } from '../type_plus/branch/selection.js'
import type { Zero } from './numeric_type.js'

/**
 * Check if 'T' is a negative numeric type.
 *
 * ```ts
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
	$SelectionBranch> extends infer R
	? R extends $Then ? Then | Else
	: R extends $Else ? (IsNever<
		T,
		$SelectionBranch> extends infer R2
		? R2 extends $Then ? Else
		: R2 extends $Else ? ([number, T] extends [T, number]
			? Then
			: ([bigint, T] extends [T, bigint]
				? Then
				: T extends Zero
				? Else
				: [T] extends [number | bigint]
				? `${T}` extends `-${string}`
				? Then
				: Else
				: Else))
		: never : never)
	: never : never

/**
 * Check if 'T' is not a negative numeric type.
 *
 * ```ts
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
	$SelectionBranch> extends infer R
	? R extends $Then ? Then | Else
	: R extends $Else ? (IsNever<
		T,
		$SelectionBranch
	> extends infer R
		? R extends $Then ? Then
		: R extends $Else ? [number, T] extends [T, number]
		? Then
		: [bigint, T] extends [T, bigint]
		? Then
		: [T] extends [number | bigint]
		? `${T}` extends `-${string}`
		? Else
		: Then
		: Then
		: never : never
	)
	: never : never
