import type { $Equality } from '../$type/$equality.js'
import type { $MergeOptions } from '../$type/$merge_options.js'
import type { $SpecialType } from '../$type/$special_type.js'
import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else } from '../$type/branch/$selection.js'
import type { Assignable } from '../predicates/assignable.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is `false`.
 *
 * @example
 * ```ts
 * type R = IsFalse<boolean> // boolean
 * type R = IsFalse<true> // false
 * type R = IsFalse<false> // true
 *
 * type R = IsFalse<number> // false
 * type R = IsFalse<unknown> // false
 * type R = IsFalse<string | boolean> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is `false`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsFalse<boolean, { selection: 'filter' }> // false
 * type R = IsFalse<true, { selection: 'filter' }> // never
 * type R = IsFalse<false, { selection: 'filter' }> // false
 *
 * type R = IsFalse<number, { selection: 'filter' }> // never
 * type R = IsFalse<unknown, { selection: 'filter' }> // never
 * type R = IsFalse<never, { selection: 'filter' }> // never
 * type R = IsFalse<string | boolean, { selection: 'filter' }> // false
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = IsFalse<false | 1> // boolean
 * type R = IsFalse<boolean | 1> // boolean
 * type R = IsFalse<boolean | 1, { distributive: false }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsFalse<false, $SelectionBranch> // $Then
 * type R = IsFalse<boolean, $SelectionBranch> // $Then | $Else
 * type R = IsFalse<string, $SelectionBranch> // $Else
 * ```
 */
export type IsFalse<T, $O extends IsFalse.$Options = {}> = $SpecialType<
	T,
	$MergeOptions<
		$O,
		{
			$then: $ResolveBranch<T, $O, [$Else]>
			$else: IsFalse.$<T, $O>
		}
	>
>

export namespace IsFalse {
	export type $Options = $Equality.$Options
	export type $Branch<$O extends $Options = {}> = $Equality.$Branch<$O>

	/**
	 * 🧰 *type util*
	 *
	 * Validate if `T` is `false`.
	 *
	 * This is a type util for building custom types.
	 * It does not check against special types.
	 */
	export type $<T, $O extends $UtilOptions> = Assignable.$<T, false, $O>

	export type $UtilOptions = Assignable.$UtilOptions
}
