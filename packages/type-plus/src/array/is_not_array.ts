import type { $Equality } from '../$type/$equality.js'
import type { $SpecialType } from '../$type/$special_type.js'
import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else, $Then } from '../$type/branch/$selection.js'
import type { $Distributive } from '../$type/distributive/$distributive.js'
import type { $Exact } from '../$type/exact/$exact.js'
import type { $MergeOptions } from '../$type/utils/$merge_options.js'
import type { NotAssignable } from '../predicates/not_assignable.js'

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
	export type $Options = $Equality.$Options & $Exact.Options
	export type $Branch<$O extends $Options = {}> = $Equality.$Branch<$O>

	/**
	 * 🧰 *type util*
	 *
	 * Validate if `T` is not an array.
	 *
	 * This is a type util for building custom types.
	 * It does not check against special types.
	 */
	export type $<T, $O extends $UtilOptions> = $Exact.Parse<
		$O,
		{
			$then: $Distributive.Parse<
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
			$else: $Distributive.Parse<
				$O,
				{
					$then: T extends readonly any[] ? $ResolveBranch<T, $O, [$Else]> : $ResolveBranch<T, $O, [$Then]>
					$else: [T] extends readonly [any[]] ? $ResolveBranch<T, $O, [$Else]> : $ResolveBranch<T, $O, [$Then]>
				}
			>
		}
	>

	export type $UtilOptions = NotAssignable.$UtilOptions & $Exact.Options
}
