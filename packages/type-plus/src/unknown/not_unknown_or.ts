import type { $Unknown } from '../$type/branch/$unknown.js'
import type { IsUnknown } from './is_unknown.js'

/**
 * 🌪️ *filter*
 *
 * Returns `T` if `T` is not `unknown`, otherwise `$Unknown`.
 *
 * @example
 * ```ts
 * type R = NotUnknownOr<number> // number
 * type R = NotUnknownOr<unknown> // $Unknown
 *
 * // customize
 * type R = NotUnknownOr<unknown, number> // number
 * ```
 *
 * 🔢 *customize*
 *
 * Replace `unknown` branch with `Replace`.
 *
 * @example
 * ```ts
 * type R = NotUnknownOr<unknown, number> // number
 * ```
 */
export type NotUnknownOr<T, Else = $Unknown> = IsUnknown<
	T,
	{
		$then: Else
		$else: T
	}
>
