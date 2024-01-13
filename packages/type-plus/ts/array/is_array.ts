import type { Assignable } from '../predicates/assignable.js'
import type { $Equality } from '../type_plus/$equality.js'
import type { $MergeOptions } from '../type_plus/$merge_options.js'
import type { $SpecialType } from '../type_plus/$special_type.js'
import type { $Exact } from '../type_plus/branch/$exact.js'
import type { $IsDistributive } from '../type_plus/branch/$is_distributive.js'
import type { $ResolveBranch } from '../type_plus/branch/$resolve_branch.js'
import type { $Else, $Then } from '../type_plus/branch/$selection.js'

/**
 * 🎭 *predicate*
 *
 * Validate that `T` is an array.
 *
 * @example
 * ```ts
 * type R = IsArray<number[]> // true
 * type R = IsArray<[1]> // true
 *
 * type R = IsArray<number> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is an array, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsArray<number[], { selection: 'filter' }> // number[]
 * type R = IsArray<number, { selection: 'filter' }> // never
 * ```
 *
 * 🔢 *customize*
 *
 * Disable distribution of union types.
 *
 * @example
 * ```ts
 * type R = IsArray<number[] | 1> // boolean
 * type R = IsArray<number[] | 1, { distributive: false }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Check if `T` is exactly an array, excluding tuple.
 *
 * @example
 * ```ts
 * type R = IsArray<[]> // true
 * type R = IsArray<[], { exact: true }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsArray<number[], IsArray.$Branch> // $Then
 * type R = IsArray<number, IsArray.$Branch> // $Else
 * ```
 */
export type IsArray<
	T,
	$O extends IsArray.$Options = {}
> = $SpecialType<T,
	$MergeOptions<$O,
		{
			$then: $ResolveBranch<T, $O, [$Else]>,
			$else: IsArray.$<T, $O>
		}
	>
>

export namespace IsArray {
	export type $Options = $Equality.$Options & $Exact.$Options
	export type $Branch<$O extends $Options = {}> = $Equality.$Branch<$O>

	/**
	 * 🧰 *type util*
	 *
	 * Validate if `T` is an array.
	 *
	 * This is a type util for building custom types.
	 * It does not check against special types.
	 */
	export type $<T, $O extends $UtilOptions> =
		$Exact.$IsExact<$O, {
			$then: $IsDistributive<$O, {
				$then: T extends readonly any[]
				? (
					number extends T['length']
					? $ResolveBranch<T, $O, [$Then]>
					: $ResolveBranch<T, $O, [$Else]>
				)
				: $ResolveBranch<T, $O, [$Else]>,
				$else: [T] extends [readonly any[]]
				? (
					number extends T['length']
					? $ResolveBranch<T, $O, [$Then]>
					: $ResolveBranch<T, $O, [$Else]>
				)
				: $ResolveBranch<T, $O, [$Else]>
			}>,
			$else: $IsDistributive<$O, {
				$then: T extends readonly any[]
				? $ResolveBranch<T, $O, [$Then]>
				: $ResolveBranch<T, $O, [$Else]>,
				$else: [T] extends readonly [any[]]
				? $ResolveBranch<T, $O, [$Then]>
				: $ResolveBranch<T, $O, [$Else]>
			}>
		}>

	export type $UtilOptions = Assignable.$UtilOptions & $Exact.$Options
}
