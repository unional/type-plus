import type { $Equality } from '../$type/$equality.js'
import type { $ExactOptions } from '../$type/$exact.js'
import type { $IsDistributive } from '../$type/$is_distributive.js'
import type { $MergeOptions } from '../$type/$merge_options.js'
import type { $ResolveOptions } from '../$type/$resolve_options.js'
import type { $SpecialType } from '../$type/$special_type.js'
import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else, $Then } from '../$type/branch/$selection.js'
import type { NotAssignable } from '../predicates/not_assignable.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is not `bigint` nor `bigint` literals.
 *
 * @example
 * ```ts
 * type R = IsNotBigint<bigint> // false
 * type R = IsNotBigint<1n> // false
 *
 * type R = IsNotBigint<never> // true
 * type R = IsNotBigint<unknown> // true
 * type R = IsNotBigint<string | boolean> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is not `bigint` nor `bigint` literals, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsNotBigint<bigint, { selection: 'filter' }> // never
 * type R = IsNotBigint<1n, { selection: 'filter' }> // never
 *
 * type R = IsNotBigint<never, { selection: 'filter' }> // never
 * type R = IsNotBigint<unknown, { selection: 'filter' }> // unknown
 * type R = IsNotBigint<string | boolean, { selection: 'filter' }> // string | boolean
 * ```
 *
 * 🔢 *customize*:
 *
 * Validate if `T` is not exactly `bigint`.
 *
 * @example
 * ```ts
 * type R = IsNotBigint<bigint, { exact: true }> // false
 * type R = IsNotBigint<1n, { exact: true }> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Disable distribution of union types.
 *
 * @example
 * ```ts
 * type R = IsNotBigint<bigint | 1> // boolean
 * type R = IsNotBigint<bigint | 1, { distributive: false }> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNotBigint<string, $SelectionBranch> // $Then
 * type R = IsNotBigint<bigint, $SelectionBranch> // $Else
 * ```
 */
export type IsNotBigint<T, $O extends IsNotBigint.$Options = {}> = $SpecialType<
	T,
	$MergeOptions<
		$O,
		{
			$then: $ResolveBranch<T, $O, [$Then]>
			$else: IsNotBigint.$<T, $O>
		}
	>
>

export namespace IsNotBigint {
	export type $Options = $Equality.$Options & $ExactOptions
	export type $Branch<$O extends $Options = {}> = $Equality.$Branch<$O>

	/**
	 * 🧰 *type util*
	 *
	 * Validate if `T` is not `bigint` nor `bigint` literals.
	 *
	 * This is a type util for building custom types.
	 * It does not check against special types.
	 */
	export type $<T, $O extends $UtilOptions> = $ResolveOptions<[$O['exact'], false]> extends true
		? $IsDistributive<$O, { $then: _SD<T, $O>; $else: _SN<T, $O> }>
		: NotAssignable.$<T, bigint, $O>
	export type $UtilOptions = NotAssignable.$UtilOptions & $ExactOptions

	export type _SD<T, $O extends $Options> = T extends bigint & infer U
		? U extends bigint
			? $ResolveBranch<T, $O, [$Then]>
			: $ResolveBranch<T, $O, [$Else]>
		: $ResolveBranch<T, $O, [$Then]>
	export type _SN<T, $O extends $Options> = [T] extends [bigint & infer U]
		? U extends bigint
			? $ResolveBranch<T, $O, [$Then]>
			: $ResolveBranch<T, $O, [$Else]>
		: $ResolveBranch<T, $O, [$Then]>
}
