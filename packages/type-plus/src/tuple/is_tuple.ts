import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else, $Then } from '../$type/branch/$selection.js'
import type { $Distributive } from '../$type/distributive/$distributive.js'
import type { $Equal } from '../$type/equal/$equal.js'
import type { $Special } from '../$type/special/$special.js'
import type { $MergeOptions } from '../$type/utils/$merge_options.js'
import type { Assignable } from '../predicates/assignable.js'

/**
 * 🎭 *predicate*
 *
 * Validate that `T` is a tuple, excluding array.
 *
 * ```ts
 * type R = IsTuple<[]>       // true
 *
 * type R = IsTuple<number[]> // false
 * type R = IsTuple<string>   // false
 * type R = IsTuple<never>    // false
 * type R = IsTuple<unknown>  // false
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is a `tuple`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsTuple<[], { selection: 'filter' }> // []
 * type R = IsTuple<[1], { selection: 'filter' }> // [1]
 *
 * type R = IsTuple<never, { selection: 'filter' }> // never
 * type R = IsTuple<unknown, { selection: 'filter' }> // never
 * type R = IsTuple<[] | boolean, { selection: 'filter' }> // []
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = IsTuple<[1] | 1> // boolean
 * type R = IsTuple<[] | 1, { distributive: false }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsTuple<[], IsTuple.$Branch> // $Then
 * type R = IsTuple<string, IsTuple.$Branch> // $Else
 * ```
 */
export type IsTuple<T, $O extends IsTuple.$Options = {}> = $Special<
	T,
	$MergeOptions<
		$O,
		{
			$then: $ResolveBranch<T, $O, [$Else]>
			$else: IsTuple.$<T, $O>
		}
	>
>

export namespace IsTuple {
	export type $Options = $Equal.$Options
	export type $Branch<$O extends $Options = {}> = $Equal.$Branch<$O>

	/**
	 * 🧰 *type util*
	 *
	 * Validate if `T` is `tuple`.
	 *
	 * This is a type util for building custom types.
	 * It does not check against special types.
	 */
	export type $<T, $O extends $UtilOptions> = $Distributive.Parse<
		$O,
		{
			$then: T extends readonly any[]
				? number extends T['length']
					? $ResolveBranch<T, $O, [$Else]>
					: $ResolveBranch<T, $O, [$Then]>
				: $ResolveBranch<T, $O, [$Else]>
			$else: [T] extends [readonly any[]]
				? number extends T['length']
					? $ResolveBranch<T, $O, [$Else]>
					: $ResolveBranch<T, $O, [$Then]>
				: $ResolveBranch<T, $O, [$Else]>
		}
	>

	export type $UtilOptions = Assignable.$UtilOptions
}
