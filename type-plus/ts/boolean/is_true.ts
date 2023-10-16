import type { $Select } from '../type_plus/branch/$select.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is `true`.
 *
 * @example
 * ```ts
 * type R = IsTrue<boolean> // boolean
 * type R = IsTrue<true> // true
 * type R = IsTrue<false> // false
 *
 * type R = IsTrue<number> // false
 * type R = IsTrue<unknown> // false
 * type R = IsTrue<string | boolean> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is `true`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsTrue<boolean, { selection: 'filter' }> // true
 * type R = IsTrue<true, { selection: 'filter' }> // true
 * type R = IsTrue<false, { selection: 'filter' }> // never
 *
 * type R = IsTrue<number, { selection: 'filter' }> // never
 * type R = IsTrue<unknown, { selection: 'filter' }> // never
 * type R = IsTrue<never, { selection: 'filter' }> // never
 * type R = IsTrue<string | boolean, { selection: 'filter' }> // true
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = IsTrue<true | 1> // boolean
 * type R = IsTrue<boolean | 1> // boolean
 * type R = IsTrue<true | 1, { distributive: false }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsTrue<true, $SelectionBranch> // $Then
 * type R = IsTrue<boolean, $SelectionBranch> // $Then | $Else
 * type R = IsTrue<string, $SelectionBranch> // $Else
 * ```
 */
export type IsTrue<T, $O extends IsTrue.$Options = {}> = $Select<T, true, $O>

export namespace IsTrue {
	export type $Options = $Select.$Options
	export type $Default = $Select.$Default
	export type $Branch = $Select.$Branch
}
