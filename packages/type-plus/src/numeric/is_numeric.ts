import type { $Select } from '../$type/branch/$select.js'

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
export type IsNumeric<T, $O extends IsNumeric.$Options = {}> = $Select<T, number | bigint, $O>

export namespace IsNumeric {
	export type $Options = $Select.$Options
	export type $Default = $Select.$Default
	export type $Branch = $Select.$Branch
}
