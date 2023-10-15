import type { $Never } from '../never/never.js'
import type { $InputOptions } from '../type_plus/branch/$input_options.js'
import type { $ResolveBranch } from '../type_plus/branch/$resolve_branch.js'
import type { $SelectionOptions } from '../type_plus/branch/$selection_options.js'
import type { $Else, $SelectionBranch, $SelectionPredicate, $Then } from '../type_plus/branch/selection.js'
import type { $Unknown } from '../unknown/unknown.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is `any`.
 *
 * @example
 * ```ts
 * type R = IsAny<any> // true
 *
 * type R = IsAny<never> // false
 * type R = IsAny<unknown> // false
 * type R = IsAny<string | boolean> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is `any`.
 *
 * @example
 * ```ts
 * type R = IsAny<any, { selection: 'filter' }> // any
 *
 * type R = IsAny<never, { selection: 'filter' }> // never
 * type R = IsAny<unknown, { selection: 'filter' }> // never
 * type R = IsAny<string | boolean, { selection: 'filter' }> // never
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsAny<any, $SelectionBranch> // $Then
 * type R = IsAny<string, $SelectionBranch> // $Else
 * ```
 */
export type IsAny<
	T,
	$O extends IsAny.$Options = {}
> = 0 extends 1 & T
	? $ResolveBranch<T, $O, [$Then]>
	: $ResolveBranch<
		T,
		$O,
		[[unknown] extends [T] ? $Unknown : unknown, [never] extends [T] ? $Never : unknown, $Else]
	>

export namespace IsAny {
	export type $Options = $SelectionOptions & $InputOptions<$Unknown | $Never>
	export type $Default = $SelectionPredicate
	export type $Branch = $SelectionBranch
}
