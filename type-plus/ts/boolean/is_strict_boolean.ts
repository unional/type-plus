import type { IsAnyOrNever } from '../mix_types/is_any_or_never.js'
import type { $Else, $SelectionBranch, $Then } from '../type_plus/branch/selection.js'

/**
 * Is the type `T` exactly `boolean`.
 *
 * ```ts
 * type R = IsStrictBoolean<boolean> // true
 *
 * type R = IsStrictBoolean<true> // false
 * type R = IsStrictBoolean<false> // true
 * type R = IsStrictBoolean<unknown> // false
 * ```
 */

export type IsStrictBoolean<T, Then = true, Else = false> = IsAnyOrNever<
T,
$SelectionBranch> extends infer R
? R extends $Then ? Else
: R extends $Else ? [T, boolean] extends [boolean, T] ? Then : Else
: never : never
