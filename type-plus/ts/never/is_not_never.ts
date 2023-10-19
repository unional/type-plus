import type { $Any } from '../any/any.js'
import type { $SpecialType } from '../type_plus/$special_type.js'
import type { $InputOptions } from '../type_plus/branch/$input_options.js'
import type { $ResolveBranch } from '../type_plus/branch/$resolve_branch.js'
import type { $SelectionOptions } from '../type_plus/branch/$selection_options.js'
import type { $Else, $Then } from '../type_plus/branch/selection.js'
import type { $Unknown } from '../unknown/unknown.js'
import type { $Never } from './never.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` not `never`.
 *
 * @example
 * ```ts
 * type R = IsNotNever<1> // true
 *
 * type R = IsNotNever<never> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is not `never`, otherwise returns `$Never`.
 *
 * Filter normally returns `never` in the `$else` clause.
 * But since we are checking for `never` here,
 * we have to return `$Never` instead.
 *
 * @example
 * ```ts
 * type R = IsNotNever<1, { selection: 'filter' }> // 1
 *
 * type R = IsNotNever<never, { selection: 'filter' }> // $Never
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNotNever<never, $SelectionBranch> // $Else
 * type R = IsNotNever<1, $SelectionBranch> // $Then
 * ```
 */
export type IsNotNever<
	T,
	$O extends IsNotNever.$Options = {}
> = $SpecialType<T, {
	$any: $ResolveBranch<T, $O, [$Any, $Then]>,
	$unknown: $ResolveBranch<T, $O, [$Unknown, $Then]>,
	$never: $ResolveBranch<T, IsNotNever._O<$O>, [$Else]>,
	$else: $ResolveBranch<T, $O, [$Then]>
}>

export namespace IsNotNever {
	export type $Options = $SelectionOptions & $InputOptions<$Any | $Unknown>
	export type _O<$O extends $Options> = '$else' extends keyof $O ? $O :
		$O['selection'] extends 'filter' ? $O & { $else: $Never } : $O
}
