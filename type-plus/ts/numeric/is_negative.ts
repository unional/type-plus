import type { IsAny } from '../any/is_any.js'
import type { IsNever } from '../never/is_never.js'
import type { $Else, $SelectionBranch, $Then } from '../type_plus/branch/selection.js'
import type { Zero } from './numeric_type.js'

/**
 * Is 'T' a negative numeric type.
 *
 * ```ts
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

export type IsNegative<T, Then = true, Else = false> = IsAny<
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
