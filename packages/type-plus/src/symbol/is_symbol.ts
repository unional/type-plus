import type { $InputOptions } from '../$type/branch/$input_options.js'
import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else, $Selection } from '../$type/branch/$selection.js'
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
 * Validate if `T` is `symbol`.
 *
 * @example
 * ```ts
 * type R = IsSymbol<symbol> // true
 *
 * type R = IsSymbol<never> // false
 * type R = IsSymbol<unknown> // false
 * type R = IsSymbol<symbol | number> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is `symbol`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsSymbol<symbol, { selection: 'filter' }> // symbol
 *
 * type R = IsSymbol<never, { selection: 'filter' }> // never
 * type R = IsSymbol<unknown, { selection: 'filter' }> // never
 * type R = IsSymbol<string | boolean, { selection: 'filter' }> // never
 *
 * type R = IsSymbol<symbol | null> // symbol
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = IsSymbol<symbol | 1> // boolean
 * type R = IsSymbol<symbol | 1, { distributive: false }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsSymbol<symbol, $SelectionBranch> // $Then
 * type R = IsSymbol<string, $SelectionBranch> // $Else
 * ```
 */
export type IsSymbol<T, $O extends IsSymbol.$Options = {}> = $Special<
	T,
	$MergeOptions<
		$O,
		{
			$then: $ResolveBranch<$O, [$Else]>
			$else: IsSymbol.$<T, $O>
		}
	>
>

export namespace IsSymbol {
	export type $Options = $Selection.Options &
		$Distributive.Options &
		$Exact.Options &
		$InputOptions<$Any | $Unknown | $Never | $Void>
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>

	/**
	 * 🧰 *type util*
	 *
	 * Validate if `T` is `symbol`.
	 *
	 * This is a type util for building custom types.
	 * It does not check against special types.
	 */
	export type $<T, $O extends $UtilOptions> = Assignable.$<T, symbol, $O>

	export type $UtilOptions = Assignable.$UtilOptions
}
