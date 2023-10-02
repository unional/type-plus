import type { SelectWithDistribute } from '../type_plus/branch/select_with_distribute.js'

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
export type IsNumeric<T, $O extends IsNumeric.$Options = {}> = SelectWithDistribute<T, number | bigint, $O>

export namespace IsNumeric {
	export type $Options = SelectWithDistribute.$Options
	export type $Default = SelectWithDistribute.$Default
	export type $Branch = SelectWithDistribute.$Branch
}
