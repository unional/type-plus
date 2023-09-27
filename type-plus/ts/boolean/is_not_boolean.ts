import type { IsAnyOrNever } from '../mix_types/is_any_or_never.js'
import type { $Else, $SelectionBranch, $Then } from '../type_plus/branch/selection.js'

/**
 * Is the type `T` not `boolean`, including `true` and `false`.
 *
 * ```ts
 * type R = IsNotBoolean<boolean> // false
 * type R = IsNotBoolean<true> // false
 * type R = IsNotBoolean<false> // false
 *
 * type R = IsNotBoolean<number> // true
 * type R = IsNotBoolean<unknown> // true
 * ```
 */

export type IsNotBoolean<T, Then = true, Else = false> = IsAnyOrNever<
T,
$SelectionBranch> extends infer R
? R extends $Then ? Then
: R extends $Else ? [T] extends [boolean] ? Else : Then
: never : never
