import type { $Any } from '../any/any.js'
import type { $SpecialType } from '../type_plus/$special_type.js'
import type { $InputOptions } from '../type_plus/branch/$input_options.js'
import type { $ResolveBranch } from '../type_plus/branch/$resolve_branch.js'
import type { $Else, $Then } from '../type_plus/branch/$selection.js'
import type { $SelectionOptions } from '../type_plus/branch/$selection_options.js'
import type { $Unknown } from '../unknown/unknown.js'
import type { $NotNever } from './never.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is `never`.
 *
 * @example
 * ```ts
 * type R = IsNever<never> // true
 *
 * type R = IsNever<1> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is `never`, otherwise returns `$NotNever`.
 *
 * Filter normally returns `never` in the `$else` clause.
 * But since we are checking for `never` here,
 * we have to return `$NotNever` instead.
 *
 * @example
 * ```ts
 * type R = IsNever<never, { selection: 'filter' }> // never
 *
 * type R = IsNever<1, { selection: 'filter' }> // $NotNever
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNever<never, $SelectionBranch> // $Then
 * type R = IsNever<1, $SelectionBranch> // $Else
 * ```
 */
export type IsNever<
	T,
	$O extends IsNever.$Options = {}
> = $SpecialType<T, {
	$any: $ResolveBranch<T, IsNever._O<$O>, [$Any, $Else]>,
	$unknown: $ResolveBranch<T, IsNever._O<$O>, [$Unknown, $Else]>,
	$never: $ResolveBranch<T, $O, [$Then]>,
	$else: $ResolveBranch<T, IsNever._O<$O>, [$Else]>
}>

export namespace IsNever {
	export type $Options = $SelectionOptions & $InputOptions<$Any | $Unknown>
	export type _O<$O extends $Options> = '$else' extends keyof $O ? $O :
		$O['selection'] extends 'filter' ? $O & { $else: $NotNever } : $O
}
