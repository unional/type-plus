import type { SelectInvertWithDistribute } from '../type_plus/branch/select_invert_with_distribute.js'

/**
 * Is the type `T` not `symbol`.
 *
 * ```ts
 * type R = IsNotSymbol<symbol> // false
 *
 * type R = IsNotSymbol<never> // true
 * type R = IsNotSymbol<unknown> // true
 * type R = IsNotSymbol<symbol | boolean> // true
 * ```
 */

export type IsNotSymbol<T, $O extends IsNotSymbol.$Options = {}> = SelectInvertWithDistribute<T, symbol, $O>

export namespace IsNotSymbol {
	export type $Options = SelectInvertWithDistribute.$Options
	export type $Default = SelectInvertWithDistribute.$Default
	export type $Branch = SelectInvertWithDistribute.$Branch
}
