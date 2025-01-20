import type { $Select } from '../$type/branch/$select.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is `Function` or function signature.
 *
 * @example
 * ```ts
 * type R = IsFunction<Function> // true
 * type R = IsFunction<() => void> // true
 *
 * type R = IsFunction<never> // false
 * type R = IsFunction<unknown> // false
 * type R = IsFunction<number> // false
 *
 * type R = IsFunction<Function | number> // boolean
 * type R = IsFunction<(() => string) | number> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is `Function` or function signature, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsFunction<Function, { selection: 'filter' }> // Function
 * type R = IsFunction<() => void, { selection: 'filter' }> // () => void
 *
 * type R = IsFunction<never, { selection: 'filter' }> // never
 * type R = IsFunction<unknown, { selection: 'filter' }> // never
 * type R = IsFunction<Function | number, { selection: 'filter' }> // Function
 *
 * type R = IsFunction<(() => string) | number, { selection: 'filter' }> // () => string
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = IsFunction<Function | 1> // boolean
 * type R = IsFunction<Function | 1, { distributive: false }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsFunction<Function, $SelectionBranch> // $Then
 * type R = IsFunction<string, $SelectionBranch> // $Else
 * ```
 */
export type IsFunction<T, $O extends IsFunction.$Options = {}> = $Select<T, Function, $O>

export namespace IsFunction {
	export type $Options = $Select.$Options
	export type $Default = $Select.$Default
	export type $Branch = $Select.$Branch
}
