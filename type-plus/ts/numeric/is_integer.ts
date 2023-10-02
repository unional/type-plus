import type { IsAnyOrNever } from '../mix_types/is_any_or_never.js'
import type { $Else, $SelectionBranch, $Then } from '../type_plus/branch/selection.js'
import type { Numeric } from './numeric_type.js'

/**
 * Is T an integer, including bigint.
 *
 * ```ts
 * type R = IsInteger<0> // true
 * type R = IsInteger<1n> // true
 *
 * type R = IsInteger<1.1> // false
 * type R = IsInteger<number> // false as it contains non-integer
 * ```
 */

export type IsInteger<T, Then = true, Else = false> = IsAnyOrNever<
T,
$SelectionBranch> extends infer R
? R extends $Then ? Else
: R extends $Else ? [T] extends [Numeric] ? (`${T}` extends `${bigint}` ? Then : Else) : Else
: never : never
