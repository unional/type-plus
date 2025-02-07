import type { $Equality } from '../$type/$equality.js'
import type { $ExactDefault, $ExactOptions } from '../$type/$exact.js'
import type { $ResolveOptions } from '../$type/$resolve_options.js'
import type { $SpecialType } from '../$type/$special_type.js'
import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else, $Then } from '../$type/branch/$selection.js'
import type { $IsDistributive } from '../$type/distributive/$is_distributive.js'
import type { $MergeOptions } from '../$type/utils/$merge_options.js'
import type { Assignable } from '../predicates/assignable.js'

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
 * Validate if `T` is exactly `bigint`.
 *
 * @example
 * ```ts
 * type R = IsBigint<bigint, { exact: true }> // true
 * type R = IsBigint<1n, { exact: true }> // false
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
export type IsBigint<T, $O extends IsBigint.$Options = {}> = $SpecialType<
	T,
	$MergeOptions<
		$O,
		{
			$then: $ResolveBranch<T, $O, [$Else]>
			$else: IsBigint.$<T, $O>
		}
	>
>

export namespace IsBigint {
	export type $Options = $Equality.$Options & $ExactOptions
	export type $Branch<$O extends $Options = {}> = $Equality.$Branch<$O>

	/**
	 * 🧰 *type util*
	 *
	 * Validate if `T` is `bigint` or `bigint` literals.
	 *
	 * This is a type util for building custom types.
	 * It does not check against special types.
	 */
	export type $<T, $O extends $UtilOptions> = $ResolveOptions<[$O['exact'], $ExactDefault]> extends true
		? $IsDistributive<$O, { $then: _SD<T, $O>; $else: _SN<T, $O> }>
		: Assignable.$<T, bigint, $O>
	export type $UtilOptions = Assignable.$UtilOptions & $ExactOptions

	export type _SD<T, $O extends $Options> = T extends bigint & infer U
		? U extends bigint
			? $ResolveBranch<T, $O, [$Else]>
			: $ResolveBranch<T, $O, [$Then]>
		: $ResolveBranch<T, $O, [$Else]>
	export type _SN<T, $O extends $Options> = [T] extends [bigint & infer U]
		? U extends bigint
			? $ResolveBranch<T, $O, [$Else]>
			: $ResolveBranch<T, $O, [$Then]>
		: $ResolveBranch<T, $O, [$Else]>
}
