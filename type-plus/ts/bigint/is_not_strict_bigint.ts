import type { IsAnyOrNever } from '../mix_types/is_any_or_never.js'
import type { $ResolveOptions } from '../type_plus/$resolve_options.js'
import type { $ResolveBranch } from '../type_plus/branch/$resolve_branch.js'
import type { $Select } from '../type_plus/branch/$select.js'
import type { $Else, $SelectionBranch, $Then } from '../type_plus/branch/selection.js'

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
	? R extends $Then ? $ResolveBranch<T, $O, [$Then]>
	: R extends $Else ? ($ResolveOptions<[$O['distributive'], $Select.$Default['distributive']]> extends true
		? IsNotStrictBigint._D<T, $O>
		: IsNotStrictBigint._N<T, $O>)
	: never : never

export namespace IsNotStrictBigint {
	export type $Options = $Select.$Options
	export type $Default = $Select.$Default
	export type $Branch = $Select.$Branch
	export type _D<T, $O extends IsNotStrictBigint.$Options> =
		T extends bigint
		? (`${T}` extends `${number}`
			? $ResolveBranch<T, $O, [$Then]>
			: $ResolveBranch<T, $O, [$Else]>)
		: $ResolveBranch<T, $O, [$Then]>
	export type _N<T, $O extends IsNotStrictBigint.$Options> = ([bigint, T] extends [T, bigint]
		? (T extends bigint
			? (`${T}` extends `${number}`
				? $ResolveBranch<T, $O, [$Then]>
				: $ResolveBranch<T, $O, [$Else]>)
			: $ResolveBranch<T, $O, [$Then]>)
		: $ResolveBranch<T, $O, [$Then]>)
}
