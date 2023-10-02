import type { IsAnyOrNever } from '../index.js'
import { type Numeric } from './numeric_type.js'

/**
 * Is `T` not numeric.
 *
 * ```ts
 * type R = IsNotNumeric<1> // false
 * type R = IsNotNumeric<1.1> // false
 *
 * type R = IsNotNumeric<string> // true
 * type R = IsNotNumeric<unknown> // true
 * ```
 */

export type IsNotNumeric<T, Then = true, Else = false> = IsAnyOrNever<T, {
	$then: Then,
	$else: [T] extends [Numeric] ? Else : Then
}>
