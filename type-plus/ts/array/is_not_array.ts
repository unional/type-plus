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
 * Validate that `T` is not an array, excluding tuple.
 *
 * i.e. *tuple* will pass through this filter.
 *
 * @example
 * ```ts
 * type R = IsNotArray<number[]> // false
 *
 * type R = IsNotArray<number> // true
 * type R = IsNotArray<[1]> // true
 * ```
 */

export type IsNotArray<T,
	$O extends IsNotArray.$Options = {}
> = $SpecialType<T,
	$MergeOptions<$O,
		{
			$then: $ResolveBranch<T, $O, [$Then]>,
			$else: IsNotArray.$<T, $O>
		}
	>
>
export namespace IsNotArray {
	export type $Options = $Equality.$Options
	export type $Branch<$O extends $Options = {}> = $Equality.$Branch<$O>

	/**
	 * 🧰 *type util*
	 *
	 * Validate if `T` is `array`, excluding tuple.
	 *
	 * This is a type util for building custom types.
	 * It does not check against special types.
	 */
	export type $<T, $O extends $UtilOptions> = $IsDistributive<$O, {
		$then: T extends readonly any[]
		? (
			number extends T['length']
			? $ResolveBranch<T, $O, [$Else]>
			: $ResolveBranch<T, $O, [$Then]>
		)
		: $ResolveBranch<T, $O, [$Then]>,
		$else: [T] extends [readonly any[]]
		? (
			number extends T['length']
			? $ResolveBranch<T, $O, [$Else]>
			: $ResolveBranch<T, $O, [$Then]>
		)
		: $ResolveBranch<T, $O, [$Then]>
	}>

	export type $UtilOptions = NotAssignable.$UtilOptions
}
