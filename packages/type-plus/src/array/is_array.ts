import type { $InputOptions } from '../$type/branch/$input_options.js'
import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else, $Selection, $Then } from '../$type/branch/$selection.js'
import type { $Distributive } from '../$type/distributive/$distributive.js'
import type { $Exact } from '../$type/exact/$exact.js'
import type { $Any } from '../$type/special/$any.js'
import type { $Never } from '../$type/special/$never.js'
import type { $Special } from '../$type/special/$special.js'
import type { $Unknown } from '../$type/special/$unknown.js'
import type { $Void } from '../$type/special/$void.js'
import type { $MergeOptions } from '../$type/utils/$merge_options.js'
import type { Assignable } from '../predicates/assignable.js'

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
export type IsArray<T, $O extends IsArray.$Options = {}> = $Special<
	T,
	$MergeOptions<
		$O,
		{
			$then: $ResolveBranch<$O, [$Else], T>
			$else: IsArray.$<T, $O>
		}
	>
>

export namespace IsArray {
	export type $Options = $Selection.Options &
		$Distributive.Options &
		$Exact.Options &
		$InputOptions<$Any | $Unknown | $Never | $Void>
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>

	/**
	 * 🧰 *type util*
	 *
	 * Validate if `T` is an array.
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
							? $ResolveBranch<$O, [$Then], T>
							: $ResolveBranch<$O, [$Else], T>
						: $ResolveBranch<$O, [$Else], T>
					$else: [T] extends [readonly any[]]
						? number extends T['length']
							? $ResolveBranch<$O, [$Then], T>
							: $ResolveBranch<$O, [$Else], T>
						: $ResolveBranch<$O, [$Else], T>
				}
			>
			$else: $Distributive.Parse<
				$O,
				{
					$then: T extends readonly any[] ? $ResolveBranch<$O, [$Then], T> : $ResolveBranch<$O, [$Else], T>
					$else: [T] extends readonly [any[]] ? $ResolveBranch<$O, [$Then], T> : $ResolveBranch<$O, [$Else], T>
				}
			>
		}
	>

	export type $UtilOptions = Assignable.$UtilOptions & $Exact.Options
}
