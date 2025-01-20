import type { $Equality } from '../$type/$equality.js'
import type { $MergeOptions } from '../$type/$merge_options.js'
import type { $SpecialType } from '../$type/$special_type.js'
import type { $IsDistributive } from '../$type/branch/$is_distributive.js'
import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else, $Then } from '../$type/branch/$selection.js'
import type { Assignable } from '../predicates/assignable.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is not number literals.
 *
 * @example
 * ```ts
 * type R = IsNotNumberLiteral<number> // true
 * type R = IsNotNumberLiteral<1> // false
 *
 * type R = IsNotNumberLiteral<never> // true
 * type R = IsNotNumberLiteral<unknown> // true
 * type R = IsNotNumberLiteral<string | boolean> // true
 *
 * type R = IsNotNumberLiteral<string | 1> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is not number literals, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsNotNumberLiteral<number, { selection: 'filter' }> // number
 * type R = IsNotNumberLiteral<1, { selection: 'filter' }> // never
 *
 * type R = IsNotNumberLiteral<never, { selection: 'filter' }> // never
 * type R = IsNotNumberLiteral<unknown, { selection: 'filter' }> // unknown
 * type R = IsNotNumberLiteral<1 | string, { selection: 'filter' }> // string
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = IsNotNumberLiteral<1 | string> // boolean
 * type R = IsNotNumberLiteral<1 | string, { distributive: false }> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNotNumberLiteral<1, $SelectionBranch> // $Else
 * type R = IsNotNumberLiteral<string, $SelectionBranch> // $Then
 * ```
 */
export type IsNotNumberLiteral<T, $O extends IsNotNumberLiteral.$Options = {}> = $SpecialType<
	T,
	$MergeOptions<
		$O,
		{
			$then: $ResolveBranch<T, $O, [$Then]>
			$else: IsNotNumberLiteral.$<T, $O>
		}
	>
>

export namespace IsNotNumberLiteral {
	export type $Options = $Equality.$Options
	export type $Branch<$O extends $Options = {}> = $Equality.$Branch<$O>

	/**
	 * 🧰 *type util*
	 *
	 * Validate if `T` is not number literals.
	 *
	 * This is a type util for building custom types.
	 * It does not check against special types.
	 */
	export type $<T, $O extends $UtilOptions> = $IsDistributive<
		$O,
		{
			$then: _D<T, $O>
			$else: _N<T, $O>
		}
	>

	export type $UtilOptions = Assignable.$UtilOptions

	export type _D<T, $O extends $UtilOptions> = T extends number & infer U
		? U extends number
			? $ResolveBranch<T, $O, [$Else]>
			: $ResolveBranch<T, $O, [$Then]>
		: $ResolveBranch<T, $O, [$Then]>
	export type _N<T, $O extends $UtilOptions> = [T] extends [number & infer U]
		? U extends number
			? $ResolveBranch<T, $O, [$Else]>
			: $ResolveBranch<T, $O, [$Then]>
		: $ResolveBranch<T, $O, [$Then]>
}
