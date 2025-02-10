import type { $Unknown } from '../$type/special/$unknown.js'
import type { IsNotUnknown } from './is_not_unknown.js'

/**
 * 🌪️ **filter**
 *
 * Returns `T` if `T` is not `unknown`, otherwise `$Unknown`.
 *
 * @example
 * ```ts
 * type R = NotUnknownOr<number> // number
 * type R = NotUnknownOr<unknown> // $Unknown
 * ```
 *
 * Replace `unknown` branch with specified type.
 *
 * @example
 * ```ts
 * type R = NotUnknownOr<unknown, number> // number
 * ```
 *
 * 🔄 **alias**
 *
 * @alias Alias of [`IsNotUnknown<T, { selection: 'filter', $else: Else }>`](./is_not_unknown.ts)
 */
export type NotUnknownOr<T, Else = $Unknown> = IsNotUnknown<
	T,
	{
		selection: 'filter'
		$else: Else
	}
>
