import type { TypeNotPredicate } from '../type_plus/type_not_predicate.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is not `undefined`.
 *
 * ```ts
 * type R = IsNotUndefined<undefined> // false
 *
 * type R = IsNotUndefined<never> // true
 * type R = IsNotUndefined<unknown> // true
 * type R = IsNotUndefined<string | boolean> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is not `undefined`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsNotUndefined<undefined, { selection: 'filter' }> // never
 *
 * type R = IsNotUndefined<never, { selection: 'filter' }> // never
 * type R = IsNotUndefined<unknown, { selection: 'filter' }> // unknown
 * type R = IsNotUndefined<string | boolean, { selection: 'filter' }> // string | boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is not `undefined`, otherwise returns `unknown`.
 *
 * @example
 * ```ts
 * type R = IsNotUndefined<undefined, { selection: 'filter-unknown' }> // unknown
 * ```
 *
 * 🔢 *customize*
 *
 * Disable distribution of union types.
 *
 * @example
 * ```ts
 * type R = IsNotUndefined<undefined | 1> // boolean
 * type R = IsNotUndefined<undefined | 1, { distributive: false }> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNotUndefined<string, $SelectionBranch> // $Then
 * type R = IsNotUndefined<undefined, $SelectionBranch> // $Else
 * ```
 */
export type IsNotUndefined<T, $O extends IsNotUndefined.$Options = {}> = TypeNotPredicate<T, undefined, $O>

export namespace IsNotUndefined {
	export type $Options = TypeNotPredicate.$Options
	export type $Default = TypeNotPredicate.$Default
	export type $Branch = TypeNotPredicate.$Branch
}
