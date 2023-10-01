import type { SelectWithDistribute } from '../type_plus/branch/select_with_distribute.js'

/**
 * Is the type `T` `boolean`, including `true` and `false`.
 *
 * ```ts
 * type R = IsBoolean<boolean> // true
 * type R = IsBoolean<true> // true
 * type R = IsBoolean<false> // true
 *
 * type R = IsBoolean<number> // false
 * type R = IsBoolean<unknown> // false
 * ```
 */

export type IsBoolean<T, $O extends IsBoolean.$Options = {}> = SelectWithDistribute<T, boolean, $O>

export namespace IsBoolean {
	export type $Options = SelectWithDistribute.$Options
	export type $Default = SelectWithDistribute.$Default
	export type $Branch = SelectWithDistribute.$Branch
}
