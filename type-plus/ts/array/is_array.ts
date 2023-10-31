import type { Assignable } from '../predicates/assignable.js'
import type { $Equality } from '../type_plus/$equality.js'
import type { $MergeOptions } from '../type_plus/$merge_options.js'
import type { $SpecialType } from '../type_plus/$special_type.js'
import type { $IsDistributive } from '../type_plus/branch/$is_distributive.js'
import type { $ResolveBranch } from '../type_plus/branch/$resolve_branch.js'
import type { $Else, $Then } from '../type_plus/branch/$selection.js'

/**
 * 🎭 *predicate*
 *
 * Validate that `T` is an array, excluding tuple.
 *
 * @example
 * ```ts
 * type R = IsArray<number[]> // true
 *
 * type R = IsArray<number> // false
 * type R = IsArray<[1]> // false
 * ```
 */

export type IsArray<
	T,
	$O extends IsArray.$Options = {}
> = $SpecialType<T,
	$MergeOptions<$O,
		{
			$then: $ResolveBranch<T, $O, [$Else]>,
			$else: IsArray.$<T, $O>
		}
	>
>

export namespace IsArray {
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
			? $ResolveBranch<T, $O, [$Then]>
			: $ResolveBranch<T, $O, [$Else]>
		)
		: $ResolveBranch<T, $O, [$Else]>,
		$else: [T] extends [readonly any[]]
		? (
			number extends T['length']
			? $ResolveBranch<T, $O, [$Then]>
			: $ResolveBranch<T, $O, [$Else]>
		)
		: $ResolveBranch<T, $O, [$Else]>
	}>

	export type $UtilOptions = Assignable.$UtilOptions
}
