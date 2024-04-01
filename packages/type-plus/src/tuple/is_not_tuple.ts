import type { NotAssignable } from '../predicates/not_assignable.js'
import type { $Equality } from '../type_plus/$equality.js'
import type { $MergeOptions } from '../type_plus/$merge_options.js'
import type { $SpecialType } from '../type_plus/$special_type.js'
import type { $IsDistributive } from '../type_plus/branch/$is_distributive.js'
import type { $ResolveBranch } from '../type_plus/branch/$resolve_branch.js'
import type { $Else, $Then } from '../type_plus/branch/$selection.js'

/**
 * 🎭 *predicate*
 *
 * Validate that `T` is not a tuple, excluding array.
 *
 * ```ts
 * type R = IsNotTuple<[]>       // false
 * type R = IsNotTuple<[1]>      // false
 *
 * type R = IsNotTuple<number[]> // true
 * type R = IsNotTuple<string>   // true
 * type R = IsNotTuple<never>    // true
 * type R = IsNotTuple<unknown>  // true
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is not a `tuple`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsNotTuple<[], { selection: 'filter' }> // never
 * type R = IsNotTuple<[1], { selection: 'filter' }> // never
 *
 * type R = IsNotTuple<never, { selection: 'filter' }> // never
 * type R = IsNotTuple<unknown, { selection: 'filter' }> // unknown
 * type R = IsNotTuple<[] | boolean, { selection: 'filter' }> // boolean
 * type R = IsNotTuple<[1] | bigint> // bigint
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = IsNotTuple<[] | 1> // boolean
 * type R = IsNotTuple<[] | 1, { distributive: false }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNotTuple<bigint, IsNotTuple.$Branch> // $Then
 * type R = IsNotTuple<[], IsNotTuple.$Branch> // $Else
 * ```
 */
export type IsNotTuple<T, $O extends IsNotTuple.$Options = {}> = $SpecialType<
	T,
	$MergeOptions<
		$O,
		{
			$then: $ResolveBranch<T, $O, [$Then]>
			$else: IsNotTuple.$<T, $O>
		}
	>
>

export namespace IsNotTuple {
	export type $Options = $Equality.$Options
	export type $Branch<$O extends $Options = {}> = $Equality.$Branch<$O>
	// export type $Default = $Select.$Default

	/**
	 * 🧰 *type util*
	 *
	 * Validate if `T` is `bigint` or `bigint` literals.
	 *
	 * This is a type util for building custom types.
	 * It does not check against special types.
	 */
	export type $<T, $O extends $UtilOptions> = $IsDistributive<
		$O,
		{
			$then: T extends readonly any[]
				? number extends T['length']
					? $ResolveBranch<T, $O, [$Then]>
					: $ResolveBranch<T, $O, [$Else]>
				: $ResolveBranch<T, $O, [$Then]>
			$else: [T] extends [readonly any[]]
				? number extends T['length']
					? $ResolveBranch<T, $O, [$Then]>
					: $ResolveBranch<T, $O, [$Else]>
				: $ResolveBranch<T, $O, [$Then]>
		}
	>

	export type $UtilOptions = NotAssignable.$UtilOptions
}
