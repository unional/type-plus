import type { IsAnyOrNever } from '../mix_types/is_any_or_never.js'
import type { $Else, $SelectionBranch, $Then } from '../type_plus/branch/selection.js'

/**
 * Is the type `T` exactly `false`.
 *
 * ```ts
 * type R = IsFalse<false> // true
 *
 * type R = IsFalse<true> // false
 * type R = IsFalse<unknown> // false
 * ```
 */

export type IsFalse<T, Then = true, Else = false> = IsAnyOrNever<
T,
$SelectionBranch
> extends infer R
? 	R extends $Then ? Else
: R extends $Else ? [T, false] extends [false, T] ? Then : Else
: never : never
