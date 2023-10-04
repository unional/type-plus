import type { SelectWithDistribute } from '../type_plus/branch/select_with_distribute.js'

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

export type IsFunction<T, $O extends IsFunction.$Options = {}> = SelectWithDistribute<T, Function, $O>

export namespace IsFunction {
	export type $Options = SelectWithDistribute.$Options
	export type $Default = SelectWithDistribute.$Default
	export type $Branch = SelectWithDistribute.$Branch
}
