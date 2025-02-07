import type { $Equality } from '../$type/$equality.js'
import type { $IsDistributive } from '../$type/$is_distributive.js'
import type { $MergeOptions } from '../$type/$merge_options.js'
import type { $SpecialType } from '../$type/$special_type.js'
import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else, $Then } from '../$type/branch/$selection.js'
import type { Assignable } from '../predicates/assignable.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is not bigint literals.
 *
 * @example
 * ```ts
 * type R = IsNotBigintLiteral<bigint> // true
 * type R = IsNotBigintLiteral<1n> // false
 *
 * type R = IsNotBigintLiteral<never> // true
 * type R = IsNotBigintLiteral<unknown> // true
 * type R = IsNotBigintLiteral<string | boolean> // true
 *
 * type R = IsNotBigintLiteral<string | 1n> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is not bigint literals, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsNotBigintLiteral<bigint, { selection: 'filter' }> // bigint
 * type R = IsNotBigintLiteral<1n, { selection: 'filter' }> // never
 *
 * type R = IsNotBigintLiteral<never, { selection: 'filter' }> // never
 * type R = IsNotBigintLiteral<unknown, { selection: 'filter' }> // unknown
 * type R = IsNotBigintLiteral<1n | string, { selection: 'filter' }> // string
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = IsNotBigintLiteral<1n | string> // boolean
 * type R = IsNotBigintLiteral<1n | string, { distributive: false }> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNotBigintLiteral<1n, $SelectionBranch> // $Else
 * type R = IsNotBigintLiteral<bigint, $SelectionBranch> // $Then
 * ```
 */
export type IsNotBigintLiteral<T, $O extends IsNotBigintLiteral.$Options = {}> = $SpecialType<
	T,
	$MergeOptions<
		$O,
		{
			$then: $ResolveBranch<T, $O, [$Then]>
			$else: IsNotBigintLiteral.$<T, $O>
		}
	>
>

export namespace IsNotBigintLiteral {
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

	export type _D<T, $O extends $UtilOptions> = T extends bigint & infer U
		? U extends bigint
			? $ResolveBranch<T, $O, [$Else]>
			: $ResolveBranch<T, $O, [$Then]>
		: $ResolveBranch<T, $O, [$Then]>
	export type _N<T, $O extends $UtilOptions> = [T] extends [bigint & infer U]
		? U extends bigint
			? $ResolveBranch<T, $O, [$Else]>
			: $ResolveBranch<T, $O, [$Then]>
		: $ResolveBranch<T, $O, [$Then]>
}
