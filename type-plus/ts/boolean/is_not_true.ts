import type { IsAnyOrNever } from '../mix_types/is_any_or_never.js'
import type { $Else, $SelectionBranch, $Then } from '../type_plus/branch/selection.js'

/**
 * Is the type `T` not exactly `true`.
 *
 * ```ts
 * type R = IsNotTrue<true> // false
 *
 * type R = IsNotTrue<false> // true
 * type R = IsNotTrue<unknown> // true
 * ```
 */

export type IsNotTrue<T, Then = true, Else = false> = IsAnyOrNever<
T,
$SelectionBranch> extends infer R
? R extends $Then ? Then
: R extends $Else ? [T, true] extends [true, T] ? Else : Then
: never : never
