import type { $Never } from '../never/never.js'
import type { $SpecialType } from '../type_plus/$special_type.js'
import type { $InputOptions } from '../type_plus/branch/$input_options.js'
import type { $ResolveBranch } from '../type_plus/branch/$resolve_branch.js'
import type { $Else, $SelectionBranch, $Then } from '../type_plus/branch/$selection.js'
import type { $SelectionOptions } from '../type_plus/branch/$selection_options.js'
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
> = $SpecialType<T, {
	$any: $ResolveBranch<T, $O, [$Then]>,
	$unknown: $ResolveBranch<T, $O, [$Unknown, $Else]>,
	$never: $ResolveBranch<T, $O, [$Never, $Else]>,
	$else: $ResolveBranch<T, $O, [$Else]>
}>

export namespace IsAny {
	export type $Options = $SelectionOptions & $InputOptions<$Unknown | $Never>
	export type $Branch = $SelectionBranch
}
