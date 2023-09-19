import type { AnyType } from '../any/any_type.js'
import type { NeverType } from '../never/never_type.js'

/**
 * Validate if `T` is either exactly `any` or exactly `never`.
 *
 * 🎭 *predicate*
 * 🩳 *shortcut*
 *
 * @example
 * ```ts
 * type R = IsAnyOrNever<any> // true
 * type R = IsAnyOrNever<never> // true
 *
 * type R = IsAnyOrNever<1> // false
 * type R = IsAnyOrNever<unknown> // false
 * ```
 */

export type IsAnyOrNever<T, Then = true, Else = false> = NeverType<T, {
	$then: Then, $else: AnyType<T, { $then: Then, $else: Else }>
}>
