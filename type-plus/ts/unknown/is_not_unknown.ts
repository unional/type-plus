import type { $Any } from '../any/any.js'
import type { $Never } from '../never/never.js'
import type { $SpecialType } from '../type_plus/$special_type.js'
import type { $InputOptions } from '../type_plus/branch/$input_options.js'
import type { $ResolveBranch } from '../type_plus/branch/$resolve_branch.js'
import type { $Else, $SelectionBranch, $Then } from '../type_plus/branch/$selection.js'
import type { $SelectionOptions } from '../type_plus/branch/$selection_options.js'

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
> = $SpecialType<T, {
	$any: $ResolveBranch<T, $O, [$Any, $Then]>,
	$unknown: $ResolveBranch<T, $O, [$Else]>,
	$never: $ResolveBranch<T, $O, [$Never, $Then]>,
	$else: $ResolveBranch<T, $O, [$Then]>
}>

export namespace IsNotUnknown {
	export type $Options = $SelectionOptions & $InputOptions<$Any | $Never>
	export type $Branch = $SelectionBranch
}
