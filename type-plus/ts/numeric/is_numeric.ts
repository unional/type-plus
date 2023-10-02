import type { IsAnyOrNever } from '../mix_types/is_any_or_never.js'
import { type Numeric } from './numeric_type.js'

/**
 * Is `T` numeric.
 *
 * ```ts
 * type R = IsNumeric<1> // true
 * type R = IsNumeric<1.1> // true
 *
 * type R = IsNumeric<string> // false
 * type R = IsNumeric<unknown> // false
 * ```
 */

export type IsNumeric<T, Then = true, Else = false> = IsAnyOrNever<T, {
	$then: Else,
	$else: [T] extends [Numeric] ? Then : Else
}>
