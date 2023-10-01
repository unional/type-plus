import type { IsAnyOrNever } from '../mix_types/is_any_or_never.js'
import type { SelectWithDistribute } from '../type_plus/branch/select_with_distribute.js'
import type { $Else, $ResolveSelection, $SelectionBranch, $Then } from '../type_plus/branch/selection.js'
import type { $ResolveOptions } from '../type_plus/resolve_options.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is not exactly `bigint`, returns true for bigint literals or other types.
 *
 * @example
 * ```ts
 * type R = IsNotStrictBigint<bigint> // false
 *
 * type R = IsNotStrictBigint<1n> // true
 * type R = IsNotStrictBigint<never> // true
 * type R = IsNotStrictBigint<unknown> // true
 * type R = IsNotStrictBigint<string | boolean> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is not exactly `bigint`, returns `T` for bigint literals or other types.
 *
 * @example
 * ```ts
 * type R = IsNotStrictBigint<bigint, { selection: 'filter' }> // never
 * type R = IsNotStrictBigint<1n, { selection: 'filter' }> // 1n
 *
 * type R = IsNotStrictBigint<never, { selection: 'filter' }> // never
 * type R = IsNotStrictBigint<unknown, { selection: 'filter' }> // unknown
 * type R = IsNotStrictBigint<string | boolean, { selection: 'filter' }> // string | boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Disable distribution of union types.
 *
 * @example
 * ```ts
 * type R = IsNotStrictBigint<bigint | 1> // boolean
 * type R = IsNotStrictBigint<bigint | 1, { distributive: false }> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNotStrictBigint<string, $SelectionBranch> // $Then
 * type R = IsNotStrictBigint<bigint, $SelectionBranch> // $Else
 * ```
 */
export type IsNotStrictBigint<
	T,
	$O extends IsNotStrictBigint.$Options = {}
> =
	IsAnyOrNever<T, $SelectionBranch> extends infer R
	? R extends $Then ? $ResolveSelection<$O, T, $Then>
	: R extends $Else ? ($ResolveOptions<[$O['distributive'], SelectWithDistribute.$Default['distributive']]> extends true
		? IsNotStrictBigint._D<T, $O>
		: IsNotStrictBigint._N<T, $O>)
	: never : never

	export namespace IsNotStrictBigint {
	export type $Options = SelectWithDistribute.$Options
	export type $Default = SelectWithDistribute.$Default
	export type $Branch = SelectWithDistribute.$Branch
	export type _D<T, $O extends IsNotStrictBigint.$Options> = (bigint extends T
		? (T extends bigint
			? (`${T}` extends `${number}`
				? $ResolveSelection<$O, T, $Then>
				: $ResolveSelection<$O, T, $Else>)
			: $ResolveSelection<$O, T, $Then>)
		: $ResolveSelection<$O, T, $Then>)
	export type _N<T, $O extends IsNotStrictBigint.$Options> = ([bigint, T] extends [T, bigint]
		? (T extends bigint
			? (`${T}` extends `${number}`
				? $ResolveSelection<$O, T, $Then>
				: $ResolveSelection<$O, T, $Else>)
			: $ResolveSelection<$O, T, $Then>)
		: $ResolveSelection<$O, T, $Then>)
}
