import type { $SelectInvert } from '../$type/branch/$select_invert.js'

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

export type IsNotNumeric<T, $O extends IsNotNumeric.$Options = {}> = $SelectInvert<T, number | bigint, $O>

export namespace IsNotNumeric {
	export type $Options = $SelectInvert.$Options
	export type $Default = $SelectInvert.$Default
	export type $Branch = $SelectInvert.$Branch
}
