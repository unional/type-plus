import type { IsAnyOrNever } from '../mix_types/is_any_or_never.js'
import type { $Else, $SelectionBranch, $Then } from '../type_plus/branch/selection.js'

/**
 * Is the type `T` not exactly `false`.
 *
 * ```ts
 * type R = IsNotStrictBoolean<boolean> // false
 *
 * type R = IsNotStrictBoolean<true> // true
 * type R = IsNotStrictBoolean<false> // false
 * type R = IsNotStrictBoolean<unknown> // true
 * ```
 */

export type IsNotStrictBoolean<T, Then = true, Else = false> = IsAnyOrNever<
T,
$SelectionBranch> extends infer R
? R extends $Then ? Then
: R extends $Else ? [T, boolean] extends [boolean, T] ? Else : Then
: never : never
