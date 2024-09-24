import type { Assignable } from '../predicates/assignable.js'
import type { $Equality } from '../type_plus/$equality.js'
import type { $MergeOptions } from '../type_plus/$merge_options.js'
import type { $ResolveOptions } from '../type_plus/$resolve_options.js'
import type { $SpecialType } from '../type_plus/$special_type.js'
import type { $ExactDefault, $ExactOptions } from '../type_plus/branch/$exact.js'
import type { $IsDistributive } from '../type_plus/branch/$is_distributive.js'
import type { $ResolveBranch } from '../type_plus/branch/$resolve_branch.js'
import type { $Else, $Then } from '../type_plus/branch/$selection.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is `boolean`, including `true` and `false`.
 *
 * @example
 * ```ts
 * type R = IsBoolean<boolean> // true
 * type R = IsBoolean<true> // true
 * type R = IsBoolean<false> // true
 *
 * type R = IsBoolean<number> // false
 * type R = IsBoolean<unknown> // false
 * type R = IsBoolean<string | boolean> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is `boolean`, including `true` and `false`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsBoolean<boolean, { selection: 'filter' }> // boolean
 * type R = IsBoolean<true, { selection: 'filter' }> // true
 * type R = IsBoolean<false, { selection: 'filter' }> // true
 *
 * type R = IsBoolean<number, { selection: 'filter' }> // never
 * type R = IsBoolean<unknown, { selection: 'filter' }> // never
 * type R = IsBoolean<never, { selection: 'filter' }> // never
 * type R = IsBoolean<string | boolean, { selection: 'filter' }> // boolean
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = IsBoolean<boolean | 1> // boolean
 * type R = IsBoolean<boolean | 1, { distributive: false }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsBoolean<boolean, $SelectionBranch> // $Then
 * type R = IsBoolean<string, $SelectionBranch> // $Else
 * ```
 */
export type IsBoolean<T, $O extends IsBoolean.$Options = {}> = $SpecialType<
	T,
	$MergeOptions<
		$O,
		{
			$then: $ResolveBranch<T, $O, [$Else]>
			$else: IsBoolean.$<T, $O>
		}
	>
>
export namespace IsBoolean {
	export type $Options = $Equality.$Options & $ExactOptions
	export type $Branch<$O extends $Options = {}> = $Equality.$Branch<$O>

	/**
	 * 🧰 *type util*
	 *
	 * Validate if `T` is `boolean` or `boolean` literals.
	 *
	 * This is a type util for building custom types.
	 * It does not check against special types.
	 */
	export type $<T, $O extends $UtilOptions> = $ResolveOptions<[$O['exact'], $ExactDefault]> extends true
		? $IsDistributive<$O, { $then: _SD<T, $O>; $else: _N<T, $O> }>
		: Assignable.$<T, boolean, $O>
	export type $UtilOptions = Assignable.$UtilOptions & $ExactOptions

	export type _SD<T, $O extends $Options> = IsBoolean._DistributeMap<T> extends infer R
		? ['aBcD' | 'AbCd' | 'abcd'] extends [R]
			? $ResolveBranch<boolean, $O, [$Then]> | $ResolveBranch<Exclude<T, boolean>, $O, [$Else]>
			: ['aBcD' | 'AbCd'] extends [R]
				? $ResolveBranch<T, $O, [$Then]>
				: ['aBcd' | 'Abcd'] extends [R]
					? $ResolveBranch<T, $O, [$Then]>
					: $ResolveBranch<T, $O, [$Else]>
		: never

	export type _N<T, $O extends $Options> = [T] extends [boolean]
		? [T] extends [true]
			? $ResolveBranch<T, $O, [$Else]>
			: [T] extends [false]
				? $ResolveBranch<T, $O, [$Else]>
				: $ResolveBranch<T, $O, [$Then]>
		: $ResolveBranch<T, $O, [$Else]>

	export type _DistributeMap<T> = T extends true
		? T extends false
			? true extends T
				? false extends T
					? 'ABCD'
					: 'ABCd'
				: false extends T
					? 'ABcD'
					: 'ABcd'
			: true extends T
				? false extends T
					? 'AbCD'
					: 'AbCd'
				: false extends T
					? 'AbcD'
					: 'Abcd'
		: T extends false
			? true extends T
				? false extends T
					? 'aBCD'
					: 'aBCd'
				: false extends T
					? 'aBcD'
					: 'aBcd'
			: true extends T
				? false extends T
					? 'abCD'
					: 'abCd'
				: false extends T
					? 'abcD'
					: 'abcd'
}
