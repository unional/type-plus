import type { $SelectInvert } from '../type_plus/branch/$select_invert.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is not `null`.
 *
 * ```ts
 * type R = IsNotNull<null> // false
 *
 * type R = IsNotNull<never> // true
 * type R = IsNotNull<unknown> // true
 * type R = IsNotNull<string | boolean> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is not `null`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsNotNull<null, { selection: 'filter' }> // never
 *
 * type R = IsNotNull<never, { selection: 'filter' }> // never
 * type R = IsNotNull<unknown, { selection: 'filter' }> // unknown
 * type R = IsNotNull<string | boolean, { selection: 'filter' }> // string | boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Disable distribution of union types.
 *
 * @example
 * ```ts
 * type R = IsNotNull<null | 1> // boolean
 * type R = IsNotNull<null | 1, { distributive: false }> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNotNull<string, $SelectionBranch> // $Then
 * type R = IsNotNull<null, $SelectionBranch> // $Else
 * ```
 */
export type IsNotNull<T, $O extends IsNotNull.$Options = {}> = $SelectInvert<T, null, $O>

export namespace IsNotNull {
	export type $Options = $SelectInvert.$Options
	export type $Default = $SelectInvert.$Default
	export type $Branch = $SelectInvert.$Branch
}
