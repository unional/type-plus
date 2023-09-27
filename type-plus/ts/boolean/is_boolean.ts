import type { IsAnyOrNever } from '../mix_types/is_any_or_never.js'
import type { $Else, $SelectionBranch, $Then } from '../type_plus/branch/selection.js'

/**
 * Is the type `T` `boolean`, including `true` and `false`.
 *
 * ```ts
 * type R = IsBoolean<boolean> // true
 * type R = IsBoolean<true> // true
 * type R = IsBoolean<false> // true
 *
 * type R = IsBoolean<number> // false
 * type R = IsBoolean<unknown> // false
 * ```
 */

export type IsBoolean<T, Then = true, Else = false> = IsAnyOrNever<
T,
$SelectionBranch> extends infer R
? R extends $Then ? Else
: R extends $Else ? [T] extends [boolean] ? Then : Else
: never : never
