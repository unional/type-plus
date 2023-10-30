import type { Assignable } from '../predicates/assignable.js'
import type { $Equality } from '../type_plus/$equality.js'
import type { $MergeOptions } from '../type_plus/$merge_options.js'
import type { $ResolveOptions } from '../type_plus/$resolve_options.js'
import type { $SpecialType } from '../type_plus/$special_type.js'
import type { $Exact } from '../type_plus/branch/$exact.js'
import type { $IsDistributive } from '../type_plus/branch/$is_distributive.js'
import type { $ResolveBranch } from '../type_plus/branch/$resolve_branch.js'
import type { $Else, $Then } from '../type_plus/branch/$selection.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is `number` or `number` literals.
 *
 * @example
 * ```ts
 * type R = IsNumber<number> // true
 * type R = IsNumber<1> // true
 *
 * type R = IsNumber<never> // false
 * type R = IsNumber<unknown> // false
 * type R = IsNumber<string | boolean> // false
 *
 * type R = IsNumber<string | number> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is `number` or `number` literals, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsNumber<number, { selection: 'filter' }> // number
 * type R = IsNumber<1, { selection: 'filter' }> // 1
 *
 * type R = IsNumber<never, { selection: 'filter' }> // never
 * type R = IsNumber<unknown, { selection: 'filter' }> // never
 * type R = IsNumber<string | boolean, { selection: 'filter' }> // never
 *
 * type R = IsNumber<string | number> // number
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = IsNumber<number | 1> // boolean
 * type R = IsNumber<number | 1, { distributive: false }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNumber<number, $SelectionBranch> // $Then
 * type R = IsNumber<string, $SelectionBranch> // $Else
 * ```
 */
export type IsNumber<T, $O extends IsNumber.$Options = {}> = $SpecialType<T,
	$MergeOptions<$O,
		{
			$then: $ResolveBranch<T, $O, [$Else]>,
			$else: IsNumber.$<T, $O>
		}
	>
>

export namespace IsNumber {
	export type $Options = $Equality.$Options & $Exact.$Options
	export type $Branch<$O extends $Options = {}> = $Equality.$Branch<$O>

	/**
	 * 🧰 *type util*
	 *
	 * Validate if `T` is `bigint` or `bigint` literals.
	 *
	 * This is a type util for building custom types.
	 * It does not check against special types.
	 */
	export type $<T, $O extends $UtilOptions> =
		$ResolveOptions<[$O['exact'], false]> extends true
		? $IsDistributive<$O, { $then: _D<T, $O>, $else: _N<T, $O> }>
		: Assignable.$<T, number, $O>
	export type $UtilOptions = Assignable.$UtilOptions & $Exact.$Options

	export type _D<T, $O extends $UtilOptions> =
		T extends number
		? (
			`${T}` extends `${bigint}`
			? $ResolveBranch<T, $O, [$Else]>
			: (
				`${T}` extends `${number}.${number}`
				? $ResolveBranch<T, $O, [$Else]>
				: $ResolveBranch<T, $O, [$Then]>
			)
		)
		: $ResolveBranch<T, $O, [$Else]>
	export type _N<T, $O extends $UtilOptions> =
		[T] extends [number & infer U] ?
		U extends number ? $ResolveBranch<T, $O, [$Else]>
		: $ResolveBranch<T, $O, [$Then]>
		: $ResolveBranch<T, $O, [$Else]>
}
