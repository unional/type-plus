import type { IsAnyOrNever } from '../mix_types/is_any_or_never.js'
import type { $Else, $SelectionBranch, $Then } from '../type_plus/branch/selection.js'

/**
 * Is the type `T` not exactly `bigint`.
 *
 * ```ts
 * type R = IsNotStrictBigint<bigint> // false
 *
 * type R = IsNotStrictBigint<1n> // true
 * type R = IsNotStrictBigint<number> // true
 * type R = IsNotStrictBigint<bigint | boolean> // true
 * type R = IsNotStrictBigint<unknown> // true
 * ```
 */

export type IsNotStrictBigint<T, Then = true, Else = false> = IsAnyOrNever<
	T, $SelectionBranch> extends infer R ? R extends $Then ? Then : R extends $Else ? [bigint] extends [T] ? ([T] extends [bigint] ? (`${T}` extends `${number}` ? Then : Else) : Then) : Then : never : never
