import type { SelectWithDistribute } from '../type_plus/branch/select_with_distribute.js'

/**
 * Is the type `T` exactly `false`.
 *
 * ```ts
 * type R = IsFalse<false> // true
 *
 * type R = IsFalse<true> // false
 * type R = IsFalse<unknown> // false
 * ```
 */

export type IsFalse<T, $O extends IsFalse.$Options = {}> = SelectWithDistribute<T, false, $O>

export namespace IsFalse {
	export type $Options = SelectWithDistribute.$Options
	export type $Default = SelectWithDistribute.$Default
	export type $Branch = SelectWithDistribute.$Branch
}
