import type { NeverType } from './never_type.js'

/**
 * Is `T` `never`.
 *
 * ```ts
 * type R = IsNever<never> // true
 *
 * type R = IsNever<1> // false
 * ```
 */

export type IsNever<T, Then = true, Else = false> = NeverType<T, {
	$then: Then,
	$else: Else
}>
