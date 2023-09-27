import type { IsAnyOrNever } from '../mix_types/is_any_or_never.js'
import type { $Else, $SelectionBranch, $Then } from '../type_plus/branch/selection.js'

/**
 * Is the type `T` exactly `bigint`.
 *
 * ```ts
 * type R = IsStrictBigint<bigint> // true
 *
 * type R = IsStrictBigint<1n> // false
 * type R = IsStrictBigint<number> // false
 * type R = IsStrictBigint<bigint | boolean> // false
 * type R = IsStrictBigint<unknown> // false
 * ```
 */

export type IsStrictBigint<T, Then = true, Else = false> = IsAnyOrNever<
	T, $SelectionBranch> extends infer R ? R extends $Then ? Else : R extends $Else ? [bigint] extends [T] ? ([T] extends [bigint] ? (`${T}` extends `${number}` ? Else : Then) : Else) : Else : never : never