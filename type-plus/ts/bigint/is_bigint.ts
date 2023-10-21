import type { $ResolveOptions } from '../type_plus/$resolve_options.js'
import type { $DistributiveOptions } from '../type_plus/branch/$distributive.js'
import type { $Exact } from '../type_plus/branch/$exact.js'
import type { $ResolveBranch } from '../type_plus/branch/$resolve_branch.js'
import type { $Select } from '../type_plus/branch/$select.js'
import type { $Else, $Then } from '../type_plus/branch/$selection.js'
import type { IsStrictBigint } from './is_strict_bigint.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is `bigint` or `bigint` literals.
 *
 * @example
 * ```ts
 * type R = IsBigint<bigint> // true
 * type R = IsBigint<1n> // true
 *
 * type R = IsBigint<never> // false
 * type R = IsBigint<unknown> // false
 * type R = IsBigint<string | boolean> // false
 *
 * type R = IsBigint<string | bigint> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is `bigint` or `bigint` literals, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsBigint<bigint, { selection: 'filter' }> // bigint
 * type R = IsBigint<1n, { selection: 'filter' }> // 1n
 *
 * type R = IsBigint<never, { selection: 'filter' }> // never
 * type R = IsBigint<unknown, { selection: 'filter' }> // never
 * type R = IsBigint<string | boolean, { selection: 'filter' }> // never
 *
 * type R = IsBigint<string | bigint> // bigint
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = IsBigint<bigint | 1> // boolean
 * type R = IsBigint<bigint | 1, { distributive: false }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsBigint<bigint, $SelectionBranch> // $Then
 * type R = IsBigint<string, $SelectionBranch> // $Else
 * ```
 */
export type IsBigint<T, $O extends IsBigint.$Options = {}> =
	$ResolveOptions<[$O['exact'], false]> extends true
	? IsStrictBigint<T, $O>
	: $Select<T, bigint, $O>

export namespace IsBigint {
	export type $Options = $Select.$Options & $Exact.$Options
	export type $Default = $Select.$Default
	export type $Branch<
		$O extends $DistributiveOptions & $Exact.$Options = {}// $DistributiveDefault & $Exact.$Default
	> = $Select.$Branch<$O>
	export type _D<T, $O extends IsBigint.$Options> =
		T extends bigint
		? (
			`${T}` extends `${number}`
			? $ResolveBranch<T, $O, [$Else]>
			: $ResolveBranch<T, $O, [$Then]>
		)
		: $ResolveBranch<T, $O, [$Else]>
	export type _N<T, $O extends IsBigint.$Options> = (
		[bigint, T] extends [T, bigint]
		? (T extends bigint
			? (`${T}` extends `${number}`
				? $ResolveBranch<T, $O, [$Else]>
				: $ResolveBranch<T, $O, [$Then]>)
			: $ResolveBranch<T, $O, [$Else]>)
		: $ResolveBranch<T, $O, [$Else]>)
}
