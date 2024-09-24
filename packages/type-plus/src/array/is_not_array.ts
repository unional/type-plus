import type { NotAssignable } from '../predicates/not_assignable.js'
import type { $Equality } from '../type_plus/$equality.js'
import type { $MergeOptions } from '../type_plus/$merge_options.js'
import type { $SpecialType } from '../type_plus/$special_type.js'
import type { $ExactOptions, $IsExact } from '../type_plus/branch/$exact.js'
import type { $IsDistributive } from '../type_plus/branch/$is_distributive.js'
import type { $ResolveBranch } from '../type_plus/branch/$resolve_branch.js'
import type { $Else, $Then } from '../type_plus/branch/$selection.js'

/**
 * 🎭 *predicate*
 *
 * Validate that `T` is not an array.
 *
 * @example
 * ```ts
 * type R = IsNotArray<number[]> // false
 * type R = IsNotArray<[1]> // false
 *
 * type R = IsNotArray<number> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is not an array, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsNotArray<number[], { selection: 'filter' }> // never
 * type R = IsNotArray<number, { selection: 'filter' }> // number
 * ```
 *
 * 🔢 *customize*
 *
 * Disable distribution of union types.
 *
 * @example
 * ```ts
 * type R = IsNotArray<number[] | 1> // boolean
 * type R = IsNotArray<number[] | 1, { distributive: false }> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Check if `T` is not exactly an array, including tuple.
 *
 * @example
 * ```ts
 * type R = IsNotArray<[]> // false
 * type R = IsNotArray<[], { exact: true }> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNotArray<number[], IsNotArray.$Branch> // $Else
 * type R = IsNotArray<number, IsNotArray.$Branch> // $Then
 * ```
 */
export type IsNotArray<T, $O extends IsNotArray.$Options = {}> = $SpecialType<
	T,
	$MergeOptions<
		$O,
		{
			$then: $ResolveBranch<T, $O, [$Then]>
			$else: IsNotArray.$<T, $O>
		}
	>
>
export namespace IsNotArray {
	export type $Options = $Equality.$Options & $ExactOptions
	export type $Branch<$O extends $Options = {}> = $Equality.$Branch<$O>

	/**
	 * 🧰 *type util*
	 *
	 * Validate if `T` is not an array.
	 *
	 * This is a type util for building custom types.
	 * It does not check against special types.
	 */
	export type $<T, $O extends $UtilOptions> = $IsExact<
		$O,
		{
			$then: $IsDistributive<
				$O,
				{
					$then: T extends readonly any[]
						? number extends T['length']
							? $ResolveBranch<T, $O, [$Else]>
							: $ResolveBranch<T, $O, [$Then]>
						: $ResolveBranch<T, $O, [$Then]>
					$else: [T] extends [readonly any[]]
						? number extends T['length']
							? $ResolveBranch<T, $O, [$Else]>
							: $ResolveBranch<T, $O, [$Then]>
						: $ResolveBranch<T, $O, [$Then]>
				}
			>
			$else: $IsDistributive<
				$O,
				{
					$then: T extends readonly any[] ? $ResolveBranch<T, $O, [$Else]> : $ResolveBranch<T, $O, [$Then]>
					$else: [T] extends readonly [any[]] ? $ResolveBranch<T, $O, [$Else]> : $ResolveBranch<T, $O, [$Then]>
				}
			>
		}
	>

	export type $UtilOptions = NotAssignable.$UtilOptions & $ExactOptions
}
