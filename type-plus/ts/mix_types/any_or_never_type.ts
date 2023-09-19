import type { AnyType } from '../any/any_type.js'
import type { NeverType } from '../never/never_type.js'

/**
 * Parse `T` to ensure it is either exactly `any` or exactly `never`.
 *
 * 🌪️ *filter*
 * 🩳 *shortcut*
 *
 * @example
 * ```ts
 * type R = AnyOrNeverType<any> // any
 * type R = AnyOrNeverType<never> // never
 * type R = AnyOrNeverType<never, 1, 2> // 1
 *
 * type R = AnyOrNeverType<unknown> // never
 * type R = AnyOrNeverType<unknown, 1, 2> // 2
 * type R = AnyOrNeverType<string | boolean> // never
 * ```
 */
export type AnyOrNeverType<T, Then = T, Else = never> = NeverType<T, {
	$then: Then,
	$else: AnyType<T, { $then: Then, $else: Else }>
}>
