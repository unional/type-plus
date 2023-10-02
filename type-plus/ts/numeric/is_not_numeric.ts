import type { SelectInvertWithDistribute } from '../type_plus/branch/select_invert_with_distribute.js'

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

export type IsNotNumeric<T, $O extends IsNotNumeric.$Options = {}> = SelectInvertWithDistribute<T, number | bigint, $O>

export namespace IsNotNumeric {
	export type $Options = SelectInvertWithDistribute.$Options
	export type $Default = SelectInvertWithDistribute.$Default
	export type $Branch = SelectInvertWithDistribute.$Branch
}
