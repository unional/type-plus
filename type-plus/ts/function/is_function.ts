import type { $Select } from '../type_plus/branch/$select.js'

/**
 * Is `T` a `Function`.
 *
 * ```ts
 * type R = IsFunction<Function> // Function
 * type R = IsFunction<() => void> // () => void
 * type R = IsFunction<(() => void) | { a: 1 }> // (() => void) | { a: 1 }
 *
 * type R = IsFunction<{ a: 1 }> // never
 * type R = IsFunction<never> // never
 * type R = IsFunction<unknown> // never
 * ```
 */

export type IsFunction<T, $O extends IsFunction.$Options = {}> = $Select<T, Function, $O>

export namespace IsFunction {
	export type $Options = $Select.$Options
	export type $Default = $Select.$Default
	export type $Branch = $Select.$Branch
}
