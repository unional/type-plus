import type { SelectWithDistribute } from '../type_plus/branch/select_with_distribute.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is `false`.
 *
 * @example
 * ```ts
 * type R = IsFalse<boolean> // boolean
 * type R = IsFalse<true> // false
 * type R = IsFalse<false> // true
 *
 * type R = IsFalse<number> // false
 * type R = IsFalse<unknown> // false
 * type R = IsFalse<string | boolean> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is `false`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsFalse<boolean, { selection: 'filter' }> // false
 * type R = IsFalse<true, { selection: 'filter' }> // never
 * type R = IsFalse<false, { selection: 'filter' }> // false
 *
 * type R = IsFalse<number, { selection: 'filter' }> // never
 * type R = IsFalse<unknown, { selection: 'filter' }> // never
 * type R = IsFalse<never, { selection: 'filter' }> // never
 * type R = IsFalse<string | boolean, { selection: 'filter' }> // false
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = IsFalse<false | 1> // boolean
 * type R = IsFalse<boolean | 1> // boolean
 * type R = IsFalse<boolean | 1, { distributive: false }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsFalse<false, $SelectionBranch> // $Then
 * type R = IsFalse<boolean, $SelectionBranch> // $Then | $Else
 * type R = IsFalse<string, $SelectionBranch> // $Else
 * ```
 */
export type IsFalse<T, $O extends IsFalse.$Options = {}> = SelectWithDistribute<T, false, $O>

export namespace IsFalse {
	export type $Options = SelectWithDistribute.$Options
	export type $Default = SelectWithDistribute.$Default
	export type $Branch = SelectWithDistribute.$Branch
}
