import type { IsAnyOrNever } from '../mix_types/is_any_or_never.js'
import type { $Else, $SelectionBranch, $Then } from '../type_plus/branch/selection.js'

/**
 * Is the type `T` exactly `true`.
 *
 * ```ts
 * type R = IsTrue<true> // true
 *
 * type R = IsTrue<false> // false
 * type R = IsTrue<unknown> // false
 * ```
 */

export type IsTrue<T, Then = true, Else = false> = IsAnyOrNever<
T,
$SelectionBranch> extends infer R
? R extends $Then ? Else
: R extends $Else ? [T, true] extends [true, T] ? Then : Else
: never : never
