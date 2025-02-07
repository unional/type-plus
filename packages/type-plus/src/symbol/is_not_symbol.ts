import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Then } from '../$type/branch/$selection.js'
import type { $Equality } from '../$type/equal/$equal.js'
import type { $Special } from '../$type/special/$special.js'
import type { $MergeOptions } from '../$type/utils/$merge_options.js'
import type { NotAssignable } from '../predicates/not_assignable.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is not `symbol`.
 *
 * ```ts
 * type R = IsNotSymbol<symbol> // false
 *
 * type R = IsNotSymbol<never> // true
 * type R = IsNotSymbol<unknown> // true
 * type R = IsNotSymbol<string | boolean> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is not `symbol`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsNotSymbol<symbol, { selection: 'filter' }> // never
 *
 * type R = IsNotSymbol<never, { selection: 'filter' }> // never
 * type R = IsNotSymbol<unknown, { selection: 'filter' }> // unknown
 * type R = IsNotSymbol<symbol | string, { selection: 'filter' }> // string
 * ```
 *
 * 🔢 *customize*
 *
 * Disable distribution of union types.
 *
 * @example
 * ```ts
 * type R = IsNotSymbol<symbol | 1> // boolean
 * type R = IsNotSymbol<symbol | 1, { distributive: false }> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNotSymbol<string, $SelectionBranch> // $Then
 * type R = IsNotSymbol<symbol, $SelectionBranch> // $Else
 * ```
 */
export type IsNotSymbol<T, $O extends IsNotSymbol.$Options = {}> = $Special<
	T,
	$MergeOptions<
		$O,
		{
			$then: $ResolveBranch<T, $O, [$Then]>
			$else: IsNotSymbol.$<T, $O>
		}
	>
>

export namespace IsNotSymbol {
	export type $Options = $Equality.$Options
	export type $Branch<$O extends $Options = {}> = $Equality.$Branch<$O>

	/**
	 * 🧰 *type util*
	 *
	 * Validate if `T` is `null`.
	 *
	 * This is a type util for building custom types.
	 * It does not check against special types.
	 */
	export type $<T, $O extends $UtilOptions> = NotAssignable.$<T, symbol, $O>

	export type $UtilOptions = NotAssignable.$UtilOptions
}
