import type { SelectInvertWithDistribute } from '../type_plus/branch/select_invert_with_distribute.js'

/**
 * Is the type `T` not exactly `true`.
 *
 * ```ts
 * type R = IsNotTrue<true> // false
 *
 * type R = IsNotTrue<false> // true
 * type R = IsNotTrue<unknown> // true
 * ```
 */

export type IsNotTrue<T, $O extends IsNotTrue.$Options = {}> = SelectInvertWithDistribute<T, true, $O>

export namespace IsNotTrue {
	export type $Options = SelectInvertWithDistribute.$Options
	export type $Default = SelectInvertWithDistribute.$Default
	export type $Branch = SelectInvertWithDistribute.$Branch
}
