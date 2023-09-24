import type { IsAnyOrNever } from '../mix_types/is_any_or_never.js'
import type { $Else, $SelectionBranch, $Then } from '../type_plus/branch/selection.js'

/**
 * Check if the type `T` is exactly `bigint`.
 *
 * ```ts
 * type R = BigintType<bigint> // bigint
 *
 * type R = BigintType<1n> // never
 * type R = BigintType<number> // never
 * type R = BigintType<bigint | boolean> // never
 * type R = BigintType<unknown> // never
 * ```
 */
export type BigintType<T, Then = T, Else = never> = IsAnyOrNever<
T,
$SelectionBranch> extends infer R
? R extends $Then ? Else
: R extends $Else ? [T] extends [bigint] ? Then : Else
: never : never
