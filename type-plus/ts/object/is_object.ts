import type { $Select } from '../type_plus/branch/$select.js'

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

export type IsObject<T, $O extends IsObject.$Options = {}> = $Select<T, object, $O>

export namespace IsObject {
	export type $Options = $Select.$Options
	export type $Default = $Select.$Default
	export type $Branch = $Select.$Branch
}
