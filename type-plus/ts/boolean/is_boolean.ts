import type { SelectWithDistribute } from '../type_plus/branch/select_with_distribute.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is `boolean`, including `true` and `false`.
 *
 * @example
 * ```ts
 * type R = IsBoolean<boolean> // true
 * type R = IsBoolean<true> // true
 * type R = IsBoolean<false> // true
 *
 * type R = IsBoolean<number> // false
 * type R = IsBoolean<unknown> // false
 * type R = IsBoolean<string | boolean> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is `boolean`, including `true` and `false`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsBoolean<boolean, { selection: 'filter' }> // boolean
 * type R = IsBoolean<true, { selection: 'filter' }> // true
 * type R = IsBoolean<false, { selection: 'filter' }> // true
 *
 * type R = IsBoolean<number, { selection: 'filter' }> // never
 * type R = IsBoolean<unknown, { selection: 'filter' }> // never
 * type R = IsBoolean<never, { selection: 'filter' }> // never
 * type R = IsBoolean<string | boolean, { selection: 'filter' }> // boolean
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = IsBoolean<boolean | 1> // boolean
 * type R = IsBoolean<boolean | 1, { distributive: false }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsBoolean<boolean, $SelectionBranch> // $Then
 * type R = IsBoolean<string, $SelectionBranch> // $Else
 * ```
 */
export type IsBoolean<T, $O extends IsBoolean.$Options = {}> = SelectWithDistribute<T, boolean, $O>

export namespace IsBoolean {
	export type $Options = SelectWithDistribute.$Options
	export type $Default = SelectWithDistribute.$Default
	export type $Branch = SelectWithDistribute.$Branch
}
