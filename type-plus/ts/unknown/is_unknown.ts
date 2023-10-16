import type { $Any } from '../any/any.js'
import type { $Never } from '../never/never.js'
import type { $InputOptions } from '../type_plus/branch/$input_options.js'
import type { $ResolveBranch } from '../type_plus/branch/$resolve_branch.js'
import type { $SelectionOptions } from '../type_plus/branch/$selection_options.js'
import type { $Else, $Then } from '../type_plus/branch/selection.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is exactly `unknown`.
 *
 * @example
 * ```ts
 * type R = IsUnknown<unknown> // true
 *
 * type R = IsUnknown<number> // false
 * type R = IsUnknown<never> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is exactly `unknown`.
 *
 * @example
 * ```ts
 * type R = IsUnknown<unknown, { selection: 'filter' }> // unknown
 *
 * type R = IsUnknown<number, { selection: 'filter' }> // never
 * type R = IsUnknown<never, { selection: 'filter' }> // never
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsUnknown<unknown, $SelectionBranch> // $Then
 * type R = IsUnknown<string, $SelectionBranch> // $Else
 * ```
 */
export type IsUnknown<
	T,
	$O extends IsUnknown.$Options = {}
> =
	0 extends 1 & T
	? $ResolveBranch<T, $O, [$Any, $Else]>
	: (
		[T, never] extends [never, T]
		? $ResolveBranch<T, $O, [$Never, $Else]>
		: (
			[T, unknown] extends [unknown, T]
			? $ResolveBranch<T, $O, [$Then]>
			: $ResolveBranch<T, $O, [$Else]>
		)
	)

export namespace IsUnknown {
	export type $Options = $SelectionOptions & $InputOptions<$Any | $Never>
}