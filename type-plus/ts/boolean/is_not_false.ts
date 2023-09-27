import type { IsAnyOrNever } from '../mix_types/is_any_or_never.js'
import type { $Else, $SelectionBranch, $Then } from '../type_plus/branch/selection.js'

/**
 * Is the type `T` not exactly `false`.
 *
 * ```ts
 * type R = IsNotFalse<false> // false
 *
 * type R = IsNotFalse<true> // true
 * type R = IsNotFalse<unknown> // true
 * ```
 */

export type IsNotFalse<T, Then = true, Else = false> = IsAnyOrNever<
T,
$SelectionBranch
> extends infer R
? 	R extends $Then ? Then
: R extends $Else ? [T, false] extends [false, T] ? Else : Then
: never : never

