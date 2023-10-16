import type { $SelectInvert } from '../type_plus/branch/$select_invert.js'

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

export type IsNotSymbol<T, $O extends IsNotSymbol.$Options = {}> = $SelectInvert<T, symbol, $O>

export namespace IsNotSymbol {
	export type $Options = $SelectInvert.$Options
	export type $Default = $SelectInvert.$Default
	export type $Branch = $SelectInvert.$Branch
}
