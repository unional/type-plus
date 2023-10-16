import type { IsAnyOrNever } from '../mix_types/is_any_or_never.js'
import type { $ResolveOptions } from '../type_plus/$resolve_options.js'
import type { $ResolveBranch } from '../type_plus/branch/$resolve_branch.js'
import type { SelectWithDistribute } from '../type_plus/branch/select_with_distribute.js'
import type { $Else, $SelectionBranch, $Then } from '../type_plus/branch/selection.js'

/**
 * Is the type `T` exactly `string`.
 *
 * ```ts
 * type R = IsStrictString<string> // true
 *
 * type R = IsStrictString<''> // false
 * type R = IsStrictString<'a'> // false
 * type R = IsStrictString<string | boolean> // false
 * type R = IsStrictString<never> // false
 * type R = IsStrictString<unknown> // false
 * ```
 */

export type IsStrictString<
	T,
	$O extends IsStrictString.$Options = {}
> =
	IsAnyOrNever<T, $SelectionBranch> extends infer R
	? R extends $Then ? $ResolveBranch<T, $O, [$Else]>
	: R extends $Else ? ($ResolveOptions<[$O['distributive'], SelectWithDistribute.$Default['distributive']]> extends true
		? IsStrictString._D<T, $O>
		: IsStrictString._N<T, $O>)
	: never : never

export namespace IsStrictString {
	export type $Options = SelectWithDistribute.$Options
	export type $Default = SelectWithDistribute.$Default
	export type $Branch = SelectWithDistribute.$Branch
	export type _D<T, $O extends IsStrictString.$Options> =
		T extends string & infer U
		? (
			U extends string
			? $ResolveBranch<T, $O, [$Else]>
			: $ResolveBranch<T, $O, [$Then]>
		)
		: $ResolveBranch<T, $O, [$Else]>
	export type _N<T, $O extends IsStrictString.$Options> =
		[string, T] extends [T, string]
		? $ResolveBranch<T, $O, [$Then]>
		: $ResolveBranch<T, $O, [$Else]>
}
