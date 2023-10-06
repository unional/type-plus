import type { SelectWithDistribute } from '../type_plus/branch/select_with_distribute.js'

/**
 * Is `T` an `object`.
 *
 * Note that `Function`, `Array`, and *tuple* are also `object`.
 *
 * ```ts
 * type R = IsObject<{}> // true
 * type R = IsObject<{ a: 1 }> // true
 * type R = IsObject<Function> // true
 *
 * type R = IsObject<number> // false
 * ```
 */

export type IsObject<T, $O extends IsObject.$Options = {}> = SelectWithDistribute<T, object, $O>

export namespace IsObject {
	export type $Options = SelectWithDistribute.$Options
	export type $Default = SelectWithDistribute.$Default
	export type $Branch = SelectWithDistribute.$Branch
}
