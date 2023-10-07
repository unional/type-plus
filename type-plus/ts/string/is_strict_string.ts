import type { IsAnyOrNever } from '../mix_types/is_any_or_never.js'
import type { SelectWithDistribute } from '../type_plus/branch/select_with_distribute.js'
import type { $Else, $ResolveSelection, $SelectionBranch, $Then } from '../type_plus/branch/selection.js'
import type { $ResolveOptions } from '../type_plus/resolve_options.js'

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
	? R extends $Then ? $ResolveSelection<$O, T, $Else>
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
			? $ResolveSelection<$O, T, $Else>
			: $ResolveSelection<$O, T, $Then>
		)
		: $ResolveSelection<$O, T, $Else>
	export type _N<T, $O extends IsStrictString.$Options> =
		[string, T] extends [T, string]
		? $ResolveSelection<$O, T, $Then>
		: $ResolveSelection<$O, T, $Else>
}
