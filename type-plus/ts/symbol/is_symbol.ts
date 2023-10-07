import type { SelectWithDistribute } from '../type_plus/branch/select_with_distribute.js'

/**
 * Is the type `T` exactly `symbol`.
 *
 * ```ts
 * type R = IsSymbol<symbol> // true
 *
 * type R = IsSymbol<never> // false
 * type R = IsSymbol<unknown> // false
 * type R = IsSymbol<symbol | boolean> // false
 * ```
 */

export type IsSymbol<T, $O extends IsSymbol.$Options = {}> = SelectWithDistribute<T, symbol, $O>

export namespace IsSymbol {
	export type $Options = SelectWithDistribute.$Options
	export type $Default = SelectWithDistribute.$Default
	export type $Branch = SelectWithDistribute.$Branch
}
