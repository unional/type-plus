import type { $Any } from '../any/any.js'
import type { $Never } from '../never/never.js'
import type { $InputOptions } from '../type_plus/branch/$input_options.js'
import type { $ResolveBranch } from '../type_plus/branch/$resolve_branch.js'
import type { $SelectionOptions } from '../type_plus/branch/$selection_options.js'
import type { $Else, $Then } from '../type_plus/branch/selection.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is not exactly `unknown`.
 *
 * @example
 * ```ts
 * type R = IsNotUnknown<unknown> // false
 *
 * type R = IsNotUnknown<number> // true
 * type R = IsNotUnknown<never> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is not exactly `unknown`.
 *
 * @example
 * ```ts
 * type R = IsNotUnknown<unknown, { selection: 'filter' }> // never
 *
 * type R = IsNotUnknown<number, { selection: 'filter' }> // number
 * type R = IsNotUnknown<never, { selection: 'filter' }> // never
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNotUnknown<unknown, $SelectionBranch> // $Else
 * type R = IsNotUnknown<string, $SelectionBranch> // $Then
 * ```
 */
export type IsNotUnknown<
	T,
	$O extends IsNotUnknown.$Options = {}
> =
	0 extends 1 & T
	? $ResolveBranch<T, $O, [$Any, $Then]>
	: (
		[T, never] extends [never, T]
		? $ResolveBranch<T, $O, [$Never, $Then]>
		: (
			[T, unknown] extends [unknown, T]
			? $ResolveBranch<T, $O, [$Else]>
			: $ResolveBranch<T, $O, [$Then]>
		)
	)

export namespace IsNotUnknown {
	export type $Options = $SelectionOptions & $InputOptions<$Any | $Never>
}