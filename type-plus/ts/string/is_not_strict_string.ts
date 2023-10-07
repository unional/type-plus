import type { IsAnyOrNever } from '../mix_types/is_any_or_never.js'
import type { SelectInvertWithDistribute } from '../type_plus/branch/select_invert_with_distribute.js'
import type { $Else, $ResolveSelection, $SelectionBranch, $Then } from '../type_plus/branch/selection.js'
import type { $ResolveOptions } from '../type_plus/$resolve_options.js'

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
	? R extends $Then ? $ResolveSelection<$O, T, $Then>
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
			? $ResolveSelection<$O, T, $Then>
			: $ResolveSelection<$O, T, $Else>
		)
		: $ResolveSelection<$O, T, $Then>
	export type _N<T, $O extends IsNotStrictString.$Options> =
		[string, T] extends [T, string]
		? $ResolveSelection<$O, T, $Else>
		: $ResolveSelection<$O, T, $Then>
}
