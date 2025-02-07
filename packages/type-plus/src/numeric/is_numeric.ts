import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else } from '../$type/branch/$selection.js'
import type { $Special } from '../$type/special/$special.js'
import type { $MergeOptions } from '../$type/utils/$merge_options.js'
import type { Equal } from '../equal/equal.js'
import type { Assignable } from '../predicates/assignable.js'

/**
 * Is `T` numeric.
 *
 * ```ts
 * type R = IsNumeric<1> // true
 * type R = IsNumeric<1.1> // true
 *
 * type R = IsNumeric<string> // false
 * type R = IsNumeric<unknown> // false
 * ```
 */
export type IsNumeric<T, $O extends IsNumeric.$Options = {}> = $Special<
	T,
	$MergeOptions<
		$O,
		{
			$then: $ResolveBranch<T, $O, [$Else]>
			$else: IsNumeric.$<T, $O>
		}
	>
>

export namespace IsNumeric {
	export type $Options = Equal.$Options
	export type $Default = Equal.$Default
	export type $Branch = Equal.$Branch
	/**
	 * 🧰 *type util*
	 *
	 * Validate if `T` is `Function`.
	 *
	 * This is a type util for building custom types.
	 * It does not check against special types.
	 */
	export type $<T, $O extends Assignable.$UtilOptions> = Assignable.$<T, number | bigint, $O>
}
