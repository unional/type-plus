import type { $SelectInvert } from '../type_plus/branch/$select_invert.js'

/**
 * Is `T` not an `object`.
 *
 * Note that `Function` is also an `object`.
 *
 * ```ts
 * type R = IsNotObject<{}> // false
 * type R = IsNotObject<{ a: 1 }> // false
 * type R = IsNotObject<Function> // false
 *
 * type R = IsNotObject<number> // true
 * ```
 */

export type IsNotObject<T, $O extends IsNotObject.$Options = {}> = $SelectInvert<T, object, $O>

export namespace IsNotObject {
	export type $Options = $SelectInvert.$Options
	export type $Default = $SelectInvert.$Default
	export type $Branch = $SelectInvert.$Branch
}
