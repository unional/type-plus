import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else } from '../$type/branch/$selection.js'
import type { $Special } from '../$type/special/$special.js'
import type { $MergeOptions } from '../$type/utils/$merge_options.js'
import type { Equal } from '../equal/equal.js'
import type { Assignable } from '../predicates/assignable.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is `Function` or function signature.
 *
 * @example
 * ```ts
 * type R = IsFunction<Function> // true
 * type R = IsFunction<() => void> // true
 *
 * type R = IsFunction<never> // false
 * type R = IsFunction<unknown> // false
 * type R = IsFunction<number> // false
 *
 * type R = IsFunction<Function | number> // boolean
 * type R = IsFunction<(() => string) | number> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is `Function` or function signature, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsFunction<Function, { selection: 'filter' }> // Function
 * type R = IsFunction<() => void, { selection: 'filter' }> // () => void
 *
 * type R = IsFunction<never, { selection: 'filter' }> // never
 * type R = IsFunction<unknown, { selection: 'filter' }> // never
 * type R = IsFunction<Function | number, { selection: 'filter' }> // Function
 *
 * type R = IsFunction<(() => string) | number, { selection: 'filter' }> // () => string
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = IsFunction<Function | 1> // boolean
 * type R = IsFunction<Function | 1, { distributive: false }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsFunction<Function, $SelectionBranch> // $Then
 * type R = IsFunction<string, $SelectionBranch> // $Else
 * ```
 */
export type IsFunction<T, $O extends IsFunction.$Options = {}> = $Special<
	T,
	$MergeOptions<
		$O,
		{
			$then: $ResolveBranch<T, $O, [$Else]>
			$else: IsFunction.$<T, $O>
		}
	>
>

export namespace IsFunction {
	export type $Options = Equal.$Options
	export type $Default = Equal.$Default
	export type $Branch = Equal.$Branch
	/**
	 * 🧰 *type util*
	 *
	 * Validate if `T` is `Function`.
	 *
	 * This is a type util for building custom types.
	 * It does not check against special types.
	 */
	export type $<T, $O extends Assignable.$UtilOptions> = Assignable.$<T, Function, $O>
}
