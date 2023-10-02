import type { IsAnyOrNever } from '../mix_types/is_any_or_never.js'
import type { $Else, $SelectionBranch, $Then } from '../type_plus/branch/selection.js'
import type { Numeric } from './numeric_type.js'

/**
 * Is T not an integer, including bigint.
 *
 * ```ts
 * import type { IsNotInteger } from 'type-plus'
 *
 * type R = IsNotInteger<1.1> // true
 * type R = IsNotInteger<number> // true as it contains non-integer
 *
 * type R = IsNotInteger<0> // false
 * type R = IsNotInteger<1n> // false
 * ```
 */

export type IsNotInteger<T, Then = true, Else = false> =  IsAnyOrNever<
T,
$SelectionBranch> extends infer R
? R extends $Then ? Then
: R extends $Else ? [T] extends [Numeric] ? (`${T}` extends `${bigint}` ? Else : Then) : Then
: never : never
