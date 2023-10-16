import type { IsAnyOrNever } from '../mix_types/is_any_or_never.js'
import type { $ResolveOptions } from '../type_plus/$resolve_options.js'
import type { $ResolveBranch } from '../type_plus/branch/$resolve_branch.js'
import type { SelectInvertWithDistribute } from '../type_plus/branch/select_invert_with_distribute.js'
import type { $Else, $SelectionBranch, $Then } from '../type_plus/branch/selection.js'

/**
 * Is the type `T` not exactly `string`.
 *
 * ```ts
 * type R = IsNotStrictString<string> // false
 *
 * type R = IsNotStrictString<''> // true
 * type R = IsNotStrictString<'a'> // true
 * type R = IsNotStrictString<string | boolean> // true
 * type R = IsNotStrictString<never> // true
 * type R = IsNotStrictString<unknown> // true
 * ```
 */

export type IsNotStrictString<
	T,
	$O extends IsNotStrictString.$Options = {}
> =
	IsAnyOrNever<T, $SelectionBranch> extends infer R
	? R extends $Then ? $ResolveBranch<T, $O, [$Then]>
	: R extends $Else ? ($ResolveOptions<[$O['distributive'], SelectInvertWithDistribute.$Default['distributive']]> extends true
		? IsNotStrictString._D<T, $O>
		: IsNotStrictString._N<T, $O>)
	: never : never

export namespace IsNotStrictString {
	export type $Options = SelectInvertWithDistribute.$Options
	export type $Default = SelectInvertWithDistribute.$Default
	export type $Branch = SelectInvertWithDistribute.$Branch
	export type _D<T, $O extends IsNotStrictString.$Options> =
		T extends string & infer U
		? (
			U extends string
			? $ResolveBranch<T, $O, [$Then]>
			: $ResolveBranch<T, $O, [$Else]>
		)
		: $ResolveBranch<T, $O, [$Then]>
	export type _N<T, $O extends IsNotStrictString.$Options> =
		[string, T] extends [T, string]
		? $ResolveBranch<T, $O, [$Else]>
		: $ResolveBranch<T, $O, [$Then]>
}
