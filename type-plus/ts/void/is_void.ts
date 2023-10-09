import type { $ResolveSelection } from '../type_plus/branch/$resolve_selection.js'
import type { SelectWithDistribute } from '../type_plus/branch/select_with_distribute.js'
import type { $Else, $SelectionBranch, $Then } from '../type_plus/branch/selection.js'
import type { IsUndefined } from '../undefined/is_undefined.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is `void`.
 *
 * @example
 * ```ts
 * type R = IsVoid<void> // true
 *
 * type R = IsVoid<never> // false
 * type R = IsVoid<unknown> // false
 * type R = IsVoid<string | boolean> // false
 *
 * type R = IsVoid<string | void> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is `void`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsVoid<void, { selection: 'filter' }> // void
 *
 * type R = IsVoid<never, { selection: 'filter' }> // never
 * type R = IsVoid<unknown, { selection: 'filter' }> // never
 * type R = IsVoid<string | boolean, { selection: 'filter' }> // never
 *
 * type R = IsVoid<string | void> // void
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = IsVoid<void | 1> // boolean
 * type R = IsVoid<void | 1, { distributive: false }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsVoid<void, $SelectionBranch> // $Then
 * type R = IsVoid<string, $SelectionBranch> // $Else
 * ```
 */
export type IsVoid<
	T,
	$O extends IsVoid.$Options = {}
> = IsUndefined<T, $SelectionBranch> extends infer R
	? R extends $Then ? $ResolveSelection<$O, T, $Else>
	: SelectWithDistribute<T, void, $O>
	: never

export namespace IsVoid {
	export type $Options = SelectWithDistribute.$Options
	export type $Default = SelectWithDistribute.$Default
	export type $Branch = SelectWithDistribute.$Branch
}
