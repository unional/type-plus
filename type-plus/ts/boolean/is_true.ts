import type { SelectWithDistribute } from '../type_plus/branch/select_with_distribute.js'

/**
 * Is the type `T` exactly `true`.
 *
 * ```ts
 * type R = IsTrue<true> // true
 *
 * type R = IsTrue<false> // false
 * type R = IsTrue<unknown> // false
 * ```
 */

export type IsTrue<T, $O extends IsTrue.$Options = {}> = SelectWithDistribute<T, true, $O>

export namespace IsTrue {
	export type $Options = SelectWithDistribute.$Options
	export type $Default = SelectWithDistribute.$Default
	export type $Branch = SelectWithDistribute.$Branch
}
