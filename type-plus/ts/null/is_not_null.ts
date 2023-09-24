import type { TypeNotPredicate } from '../type_plus/type_not_predicate.js'

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
 * Filter to ensure `T` is not `null`, otherwise returns `unknown`.
 *
 * @example
 * ```ts
 * type R = IsNotNull<null, { selection: 'filter-unknown' }> // unknown
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
export type IsNotNull<T, $O extends IsNotNull.$Options = {}> = TypeNotPredicate<T, null, $O>

export namespace IsNotNull {
	export type $Options = TypeNotPredicate.$Options
	export type $Default = TypeNotPredicate.$Default
	export type $Branch = TypeNotPredicate.$Branch
}
