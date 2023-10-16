import type { IsAnyOrNever } from '../mix_types/is_any_or_never.js'
import type { $ResolveOptions } from '../type_plus/$resolve_options.js'
import type { $ResolveBranch } from '../type_plus/branch/$resolve_branch.js'
import type { $Select } from '../type_plus/branch/$select.js'
import type { $Else, $SelectionBranch, $Then } from '../type_plus/branch/selection.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is `bigint`, returns false for bigint literals or other types.
 *
 * @example
 * ```ts
 * type R = IsStrictBigint<bigint> // true
 *
 * type R = IsStrictBigint<1n> // false
 * type R = IsStrictBigint<never> // false
 * type R = IsStrictBigint<unknown> // false
 * type R = IsStrictBigint<string | boolean> // false
 *
 * type R = IsStrictBigint<string | bigint> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is `bigint`, returns `never` for bigint literals or other types.
 *
 * @example
 * ```ts
 * type R = IsStrictBigint<bigint, { selection: 'filter' }> // bigint
 *
 * type R = IsStrictBigint<1n, { selection: 'filter' }> // never
 * type R = IsStrictBigint<never, { selection: 'filter' }> // never
 * type R = IsStrictBigint<unknown, { selection: 'filter' }> // never
 * type R = IsStrictBigint<string | boolean, { selection: 'filter' }> // never
 *
 * type R = IsStrictBigint<string | bigint> // bigint
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = IsStrictBigint<bigint | 1> // boolean
 * type R = IsStrictBigint<bigint | 1, { distributive: false }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsStrictBigint<bigint, $SelectionBranch> // $Then
 * type R = IsStrictBigint<string, $SelectionBranch> // $Else
 * ```
 */
export type IsStrictBigint<
	T,
	$O extends IsStrictBigint.$Options = {}
> =
	IsAnyOrNever<T, $SelectionBranch> extends infer R
	? R extends $Then ? $ResolveBranch<T, $O, [$Else]>
	: R extends $Else ? ($ResolveOptions<[$O['distributive'], $Select.$Default['distributive']]> extends true
		? IsStrictBigint._D<T, $O>
		: IsStrictBigint._N<T, $O>)
	: never : never

export namespace IsStrictBigint {
	export type $Options = $Select.$Options
	export type $Default = $Select.$Default
	export type $Branch = $Select.$Branch
	export type _D<T, $O extends IsStrictBigint.$Options> =
		T extends bigint
		? (
			`${T}` extends `${number}`
			? $ResolveBranch<T, $O, [$Else]>
			: $ResolveBranch<T,$O,[$Then]>
		)
		: $ResolveBranch<T, $O, [$Else]>
	export type _N<T, $O extends IsStrictBigint.$Options> = (
		[bigint, T] extends [T, bigint]
		? (T extends bigint
			? (`${T}` extends `${number}`
				? $ResolveBranch<T, $O, [$Else]>
				: $ResolveBranch<T,$O,[$Then]>)
			: $ResolveBranch<T, $O, [$Else]>)
		: $ResolveBranch<T, $O, [$Else]>)
}
