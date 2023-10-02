import type { IsAny } from '../any/is_any.js'
import type { IsNever } from '../never/is_never.js'
import type { $Else, $SelectionBranch, $Then } from '../type_plus/branch/selection.js'

/**
 * Check if `T` is a positive numeric type.
 *
 * ```ts
 * type R = Positive<1> // 1
 * type R = Positive<0> // 0
 * type R = Positive<1n> // 1n
 *
 * type R = Positive<-1> // never
 * ```
 */
export type Positive<T, Then = T, Else = never> = IsAny<T, $SelectionBranch> extends infer R
	? R extends $Then ? Then | Else
	: R extends $Else ? (IsNever<T, $SelectionBranch> extends infer R2
		? R2 extends $Then ? Else
		: R2 extends $Else ? T extends number | bigint ? (`${T}` extends `-${string}` ? Else : Then) : Else
		: never : never)
	: never : never

/**
 * Check if `T` is not a positive numeric type.
 *
 * ```ts
 * type R = NonPositive<-1> // -1
 *
 * type R = NonPositive<0> // never
 * type R = NonPositive<1> // never
 * ```
 */
export type NonPositive<T, Then = T, Else = never> = Positive<T, Else, Then>
