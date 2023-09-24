import type { IsAny } from '../any/is_any.js'
import type { $Else, $SelectionBranch, $Then } from '../type_plus/branch/selection.js'

/**
 * Is the type `T` exactly `null`.
 *
 * ```ts
 * type R = IsNull<null> // true
 *
 * type R = IsNull<never> // false
 * type R = IsNull<unknown> // false
 * type R = IsNull<string | boolean> // false
 * ```
 */

export type IsNull<T, Then = true, Else = false> = IsAny<
T,
$SelectionBranch> extends infer R
? R extends $Then ? Else
: R extends $Else ? [T, null] extends [null, T] ? Then : Else
: never : never

