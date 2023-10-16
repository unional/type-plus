import type { $SelectInvert } from '../type_plus/branch/$select_invert.js'

/**
 * Is `T` not a `Function`.
 *
 * ```ts
 * type R = IsNotFunction<Function> // false
 * type R = IsNotFunction<() => void> // false
 * type R = IsNotFunction<(() => void) | { a: 1 }> // false
 *
 * type R = IsNotFunction<{ a: 1 }> // true
 * type R = IsNotFunction<never> // true
 * ```
 */

export type IsNotFunction<T, $O extends IsNotFunction.$Options = {}> = $SelectInvert<T, Function, $O>

export namespace IsNotFunction {
	export type $Options = $SelectInvert.$Options
	export type $Default = $SelectInvert.$Default
	export type $Branch = $SelectInvert.$Branch
}
