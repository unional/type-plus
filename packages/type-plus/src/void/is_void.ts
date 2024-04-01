import type { Assignable } from '../predicates/assignable.js'
import type { $Equality } from '../type_plus/$equality.js'
import type { $MergeOptions } from '../type_plus/$merge_options.js'
import type { $SpecialType } from '../type_plus/$special_type.js'
import type { $ResolveBranch } from '../type_plus/branch/$resolve_branch.js'
import type { $Else } from '../type_plus/branch/$selection.js'
import type { IsUndefined } from '../undefined/is_undefined.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is `void`.
 *
 * @example
 * ```ts
 * type R = IsVoid<void> // true
 *
 * type R = IsVoid<never> // false
 * type R = IsVoid<unknown> // false
 * type R = IsVoid<string | boolean> // false
 *
 * type R = IsVoid<string | void> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is `void`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsVoid<void, { selection: 'filter' }> // void
 *
 * type R = IsVoid<never, { selection: 'filter' }> // never
 * type R = IsVoid<unknown, { selection: 'filter' }> // never
 * type R = IsVoid<string | boolean, { selection: 'filter' }> // never
 *
 * type R = IsVoid<string | void> // void
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = IsVoid<void | 1> // boolean
 * type R = IsVoid<void | 1, { distributive: false }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsVoid<void, $SelectionBranch> // $Then
 * type R = IsVoid<string, $SelectionBranch> // $Else
 * ```
 */
export type IsVoid<T, $O extends IsVoid.$Options = {}> = $SpecialType<
	T,
	$MergeOptions<
		$O,
		{
			$then: $ResolveBranch<T, $O, [$Else]>
			$else: IsVoid.$<T, $O>
		}
	>
>

export namespace IsVoid {
	export type $Options = $Equality.$Options
	export type $Branch<$O extends $Options = {}> = $Equality.$Branch<$O>

	/**
	 * 🧰 *type util*
	 *
	 * Validate if `T` is `undefined`.
	 *
	 * This is a type util for building custom types.
	 * It does not check against special types.
	 */
	export type $<T, $O extends $UtilOptions> = IsUndefined.$<
		T,
		{
			$then: $ResolveBranch<T, $O, [$Else]>
			$else: Assignable.$<T, void, $O>
		}
	>

	export type $UtilOptions = Assignable.$UtilOptions
}
