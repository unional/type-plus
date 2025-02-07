import type { $Equal } from '../$type/equal/$equal.js'

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
export type IsNumeric<T, $O extends IsNumeric.$Options = {}> = $Equal<T, number | bigint, $O>

export namespace IsNumeric {
	export type $Options = $Equal.$Options
	export type $Default = $Equal.$Default
	export type $Branch = $Equal.$Branch
}
