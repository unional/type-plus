import type { $Equality } from '../$type/$equality.js'
import type { $MergeOptions } from '../$type/$merge_options.js'
import type { $SpecialType } from '../$type/$special_type.js'
import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Then } from '../$type/branch/$selection.js'
import type { NotAssignable } from '../predicates/not_assignable.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is not `false`.
 *
 * @example
 * ```ts
 * type R = IsNotFalse<boolean> // boolean
 * type R = IsNotFalse<true> // true
 * type R = IsNotFalse<false> // false
 *
 * type R = IsNotFalse<number> // true
 * type R = IsNotFalse<unknown> // true
 * type R = IsNotFalse<string | boolean> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is not `false`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsNotFalse<boolean, { selection: 'filter' }> // true
 * type R = IsNotFalse<true, { selection: 'filter' }> // true
 * type R = IsNotFalse<false, { selection: 'filter' }> // never
 *
 * type R = IsNotFalse<number, { selection: 'filter' }> // number
 * type R = IsNotFalse<never, { selection: 'filter' }> // never
 * type R = IsNotFalse<unknown, { selection: 'filter' }> // unknown
 * type R = IsNotFalse<string | boolean, { selection: 'filter' }> // string | true
 * type R = IsNotFalse<string | false, { selection: 'filter' }> // string
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = IsNotFalse<false | 1> // boolean
 * type R = IsNotFalse<boolean | 1> // boolean
 * type R = IsNotFalse<boolean | 1, { distributive: false }> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNotFalse<false, $SelectionBranch> // $Else
 * type R = IsNotFalse<boolean, $SelectionBranch> // $Then | $Else
 * type R = IsNotFalse<string, $SelectionBranch> // $Then
 * ```
 */
export type IsNotFalse<T, $O extends IsNotFalse.$Options = {}> = $SpecialType<
	T,
	$MergeOptions<
		$O,
		{
			$then: $ResolveBranch<T, $O, [$Then]>
			$else: IsNotFalse.$<T, $O>
		}
	>
>

export namespace IsNotFalse {
	export type $Options = $Equality.$Options
	export type $Branch<$O extends $Options = {}> = $Equality.$Branch<$O>

	/**
	 * 🧰 *type util*
	 *
	 * Validate if `T` is not `false`.
	 *
	 * This is a type util for building custom types.
	 * It does not check against special types.
	 */
	export type $<T, $O extends $UtilOptions> = NotAssignable.$<T, false, $O>

	export type $UtilOptions = NotAssignable.$UtilOptions
}
