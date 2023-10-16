import type { $Select } from '../type_plus/branch/$select.js'

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

export type IsSymbol<T, $O extends IsSymbol.$Options = {}> = $Select<T, symbol, $O>

export namespace IsSymbol {
	export type $Options = $Select.$Options
	export type $Default = $Select.$Default
	export type $Branch = $Select.$Branch
}
