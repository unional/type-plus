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
 * Validate if `T` is bigint literals.
 *
 * @example
 * ```ts
 * type R = IsBigintLiteral<bigint> // false
 * type R = IsBigintLiteral<1n> // true
 *
 * type R = IsBigintLiteral<never> // false
 * type R = IsBigintLiteral<unknown> // false
 * type R = IsBigintLiteral<string | boolean> // false
 *
 * type R = IsBigintLiteral<string | number> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is bigint literals, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsBigintLiteral<bigint, { selection: 'filter' }> // never
 * type R = IsBigintLiteral<1n, { selection: 'filter' }> // 1n
 *
 * type R = IsBigintLiteral<never, { selection: 'filter' }> // never
 * type R = IsBigintLiteral<unknown, { selection: 'filter' }> // never
 * type R = IsBigintLiteral<string | boolean, { selection: 'filter' }> // never
 *
 * type R = IsBigintLiteral<string | number> // number
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = IsBigintLiteral<1n | string> // boolean
 * type R = IsBigintLiteral<1n | string, { distributive: false }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsBigintLiteral<1n, $SelectionBranch> // $Then
 * type R = IsBigintLiteral<string, $SelectionBranch> // $Else
 * ```
 */
export type IsBigintLiteral<T, $O extends IsBigintLiteral.$Options = {}> = $SpecialType<T,
	$MergeOptions<$O,
		{
			$then: $ResolveBranch<T, $O, [$Else]>,
			$else: IsBigintLiteral.$<T, $O>
		}
	>
>

export namespace IsBigintLiteral {
	export type $Options = $Equality.$Options
	export type $Branch<$O extends $Options = {}> = $Equality.$Branch<$O>

	/**
	 * 🧰 *type util*
	 *
	 * Validate if `T` is bigint literals.
	 *
	 * This is a type util for building custom types.
	 * It does not check against special types.
	 */
	export type $<T, $O extends $UtilOptions> =
		$IsDistributive<$O, { $then: _D<T, $O>, $else: _N<T, $O> }>

	export type $UtilOptions = Assignable.$UtilOptions

	export type _D<T, $O extends $UtilOptions> =
		T extends bigint & infer U
		? (
			U extends bigint
			? $ResolveBranch<T, $O, [$Then]>
			: $ResolveBranch<T, $O, [$Else]>
		)
		: $ResolveBranch<T, $O, [$Else]>
	export type _N<T, $O extends $UtilOptions> =
		[T] extends [bigint & infer U] ?
		U extends bigint ? $ResolveBranch<T, $O, [$Then]>
		: $ResolveBranch<T, $O, [$Else]>
		: $ResolveBranch<T, $O, [$Else]>
}
