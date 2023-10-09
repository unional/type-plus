import type { $Never } from '../never/never.js'
import type { $DefineInputOptions } from '../type_plus/branch/$define_input_options.js'
import type { $ResolveBranch } from '../type_plus/branch/$resolve_branch.js'
import type { $ResolveSelection } from '../type_plus/branch/$resolve_selection.js'
import type { $SelectionOptions } from '../type_plus/branch/$selection_options.js'
import type { $Else, $SelectionBranch, $SelectionPredicate, $Then } from '../type_plus/branch/selection.js'
import type { $Unknown } from '../unknown/unknown.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is not `any`.
 *
 * @example
 * ```ts
 * type R = IsNotAny<any> // false
 *
 * type R = IsNotAny<never> // true
 * type R = IsNotAny<unknown> // true
 * type R = IsNotAny<string | boolean> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is not `any`.
 *
 * @example
 * ```ts
 * type R = IsNotAny<any, { selection: 'filter' }> // never
 *
 * type R = IsNotAny<never, { selection: 'filter' }> // never
 * type R = IsNotAny<unknown, { selection: 'filter' }> // unknown
 * type R = IsNotAny<string | boolean, { selection: 'filter' }> // string | boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNotAny<any, $SelectionBranch> // $Else
 * type R = IsNotAny<string, $SelectionBranch> // $Then
 * ```
 */
export type IsNotAny<
	T,
	$O extends IsNotAny.$Options = {}
> = 0 extends 1 & T
	? $ResolveBranch<
		$O,
		[$Else],
		$ResolveSelection<$O, T, $Else>
	>
	: $ResolveBranch<
		$O,
		[[unknown] extends [T] ? $Unknown : unknown, [never] extends [T] ? $Never : unknown, $Then],
		$ResolveSelection<$O, T, $Then>
	>

export namespace IsNotAny {
	export type $Options = $SelectionOptions & $DefineInputOptions<$Unknown | $Never>
	export type $Default = $SelectionPredicate
	export type $Branch = $SelectionBranch
}
