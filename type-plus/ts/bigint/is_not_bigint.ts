import type { $Any } from '../any/any.js'
import type { $Never } from '../never/never.js'
import type { NotAssignable } from '../predicates/not_assignable.js'
import type { $MergeOptions } from '../type_plus/$merge_options.js'
import type { $ResolveOptions } from '../type_plus/$resolve_options.js'
import type { $SpecialType } from '../type_plus/$special_type.js'
import type { $DistributiveOptions } from '../type_plus/branch/$distributive.js'
import type { $Exact } from '../type_plus/branch/$exact.js'
import type { $InputOptions } from '../type_plus/branch/$input_options.js'
import type { $IsDistributive } from '../type_plus/branch/$is_distributive.js'
import type { $ResolveBranch } from '../type_plus/branch/$resolve_branch.js'
import type { $Else, $SelectionBranch, $Then } from '../type_plus/branch/$selection.js'
import type { $SelectionOptions } from '../type_plus/branch/$selection_options.js'
import type { $Unknown } from '../unknown/unknown.js'

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
export type IsNotBigint<T, $O extends IsNotBigint.$Options = {}> = $SpecialType<T,
	$MergeOptions<$O,
		{
			$then: $ResolveBranch<T, $O, [$Then]>,
			$else: IsNotBigint.$<T, $O>
		}
	>
>

export namespace IsNotBigint {
	export type $Options = $SelectionOptions &
		$DistributiveOptions &
		$InputOptions<$Any | $Unknown | $Never> &
		$Exact.$Options
	export type $Branch<
		$O extends $DistributiveOptions & $Exact.$Options = {}
	> = $SelectionBranch & $O
	/**
	 * 🧰 *type util*
	 *
	 * Validate if `T` is not `bigint` nor `bigint` literals.
	 *
	 * This is a type util for building custom types.
	 * It does not check against special types.
	 */
	export type $<T, $O extends $Options> =
		$ResolveOptions<[$O['exact'], false]> extends true
		? $IsDistributive<$O, { $then: _SD<T, $O>, $else: _SN<T, $O> }>
		: NotAssignable.$<T, bigint, $O>

	export type _SD<T, $O extends $Options> =
		T extends bigint
		? (
			`${T}` extends `${number}`
			? $ResolveBranch<T, $O, [$Then]>
			: $ResolveBranch<T, $O, [$Else]>
		)
		: $ResolveBranch<T, $O, [$Then]>
	export type _SN<T, $O extends $Options> = (
		[bigint, T] extends [T, bigint]
		? (T extends bigint
			? (`${T}` extends `${number}`
				? $ResolveBranch<T, $O, [$Then]>
				: $ResolveBranch<T, $O, [$Else]>
			)
			: $ResolveBranch<T, $O, [$Then]>)
		: $ResolveBranch<T, $O, [$Then]>)
}
