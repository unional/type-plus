import type { IsAny } from '../any/is_any.js'
import type { IsNever } from '../never/is_never.js'
import type { $Else, $SelectionBranch, $Then } from '../type_plus/branch/selection.js'

/**
 * Is `T` a positive numeric type.
 *
 * ```ts
 * type R = IsPositive<1> // true
 * type R = IsPositive<0> // true
 * type R = IsPositive<1n> // true
 *
 * type R = IsPositive<number> // boolean
 * type R = IsPositive<bigint> // boolean
 * type R = IsPositive<any> // boolean
 *
 * type R = IsPositive<-1> // false
 * ```
 */

export type IsPositive<T, Then = true, Else = false> = IsAny<T, $SelectionBranch> extends infer R
? R extends $Then ? Then | Else
: R extends $Else ? (IsNever<T, $SelectionBranch> extends infer R2
	? R2 extends $Then ? Else
	: R2 extends $Else ? T extends number | bigint ? (`${T}` extends `-${string}` ? Else : Then) : Else
	: never : never)
: never : never
