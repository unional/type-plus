import type { TypePredicate } from '../type_plus/type_predicate.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is `null`.
 *
 * @example
 * ```ts
 * type R = IsNull<null> // true
 *
 * type R = IsNull<never> // false
 * type R = IsNull<unknown> // false
 * type R = IsNull<string | boolean> // false
 *
 * type R = IsNull<string | null> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is `null`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsNull<null, { selection: 'filter' }> // null
 *
 * type R = IsNull<never, { selection: 'filter' }> // never
 * type R = IsNull<unknown, { selection: 'filter' }> // never
 * type R = IsNull<string | boolean, { selection: 'filter' }> // never
 *
 * type R = IsNull<string | null> // null
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is `null`, otherwise returns `unknown`.
 *
 * @example
 * ```ts
 * type R = IsNull<null, { selection: 'filter-unknown' }> // null
 *
 * type R = IsNull<never, { selection: 'filter-unknown' }> // unknown
 * type R = IsNull<unknown, { selection: 'filter-unknown' }> // unknown
 * type R = IsNull<string | boolean, { selection: 'filter-unknown' }> // unknown
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = IsNull<null | 1> // boolean
 * type R = IsNull<null | 1, { distributive: false }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNull<null, $SelectionBranch> // $Then
 * type R = IsNull<string, $SelectionBranch> // $Else
 * ```
 */
export type IsNull<T, $O extends IsNull.$Options = {}> = TypePredicate<T, null, $O>

export namespace IsNull {
	export type $Options = TypePredicate.$Options
	export type $Default = TypePredicate.$Default
	export type $Branch = TypePredicate.$Branch
}
