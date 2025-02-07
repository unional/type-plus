import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else } from '../$type/branch/$selection.js'
import type { $Special } from '../$type/special/$special.js'
import type { $MergeOptions } from '../$type/utils/$merge_options.js'
import type { Equal } from '../equal/equal.js'
import type { Assignable } from '../predicates/assignable.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is `null`.
 *
 * @example
 * ```ts
 * type R = IsNull<null> // true
 *
 * type R = IsNull<never> // false
 * type R = IsNull<unknown> // false
 * type R = IsNull<string | boolean> // false
 *
 * type R = IsNull<string | null> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is `null`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsNull<null, { selection: 'filter' }> // null
 *
 * type R = IsNull<never, { selection: 'filter' }> // never
 * type R = IsNull<unknown, { selection: 'filter' }> // never
 * type R = IsNull<string | boolean, { selection: 'filter' }> // never
 *
 * type R = IsNull<string | null> // null
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = IsNull<null | 1> // boolean
 * type R = IsNull<null | 1, { distributive: false }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNull<null, $SelectionBranch> // $Then
 * type R = IsNull<string, $SelectionBranch> // $Else
 * ```
 */
export type IsNull<T, $O extends IsNull.$Options = {}> = $Special<
	T,
	$MergeOptions<
		$O,
		{
			$then: $ResolveBranch<T, $O, [$Else]>
			$else: IsNull.$<T, $O>
		}
	>
>

export namespace IsNull {
	export type $Options = Equal.$Options
	export type $Branch<$O extends $Options = {}> = Equal.$Branch<$O>

	/**
	 * 🧰 *type util*
	 *
	 * Validate if `T` is `null`.
	 *
	 * This is a type util for building custom types.
	 * It does not check against special types.
	 */
	export type $<T, $O extends $UtilOptions> = Assignable.$<T, null, $O>

	export type $UtilOptions = Assignable.$UtilOptions
}
