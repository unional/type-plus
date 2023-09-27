import type { IsAnyOrNever } from '../mix_types/is_any_or_never.js'
import type { SelectWithDistribute } from '../type_plus/branch/select_with_distribute.js'
import type { $Else, $ResolveSelection, $SelectionBranch, $Then } from '../type_plus/branch/selection.js'
import type { $ResolveOptions } from '../type_plus/resolve_options.js'

/**
 * Is the type `T` exactly `bigint`.
 *
 * ```ts
 * type R = IsStrictBigint<bigint> // true
 *
 * type R = IsStrictBigint<1n> // false
 * type R = IsStrictBigint<number> // false
 * type R = IsStrictBigint<bigint | boolean> // false
 * type R = IsStrictBigint<unknown> // false
 * ```
 */
export type IsStrictBigint<
	T,
	$O extends IsStrictBigint.$Options = {}
> =
	IsAnyOrNever<T, $SelectionBranch> extends infer R
	? R extends $Then ? $ResolveSelection<$O, T, $Else>
	: R extends $Else ? ($ResolveOptions<[$O['distributive'], SelectWithDistribute.$Default['distributive']]> extends true
		? IsStrictBigint._D<T, $O>
		: IsStrictBigint._N<T, $O>)
	: never : never

export namespace IsStrictBigint {
	export type $Options = SelectWithDistribute.$Options
	export type $Default = SelectWithDistribute.$Default
	export type $Branch = SelectWithDistribute.$Branch
	export type _D<T, $O extends IsStrictBigint.$Options> = (bigint extends T
		? (T extends bigint
			? (`${T}` extends `${number}`
				? $ResolveSelection<$O, T, $Else>
				: $ResolveSelection<$O, T, $Then>)
			: $ResolveSelection<$O, T, $Else>)
		: $ResolveSelection<$O, T, $Else>)
	export type _N<T, $O extends IsStrictBigint.$Options> = ([bigint, T] extends [T, bigint]
		? (T extends bigint
			? (`${T}` extends `${number}`
				? $ResolveSelection<$O, T, $Else>
				: $ResolveSelection<$O, T, $Then>)
			: $ResolveSelection<$O, T, $Else>)
		: $ResolveSelection<$O, T, $Else>)
}
