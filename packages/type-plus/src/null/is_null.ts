import type { Assignable } from '../predicates/assignable.js'
import type { $Equality } from '../type_plus/$equality.js'
import type { $MergeOptions } from '../type_plus/$merge_options.js'
import type { $SpecialType } from '../type_plus/$special_type.js'
import type { $ResolveBranch } from '../type_plus/branch/$resolve_branch.js'
import type { $Else } from '../type_plus/branch/$selection.js'

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
export type IsNull<T, $O extends IsNull.$Options = {}> =
	$SpecialType<T,
		$MergeOptions<$O,
			{
				$then: $ResolveBranch<T, $O, [$Else]>,
				$else: IsNull.$<T, $O>
			}
		>
	>

export namespace IsNull {
	export type $Options = $Equality.$Options
	export type $Branch<$O extends $Options = {}> = $Equality.$Branch<$O>

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
