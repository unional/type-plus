import type { $Unknown } from './unknown.js'
import { type UnknownType } from './unknown_type.js'

/**
 * 🌪️ *filter*
 * 🔢 *customize*
 *
 * Returns `T` if `T` is not `unknown`, otherwise `Else`.
 *
 * @example
 * ```ts
 * type R = NotUnknownOr<number> // number
 * type R = NotUnknownOr<unknown> // $Unknown
 *
 * // customize
 * type R = NotUnknownOr<unknown, number> // number
 * ```
 */
export type NotUnknownOr<T, Else = $Unknown> = UnknownType<T, {
	$then: Else, $else: T
}>
