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
export type IsNotArray<T, $O extends IsNotArray.$Options = {}> = $Special<
	T,
	$MergeOptions<
		$O,
		{
			$then: $ResolveBranch<$O, [$Then], T>
			$else: IsNotArray.$<T, $O>
		}
	>
>
export namespace IsNotArray {
	export type $Options = $Selection.Options &
		$Distributive.Options &
		$Exact.Options &
		$InputOptions<$Any | $Unknown | $Never | $Void>
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>

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
							? $ResolveBranch<$O, [$Else]>
							: $ResolveBranch<$O, [$Then], T>
						: $ResolveBranch<$O, [$Then], T>
					$else: [T] extends [readonly any[]]
						? number extends T['length']
							? $ResolveBranch<$O, [$Else]>
							: $ResolveBranch<$O, [$Then], T>
						: $ResolveBranch<$O, [$Then], T>
				}
			>
			$else: $Distributive.Parse<
				$O,
				{
					$then: T extends readonly any[] ? $ResolveBranch<$O, [$Else]> : $ResolveBranch<$O, [$Then], T>
					$else: [T] extends readonly [any[]] ? $ResolveBranch<$O, [$Else]> : $ResolveBranch<$O, [$Then], T>
				}
			>
		}
	>

	export type $UtilOptions = NotAssignable.$UtilOptions & $Exact.Options
}
