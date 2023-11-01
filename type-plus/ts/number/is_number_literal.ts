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
 * Validate if `T` is number literals.
 *
 * @example
 * ```ts
 * type R = IsNumberLiteral<number> // false
 * type R = IsNumberLiteral<1> // true
 *
 * type R = IsNumberLiteral<never> // false
 * type R = IsNumberLiteral<unknown> // false
 * type R = IsNumberLiteral<string | boolean> // false
 *
 * type R = IsNumberLiteral<string | number> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is number literals, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsNumberLiteral<number, { selection: 'filter' }> // never
 * type R = IsNumberLiteral<1, { selection: 'filter' }> // 1
 *
 * type R = IsNumberLiteral<never, { selection: 'filter' }> // never
 * type R = IsNumberLiteral<unknown, { selection: 'filter' }> // never
 * type R = IsNumberLiteral<string | boolean, { selection: 'filter' }> // never
 *
 * type R = IsNumberLiteral<string | number> // number
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = IsNumberLiteral<number | 1> // boolean
 * type R = IsNumberLiteral<number | 1, { distributive: false }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNumberLiteral<number, $SelectionBranch> // $Then
 * type R = IsNumberLiteral<string, $SelectionBranch> // $Else
 * ```
 */
export type IsNumberLiteral<T, $O extends IsNumberLiteral.$Options = {}> = $SpecialType<T,
	$MergeOptions<$O,
		{
			$then: $ResolveBranch<T, $O, [$Else]>,
			$else: IsNumberLiteral.$<T, $O>
		}
	>
>

export namespace IsNumberLiteral {
	export type $Options = $Equality.$Options
	export type $Branch<$O extends $Options = {}> = $Equality.$Branch<$O>

	/**
	 * 🧰 *type util*
	 *
	 * Validate if `T` is number literals.
	 *
	 * This is a type util for building custom types.
	 * It does not check against special types.
	 */
	export type $<T, $O extends $UtilOptions> =
		$IsDistributive<$O, { $then: _D<T, $O>, $else: _N<T, $O> }>

	export type $UtilOptions = Assignable.$UtilOptions

	export type _D<T, $O extends $UtilOptions> =
		T extends number
		? (
			number extends T
			? $ResolveBranch<T, $O, [$Else]>
			: $ResolveBranch<T, $O, [$Then]>
		)
		: $ResolveBranch<T, $O, [$Else]>
	export type _N<T, $O extends $UtilOptions> =
		[T] extends [number & infer U] ?
		U extends number ? (number extends T
			? $ResolveBranch<T, $O, [$Else]>
			: $ResolveBranch<T, $O, [$Then]>)
		: $ResolveBranch<T, $O, [$Then]>
		: $ResolveBranch<T, $O, [$Else]>
}
